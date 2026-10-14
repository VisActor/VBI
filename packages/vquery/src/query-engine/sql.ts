import type { DataRow } from '../data-loader'

type Scalar = unknown

type BinaryOperator = '=' | '!=' | '<>' | '>' | '>=' | '<' | '<='
type LikeOperator = 'like' | 'ilike' | 'not like' | 'not ilike'
type TokenOperator = BinaryOperator | '||' | '::'

type Expression =
  | { type: 'field'; name: string }
  | { type: 'literal'; value: Scalar }
  | { type: 'star' }
  | { type: 'call'; name: string; arguments: Expression[]; distinct: boolean }
  | { type: 'concat'; parts: Expression[] }

type Predicate =
  | { type: 'logic'; operator: 'and' | 'or'; left: Predicate; right: Predicate }
  | { type: 'not'; value: Predicate }
  | { type: 'comparison'; operator: 'is null' | 'is not null'; left: Expression; right?: never }
  | {
      type: 'comparison'
      operator: 'between' | 'not between'
      left: Expression
      right?: never
      values: [Expression, Expression]
    }
  | { type: 'comparison'; operator: 'in' | 'not in'; left: Expression; right?: never; values: Expression[] }
  | { type: 'comparison'; operator: BinaryOperator | LikeOperator; left: Expression; right: Expression }
  | { type: 'truthy'; value: Expression }

type SelectItem = { expression: Expression; alias?: string }
type OrderItem = { expression: Expression; direction: 'asc' | 'desc'; nulls: 'first' | 'last' }

export type SelectQuery = {
  table?: string
  select: SelectItem[]
  where?: Predicate
  groupBy: Expression[]
  having?: Predicate
  orderBy: OrderItem[]
  limit?: number
}

type Token =
  | { kind: 'operator'; value: TokenOperator }
  | { kind: 'word' | 'identifier' | 'string' | 'number' | 'symbol'; value: string }

const tokenize = (sql: string): Token[] => {
  const tokens: Token[] = []
  let index = 0
  while (index < sql.length) {
    const character = sql[index]
    if (/\s/.test(character)) {
      index += 1
      continue
    }
    if (character === '"') {
      let value = ''
      index += 1
      while (index < sql.length) {
        if (sql[index] === '"' && sql[index + 1] === '"') {
          value += '"'
          index += 2
        } else if (sql[index] === '"') {
          index += 1
          break
        } else value += sql[index++]
      }
      tokens.push({ kind: 'identifier', value })
      continue
    }
    if (character === "'") {
      let value = ''
      index += 1
      while (index < sql.length) {
        if (sql[index] === "'" && sql[index + 1] === "'") {
          value += "'"
          index += 2
        } else if (sql[index] === "'") {
          index += 1
          break
        } else value += sql[index++]
      }
      tokens.push({ kind: 'string', value })
      continue
    }
    if (/[-\d]/.test(character) && /\d/.test(sql[index + (character === '-' ? 1 : 0)] ?? '')) {
      const start = index++
      while (/[\d.eE+-]/.test(sql[index] ?? '')) index += 1
      tokens.push({ kind: 'number', value: sql.slice(start, index) })
      continue
    }
    if (/[A-Za-z_]/.test(character)) {
      const start = index++
      while (/[A-Za-z0-9_$]/.test(sql[index] ?? '')) index += 1
      tokens.push({ kind: 'word', value: sql.slice(start, index) })
      continue
    }
    const pair = sql.slice(index, index + 2)
    if (['>=', '<=', '!=', '<>', '||', '::'].includes(pair)) {
      tokens.push({ kind: 'operator', value: pair as TokenOperator })
      index += 2
      continue
    }
    if ('=<>'.includes(character)) tokens.push({ kind: 'operator', value: character as BinaryOperator })
    else if ('(),*;.'.includes(character)) tokens.push({ kind: 'symbol', value: character })
    else throw new Error(`Unsupported SQL character: ${character}`)
    index += 1
  }
  return tokens
}

class Parser {
  private index = 0

  constructor(private readonly tokens: Token[]) {}

  private current(): Token | undefined {
    return this.tokens[this.index]
  }

  private is(value: string): boolean {
    return this.current()?.value.toLowerCase() === value.toLowerCase()
  }

  private match(value: string): boolean {
    if (!this.is(value)) return false
    this.index += 1
    return true
  }

  private expect(value: string): void {
    if (!this.match(value)) throw new Error(`Expected ${value}, received ${this.current()?.value ?? 'end of SQL'}`)
  }

  private identifier(): string {
    const token = this.current()
    if (!token || (token.kind !== 'identifier' && token.kind !== 'word')) {
      throw new Error(`Expected SQL identifier, received ${token?.value ?? 'end of SQL'}`)
    }
    this.index += 1
    return token.value
  }

  private scalar(): Expression {
    const parts = [this.castExpression()]
    while (this.match('||')) parts.push(this.castExpression())
    return parts.length === 1 ? parts[0] : { type: 'concat', parts }
  }

  private castExpression(): Expression {
    const expression = this.primary()
    while (this.match('::')) {
      this.identifier()
      if (this.match('(')) {
        while (!this.match(')')) {
          if (!this.current()) throw new Error('Unterminated SQL cast type')
          this.index += 1
        }
      }
    }
    return expression
  }

  private primary(): Expression {
    const token = this.current()
    if (!token) throw new Error('Unexpected end of SQL expression')
    if (this.match('(')) {
      const expression = this.scalar()
      this.expect(')')
      return expression
    }
    if (this.match('*')) return { type: 'star' }
    if (token.kind === 'number') {
      this.index += 1
      return { type: 'literal', value: Number(token.value) }
    }
    if (token.kind === 'string') {
      this.index += 1
      return { type: 'literal', value: token.value }
    }
    let name = this.identifier()
    while (this.match('.')) name = this.identifier()
    const lowerName = name.toLowerCase()
    if ((lowerName === 'date' || lowerName === 'timestamp') && this.current()?.kind === 'string') {
      const value = this.current()!.value
      this.index += 1
      return { type: 'literal', value }
    }
    if (!this.match('(')) {
      if (lowerName === 'null') return { type: 'literal', value: null }
      if (lowerName === 'true') return { type: 'literal', value: true }
      if (lowerName === 'false') return { type: 'literal', value: false }
      return { type: 'field', name }
    }

    if (lowerName === 'cast') {
      const expression = this.scalar()
      this.expect('as')
      this.identifier()
      this.expect(')')
      return expression
    }

    const distinct = this.match('distinct')
    const arguments_: Expression[] = []
    if (!this.match(')')) {
      do arguments_.push(this.scalar())
      while (this.match(','))
      this.expect(')')
    }
    return { type: 'call', name: lowerName, arguments: arguments_, distinct }
  }

  private predicate(): Predicate {
    return this.orPredicate()
  }

  private orPredicate(): Predicate {
    let result = this.andPredicate()
    while (this.match('or')) result = { type: 'logic', operator: 'or', left: result, right: this.andPredicate() }
    return result
  }

  private andPredicate(): Predicate {
    let result = this.predicateTerm()
    while (this.match('and')) result = { type: 'logic', operator: 'and', left: result, right: this.predicateTerm() }
    return result
  }

  private predicateTerm(): Predicate {
    if (this.match('(')) {
      const result = this.predicate()
      this.expect(')')
      return result
    }
    if (this.match('not')) return { type: 'not', value: this.predicateTerm() }
    const left = this.scalar()

    if (this.match('is')) {
      const operator = this.match('not') ? 'is not null' : 'is null'
      this.expect('null')
      return { type: 'comparison', operator, left }
    }

    const negated = this.match('not')
    if (this.match('between')) {
      const lower = this.scalar()
      this.expect('and')
      const upper = this.scalar()
      return { type: 'comparison', operator: negated ? 'not between' : 'between', left, values: [lower, upper] }
    }
    if (this.match('in')) {
      this.expect('(')
      const values: Expression[] = []
      if (!this.match(')')) {
        do values.push(this.scalar())
        while (this.match(','))
        this.expect(')')
      }
      return { type: 'comparison', operator: negated ? 'not in' : 'in', left, values }
    }
    if (this.match('like') || this.match('ilike')) {
      const matchedOperator = this.tokens[this.index - 1].value.toLowerCase() as 'like' | 'ilike'
      const operator: LikeOperator = negated ? `not ${matchedOperator}` : matchedOperator
      const right = this.scalar()
      if (this.match('escape')) {
        const escape = this.scalar()
        if (escape.type !== 'literal' || escape.value !== '') throw new Error('Only empty LIKE escape is supported')
      }
      return { type: 'comparison', operator, left, right }
    }
    if (negated) throw new Error('Expected IN, BETWEEN, LIKE, or ILIKE after NOT')
    const token = this.current()
    let operator: BinaryOperator | undefined
    if (token?.kind === 'operator' && token.value !== '||' && token.value !== '::') {
      operator = token.value
      this.index += 1
    }
    if (operator) return { type: 'comparison', operator, left, right: this.scalar() }
    return { type: 'truthy', value: left }
  }

  public parse(): SelectQuery {
    this.expect('select')
    const select: SelectItem[] = []
    do {
      const expression = this.scalar()
      const alias = this.match('as') ? this.identifier() : undefined
      select.push({ expression, alias })
    } while (this.match(','))

    const table = this.match('from') ? this.identifier() : undefined
    const result: SelectQuery = { table, select, groupBy: [], orderBy: [] }
    while (this.current() && !this.match(';')) {
      if (this.match('where')) result.where = this.predicate()
      else if (this.match('group')) {
        this.expect('by')
        do result.groupBy.push(this.scalar())
        while (this.match(','))
      } else if (this.match('having')) result.having = this.predicate()
      else if (this.match('order')) {
        this.expect('by')
        do {
          const expression = this.scalar()
          const direction = this.match('desc') ? 'desc' : (this.match('asc'), 'asc')
          let nulls: 'first' | 'last' = 'last'
          if (this.match('nulls')) {
            if (this.match('first')) nulls = 'first'
            else this.expect('last')
          }
          result.orderBy.push({ expression, direction, nulls })
        } while (this.match(','))
      } else if (this.match('limit')) {
        const token = this.current()
        if (!token || token.kind !== 'number') throw new Error('LIMIT requires a number')
        this.index += 1
        result.limit = Number(token.value)
      } else throw new Error(`Unsupported SQL clause: ${this.current()?.value}`)
    }
    return result
  }
}

export const parseSQL = (sql: string): SelectQuery => new Parser(tokenize(sql)).parse()

const aggregateNames = new Set([
  'sum',
  'avg',
  'count',
  'min',
  'max',
  'median',
  'quantile',
  'quantile_disc',
  'var_samp',
  'var_pop',
  'stddev',
  'stddev_samp',
  'stddev_pop',
  'variance',
])

const isAggregateCall = (expression: Expression): boolean =>
  expression.type === 'call' && aggregateNames.has(expression.name)

const isAggregate = (expression: Expression): boolean => {
  if (expression.type === 'call') return isAggregateCall(expression) || expression.arguments.some(isAggregate)
  return expression.type === 'concat' && expression.parts.some(isAggregate)
}

const numericValues = (expression: Expression, rows: DataRow[]): number[] =>
  rows
    .map((row) => evaluate(expression, row, rows))
    .filter((value): value is number => value !== null && value !== undefined && !Number.isNaN(Number(value)))
    .map(Number)

const compareText = (left: string, right: string): number => {
  const leftCodePoints = Array.from(left, (character) => character.codePointAt(0)!)
  const rightCodePoints = Array.from(right, (character) => character.codePointAt(0)!)
  const length = Math.min(leftCodePoints.length, rightCodePoints.length)

  for (let index = 0; index < length; index += 1) {
    const difference = leftCodePoints[index] - rightCodePoints[index]
    if (difference !== 0) return difference
  }

  return leftCodePoints.length - rightCodePoints.length
}

const compareNonNull = (left: unknown, right: unknown): number => {
  if (left === right) return 0
  if (typeof left === 'number' && typeof right === 'number') return left - right
  return compareText(String(left), String(right))
}

const parseTimestamp = (value: unknown): Date => {
  const text = String(value)
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2})(?::(\d{2}))?(?::(\d{2}))?)?/.exec(text)
  return match
    ? new Date(Date.UTC(+match[1], +match[2] - 1, +match[3], +(match[4] ?? 0), +(match[5] ?? 0), +(match[6] ?? 0)))
    : new Date(text)
}

const weekNumber = (date: Date): string => {
  const firstDay = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const firstMondayOffset = (8 - firstDay.getUTCDay()) % 7
  const day = Math.floor((date.getTime() - firstDay.getTime()) / 86400000)
  return String(day < firstMondayOffset ? 0 : Math.floor((day - firstMondayOffset) / 7) + 1).padStart(2, '0')
}

const formatTimestamp = (value: unknown, format: string): string => {
  const date = parseTimestamp(value)
  const replacements: Record<string, string> = {
    '%Y': String(date.getUTCFullYear()),
    '%m': String(date.getUTCMonth() + 1).padStart(2, '0'),
    '%d': String(date.getUTCDate()).padStart(2, '0'),
    '%H': String(date.getUTCHours()).padStart(2, '0'),
    '%M': String(date.getUTCMinutes()).padStart(2, '0'),
    '%S': String(date.getUTCSeconds()).padStart(2, '0'),
    '%W': weekNumber(date),
  }
  return Object.entries(replacements).reduce(
    (result, [token, replacement]) => result.replaceAll(token, replacement),
    format,
  )
}

const aggregate = (expression: Extract<Expression, { type: 'call' }>, rows: DataRow[]): unknown => {
  const argument = expression.arguments[0] ?? { type: 'star' as const }
  let values = rows.map((row) => evaluate(argument, row, rows)).filter((value) => value !== null && value !== undefined)
  if (expression.distinct) values = [...new Set(values)]
  if (expression.name === 'count') return values.length
  if (expression.name === 'sum') {
    const numbers = numericValues(argument, rows)
    return numbers.length ? numbers.reduce((sum, value) => sum + value, 0) : null
  }
  if (expression.name === 'avg') {
    const numbers = numericValues(argument, rows)
    return numbers.length ? numbers.reduce((sum, value) => sum + value, 0) / numbers.length : null
  }
  if (expression.name === 'min')
    return values.length ? values.reduce((a, b) => (compareNonNull(a, b) <= 0 ? a : b)) : null
  if (expression.name === 'max')
    return values.length ? values.reduce((a, b) => (compareNonNull(a, b) >= 0 ? a : b)) : null
  const numbers = numericValues(argument, rows).sort((a, b) => a - b)
  if (!numbers.length) return null
  if (expression.name === 'median') {
    const middle = Math.floor(numbers.length / 2)
    return numbers.length % 2 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2
  }
  if (expression.name === 'quantile' || expression.name === 'quantile_disc') {
    if (expression.arguments.length !== 2) throw new Error('QUANTILE requires a value and a quantile parameter')
    const value = evaluate(expression.arguments[1], rows[0], rows)
    const quantile = Number(value)
    if (value === null || value === undefined || !Number.isFinite(quantile) || quantile < -1 || quantile > 1) {
      throw new Error('QUANTILE parameter must be a number in the range [-1, 1]')
    }
    const position = Math.max(numbers.length - Math.floor(numbers.length - numbers.length * Math.abs(quantile)), 1)
    const index = quantile < 0 ? numbers.length - position : position - 1
    return numbers[index]
  }
  const average = numbers.reduce((sum, value) => sum + value, 0) / numbers.length
  const squared = numbers.reduce((sum, value) => sum + (value - average) ** 2, 0)
  if (expression.name === 'var_pop' || expression.name === 'stddev_pop') {
    const variance = squared / numbers.length
    return expression.name === 'stddev_pop' ? Math.sqrt(variance) : variance
  }
  if (numbers.length < 2) return null
  const variance = squared / (numbers.length - 1)
  return expression.name === 'stddev' || expression.name === 'stddev_samp' ? Math.sqrt(variance) : variance
}

const evaluate = (expression: Expression, row: DataRow = {}, rows: DataRow[] = [row]): unknown => {
  if (expression.type === 'literal') return expression.value
  if (expression.type === 'field') return row[expression.name]
  if (expression.type === 'star') return row
  if (expression.type === 'concat') {
    const values = expression.parts.map((part) => evaluate(part, row, rows))
    return values.some((value) => value === null || value === undefined) ? null : values.map(String).join('')
  }
  if (isAggregateCall(expression)) return aggregate(expression as Extract<Expression, { type: 'call' }>, rows)
  if (expression.name === 'round') {
    const value = evaluate(expression.arguments[0], row, rows)
    if (value === null || value === undefined) return null
    const precision = Number(evaluate(expression.arguments[1] ?? { type: 'literal', value: 0 }, row, rows))
    const factor = 10 ** precision
    return Math.round(Number(value) * factor) / factor
  }
  if (expression.name === 'strftime') {
    const value = evaluate(expression.arguments[0], row, rows)
    const format = evaluate(expression.arguments[1], row, rows)
    if (value === null || value === undefined || format === null || format === undefined) return null
    return formatTimestamp(value, String(format))
  }
  if (expression.name === 'date_part') {
    const part = evaluate(expression.arguments[0], row, rows)
    const value = evaluate(expression.arguments[1], row, rows)
    if (part === null || part === undefined || value === null || value === undefined) return null
    if (String(part).toLowerCase() === 'quarter') {
      return Math.floor(parseTimestamp(value).getUTCMonth() / 3) + 1
    }
  }
  throw new Error(`Unsupported SQL function: ${expression.name}`)
}

const like = (value: unknown, pattern: unknown, insensitive: boolean): boolean => {
  const escaped = String(pattern)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replaceAll('%', '.*')
    .replaceAll('_', '.')
  return new RegExp(`^${escaped}$`, insensitive ? 'i' : '').test(String(value))
}

type TruthValue = boolean | null

const evaluatePredicate = (predicate: Predicate, row: DataRow, rows: DataRow[]): TruthValue => {
  if (predicate.type === 'logic') {
    const left = evaluatePredicate(predicate.left, row, rows)
    const right = evaluatePredicate(predicate.right, row, rows)
    if (predicate.operator === 'and') {
      if (left === false || right === false) return false
      return left === null || right === null ? null : true
    }
    if (left === true || right === true) return true
    return left === null || right === null ? null : false
  }
  if (predicate.type === 'not') {
    const value = evaluatePredicate(predicate.value, row, rows)
    return value === null ? null : !value
  }
  if (predicate.type === 'truthy') {
    const value = evaluate(predicate.value, row, rows)
    return value === null || value === undefined ? null : Boolean(value)
  }
  const left = evaluate(predicate.left, row, rows)
  if (predicate.operator === 'is null' || predicate.operator === 'is not null') {
    const isNull = left === null || left === undefined
    return predicate.operator === 'is null' ? isNull : !isNull
  }
  if (predicate.operator === 'in' || predicate.operator === 'not in') {
    const values = predicate.values.map((value) => evaluate(value, row, rows))
    if (left === null || left === undefined) return null
    const found = values.some((value) => value !== null && value !== undefined && compareNonNull(left, value) === 0)
    if (found) return predicate.operator === 'in'
    if (values.some((value) => value === null || value === undefined)) return null
    return predicate.operator === 'not in'
  }
  if (predicate.operator === 'between' || predicate.operator === 'not between') {
    const values = predicate.values.map((value) => evaluate(value, row, rows))
    if (left === null || left === undefined || values.some((value) => value === null || value === undefined))
      return null
    const found = compareNonNull(left, values[0]) >= 0 && compareNonNull(left, values[1]) <= 0
    return predicate.operator === 'between' ? found : !found
  }
  const operator = predicate.operator
  const right = evaluate(predicate.right!, row, rows)
  if (operator.endsWith('like')) {
    if (left === null || left === undefined || right === null || right === undefined) return null
    const result = like(left, right, operator.includes('ilike'))
    return operator.startsWith('not ') ? !result : result
  }
  if (left === null || left === undefined || right === null || right === undefined) return null
  const comparison = compareNonNull(left, right)
  if (operator === '=') return comparison === 0
  if (operator === '!=' || operator === '<>') return comparison !== 0
  if (operator === '>') return comparison > 0
  if (operator === '>=') return comparison >= 0
  if (operator === '<') return comparison < 0
  return comparison <= 0
}

const expressionName = (item: SelectItem): string | undefined =>
  item.alias ?? (item.expression.type === 'field' ? item.expression.name : undefined)

type ResultContext = { output: DataRow; row: DataRow; rows: DataRow[] }

const stableHash = (value: unknown): number => {
  let hash = 3
  for (const character of JSON.stringify(value)) hash = Math.imul(hash, 335) + character.charCodeAt(0)
  return hash >>> 0
}

export const executeSQL = (query: SelectQuery, tableRows: DataRow[]): DataRow[] => {
  const filtered = query.where
    ? tableRows.filter((row) => evaluatePredicate(query.where!, row, [row]) === true)
    : tableRows
  const aliases = new Map<string, Expression>()
  for (const item of query.select) {
    const name = expressionName(item)
    if (name) aliases.set(name, item.expression)
  }
  const hasAggregation = query.select.some((item) => isAggregate(item.expression))
  let groups: DataRow[][]
  if (query.groupBy.length) {
    const grouped = new Map<string, DataRow[]>()
    for (const row of filtered) {
      const key = JSON.stringify(
        query.groupBy.map((expression) => {
          const resolved = expression.type === 'field' ? (aliases.get(expression.name) ?? expression) : expression
          return evaluate(resolved, row, [row])
        }),
      )
      const rows = grouped.get(key) ?? []
      rows.push(row)
      grouped.set(key, rows)
    }
    groups = [...grouped.values()]
  } else groups = hasAggregation ? [filtered] : filtered.map((row) => [row])

  const contexts: ResultContext[] = []
  for (const rows of groups) {
    const row = rows[0] ?? {}
    if (query.having && evaluatePredicate(query.having, row, rows) !== true) continue
    const output: DataRow = {}
    for (const item of query.select) {
      if (item.expression.type === 'star') Object.assign(output, row)
      else {
        const name = expressionName(item)
        if (!name) throw new Error('Computed SELECT expressions require an alias')
        output[name] = evaluate(item.expression, row, rows)
      }
    }
    contexts.push({ output, row, rows })
  }

  contexts.sort((left, right) => {
    for (const order of query.orderBy) {
      const fieldName = order.expression.type === 'field' ? order.expression.name : undefined
      const leftValue =
        fieldName && Object.hasOwn(left.output, fieldName)
          ? left.output[fieldName]
          : evaluate(order.expression, left.row, left.rows)
      const rightValue =
        fieldName && Object.hasOwn(right.output, fieldName)
          ? right.output[fieldName]
          : evaluate(order.expression, right.row, right.rows)
      const leftNull = leftValue === null || leftValue === undefined
      const rightNull = rightValue === null || rightValue === undefined
      if (leftNull || rightNull) {
        if (leftNull !== rightNull) return (leftNull ? 1 : -1) * (order.nulls === 'first' ? -1 : 1)
        continue
      }
      const result = compareNonNull(leftValue, rightValue)
      if (result !== 0) return order.direction === 'desc' ? -result : result
    }
    if (!query.groupBy.length || !query.orderBy.length) return 0
    const groupKey = (context: ResultContext) =>
      query.groupBy.map((expression) => {
        const resolved = expression.type === 'field' ? (aliases.get(expression.name) ?? expression) : expression
        return evaluate(resolved, context.row, context.rows)
      })
    return stableHash(groupKey(left)) - stableHash(groupKey(right))
  })
  return contexts.slice(0, query.limit ?? contexts.length).map(({ output }) => output)
}
