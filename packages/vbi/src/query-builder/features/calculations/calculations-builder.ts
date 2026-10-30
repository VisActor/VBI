import * as Y from 'yjs'
import { id } from 'src/utils/id'
import { zVBICalculation, type VBICalculation } from 'src/types/queryDSL/calculation'
import { CalculationNodeBuilder } from './calculation-node-builder'

/** @description 管理查询结果上的计算列，所有修改参与 Yjs 事务。协同各端从同一初始化更新恢复，容器初始化应在分发前完成。 */
export class CalculationsBuilder {
  constructor(
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
  ) {
    doc.transact(() => {
      if (dsl.get('calculations') === undefined) dsl.set('calculations', new Y.Array())
    })
  }

  private get items(): Y.Array<Y.Map<any>> {
    return this.dsl.get('calculations')
  }

  /** @description 添加计算列；表达式引用基础查询的维度或度量 ID。 */
  add(expr: string, callback: (node: CalculationNodeBuilder) => void): this {
    const value = zVBICalculation.parse({ id: id.uuid(), alias: expr, expr })
    this.doc.transact(() => {
      const yMap = new Y.Map(Object.entries(value))
      this.items.push([yMap])
      callback(new CalculationNodeBuilder(yMap))
    })
    return this
  }

  /** @description 删除指定 ID 的计算列。 */
  remove(id: string): this {
    this.doc.transact(() => {
      const index = this.items.toArray().findIndex((item) => item.get('id') === id)
      if (index !== -1) this.items.delete(index, 1)
    })
    return this
  }

  /** @description 更新指定 ID 的计算列。 */
  update(id: string, callback: (node: CalculationNodeBuilder) => void): this {
    const node = this.find((node) => node.getId() === id)
    if (!node) throw new Error(`Calculation with id "${id}" not found`)
    this.doc.transact(() => callback(node))
    return this
  }

  /** @description 按条件查找第一个计算列。 */
  find(predicate: (node: CalculationNodeBuilder, index: number) => boolean): CalculationNodeBuilder | undefined {
    return this.findAll().find(predicate)
  }

  /** @description 获取全部计算列。 */
  findAll(): CalculationNodeBuilder[] {
    return this.items.toArray().map((item) => new CalculationNodeBuilder(item))
  }

  /** @description 导出计算列配置。 */
  toJSON(): VBICalculation[] {
    return this.findAll().map((node) => node.toJSON())
  }
}
