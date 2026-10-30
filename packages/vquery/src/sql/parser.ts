import type { BinaryOperator, LikeOperator, Expression, Predicate, SelectQuery, SelectItem } from './ast'

type TokenOperator = BinaryOperator | '||' | '::'

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
      let closed = false
      index += 1
      while (index < sql.length) {
        if (sql[index] === '"' && sql[index + 1] === '"') {
          value += '"'
          index += 2
        } else if (sql[index] === '"') {
          index += 1
          closed = true
          break
        } else value += sql[index++]
      }
      if (!closed) throw new Error('Unterminated SQL identifier')
      tokens.push({ kind: 'identifier', value })
      continue
    }
    if (character === "'") {
      let value = ''
      let closed = false
      index += 1
      while (index < sql.length) {
        if (sql[index] === "'" && sql[index + 1] === "'") {
          value += "'"
          index += 2
        } else if (sql[index] === "'") {
          index += 1
          closed = true
          break
        } else value += sql[index++]
      }
      if (!closed) throw new Error('Unterminated SQL string')
      tokens.push({ kind: 'string', value })
      continue
    }
    if (
      sql.startsWith('/*', index) ||
      (sql.startsWith('--', index) && (sql[index + 2] === undefined || /\s/.test(sql[index + 2])))
    )
      throw new Error('SQL comments are not supported')
    if (/\d/.test(character) || (character === '.' && /\d/.test(sql[index + 1] ?? ''))) {
      const value = sql.slice(index).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/)![0]
      index += value.length
      tokens.push({ kind: 'number', value })
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
    else if ('(),*;.+-/?'.includes(character)) tokens.push({ kind: 'symbol', value: character })
    else throw new Error(`Unsupported SQL character: ${character}`)
    index += 1
  }
  return tokens
}

class Parser {
  private index = 0
  private parameterIndex = 0

  constructor(
    private readonly tokens: Token[],
    private readonly parameters?: readonly (number | null)[],
  ) {}

  private current(): Token | undefined {
    return this.tokens[this.index]
  }

  private is(value: string): boolean {
    const token = this.current()
    return (
      token !== undefined &&
      token.kind !== 'identifier' &&
      token.kind !== 'string' &&
      token.value.toLowerCase() === value.toLowerCase()
    )
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
    const parts = [this.additive()]
    while (this.match('||')) parts.push(this.additive())
    return parts.length === 1 ? parts[0] : { type: 'concat', parts }
  }

  private additive(): Expression {
    let result = this.multiplicative()
    while (this.is('+') || this.is('-')) {
      const operator = this.current()!.value as '+' | '-'
      this.index++
      result = { type: 'binary', operator, left: result, right: this.multiplicative() }
    }
    return result
  }

  private multiplicative(): Expression {
    let result = this.unary()
    while (this.is('*') || this.is('/')) {
      const operator = this.current()!.value as '*' | '/'
      this.index++
      result = { type: 'binary', operator, left: result, right: this.unary() }
    }
    return result
  }

  private unary(): Expression {
    if (this.is('+') || this.is('-')) {
      const operator = this.current()!.value as '+' | '-'
      this.index++
      return { type: 'unary', operator, value: this.unary() }
    }
    return this.castExpression()
  }

  private castExpression(): Expression {
    const expression = this.primary()
    if (this.parameters && (this.is('collate') || this.is('::'))) throw new Error('Unsupported expression cast')
    if (this.match('collate')) this.identifier()
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
    if (this.match('?')) {
      if (!this.parameters || this.parameterIndex >= this.parameters.length)
        throw new Error('Missing expression parameter')
      return { type: 'literal', value: this.parameters[this.parameterIndex++] }
    }
    if (token.kind === 'number') {
      this.index += 1
      return { type: 'literal', value: Number(token.value) }
    }
    if (token.kind === 'string') {
      this.index += 1
      return { type: 'literal', value: token.value }
    }
    let name = this.identifier()
    while (this.match('.')) {
      if (this.parameters) throw new Error('Expression fields must be unqualified')
      name = this.identifier()
    }
    const lowerName = name.toLowerCase()
    if ((lowerName === 'date' || lowerName === 'timestamp') && this.current()?.kind === 'string') {
      const value = this.current()!.value
      this.index += 1
      return { type: 'literal', value }
    }
    if (token.kind === 'word' && lowerName === 'case') {
      this.expect('when')
      const when = this.predicate()
      this.expect('then')
      const value = this.scalar()
      this.expect('end')
      return { type: 'case', when, value }
    }
    if (!this.match('(')) {
      if (token.kind === 'word') {
        if (lowerName === 'null') return { type: 'literal', value: null }
        if (lowerName === 'true') return { type: 'literal', value: true }
        if (lowerName === 'false') return { type: 'literal', value: false }
      }
      return { type: 'field', name }
    }

    if (lowerName === 'cast') {
      if (this.parameters) throw new Error('Unsupported expression cast')
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

  public parseExpression(): Expression {
    const expression = this.scalar()
    if (this.current()) throw new Error(`Unexpected expression token: ${this.current()!.value}`)
    if (this.parameterIndex !== this.parameters!.length) throw new Error('Unused expression parameters')
    return expression
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
    const start = this.index
    const parameterStart = this.parameterIndex
    if (this.match('(')) {
      const result = this.predicate()
      this.expect(')')
      if (result.type !== 'truthy') return result
      this.index = start
      this.parameterIndex = parameterStart
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

  public parse(nested = false): SelectQuery {
    this.expect('select')
    const select: SelectItem[] = []
    do {
      const expression = this.scalar()
      const alias = this.match('as') ? this.identifier() : undefined
      select.push({ expression, alias })
    } while (this.match(','))

    const result: SelectQuery = { select, groupBy: [], orderBy: [] }
    if (this.match('from')) {
      if (this.match('(')) {
        result.subquery = this.parse(true)
        this.expect(')')
        this.expect('as')
        this.identifier()
      } else result.table = this.identifier()
    }
    while (this.current() && !(nested && this.is(')')) && !this.match(';')) {
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
    if (!nested && this.current()) throw new Error(`Unexpected SQL token: ${this.current()!.value}`)
    return result
  }
}

export const parseSQL = (sql: string): SelectQuery => new Parser(tokenize(sql)).parse()

export const parseSQLExpression = (expression: string, parameters: readonly (number | null)[] = []): Expression =>
  new Parser(tokenize(expression), parameters).parseExpression()
