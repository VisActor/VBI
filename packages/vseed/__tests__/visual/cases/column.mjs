import { assertionError } from '../assertions.mjs'
/** 固定小数据同时覆盖字段映射和可见数值。 */
export function createSpec() {
  return {
    chartType: 'column',
    dataset: [
      { category: 'A', amount: 10 },
      { category: 'B', amount: 20 },
      { category: 'C', amount: 30 },
    ],
    dimensions: [{ id: 'category' }],
    measures: [{ id: 'amount' }],
  }
}

/** 校验构建结果确为柱图，数据经生成 spec 进入真实实例。 */
export async function verify(page) {
  const ok = await page.evaluate(
    () =>
      window.__visualSpec.type === 'bar' &&
      window.__visualStage.getChart().getAllSeries()[0].getViewData().latestData.length === 3,
  )
  if (!ok) throw assertionError('柱图生成类型或数据数量不符')
}
