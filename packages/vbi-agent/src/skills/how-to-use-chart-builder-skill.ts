export const chartBuilderSkill = `
# How to Use Chart Builder Skill

## Chart Resource Tool

Use this skill when the user asks to create, inspect, rename, remove, or run JavaScript against a VBI chart resource.

This is the entry skill for <code>vbi_chart</code>. This single skill includes the chart resource tool contract plus the chart Builder APIs for core state, dimensions, measures, where filters, and having filters.

## vbi_chart input contract

Accepted fields are <code>action</code>, <code>id</code>, <code>name</code>, and <code>code</code>.

- <code>action: "create"</code>: creates a chart resource. Optional <code>name</code>.
- <code>action: "get"</code>: reads provider metadata for one chart. Requires <code>id</code>. The tool output strips any <code>dsl</code> field; use <code>run</code> to inspect DSL.
- <code>action: "rename"</code>: renames one chart. Requires <code>id</code> and <code>name</code>.
- <code>action: "remove"</code>: removes one chart. Requires <code>id</code>.
- <code>action: "run"</code>: opens a chart Builder and runs JavaScript. Requires <code>code</code>; optional <code>id</code>.

Example: create a chart resource before editing it.

~~~json
{
  "action": "create",
  "name": "Regional margin review"
}
~~~

Example: read metadata for a known chart id.

~~~json
{
  "action": "get",
  "id": "chart-id-from-vbi_resource_lookup"
}
~~~

Example: rename a chart.

~~~json
{
  "action": "rename",
  "id": "chart-id-from-vbi_resource_lookup",
  "name": "Regional sales and profit review"
}
~~~

Example: remove a chart.

~~~json
{
  "action": "remove",
  "id": "chart-id-from-vbi_resource_lookup"
}
~~~

## Run scripts

For <code>action: "run"</code>, the script receives these globals:

- <code>chart</code>: chart workspace slot.
- <code>builder</code>: alias of <code>chart</code>.
- <code>workspace</code>: caller-provided helpers such as <code>workspace.connectors</code>.
- <code>json(value)</code>: returns serializable evidence to the tool result.
- <code>assert(condition, message)</code>: throws with a clear message when an invariant is false.
- <code>console</code>: short diagnostics only.

Open the chart with <code>await chart.open()</code> when the tool input already has <code>id</code>. Use <code>await chart.open("chart-id")</code> only when the script must choose the id itself.

Example: regional sales and profit entry script. This exact pattern is used before the deeper Builder API sections below.

~~~js
const chartBuilder = await chart.open();
chartBuilder.chartType.changeChartType("dualAxis");
return json({
  chart: chartBuilder.build(),
  query: chartBuilder.buildVQuery()
});
~~~

Example tool input for that script.

~~~json
{
  "action": "run",
  "id": "chart-id-from-vbi_resource_lookup",
  "code": "const chartBuilder = await chart.open();\\nchartBuilder.chartType.changeChartType(\\"dualAxis\\");\\nreturn json({ chart: chartBuilder.build(), query: chartBuilder.buildVQuery() });"
}
~~~

Working rules:

- Return data with <code>return json(...)</code>; do not return prose from a script.
- Use <code>assert</code> before relying on required schema fields, ids, chart type capabilities, or resource references.
- Use Builder APIs before direct <code>b.dsl</code> mutation. Direct Yjs mutation is a last resort for tests or missing public API.
- Use <code>vbi_resource_lookup</code> for unknown ids; do not guess ids from display names.

---

## Chart Core Builder API

Use this section for the VBIChartBuilder top-level interface and chart-level sub-builders.

## Open and runtime

Inside <code>vbi_chart</code> with <code>action: "run"</code>, open the Builder first:

~~~js
const b = await chart.open();
return json({ uuid: b.getUUID(), empty: b.isEmpty() });
~~~

The opened object is <code>VBIChartBuilder</code>. Public properties:

- <code>b.doc</code>: the underlying Y.Doc.
- <code>b.dsl</code>: the underlying Y.Map for DSL. Prefer public Builder APIs.
- <code>b.adapters</code>: resolved <code>{ buildVQuery, buildVSeed }</code> adapters.
- <code>b.chartType</code>, <code>b.dimensions</code>, <code>b.measures</code>, <code>b.whereFilter</code>, <code>b.havingFilter</code>, <code>b.theme</code>, <code>b.locale</code>, <code>b.limit</code>, <code>b.undoManager</code>.

## Top-level methods

- <code>b.getUUID(): string</code>: returns the stable resource uuid. Example: <code>const id = b.getUUID();</code>
- <code>b.build(): VBIChartDSL</code>: exports current chart DSL. Example: <code>return json({ chart: b.build() });</code>
- <code>b.buildVQuery(): TQueryDSL</code>: lowers chart DSL to query DSL through <code>b.adapters.buildVQuery</code>. Example: <code>const query = b.buildVQuery();</code>
- <code>await b.buildVSeed(options?)</code>: lowers chart DSL and query result to seed DSL through <code>b.adapters.buildVSeed</code>. <code>options</code> is optional <code>{ signal?: AbortSignal }</code>. Example: <code>const seed = await b.buildVSeed();</code>
- <code>await b.getSchema()</code>: returns connector schema as <code>{ name: string, type: string }[]</code>. Requires the chart DSL connector id to be registered. Example: <code>const schema = await b.getSchema();</code>
- <code>b.isEmpty(): boolean</code>: true when both dimensions and measures are empty. Theme, locale, limit, filters, and chart type do not make a chart non-empty.
- <code>b.encodeStateAsUpdate(targetStateVector?)</code>: returns a Yjs update as <code>Uint8Array</code>. Optional <code>targetStateVector</code> narrows the update.
- <code>b.applyUpdate(update, origin?)</code>: applies a Yjs update. <code>origin</code> is optional transaction metadata.

Example: sync a chart state into another builder-like resource opened by id.

~~~js
const source = await chart.open("source-chart-id");
const target = await chart.open("target-chart-id");
target.applyUpdate(source.encodeStateAsUpdate(), "copy-from-source");
return json({ target: target.build() });
~~~

## Connector-sensitive APIs

<code>getSchema()</code> and the default <code>buildVSeed()</code> path require a registered connector for the chart DSL <code>connectorId</code>.

The agent workspace may expose <code>workspace.connectors</code>:

- <code>workspace.connectors.register(id, connectorOrFactory): string</code>
- <code>await workspace.connectors.registerChart(chartId, connectorOrFactory): string</code>, when provided.
- <code>await workspace.connectors.getChartConnectorId(chartId?)</code>, when provided.

A connector has:

- <code>discoverSchema(): Promise&lt;{ name: string; type: string }[]&gt;</code>
- <code>query({ queryDSL, schema, connectorId, signal }): Promise&lt;{ dataset: Record&lt;string, number | string | boolean | null | undefined&gt;[] }&gt;</code>

Example: register a tiny connector if the caller provides connector helpers.

~~~js
const connectorId = workspace.connectors?.register("demo", {
  discoverSchema: async () => [
    { name: "area", type: "string" },
    { name: "sales", type: "number" }
  ],
  query: async () => ({ dataset: [] })
});
return json({ connectorId });
~~~

## chartType

Chart type methods:

- <code>b.chartType.changeChartType(chartType)</code>: sets the chart type and reapplies recommended dimension and measure encodings to existing nodes.
- <code>b.chartType.getChartType()</code>: returns current chart type, default <code>"table"</code>.
- <code>b.chartType.getAvailableChartTypes()</code>: returns supported chart type strings.
- <code>b.chartType.getSupportedDimensionEncodings()</code>: returns valid dimension encodings for the current chart type.
- <code>b.chartType.getRecommendedDimensionEncodings(dimensionCount?)</code>: returns recommended dimension encodings. If omitted, uses current dimension count.
- <code>b.chartType.getSupportedMeasureEncodings()</code>: returns valid measure encodings for the current chart type.
- <code>b.chartType.getRecommendedMeasureEncodings(measureCount?)</code>: returns recommended measure encodings. If omitted, uses current measure count.
- <code>b.chartType.toJSON()</code>: current chart type string.
- <code>b.chartType.observe(callback)</code>: calls back when <code>chartType</code> changes and returns an unsubscribe function.

Available chart type values: <code>table</code>, <code>pivotTable</code>, <code>column</code>, <code>columnParallel</code>, <code>columnPercent</code>, <code>bar</code>, <code>barParallel</code>, <code>barPercent</code>, <code>line</code>, <code>area</code>, <code>areaPercent</code>, <code>dualAxis</code>, <code>scatter</code>, <code>pie</code>, <code>donut</code>, <code>rose</code>, <code>roseParallel</code>, <code>radar</code>, <code>funnel</code>, <code>heatmap</code>, <code>treeMap</code>, <code>sunburst</code>, <code>circlePacking</code>, <code>sankey</code>, <code>hierarchySankey</code>, <code>raceBar</code>, <code>raceColumn</code>, <code>raceLine</code>, <code>raceScatter</code>, <code>racePie</code>, <code>raceDonut</code>.

Example: choose dual-axis and verify its measure encodings.

~~~js
const b = await chart.open();
b.chartType.changeChartType("dualAxis");
assert(
  b.chartType.getSupportedMeasureEncodings().includes("secondaryYAxis"),
  "dualAxis must support secondaryYAxis"
);
return json({
  type: b.chartType.getChartType(),
  recommended: b.chartType.getRecommendedMeasureEncodings(2)
});
~~~

## theme, locale, limit

Theme methods:

- <code>b.theme.setTheme(theme)</code>: <code>theme</code> is <code>"light"</code> or <code>"dark"</code>. Same value is a no-op.
- <code>b.theme.getTheme()</code>: returns current theme, default <code>"light"</code>.
- <code>b.theme.toJSON()</code>: returns current theme.
- <code>b.theme.observe(callback)</code>: observes effective theme changes.

Locale methods:

- <code>b.locale.setLocale(locale)</code>: valid DSL locales are <code>"zh-CN"</code>, <code>"en-US"</code>, <code>"ja-JP"</code>, <code>"de-DE"</code>, <code>"id-ID"</code>, <code>"fr-FR"</code>, <code>"ko-KR"</code>, <code>"vi-VN"</code>. Same value is a no-op.
- <code>b.locale.getLocale()</code>: returns current locale, default <code>"zh-CN"</code>.
- <code>b.locale.toJSON()</code>: returns current locale.
- <code>b.locale.observe(callback)</code>: observes effective locale changes.

Limit methods:

- <code>b.limit.setLimit(limit)</code>: <code>limit</code> is a positive integer in valid DSL output. The builder stores the number you pass.
- <code>b.limit.getLimit()</code>: returns <code>number | undefined</code>.
- <code>b.limit.toJSON()</code>: returns <code>number | undefined</code>.
- <code>b.limit.observe(callback)</code>: observes limit changes.

Example: preferences and observer cleanup.

~~~js
const b = await chart.open();
let changes = 0;
const stopTheme = b.theme.observe(() => changes += 1);
b.theme.setTheme("dark");
b.locale.setLocale("en-US");
b.limit.setLimit(100);
stopTheme();
return json({
  theme: b.theme.toJSON(),
  locale: b.locale.toJSON(),
  limit: b.limit.toJSON(),
  themeChanges: changes
});
~~~

## undoManager

Undo methods are available on chart and insight builders:

- <code>b.undoManager.undo(): boolean</code>
- <code>b.undoManager.redo(): boolean</code>
- <code>b.undoManager.canUndo(): boolean</code>
- <code>b.undoManager.canRedo(): boolean</code>
- <code>b.undoManager.clear(clearUndoStack?, clearRedoStack?): void</code>; both optional booleans default to true inside Yjs.

Example:

~~~js
const b = await chart.open();
b.measures.add("sales", n => n.setAlias("Sales"));
const canUndo = b.undoManager.canUndo();
if (canUndo) b.undoManager.undo();
if (b.undoManager.canRedo()) b.undoManager.redo();
return json({ canUndo, chart: b.build() });
~~~

---

## Chart Dimensions and Measures API

Use this skill to configure chart dimensions and measures through <code>VBIChartBuilder.dimensions</code> and <code>VBIChartBuilder.measures</code>.

Fields are created from dataset field names. A dimension is categorical/grouping data, such as date, region, or product type. A measure is numeric/aggregated data, such as sales, profit, quantity, or discount.

## Shared value types

Sort:

- <code>{ order: "asc" }</code>
- <code>{ order: "desc" }</code>

Dimension aggregate values:

- <code>{ func: "toYear" }</code>, <code>{ func: "toQuarter" }</code>, <code>{ func: "toMonth" }</code>, <code>{ func: "toWeek" }</code>, <code>{ func: "toDay" }</code>, <code>{ func: "toHour" }</code>, <code>{ func: "toMinute" }</code>, <code>{ func: "toSecond" }</code>.

Measure and having aggregate values:

- <code>{ func: "count" }</code>, <code>{ func: "countDistinct" }</code>, <code>{ func: "sum" }</code>, <code>{ func: "avg" }</code>, <code>{ func: "min" }</code>, <code>{ func: "max" }</code>, <code>{ func: "variance" }</code>, <code>{ func: "variancePop" }</code>, <code>{ func: "stddev" }</code>, <code>{ func: "median" }</code>, <code>{ func: "quantile", quantile?: number }</code>.
- <code>quantile</code>, when provided, must be between 0 and 1.

Dimension encoding values are chart-type-dependent. Known values include <code>column</code>, <code>row</code>, <code>xAxis</code>, <code>yAxis</code>, <code>angle</code>, <code>color</code>, <code>detail</code>, <code>tooltip</code>, <code>label</code>, <code>hierarchy</code>, <code>source</code>, <code>target</code>, and <code>player</code>. Always prefer <code>b.chartType.getSupportedDimensionEncodings()</code> before setting one manually.

Measure encoding values are chart-type-dependent. Known values are <code>primaryYAxis</code>, <code>secondaryYAxis</code>, <code>xAxis</code>, <code>yAxis</code>, <code>angle</code>, <code>radius</code>, <code>size</code>, <code>color</code>, <code>detail</code>, <code>column</code>, <code>label</code>, <code>tooltip</code>, <code>value</code>, <code>q1</code>, <code>q3</code>, <code>min</code>, <code>max</code>, <code>median</code>, <code>outliers</code>, <code>x0</code>, and <code>x1</code>. Always prefer <code>b.chartType.getSupportedMeasureEncodings()</code>.

Measure format:

- <code>{ autoFormat: true }</code>: let VSeed choose the number format.
- Or <code>{ autoFormat?: false, type?, ratio?, symbol?, thousandSeparator?, prefix?, suffix?, fractionDigits?, significantDigits?, roundingPriority?, roundingMode? }</code>.
- <code>type</code>: <code>"number"</code>, <code>"percent"</code>, <code>"permille"</code>, or <code>"scientific"</code>.
- <code>roundingPriority</code>: <code>"morePrecision"</code> or <code>"lessPrecision"</code>.
- <code>roundingMode</code>: <code>"floor"</code>, <code>"ceil"</code>, <code>"expand"</code>, <code>"trunc"</code>, <code>"halfCeil"</code>, <code>"halfFloor"</code>, <code>"halfExpand"</code>, <code>"halfTrunc"</code>, or <code>"halfEven"</code>.

## dimensions collection

<code>b.dimensions</code> is <code>DimensionsBuilder</code>.

- <code>add(field, callback)</code>: creates a dimension with generated id, <code>field</code>, default alias equal to field, and recommended encoding for current chart type. Calls <code>callback(node)</code>. Returns <code>b.dimensions</code> for chaining.
- <code>remove(id)</code>: removes the dimension with that id. Missing ids are ignored. Returns <code>b.dimensions</code>.
- <code>update(id, callback)</code>: updates an existing dimension. Throws <code>Dimension with id "..." not found</code> when missing. Returns <code>b.dimensions</code>.
- <code>find(predicate)</code>: returns the first <code>DimensionNodeBuilder</code> matching <code>(node, index) => boolean</code>, or <code>undefined</code>.
- <code>findAll()</code>: returns all dimension node builders.
- <code>toJSON()</code>: returns <code>VBIDimension[]</code>.
- <code>observe(callback)</code>: observes deep dimension changes and returns unsubscribe.
- Static package guards exist: <code>DimensionsBuilder.isDimensionNode(node)</code> and <code>DimensionsBuilder.isDimensionGroup(node)</code>.

Dimension node methods:

- <code>getId()</code>, <code>getField()</code>, <code>getEncoding()</code>, <code>getSort()</code>.
- <code>setAlias(alias)</code>: string display name, returns node.
- <code>setEncoding(encoding)</code>: one supported dimension encoding, returns node.
- <code>setSort(sort)</code>: <code>{ order: "asc" | "desc" }</code>, returns node.
- <code>setAggregate(aggregate)</code>: date aggregate from the dimension aggregate list, returns node.
- <code>clearAggregate()</code>, <code>clearSort()</code>: delete optional fields, return node.
- <code>toJSON()</code>: returns one <code>VBIDimension</code>.

Example: add, find, update, remove, observe, and export dimensions.

~~~js
const b = await chart.open();
let changes = 0;
const stop = b.dimensions.observe(() => changes += 1);

b.chartType.changeChartType("pivotTable");
b.dimensions
  .add("order_date", node => {
    node
      .setAlias("Order Month")
      .setEncoding("column")
      .setAggregate({ func: "toMonth" })
      .setSort({ order: "asc" });
  })
  .add("delivery_method", node => {
    node.setAlias("Delivery Method").setEncoding("row");
  });

const orderDate = b.dimensions.find(node => node.getField() === "order_date");
assert(orderDate, "order_date dimension should exist");
b.dimensions.update(orderDate.getId(), node => {
  node.clearAggregate().setAggregate({ func: "toQuarter" });
});

const delivery = b.dimensions.find(node => node.getField() === "delivery_method");
if (delivery) b.dimensions.remove(delivery.getId());
stop();

return json({
  dimensions: b.dimensions.toJSON(),
  allCount: b.dimensions.findAll().length,
  changes
});
~~~

## measures collection

<code>b.measures</code> is <code>MeasuresBuilder</code>.

- <code>add(field, callback)</code>: creates a measure with generated id, <code>field</code>, alias equal to field, recommended encoding for current chart type, and default aggregate <code>{ func: "sum" }</code>. Calls <code>callback(node)</code>. Returns <code>b.measures</code> for chaining.
- <code>remove(id)</code>: removes the measure with that id. Missing ids are ignored. Returns <code>b.measures</code>.
- <code>update(id, callback)</code>: updates an existing measure. Throws <code>Measure with id "..." not found</code> when missing. Returns <code>b.measures</code>.
- <code>find(predicate)</code>: returns the first <code>MeasureNodeBuilder</code> matching <code>(node, index) => boolean</code>, or <code>undefined</code>.
- <code>findAll()</code>: returns all measure node builders.
- <code>toJSON()</code>: returns <code>VBIMeasure[]</code>.
- <code>observe(callback)</code>: observes deep measure changes and returns unsubscribe.
- Static package guards exist: <code>MeasuresBuilder.isMeasureNode(node)</code> and <code>MeasuresBuilder.isMeasureGroup(node)</code>.

Measure node methods:

- <code>getId()</code>, <code>getField()</code>, <code>getEncoding()</code>, <code>getSort()</code>, <code>getFormat()</code>.
- <code>setAlias(alias)</code>: string display name, returns node.
- <code>setEncoding(encoding)</code>: one supported measure encoding, returns node.
- <code>setSort(sort)</code>: <code>{ order: "asc" | "desc" }</code>, returns node.
- <code>setAggregate(aggregate)</code>: aggregate from the measure aggregate list, returns node.
- <code>setFormat(format)</code>: format object from the measure format list, returns node.
- <code>clearFormat()</code>, <code>clearSort()</code>: delete optional fields, return node.
- <code>toJSON()</code>: returns one <code>VBIMeasure</code>.

Example: build a dual-axis chart with formatted measures.

~~~js
const b = await chart.open();
b.chartType.changeChartType("dualAxis");

assert(
  b.chartType.getSupportedMeasureEncodings().includes("secondaryYAxis"),
  "dualAxis must support secondaryYAxis"
);

b.dimensions.add("area", node => {
  node.setAlias("Region").setEncoding("xAxis").setSort({ order: "desc" });
});

b.measures
  .add("sales", node => {
    node
      .setAlias("Sales")
      .setEncoding("primaryYAxis")
      .setAggregate({ func: "sum" })
      .setFormat({ type: "number", prefix: "$", fractionDigits: 0 });
  })
  .add("profit", node => {
    node
      .setAlias("Profit")
      .setEncoding("secondaryYAxis")
      .setAggregate({ func: "sum" })
      .setFormat({ autoFormat: true });
  });

const sales = b.measures.find(node => node.getField() === "sales");
assert(sales?.getFormat(), "sales should have a format");
b.measures.update(sales.getId(), node => {
  node.clearFormat().setSort({ order: "desc" });
});

return json({
  chart: b.build(),
  query: b.buildVQuery(),
  recommendedMeasureEncodings: b.chartType.getRecommendedMeasureEncodings(2)
});
~~~

---

## Chart Where and Having Filter API

Use this skill for <code>VBIChartBuilder.whereFilter</code> and <code>VBIChartBuilder.havingFilter</code>.

Where filters are row-level filters before aggregation. Having filters are post-aggregation filters over grouped results.

## Operators and values

Filter operators are strings. The VBI builder stores the operator you pass, while the VQuery lowering layer has special handling for:

- Array values with <code>op: "="</code> become <code>in</code>.
- Array values with <code>op: "!="</code> become <code>not in</code>.
- <code>"between"</code> and <code>"not between"</code> accept range values.
- <code>whereFilter.setDate(...)</code> stores <code>op: "date"</code> and lowers to start/end comparisons.

Common operators in tests and examples: <code>=</code>, <code>!=</code>, <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code>, <code>eq</code>, <code>gt</code>, <code>gte</code>, <code>lt</code>, <code>lte</code>, <code>in</code>, <code>not in</code>, <code>between</code>, <code>not between</code>.

Range values:

- Array form: <code>[min, max]</code>.
- Object form: <code>{ min?, max?, leftOp?, rightOp? }</code>.
- <code>leftOp: "&lt;"</code> means open lower bound; otherwise lower bound is inclusive.
- <code>rightOp: "&lt;"</code> means open upper bound; otherwise upper bound is inclusive.

## whereFilter collection

<code>b.whereFilter</code> is <code>WhereFilterBuilder</code>.

- <code>getConditions()</code>: returns the root Y.Array of conditions. Prefer public APIs unless tests need deterministic ids.
- <code>add(field, callback)</code>: adds a row-level filter node with generated id and field. Returns <code>b.whereFilter</code>.
- <code>addGroup(op, callback)</code>: adds a nested group. <code>op</code> is <code>"and"</code> or <code>"or"</code>. Returns <code>b.whereFilter</code>.
- <code>update(id, callback)</code>: updates a filter node by id. Throws if missing or if the id is a group.
- <code>updateGroup(id, callback)</code>: updates a group by id. Throws if missing or if the id is a filter node.
- <code>remove(idOrIndex)</code>: removes by string id anywhere in the tree, or by numeric index at the root only. Missing ids and out-of-range indexes are ignored. Returns <code>b.whereFilter</code>.
- <code>find(predicate)</code>: depth-first search through filters and groups. Predicate receives <code>(entry, index)</code>.
- <code>clear()</code>: removes every root condition and returns <code>b.whereFilter</code>.
- <code>toJSON()</code>: returns <code>VBIWhereGroup</code>, shaped as <code>{ id, op, conditions }</code>.
- <code>observe(callback)</code>: observes deep changes and returns unsubscribe.
- Static package guards exist: <code>WhereFilterBuilder.isGroup(yMap)</code> and <code>WhereFilterBuilder.isNode(yMap)</code>.

Where node methods:

- <code>getId()</code>, <code>getField()</code>, <code>getOperator()</code>.
- <code>setField(field)</code>: changes field and returns node.
- <code>setOperator(operator)</code>: sets string operator and returns node.
- <code>setValue(value)</code>: sets scalar, array, or range value and returns node.
- <code>setDate(predicate)</code>: sets <code>op: "date"</code> and date predicate value.
- <code>getDate()</code>: returns the date predicate only when operator is <code>"date"</code>; otherwise <code>undefined</code>.
- <code>toJSON()</code>: returns one <code>VBIWhereFilter</code>.

Where group methods:

- <code>getConditions()</code>, <code>getId()</code>, <code>getOperator()</code>.
- <code>setOperator("and" | "or")</code>: returns group.
- <code>add(field, callback)</code>: adds a filter to this group and returns group.
- <code>addGroup(op, callback)</code>: adds nested group and returns group.
- <code>remove(idOrIndex)</code>: removes only from this group's direct children and returns group.
- <code>clear()</code>: removes this group's children and returns group.
- <code>toJSON()</code>: returns <code>VBIWhereGroup</code>.

Example: nested where filters with find, update, updateGroup, and remove.

~~~js
const b = await chart.open();

b.whereFilter
  .add("area", node => node.setOperator("in").setValue(["East", "South"]))
  .add("sales", node => node.setOperator("between").setValue({ min: 1000, max: 10000 }))
  .addGroup("or", group => {
    group
      .add("province", node => node.setOperator("=").setValue("Shanghai"))
      .addGroup("and", nested => {
        nested
          .add("customer_type", node => node.setOperator("=").setValue("Enterprise"))
          .add("discount", node => node.setOperator("<").setValue(0.2));
      });
  });

const province = b.whereFilter.find(entry => entry.getField?.() === "province");
assert(province, "province filter should exist");
b.whereFilter.update(province.getId(), node => node.setValue("Zhejiang"));

const orGroup = b.whereFilter.find(entry => entry.getOperator?.() === "or");
assert(orGroup, "or group should exist");
b.whereFilter.updateGroup(orGroup.getId(), group => group.setOperator("and"));

b.whereFilter.remove("missing-filter").remove(999);
return json({ whereFilter: b.whereFilter.toJSON(), query: b.buildVQuery() });
~~~

## Date predicates

Use <code>node.setDate(predicate)</code>. Date values can be strings such as <code>"2024-01-01"</code> or <code>Date</code> objects.

Predicate forms:

- Range: <code>{ type: "range", start, end, bounds?: "[)" | "[]" }</code>. Default bounds are <code>"[)"</code>.
- Relative: <code>{ type: "relative", mode: "last" | "next", amount, unit, complete? }</code>. <code>amount</code> must be a positive integer. Current resolver accepts <code>complete</code> but resolves relative ranges from today's truncated date without using it.
- Current: <code>{ type: "current", unit, offset? }</code>. <code>offset</code> is an integer; default is 0.
- Period year: <code>{ type: "period", unit: "year", year }</code>.
- Period quarter: <code>{ type: "period", unit: "quarter", year, quarter }</code>, where quarter is 1 through 4.
- Period month: <code>{ type: "period", unit: "month", year, month }</code>, where month is 1 through 12.
- Period week: <code>{ type: "period", unit: "week", year, week }</code>, where week is 1 through 53.
- Period day: <code>{ type: "period", unit: "day", date }</code>.

Date units: <code>"year"</code>, <code>"quarter"</code>, <code>"month"</code>, <code>"week"</code>, <code>"day"</code>.

Example: several date predicates.

~~~js
const b = await chart.open();
b.whereFilter
  .add("order_date", node => node.setDate({
    type: "range",
    start: "2024-01-01",
    end: "2024-04-01",
    bounds: "[]"
  }))
  .add("delivery_date", node => node.setDate({
    type: "period",
    unit: "month",
    year: 2024,
    month: 2
  }))
  .add("order_date", node => node.setDate({
    type: "relative",
    mode: "last",
    amount: 30,
    unit: "day"
  }))
  .add("order_date", node => node.setDate({
    type: "current",
    unit: "week",
    offset: -1
  }));
return json({ where: b.whereFilter.toJSON(), query: b.buildVQuery() });
~~~

## havingFilter collection

<code>b.havingFilter</code> is <code>HavingFilterBuilder</code>. It mirrors where filtering but each filter node has an aggregate.

- <code>getConditions()</code>: returns the root Y.Array of conditions.
- <code>add(field, callback)</code>: adds a post-aggregation filter node with generated id, field, and default aggregate <code>{ func: "sum" }</code>. Returns <code>b.havingFilter</code>.
- <code>addGroup("and" | "or", callback)</code>: adds nested group and returns <code>b.havingFilter</code>.
- <code>update(id, callback)</code>: updates a having filter node. Throws if missing or if id is a group.
- <code>updateGroup(id, callback)</code>: updates a having group. Throws if missing or if id is a filter node.
- <code>remove(idOrIndex)</code>, <code>find(predicate)</code>, <code>clear()</code>, <code>toJSON()</code>, <code>observe(callback)</code>: same behavior as <code>whereFilter</code>.
- Static package guards exist: <code>HavingFilterBuilder.isGroup(yMap)</code> and <code>HavingFilterBuilder.isNode(yMap)</code>.

Having node methods:

- <code>getId()</code>, <code>getField()</code>, <code>getOperator()</code>, <code>getAggregate()</code>.
- <code>setValue(value)</code>: scalar, array, or range value; returns node.
- <code>setOperator(operator)</code>: string operator; returns node.
- <code>setAggregate(aggregate)</code>: aggregate from the measure aggregate list; returns node.
- <code>toJSON()</code>: returns one <code>VBIHavingFilter</code>.

Having group methods mirror where group methods: <code>getConditions()</code>, <code>getId()</code>, <code>getOperator()</code>, <code>setOperator</code>, <code>add</code>, <code>addGroup</code>, <code>remove</code>, <code>clear</code>, <code>toJSON</code>.

Example: having filters after aggregation.

~~~js
const b = await chart.open();
b.havingFilter
  .add("sales", node => {
    node.setAggregate({ func: "sum" }).setOperator("gt").setValue(100000);
  })
  .addGroup("or", group => {
    group
      .add("profit", node => node.setAggregate({ func: "sum" }).setOperator("gt").setValue(10000))
      .add("discount", node => node.setAggregate({ func: "avg" }).setOperator("lt").setValue(0.2));
  });

const salesHaving = b.havingFilter.find(entry => entry.getField?.() === "sales");
assert(salesHaving, "sales having filter should exist");
b.havingFilter.update(salesHaving.getId(), node => {
  node.setOperator("gte").setValue(500000);
});

return json({ havingFilter: b.havingFilter.toJSON(), query: b.buildVQuery() });
~~~
`.trim()
