import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import config_0 from './annotationArea/bar.json'
import config_1 from './annotationArea/column.json'
import config_2 from './annotationArea/line.json'
import config_3 from './annotationHorizontalLine/fixed-y-value.json'
import config_4 from './annotationHorizontalLine/selector.json'
import config_5 from './annotationPoint/condition.json'
import config_6 from './annotationPoint/partial-datum.json'
import config_7 from './annotationPoint/value-point.json'
import config_8 from './annotationVerticalLine/fixed-x-value.json'
import config_9 from './annotationVerticalLine/selector.json'
import config_10 from './barStyle/barstyle-array.json'
import config_11 from './barStyle/dimension-condition.json'
import config_12 from './barStyle/partial-datum.json'
import config_13 from './barStyle/value.json'
import config_14 from './bodyCellStyle/pivotTable-background-scale.json'
import config_15 from './bodyCellStyle/table-background-scale.json'
import config_16 from './bodyCellStyle/表格条件样式---全局样式.json'
import config_17 from './bodyCellStyle/表格条件样式---多个条件.json'
import config_18 from './bodyCellStyle/表格条件样式---根据度量值设置.json'
import config_19 from './bodyCellStyle/表格条件样式.json'
import config_20 from './bodyCellStyle/透视表条件样式---全局样式.json'
import config_21 from './bodyCellStyle/透视表条件样式---根据度量值设置.json'
import config_22 from './bodyCellStyle/透视表条件样式---符合条件.json'
import config_23 from './brush/enable.json'
import config_24 from './brush/removeonclick.json'
import config_25 from './color/colormapping.json'
import config_26 from './color/colorscheme.json'
import config_27 from './dataset/单指标-单维度.json'
import config_28 from './dataset/单指标-多维度.json'
import config_29 from './dataset/单指标-零维度.json'
import config_30 from './dataset/多指标-单维度.json'
import config_31 from './dataset/多指标-多维度.json'
import config_32 from './dataset/多指标-零维度.json'
import config_33 from './dataset/数据维度与指标配置.json'
import config_34 from './dataset/自动选择.json'
import config_35 from './dimensions/列维度.json'
import config_36 from './dimensions/普通维度.json'
import config_37 from './dimensions/行维度.json'
import config_38 from './dimensions/透视维度.json'
import config_39 from './dynamicFilter/annotation-horizontal-line.json'
import config_40 from './dynamicFilter/annotation-point.json'
import config_41 from './dynamicFilter/annotation-vertical-line.json'
import config_42 from './dynamicFilter/area-line-point-style.json'
import config_43 from './dynamicFilter/column-bar-style.json'
import config_44 from './dynamicFilter/pivot-table-cell-style.json'
import config_45 from './dynamicFilter/table-dynamic-cell-style.json'
import config_46 from './i18n/en-us.json'
import config_47 from './i18n/zh-cn.json'
import config_48 from './label/enable.json'
import config_49 from './legend/border.json'
import config_50 from './legend/enable.json'
import config_51 from './legend/labelcolor.json'
import config_52 from './legend/labelfontsize.json'
import config_53 from './legend/labelfontweight.json'
import config_54 from './legend/maxsize.json'
import config_55 from './legend/position.json'
import config_56 from './measures/指标组.json'
import config_57 from './numFormat/autoformat.json'
import config_58 from './numFormat/fractiondigits.json'
import config_59 from './numFormat/ratio-&-symbol.json'
import config_60 from './numFormat/roundingmode.json'
import config_61 from './numFormat/roundingpriority.json'
import config_62 from './numFormat/significantdigits.json'
import config_63 from './numFormat/suffix-&-prefix.json'
import config_64 from './numFormat/thousandseparator.json'
import config_65 from './numFormat/type.json'
import config_66 from './pointStyle/dimension-condition.json'
import config_67 from './pointStyle/measure-condition.json'
import config_68 from './pointStyle/partial-datum.json'
import config_69 from './pointStyle/point-array.json'
import config_70 from './pointStyle/value.json'
import config_71 from './polynomial/column-示例.json'
import config_72 from './polynomial/scatter-示例.json'
import config_73 from './sort/图例自身排序.json'
import config_74 from './sort/指标排序-1.json'
import config_75 from './sort/指标排序.json'
import config_76 from './sort/维度排序-1.json'
import config_77 from './sort/维度排序.json'
import config_78 from './sort/自定义排序(图例id).json'
import config_79 from './sort/自定义排序(图例名称).json'
import config_80 from './sort/自定义排序.json'
import config_81 from './totals/columnTotal.json'
import config_82 from './totals/rowTotal.json'
import config_83 from './totals/singleIndicator.json'

const cases = [
  { name: 'annotationArea/bar', vseed: config_0 },
  { name: 'annotationArea/column', vseed: config_1 },
  { name: 'annotationArea/line', vseed: config_2 },
  { name: 'annotationHorizontalLine/fixed-y-value', vseed: config_3 },
  { name: 'annotationHorizontalLine/selector', vseed: config_4 },
  { name: 'annotationPoint/condition', vseed: config_5 },
  { name: 'annotationPoint/partial-datum', vseed: config_6 },
  { name: 'annotationPoint/value-point', vseed: config_7 },
  { name: 'annotationVerticalLine/fixed-x-value', vseed: config_8 },
  { name: 'annotationVerticalLine/selector', vseed: config_9 },
  { name: 'barStyle/barstyle-array', vseed: config_10 },
  { name: 'barStyle/dimension-condition', vseed: config_11 },
  { name: 'barStyle/partial-datum', vseed: config_12 },
  { name: 'barStyle/value', vseed: config_13 },
  { name: 'bodyCellStyle/pivotTable-background-scale', vseed: config_14 },
  { name: 'bodyCellStyle/table-background-scale', vseed: config_15 },
  { name: 'bodyCellStyle/表格条件样式---全局样式', vseed: config_16 },
  { name: 'bodyCellStyle/表格条件样式---多个条件', vseed: config_17 },
  { name: 'bodyCellStyle/表格条件样式---根据度量值设置', vseed: config_18 },
  { name: 'bodyCellStyle/表格条件样式', vseed: config_19 },
  { name: 'bodyCellStyle/透视表条件样式---全局样式', vseed: config_20 },
  { name: 'bodyCellStyle/透视表条件样式---根据度量值设置', vseed: config_21 },
  { name: 'bodyCellStyle/透视表条件样式---符合条件', vseed: config_22 },
  { name: 'brush/enable', vseed: config_23 },
  { name: 'brush/removeonclick', vseed: config_24 },
  { name: 'color/colormapping', vseed: config_25 },
  { name: 'color/colorscheme', vseed: config_26 },
  { name: 'dataset/单指标-单维度', vseed: config_27 },
  { name: 'dataset/单指标-多维度', vseed: config_28 },
  { name: 'dataset/单指标-零维度', vseed: config_29 },
  { name: 'dataset/多指标-单维度', vseed: config_30 },
  { name: 'dataset/多指标-多维度', vseed: config_31 },
  { name: 'dataset/多指标-零维度', vseed: config_32 },
  { name: 'dataset/数据维度与指标配置', vseed: config_33 },
  { name: 'dataset/自动选择', vseed: config_34 },
  { name: 'dimensions/列维度', vseed: config_35 },
  { name: 'dimensions/普通维度', vseed: config_36 },
  { name: 'dimensions/行维度', vseed: config_37 },
  { name: 'dimensions/透视维度', vseed: config_38 },
  { name: 'dynamicFilter/annotation-horizontal-line', vseed: config_39 },
  { name: 'dynamicFilter/annotation-point', vseed: config_40 },
  { name: 'dynamicFilter/annotation-vertical-line', vseed: config_41 },
  { name: 'dynamicFilter/area-line-point-style', vseed: config_42 },
  { name: 'dynamicFilter/column-bar-style', vseed: config_43 },
  { name: 'dynamicFilter/pivot-table-cell-style', vseed: config_44 },
  { name: 'dynamicFilter/table-dynamic-cell-style', vseed: config_45 },
  { name: 'i18n/en-us', vseed: config_46 },
  { name: 'i18n/zh-cn', vseed: config_47 },
  { name: 'label/enable', vseed: config_48 },
  { name: 'legend/border', vseed: config_49 },
  { name: 'legend/enable', vseed: config_50 },
  { name: 'legend/labelcolor', vseed: config_51 },
  { name: 'legend/labelfontsize', vseed: config_52 },
  { name: 'legend/labelfontweight', vseed: config_53 },
  { name: 'legend/maxsize', vseed: config_54 },
  { name: 'legend/position', vseed: config_55 },
  { name: 'measures/指标组', vseed: config_56 },
  { name: 'numFormat/autoformat', vseed: config_57 },
  { name: 'numFormat/fractiondigits', vseed: config_58 },
  { name: 'numFormat/ratio-&-symbol', vseed: config_59 },
  { name: 'numFormat/roundingmode', vseed: config_60 },
  { name: 'numFormat/roundingpriority', vseed: config_61 },
  { name: 'numFormat/significantdigits', vseed: config_62 },
  { name: 'numFormat/suffix-&-prefix', vseed: config_63 },
  { name: 'numFormat/thousandseparator', vseed: config_64 },
  { name: 'numFormat/type', vseed: config_65 },
  { name: 'pointStyle/dimension-condition', vseed: config_66 },
  { name: 'pointStyle/measure-condition', vseed: config_67 },
  { name: 'pointStyle/partial-datum', vseed: config_68 },
  { name: 'pointStyle/point-array', vseed: config_69 },
  { name: 'pointStyle/value', vseed: config_70 },
  { name: 'polynomial/column-示例', vseed: config_71 },
  { name: 'polynomial/scatter-示例', vseed: config_72 },
  { name: 'sort/图例自身排序', vseed: config_73 },
  { name: 'sort/指标排序-1', vseed: config_74 },
  { name: 'sort/指标排序', vseed: config_75 },
  { name: 'sort/维度排序-1', vseed: config_76 },
  { name: 'sort/维度排序', vseed: config_77 },
  { name: 'sort/自定义排序(图例id)', vseed: config_78 },
  { name: 'sort/自定义排序(图例名称)', vseed: config_79 },
  { name: 'sort/自定义排序', vseed: config_80 },
  { name: 'totals/columnTotal', vseed: config_81 },
  { name: 'totals/rowTotal', vseed: config_82 },
  { name: 'totals/singleIndicator', vseed: config_83 }
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
