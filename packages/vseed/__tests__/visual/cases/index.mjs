/** 首批图表、表格和交互用例；新增必须显式登记。 */
export const cases = [
  {
    id: 'column',
    purpose: 'VSeed DSL 生成柱图配置并实际绘制',
    file: './column.mjs',
  },
  {
    id: 'table',
    purpose: 'VSeed 表格字段和值正确映射',
    file: './table.mjs',
  },
  {
    id: 'table-select',
    purpose: '真实鼠标选择表格单元并验证事件与选区',
    file: './table-select.mjs',
  },
  {
    id: 'chart-update',
    purpose: '更新 VSeed DSL 后实例使用新的数据配置',
    file: './chart-update.mjs',
  },
]
/** Node 与浏览器读取相同冻结模块。 */
export function loadCase(item) {
  return import(item.file)
}
