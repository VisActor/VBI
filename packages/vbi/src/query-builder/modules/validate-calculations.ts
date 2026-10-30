import type { VBICalculation } from 'src/types/queryDSL/calculation'

/** @description 执行前校验计算表达式，按需加载 VQuery，不读取数据或修改协同状态。 */
export const validateCalculations = async (calculations?: VBICalculation[]): Promise<void> => {
  if (!calculations?.length) return
  const { VQuery } = await import('@visactor/vquery')
  for (const { expr, parameters } of calculations) VQuery.validateExpression(expr, { parameters })
}
