import * as Y from 'yjs'
import { VBIHavingFilter, FilterOperator, LogicalOperator } from '../../../types'
import { zVBIHavingFilter } from '../../../types/dsl/having/having'
import type { ZodIssue } from 'zod'

/**
 * HavingFilterNodeBuilder - 用于构建和修改单个筛选条件
 * 提供链式 API 并包含错误处理和验证
 */
export class HavingFilterNodeBuilder {
  private validationErrors: string[] = []

  constructor(private yMap: Y.Map<any>) {}

  /**
   * 设置筛选值
   * @param value - 筛选值
   */
  setValue(value: unknown): this {
    this.yMap.set('value', value)
    return this
  }

  /**
   * 设置筛选操作符
   * @param operator - 操作符
   */
  setOperator(operator: FilterOperator): this {
    const validOperators = [
      'sum', 'avg', 'count', 'min', 'max',
      'eq', 'neq', 'gt', 'gte', 'lt', 'lte',
      'contains', 'startsWith', 'endsWith', 'between'
    ]
    if (!validOperators.includes(operator)) {
      this.validationErrors.push(`Invalid operator: "${operator}". Valid options: ${validOperators.join(', ')}`)
      return this
    }
    this.yMap.set('operator', operator)
    return this
  }

  /**
   * 设置逻辑运算符
   * @param logical - 逻辑运算符 (and/or)
   */
  setLogical(logical: LogicalOperator): this {
    if (logical !== 'and' && logical !== 'or') {
      this.validationErrors.push('Logical must be either "and" or "or"')
      return this
    }
    this.yMap.set('logical', logical)
    return this
  }

  /**
   * 构建最终的 VBIHavingFilter 对象
   * @returns 验证后的筛选条件对象
   * @throws 如果验证失败
   */
  build(): VBIHavingFilter {
    const data = this.yMap.toJSON() as VBIHavingFilter
    const result = zVBIHavingFilter.safeParse(data)

    if (!result.success) {
      const errorMessages = result.error.issues
        .map((issue: ZodIssue) => `${issue.path.join('.')}: ${issue.message}`)
        .join('; ')
      throw new Error(`HavingFilter validation failed: ${errorMessages}`)
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
