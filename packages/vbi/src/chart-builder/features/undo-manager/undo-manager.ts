import * as Y from 'yjs'

/** @description 撤销历史选项。只记录本地事务；默认追踪 origin 为 null 的事务。 */
export interface UndoManagerOptions {
  /** @description 合并相邻操作的时间窗口（毫秒）；0 表示每个事务独立成一步。 */
  captureTimeout?: number
  /** @description 需要记录的本地事务来源，可包含 origin 对象或其构造函数。 */
  trackedOrigins?: Set<unknown>
}

/**
 * @description 撤销/重做管理器，提供基于 YJS 的撤销和重做功能，支持栈管理和历史清除操作
 */
export class UndoManager {
  private manager: Y.UndoManager

  /**
   * @description 构造函数
   * @param scope - YJS 文档或类型作用域，用于定义撤销/重做的追踪范围
   */
  constructor(scope: Y.Doc | Y.AbstractType<any> | Y.AbstractType<any>[], options: UndoManagerOptions = {}) {
    this.manager = new Y.UndoManager(scope, {
      ...options,
      trackedOrigins: new Set(options.trackedOrigins ?? [null]),
      captureTransaction: (transaction) => transaction.local,
    })
  }

  /**
   * @description 撤销上一次修改
   * @returns 是否成功撤销
   */
  undo(): boolean {
    return this.manager.undo() !== null
  }

  /**
   * @description 重做被撤销的修改
   * @returns 是否成功重做
   */
  redo(): boolean {
    return this.manager.redo() !== null
  }

  /**
   * @description 检查是否有可撤销的操作
   * @returns 是否可以撤销
   */
  canUndo(): boolean {
    return this.manager.canUndo()
  }

  /**
   * @description 检查是否有可重做的操作
   * @returns 是否可以重做
   */
  canRedo(): boolean {
    return this.manager.canRedo()
  }

  /**
   * @description 清除历史记录
   * @param clearUndoStack - 是否清除撤销栈，默认 true
   * @param clearRedoStack - 是否清除重做栈，默认 true
   */
  clear(clearUndoStack?: boolean, clearRedoStack?: boolean): void {
    this.manager.clear(clearUndoStack, clearRedoStack)
  }

  /** @description 结束当前历史分组，下一次修改作为新的撤销步骤。 */
  stopCapturing(): void {
    this.manager.stopCapturing()
  }

  /** @description 开始追踪指定来源的本地事务。 */
  addTrackedOrigin(origin: unknown): void {
    this.manager.addTrackedOrigin(origin)
  }

  /** @description 停止追踪指定来源的本地事务，不影响已有历史。 */
  removeTrackedOrigin(origin: unknown): void {
    this.manager.removeTrackedOrigin(origin)
  }

  /** @description 订阅历史新增、合并、撤销、重做和清空，返回取消订阅函数；回调中可读取 canUndo / canRedo。 */
  observe(callback: () => void): () => void {
    const events = ['stack-item-added', 'stack-item-updated', 'stack-item-popped', 'stack-cleared'] as const
    for (const event of events) this.manager.on(event, callback)
    return () => {
      for (const event of events) this.manager.off(event, callback)
    }
  }

  /** @description 停止追踪并释放监听器；销毁所属 Y.Doc 时也会自动释放。 */
  destroy(): void {
    this.manager.destroy()
  }
}
