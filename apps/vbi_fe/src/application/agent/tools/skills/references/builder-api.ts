export const builderApiSkill = `
# Builder And VBI API

The vbi_application script receives the VBI package namespace as VBI.

Useful VBI exports include:
- VBI.VBI
- VBI.createVBI()
- VBI.createEmptyChart()
- VBI.createEmptyInsight()
- VBI.VBIChartBuilder
- VBI.VBIInsightBuilder

Builder access in the application:
- application.getState().chart.editor.builders[id]?.builder is a VBIChartBuilder when the chart editor session is connected.
- application.getState().insight.editor.builders[id]?.builder is a VBIInsightBuilder when connected.

Prefer public Builder methods:
- chartBuilder.build()
- chartBuilder.getUUID()
- chartBuilder.chartType.set(type)
- chartBuilder.dimensions.add(field)
- chartBuilder.measures.add(field)
- chartBuilder.where and chartBuilder.having builders for filters
- insightBuilder.setContent(text)
- insightBuilder.build()

Do not mutate raw DSL maps when a public Builder method exists.

Example:

const projection = application.getState().chart.editor.builders["chart-1"];
assert(projection?.builder, "Chart builder is not connected");
projection.builder.chartType.set("bar");
return json({ chart: projection.builder.build(), version: projection.version });
`.trim()
