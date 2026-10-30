import type { Expression } from '../../src/sql/ast'

/** Deterministic ASTs authored independently of the parser, with SQL serialization and bindings. */
export const createNumericAstCases = (count = 1000, seed = 7302026) => {
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  const fields = ['x', 'y', 'select', 'a"b', '?', 'sales.amount']
  type Node = { expr: string; parameters: (number | null)[]; ast: Expression }
  const make = (depth: number): Node => {
    if (!depth || random() < 0.3) {
      if (random() < 0.5) {
        const name = fields[Math.floor(random() * fields.length)]
        return { expr: '"' + name.replaceAll('"', '""') + '"', parameters: [], ast: { type: 'field', name } }
      }
      const value = random() < 0.15 ? null : Math.floor(random() * 100) / 10
      if (random() < 0.5) return { expr: '?', parameters: [value], ast: { type: 'literal', value } }
      return { expr: value === null ? 'NULL' : String(value), parameters: [], ast: { type: 'literal', value } }
    }
    const kind = Math.floor(random() * 3)
    const left = make(depth - 1)
    if (kind === 0) {
      const operator = random() < 0.5 ? '+' : '-'
      return {
        expr: `${operator}(${left.expr})`,
        parameters: left.parameters,
        ast: { type: 'unary', operator, value: left.ast },
      }
    }
    const right = make(depth - 1)
    if (kind === 1) {
      const operator = (['+', '-', '*', '/'] as const)[Math.floor(random() * 4)]
      const precedence = (ast: Expression) =>
        ast.type === 'binary' ? (ast.operator === '+' || ast.operator === '-' ? 1 : 2) : 3
      const level = operator === '+' || operator === '-' ? 1 : 2
      const compact = random() < 0.5
      const operand = (node: Node, right: boolean) =>
        !compact || precedence(node.ast) < level || (right && precedence(node.ast) === level)
          ? `(${node.expr})`
          : node.expr
      return {
        expr: `${operand(left, false)}${operator}${operand(right, true)}`,
        parameters: [...left.parameters, ...right.parameters],
        ast: { type: 'binary', operator, left: left.ast, right: right.ast },
      }
    }
    const name = ['abs', 'coalesce', 'nullif'][Math.floor(random() * 3)]
    const args = name === 'abs' ? [left] : [left, right]
    return {
      expr: `${name.toUpperCase()}(${args.map((x) => x.expr).join(',')})`,
      parameters: args.flatMap((x) => x.parameters),
      ast: { type: 'call', name, arguments: args.map((x) => x.ast), distinct: false },
    }
  }
  return Array.from({ length: count }, (_, index) => ({ name: `seed-${index}`, ...make(5) }))
}
