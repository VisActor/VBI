import { assertionError } from '../assertions.mjs'
/** 固定小数据同时覆盖字段映射和可见数值。 */
export function createSpec() {
  return {
    chartType: 'table',
    dataset: [
      { category: 'A', amount: 10 },
      { category: 'B', amount: 20 },
      { category: 'C', amount: 30 },
    ],
    dimensions: [{ id: 'category' }],
    measures: [{ id: 'amount' }],
  }
}

/** 直接检查表格渲染模型中的字段和值，不能只靠截图存在。 */
export async function verify(page) {
  const ok = await page.evaluate(() => {
    const table = window.__visualStage
    return (
      table.rowCount === 4 &&
      table.colCount === 2 &&
      table.getCellValue(0, 1) === 'A' &&
      String(table.getCellValue(1, 3)) === '30'
    )
  })
  if (!ok) throw assertionError('表格字段或数值映射不符')
}
