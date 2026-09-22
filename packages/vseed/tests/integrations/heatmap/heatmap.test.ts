import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import config_0 from './chartType/simple.json'
import config_1 from './chartType/standard.json'
import config_2 from './color/dimension.json'
import config_3 from './color/measure.json'
import config_4 from './dataset/onlyDimensions.json'
import config_5 from './dataset/onlyMeasures.json'
import config_6 from './feedback/heatmapEmpty.json'
import config_7 from './feedback/labelRepeat.json'
import config_8 from './pivotGrid/pivotBasic.json'
import config_9 from './tooltip/heatmap.json'

const cases = [
  { name: 'chartType/simple', vseed: config_0 },
  { name: 'chartType/standard', vseed: config_1 },
  { name: 'color/dimension', vseed: config_2 },
  { name: 'color/measure', vseed: config_3 },
  { name: 'dataset/onlyDimensions', vseed: config_4 },
  { name: 'dataset/onlyMeasures', vseed: config_5 },
  { name: 'feedback/heatmapEmpty', vseed: config_6 },
  { name: 'feedback/labelRepeat', vseed: config_7 },
  { name: 'pivotGrid/pivotBasic', vseed: config_8 },
  { name: 'tooltip/heatmap', vseed: config_9 }
]

describe('heatmap', () => {
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
