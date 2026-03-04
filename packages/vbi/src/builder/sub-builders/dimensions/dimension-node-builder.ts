import * as Y from 'yjs'
import { VBIDimension } from '../../../types'
import { zVBIDimensionSchema } from '../../../types/dsl/dimensions/dimensions'
import type { ZodIssue } from 'zod'

/**
 * DimensionNodeBuilder - 用于构建和修改单个维度
 * 提供链式 API 并包含错误处理和验证
 */
export class DimensionNodeBuilder {
  private validationErrors: string[] = []

  constructor(private yMap: Y.Map<any>) {}

  /**
   * 设置维度别名
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
   * 设置层级类型
   * @param hierarchyType - 层级类型 (category | time | geo | custom)
   */
  setHierarchyType(hierarchyType: 'category' | 'time' | 'geo' | 'custom'): this {
    const validTypes = ['category', 'time', 'geo', 'custom']
    if (!validTypes.includes(hierarchyType)) {
      this.validationErrors.push(
        `Invalid hierarchyType: "${hierarchyType}". Valid options: ${validTypes.join(', ')}`
      )
      return this
    }
    this.yMap.set('hierarchyType', hierarchyType)
    return this
  }

  /**
   * 设置格式化器
   * @param format - 格式化字符串
   */
  setFormat(format: string): this {
    if (typeof format !== 'string') {
      this.validationErrors.push('Format must be a string')
      return this
    }
    this.yMap.set('format', format)
    return this
  }

  /**
   * 构建最终的 VBIDimension 对象
   * @returns 验证后的维度对象
   * @throws 如果验证失败
   */
  build(): VBIDimension {
    const data = this.yMap.toJSON() as VBIDimension
    const result = zVBIDimensionSchema.safeParse(data)

    if (!result.success) {
      const errorMessages = result.error.issues.map(
        (issue: ZodIssue) => `${issue.path.join('.')}: ${issue.message}`
      ).join('; ')
      throw new Error(`Dimension validation failed: ${errorMessages}`)
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
