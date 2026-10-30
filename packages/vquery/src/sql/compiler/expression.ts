import { sql, type RawBuilder } from 'kysely'
import type { Expression } from '../ast'
import type { SQLStrategy } from './types'

export const buildNumericExpression = (ast: Expression, strategy: SQLStrategy): RawBuilder<unknown> => {
  const build = (node: Expression): RawBuilder<unknown> => {
    switch (node.type) {
      case 'field':
        return sql`cast(${sql.id(node.name)} as double)`
      case 'literal':
        return typeof node.value === 'number'
          ? sql`cast(${strategy.value(node.value)} as double)`
          : strategy.value(node.value)
      case 'unary':
        return sql`(${sql.raw(node.operator)}${build(node.value)})`
      case 'binary':
        return node.operator === '/'
          ? sql`(${build(node.left)} / nullif(${build(node.right)}, 0))`
          : sql`(${build(node.left)} ${sql.raw(node.operator)} ${build(node.right)})`
      case 'call':
        return sql`${sql.raw(node.name)}(${sql.join(node.arguments.map(build))})`
      default:
        throw new Error('Unsupported numeric expression')
    }
  }
  return build(ast)
}
