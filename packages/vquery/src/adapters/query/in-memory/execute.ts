import type { DataRow } from '../../../dataset/types'
import type { Expression, Predicate, SelectQuery, SelectItem } from '../../../sql/ast'

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
  if (expression.type === 'unary') return isAggregate(expression.value)
  if (expression.type === 'binary') return isAggregate(expression.left) || isAggregate(expression.right)
  return expression.type === 'concat' && expression.parts.some(isAggregate)
}

const numericValues = (values: unknown[]): number[] => {
  const numbers: number[] = []
  for (const value of values) {
    const number = Number(value)
    if (!Number.isNaN(number)) numbers.push(number)
  }
  return numbers
}

const compareText = (left: string, right: string): number => {
  const length = Math.min(left.length, right.length)

  for (let index = 0; index < length; ) {
    const codePoint = left.codePointAt(index)!
    const difference = codePoint - right.codePointAt(index)!
    if (difference !== 0) return difference
    index += codePoint > 0xffff ? 2 : 1
  }

  return left.length - right.length
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
  const values = rows
    .map((row) => evaluate(argument, row, rows))
    .filter((value) => value !== null && value !== undefined)
  const distinctValues = expression.distinct ? [...new Set(values)] : values
  if (expression.name === 'count') return distinctValues.length
  if (expression.name === 'sum') {
    const numbers = numericValues(values)
    return numbers.length ? numbers.reduce((sum, value) => sum + value, 0) : null
  }
  if (expression.name === 'avg') {
    const numbers = numericValues(values)
    return numbers.length ? numbers.reduce((sum, value) => sum + value, 0) / numbers.length : null
  }
  if (expression.name === 'min')
    return distinctValues.length ? distinctValues.reduce((a, b) => (compareNonNull(a, b) <= 0 ? a : b)) : null
  if (expression.name === 'max')
    return distinctValues.length ? distinctValues.reduce((a, b) => (compareNonNull(a, b) >= 0 ? a : b)) : null
  const numbers = numericValues(values).sort((a, b) => a - b)
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

const numericExpressionResult = (value: number): number => {
  if (!Number.isFinite(value)) throw new Error('Numeric expression is out of range')
  return value
}

const evaluate = (expression: Expression, row: DataRow = {}, rows: DataRow[] = [row]): unknown => {
  if (expression.type === 'literal') return expression.value
  if (expression.type === 'field') return row[expression.name]
  if (expression.type === 'star') return row
  if (expression.type === 'unary') {
    const value = evaluate(expression.value, row, rows)
    return value === null || value === undefined
      ? null
      : numericExpressionResult(expression.operator === '-' ? -Number(value) : Number(value))
  }
  if (expression.type === 'binary') {
    const left = evaluate(expression.left, row, rows),
      right = evaluate(expression.right, row, rows)
    if (left === null || left === undefined || right === null || right === undefined) return null
    switch (expression.operator) {
      case '+':
        return numericExpressionResult(Number(left) + Number(right))
      case '-':
        return numericExpressionResult(Number(left) - Number(right))
      case '*':
        return numericExpressionResult(Number(left) * Number(right))
      case '/':
        return Number(right) === 0 ? null : numericExpressionResult(Number(left) / Number(right))
    }
  }
  if (expression.type === 'case')
    return evaluatePredicate(expression.when, row, rows) === true ? evaluate(expression.value, row, rows) : null
  if (expression.type === 'concat') {
    const values = expression.parts.map((part) => evaluate(part, row, rows))
    return values.some((value) => value === null || value === undefined) ? null : values.map(String).join('')
  }
  if (isAggregateCall(expression)) return aggregate(expression as Extract<Expression, { type: 'call' }>, rows)
  if (expression.name === 'abs' || expression.name === 'coalesce' || expression.name === 'nullif') {
    const value = evaluate(expression.arguments[0], row, rows)
    if (expression.name === 'coalesce') return value ?? evaluate(expression.arguments[1], row, rows)
    if (value === null || value === undefined) return null
    return expression.name === 'abs'
      ? numericExpressionResult(Math.abs(Number(value)))
      : value === evaluate(expression.arguments[1], row, rows)
        ? null
        : value
  }
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
  // SQL LOWER maps each code point independently, without contextual or full case folding.
  const text = (input: unknown) =>
    insensitive
      ? Array.from(String(input), (character) => Array.from(character.toLowerCase())[0]).join('')
      : String(input)
  const escaped = text(pattern)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replaceAll('%', '.*')
    .replaceAll('_', '.')
  return new RegExp(`^${escaped}$`, 'su').test(text(value))
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
    const found = evaluatePredicate(
      {
        type: 'logic',
        operator: 'and',
        left: { type: 'comparison', operator: '>=', left: predicate.left, right: predicate.values[0] },
        right: { type: 'comparison', operator: '<=', left: predicate.left, right: predicate.values[1] },
      },
      row,
      rows,
    )
    return found === null ? null : predicate.operator === 'between' ? found : !found
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

type ResultContext = { output: DataRow; row: DataRow; rows: DataRow[]; orderValues?: unknown[]; groupHash?: number }

const stableHash = (value: unknown): number => {
  let hash = 3
  for (const character of JSON.stringify(value)) hash = Math.imul(hash, 335) + character.charCodeAt(0)
  return hash >>> 0
}

export const executeSQL = (query: SelectQuery, tableRows: DataRow[]): DataRow[] => {
  if (query.subquery) tableRows = executeSQL(query.subquery, tableRows)
  const filtered = query.where
    ? tableRows.filter((row) => evaluatePredicate(query.where!, row, [row]) === true)
    : tableRows
  const aliases = new Map<string, Expression>()
  for (const item of query.select) {
    const name = expressionName(item)
    if (name) aliases.set(name, item.expression)
  }
  const resolveGroup = (expression: Expression, row: DataRow): Expression =>
    expression.type === 'field' && !Object.hasOwn(row, expression.name)
      ? (aliases.get(expression.name) ?? expression)
      : expression
  const hasAggregation = query.select.some((item) => isAggregate(item.expression))
  let groups: DataRow[][]
  if (query.groupBy.length) {
    const grouped = new Map<string, DataRow[]>()
    for (const row of filtered) {
      const key = JSON.stringify(
        query.groupBy.map((expression) => {
          const resolved = resolveGroup(expression, row)
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
    const entries: Array<[string, unknown]> = []
    for (const item of query.select) {
      if (item.expression.type === 'star') entries.push(...Object.entries(row))
      else {
        const name = expressionName(item)
        if (!name) throw new Error('Computed SELECT expressions require an alias')
        entries.push([name, evaluate(item.expression, row, rows)])
      }
    }
    contexts.push({ output: Object.fromEntries(entries), row, rows })
  }

  // Cache only values sorting actually visits; later keys must remain unevaluated until a tie.
  const orderValue = (context: ResultContext, index: number) => {
    const values = (context.orderValues ??= [])
    if (!(index in values)) values[index] = evaluate(query.orderBy[index].expression, context.row, context.rows)
    return values[index]
  }
  const groupHash = (context: ResultContext) =>
    (context.groupHash ??= stableHash(
      query.groupBy.map((expression) => evaluate(resolveGroup(expression, context.row), context.row, context.rows)),
    ))

  contexts.sort((left, right) => {
    for (let index = 0; index < query.orderBy.length; index += 1) {
      const order = query.orderBy[index]
      const fieldName = order.expression.type === 'field' ? order.expression.name : undefined
      const leftValue =
        fieldName && Object.hasOwn(left.output, fieldName) ? left.output[fieldName] : orderValue(left, index)
      const rightValue =
        fieldName && Object.hasOwn(right.output, fieldName) ? right.output[fieldName] : orderValue(right, index)
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
    return groupHash(left) - groupHash(right)
  })
  return contexts.slice(0, query.limit ?? contexts.length).map(({ output }) => output)
}
