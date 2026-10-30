import { parseSQLExpression } from './parser'
import type { Expression } from './ast'
import type { DatasetColumn } from '../types'

/** Parse a portable numeric expression; identifiers and constants remain separate SQL nodes. */
export const parseNumericExpression = (
  expression: string,
  parameters: (number | null)[] = [],
  columns: DatasetColumn[] = [],
  completeSchema: boolean = columns.length > 0,
): Expression => {
  if (typeof expression !== 'string' || !expression.trim()) throw new Error('Expected numeric expression')
  if (
    !Array.isArray(parameters) ||
    parameters.some((value) => value !== null && (typeof value !== 'number' || !Number.isFinite(value)))
  )
    throw new Error('Expression parameters must be finite numbers or null')
  const types = new Map(columns.map((column) => [column.name, column.type]))
  const validate = (node: Expression): void => {
    switch (node.type) {
      case 'field':
        if (!node.name) throw new Error('Expected expression field')
        if ((types.has(node.name) || completeSchema) && types.get(node.name) !== 'number')
          throw new Error(`Expression requires a number column: ${node.name}`)
        return
      case 'literal':
        if (node.value !== null && (typeof node.value !== 'number' || !Number.isFinite(node.value)))
          throw new Error('Expression constants must be finite numbers or null')
        return
      case 'unary':
        return validate(node.value)
      case 'binary':
        validate(node.left)
        return validate(node.right)
      case 'call':
        if (
          node.distinct ||
          !['abs', 'coalesce', 'nullif'].includes(node.name) ||
          node.arguments.length !== (node.name === 'abs' ? 1 : 2)
        )
          throw new Error(`Unsupported numeric function: ${node.name}`)
        node.arguments.forEach(validate)
        return
      default:
        throw new Error('Unsupported numeric expression')
    }
  }
  const ast = parseSQLExpression(expression, parameters)
  validate(ast)
  return ast
}
