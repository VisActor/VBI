/**
 * SQL operator mapping from VBI DSL operators to SQL operators
 */
export const OPERATOR_MAP: Record<string, string> = {
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  eq: '=',
  neq: '!=',
}

export const toSqlOperator = (op: string): string => {
  return OPERATOR_MAP[op] ?? op
}
