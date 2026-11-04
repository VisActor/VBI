# data

[API 索引](vseed-index.md)

- [AngleEncoding](vseed-data.md#angleencoding)
- [BinCountMeasureId](vseed-data.md#bincountmeasureid)
- [BinEndMeasureId](vseed-data.md#binendmeasureid)
- [BinPercentageMeasureId](vseed-data.md#binpercentagemeasureid)
- [BinStartMeasureId](vseed-data.md#binstartmeasureid)
- [BoxPlotPivotIndicator](vseed-data.md#boxplotpivotindicator)
- [ColorEncoding](vseed-data.md#colorencoding)
- [ColorIdEncoding](vseed-data.md#coloridencoding)
- [DetailEncoding](vseed-data.md#detailencoding)
- [DimAxisType](vseed-data.md#dimaxistype)
- [DimensionKey](vseed-data.md#dimensionkey)
- [DynamicFilter](vseed-data.md#dynamicfilter)
- [DynamicFilterResult](vseed-data.md#dynamicfilterresult)
- [FoldMeasureId](vseed-data.md#foldmeasureid)
- [FoldMeasureName](vseed-data.md#foldmeasurename)
- [FoldMeasureValue](vseed-data.md#foldmeasurevalue)
- [FoldPrimaryMeasureValue](vseed-data.md#foldprimarymeasurevalue)
- [FoldSecondaryMeasureValue](vseed-data.md#foldsecondarymeasurevalue)
- [FoldXMeasureId](vseed-data.md#foldxmeasureid)
- [FoldXMeasureValue](vseed-data.md#foldxmeasurevalue)
- [FoldYMeasureId](vseed-data.md#foldymeasureid)
- [FoldYMeasureValue](vseed-data.md#foldymeasurevalue)
- [HierarchyEncoding](vseed-data.md#hierarchyencoding)
- [InnerRowIndex](vseed-data.md#innerrowindex)
- [LowerWhisker](vseed-data.md#lowerwhisker)
- [MeasureId](vseed-data.md#measureid)
- [MeasureName](vseed-data.md#measurename)
- [MedianMeasureId](vseed-data.md#medianmeasureid)
- [ORIGINAL_DATA](vseed-data.md#original_data)
- [OutliersMeasureId](vseed-data.md#outliersmeasureid)
- [PlayerEncoding](vseed-data.md#playerencoding)
- [Q1MeasureValue](vseed-data.md#q1measurevalue)
- [Q3MeasureValue](vseed-data.md#q3measurevalue)
- [Separator](vseed-data.md#separator)
- [SourceEncoding](vseed-data.md#sourceencoding)
- [TargetEncoding](vseed-data.md#targetencoding)
- [UpperWhisker](vseed-data.md#upperwhisker)
- [XEncoding](vseed-data.md#xencoding)
- [YEncoding](vseed-data.md#yencoding)
- [dataReshapeByEncoding](vseed-data.md#datareshapebyencoding)
- [executeDynamicFilter](vseed-data.md#executedynamicfilter)
- [foldMeasures](vseed-data.md#foldmeasures)
- [isDimensionSelector](vseed-data.md#isdimensionselector)
- [isDynamicFilter](vseed-data.md#isdynamicfilter)
- [isFieldSelector](vseed-data.md#isfieldselector)
- [isMeasureSelector](vseed-data.md#ismeasureselector)
- [isPartialDatumSelector](vseed-data.md#ispartialdatumselector)
- [isRowWithFieldDynamicFilter](vseed-data.md#isrowwithfielddynamicfilter)
- [isValueDynamicFilter](vseed-data.md#isvaluedynamicfilter)
- [isValueSelector](vseed-data.md#isvalueselector)
- [matchDynamicFilterResult](vseed-data.md#matchdynamicfilterresult)
- [matchesFieldSelector](vseed-data.md#matchesfieldselector)
- [selectByDmension](vseed-data.md#selectbydmension)
- [selectByField](vseed-data.md#selectbyfield)
- [selectByMeasure](vseed-data.md#selectbymeasure)
- [selectByPartial](vseed-data.md#selectbypartial)
- [selectByValue](vseed-data.md#selectbyvalue)
- [selector](vseed-data.md#selector)
- [selectorWithDynamicFilter](vseed-data.md#selectorwithdynamicfilter)
- [unfoldDimensions](vseed-data.md#unfolddimensions)

类型引用沿用源码模块名，包的公开导出以索引为准：

```typescript
import type {
  ChartDynamicFilter,
  PartialDatumRes,
  DimensionSelector,
  FieldSelector,
  MeasureSelector,
  PartialDatumSelector,
  Selector,
  Selectors,
  RowWithFieldRes,
  TableDynamicFilter,
  ValueSelector,
  ValueDynamicFilter,
} from '../types/dataSelector'
import type { ChartType, Dataset, Dimension, Encoding, FoldInfo, Measure, UnfoldInfo, Locale } from 'src/types'
import type { ChartType, Dataset, Dimension, Encoding, UnfoldInfo } from 'src/types'
import type { Dataset, FoldInfo, Measures } from 'src/types'
import type { Datum } from 'src/types'
```

## AngleEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L27)

包导出：`AngleEncoding`

```typescript
export declare const AngleEncoding = '__Dim_Angle__'
```

## BinCountMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L48)

包导出：`BinCountMeasureId`

```typescript
export declare const BinCountMeasureId = '__BinCount__'
```

## BinEndMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L47)

包导出：`BinEndMeasureId`

```typescript
export declare const BinEndMeasureId = '__BinEnd__'
```

## BinPercentageMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L49)

包导出：`BinPercentageMeasureId`

```typescript
export declare const BinPercentageMeasureId = '__BinPercentage__'
```

## BinStartMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L46)

包导出：`BinStartMeasureId`

```typescript
export declare const BinStartMeasureId = '__BinStart__'
```

## BoxPlotPivotIndicator

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L37)

包导出：`BoxPlotPivotIndicator`

```typescript
export declare const BoxPlotPivotIndicator = '__BoxPlot_Pivot_Indicator__'
```

## ColorEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L30)

包导出：`ColorEncoding`

```typescript
export declare const ColorEncoding = '__Dim_Color__'
```

## ColorIdEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L31)

包导出：`ColorIdEncoding`

```typescript
export declare const ColorIdEncoding = '__Dim_ColorId__'
```

## DetailEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L28)

包导出：`DetailEncoding`

```typescript
export declare const DetailEncoding = '__Dim_Detail__'
```

## DimAxisType

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L15)

包导出：`DimAxisType`

```typescript
export declare const DimAxisType = '__Dim_AxisType__'
```

## DimensionKey

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L24)

包导出：`DimensionKey`

```typescript
export declare const DimensionKey = '__Dim_Key__'
```

## DynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L20)

包导出：`DynamicFilter`

```typescript
export type DynamicFilter = TableDynamicFilter | ChartDynamicFilter | ValueDynamicFilter
```

## DynamicFilterResult

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L21)

包导出：`DynamicFilterResult`

```typescript
export type DynamicFilterResult = RowWithFieldRes[] | PartialDatumRes[] | number | string
```

## FoldMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L7)

包导出：`FoldMeasureId`

```typescript
export declare const FoldMeasureId = '__MeaId__'
```

## FoldMeasureName

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L6)

包导出：`FoldMeasureName`

```typescript
export declare const FoldMeasureName = '__MeaName__'
```

## FoldMeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L8)

包导出：`FoldMeasureValue`

```typescript
export declare const FoldMeasureValue = '__MeaValue__'
```

## FoldPrimaryMeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L13)

包导出：`FoldPrimaryMeasureValue`

```typescript
export declare const FoldPrimaryMeasureValue = '__MeaPrimaryValue__'
```

## FoldSecondaryMeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L14)

包导出：`FoldSecondaryMeasureValue`

```typescript
export declare const FoldSecondaryMeasureValue = '__MeaSecondaryValue__'
```

## FoldXMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L20)

包导出：`FoldXMeasureId`

```typescript
export declare const FoldXMeasureId = '__MeaXId__'
```

## FoldXMeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L18)

包导出：`FoldXMeasureValue`

```typescript
export declare const FoldXMeasureValue = '__MeaXValue__'
```

## FoldYMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L21)

包导出：`FoldYMeasureId`

```typescript
export declare const FoldYMeasureId = '__MeaYId__'
```

## FoldYMeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L19)

包导出：`FoldYMeasureValue`

```typescript
export declare const FoldYMeasureValue = '__MeaYValue__'
```

## HierarchyEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L32)

包导出：`HierarchyEncoding`

```typescript
export declare const HierarchyEncoding = '__Dim_Hierarchy__'
```

## InnerRowIndex

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L52)

包导出：`InnerRowIndex`

```typescript
export declare const InnerRowIndex = '__row_index'
```

## LowerWhisker

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L40)

包导出：`LowerWhisker`

```typescript
export declare const LowerWhisker = '__Lower_Whisker__'
```

## MeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L9)

包导出：`MeasureId`

```typescript
export declare const MeasureId = '__MeaId__'
```

## MeasureName

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L10)

包导出：`MeasureName`

```typescript
export declare const MeasureName = '__MeaName__'
```

## MedianMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L43)

包导出：`MedianMeasureId`

```typescript
export declare const MedianMeasureId = '__Meadian__'
```

## ORIGINAL_DATA

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L2)

包导出：`ORIGINAL_DATA`

```typescript
export declare const ORIGINAL_DATA = '__OriginalData__'
```

## OutliersMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L42)

包导出：`OutliersMeasureId`

```typescript
export declare const OutliersMeasureId = '__Outliers__'
```

## PlayerEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L29)

包导出：`PlayerEncoding`

```typescript
export declare const PlayerEncoding = '__Dim_Player__'
```

## Q1MeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L38)

包导出：`Q1MeasureValue`

```typescript
export declare const Q1MeasureValue = '__Q1__'
```

## Q3MeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L39)

包导出：`Q3MeasureValue`

```typescript
export declare const Q3MeasureValue = '__Q3__'
```

## Separator

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L3)

包导出：`Separator`

```typescript
export declare const Separator = '-'
```

## SourceEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L33)

包导出：`SourceEncoding`

```typescript
export declare const SourceEncoding = '__Dim_Source__'
```

## TargetEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L34)

包导出：`TargetEncoding`

```typescript
export declare const TargetEncoding = '__Dim_Target__'
```

## UpperWhisker

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L41)

包导出：`UpperWhisker`

```typescript
export declare const UpperWhisker = '__Upper_Whisker__'
```

## XEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L25)

包导出：`XEncoding`

```typescript
export declare const XEncoding = '__Dim_X__'
```

## YEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts#L26)

包导出：`YEncoding`

```typescript
export declare const YEncoding = '__Dim_Y__'
```

## dataReshapeByEncoding

源码：[packages/vseed/src/dataReshape/dataReshapeByEncoding.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/dataReshapeByEncoding.ts#L17)

包导出：`dataReshapeByEncoding`

```typescript
export declare const dataReshapeByEncoding: (
  dataset: Dataset,
  dimensions: Dimension[],
  measures: Measure[],
  encoding: Encoding,
  options?: {
    chartType?: ChartType
    foldMeasureId?: string
    foldMeasureName?: string
    foldMeasureValue?: string
    colorItemAsId?: boolean
    colorMeasureId?: string
    omitIds: string[]
    locale?: Locale
  },
) => {
  dataset: Dataset
  foldInfo: FoldInfo
  unfoldInfo: UnfoldInfo
}
```

## executeDynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L350)

包导出：`executeDynamicFilter`

```typescript
/**
 * 执行动态过滤器代码，获取匹配结果
 * @description
 * 阶段1：执行阶段 - 一次性执行 dynamicFilter.code，获取所有匹配结果
 * - TableDynamicFilter → CellSelector[]
 * - ChartDynamicFilter → PartialDatumSelector[]
 * - ValueDynamicFilter → number | string
 *
 * @param filter 动态过滤器配置
 * @param allData 完整数据集
 * @returns 执行结果数组或标量值
 */
export declare const executeDynamicFilter: (
  filter: DynamicFilter,
  allData: Datum[],
) => Promise<{
  success: boolean
  data: DynamicFilterResult
  error?: string
}>
```

## foldMeasures

源码：[packages/vseed/src/dataReshape/foldMeasures.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts#L9)

包导出：`foldMeasures`

```typescript
/**
 * 折叠指定的指标
 * @description 合并指定的指标为1个, 无论多少个, 都能转换为1个, 取名为fold, 意为折叠后混合在一起.
 */
export declare const foldMeasures: (
  dataset: Dataset,
  measures: Measures,
  options: {
    measureId: string
    measureName: string
    measureValue: string
    colorMeasureId?: string
    allowEmptyFold?: boolean
    omitIds?: string[]
  },
) => {
  dataset: Dataset
  foldInfo: FoldInfo
}
```

## isDimensionSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L115)

包导出：`isDimensionSelector`

```typescript
export declare const isDimensionSelector: (selector: Selector) => selector is DimensionSelector
```

## isDynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L283)

包导出：`isDynamicFilter`

```typescript
/**
 * 识别是否为动态过滤器（通用判断，包含所有类型的动态过滤器）
 */
export declare const isDynamicFilter: (selector: any) => selector is DynamicFilter
```

## isFieldSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L92)

包导出：`isFieldSelector`

```typescript
/**
 * 判断是否为字段选择器
 * @description 字段选择器只有 field 属性，没有 operator/op/value
 */
export declare const isFieldSelector: (selector: Selector) => selector is FieldSelector
```

## isMeasureSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L103)

包导出：`isMeasureSelector`

```typescript
export declare const isMeasureSelector: (selector: Selector) => selector is MeasureSelector
```

## isPartialDatumSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L84)

包导出：`isPartialDatumSelector`

```typescript
export declare const isPartialDatumSelector: (selector: Selector) => selector is PartialDatumSelector
```

## isRowWithFieldDynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L269)

包导出：`isRowWithFieldDynamicFilter`

```typescript
/**
 * 识别是否为row-with-field动态过滤器
 */
export declare const isRowWithFieldDynamicFilter: (selector: any) => selector is TableDynamicFilter
```

## isValueDynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L276)

包导出：`isValueDynamicFilter`

```typescript
/**
 * 识别是否为数值动态过滤器（用于标注线等场景）
 */
export declare const isValueDynamicFilter: (selector: any) => selector is ValueDynamicFilter
```

## isValueSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L80)

包导出：`isValueSelector`

```typescript
export declare const isValueSelector: (selector: Selector) => selector is ValueSelector
```

## matchDynamicFilterResult

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L419)

包导出：`matchDynamicFilterResult`

```typescript
/**
 * 匹配动态过滤器结果
 * @description
 * 阶段2：匹配阶段 - 判断当前 datum/cell 是否在执行结果中
 * - 使用 OR 策略：结果数组中任一项匹配即返回 true
 * - 表格场景：检查 { row, field } 是否在 CellSelector[] 中
 * - 图表场景：检查 datum 的维度值是否匹配 PartialDatumSelector[] 中任一项
 * - 数值场景：不适用（ValueDynamicFilter返回标量值，不用于匹配）
 *
 * @param result 动态过滤器执行结果（CellSelector[] 或 PartialDatumSelector[]，不包括 ValueDynamicFilter）
 * @param datum 当前数据项
 * @param selectorType 选择器类型（用于区分表格和图表动态过滤器）
 * @returns 是否匹配（OR 策略）
 */
export declare const matchDynamicFilterResult: (
  result: DynamicFilterResult,
  datum: Datum,
  selectorType?: 'table' | 'chart',
) => boolean
```

参数默认值（来自源码）：

```typescript
// matchDynamicFilterResult
selectorType = 'table'
```

## matchesFieldSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L230)

包导出：`matchesFieldSelector`

```typescript
/**
 * 检查给定的字段是否与 FieldSelector 匹配
 */
export declare const matchesFieldSelector: (field: string, fieldSelector: FieldSelector) => boolean
```

## selectByDmension

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L196)

包导出：`selectByDmension`

```typescript
export declare const selectByDmension: (selector: DimensionSelector, datum: Datum) => boolean
```

## selectByField

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L219)

包导出：`selectByField`

```typescript
/**
 * 通过字段名选择
 * @description 检查 datum 是否包含指定字段（用于列级选择）
 */
export declare const selectByField: (selector: FieldSelector, datum: Datum) => boolean
```

## selectByMeasure

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L126)

包导出：`selectByMeasure`

```typescript
export declare const selectByMeasure: (selector: MeasureSelector, datum: Datum) => boolean
```

## selectByPartial

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L235)

包导出：`selectByPartial`

```typescript
export declare const selectByPartial: (selector: PartialDatumSelector, datum: Datum) => boolean
```

## selectByValue

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L239)

包导出：`selectByValue`

```typescript
export declare const selectByValue: (selector: ValueSelector, datum: Datum) => boolean
```

## selector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L35)

包导出：`selector`

```typescript
export declare const selector: (
  vchartDatum: Datum,
  selector: Selector | Selectors | undefined | null,
  selectorMode?: 'And' | 'Or',
) => boolean
```

参数默认值（来自源码）：

```typescript
// selector
selectorMode = 'And'
```

## selectorWithDynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts#L462)

包导出：`selectorWithDynamicFilter`

```typescript
/**
 * 带有动态过滤器支持的选择器
 * @description
 * 处理流程（两阶段设计）：
 *
 * 阶段1 - 执行（Execute）：
 *   - 在 prepare() 阶段执行，结果写入 dynamicFilter.result
 *   - TableDynamicFilter → CellSelector[]
 *   - ChartDynamicFilter → PartialDatumSelector[]
 *   - ValueDynamicFilter → number | string（用于读取，不用于匹配）
 *
 * 阶段2 - 匹配（Match）：
 *   - 读取 dynamicFilter.result
 *   - 使用 OR 策略：结果数组中任一项匹配即返回 true
 *   - 表格：判断 { row, field } 是否在 CellSelector[] 中
 *   - 图表：判断 datum 是否匹配 PartialDatumSelector[] 中任一项
 *   - 数值：不用于匹配，直接返回 false（数值过滤器在主要用于标注线值，不用于行列选择）
 *
 * @param vchartDatum 单个数据项
 * @param selectorConfig 选择器配置（可包含 DynamicFilter）
 * @param defaultSelector 传统选择器（仅在 DynamicFilter 无结果且有 fallback 时使用）
 * @returns 该数据项是否符合选择条件
 */
export declare const selectorWithDynamicFilter: (
  vchartDatum: Datum,
  selectorConfig: DynamicFilter,
  defaultSelector?: Selector | Selector[] | null,
) => boolean
```

## unfoldDimensions

源码：[packages/vseed/src/dataReshape/unfoldDimensions.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts#L26)

包导出：`unfoldDimensions`

```typescript
/**
 * @description 展开并合并视觉通道的维度, 在foldMeasures后合并维度, 所以不需要进行笛卡尔积
 * @param dataset 原始数据集
 * @param dimensions 维度
 * @param encoding 编码
 * @param options
 * @returns
 */
export declare const unfoldDimensions: (
  dataset: Dataset,
  dimensions: Dimension[],
  encoding: Encoding,
  options: {
    chartType?: ChartType
    foldMeasureId: string
    separator: string
    colorItemAsId: boolean
    formatDimensionValue?: (dimension: Dimension, value: unknown) => string
  },
) => {
  dataset: Dataset
  unfoldInfo: UnfoldInfo
}
```
