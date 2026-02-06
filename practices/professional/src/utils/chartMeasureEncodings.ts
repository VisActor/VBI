/**
 * ChartMeasureContract - 图表类型与 encoding 的契约定义
 * 
 * 这一层定义的是：给定一个 chartType，每个 encoding 应该怎么用。
 * 
 * 分层定义：
 * Layer 1 (VSeed)：Capability -> encoding 技术层能放什么
 * Layer 2 (VBI)：Contract -> 某 chart 该怎么用 encoding（你在这里）
 * Layer 3 (UX)：Validation -> 是否建议或警告
 */

export type FieldType = 'measure' | 'dimension'

export type MeasureEncodingType = 'yAxis' | 'xAxis' | 'color' | 'label' | 'tooltip' | 'size'

export type DimensionEncodingType = 'xAxis' | 'yAxis' | 'color' | 'label' | 'tooltip' | 'detail' | 'row' | 'column' | 'angle'

// 通用编码类型（所有可能的编码值）
export type AnyEncodingType = MeasureEncodingType | DimensionEncodingType

export interface EncodingConstraint {
  /** 该 encoding 支持什么类型的字段 */
  allow: FieldType[]
  
  /** 是否必填（某些 chart 必须有这个 encoding） */
  required?: boolean
  
  /** 该 encoding 最多能放几个字段（1 = 单一，Infinity = 多个） */
  maxCount?: number
  
  /** 是否允许同一个字段重复使用在多个 encoding（e.g., 同一 measure 既在 yAxis 又在 label） */
  allowSameFieldReuse?: boolean
}

export type ChartMeasureContract = Record<
  string, // chartType
  Record<MeasureEncodingType, EncodingConstraint>
>

export type ChartDimensionContract = Record<
  string, // chartType
  Record<DimensionEncodingType, EncodingConstraint>
>

/**
 * 图表编码契约 - 定义每个 chart 类型的 encoding 规则
 */
export const chartMeasureContract: ChartMeasureContract = {
  // 柱形图：Y 轴数值 + 可选的维度颜色/标签/提示
  column: {
    yAxis: {
      allow: ['measure'],
      required: true,
      maxCount: 1,
    },
    xAxis: {
      allow: ['dimension'],
      maxCount: 1,
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    size: {
      allow: [],
    },
  },

  // 条形图：X 轴数值 + 可选的维度颜色/标签/提示
  bar: {
    xAxis: {
      allow: ['measure'],
      required: true,
      maxCount: 1,
    },
    yAxis: {
      allow: ['dimension'],
      maxCount: 1,
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    size: {
      allow: [],
    },
  },

  // 折线图：Y 轴数值 + 可选的维度分组和样式
  line: {
    yAxis: {
      allow: ['measure'],
      required: true,
      maxCount: 1,
    },
    xAxis: {
      allow: ['dimension'],
      maxCount: 1,
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    size: {
      allow: [],
    },
  },

  // 面积图：Y 轴数值 + 可选的维度分组和样式
  area: {
    yAxis: {
      allow: ['measure'],
      required: true,
      maxCount: 1,
    },
    xAxis: {
      allow: ['dimension'],
      maxCount: 1,
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    size: {
      allow: [],
    },
  },

  // 饼图：颜色/尺寸用于映射指标 + 标签/提示
  pie: {
    yAxis: {
      allow: [],
    },
    xAxis: {
      allow: [],
    },
    color: {
      allow: ['dimension'],
      required: true,
      maxCount: 1,
    },
    label: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    size: {
      allow: ['measure'],
      maxCount: 1,
    },
  },

  // 散点图：X/Y 轴都是核心 + size/color 编码指标
  scatter: {
    xAxis: {
      allow: ['measure', 'dimension'],
      required: true,
      maxCount: 1,
    },
    yAxis: {
      allow: ['measure', 'dimension'],
      required: true,
      maxCount: 1,
    },
    color: {
      allow: ['measure', 'dimension'],
      maxCount: 1,
    },
    size: {
      allow: ['measure'],
      maxCount: 1,
    },
    label: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
  },

  // 玫瑰图：极坐标，颜色/大小映射指标
  rose: {
    xAxis: {
      allow: [],
    },
    yAxis: {
      allow: [],
    },
    color: {
      allow: ['measure'],
      maxCount: 1,
    },
    size: {
      allow: ['measure'],
      maxCount: 1,
    },
    label: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
  },

  // 甜甜圈图：与饼图类似
  donut: {
    xAxis: {
      allow: [],
    },
    yAxis: {
      allow: [],
    },
    color: {
      allow: ['dimension'],
      required: true,
      maxCount: 1,
    },
    label: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    size: {
      allow: ['measure'],
      maxCount: 1,
    },
  },

  // 雷达图：多个指标在不同轴
  radar: {
    xAxis: {
      allow: [],
    },
    yAxis: {
      allow: ['measure'],
      maxCount: Infinity,
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['measure', 'dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    size: {
      allow: [],
    },
  },

  // 表格：只显示字段作为列，不需要任何图表编码
  // 注：table 不使用任何 encoding，直接展示所有 measures 和 dimensions 作为列
  table: {
    yAxis: {
      allow: [],
    },
    xAxis: {
      allow: [],
    },
    color: {
      allow: [],
    },
    label: {
      allow: [],
    },
    tooltip: {
      allow: [],
    },
    size: {
      allow: [],
    },
  },
}

/**
 * 获取某个 chartType 的完整契约
 */
export const getChartContract = (chartType: string) => {
  // 直接查找
  if (chartMeasureContract[chartType]) {
    return chartMeasureContract[chartType]
  }
  
  // 智能fallback：支持变体如 columnPercent, columnStack, barPercent 等
  const baseType = Object.keys(chartMeasureContract).find(base => chartType.startsWith(base))
  if (baseType) {
    return chartMeasureContract[baseType]
  }
  
  // 默认fallback
  return {
    yAxis: { allow: ['measure'], maxCount: 1, required: false },
    xAxis: { allow: ['measure'], maxCount: 1, required: false },
    color: { allow: ['measure', 'dimension'], maxCount: 1, required: false },
    label: { allow: ['measure', 'dimension'], maxCount: Infinity, required: false },
    tooltip: { allow: ['measure', 'dimension'], maxCount: Infinity, required: false },
    size: { allow: ['measure'], maxCount: 1, required: false },
  }
}

/**
 * 获取某个 chartType 支持的 encoding 列表（向后兼容）
 */
export const getSupportedEncodings = (chartType: string): MeasureEncodingType[] => {
  const contract = getChartContract(chartType)
  return Object.keys(contract).filter(
    (key) => contract[key as MeasureEncodingType].allow.length > 0
  ) as MeasureEncodingType[]
}

/**
 * 检查某个字段是否可以放在某个 encoding 上
 */
export const canFieldBeOnEncoding = (
  chartType: string,
  fieldType: FieldType,
  encoding: MeasureEncodingType
): boolean => {
  const contract = getChartContract(chartType)
  const constraint = contract[encoding]
  if (!constraint) return false
  return constraint.allow.includes(fieldType)
}

/**
 * 检查某个 encoding 是否必填
 */
export const isEncodingRequired = (chartType: string, encoding: MeasureEncodingType): boolean => {
  const contract = getChartContract(chartType)
  return contract[encoding]?.required ?? false
}

/**
 * 检查是否可以在同一 encoding 放多个字段
 */
export const canHaveMultipleFieldsOnEncoding = (
  chartType: string,
  encoding: MeasureEncodingType
): boolean => {
  const contract = getChartContract(chartType)
  const maxCount = contract[encoding]?.maxCount ?? 1
  return maxCount > 1 || maxCount === Infinity
}

/**
 * ==================== 维度编码契约 (ChartDimensionContract) ====================
 */

/**
 * 维度编码契约 - 定义每个 chart 类型维度应该如何使用 encoding
 */
export const chartDimensionContract: ChartDimensionContract = {
  // 柱形图：X 轴放维度分类 + 可选的颜色/标签分组
  column: {
    xAxis: {
      allow: ['dimension'],
      required: true,
      maxCount: 1,
    },
    yAxis: {
      allow: [],
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    detail: {
      allow: [],
    },
    row: {
      allow: [],
    },
    column: {
      allow: [],
    },
    angle: {
      allow: [],
    },
  },

  // 条形图：Y 轴放维度分类
  bar: {
    xAxis: {
      allow: [],
    },
    yAxis: {
      allow: ['dimension'],
      required: true,
      maxCount: 1,
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    detail: {
      allow: [],
    },
    row: {
      allow: [],
    },
    column: {
      allow: [],
    },
    angle: {
      allow: [],
    },
  },

  // 折线图：X 轴放维度时间 + color 分组
  line: {
    xAxis: {
      allow: ['dimension'],
      required: true,
      maxCount: 1,
    },
    yAxis: {
      allow: [],
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    detail: {
      allow: [],
    },
    row: {
      allow: [],
    },
    column: {
      allow: [],
    },
    angle: {
      allow: [],
    },
  },

  // 面积图：X 轴放维度时间 + color 分组
  area: {
    xAxis: {
      allow: ['dimension'],
      required: true,
      maxCount: 1,
    },
    yAxis: {
      allow: [],
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    detail: {
      allow: [],
    },
    row: {
      allow: [],
    },
    column: {
      allow: [],
    },
    angle: {
      allow: [],
    },
  },

  // 饼图：color 放维度分类
  pie: {
    xAxis: {
      allow: [],
    },
    yAxis: {
      allow: [],
    },
    color: {
      allow: ['dimension'],
      required: true,
      maxCount: 1,
    },
    label: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    detail: {
      allow: [],
    },
    row: {
      allow: [],
    },
    column: {
      allow: [],
    },
    angle: {
      allow: [],
    },
  },

  // 散点图：X/Y 轴可以放维度 + color 分组
  scatter: {
    xAxis: {
      allow: ['dimension'],
      maxCount: 1,
    },
    yAxis: {
      allow: ['dimension'],
      maxCount: 1,
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    detail: {
      allow: [],
    },
    row: {
      allow: [],
    },
    column: {
      allow: [],
    },
    angle: {
      allow: [],
    },
  },

  // 玫瑰图：color 和 detail 坐标
  rose: {
    xAxis: {
      allow: [],
    },
    yAxis: {
      allow: [],
    },
    color: {
      allow: ['dimension'],
      required: true,
      maxCount: 1,
    },
    label: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    detail: {
      allow: ['dimension'],
      maxCount: 1,
    },
    row: {
      allow: [],
    },
    column: {
      allow: [],
    },
    angle: {
      allow: [],
    },
  },

  // 甜甜圈图：与饼图类似
  donut: {
    xAxis: {
      allow: [],
    },
    yAxis: {
      allow: [],
    },
    color: {
      allow: ['dimension'],
      required: true,
      maxCount: 1,
    },
    label: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    detail: {
      allow: [],
    },
    row: {
      allow: [],
    },
    column: {
      allow: [],
    },
    angle: {
      allow: [],
    },
  },

  // 雷达图：放在 color/detail
  radar: {
    xAxis: {
      allow: [],
    },
    yAxis: {
      allow: [],
    },
    color: {
      allow: ['dimension'],
      maxCount: 1,
    },
    label: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    tooltip: {
      allow: ['dimension'],
      maxCount: Infinity,
      allowSameFieldReuse: true,
    },
    detail: {
      allow: ['dimension'],
      maxCount: 1,
    },
    row: {
      allow: [],
    },
    column: {
      allow: [],
    },
    angle: {
      allow: [],
    },
  },

  // 表格：只显示字段作为列，不需要任何维度编码
  // 注：table 不使用任何 encoding，直接展示所有 measures 和 dimensions 作为列
  table: {
    xAxis: {
      allow: [],
    },
    yAxis: {
      allow: [],
    },
    color: {
      allow: [],
    },
    label: {
      allow: [],
    },
    tooltip: {
      allow: [],
    },
    detail: {
      allow: [],
    },
    row: {
      allow: [],
    },
    column: {
      allow: [],
    },
    angle: {
      allow: [],
    },
  },
}

/**
 * 获取某个 chartType 的维度契约
 */
export const getChartDimensionContract = (chartType: string) => {
  // 直接查找
  if (chartDimensionContract[chartType]) {
    return chartDimensionContract[chartType]
  }
  
  // 智能fallback：支持变体如 columnPercent, columnStack, barPercent 等
  const baseType = Object.keys(chartDimensionContract).find(base => chartType.startsWith(base))
  if (baseType) {
    return chartDimensionContract[baseType]
  }
  
  // 默认fallback
  return {
    xAxis: { allow: ['dimension'], required: false },
    yAxis: { allow: ['dimension'], required: false },
    color: { allow: ['dimension'], required: false },
    label: { allow: ['dimension'], maxCount: Infinity, required: false },
    tooltip: { allow: ['dimension'], maxCount: Infinity, required: false },
    detail: { allow: ['dimension'], required: false },
    row: { allow: ['dimension'], required: false },
    column: { allow: ['dimension'], required: false },
    angle: { allow: ['dimension'], required: false },
  }
}

/**
 * 获取某个 chartType 支持的维度 encoding 列表
 */
export const getSupportedDimensionEncodings = (chartType: string): DimensionEncodingType[] => {
  const contract = getChartDimensionContract(chartType)
  return Object.keys(contract).filter(
    (key) => contract[key as DimensionEncodingType].allow.length > 0
  ) as DimensionEncodingType[]
}

/**
 * 检查某个字段是否可以作为维度放在某个 encoding 上
 */
export const canDimensionBeOnEncoding = (
  chartType: string,
  encoding: DimensionEncodingType
): boolean => {
  const contract = getChartDimensionContract(chartType)
  const constraint = contract[encoding]
  if (!constraint) return false
  return constraint.allow.includes('dimension')
}

/**
 * 检查维度某个 encoding 是否必填
 */
export const isDimensionEncodingRequired = (chartType: string, encoding: DimensionEncodingType): boolean => {
  const contract = getChartDimensionContract(chartType)
  return contract[encoding]?.required ?? false
}

/**
 * 根据 chart type 获取 dimension 的默认 encoding
 * 当拖拽维度到 dimension field list 时使用
 * 支持 chart type 变体（如 barPercent, columnStack）通过智能fallback
 */
export const getDefaultDimensionEncoding = (chartType: string): DimensionEncodingType | undefined => {
  const baseDefaults: Record<string, DimensionEncodingType | undefined> = {
    column: 'xAxis',   // 分类轴
    bar: 'yAxis',      // 分类轴在Y
    line: 'xAxis',     // 时间轴通常在X
    area: 'xAxis',     // 时间轴通常在X
    pie: 'color',      // 分组编码
    scatter: 'xAxis',  // 可放X或Y
    rose: 'color',     // 极坐标分组
    donut: 'color',    // 分组编码
    radar: 'color',    // 分组
    table: undefined,  // 表格不需要encoding
  }
  
  // 直接查找
  if (baseDefaults[chartType] !== undefined) {
    return baseDefaults[chartType]
  }
  
  // 智能fallback：支持变体如 columnPercent, columnStack, barPercent 等
  const baseType = Object.keys(baseDefaults).find(base => chartType.startsWith(base))
  if (baseType) {
    return baseDefaults[baseType]
  }
  
  return undefined
}

/**
 * 根据 chart type 获取 measure 的默认 encoding
 * 当拖拽度量到 measure field list 时使用
 * 支持 chart type 变体（如 barPercent, columnStack）通过智能fallback
 */
export const getDefaultMeasureEncoding = (chartType: string): MeasureEncodingType | undefined => {
  const baseDefaults: Record<string, MeasureEncodingType | undefined> = {
    column: 'yAxis',   // 值轴
    bar: 'xAxis',      // 值轴在X
    line: 'yAxis',     // 值轴
    area: 'yAxis',     // 值轴
    pie: 'size',       // 扇形尺寸（数值大小）
    scatter: 'yAxis',  // 可以是X或Y，默认Y
    rose: 'size',      // 极坐标尺寸
    donut: 'size',     // 甜甜圈尺寸（数值大小）
    radar: 'yAxis',    // 值轴
    table: undefined,  // 表格不需要encoding
  }
  
  // 直接查找
  if (baseDefaults[chartType] !== undefined) {
    return baseDefaults[chartType]
  }
  
  // 智能fallback：支持变体如 columnPercent, columnStack, barPercent 等
  const baseType = Object.keys(baseDefaults).find(base => chartType.startsWith(base))
  if (baseType) {
    return baseDefaults[baseType]
  }
  
  return undefined
}
