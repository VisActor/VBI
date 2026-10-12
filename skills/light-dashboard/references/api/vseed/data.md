# 数据重塑与选择器

[API 索引](./index.md)

- [dataReshapeByEncoding](data.md#datareshapebyencoding)
- [selector](data.md#selector)
- [executeDynamicFilter](data.md#executedynamicfilter)
- [AngleEncoding](data.md#angleencoding)
- [BinCountMeasureId](data.md#bincountmeasureid)
- [BinEndMeasureId](data.md#binendmeasureid)
- [BinPercentageMeasureId](data.md#binpercentagemeasureid)
- [BinStartMeasureId](data.md#binstartmeasureid)
- [BoxPlotPivotIndicator](data.md#boxplotpivotindicator)
- [ColorEncoding](data.md#colorencoding)
- [ColorIdEncoding](data.md#coloridencoding)
- [DetailEncoding](data.md#detailencoding)
- [DimAxisType](data.md#dimaxistype)
- [DynamicFilter](data.md#dynamicfilter)
- [DynamicFilterResult](data.md#dynamicfilterresult)
- [FoldMeasureId](data.md#foldmeasureid)
- [FoldMeasureName](data.md#foldmeasurename)
- [foldMeasures](data.md#foldmeasures)
- [FoldMeasureValue](data.md#foldmeasurevalue)
- [FoldPrimaryMeasureValue](data.md#foldprimarymeasurevalue)
- [FoldSecondaryMeasureValue](data.md#foldsecondarymeasurevalue)
- [FoldXMeasureId](data.md#foldxmeasureid)
- [FoldXMeasureValue](data.md#foldxmeasurevalue)
- [FoldYMeasureId](data.md#foldymeasureid)
- [FoldYMeasureValue](data.md#foldymeasurevalue)
- [HierarchyEncoding](data.md#hierarchyencoding)
- [InnerRowIndex](data.md#innerrowindex)
- [isDimensionSelector](data.md#isdimensionselector)
- [isDynamicFilter](data.md#isdynamicfilter)
- [isFieldSelector](data.md#isfieldselector)
- [isMeasureSelector](data.md#ismeasureselector)
- [isPartialDatumSelector](data.md#ispartialdatumselector)
- [isRowWithFieldDynamicFilter](data.md#isrowwithfielddynamicfilter)
- [isValueDynamicFilter](data.md#isvaluedynamicfilter)
- [isValueSelector](data.md#isvalueselector)
- [LowerWhisker](data.md#lowerwhisker)
- [matchDynamicFilterResult](data.md#matchdynamicfilterresult)
- [matchesFieldSelector](data.md#matchesfieldselector)
- [MeasureId](data.md#measureid)
- [MeasureName](data.md#measurename)
- [MedianMeasureId](data.md#medianmeasureid)
- [ORIGINAL_DATA](data.md#original_data)
- [OutliersMeasureId](data.md#outliersmeasureid)
- [PlayerEncoding](data.md#playerencoding)
- [Q1MeasureValue](data.md#q1measurevalue)
- [Q3MeasureValue](data.md#q3measurevalue)
- [selectByDmension](data.md#selectbydmension)
- [selectByField](data.md#selectbyfield)
- [selectByMeasure](data.md#selectbymeasure)
- [selectByPartial](data.md#selectbypartial)
- [selectByValue](data.md#selectbyvalue)
- [selectorWithDynamicFilter](data.md#selectorwithdynamicfilter)
- [Separator](data.md#separator)
- [SourceEncoding](data.md#sourceencoding)
- [TargetEncoding](data.md#targetencoding)
- [unfoldDimensions](data.md#unfolddimensions)
- [UpperWhisker](data.md#upperwhisker)
- [XEncoding](data.md#xencoding)
- [YEncoding](data.md#yencoding)

## dataReshapeByEncoding

源码：[packages/vseed/src/dataReshape/dataReshapeByEncoding.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/dataReshapeByEncoding.ts)

包导出：`dataReshapeByEncoding`

```typescript
const dataReshapeByEncoding: (
  dataset: Dataset,
  dimensions: Dimension[],
  measures: Measure[],
  encoding: Encoding,
  options?: {
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

关联 API：[Dataset](types.md#dataset)、[Dimension](types.md#dimension)、[Encoding](types.md#encoding)、[FoldInfo](types.md#foldinfo)、[Locale](i18n.md#locale)、[Measure](types.md#measure)、[UnfoldInfo](types.md#unfoldinfo)

## selector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`selector`

```typescript
const selector: (
  vchartDatum: Datum,
  selector: Selector | Selectors | undefined | null,
  selectorMode?: 'And' | 'Or',
) => boolean
```

参数默认值：

```typescript
// selector
selectorMode = 'And'
```

关联 API：[Datum](types.md#datum)、[Selector](types.md#selector)、[Selectors](types.md#selectors)

## executeDynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

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
const executeDynamicFilter: (
  filter: DynamicFilter,
  allData: Datum[],
) => Promise<{
  success: boolean
  data: DynamicFilterResult
  error?: string
}>
```

关联 API：[Datum](types.md#datum)、[DynamicFilter](data.md#dynamicfilter)、[DynamicFilterResult](data.md#dynamicfilterresult)

## AngleEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`AngleEncoding`

```typescript
const AngleEncoding = '__Dim_Angle__'
```

## BinCountMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`BinCountMeasureId`

```typescript
const BinCountMeasureId = '__BinCount__'
```

## BinEndMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`BinEndMeasureId`

```typescript
const BinEndMeasureId = '__BinEnd__'
```

## BinPercentageMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`BinPercentageMeasureId`

```typescript
const BinPercentageMeasureId = '__BinPercentage__'
```

## BinStartMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`BinStartMeasureId`

```typescript
const BinStartMeasureId = '__BinStart__'
```

## BoxPlotPivotIndicator

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`BoxPlotPivotIndicator`

```typescript
const BoxPlotPivotIndicator = '__BoxPlot_Pivot_Indicator__'
```

## ColorEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`ColorEncoding`

```typescript
const ColorEncoding = '__Dim_Color__'
```

## ColorIdEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`ColorIdEncoding`

```typescript
const ColorIdEncoding = '__Dim_ColorId__'
```

## DetailEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`DetailEncoding`

```typescript
const DetailEncoding = '__Dim_Detail__'
```

## DimAxisType

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`DimAxisType`

```typescript
const DimAxisType = '__Dim_AxisType__'
```

## DynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`DynamicFilter`

```typescript
export type DynamicFilter = TableDynamicFilter | ChartDynamicFilter | ValueDynamicFilter
```

关联 API：[ChartDynamicFilter](types.md#chartdynamicfilter)、[TableDynamicFilter](types.md#tabledynamicfilter)、[ValueDynamicFilter](types.md#valuedynamicfilter)

## DynamicFilterResult

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`DynamicFilterResult`

```typescript
export type DynamicFilterResult = RowWithFieldRes[] | PartialDatumRes[] | number | string
```

关联 API：[PartialDatumRes](types.md#partialdatumres)、[RowWithFieldRes](types.md#rowwithfieldres)

## FoldMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`FoldMeasureId`

```typescript
const FoldMeasureId = '__MeaId__'
```

## FoldMeasureName

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`FoldMeasureName`

```typescript
const FoldMeasureName = '__MeaName__'
```

## foldMeasures

源码：[packages/vseed/src/dataReshape/foldMeasures.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

包导出：`foldMeasures`

```typescript
/**
 * 折叠指定的指标
 * @description 合并指定的指标为1个, 无论多少个, 都能转换为1个, 取名为fold, 意为折叠后混合在一起.
 */
const foldMeasures: (
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

关联 API：[Dataset](types.md#dataset)、[FoldInfo](types.md#foldinfo)、[Measures](types.md#measures)

## FoldMeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`FoldMeasureValue`

```typescript
const FoldMeasureValue = '__MeaValue__'
```

## FoldPrimaryMeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`FoldPrimaryMeasureValue`

```typescript
const FoldPrimaryMeasureValue = '__MeaPrimaryValue__'
```

## FoldSecondaryMeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`FoldSecondaryMeasureValue`

```typescript
const FoldSecondaryMeasureValue = '__MeaSecondaryValue__'
```

## FoldXMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`FoldXMeasureId`

```typescript
const FoldXMeasureId = '__MeaXId__'
```

## FoldXMeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`FoldXMeasureValue`

```typescript
const FoldXMeasureValue = '__MeaXValue__'
```

## FoldYMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`FoldYMeasureId`

```typescript
const FoldYMeasureId = '__MeaYId__'
```

## FoldYMeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`FoldYMeasureValue`

```typescript
const FoldYMeasureValue = '__MeaYValue__'
```

## HierarchyEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`HierarchyEncoding`

```typescript
const HierarchyEncoding = '__Dim_Hierarchy__'
```

## InnerRowIndex

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`InnerRowIndex`

```typescript
const InnerRowIndex = '__row_index'
```

## isDimensionSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`isDimensionSelector`

```typescript
const isDimensionSelector: (selector: Selector) => selector is DimensionSelector
```

关联 API：[DimensionSelector](types.md#dimensionselector)、[selector](data.md#selector)、[Selector](types.md#selector)

## isDynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`isDynamicFilter`

```typescript
/**
 * 识别是否为动态过滤器（通用判断，包含所有类型的动态过滤器）
 */
const isDynamicFilter: (selector: any) => selector is DynamicFilter
```

关联 API：[DynamicFilter](data.md#dynamicfilter)、[selector](data.md#selector)

## isFieldSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`isFieldSelector`

```typescript
/**
 * 判断是否为字段选择器
 * @description 字段选择器只有 field 属性，没有 operator/op/value
 */
const isFieldSelector: (selector: Selector) => selector is FieldSelector
```

关联 API：[FieldSelector](types.md#fieldselector)、[selector](data.md#selector)、[Selector](types.md#selector)

## isMeasureSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`isMeasureSelector`

```typescript
const isMeasureSelector: (selector: Selector) => selector is MeasureSelector
```

关联 API：[MeasureSelector](types.md#measureselector)、[selector](data.md#selector)、[Selector](types.md#selector)

## isPartialDatumSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`isPartialDatumSelector`

```typescript
const isPartialDatumSelector: (selector: Selector) => selector is PartialDatumSelector
```

关联 API：[PartialDatumSelector](types.md#partialdatumselector)、[selector](data.md#selector)、[Selector](types.md#selector)

## isRowWithFieldDynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`isRowWithFieldDynamicFilter`

```typescript
/**
 * 识别是否为row-with-field动态过滤器
 */
const isRowWithFieldDynamicFilter: (selector: any) => selector is TableDynamicFilter
```

关联 API：[selector](data.md#selector)、[TableDynamicFilter](types.md#tabledynamicfilter)

## isValueDynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`isValueDynamicFilter`

```typescript
/**
 * 识别是否为数值动态过滤器（用于标注线等场景）
 */
const isValueDynamicFilter: (selector: any) => selector is ValueDynamicFilter
```

关联 API：[selector](data.md#selector)、[ValueDynamicFilter](types.md#valuedynamicfilter)

## isValueSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`isValueSelector`

```typescript
const isValueSelector: (selector: Selector) => selector is ValueSelector
```

关联 API：[selector](data.md#selector)、[Selector](types.md#selector)、[ValueSelector](types.md#valueselector)

## LowerWhisker

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`LowerWhisker`

```typescript
const LowerWhisker = '__Lower_Whisker__'
```

## matchDynamicFilterResult

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

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
const matchDynamicFilterResult: (result: DynamicFilterResult, datum: Datum, selectorType?: 'table' | 'chart') => boolean
```

参数默认值：

```typescript
// matchDynamicFilterResult
selectorType = 'table'
```

关联 API：[Datum](types.md#datum)、[DynamicFilterResult](data.md#dynamicfilterresult)

## matchesFieldSelector

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`matchesFieldSelector`

```typescript
/**
 * 检查给定的字段是否与 FieldSelector 匹配
 */
const matchesFieldSelector: (field: string, fieldSelector: FieldSelector) => boolean
```

关联 API：[FieldSelector](types.md#fieldselector)

## MeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`MeasureId`

```typescript
const MeasureId = '__MeaId__'
```

## MeasureName

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`MeasureName`

```typescript
const MeasureName = '__MeaName__'
```

## MedianMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`MedianMeasureId`

```typescript
const MedianMeasureId = '__Meadian__'
```

## ORIGINAL_DATA

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`ORIGINAL_DATA`

```typescript
const ORIGINAL_DATA = '__OriginalData__'
```

## OutliersMeasureId

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`OutliersMeasureId`

```typescript
const OutliersMeasureId = '__Outliers__'
```

## PlayerEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`PlayerEncoding`

```typescript
const PlayerEncoding = '__Dim_Player__'
```

## Q1MeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`Q1MeasureValue`

```typescript
const Q1MeasureValue = '__Q1__'
```

## Q3MeasureValue

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`Q3MeasureValue`

```typescript
const Q3MeasureValue = '__Q3__'
```

## selectByDmension

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`selectByDmension`

```typescript
const selectByDmension: (selector: DimensionSelector, datum: Datum) => boolean
```

关联 API：[Datum](types.md#datum)、[DimensionSelector](types.md#dimensionselector)、[selector](data.md#selector)

## selectByField

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`selectByField`

```typescript
/**
 * 通过字段名选择
 * @description 检查 datum 是否包含指定字段（用于列级选择）
 */
const selectByField: (selector: FieldSelector, datum: Datum) => boolean
```

关联 API：[Datum](types.md#datum)、[FieldSelector](types.md#fieldselector)、[selector](data.md#selector)

## selectByMeasure

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`selectByMeasure`

```typescript
const selectByMeasure: (selector: MeasureSelector, datum: Datum) => boolean
```

关联 API：[Datum](types.md#datum)、[MeasureSelector](types.md#measureselector)、[selector](data.md#selector)

## selectByPartial

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`selectByPartial`

```typescript
const selectByPartial: (selector: PartialDatumSelector, datum: Datum) => boolean
```

关联 API：[Datum](types.md#datum)、[PartialDatumSelector](types.md#partialdatumselector)、[selector](data.md#selector)

## selectByValue

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

包导出：`selectByValue`

```typescript
const selectByValue: (selector: ValueSelector, datum: Datum) => boolean
```

关联 API：[Datum](types.md#datum)、[selector](data.md#selector)、[ValueSelector](types.md#valueselector)

## selectorWithDynamicFilter

源码：[packages/vseed/src/dataSelector/selector.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataSelector/selector.ts)

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
const selectorWithDynamicFilter: (
  vchartDatum: Datum,
  selectorConfig: DynamicFilter,
  defaultSelector?: Selector | Selector[] | null,
) => boolean
```

关联 API：[Datum](types.md#datum)、[DynamicFilter](data.md#dynamicfilter)、[Selector](types.md#selector)

## Separator

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`Separator`

```typescript
const Separator = '-'
```

## SourceEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`SourceEncoding`

```typescript
const SourceEncoding = '__Dim_Source__'
```

## TargetEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`TargetEncoding`

```typescript
const TargetEncoding = '__Dim_Target__'
```

## unfoldDimensions

源码：[packages/vseed/src/dataReshape/unfoldDimensions.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)

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
const unfoldDimensions: (
  dataset: Dataset,
  dimensions: Dimension[],
  encoding: Encoding,
  options: {
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

关联 API：[Dataset](types.md#dataset)、[Dimension](types.md#dimension)、[Encoding](types.md#encoding)、[UnfoldInfo](types.md#unfoldinfo)

## UpperWhisker

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`UpperWhisker`

```typescript
const UpperWhisker = '__Upper_Whisker__'
```

## XEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`XEncoding`

```typescript
const XEncoding = '__Dim_X__'
```

## YEncoding

源码：[packages/vseed/src/dataReshape/constant.ts](https://github.com/VisActor/VBI/blob/main/packages/vseed/src/dataReshape/constant.ts)

包导出：`YEncoding`

```typescript
const YEncoding = '__Dim_Y__'
```
