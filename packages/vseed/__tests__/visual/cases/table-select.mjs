import { assertionError } from '../assertions.mjs'
export { createSpec } from './table.mjs'

/** 实际鼠标点击数据格，监听真实事件并检查最终选区。 */
export async function exercise(page) {
  const rect = await page.evaluate(() => {
    const table = window.__visualStage
    window.__clicks = []
    table.on('click_cell', (event) => window.__clicks.push([event.col, event.row]))
    const rect = table.getCellRect(1, 2)
    return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom }
  })
  const box = await page.locator('#chart').boundingBox()
  await page.mouse.click(box.x + (rect.left + rect.right) / 2, box.y + (rect.top + rect.bottom) / 2)
}
/** 事件和选区都必须指向被点击的数据单元格。 */
export async function verify(page) {
  const ok = await page.evaluate(() => {
    const ranges = window.__visualStage.getSelectedCellRanges()
    return (
      window.__clicks.some(([col, row]) => col === 1 && row === 2) &&
      ranges.some((range) => range.start.col === 1 && range.start.row === 2)
    )
  })
  if (!ok) throw assertionError('鼠标点击未选中指定表格单元')
}
