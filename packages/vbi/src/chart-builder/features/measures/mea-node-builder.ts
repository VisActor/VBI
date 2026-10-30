import type { VBIMeasure, VBIMeasureFormat } from 'src/types'
import { QueryMeasureNodeBuilder } from 'src/query-builder/features/measures/mea-node-builder'

/** @description 度量节点构建器，在查询配置上补充图形配置。 */
export class MeasureNodeBuilder extends QueryMeasureNodeBuilder<VBIMeasure> {
  /**
   * @description 获取图表编码位置
   */
  getEncoding(): VBIMeasure['encoding'] | undefined {
    return this.yMap.get('encoding')
  }

  /**
   * @description 设置图表编码位置
   * @param encoding - 指标编码位置
   */
  setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this {
    this.yMap.set('encoding', encoding)
    return this
  }

  /**
   * @description 设置数值格式
   * @param format - 格式配置
   */
  setFormat(format: VBIMeasureFormat): this {
    this.yMap.set('format', format)
    return this
  }

  /**
   * @description 获取数值格式
   */
  getFormat(): VBIMeasureFormat | undefined {
    return this.yMap.get('format')
  }

  /**
   * @description 清除数值格式配置
   */
  clearFormat(): this {
    this.yMap.delete('format')
    return this
  }
}
