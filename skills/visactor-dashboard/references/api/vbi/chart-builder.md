# chart-builder

[API 索引](index.md)

- [ChartInstanceBuilder](chart-builder.md#chartinstancebuilder)
- [ChartTypeBuilder](chart-builder.md#charttypebuilder)
- [DimensionsBuilder](chart-builder.md#dimensionsbuilder)
- [LocaleBuilder](chart-builder.md#localebuilder)
- [MeasuresBuilder](chart-builder.md#measuresbuilder)
- [ThemeBuilder](chart-builder.md#themebuilder)
- [VBIChartBuilder](chart-builder.md#vbichartbuilder)
- [buildVQuery](chart-builder.md#buildvquery)
- [defaultVBIChartBuilderAdapters](chart-builder.md#defaultvbichartbuilderadapters)
- [resolveVBIChartBuilderAdapters](chart-builder.md#resolvevbichartbuilderadapters)

类型引用沿用源码模块名，包的公开导出以索引为准：

```typescript
import type * as Y from 'yjs'
import type {
  BuildVSeedOptions,
  QueryOptions,
  VBIQueryResult,
  VBIChartDSL,
  VBIChartBuilderAdapters,
  VBIChartBuilderInterface,
  VBIChartBuilderOptions,
} from 'src/types'
import type { ChartTypeBuilder } from '../chart-type'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from './types'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed'
import type { ObserveCallback } from 'src/types'
import type { VBIChartBuilderAdapters } from 'src/types'
import type { VBIChartBuilderInterface, VBIChartDSL } from 'src/types'
import type { VBIChartInstance, VBIChartInstanceOn, VBIChartInstanceOff } from 'src/types'
import type { VBIDimension, VBIDimensionTree, VBIDimensionGroup } from 'src/types'
import type { VBIMeasure, VBIMeasureTree, VBIMeasureGroup } from 'src/types'
import { DimensionNodeBuilder } from './dim-node-builder'
import {
  DimensionsBuilder,
  MeasuresBuilder,
  ChartTypeBuilder,
  ChartInstanceBuilder,
  ThemeBuilder,
  LocaleBuilder,
} from './features'
import { MeasureNodeBuilder } from './mea-node-builder'
import { QueryBuilderBase } from 'src/query-builder/base'
import { QueryDimensionsBuilderBase } from 'src/query-builder/features/dimensions/dim-builder'
import { QueryMeasuresBuilderBase } from 'src/query-builder/features/measures/mea-builder'
```

## ChartInstanceBuilder

源码：[packages/vbi/src/chart-builder/features/instance/instance-builder.ts](https://github.com/VisActor/VBI/blob/main/packages/vbi/src/chart-builder/features/instance/instance-builder.ts#L8)

包导出：`ChartInstanceBuilder`

```typescript
/** @description 管理图表的本地渲染实例及原生事件代理，不参与 DSL、协同同步或撤销历史。 */
export declare class ChartInstanceBuilder {
  constructor(doc: Y.Doc, chartType: ChartTypeBuilder)
  /**
   * @description 绑定运行时实例并返回当前实例构建器。table / pivotTable 使用 VTable，其余类型使用 VChart。重复绑定替换引用，undefined 解绑；同一实例不能绑定到两个构建器。切换图表类型或销毁文档时自动解绑，事件清理和 release 由调用方负责。
   * @param instance - 已创建的 VChart / VTable 实例，或 undefined
   */
  bind(instance: VBIChartInstance | undefined): this
  /** @description 获取绑定实例，未绑定时返回 undefined。类型参数可指定调用方已知的 IVChart 或 BaseTableAPI 等原生类型。 */
  get<T extends VBIChartInstance = VBIChartInstance>(): T | undefined
  /** @description 代理当前实例的原生 on，保留参数、返回值和 this；VTable 返回监听器 ID。必须先 bind，重新绑定后需重新注册监听器。 */
  on: VBIChartInstanceOn
  /** @description 代理当前实例的原生 off；VChart 接收事件名及回调，VTable 接收监听器 ID。未绑定时抛出错误。 */
  off: VBIChartInstanceOff
}
```

## ChartTypeBuilder

源码：[packages/vbi/src/chart-builder/features/chart-type/chart-type-builder.ts](https://github.com/VisActor/VBI/blob/main/packages/vbi/src/chart-builder/features/chart-type/chart-type-builder.ts#L18)

包导出：`ChartTypeBuilder`

```typescript
/**
 * @description 图表类型构建器，用于切换和获取图表类型。支持表格、柱状图、折线图、饼图、散点图等多种图表类型
 */
export declare class ChartTypeBuilder {
  /**
   * @description 构造函数
   */
  constructor(doc: Y.Doc, dsl: Y.Map<any>)
  /**
   * @description 监听图表类型变化
   * @param callback - 回调函数
   */
  /**
   * @description 监听图表类型变化，返回取消监听的函数
   * @param callback - 回调函数
   * @returns 取消监听的函数
   */
  observe(callback: ObserveCallback): () => void
  /**
   * @description 设置图表类型
   * @param chartType - 图表类型
   */
  changeChartType(chartType: string): void
  /**
   * @description 获取当前图表类型
   */
  getChartType(): string
  /**
   * @description 获取当前图表类型支持的维度编码
   */
  getSupportedDimensionEncodings(): import('./dimension-encoding').SupportedDimensionEncoding[]
  /**
   * @description 根据当前图表类型，按维度顺序返回推荐的维度编码
   * @param dimensionCount - 维度数量，默认使用当前 DSL 中的维度数量
   */
  getRecommendedDimensionEncodings(dimensionCount?: number): import('./dimension-encoding').SupportedDimensionEncoding[]
  /**
   * @description 获取当前图表类型支持的指标编码
   */
  getSupportedMeasureEncodings(): import('./measure-encoding').SupportedMeasureEncoding[]
  /**
   * @description 根据当前图表类型，按指标顺序返回推荐的指标编码
   * @param measureCount - 指标数量，默认使用当前 DSL 中的指标数量
   */
  getRecommendedMeasureEncodings(measureCount?: number): import('./measure-encoding').SupportedMeasureEncoding[]
  /**
   * @description 导出为 JSON
   */
  toJSON(): string
  /**
   * @description 获取所有支持的图表类型
   */
  getAvailableChartTypes(): string[]
}
```

## DimensionsBuilder

源码：[packages/vbi/src/chart-builder/features/dimensions/dim-builder.ts](https://github.com/VisActor/VBI/blob/main/packages/vbi/src/chart-builder/features/dimensions/dim-builder.ts#L9)

包导出：`DimensionsBuilder`

继承的公开成员见：[QueryDimensionsBuilderBase](types.md#querydimensionsbuilderbase)。

```typescript
/** @description 维度构建器，在查询字段操作上补充图形编码。 */
export declare class DimensionsBuilder extends QueryDimensionsBuilderBase<VBIDimension, DimensionNodeBuilder> {
  static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
  static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
}
```

## LocaleBuilder

源码：[packages/vbi/src/chart-builder/features/locale/locale-builder.ts](https://github.com/VisActor/VBI/blob/main/packages/vbi/src/chart-builder/features/locale/locale-builder.ts#L7)

包导出：`LocaleBuilder`

```typescript
/**
 * @description 语言构建器，用于设置和获取当前语言
 */
export declare class LocaleBuilder {
  /**
   * @description 构造函数
   */
  constructor(_doc: Y.Doc, dsl: Y.Map<any>)
  /**
   * @description 监听语言变化，返回取消监听的函数
   * @param callback - 回调函数
   * @returns 取消监听的函数
   */
  observe(callback: ObserveCallback): () => void
  /**
   * @description 设置语言
   * @param locale - 语言名称
   */
  setLocale(locale: string): void
  /**
   * @description 获取当前语言
   */
  getLocale(): string
  /**
   * @description 导出为 JSON
   */
  toJSON(): string
}
```

## MeasuresBuilder

源码：[packages/vbi/src/chart-builder/features/measures/mea-builder.ts](https://github.com/VisActor/VBI/blob/main/packages/vbi/src/chart-builder/features/measures/mea-builder.ts#L9)

包导出：`MeasuresBuilder`

继承的公开成员见：[QueryMeasuresBuilderBase](types.md#querymeasuresbuilderbase)。

```typescript
/** @description 度量构建器，在查询字段操作上补充图形编码。 */
export declare class MeasuresBuilder extends QueryMeasuresBuilderBase<VBIMeasure, MeasureNodeBuilder> {
  static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
  static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
}
```

## ThemeBuilder

源码：[packages/vbi/src/chart-builder/features/theme/theme-builder.ts](https://github.com/VisActor/VBI/blob/main/packages/vbi/src/chart-builder/features/theme/theme-builder.ts#L7)

包导出：`ThemeBuilder`

```typescript
/**
 * @description 主题构建器，用于设置和获取当前主题
 */
export declare class ThemeBuilder {
  /**
   * @description 构造函数
   */
  constructor(_doc: Y.Doc, dsl: Y.Map<any>)
  /**
   * @description 监听主题变化，返回取消监听的函数
   * @param callback - 回调函数
   * @returns 取消监听的函数
   */
  observe(callback: ObserveCallback): () => void
  /**
   * @description 设置主题
   * @param theme - 主题名称
   */
  setTheme(theme: string): void
  /**
   * @description 获取当前主题
   */
  getTheme(): string
  /**
   * @description 导出为 JSON
   */
  toJSON(): string
}
```

## VBIChartBuilder

源码：[packages/vbi/src/chart-builder/builder.ts](https://github.com/VisActor/VBI/blob/main/packages/vbi/src/chart-builder/builder.ts#L27)

包导出：`VBIChartBuilder`

继承的公开成员见：[QueryBuilderBase](types.md#querybuilderbase)。

```typescript
export declare class VBIChartBuilder<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>
  extends QueryBuilderBase<VBIChartDSL>
  implements VBIChartBuilderInterface<TQueryDSL, TSeedDSL>
{
  adapters: Required<VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>>
  chartType: ChartTypeBuilder
  /** @description 图表运行时实例的绑定、获取与原生事件代理。 */
  instance: ChartInstanceBuilder
  measures: MeasuresBuilder
  dimensions: DimensionsBuilder
  theme: ThemeBuilder
  locale: LocaleBuilder
  constructor(doc: Y.Doc, options?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl?: Y.Map<any>)
  /** @description 校验计算表达式后，默认通过 query adapter 查询一次并构建 VSeed；非法表达式抛错。自定义 seed adapter 保留原有上下文和取数方式。 */
  buildVSeed: (options?: BuildVSeedOptions) => Promise<TSeedDSL>
  buildVQuery: () => TQueryDSL
  /** @description 根据当前图表配置，取数前校验计算表达式，非法时抛错；通过 query adapter 执行并原样返回查询结果。默认查询保留维度和度量 ID，并将 signal 传给 Connector；独立调用不缓存结果。 */
  query: (options?: QueryOptions) => Promise<VBIQueryResult>
  build: () => VBIChartDSL
  isEmpty: () => boolean
}
```

参数默认值（来自源码）：

```typescript
// buildVSeed
options = {}

// query
options = {}
```

## buildVQuery

源码：[packages/vbi/src/chart-builder/pipeline/vqueryDSL/index.ts](https://github.com/VisActor/VBI/blob/main/packages/vbi/src/chart-builder/pipeline/vqueryDSL/index.ts#L5)

包导出：`buildVQuery`

```typescript
export declare const buildVQuery: (
  vbiDSL: VBIChartDSL,
  _builder: VBIChartBuilderInterface<any, any>,
) => import('@visactor/vquery').VQueryDSL
```

## defaultVBIChartBuilderAdapters

源码：[packages/vbi/src/chart-builder/adapters/vquery-vseed/index.ts](https://github.com/VisActor/VBI/blob/main/packages/vbi/src/chart-builder/adapters/vquery-vseed/index.ts#L11)

包导出：`defaultVBIChartBuilderAdapters`

```typescript
export declare const defaultVBIChartBuilderAdapters: Required<
  VBIChartBuilderAdapters<DefaultVBIQueryDSL, DefaultVBISeedDSL>
>
```

## resolveVBIChartBuilderAdapters

源码：[packages/vbi/src/chart-builder/adapters/vquery-vseed/index.ts](https://github.com/VisActor/VBI/blob/main/packages/vbi/src/chart-builder/adapters/vquery-vseed/index.ts#L18)

包导出：`resolveVBIChartBuilderAdapters`

```typescript
export declare const resolveVBIChartBuilderAdapters: <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  adapters?: Partial<VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>>,
) => Required<VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>>
```
