# 在 HTML 中使用 VBI

用一个 HTML 文件接入 VBI：无需框架或打包工具，使用 Builder 配置分析，再交给 VChart 或 VTable 渲染。VBI、VQuery、VSeed 通过浏览器 ESM 加载，VChart 和 VTable 使用发布包中的浏览器 bundle。本文先给出实践入口，再提供可直接运行的图表与表格教程；状态归属、查询复用和复杂页面组织见[最佳实践](./tips.md)。

**可直接打开或分享的独立 HTML，必须将分析数据内置在 HTML 中。** JSON 使用内联数组，CSV 使用内联文本，再通过 VQuery 的 `rawDataset` 接入。不要在运行时用 `fetch()` 读取旁边的 JSON / CSV 文件或依赖远程数据 URL：通过 `file://` 打开时，本地文件请求可能因 `origin: null` 被浏览器拦截；远程请求也可能受 CORS、网络或预览环境限制，导致 `blocked`、`Failed to fetch` 和图表空白。内置数据不代表完全离线，本文的 CDN 模块仍需联网加载。

## 数据源必须内置在 HTML 中

生成页面前先读取原始数据文件，将完整数据写入 HTML；不要只写数据文件路径，也不要让页面初始化时再下载数据。下方完整教程使用内联 JSON 数组。CSV 可采用以下方式，由 VQuery 解析，避免自行按逗号拆分而破坏带引号的字段：

```html
<!-- prettier-ignore -->
<script type="text/plain" id="csv-data">
region,channel,sales
华东,线上,100
华北,线下,80
</script>
<script type="module">
  // 放在 VQuery 导入后，沿用下方教程的数据集初始化流程。
  const csvText = document.querySelector('#csv-data').textContent.trim()
  const source = {
    type: 'csv',
    rawDataset: new TextEncoder().encode(csvText).buffer,
  }
</script>
```

数据集的 `schema` 应与内置数据字段一致。生成内联数据时还需处理 HTML 的脚本结束标记：如果原始文本包含 `</script>`，应改用安全序列化的 JSON 字符串（将 `<` 转义为 `\u003c`），运行时还原后再传给 VQuery，避免数据截断脚本元素。不要用 `mode: 'no-cors'` 或关闭浏览器安全策略绕过数据加载失败。

交付前用 `file://` 直接打开 HTML，检查筛选、聚合和渲染；在 Network 中确认没有 JSON / CSV 数据请求，在 Console 中确认没有数据加载错误。若业务明确需要实时远程数据，应通过 HTTP(S) 部署并正确配置数据服务的 CORS，同时显示加载失败状态；这类页面需要另行验证部署环境。

## 从三个实践示例选择起点

| 示例                                                            | 适合学习                                       | 阅读代码时关注                                              |
| --------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| [精致散点图](../../examples/charts/polished-chart.html)         | 单图编码、图例筛选与精细标注                   | `chartBuilder`、`decorate()`、`render()`                    |
| [轻量看板](../../examples/dashboard/lightweight-dashboard.html) | 顶部洞察、汇总指标、周期比较、自定义 HTML 卡片 | `summarizePeriod()`、`rowsOf()`、`layoutDashboard()`        |
| [业务大屏](../../examples/screen/large-screen.html)             | 多图组合、Dashboard / Insight 资源、局部筛选   | `drawSocial()`、`drawIncome()`、`filterChart()`、`layout()` |

用浏览器直接打开示例 HTML。浏览器需要联网加载 CDN 模块；复制大屏时同时保留 `assets/large-screen-live-preview.png`，另外两个示例可以单独复制 HTML。轻量看板当前仍通过网络加载 CSV，复制为独立交付页面时，必须按上文将 CSV 内置，并将数据初始化改为读取内联文本。

轻量看板直接加载 [Supermarket CSV](https://visactor.github.io/VBI/dataset/supermarket.csv)，以数据中的最新订单日期为截止日，切换最近 7、14、30 个日历日，并与前一个等长周期比较。VQuery 负责解析 CSV；接入层将订单日期规范为 ISO 日期和 UTC 日序号，VBI Builder 配置日期筛选、销售额与利润求和、订单 ID 去重计数。消费者订单占比使用 `customer_type = 消费者` 的去重订单数除以总订单数；区域订单数也各自去重，同一订单可能涉及多个地区，因此不能直接相加。图表将没有订单的日期显示为零，亏损日期用负向利润柱显示。

轻量看板的指标卡以固定外层区域追踪鼠标位置，常规倾斜幅度为 1.5°，弹性过渡的整体旋转始终不超过 2°；离开卡片、滚动或页面失焦时复位。触屏、减少动态效果模式和展开为大图的卡片关闭倾斜。迷你图表保留悬停提示；销售趋势主体卡片保持平面，所有卡片均无鼠标光效。

指标数值首次加载直接显示查询结果；筛选或悬停更新时用 600ms 缓和过渡，与图表更新节奏一致。连续更新从当前显示值接续，保留金额、整数、百分比和正负值格式；无数据时显示缺省文本，减少动态效果模式下立即更新。

轻量看板提供八种页面配色，包含默认薄荷绿及七种柔和参考色。点击标题旁的色点可同步切换背景、图标与图表颜色，保留左上到右下的柔白光束；配色切换不改变统计周期和指标口径，下降指标与亏损柱保留红色语义。

标题旁的三个布局图标按钮将顶部洞察与四个指标组织为趋势主导、指标先行或分段叙事，选中状态通过按钮和当前布局名称表达。三种布局统一使用最大 1140px 的外壳宽度，窄屏自适应；切换只改变内部排列。切换通过 Dashboard Builder 更新 `lg/xs` 坐标，保留图表、洞察资源、配色、统计周期和区域明细的展开状态；UI 按容器宽度读取布局、同步 DOM 顺序并调整图表尺寸。主趋势联动全部指标，迷你图只联动自身。布局原理见[布局最佳实践](../best-practices/layout.md)。

三种布局都在图表前展示“AI 洞察”：先说明销售额、去重订单数、利润共 3 项指标及当前起止日期、比较周期，再用列表逐项列出本期值与环比波动，每项一句，增长用绿色、下跌用红色，同时保留箭头与方向文字。独立示例使用真实汇总结果生成摘要演示，未调用模型服务；指标数量、周期说明和 Markdown 列表统一经 Insight Builder 保存。切换 7、14、30 天会更新周期与所有列表项；布局、配色切换和图表悬停保留区间列表及方向颜色。接入 AI 时，将同一范围的指标清单、本期值、前期值与周期提供给模型，再将返回的逐项结论写入该 Insight 资源。

轻量看板的数据核对基准（当前 CSV 最新订单日期为 2019-12-30，共 9,959 条明细；金额显示取整）：

| 周期  | 日期范围                | 销售额   | 去重订单数 | 利润    |
| ----- | ----------------------- | -------- | ---------- | ------- |
| 7 天  | 2019-12-24 — 2019-12-30 | ¥121,872 | 44         | ¥6,133  |
| 14 天 | 2019-12-17 — 2019-12-30 | ¥249,025 | 81         | ¥24,702 |
| 30 天 | 2019-12-01 — 2019-12-30 | ¥544,539 | 156        | ¥74,556 |

业务大屏仍使用固定演示数据，日期基准是 2026 年 9 月；天数切换只影响趋势，地区筛选影响全部数据组件。散点图数据是参考截图的近似转录，其前沿与参考模型保持全局口径。这些页面展示的 HTML 数据表和指标卡由页面绘制；下面补充 VTable 的普通表和透视表接入。

## 先理解五个包的分工

| 包                 | 在本文中的职责                                            |
| ------------------ | --------------------------------------------------------- |
| `@visactor/vbi`    | 通过 Builder 管理图表 DSL，生成查询和 VSeed DSL           |
| `@visactor/vquery` | 执行本地 JSON 数据的分组、聚合、筛选和排序                |
| `@visactor/vseed`  | 将含数据的 VSeed DSL 构建为 VChart spec 或 VTable options |
| `@visactor/vchart` | 渲染柱状图、折线图、散点图等图形                          |
| `@visactor/vtable` | 使用 `ListTable` 渲染普通表，使用 `PivotTable` 渲染透视表 |

核心链路为 `VBI Builder → Connector / VQuery → VSeed → VChart 或 VTable`。图表和表格共享前面的配置与查询机制，最后选择对应渲染器。仅显示图形时可以省略 VTable；仅显示表格时可以省略 VChart。

## 运行一个完整 HTML：柱状图、普通表与透视表

将下面代码保存为 `index.html`，直接用浏览器打开。它使用内置在 HTML 中的同一份销售明细，无需额外数据文件或数据请求，支持切换三种视图、按地区筛选，并显示当前 DSL 和查询结果。为便于核对，数据只有五行。

下面的独立教程与轻量看板固定使用 VBI / VQuery / VSeed `0.6.4`，VChart `2.1.7`；教程另加入 VTable `1.23.1`，无需本地构建。固定版本可避免 `latest` 缓存使依赖版本不一致。

VChart 的 `build/index.min.js` 和 VTable 的 `dist/vtable.min.js` 通过普通 `<script>` 加载，分别提供 `window.VChart.default` 和 `window.VTable`；VBI、VQuery、VSeed 使用 `+esm` 模块导出。VSeed 的动画模块会导入 VChart 的 `StreamLight`，因此还需在 ESM 模块加载前声明 import map，将该导入映射到已加载的 VChart bundle。这样页面与动画使用同一套渲染注册表，避免 jsDelivr `+esm` 拆分底层模块后出现 `applyAnimationState is not a function` 或文本图元未注册。升级版本时应同步检查映射中的 VChart URL。

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="data:," />
    <title>VBI：图表与 VTable</title>
    <style>
      body {
        margin: 24px;
        font-family: sans-serif;
      }
      fieldset {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
      #view {
        width: 100%;
        height: 360px;
        margin: 16px 0;
      }
      pre {
        max-height: 360px;
        overflow: auto;
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <h1>销售分析</h1>
    <fieldset id="controls" disabled>
      <legend>视图与筛选</legend>
      <label
        >视图
        <select id="type">
          <option value="column">柱状图</option>
          <option value="table">普通表</option>
          <option value="pivotTable">透视表</option>
        </select>
      </label>
      <label
        >地区
        <select id="region">
          <option value="">全部地区</option>
          <option>华东</option>
          <option>华北</option>
        </select>
      </label>
    </fieldset>
    <p id="status" role="status">正在加载模块…</p>
    <div id="view"></div>
    <details>
      <summary>查看 DSL 和查询结果</summary>
      <pre id="output"></pre>
    </details>
    <script src="https://cdn.jsdelivr.net/npm/@visactor/vchart@2.1.7/build/index.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@visactor/vtable@1.23.1/dist/vtable.min.js"></script>
    <script type="importmap">
      {
        "imports": {
          "https://cdn.jsdelivr.net/npm/@visactor/vchart@2.1.7/+esm": "data:text/javascript,export default globalThis.VChart.default;export const StreamLight=globalThis.VChart.StreamLight;"
        }
      }
    </script>
    <script type="module">
      const $ = (selector) => document.querySelector(selector)
      const container = $('#view')
      let instance
      let activeType
      try {
        // 动态导入放在 try 内，模块加载失败也能显示错误。
        if (!window.VTable) throw new Error('VTable 模块加载失败，请检查网络后刷新')
        const { ListTable, PivotTable } = window.VTable
        const VChart = window.VChart.default
        const [{ VBI }, { VQuery }, { Builder, registerAll }] = await Promise.all([
          import('https://cdn.jsdelivr.net/npm/@visactor/vbi@0.6.4/+esm'),
          import('https://cdn.jsdelivr.net/npm/@visactor/vquery@0.6.4/dist/browser/esm/browser.js/+esm'),
          import('https://cdn.jsdelivr.net/npm/@visactor/vseed@0.6.4/+esm'),
        ])
        registerAll()

        const connectorId = 'vbi-html-chart-and-table'
        const schema = [
          { name: 'region', type: 'string' },
          { name: 'channel', type: 'string' },
          { name: 'sales', type: 'number' },
        ]
        const source = {
          type: 'json',
          // 数据随 HTML 交付，不通过 fetch() 读取外部 JSON / CSV。
          rawDataset: [
            { region: '华东', channel: '线上', sales: 100 },
            { region: '华东', channel: '线上', sales: 200 },
            { region: '华东', channel: '线下', sales: 50 },
            { region: '华北', channel: '线上', sales: 150 },
            { region: '华北', channel: '线下', sales: 80 },
          ],
        }
        const query = new VQuery()
        if (await query.hasDataset(connectorId)) await query.updateDatasetSource(connectorId, schema, source)
        else await query.createDataset(connectorId, schema, source)
        VBI.connectors.register(connectorId, {
          discoverSchema: async () => schema,
          query: async ({ queryDSL }) => {
            const dataset = await query.connectDataset(connectorId)
            try {
              return await dataset.query(queryDSL)
            } finally {
              await dataset.disconnect()
            }
          },
        })

        function createBuilder(type, dimensions) {
          const builder = VBI.chart.create(VBI.chart.createEmpty(connectorId))
          builder.chartType.changeChartType(type)
          dimensions.forEach(([field, alias, encoding]) =>
            builder.dimensions.add(field, (node) => node.setAlias(alias).setEncoding(encoding)),
          )
          builder.measures.add('sales', (node) =>
            node.setAlias('销售额').setAggregate({ func: 'sum' }).setFormat({ type: 'number', fractionDigits: 0 }),
          )
          return builder
        }
        const builders = {
          column: createBuilder('column', [['region', '地区', 'xAxis']]),
          table: createBuilder('table', [
            ['region', '地区', 'column'],
            ['channel', '渠道', 'column'],
          ]),
          pivotTable: createBuilder('pivotTable', [
            ['region', '地区', 'row'],
            ['channel', '渠道', 'column'],
          ]),
        }

        async function render() {
          $('#controls').disabled = true
          $('#status').textContent = '正在查询…'
          try {
            const type = $('#type').value
            const builder = builders[type]
            // 本页只有地区筛选，因此可清空后重建；多条件页面按条件 ID 更新。
            builder.whereFilter.clear()
            if ($('#region').value) {
              builder.whereFilter.add('region', (node) => node.setOperator('eq').setValue($('#region').value))
            }
            const seed = await builder.buildVSeed()
            const options = Builder.from(seed).build()
            instance?.release()
            instance = undefined
            activeType = type
            if (type === 'table') {
              instance = new ListTable(container, options)
            } else if (type === 'pivotTable') {
              instance = new PivotTable(container, options)
            } else {
              instance = new VChart(options, { dom: container })
              instance.renderSync()
            }
            $('#output').textContent = JSON.stringify(
              {
                chart: builder.build(),
                query: builder.buildVQuery(),
                dataset: seed.dataset,
              },
              null,
              2,
            )
            $('#status').textContent = `已显示 ${seed.dataset.length} 条查询结果 · ${$('#region').value || '全部地区'}`
          } catch (error) {
            $('#status').textContent = `渲染失败：${error.message}`
            console.error(error)
          } finally {
            $('#controls').disabled = false
          }
        }
        $('#type').addEventListener('change', render)
        $('#region').addEventListener('change', render)
        const observer = new ResizeObserver(() => {
          if (!instance) return
          if (activeType === 'column') instance.resize(container.clientWidth, container.clientHeight)
          else instance.resize()
        })
        observer.observe(container)
        window.addEventListener('pagehide', (event) => {
          if (event.persisted) return
          observer.disconnect()
          instance?.release()
        })
        await render()
      } catch (error) {
        $('#status').textContent = `初始化失败：${error.message}`
        console.error(error)
      }
    </script>
  </body>
</html>
```

按以下结果核对，避免只检查“页面有图形”：

| 操作                       | 预期结果                                                           |
| -------------------------- | ------------------------------------------------------------------ |
| 柱状图、全部地区           | 两根柱子：华东 `350`，华北 `230`                                   |
| 普通表、全部地区           | 四行：华东线上 `300`、华东线下 `50`、华北线上 `150`、华北线下 `80` |
| 透视表、全部地区           | 地区作为行、渠道作为列；四个交叉单元格与普通表数值一致             |
| 选择华东，依次切换三个视图 | 柱状图 `350`；普通表两行；透视表只保留华东，线上 `300`、线下 `50`  |
| 刷新页面                   | 重新初始化演示数据，默认显示全部地区柱状图，无重复数据集创建错误   |

这里的普通表展示的是按“地区＋渠道”聚合后的四行，原始五行中的华东线上记录已由 VQuery 合并。`table` 指展示类型，并不代表自动跳过聚合；需要逐条明细时，在查询设计中保留唯一记录维度并核对生成的查询。

## 图形与表格渲染的关键差异

三种视图都使用 `await builder.buildVSeed()` 和 `Builder.from(seed).build()`，后者的结果随 `chartType` 变化：

| `chartType`  | 本例维度编码              | 度量默认编码 | 渲染器                                           |
| ------------ | ------------------------- | ------------ | ------------------------------------------------ |
| `column`     | 地区 `xAxis`              | `yAxis`      | `new VChart(spec, { dom })`，随后 `renderSync()` |
| `table`      | 地区、渠道均为 `column`   | `column`     | `new ListTable(container, options)`              |
| `pivotTable` | 地区 `row`、渠道 `column` | `detail`     | `new PivotTable(container, options)`             |

先设置图表类型再添加字段，Builder 会为度量分配该类型的默认编码。透视表建议显式指定行、列维度，避免添加顺序改变布局。不要把 VBI 的 `row` / `column` 编码手工改造成 VTable 原生的 `rows` / `columns` / `indicators`；这一步由 VSeed 构建。

VTable 的构造函数接收容器和 options，不调用 VChart 的 `renderSync()`；实例也支持 `release()`，容器变化后使用无参 `resize()`。保留明确的容器宽高，否则 Canvas 可能不可见。原生用法可查阅 [VTable 官方入门文档](https://visactor.io/vtable/guide/Getting_Started/Getting_Started)。

## 从教程扩展到自己的页面

### 配置、查询与渲染分别使用对应入口

- `builder.build()` 返回可序列化的 VBI 图表 DSL；`builder.buildVQuery()` 只生成查询，不请求数据。只构建这两种配置时，不必注册连接器或创建渲染器。
- `buildVSeed()` 会调用连接器的 `discoverSchema()` 和 `query()`，此前需要注册对应的 `connectorId`。返回数据以维度、度量 ID 为列名，保留这些 ID 供 VSeed 使用。
- 修改字段、聚合和过滤条件后重新查询。只修改视觉样式时，可以基于已有 seed 构建新 options；同一份查询结果也可以同时提供给图形、指标卡和 HTML 表格。
- VChart 与 VTable 的原生配置不同。先在 VSeed 层设置支持的主题、格式或样式，再按所选渲染器补充特有配置，具体分层见[最佳实践](./tips.md)。

### 保存与恢复

将以下片段放在完整示例的初始化 `try` 块内、`await render()` 之后，可保存当前视图并恢复为新的 Builder：

```javascript
const savedChart = builders[$('#type').value].build()
const json = JSON.stringify(savedChart)
// 数据连接器仍需在恢复环境注册。
const restoredBuilder = VBI.chart.create(JSON.parse(json))
const restoredSeed = await restoredBuilder.buildVSeed()
// 按 restoredSeed.chartType 选择上文的 VChart / ListTable / PivotTable 分支。
```

保存 Dashboard 时同时保存 `dashboard.build()` 和 `VBI.resources.snapshot()`；恢复时先注册资源，再创建 Dashboard Builder。精致散点图和业务大屏示例提供配置导出，完整流程与限制见[接入技巧中的配置恢复说明](./tips.md#8-明确筛选作用域并验证配置恢复)。

DSL 不包含连接器实现、原始数据、外部图片，以及页面后加的精细标注和渲染函数。本文完整 HTML 的刷新行为是重置演示数据和控件，尚未接入持久化读取；需要恢复筛选时，从保存的 DSL 初始化控件，避免首次渲染用默认值覆盖条件。

## 常见问题

| 现象                                              | 检查与处理                                                                                                                                                                                                              |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 数据请求出现 `blocked`、CORS 或 `Failed to fetch` | 检查是否用 `fetch()` 读取本地 JSON / CSV 或远程数据 URL。独立 HTML 必须内置数据并通过 `rawDataset` 接入；同目录文件也可能在 `file://` 下被拦截。实时远程数据需在 HTTP(S) 部署环境验证 CORS。                            |
| 模块加载失败或缺少命名导出                        | VBI、VQuery、VSeed 使用固定版本的 `+esm` 入口；VChart、VTable 使用浏览器 bundle，并保留本文的 import map。普通 `<script src>` 不会提供 ESM 导出；原始 npm ESM 文件还可能包含裸模块名。更换 CDN 或版本后重新验证依赖链。 |
| `VQuery` 引入 Node 依赖                           | 使用本文显式指定的 `dist/browser/esm/browser.js/+esm` 浏览器入口。                                                                                                                                                      |
| 刷新后提示数据集未加载                            | 更新已有数据集时传入完整的 `connectorId, schema, source`，并等待更新结束后再查询。                                                                                                                                      |
| VSeed 无法构建图表类型                            | 在 `Builder.from(seed).build()` 前调用 `registerAll()`；确认使用的是已注册且支持的 `chartType`。                                                                                                                        |
| 图表或表格为空白                                  | 先检查容器尺寸、查询错误和 `seed.dataset`，再确认 `chartType` 与渲染器对应；数据列 ID 应与维度、度量 ID 一致。                                                                                                          |
| 普通表行数少于原始数据                            | 检查 `buildVQuery()` 的分组、聚合、筛选与 limit；表格使用查询结果，不直接展示原始数组。                                                                                                                                 |
| 图表显示但透视表方向不对                          | 显式设置维度的 `row` / `column` 编码；修改后重新构建 VSeed 和表格 options。                                                                                                                                             |
| 页面一直显示加载中                                | 静态导入失败不能由模块主体内的 `try/catch` 捕获；本例用动态 `import()` 捕获加载错误，再区分初始化和查询渲染错误。                                                                                                       |

更多接口见 [VBI 实例](../api/vbi/vbi.md)、[Chart Builder](../api/vbi/chart-builder.md)、[Dashboard Builder](../api/vbi/dashboard-builder.md) 和 [DSL 类型](../api/vbi/types.md)。
