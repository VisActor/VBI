/**
 * @description 判断当前柱图类型是否为横向柱图。
 * @param direction 柱图方向。
 * @returns 是否为横向柱图。
 */
export const isHorizontalBar = (direction: 'horizontal' | 'vertical'): boolean => direction === 'horizontal'

/**
 * @description 生成柱图增长动画的 options，横向按宽度增长，纵向按高度反向增长。
 * @param isHorizontal 是否为横向柱图。
 * @returns 柱图增长动画 options 生成函数。
 */
const getBarGrowOptions = (isHorizontal: boolean) => (_datum: any, _element: any, _opt: any, context: any) => {
  const overall = context.vchart.getChart().getComponentsByType('cartesianAxis-linear')[0]._scale.range()[0]
  return isHorizontal ? { overall } : { orient: 'negative', overall }
}

/**
 * @description 生成柱图增长入场动画配置。
 * @param direction 柱图方向。
 * @returns 柱图增长入场动画配置。
 */
export const growBar = (direction: 'horizontal' | 'vertical') => {
  const isHorizontal = isHorizontalBar(direction)
  return {
    type: isHorizontal ? 'growWidthIn' : 'growHeightIn',
    oneByOne: false,
    options: getBarGrowOptions(isHorizontal),
    controlOptions: { immediatelyApply: true },
  }
}

/**
 * @description 生成柱图逐个淡入的动画配置。
 * @returns 柱图淡入动画配置。
 */
export const fadeInBar = () => ({ type: 'fadeIn', oneByOne: true })

/**
 * @description 为柱图数据补充随机 dataKey，确保每根柱子按独立图元执行动画。
 * @param spec 当前 VChart spec。
 * @returns 无返回值，直接修改 spec。
 */
const setRandomDataKey = (spec: any) => {
  if (!spec?.data?.[0]?.values) return
  const dataKey = 'dataKey'
  spec.data[0].values.forEach((datum: any) => (datum[dataKey] = Math.random()))
  spec.dataKey = dataKey
  if (spec.type === 'common' && Array.isArray(spec.series)) {
    spec.series.forEach((series: any) => (series.dataKey = dataKey))
  }
}

/**
 * @description 生成柱图移入/移出的方向、位移点和通道配置。
 * @param direction 柱图方向。
 * @param orient 移动方向，in 表示移入，out 表示移出。
 * @returns 柱图移动动画 options。
 */
const getBarMoveOptions = (direction: 'horizontal' | 'vertical', orient: 'in' | 'out') => {
  const axis = isHorizontalBar(direction) ? 'y' : 'x'
  const size = axis === 'x' ? 'width' : 'height'
  const offsetSign = orient === 'in' ? 1 : -1

  return {
    direction: axis,
    orient: 'negative',
    point: (_datum: any, element: any, opt: any) => ({
      [axis]: element.getGraphicAttribute(axis) + offsetSign * opt[size],
    }),
  }
}

/**
 * @description 生成柱图从画布外移入的动画配置。
 * @param direction 柱图方向。
 * @param spec 当前 VChart spec。
 * @param isUpdate 是否为 update 阶段动画。
 * @returns 柱图移入动画配置。
 */
export const moveInBar = (direction: 'horizontal' | 'vertical', spec?: any, isUpdate = false) => {
  if (!isUpdate && spec) setRandomDataKey(spec)
  const excludeChannels = isHorizontalBar(direction) ? ['x'] : ['y']
  return { type: 'moveIn', options: { ...getBarMoveOptions(direction, 'in'), excludeChannels } }
}

/**
 * @description 生成柱图移出画布的动画配置。
 * @param direction 柱图方向。
 * @returns 柱图移出动画配置。
 */
export const moveOutBar = (direction: 'horizontal' | 'vertical') => ({
  type: 'moveOut',
  options: getBarMoveOptions(direction, 'out'),
})
