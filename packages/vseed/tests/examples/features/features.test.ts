import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import config_0 from './animation/bar-like.json'
import config_1 from './animation/line-area.json'
import config_2 from './animation/pie-like.json'
import config_3 from './animation/radar.json'
import config_4 from './animation/scatter.json'
import config_5 from './annotationArea/area-selector-months.json'
import config_6 from './annotationArea/bar-range-risk.json'
import config_7 from './annotationArea/bar.json'
import config_8 from './annotationArea/boxplot-range-risk.json'
import config_9 from './annotationArea/column-range-risk.json'
import config_10 from './annotationArea/column.json'
import config_11 from './annotationArea/histogram-range-window.json'
import config_12 from './annotationArea/line-range-risk.json'
import config_13 from './annotationArea/line.json'
import config_14 from './annotationArea/scatter-range-empty.json'
import config_15 from './annotationArea/scatter-range-rectangle.json'
import config_16 from './annotationArea/scatter-range-x.json'
import config_17 from './annotationArea/scatter-range-y.json'
import config_18 from './annotationHorizontalLine/fixed-y-value.json'
import config_19 from './annotationHorizontalLine/selector.json'
import config_20 from './annotationPoint/condition.json'
import config_21 from './annotationPoint/partial-datum.json'
import config_22 from './annotationPoint/value-point.json'
import config_23 from './annotationVerticalLine/fixed-x-value.json'
import config_24 from './annotationVerticalLine/selector.json'
import config_25 from './barStyle/barstyle-array.json'
import config_26 from './barStyle/dimension-condition.json'
import config_27 from './barStyle/partial-datum.json'
import config_28 from './barStyle/value.json'
import config_29 from './bodyCellStyle/pivotTable-background-scale-with-total.json'
import config_30 from './bodyCellStyle/pivotTable-background-scale.json'
import config_31 from './bodyCellStyle/table-background-scale.json'
import config_32 from './bodyCellStyle/table-background-with-total.json'
import config_33 from './bodyCellStyle/表格条件样式---全局样式.json'
import config_34 from './bodyCellStyle/表格条件样式---多个条件.json'
import config_35 from './bodyCellStyle/表格条件样式---根据度量值设置.json'
import config_36 from './bodyCellStyle/表格条件样式.json'
import config_37 from './bodyCellStyle/透视表条件样式---全局样式.json'
import config_38 from './bodyCellStyle/透视表条件样式---根据度量值设置.json'
import config_39 from './bodyCellStyle/透视表条件样式---符合条件.json'
import config_40 from './brush/enable.json'
import config_41 from './brush/removeonclick.json'
import config_42 from './color/colormapping.json'
import config_43 from './color/colorscheme.json'
import config_44 from './dataset/单指标-单维度.json'
import config_45 from './dataset/单指标-多维度.json'
import config_46 from './dataset/单指标-零维度.json'
import config_47 from './dataset/多指标-单维度.json'
import config_48 from './dataset/多指标-多维度.json'
import config_49 from './dataset/多指标-零维度.json'
import config_50 from './dataset/数据维度与指标配置.json'
import config_51 from './dataset/自动选择.json'
import config_52 from './dimensions/列维度.json'
import config_53 from './dimensions/普通维度.json'
import config_54 from './dimensions/行维度.json'
import config_55 from './dimensions/透视维度.json'
import config_56 from './dynamicFilter/annotation-horizontal-line.json'
import config_57 from './dynamicFilter/annotation-point.json'
import config_58 from './dynamicFilter/annotation-vertical-line.json'
import config_59 from './dynamicFilter/area-line-point-style.json'
import config_60 from './dynamicFilter/column-bar-style.json'
import config_61 from './dynamicFilter/pivot-table-cell-style.json'
import config_62 from './dynamicFilter/table-dynamic-cell-style.json'
import config_63 from './formatter/base-dim-formatter-bar.json'
import config_64 from './formatter/base-dim-formatter-dualAxis.json'
import config_65 from './formatter/base-dim-formatter-heatmap.json'
import config_66 from './formatter/base-dim-formatter-pie.json'
import config_67 from './formatter/base-dim-formatter-pivotChart.json'
import config_68 from './formatter/base-dim-formatter-pivotTable.json'
import config_69 from './formatter/base-dim-formatter-radar.json'
import config_70 from './formatter/base-dim-formatter-scatter.json'
import config_71 from './formatter/base-dim-formatter-table.json'
import config_72 from './formatter/base-dim-formatter-treemap.json'
import config_73 from './i18n/en-us.json'
import config_74 from './i18n/zh-cn.json'
import config_75 from './label/enable.json'
import config_76 from './legend/border.json'
import config_77 from './legend/enable.json'
import config_78 from './legend/labelcolor.json'
import config_79 from './legend/labelfontsize.json'
import config_80 from './legend/labelfontweight.json'
import config_81 from './legend/maxsize.json'
import config_82 from './legend/position.json'
import config_83 from './measures/指标组.json'
import config_84 from './numFormat/autoformat.json'
import config_85 from './numFormat/fractiondigits.json'
import config_86 from './numFormat/ratio-&-symbol.json'
import config_87 from './numFormat/roundingmode.json'
import config_88 from './numFormat/roundingpriority.json'
import config_89 from './numFormat/significantdigits.json'
import config_90 from './numFormat/suffix-&-prefix.json'
import config_91 from './numFormat/thousandseparator.json'
import config_92 from './numFormat/type.json'
import config_93 from './pointStyle/dimension-condition.json'
import config_94 from './pointStyle/measure-condition.json'
import config_95 from './pointStyle/partial-datum.json'
import config_96 from './pointStyle/point-array.json'
import config_97 from './pointStyle/value.json'
import config_98 from './polynomial/column-示例.json'
import config_99 from './polynomial/scatter-示例.json'
import config_100 from './sort/图例自身排序.json'
import config_101 from './sort/指标排序-1.json'
import config_102 from './sort/指标排序.json'
import config_103 from './sort/维度排序-1.json'
import config_104 from './sort/维度排序.json'
import config_105 from './sort/自定义排序(图例id).json'
import config_106 from './sort/自定义排序(图例名称).json'
import config_107 from './sort/自定义排序.json'
import config_108 from './totals/columnTotal.json'
import config_109 from './totals/rowTotal.json'
import config_110 from './totals/singleIndicator.json'

const cases = [
  { name: 'animation/bar-like', vseed: config_0 },
  { name: 'animation/line-area', vseed: config_1 },
  { name: 'animation/pie-like', vseed: config_2 },
  { name: 'animation/radar', vseed: config_3 },
  { name: 'animation/scatter', vseed: config_4 },
  { name: 'annotationArea/area-selector-months', vseed: config_5 },
  { name: 'annotationArea/bar-range-risk', vseed: config_6 },
  { name: 'annotationArea/bar', vseed: config_7 },
  { name: 'annotationArea/boxplot-range-risk', vseed: config_8 },
  { name: 'annotationArea/column-range-risk', vseed: config_9 },
  { name: 'annotationArea/column', vseed: config_10 },
  { name: 'annotationArea/histogram-range-window', vseed: config_11 },
  { name: 'annotationArea/line-range-risk', vseed: config_12 },
  { name: 'annotationArea/line', vseed: config_13 },
  { name: 'annotationArea/scatter-range-empty', vseed: config_14 },
  { name: 'annotationArea/scatter-range-rectangle', vseed: config_15 },
  { name: 'annotationArea/scatter-range-x', vseed: config_16 },
  { name: 'annotationArea/scatter-range-y', vseed: config_17 },
  { name: 'annotationHorizontalLine/fixed-y-value', vseed: config_18 },
  { name: 'annotationHorizontalLine/selector', vseed: config_19 },
  { name: 'annotationPoint/condition', vseed: config_20 },
  { name: 'annotationPoint/partial-datum', vseed: config_21 },
  { name: 'annotationPoint/value-point', vseed: config_22 },
  { name: 'annotationVerticalLine/fixed-x-value', vseed: config_23 },
  { name: 'annotationVerticalLine/selector', vseed: config_24 },
  { name: 'barStyle/barstyle-array', vseed: config_25 },
  { name: 'barStyle/dimension-condition', vseed: config_26 },
  { name: 'barStyle/partial-datum', vseed: config_27 },
  { name: 'barStyle/value', vseed: config_28 },
  { name: 'bodyCellStyle/pivotTable-background-scale-with-total', vseed: config_29 },
  { name: 'bodyCellStyle/pivotTable-background-scale', vseed: config_30 },
  { name: 'bodyCellStyle/table-background-scale', vseed: config_31 },
  { name: 'bodyCellStyle/table-background-with-total', vseed: config_32 },
  { name: 'bodyCellStyle/表格条件样式---全局样式', vseed: config_33 },
  { name: 'bodyCellStyle/表格条件样式---多个条件', vseed: config_34 },
  { name: 'bodyCellStyle/表格条件样式---根据度量值设置', vseed: config_35 },
  { name: 'bodyCellStyle/表格条件样式', vseed: config_36 },
  { name: 'bodyCellStyle/透视表条件样式---全局样式', vseed: config_37 },
  { name: 'bodyCellStyle/透视表条件样式---根据度量值设置', vseed: config_38 },
  { name: 'bodyCellStyle/透视表条件样式---符合条件', vseed: config_39 },
  { name: 'brush/enable', vseed: config_40 },
  { name: 'brush/removeonclick', vseed: config_41 },
  { name: 'color/colormapping', vseed: config_42 },
  { name: 'color/colorscheme', vseed: config_43 },
  { name: 'dataset/单指标-单维度', vseed: config_44 },
  { name: 'dataset/单指标-多维度', vseed: config_45 },
  { name: 'dataset/单指标-零维度', vseed: config_46 },
  { name: 'dataset/多指标-单维度', vseed: config_47 },
  { name: 'dataset/多指标-多维度', vseed: config_48 },
  { name: 'dataset/多指标-零维度', vseed: config_49 },
  { name: 'dataset/数据维度与指标配置', vseed: config_50 },
  { name: 'dataset/自动选择', vseed: config_51 },
  { name: 'dimensions/列维度', vseed: config_52 },
  { name: 'dimensions/普通维度', vseed: config_53 },
  { name: 'dimensions/行维度', vseed: config_54 },
  { name: 'dimensions/透视维度', vseed: config_55 },
  { name: 'dynamicFilter/annotation-horizontal-line', vseed: config_56 },
  { name: 'dynamicFilter/annotation-point', vseed: config_57 },
  { name: 'dynamicFilter/annotation-vertical-line', vseed: config_58 },
  { name: 'dynamicFilter/area-line-point-style', vseed: config_59 },
  { name: 'dynamicFilter/column-bar-style', vseed: config_60 },
  { name: 'dynamicFilter/pivot-table-cell-style', vseed: config_61 },
  { name: 'dynamicFilter/table-dynamic-cell-style', vseed: config_62 },
  { name: 'formatter/base-dim-formatter-bar', vseed: config_63 },
  { name: 'formatter/base-dim-formatter-dualAxis', vseed: config_64 },
  { name: 'formatter/base-dim-formatter-heatmap', vseed: config_65 },
  { name: 'formatter/base-dim-formatter-pie', vseed: config_66 },
  { name: 'formatter/base-dim-formatter-pivotChart', vseed: config_67 },
  { name: 'formatter/base-dim-formatter-pivotTable', vseed: config_68 },
  { name: 'formatter/base-dim-formatter-radar', vseed: config_69 },
  { name: 'formatter/base-dim-formatter-scatter', vseed: config_70 },
  { name: 'formatter/base-dim-formatter-table', vseed: config_71 },
  { name: 'formatter/base-dim-formatter-treemap', vseed: config_72 },
  { name: 'i18n/en-us', vseed: config_73 },
  { name: 'i18n/zh-cn', vseed: config_74 },
  { name: 'label/enable', vseed: config_75 },
  { name: 'legend/border', vseed: config_76 },
  { name: 'legend/enable', vseed: config_77 },
  { name: 'legend/labelcolor', vseed: config_78 },
  { name: 'legend/labelfontsize', vseed: config_79 },
  { name: 'legend/labelfontweight', vseed: config_80 },
  { name: 'legend/maxsize', vseed: config_81 },
  { name: 'legend/position', vseed: config_82 },
  { name: 'measures/指标组', vseed: config_83 },
  { name: 'numFormat/autoformat', vseed: config_84 },
  { name: 'numFormat/fractiondigits', vseed: config_85 },
  { name: 'numFormat/ratio-&-symbol', vseed: config_86 },
  { name: 'numFormat/roundingmode', vseed: config_87 },
  { name: 'numFormat/roundingpriority', vseed: config_88 },
  { name: 'numFormat/significantdigits', vseed: config_89 },
  { name: 'numFormat/suffix-&-prefix', vseed: config_90 },
  { name: 'numFormat/thousandseparator', vseed: config_91 },
  { name: 'numFormat/type', vseed: config_92 },
  { name: 'pointStyle/dimension-condition', vseed: config_93 },
  { name: 'pointStyle/measure-condition', vseed: config_94 },
  { name: 'pointStyle/partial-datum', vseed: config_95 },
  { name: 'pointStyle/point-array', vseed: config_96 },
  { name: 'pointStyle/value', vseed: config_97 },
  { name: 'polynomial/column-示例', vseed: config_98 },
  { name: 'polynomial/scatter-示例', vseed: config_99 },
  { name: 'sort/图例自身排序', vseed: config_100 },
  { name: 'sort/指标排序-1', vseed: config_101 },
  { name: 'sort/指标排序', vseed: config_102 },
  { name: 'sort/维度排序-1', vseed: config_103 },
  { name: 'sort/维度排序', vseed: config_104 },
  { name: 'sort/自定义排序(图例id)', vseed: config_105 },
  { name: 'sort/自定义排序(图例名称)', vseed: config_106 },
  { name: 'sort/自定义排序', vseed: config_107 },
  { name: 'totals/columnTotal', vseed: config_108 },
  { name: 'totals/rowTotal', vseed: config_109 },
  { name: 'totals/singleIndicator', vseed: config_110 }
]

describe('features', () => {
  cases.forEach(({ name, vseed }) => {
    test(name, () => {
      registerAll()
      const { vseed: vseedConfig } = vseed as { vseed: unknown }
      const builder = Builder.from(vseedConfig as VSeed)
      const advanced = builder.buildAdvanced()
      
      expect(advanced).toBeDefined()
      expect(advanced).not.toBeNull()
      
      const spec = builder.buildSpec(advanced!)
      
      expect(spec).toBeDefined()
      expect(spec).not.toBeNull()
      
      // Verify builder methods return valid results
      expect(builder.getColorIdMap()).toBeDefined()
      expect(builder.getColorItems()).toBeDefined()
      expect(Builder.getAdvancedPipeline(builder.vseed.chartType)).toBeDefined()
      expect(Builder.getSpecPipeline(builder.vseed.chartType)).toBeDefined()
      expect(Builder.getTheme(builder.vseed.theme)).toBeDefined()
      expect(Builder.getThemeMap()).toBeDefined()
    });
  });
});
