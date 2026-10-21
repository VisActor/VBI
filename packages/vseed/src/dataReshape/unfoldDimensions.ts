import type { ChartType, Dataset, Datum, Dimension, Encoding, UnfoldInfo } from 'src/types'
import {
  DimensionKey,
  AngleEncoding,
  XEncoding,
  YEncoding,
  ColorEncoding,
  DetailEncoding,
  ColorIdEncoding,
  MeasureId,
  MeasureName,
  PlayerEncoding,
  HierarchyEncoding,
  SourceEncoding,
  TargetEncoding,
} from './constant'

/**
 * @description 展开并合并视觉通道的维度, 在foldMeasures后合并维度, 所以不需要进行笛卡尔积
 * @param dataset 原始数据集
 * @param dimensions 维度
 * @param encoding 编码
 * @param options
 * @returns
 */
export const unfoldDimensions = (
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
): {
  dataset: Dataset
  unfoldInfo: UnfoldInfo
} => {
  const { separator, formatDimensionValue } = options

  const unfoldInfo: UnfoldInfo = {
    encodingAngle: AngleEncoding,
    encodingX: XEncoding,
    encodingY: YEncoding,
    encodingDetail: DetailEncoding,
    encodingColor: ColorEncoding,
    encodingColorId: ColorIdEncoding,
    encodingPlayer: PlayerEncoding,
    encodingHierarchy: HierarchyEncoding,
    encodingSource: SourceEncoding,
    encodingTarget: TargetEncoding,

    colorItems: [],
    colorIdMap: {},
  }

  // 每个通道对应的维度
  const { color, x, y, detail, angle, player, hierarchy, source, target } = encoding
  const angleDimensions = angle ? dimensions.filter((dim) => angle.includes(dim.id)) : []
  const xDimensions = x ? dimensions.filter((dim) => x.includes(dim.id)) : []
  const yDimensions = y ? dimensions.filter((dim) => y.includes(dim.id)) : []
  const colorDimensions = color ? dimensions.filter((dim) => color.includes(dim.id)) : []
  const detailDimensions = detail ? dimensions.filter((dim) => detail.includes(dim.id)) : []
  const playerDimensions = player ? dimensions.filter((dim) => player.includes(dim.id)) : []
  const hierarchyDimensions = hierarchy ? dimensions.filter((dim) => hierarchy.includes(dim.id)) : []
  const sourceDimensions = source ? dimensions.filter((dim) => source.includes(dim.id)) : []
  const targetDimensions = target ? dimensions.filter((dim) => target.includes(dim.id)) : []

  const identityDimensions = dimensions
    .map(({ id }) => id)
    .filter((id) => id !== MeasureId && id !== options.foldMeasureId)
    .sort()

  // 离散图例项
  const colorItems = new Set<string>()
  const colorIdMap: Record<string, { id: string; alias: string }> = {}

  // 遍历数据集, 按通道合并维度
  for (let i = 0; i < dataset.length; i++) {
    // 应用编码至Datum上
    const datum = dataset[i]
    // Preserve full tuples (including field names) without an extra dataset pass.
    // Measures share a group so native split/merge also works across dual axes.
    datum[DimensionKey] =
      (options.chartType ? `${options.chartType}:` : '') +
      JSON.stringify(identityDimensions.map((id) => [id, datum[id]]))

    /**
     * !important 这是全仓库, 最最最重要的五行代码, 贯穿VSeed整个生命周期, 是化繁为简的绝对核心
     * 1. 点睛之笔: 呼应foldMeasures, 此时此刻的datum一定是单点数据, 维度合并不可能造成任何冲突.
     * 2. 数据即通道
     * 3. 利用需要合并的维度, 直接进行join, 即可生成新的维度, 与指标彻底解耦;
     * 4. 以下通道均在一次遍历中完成, 不存在性能问题
     * 5. 以下通道均可放入多个维度
     */
    applyEncoding(AngleEncoding, angleDimensions, datum, separator)
    applyEncoding(XEncoding, xDimensions, datum, separator)
    applyEncoding(YEncoding, yDimensions, datum, separator)
    applyEncoding(ColorEncoding, colorDimensions, datum, separator)
    applyEncoding(DetailEncoding, detailDimensions, datum, separator)
    applyEncoding(PlayerEncoding, playerDimensions, datum, separator)
    applyEncoding(HierarchyEncoding, hierarchyDimensions, datum, separator)
    applyEncoding(SourceEncoding, sourceDimensions, datum, separator)
    applyEncoding(TargetEncoding, targetDimensions, datum, separator)

    // 处理离散的颜色图例
    if (!colorDimensions.length || !datum[ColorEncoding]) {
      // 无颜色通道, 则跳过
      continue
    }
    const colorId = String(datum[ColorEncoding] ?? '')

    datum[ColorIdEncoding] = colorId

    colorIdMap[colorId] = {
      id: colorId,
      alias: getColorAliasItem(ColorEncoding, colorDimensions, datum, separator, formatDimensionValue),
    }
    colorItems.add(colorId)
  }

  unfoldInfo.colorItems = Array.from(colorItems)
  unfoldInfo.colorIdMap = colorIdMap

  return {
    dataset,
    unfoldInfo,
  }
}

/**
 * @description 应用编码至数据中, 此方法会原地修改数据
 * @param encoding 编码
 * @param dimensions 维度
 * @param datum 数据
 * @param separator 分隔符
 * @returns undefined
 */
const applyEncoding = (encoding: string, dimensions: Dimension[], datum: Datum, separator: string) => {
  if (encoding && dimensions.length) {
    datum[encoding] = dimensions.map((dim) => String(datum[dim.id])).join(separator)
  }
}

const getColorAliasItem = (
  encoding: string,
  dimensions: Dimension[],
  datum: Datum,
  separator: string,
  formatDimensionValue?: (dimension: Dimension, value: unknown) => string,
) => {
  if (encoding && dimensions.length) {
    return dimensions
      .map((dim) => {
        if (dim.id === MeasureId) {
          return String(datum[MeasureName])
        }

        const rawValue = datum[dim.id]
        return formatDimensionValue ? formatDimensionValue(dim, rawValue) : String(rawValue)
      })
      .join(separator)
  }
  return ''
}
