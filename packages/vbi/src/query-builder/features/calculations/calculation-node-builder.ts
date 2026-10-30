import type * as Y from 'yjs'
import { zVBICalculation, type VBICalculation } from 'src/types/queryDSL/calculation'
import type { VBISort } from 'src/types/queryDSL/sort'

/** @description 计算列节点构建器，配置表达式、名称和排序。 */
export class CalculationNodeBuilder {
  constructor(private yMap: Y.Map<any>) {}

  /** @description 获取计算列 ID。 */
  getId(): string {
    return this.yMap.get('id')
  }

  /** @description 获取局部 SQL 表达式。 */
  getExpression(): string {
    return this.yMap.get('expr')
  }

  /** @description 设置显示名称。 */
  setAlias(alias: string): this {
    this.yMap.set('alias', alias)
    return this
  }

  /** @description 设置数值 SQL 表达式及绑定参数；省略参数时清除旧参数。 */
  setExpression(expr: string, parameters?: (number | null)[]): this {
    const value = zVBICalculation.pick({ expr: true, parameters: true }).parse({ expr, parameters })
    this.yMap.doc!.transact(() => {
      this.yMap.set('expr', value.expr)
      if (value.parameters) this.yMap.set('parameters', value.parameters)
      else this.yMap.delete('parameters')
    })
    return this
  }

  /** @description 获取排序配置。 */
  getSort(): VBISort | undefined {
    return this.yMap.get('sort')
  }

  /** @description 设置排序配置。 */
  setSort(sort: VBISort): this {
    this.yMap.set('sort', sort)
    return this
  }

  /** @description 清除排序配置。 */
  clearSort(): this {
    this.yMap.delete('sort')
    return this
  }

  /** @description 导出计算列配置。 */
  toJSON(): VBICalculation {
    return structuredClone(this.yMap.toJSON()) as VBICalculation
  }
}
