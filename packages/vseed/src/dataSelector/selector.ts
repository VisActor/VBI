import type { Datum } from 'src/types'
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
import { omit } from 'remeda'
import { executeFilterCode } from 'src/pipeline/utils/sandbox'
import { InnerRowIndex } from 'src/dataReshape'

export type DynamicFilter = TableDynamicFilter | ChartDynamicFilter | ValueDynamicFilter
export type DynamicFilterResult = RowWithFieldRes[] | PartialDatumRes[] | number | string

/**
 * 判断两个数字是否“近似相等”
 */
function nearlyEqual(a: number, b: number, epsilon = 1e-8) {
  // NaN 直接不相等
  if (Number.isNaN(a) || Number.isNaN(b)) return false
  // 引用同一个数 或 完全相等
  if (a === b) return true
  const diff = Math.abs(a - b)
  return diff <= epsilon
}

export const selector = (
  vchartDatum: Datum,
  selector: Selector | Selectors | undefined | null,
  selectorMode: 'And' | 'Or' = 'And',
) => {
  // 无有效选择器, 则认为全部匹配成功
  if (!selector) {
    return true
  }

  // 过滤掉 vchart 相关字段
  const vchartKeys = Object.keys(vchartDatum).filter((k) => k.toLocaleLowerCase().startsWith('__vchart'))
  const datum = omit(vchartDatum, vchartKeys) as Datum

  // 统一处理选择器为数组
  const selectors = (Array.isArray(selector) ? selector : [selector]) as Selectors

  return selectors[selectorMode === 'And' ? 'every' : 'some']((selector) => {
    // 1. 字符串或数字
    if (isValueSelector(selector)) {
      return selectByValue(selector, datum)
    }

    // 2. 字段选择器（优先于 MeasureSelector/DimensionSelector 判断，因为字段选择器也有 field 属性）
    else if (isFieldSelector(selector)) {
      return selectByField(selector, datum)
    }

    // 3. 指标选择器
    else if (isMeasureSelector(selector)) {
      return selectByMeasure(selector, datum)
    }
    // 4. 维度选择器
    else if (isDimensionSelector(selector)) {
      return selectByDmension(selector, datum)
    }
    // 5. 部分数据对象选择器
    else if (isPartialDatumSelector(selector)) {
      return selectByPartial(selector, datum)
    }

    return false
  })
}

export const isValueSelector = (selector: Selector): selector is ValueSelector => {
  return typeof selector === 'string' || typeof selector === 'number'
}

export const isPartialDatumSelector = (selector: Selector): selector is PartialDatumSelector => {
  return typeof selector === 'object' && selector !== null
}

/**
 * 判断是否为字段选择器
 * @description 字段选择器只有 field 属性，没有 operator/op/value
 */
export const isFieldSelector = (selector: Selector): selector is FieldSelector => {
  return (
    typeof selector === 'object' &&
    selector !== null &&
    'field' in selector &&
    !('operator' in selector) &&
    !('op' in selector) &&
    !('value' in selector)
  )
}

export const isMeasureSelector = (selector: Selector): selector is MeasureSelector => {
  return (
    typeof selector === 'object' &&
    selector !== null &&
    'field' in selector &&
    ('operator' in selector || 'op' in selector) &&
    'value' in selector &&
    (['=', '==', '!=', '>', '<', '>=', '<=', 'between'].includes(selector.operator as string) ||
      ['=', '==', '!=', '>', '<', '>=', '<=', 'between'].includes(selector.op as string))
  )
}

export const isDimensionSelector = (selector: Selector): selector is DimensionSelector => {
  return (
    typeof selector === 'object' &&
    selector !== null &&
    'field' in selector &&
    ('operator' in selector || 'op' in selector) &&
    'value' in selector &&
    (['in', 'not in'].includes(selector.operator as string) || ['in', 'not in'].includes(selector.op as string))
  )
}

export const selectByMeasure = (selector: MeasureSelector, datum: Datum) => {
  const op = selector.operator || selector.op
  const selectorValueArr = Array.isArray(selector.value) ? selector.value : [selector.value]

  switch (op) {
    case '=':
      if (
        String(datum[selector.field]) === String(selectorValueArr[0]) ||
        nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))
      ) {
        return true
      }
      break
    case '==':
      if (datum[selector.field] === selectorValueArr[0]) {
        return true
      }
      break
    case '!=':
      if (datum[selector.field] !== selectorValueArr[0]) {
        return true
      }
      break
    case '>':
      if (
        datum[selector.field] > selectorValueArr[0] &&
        !nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))
      ) {
        return true
      }
      break
    case '<':
      if (
        datum[selector.field] < selectorValueArr[0] &&
        !nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))
      ) {
        return true
      }
      break
    case '>=':
      if (
        datum[selector.field] >= selectorValueArr[0] ||
        nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))
      ) {
        return true
      }
      break
    case '<=':
      if (
        datum[selector.field] <= selectorValueArr[0] ||
        nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))
      ) {
        return true
      }
      break
    case 'between':
      if (
        Array.isArray(selector.value) &&
        (datum[selector.field] >= selectorValueArr[0] ||
          nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))) &&
        (datum[selector.field] <= selectorValueArr[1] ||
          nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[1])))
      ) {
        return true
      }
      break
  }
  return false
}

export const selectByDmension = (selector: DimensionSelector, datum: Datum) => {
  const op = selector.operator || selector.op
  const selectorValueArr = Array.isArray(selector.value) ? selector.value : [selector.value]
  switch (op) {
    case 'in':
      if (selectorValueArr.includes(datum[selector.field] as string | number)) {
        return true
      }
      break
    case 'not in':
      if (!selectorValueArr.includes(datum[selector.field] as string | number)) {
        return true
      }
      break
  }

  return false
}

/**
 * 通过字段名选择
 * @description 检查 datum 是否包含指定字段（用于列级选择）
 */
export const selectByField = (selector: FieldSelector, datum: Datum) => {
  const fields = Array.isArray(selector.field) ? selector.field : [selector.field]
  const datumKeys = Object.keys(datum)

  // 检查 datum 的 keys 中是否包含任一指定字段
  return fields.some((field) => datumKeys.includes(field))
}

/**
 * 检查给定的字段是否与 FieldSelector 匹配
 */
export const matchesFieldSelector = (field: string, fieldSelector: FieldSelector): boolean => {
  const fields = Array.isArray(fieldSelector.field) ? fieldSelector.field : [fieldSelector.field]
  return fields.includes(field)
}

export const selectByPartial = (selector: PartialDatumSelector, datum: Datum) => {
  return Object.keys(selector).every((key) => datum[key] === selector[key])
}

export const selectByValue = (selector: ValueSelector, datum: Datum) => {
  return Object.values(datum).some((v) => v === selector)
}

const matchesCellSelector = (cell: Datum, filterRes: RowWithFieldRes) => {
  if (filterRes[InnerRowIndex] !== cell[InnerRowIndex]) return false
  return filterRes.field === '*' || Object.keys(cell).includes(filterRes.field)
}

const matchesDatum = (target: Datum, candidate: Datum) => {
  return Object.keys(candidate).every((key) => target[key] === candidate[key])
}

/**
 * 公共方法：检查是否为动态过滤器结构
 */
const isDynamicFilterLike = (selector: any, expectedTypes: string[]): boolean => {
  return (
    typeof selector === 'object' &&
    selector !== null &&
    'type' in selector &&
    expectedTypes.includes(selector.type) &&
    'code' in selector &&
    typeof selector.code === 'string'
  )
}

/**
 * 识别是否为row-with-field动态过滤器
 */
export const isRowWithFieldDynamicFilter = (selector: any): selector is TableDynamicFilter => {
  return isDynamicFilterLike(selector, ['row-with-field'])
}

/**
 * 识别是否为数值动态过滤器（用于标注线等场景）
 */
export const isValueDynamicFilter = (selector: any): selector is ValueDynamicFilter => {
  return isDynamicFilterLike(selector, ['value'])
}

/**
 * 识别是否为动态过滤器（通用判断，包含所有类型的动态过滤器）
 */
export const isDynamicFilter = (selector: any): selector is DynamicFilter => {
  return isDynamicFilterLike(selector, ['row-with-field', 'value'])
}

/**
 * 验证动态过滤器执行结果的类型兼容性
 * @description
 * 在主线程中对 Worker 返回值进行类型特定的验证
 * - TableDynamicFilter: 必须返回包含 __row_index 和 field 的对象数组
 * - ChartDynamicFilter: 必须返回任意对象数组
 * - ValueDynamicFilter: 必须返回 number | string
 *
 * @param result Worker 返回的原始结果
 * @param filter 动态过滤器配置
 * @returns 验证是否通过
 * @throws 当验证失败时抛出 TypeError
 */
const validateFilterResult = (result: any, filter: DynamicFilter): void => {
  // ValueDynamicFilter：必须返回 number | string
  if (isValueDynamicFilter(filter)) {
    if (typeof result !== 'number' && typeof result !== 'string') {
      throw new TypeError(
        `ValueDynamicFilter must return a number or string, but got: ${typeof result}. ` + `Code: "${filter.code}"`,
      )
    }
    return
  }

  // TableDynamicFilter 和 ChartDynamicFilter：必须返回对象数组
  if (!Array.isArray(result)) {
    throw new TypeError(
      `${isRowWithFieldDynamicFilter(filter) ? 'TableDynamicFilter' : 'ChartDynamicFilter'} must return an array, ` +
        `but got: ${typeof result}. Code: "${filter.code}"`,
    )
  }

  // TableDynamicFilter：检查数组元素结构
  if (isRowWithFieldDynamicFilter(filter)) {
    for (let i = 0; i < result.length; i++) {
      const item = result[i]
      if (typeof item !== 'object' || item === null) {
        throw new TypeError(`TableDynamicFilter array element at index ${i} must be an object, got: ${typeof item}`)
      }
      if (!(InnerRowIndex in item) && '__row_index' in item === false) {
        throw new TypeError(
          `TableDynamicFilter array element at index ${i} must contain __row_index or InnerRowIndex field`,
        )
      }
      if (!('field' in item)) {
        throw new TypeError(`TableDynamicFilter array element at index ${i} must contain 'field' field`)
      }
    }
  }
}

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
export const executeDynamicFilter = async (
  filter: DynamicFilter,
  allData: Datum[],
): Promise<{ success: boolean; data: DynamicFilterResult; error?: string }> => {
  try {
    const { success, data, error } = await executeFilterCode({
      code: filter.code,
      data: allData,
    })

    if (!success) {
      // eslint-disable-next-line no-console
      console.warn('[vseed] Dynamic filter execution failed:', error)
      return {
        success: false,
        data: isRowWithFieldDynamicFilter(filter) ? [] : '',
        error,
      }
    }

    // 主线程验证：根据过滤器类型进行特定检查
    try {
      validateFilterResult(data, filter)
    } catch (validationError) {
      // eslint-disable-next-line no-console
      console.error('[vseed] Dynamic filter result validation failed:', validationError)
      return {
        success: false,
        data: isRowWithFieldDynamicFilter(filter) ? [] : '',
        error: validationError instanceof Error ? validationError.message : String(validationError),
      }
    }

    return {
      success,
      data: data as DynamicFilterResult,
    }
  } catch (error) {
    // 捕获所有可能的异常：
    // - Worker 不支持
    // - Worker 池初始化/获取失败
    // - validateCodeSafety 验证失败
    // - 数据验证失败
    const errorMessage = error instanceof Error ? error.message : String(error)
    // eslint-disable-next-line no-console
    console.error('[vseed] Dynamic filter execution threw exception:', errorMessage)

    return {
      success: false,
      data: isRowWithFieldDynamicFilter(filter) ? [] : '',
      error: errorMessage,
    }
  }
}

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
export const matchDynamicFilterResult = (
  result: DynamicFilterResult,
  datum: Datum,
  selectorType: 'table' | 'chart' = 'table',
): boolean => {
  // ValueDynamicFilter 不应该通过这个函数处理
  if (typeof result === 'number' || typeof result === 'string') {
    throw new Error('matchDynamicFilterResult does not support ValueDynamicFilter results')
  }

  if (selectorType === 'table') {
    return result.some((item) => {
      return matchesCellSelector(datum, item as RowWithFieldRes)
    })
  }
  return result.some((item) => {
    return matchesDatum(datum, item as PartialDatumSelector)
  })
}

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
export const selectorWithDynamicFilter = (
  vchartDatum: Datum,
  selectorConfig: DynamicFilter,
  defaultSelector?: Selector | Selector[] | null,
): boolean => {
  // 无有效选择器, 则认为全部匹配成功
  if (!selectorConfig) {
    return true
  }

  // ValueDynamicFilter 不用于选择，直接返回 false
  if (isValueDynamicFilter(selectorConfig)) {
    if (selectorConfig.fallback) {
      const fallbackSelector = Array.isArray(selectorConfig.fallback)
        ? selectorConfig.fallback
        : [selectorConfig.fallback]
      return selector(vchartDatum, fallbackSelector)
    }
    return defaultSelector ? selector(vchartDatum, defaultSelector) : false
  }

  const selectorType = isRowWithFieldDynamicFilter(selectorConfig) ? 'table' : 'chart'

  // 优先使用预先执行的结果
  if (selectorConfig.result?.success && selectorConfig.result.data) {
    return matchDynamicFilterResult(selectorConfig.result.data, vchartDatum, selectorType)
  }

  if (selectorConfig.fallback) {
    // 如果有 fallback，使用传统 selector 进行匹配
    const fallbackSelector = Array.isArray(selectorConfig.fallback)
      ? selectorConfig.fallback
      : [selectorConfig.fallback]
    return selector(vchartDatum, fallbackSelector)
  }

  // 没有结果也没有 fallback，返回 false
  return defaultSelector ? selector(vchartDatum, defaultSelector) : false
}
