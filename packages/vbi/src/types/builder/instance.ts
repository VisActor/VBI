import type { IVChart } from '@visactor/vchart'
import type { BaseTableAPI } from '@visactor/vtable'

/** @description 图表的运行时实例；仅保存在本地，不写入 DSL、协同更新或撤销历史。 */
export type VBIChartInstance = IVChart | BaseTableAPI

/** @description VChart 与 VTable 的原生事件注册签名；按当前绑定的渲染器使用。 */
export type VBIChartInstanceOn = BaseTableAPI['on'] & IVChart['on']

/** @description VChart 与 VTable 的原生事件取消签名；按当前绑定的渲染器使用。 */
export type VBIChartInstanceOff = BaseTableAPI['off'] & IVChart['off']
