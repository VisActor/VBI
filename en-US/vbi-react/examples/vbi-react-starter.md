# vbi-react Starter

**vbi-react Starter**`FieldPanel`、`ChartTypeSelector`、`ChartRenderer` 和 `BuilderLayout` 直接拼出一个可用的低门槛搭建器；需要深度自定义时，再下钻到 hooks。Chart typetablepivotTablecolumncolumnParallelcolumnPercentbarbarParallelbarPercentlineareaareaPercentdualAxisscatterpiedonutroseroseParallelradarfunnelheatmapboxPlothistogramtreeMapsunburstcirclePackingraceBarraceColumnraceLineraceScatterracePieraceDonutLoad demo dataUpload CSV**Starter Fields****Dimensions**No dimensions availableAdd- No dimensions selected

**Measures**No measures availableAdd- No measures selected

**No data loaded yet**点击上方的 Load demo data，或上传一个 CSV 文件，左侧字段面板就会立即可用。Load demo data**Starter Summary**这个 demo 只使用 `@visactor/vbi-react/components` 来搭建核心编辑区， 用来验证 hooks + slim components 这条路线。Data source: 未加载数据Rows: 0Available dimensions: 0Available measures: 0先加载 demo 数据或上传 CSV，再用 starter components 组装图表。Demo schema 固定使用手工声明的字段类型，不再依赖首行自动猜测。Current DSL Snapshot
````
{
  "uuid": "e649656c-e82e-4d93-913a-0c8f35cedee3",
  "connectorId": "vbiReactStarterLocalDataConnector",
  "chartType": "table",
  "theme": "light",
  "locale": "zh-CN",
  "version": 0,
  "whereFilter": {
    "id": "root",
    "op": "and",
    "conditions": []
  },
  "havingFilter": {
    "id": "root",
    "op": "and",
    "conditions": []
  },
  "measures": [],
  "dimensions": []
}
````
