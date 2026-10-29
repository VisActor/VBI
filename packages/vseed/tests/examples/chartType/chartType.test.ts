import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import config_0 from './area/basic.json'
import config_1 from './area/combination-stack.json'
import config_2 from './area/pivot-combination-stack.json'
import config_3 from './areaPercent/basic.json'
import config_4 from './areaPercent/example-2.json'
import config_5 from './areaPercent/example-3.json'
import config_6 from './bar/basic.json'
import config_7 from './bar/example-2.json'
import config_8 from './bar/example-3.json'
import config_9 from './barParallel/basic.json'
import config_10 from './barParallel/example-2.json'
import config_11 from './barParallel/example-3.json'
import config_12 from './barPercent/basic.json'
import config_13 from './barPercent/example-2.json'
import config_14 from './barPercent/example-3.json'
import config_15 from './boxplot/basic.json'
import config_16 from './boxplot/example-2.json'
import config_17 from './circlePacking/basic.json'
import config_18 from './circlePacking/combination.json'
import config_19 from './circlePacking/encoding.json'
import config_20 from './column/basic.json'
import config_21 from './column/example-2.json'
import config_22 from './column/example-3.json'
import config_23 from './columnParallel/basic.json'
import config_24 from './columnParallel/example-2.json'
import config_25 from './columnParallel/example-3.json'
import config_26 from './columnPercent/basic.json'
import config_27 from './columnPercent/example-2.json'
import config_28 from './columnPercent/example-3.json'
import config_29 from './donut/basic.json'
import config_30 from './donut/example-2.json'
import config_31 from './donut/example-3.json'
import config_32 from './dualAxis/basic.json'
import config_33 from './dualAxis/example-1.json'
import config_34 from './dualAxis/example-2.json'
import config_35 from './dualAxis/example-3.json'
import config_36 from './dualAxis/example-4.json'
import config_37 from './dualAxis/example-5.json'
import config_38 from './dualAxis/example-6.json'
import config_39 from './dualAxis/example-7.json'
import config_40 from './funnel/basic.json'
import config_41 from './funnel/example-2.json'
import config_42 from './funnel/example-3.json'
import config_43 from './funnel/example-4.json'
import config_44 from './heatmap/basic.json'
import config_45 from './heatmap/example-1.json'
import config_46 from './heatmap/example-2.json'
import config_47 from './heatmap/example-3.json'
import config_48 from './hierarchySankey/basic.json'
import config_49 from './hierarchySankey/multi-level-single-measure.json'
import config_50 from './hierarchySankey/pivot.json'
import config_51 from './hierarchySankey/single-value-metric-name-dimension.json'
import config_52 from './histogram/basic.json'
import config_53 from './histogram/example-2.json'
import config_54 from './histogram/example-3.json'
import config_55 from './histogram/example-4.json'
import config_56 from './histogram/example-5.json'
import config_57 from './line/basic.json'
import config_58 from './line/example-2.json'
import config_59 from './line/example-3.json'
import config_60 from './pie/basic.json'
import config_61 from './pie/example-2.json'
import config_62 from './pie/example-3.json'
import config_63 from './pivotTable/basic.json'
import config_64 from './pivotTable/example-2.json'
import config_65 from './pivotTable/example-3.json'
import config_66 from './pivotTable/layout-and-widths.json'
import config_67 from './raceBar/basic.json'
import config_68 from './raceColumn/basic.json'
import config_69 from './raceDonut/basic.json'
import config_70 from './raceLine/basic.json'
import config_71 from './racePie/basic.json'
import config_72 from './raceScatter/basic.json'
import config_73 from './radar/basic.json'
import config_74 from './radar/example-2.json'
import config_75 from './radar/example-3.json'
import config_76 from './rose/basic.json'
import config_77 from './rose/example-2.json'
import config_78 from './rose/example-3.json'
import config_79 from './rose/example-4.json'
import config_80 from './rose/stack.json'
import config_81 from './roseParallel/basic.json'
import config_82 from './roseParallel/example-2.json'
import config_83 from './roseParallel/example-3.json'
import config_84 from './sankey/basic.json'
import config_85 from './sankey/pivot.json'
import config_86 from './scatter/basic.json'
import config_87 from './scatter/example-2.json'
import config_88 from './scatter/example-3.json'
import config_89 from './sunburst/basic.json'
import config_90 from './sunburst/combination.json'
import config_91 from './sunburst/encoding.json'
import config_92 from './table/basic.json'
import config_93 from './table/example-2.json'
import config_94 from './table/example-3.json'
import config_95 from './table/example-4.json'
import config_96 from './table/layout-and-empty-values.json'
import config_97 from './treeMap/basic.json'
import config_98 from './treeMap/combination.json'
import config_99 from './treeMap/encoding.json'

const cases = [
  { name: 'area/basic', vseed: config_0 },
  { name: 'area/combination-stack', vseed: config_1 },
  { name: 'area/pivot-combination-stack', vseed: config_2 },
  { name: 'areaPercent/basic', vseed: config_3 },
  { name: 'areaPercent/example-2', vseed: config_4 },
  { name: 'areaPercent/example-3', vseed: config_5 },
  { name: 'bar/basic', vseed: config_6 },
  { name: 'bar/example-2', vseed: config_7 },
  { name: 'bar/example-3', vseed: config_8 },
  { name: 'barParallel/basic', vseed: config_9 },
  { name: 'barParallel/example-2', vseed: config_10 },
  { name: 'barParallel/example-3', vseed: config_11 },
  { name: 'barPercent/basic', vseed: config_12 },
  { name: 'barPercent/example-2', vseed: config_13 },
  { name: 'barPercent/example-3', vseed: config_14 },
  { name: 'boxplot/basic', vseed: config_15 },
  { name: 'boxplot/example-2', vseed: config_16 },
  { name: 'circlePacking/basic', vseed: config_17 },
  { name: 'circlePacking/combination', vseed: config_18 },
  { name: 'circlePacking/encoding', vseed: config_19 },
  { name: 'column/basic', vseed: config_20 },
  { name: 'column/example-2', vseed: config_21 },
  { name: 'column/example-3', vseed: config_22 },
  { name: 'columnParallel/basic', vseed: config_23 },
  { name: 'columnParallel/example-2', vseed: config_24 },
  { name: 'columnParallel/example-3', vseed: config_25 },
  { name: 'columnPercent/basic', vseed: config_26 },
  { name: 'columnPercent/example-2', vseed: config_27 },
  { name: 'columnPercent/example-3', vseed: config_28 },
  { name: 'donut/basic', vseed: config_29 },
  { name: 'donut/example-2', vseed: config_30 },
  { name: 'donut/example-3', vseed: config_31 },
  { name: 'dualAxis/basic', vseed: config_32 },
  { name: 'dualAxis/example-1', vseed: config_33 },
  { name: 'dualAxis/example-2', vseed: config_34 },
  { name: 'dualAxis/example-3', vseed: config_35 },
  { name: 'dualAxis/example-4', vseed: config_36 },
  { name: 'dualAxis/example-5', vseed: config_37 },
  { name: 'dualAxis/example-6', vseed: config_38 },
  { name: 'dualAxis/example-7', vseed: config_39 },
  { name: 'funnel/basic', vseed: config_40 },
  { name: 'funnel/example-2', vseed: config_41 },
  { name: 'funnel/example-3', vseed: config_42 },
  { name: 'funnel/example-4', vseed: config_43 },
  { name: 'heatmap/basic', vseed: config_44 },
  { name: 'heatmap/example-1', vseed: config_45 },
  { name: 'heatmap/example-2', vseed: config_46 },
  { name: 'heatmap/example-3', vseed: config_47 },
  { name: 'hierarchySankey/basic', vseed: config_48 },
  { name: 'hierarchySankey/multi-level-single-measure', vseed: config_49 },
  { name: 'hierarchySankey/pivot', vseed: config_50 },
  { name: 'hierarchySankey/single-value-metric-name-dimension', vseed: config_51 },
  { name: 'histogram/basic', vseed: config_52 },
  { name: 'histogram/example-2', vseed: config_53 },
  { name: 'histogram/example-3', vseed: config_54 },
  { name: 'histogram/example-4', vseed: config_55 },
  { name: 'histogram/example-5', vseed: config_56 },
  { name: 'line/basic', vseed: config_57 },
  { name: 'line/example-2', vseed: config_58 },
  { name: 'line/example-3', vseed: config_59 },
  { name: 'pie/basic', vseed: config_60 },
  { name: 'pie/example-2', vseed: config_61 },
  { name: 'pie/example-3', vseed: config_62 },
  { name: 'pivotTable/basic', vseed: config_63 },
  { name: 'pivotTable/example-2', vseed: config_64 },
  { name: 'pivotTable/example-3', vseed: config_65 },
  { name: 'pivotTable/layout-and-widths', vseed: config_66 },
  { name: 'raceBar/basic', vseed: config_67 },
  { name: 'raceColumn/basic', vseed: config_68 },
  { name: 'raceDonut/basic', vseed: config_69 },
  { name: 'raceLine/basic', vseed: config_70 },
  { name: 'racePie/basic', vseed: config_71 },
  { name: 'raceScatter/basic', vseed: config_72 },
  { name: 'radar/basic', vseed: config_73 },
  { name: 'radar/example-2', vseed: config_74 },
  { name: 'radar/example-3', vseed: config_75 },
  { name: 'rose/basic', vseed: config_76 },
  { name: 'rose/example-2', vseed: config_77 },
  { name: 'rose/example-3', vseed: config_78 },
  { name: 'rose/example-4', vseed: config_79 },
  { name: 'rose/stack', vseed: config_80 },
  { name: 'roseParallel/basic', vseed: config_81 },
  { name: 'roseParallel/example-2', vseed: config_82 },
  { name: 'roseParallel/example-3', vseed: config_83 },
  { name: 'sankey/basic', vseed: config_84 },
  { name: 'sankey/pivot', vseed: config_85 },
  { name: 'scatter/basic', vseed: config_86 },
  { name: 'scatter/example-2', vseed: config_87 },
  { name: 'scatter/example-3', vseed: config_88 },
  { name: 'sunburst/basic', vseed: config_89 },
  { name: 'sunburst/combination', vseed: config_90 },
  { name: 'sunburst/encoding', vseed: config_91 },
  { name: 'table/basic', vseed: config_92 },
  { name: 'table/example-2', vseed: config_93 },
  { name: 'table/example-3', vseed: config_94 },
  { name: 'table/example-4', vseed: config_95 },
  { name: 'table/layout-and-empty-values', vseed: config_96 },
  { name: 'treeMap/basic', vseed: config_97 },
  { name: 'treeMap/combination', vseed: config_98 },
  { name: 'treeMap/encoding', vseed: config_99 }
]

describe('chartType', () => {
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
