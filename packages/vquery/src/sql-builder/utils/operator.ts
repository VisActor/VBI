const operatorMap: Record<string, string> = {
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  eq: '=',
  neq: '!=',
}

export const toSqlOperator = (op: string): string => {
  return operatorMap[op] ?? op
}
