import * as Y from 'yjs'
import { VBIMeasure } from '../../../types'
import { zVBIMeasure } from '../../../types/dsl/measures/measures'
import type { ZodIssue } from 'zod'

/**
 * MeasureNodeBuilder - 用于构建和修改单个指标
 * 提供链式 API 并包含错误处理和验证
 */
export class MeasureNodeBuilder {
  private validationErrors: string[] = []

  constructor(private yMap: Y.Map<any>) {}

  /**
   * 设置指标别名
   * @param alias - 新的别名
   * @throws 如果别名不是非空字符串
   */
  setAlias(alias: string): this {
    if (typeof alias !== 'string' || alias.trim().length === 0) {
      this.validationErrors.push('Alias must be a non-empty string')
      return this
    }
    this.yMap.set('alias', alias.trim())
    return this
  }

  /**
   * 设置指标编码通道
   * @param encoding - 编码类型
   * @throws 如果编码不在允许的范围内
   */
  setEncoding(encoding: VBIMeasure['encoding']): this {
    const validEncodings = ['yAxis', 'xAxis', 'color', 'label', 'tooltip', 'size']
    if (!validEncodings.includes(encoding)) {
      this.validationErrors.push(
        `Invalid encoding: "${encoding}". Valid options: ${validEncodings.join(', ')}`
      )
      return this
    }
    this.yMap.set('encoding', encoding)
    return this
  }

  /**
   * 设置聚合方式
   * @param aggregate - 聚合配置
   * @throws 如果聚合配置无效
   */
  setAggregate(aggregate: VBIMeasure['aggregate']): this {
    if (!aggregate || typeof aggregate.func !== 'string') {
      this.validationErrors.push('Aggregate must have a valid func property')
      return this
    }

    const validFuncs = ['sum', 'count', 'avg', 'min', 'max', 'quantile']
    if (!validFuncs.includes(aggregate.func)) {
      this.validationErrors.push(
        `Invalid aggregate func: "${aggregate.func}". Valid options: ${validFuncs.join(', ')}`
      )
      return this
    }

    if (aggregate.func === 'quantile' && (typeof aggregate.quantile !== 'number' || aggregate.quantile < 0 || aggregate.quantile > 1)) {
      this.validationErrors.push('Quantile must be a number between 0 and 1')
      return this
    }

    this.yMap.set('aggregate', aggregate)
    return this
  }

  /**
   * 构建最终的 VBIMeasure 对象
   * @returns 验证后的指标对象
   * @throws 如果验证失败
   */
  build(): VBIMeasure {
    const data = this.yMap.toJSON() as VBIMeasure
    const result = zVBIMeasure.safeParse(data)

    if (!result.success) {
      const errorMessages = result.error.issues.map(
        (issue: ZodIssue) => `${issue.path.join('.')}: ${issue.message}`
      ).join('; ')
      throw new Error(`Measure validation failed: ${errorMessages}`)
    }

    return result.data
  }

  /**
   * 获取验证错误列表
   */
  getValidationErrors(): string[] {
    return [...this.validationErrors]
  }

  /**
   * 检查是否有验证错误
   */
  hasValidationErrors(): boolean {
    return this.validationErrors.length > 0
  }

  /**
   * 清除验证错误
   */
  clearValidationErrors(): void {
    this.validationErrors = []
  }
}
