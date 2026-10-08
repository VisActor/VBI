import type { IIndicatorSpec, IPieChartSpec } from '@visactor/vchart'
import type { DonutConfig, VChartSpecPipe } from 'src/types'

const textItem = (
  text: string | number | null | undefined,
  style: NonNullable<IIndicatorSpec['title']>['style'],
): IIndicatorSpec['title'] => ({
  visible: text != null,
  autoLimit: true,
  style: { ...style, text: text ?? '' },
})

export const centerText: VChartSpecPipe = (spec, { advancedVSeed }) => {
  const config = advancedVSeed.config[advancedVSeed.chartType] as DonutConfig
  const text = config?.centerText
  if (text?.titleText == null && text?.subTitleText == null) return spec

  return {
    ...spec,
    indicator: {
      visible: true,
      fixed: true,
      trigger: 'none',
      limitRatio: (spec as IPieChartSpec).innerRadius as number,
      title: textItem(text.titleText, {
        fill: config.label?.labelColor ?? config.legend?.labelColor,
        fontSize: text.titleFontSize,
        fontWeight: text.titleFontWeight,
      }),
      content: textItem(text.subTitleText, {
        fill: config.legend?.labelColor,
        fillOpacity: text.subTitleOpacity,
        fontSize: text.subTitleFontSize,
      }),
      gap: text.gap ?? undefined,
    },
  }
}
