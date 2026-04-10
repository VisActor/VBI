# BarParallel

:::info{title=Recommended}
\- Recommended field configuration: `1` measure(s), `2` dimension(s)

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info{title=Encoding Mapping}
Parallel bar chart supports the following visual channels:

`yAxis`  : y-axis channel, supports`multiple dimensions`, mapped to the y-axis by dimension value

`xAxis`  : x-axis channel, supports`multiple measures`, mapped to the x-axis by measure value

`detail` : Detail channel; supports `multiple dimensions`; used to display finer-grained data within the same color series.

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Description}
Parallel bar chart, suitable for horizontal parallel comparison scenarios of multiple measures, where multiple bars are sorted in parallel to display different measure values.

Applicable scenarios:

* Multi-measure comparison when category names are long.

* Horizontal comparison displaying ranking and values simultaneously.

* Parallel analysis of multi-dimensional data.

:::

:::warning{title=Warning}
Data requirements:

\- At least 1 measure field

* The first dimension is placed on the Y-axis, while other dimensions are merged with measure names (when multiple measures exist) to be displayed as legend items.

\- All measures are automatically merged into one measure

Features enabled by default:

* Legend, axes, data labels, and tooltips are enabled by default.

:::

## chartType

**Type:** `"barParallel"`

:::note{title=Description}
Parallel bar chart, suitable for horizontal parallel comparison of multiple measures.

:::

**Example**
'barParallel'

## dataset

**Type:** `Record[]`

:::note{title=Description}
Data source; an aggregated dataset conforming to the TidyData specification, used to define the chart's data source and structure. Users don't need to process the dataset beforehand as VSeed features powerful data reshaping capabilities to automatically handle it; parallel bar chart data will eventually be converted to 2 dimensions and 1 measure.

:::

**Example**
\[{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]

## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title=Description}
Dimensions; the first dimension is mapped to the Y-axis, while other dimensions are merged with measure names (when multiple measures exist) to be displayed as legend items.

:::

**Example**
\[{id: 'category', alias: 'Category'}]

### id

**Type:** `string`

:::note{title=Description}
Field ID corresponding to the dimension

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Dimension alias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=Description}
Dimension date format configuration

:::

#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=Description}
Time granularity, determines the date display precision

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Description}
Channel to which the dimension is mapped

* yAxis: Supports mapping multiple dimensions to the Y-axis.

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::

## measures

**Type:** `BarMeasure[] | undefined`

:::note{title=Description}
Measures; parallel bar chart measures are automatically merged into one measure and mapped to the X-axis. When multiple measures exist, measure names are merged with other dimensions to be displayed as legend items.

:::

**Example**
\[{id: 'value1', alias: 'Measures1'}, {id: 'value2', alias: 'Measures2'}]

### id

**Type:** `string`

:::note{title=Description}
Measure ID, must be unique

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Measure alias, duplicates allowed; when not set, alias defaults to id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Automatic number formatting, enabled by default, highest priority

When autoFormat=true, it overrides all numFormat configurations

When enabled, chart data labels and tooltips will automatically select the appropriate formatting based on measure values and locale

Formatting rules: decimal numbers with compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation

For example:

* locale=zh-CN: 749740.264 → 74.97万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Custom number formatting for measures; automatically applied to labels and tooltips

Note: To use custom formatting, you must explicitly set autoFormat=false; otherwise autoFormat will override this config

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**Example**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**
\- 1234.5678 converts to 1000, significantDigits:1
\- 1234.5678 converts to 1200, significantDigits:2
\- 1234.5678 converts to 1230, significantDigits:3
\- 1234.5678 converts to 1234, significantDigits:4
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### format

**Type:** `NumFormat | undefined`

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**Example**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**
\- 1234.5678 converts to 1000, significantDigits:1
\- 1234.5678 converts to 1200, significantDigits:2
\- 1234.5678 converts to 1230, significantDigits:3
\- 1234.5678 converts to 1234, significantDigits:4
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=Description}
Channel to which the measure is mapped

\- xAxis: measure mapped to the x-axis

\- detail: measure mapped to the detail channel

\- color: measure mapped to the color channel

\- label: measure mapped to the label channel

\- tooltip: measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
In flat measure configuration form, builds a tree-shaped measure group. parentId points to the id of the parent measure group, used for building the measure tree

:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously

:::

## page

**Type:** `Page | undefined`

:::note{title=Description}
Pagination

Pagination configuration for the chart's pagination feature

:::

### field

**Type:** `string`

:::note{title=Description}
Pagination field; specifies the field name for pagination, must be a dimension

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Current pagination value; specifies the value used to determine the current page

:::

**Example**
'2023-01-01'

## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color; defaults to a transparent background. Background color can be a color string (e.g., 'red', 'blue'), or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

:::

## color

**Type:** `Color | undefined`

:::note{title=Description}
Color configuration for defining the chart's color scheme, including color lists, color mappings, and color gradients.

:::

### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Discrete color scheme used to define the colors of different elements in the chart

:::

**Example**
\['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']

### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Continuous color scheme
:::

### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Manual color mapping
:::

### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Color for positive values
:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Color for negative values
:::

## label

**Type:** `Label | undefined`

:::note{title=Description}
Label configuration for defining chart data labels, including their position, format, and style.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether label functionality is enabled

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels wrap to the next line

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure values as percentages.

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display dimension labels

Display all dimension labels

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label values are automatically formatted; when autoFormat is true, numFormat configuration is ignored

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**Example**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**
\- 1234.5678 converts to 1000, significantDigits:1
\- 1234.5678 converts to 1200, significantDigits:2
\- 1234.5678 converts to 1230, significantDigits:3
\- 1234.5678 converts to 1234, significantDigits:4
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Label font weight
:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Label background color
:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Label stroke color
:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label font color
:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label automatically inverts its font color based on the graphical element's color.
:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Label position
:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable the label overlap prevention feature.
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filtering; the default relationship between multiple selectors is OR.
:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field ID (the `id` of an item in `dimensions`).
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.

Same as `operator`.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executes AI-generated code)

Implements complex data filtering logic via AI-generated JavaScript code.

Core capabilities:

* Supports arbitrary complex data filtering conditions.

* Uses built-in utility functions for data manipulation.

* Executes safely in the browser environment (Web Worker sandbox).

Environment requirements: Only supported in browser environments; Node.js environments will use the fallback.

Note: `selector` and `dynamicFilter` cannot be used simultaneously; `dynamicFilter` has higher priority.

Chart dynamic filter configuration: filters chart marks (bars, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language).
:::

**Example**
"Highlight bars where sales are greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code:

* Only built-in utility functions (accessed via `_` or `R`) can be used.

* Input parameter: `data` (Array), each item contains a `__row_index` field representing the row number.

* Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

* `__row_index` represents the original data item's row number, and `field` represents the field to highlight.

* Prohibited: `eval`, `Function`, asynchronous operations, DOM API, network requests.

:::

**Example**
Highlight the `sales` field of data items where sales are greater than 1000:

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
  __row_index: item.__row_index,
  field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:

```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
  _.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
  _.map(maxItems, item => [
    { __row_index: item.__row_index, field: 'product' },
    { __row_index: item.__row_index, field: 'profit' }
  ])
);
```

Highlight data items meeting multiple conditions:

```javascript
const filtered = _.filter(data, item => {
  const profitRate = item.profit / item.sales;
  return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
  _.map(filtered, item => [
    { __row_index: item.__row_index, field: 'product' },
    { __row_index: item.__row_index, field: 'sales' }
  ])
);
```

#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported.
:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field ID (the `id` of an item in `dimensions`).
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.

Same as `operator`.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the `prepare()` phase, read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

## legend

**Type:** `Legend | undefined`

:::note{title=Description}
Legend configuration used to define the chart's legend, including position, format, style, etc.
:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable the legend feature.
:::

**Example**
enable: true

### border

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the legend border.
:::

:::warning{title=Warning}
Only effective for discrete legends.
:::

**Example**
border: true

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color
:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Pager icon color
:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Pager icon disabled color
:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Legend font size
:::

**Example**
labelFontSize: 10

### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color
:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Legend font weight
:::

**Example**
labelFontWeight: 400

### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Legend shape
:::

:::warning{title=Warning}
Only effective for discrete legends.
:::

**Example**
shapeType: 'circle'

### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Legend position
:::

**Example**
position: 'rightTop'

### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Maximum number of columns or rows for the legend when many items exist.

If the position is horizontal (`bottom`, `top`, etc.), `maxSize` controls the number of columns.

If the position is vertical (`left`, `right`, etc.), `maxSize` controls the number of rows.
:::

:::warning{title=Warning}
Only effective for discrete legends.
:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip configuration used to define the chart's tooltips, including position, format, style, etc.
:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether to enable the tooltips feature.
:::

## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush

Brush configuration used to enable/disable and configure the brush selection capability.

Chart brush configuration.
:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable brush selection.
:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Brush type; defines the shape and direction of the selection area.

* `rect`: Rectangular brush, allows selection along both X and Y axes simultaneously.

* `polygon`: Polygonal brush, allows selection of an arbitrary polygon by clicking multiple points.

* `x`: X-axis brush, restricts selection to the horizontal direction.

* `y`: Y-axis brush, restricts selection to the vertical direction.
  :::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Brush mode; defines whether single or multiple areas can be selected.

* `single`: Single selection mode, only one brush area can exist at a time.

* `multiple`: Multiple selection mode, multiple brush areas can exist simultaneously.
  :::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the selection area upon a click after the brush ends.
:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for data items within the brush selection.

Defines the style of data points captured by the brush.
:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity for selected data items (range: 0-1).
:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Stroke color
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Stroke width
:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for data items outside the brush selection.

Defines the style of data points not captured by the brush.
:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity for unselected data items (range: 0-1).
:::

#### stroke

**Type:** `string | undefined`

:::note{title=Description}
Stroke color
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Stroke width
:::

## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Description}
X-axis (numeric axis) configuration used to define the X-axis, including position, format, style, etc.
:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible.
:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Minimum value of the axis; has higher priority than `nice` and `zero`.
:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Maximum value of the axis; has higher priority than `nice` and `zero`. If `true`, the maximum value is automatically calculated based on the data range.
:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic scale (only effective for numeric axes).
:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
The base of the logarithm (only effective for numeric axes).
:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust the axis scale interval for better readability. This setting is ignored if `min` and `max` are configured. Only effective for numeric axes.
:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to reverse the axis (only effective for numeric axes).
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the axis to include zero. This setting is ignored if `min` and `max` are configured. Only effective for numeric axes.
:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format axis labels. Only effective for numeric axes. If `true`, the `numFormat` configuration is ignored.
:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Numerical formatting for the axis. Only effective for numeric axes. Has lower priority than `autoFormat`.
:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation
:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits

:::

**Example**
\- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**
\- 1234.5678 converts to 1000, significantDigits:1
\- 1234.5678 converts to 1200, significantDigits:2
\- 1234.5678 converts to 1230, significantDigits:3
\- 1234.5678 converts to 1234, significantDigits:4
\- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
X-axis tick label
:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label is visible.
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label color
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Label font weight
:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Label rotation angle
:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
X-axis line
:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis line is visible.
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Axis line color
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Axis line width
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
X-axis tick
:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick is visible.
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick points inward.
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Tick color
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick size
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
X-axis title
:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible.
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text, defaults to the field configuration.
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Title color
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Title font size
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Title font weight
:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
X-axis grid line
:::

#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
Grid line color
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
Grid line width
:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Grid line type
:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
Y-axis animation configuration.
:::

#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration
:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function.
:::

## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=Description}
Y-axis (categorical axis) configuration used to define the Y-axis, including position, format, style, etc.
:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible.
:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is reversed (only effective for numeric axes).
:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force show 0 on the axis; ignored if `min` and `max` are configured (only effective for numeric axes).
:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically hide overlapping labels. If two labels overlap (distance less than `autoHideGap`), the label causing the overlap is hidden (only effective for categorical axes).
:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}
Target gap for automatic label hiding. If the gap between two text labels is smaller than `autoHideGap`, the label causing the overlap is hidden. Only effective for categorical axes.

* When `autoHide` is enabled, this sets the `autoHideSeparation`.
* When `autoHide` is disabled, this sets the `minGap` for sampling.
  :::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically rotate labels when their width exceeds the axis length (only effective for categorical axes).
:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
Range of angles for automatic rotation when enabled (only effective for categorical axes).
:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically limit label length. When label width exceeds the axis length, the excess is truncated with an ellipsis. The full label is visible on hover (only effective for categorical axes).
:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
Maximum length for label limiting. When text length exceeds this value, it is truncated with an ellipsis and visible on hover (only effective for categorical axes).
:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Y-axis tick label
:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label is visible.
:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label color
:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size
:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Label font weight
:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Label rotation angle
:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Y-axis line
:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis line is visible.
:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Axis line color
:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Axis line width
:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
Y-axis tick
:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick is visible.
:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick points inward.
:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Tick color
:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick size
:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
Y-axis title
:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible.
:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text, defaults to the field configuration.
:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Title color
:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Title font size
:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Title font weight
:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
Y-axis grid line
:::

#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
Grid line color
:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
Grid line width
:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Grid line type
:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
Y-axis animation configuration.
:::

#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration
:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function.
:::

## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Description}
Crosshair rectangle configuration. Used to define the color and label style of the crosshair rectangle area in the chart.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the crosshair rectangle area.
:::

### rectColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the crosshair rectangle area.
:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label color for the crosshair rectangle area.
:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the label for the crosshair rectangle area.
:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color for the crosshair rectangle label.
:::

## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Description}
Corner radius for stacked bars in a bar chart.
:::

## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}
Maximum height of the rectangle (can be a pixel value or a percentage string).
:::

## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=Description}
The distance between rectangles within the same category (can be a pixel value or a percentage string).
:::

## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Sort configuration for categorical axes, supports sorting based on dimensions or measures, as well as custom sort orders.
:::

**Example**
sort: {
orderBy: 'profit',
order: 'asc',
}
sort: {
customOrder:\['2019', '2020', '2021']
}

* order: 'asc'
* orderBy: 'date'
  or
* customOrder: \['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sort order, can be 'asc' or 'desc'.
:::

**Example**
order: 'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
The field the sort depends on; can be a dimension ID or a measure ID.
:::

**Example**

* orderBy: 'date'
* orderBy: 'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order; this order will be directly applied to the categorical axis.
:::

## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Legend sort configuration, supports sorting based on dimensions or measures, as well as custom sort orders. Sort arrays follow a left-to-right or top-to-bottom order.
:::

**Example**
sortLegend: {
orderBy: 'profit',
order: 'asc',
}
sortLegend: {
customOrder: \['2019', '2020', '2021']
}

* order: 'asc'
* orderBy: 'date'
  or
* customOrder: \['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sort order, can be 'asc' or 'desc'.
:::

**Example**
order: 'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
The field the sort depends on; can be a dimension ID or a measure ID.
:::

**Example**

* orderBy: 'date'
* orderBy: 'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order; this order will be directly applied to the legend. Ascending: left to right or top to bottom; Descending: right to left or bottom to top.
:::

## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Themes are low-priority configuration options including general settings shared by all chart types and specific settings shared within a single chart type. Built-in 'light' and 'dark' themes are available; users can also define custom themes via the Builder or `registerTheme`.
:::

**Example**
'dark'

'light'

'customThemeName'

### length

**Type:** `number`

### brand

**Type:** `brand`

## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Description}
Bar mark style. Configuration used to define bar styles, including color, borders, corner radius, etc. Supports global styling or conditional style configurations.
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector. If configured, provides four types of matching capabilities: value selector, partial data selector, conditional dimension selector, and conditional measure selector. If not configured, styling applies globally.
:::

**Example**
Value selector
selector = "tool"
selector = \["tool", "book"]
selector = 100
selector = \[100, 200]

Partial data selector
selector = { profit: 100 }
selector = \[{ profit: 100 }, { profit: 200 }]

Conditional dimension selector
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

Conditional measure selector
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: \[100, 300]
}

#### field

**Type:** `string`

:::note{title=Description}
Dimension field ID (the id of an item in dimensions).

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.

Same as `operator`.
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executes AI-generated code)

Implements complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios complex for static selectors, such as Top N, statistical analysis, or complex combined conditions.

Core capabilities:

* Supports arbitrary complex data filtering conditions.

* Uses built-in utility functions for data manipulation.

* Executes safely in the browser environment (Web Worker sandbox).

Environment requirements: Only supported in browser environments; Node.js environments will use the fallback.

Note: `selector` and `dynamicFilter` cannot be used simultaneously; `dynamicFilter` has higher priority.

Chart dynamic filter configuration: filters chart marks (bars, points, etc.) via AI-generated JavaScript code.
:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language).
:::

**Example**
"Highlight bars where sales are greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code:

* Only built-in utility functions (accessed via `_` or `R`) can be used.

* Input parameter: `data` (Array), each item contains a `__row_index` field representing the row number.

* Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

* `__row_index` represents the original data item's row number, and `field` represents the field to highlight.

* Prohibited: `eval`, `Function`, asynchronous operations, DOM API, network requests.
  :::

**Example**
Highlight the `sales` field of data items where sales are greater than 1000:

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
  __row_index: item.__row_index,
  field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:

```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
  _.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
  _.map(maxItems, item => [
    { __row_index: item.__row_index, field: 'product' },
    { __row_index: item.__row_index, field: 'profit' }
  ])
);
```

Highlight data items meeting multiple conditions:

```javascript
const filtered = _.filter(data, item => {
  const profitRate = item.profit / item.sales;
  return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
  _.map(filtered, item => [
    { __row_index: item.__row_index, field: 'product' },
    { __row_index: item.__row_index, field: 'sales' }
  ])
);
```

#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported.
:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field ID (the `id` of an item in `dimensions`).
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.
  :::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.

Same as `operator`.
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the `prepare()` phase, read-only at runtime.
:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### barVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the bar mark (rectangle) is visible.
:::

### barColor

**Type:** `string | undefined`

:::note{title=Description}
Bar color
:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Bar color opacity.
:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Bar border color.
:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Bar border width.
:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Bar border style.
:::

**Example**
solid

dashed

dotted

### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Description}
Bar corner radius.

Bar stroke opacity.
:::

**Example**
4

\[0, 0, 10, 10]

### barRadius

**Type:** `number | number[] | undefined`

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Annotation point configuration. Used to define chart annotation points based on selected data, including their position, format, style, etc.
:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Selector for the annotation point, used to pick data items.
:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field ID (the `id` of an item in `dimensions`).
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.
  :::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.

Same as `operator`.
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.
:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executes AI-generated code)

Implements complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios complex for static selectors, such as Top N, statistical analysis, or complex combined conditions.

Core capabilities:

* Supports arbitrary complex data filtering conditions.

* Uses built-in utility functions for data manipulation.

* Executes safely in the browser environment (Web Worker sandbox).

Environment requirements: Only supported in browser environments; Node.js environments will use the fallback.

Note: `selector` and `dynamicFilter` cannot be used simultaneously; `dynamicFilter` has higher priority.

Chart dynamic filter configuration: filters chart marks (bars, points, etc.) via AI-generated JavaScript code.
:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language).
:::

**Example**
"Highlight bars where sales are greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code:

* Only built-in utility functions (accessed via `_` or `R`) can be used.

* Input parameter: `data` (Array), each item contains a `__row_index` field representing the row number.

* Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

* `__row_index` represents the original data item's row number, and `field` represents the field to highlight.

* Prohibited: `eval`, `Function`, asynchronous operations, DOM API, network requests.
  :::

**Example**
Highlight the `sales` field of data items where sales are greater than 1000:

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
  __row_index: item.__row_index,
  field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region:

```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
  _.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
  _.map(maxItems, item => [
    { __row_index: item.__row_index, field: 'product' },
    { __row_index: item.__row_index, field: 'profit' }
  ])
);
```

Highlight data items meeting multiple conditions:

```javascript
const filtered = _.filter(data, item => {
  const profitRate = item.profit / item.sales;
  return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
  _.map(filtered, item => [
    { __row_index: item.__row_index, field: 'product' },
    { __row_index: item.__row_index, field: 'sales' }
  ])
);
```

#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported.
:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field ID (the `id` of an item in `dimensions`).
:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.
  :::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.

Same as `operator`.
:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.
:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the `prepare()` phase, read-only at runtime.
:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text.
:::

**Example**
'Annotation text'

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color.
:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size.
:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight.
:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment. Generally set to 'right'; text is displayed on the left side of the annotation point to ensure it remains within the visible area of the chart.

Suggested to be set to 'right' to ensure text stays on the left of the point.

* right: Text is on the left of the point, with the right edge aligned to the point.
* left: Text is on the right of the point, with the left edge aligned to the point.
* center: Text is centered on the point.
  :::

**Example**
'right' (text is on the left side of the point)

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text baseline. Generally set to 'top'; text is displayed at the bottom of the annotation point to ensure it remains within the visible area of the chart.

Suggested to be set to 'top' to ensure the label is fully visible.

* top: Text is at the bottom of the point, with the top edge aligned to the point.
* middle: Text is centered vertically on the point.
* bottom: Text is at the top of the point, with the bottom edge aligned to the point.
  :::

**Example**
'top' (text is at the bottom of the annotation point)

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visibility.
:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color.
:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color.
:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width.
:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius.
:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding.
:::

**Example**
4

### offsetY

**Type:** `number | undefined`

:::note{title=Description}
The overall pixel offset of the annotation point in the Y direction. When the point is near the top of the chart (large values), a positive value is recommended; when near the bottom (small values), a negative value is recommended.

A negative value shifts the whole component (text, background, etc.) upwards. For example, -10 shifts it up by 10 pixels.

A positive value shifts the whole component downwards. For example, 10 shifts it down by 10 pixels.
:::

**Example**
offsetY: 5 (shifts the whole annotation point down by 5 pixels)

### offsetX

**Type:** `number | undefined`

:::note{title=Description}
The overall pixel offset of the annotation point in the X direction. When the point is on the left side (start of the categorical axis), a positive value is recommended; when on the right side (end of the categorical axis), a negative value is recommended.

A negative value shifts the whole component (text, background, etc.) to the left. For example, -10 shifts it left by 10 pixels.

A positive value shifts the whole component to the right. For example, 10 shifts it right by 10 pixels.
:::

**Example**
offsetX: 5, Offset the annotation point by 5 pixels to the right.

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Numeric annotation line (including average line, maximum line, minimum line, etc.), displayed vertically. Used to set the position, style, etc. of the annotation line. use this configuration to draw annotation lines corresponding to numerical values like the average.

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed X-value for the vertical annotation line. If the categorical axis is in the X direction, a dimension value can be input; if a numeric axis is in the X direction, a specific numeric value can be used.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executes AI-generated code)

Dynamically calculates annotation line values via AI-generated JavaScript code.

Suitable for scenarios requiring dynamic determination of annotation line positions based on data, such as averages, maximums, quantiles, business lines, etc.

Only supported in browser environments (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language).

:::

**Example**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code:

* Only built-in utility functions (accessed via `_` or `R`) can be used.

* Input parameter: `data` (Array).

* Must return a single numeric or string value: `number | string`.

* Suitable for dynamic values needed by annotation lines (horizontal/vertical).

* Prohibited: `eval`, `Function`, asynchronous operations, DOM API, network requests.

:::

**Example**
Get the maximum sales value as the annotation line value:

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate the average for the annotation line:

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get the quantile as the annotation line:

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate the goal value based on conditions:

```javascript
const currentYearTotal = _.sumBy(
  _.filter(data, item => item.year === 2024),
  'sales'
);
return currentYearTotal;
```

#### fallback

**Type:** `string | number | undefined`

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported.
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the `prepare()` phase, read-only at runtime.
:::

##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text.
:::

**Example**
'Annotation text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position; the location of the annotation line's label (relative to the line).
:::

**Example**
'outsideEnd'

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color.
:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size.
:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight.
:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment. Generally set to 'right'; text is displayed on the left side of the annotation line to ensure it remains within the visible area of the chart.

Suggested to be set to 'right' to ensure text stays on the left of the line.

* right: Text is on the left of the reference line, with the right edge aligned to the (vertical) annotation line.
* left: Text is on the right of the reference line, with the left edge aligned to the (vertical) annotation line.
* center: Text is centered on the reference line.
  :::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text baseline. Generally set to 'top'; text is displayed at the bottom of the annotation line to ensure it remains within the visible area of the chart.

Suggested to be set to 'top' to ensure the label is fully visible.

* top: Text is at the bottom of the reference line, with the top edge aligned to the endpoint of the (vertical) annotation line.
* middle: Text is vertically centered on the reference line.
* bottom: Text is at the top of the reference line, with the bottom edge aligned to the endpoint of the (vertical) annotation line.
  :::

**Example**
'top'

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Line visibility.
:::

**Example**
true

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line color.
:::

**Example**
'red'

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Line width.
:::

**Example**
2

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Line style.
:::

**Example**
'solid'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visibility.
:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color.
:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color.
:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width.
:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius.
:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding.
:::

**Example**
4

## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Description}
Dimension value annotation line, displayed horizontally. Used to set the position, style, etc. of the annotation line.
:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed Y-value for the horizontal annotation line. If the categorical axis is in the Y direction, a dimension value can be input; if a numeric axis is in the Y direction, a specific numeric value can be used.
:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executes AI-generated code)

Dynamically calculates annotation line values via AI-generated JavaScript code.

Suitable for scenarios requiring dynamic determination of annotation line positions based on data, such as averages, maximums, quantiles, business lines, etc.

Only supported in browser environments (requires Web Worker).
:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language).
:::

**Example**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code:

* Only built-in utility functions (accessed via `_` or `R`) can be used.

* Input parameter: `data` (Array).

* Must return a single numeric or string value: `number | string`.

* Suitable for dynamic values needed by annotation lines (horizontal/vertical).

* Prohibited: `eval`, `Function`, asynchronous operations, DOM API, network requests.
  :::

**Example**
Get the maximum sales value as the annotation line value:

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate the average for the annotation line:

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get the quantile as the annotation line:

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate the goal value based on conditions:

```javascript
const currentYearTotal = _.sumBy(
  _.filter(data, item => item.year === 2024),
  'sales'
);
return currentYearTotal;
```

#### fallback

**Type:** `string | number | undefined`

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported.
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the `prepare()` phase, read-only at runtime.
:::

##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text.
:::

**Example**
'Annotation text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position; the location of the annotation line's label (relative to the line).
:::

**Example**
'outsideEnd'

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color.
:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size.
:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight.
:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment. Generally set to 'right'; text is displayed on the left side of the annotation line to ensure it remains within the visible area of the chart.

Suggested to be set to 'right' to ensure text stays on the left of the line.

* right: Text is on the left of the reference line, with the right edge aligned to the endpoint of the (horizontal) annotation line.
* left: Text is on the right of the reference line, with the left edge aligned to the endpoint of the (horizontal) annotation line.
* center: Text is centered on the reference line.
  :::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text baseline. Generally set to 'top'; text is displayed at the bottom of the annotation line to ensure it remains within the visible area of the chart.

Suggested to be set to 'top' to ensure the label is fully visible.

* top: Text is at the bottom of the reference line, with the top edge aligned to the (horizontal) annotation line.
* middle: Text is vertically centered on the reference line.
* bottom: Text is at the top of the reference line, with the bottom edge aligned to the (horizontal) annotation line.
  :::

**Example**
'top'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visibility.
:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color.
:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color.
:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width.
:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius.
:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding.
:::

**Example**
4

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Line visibility.
:::

**Example**
true

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line color.
:::

**Example**
'red'

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Line width.
:::

**Example**
2

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Line style.
:::

**Example**
'solid'

### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Description}
Whether to enable the feature of splitting the main line into two segments.
:::

#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
The primary color for the portion greater than the annotation value.
:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
The primary color for the portion less than the annotation value.
:::

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Annotation area configuration. Used to define chart annotation areas based on selected data, including their position, style, etc.
:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Used to mark data based on selected items.
:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field ID (the `id` of an item in `dimensions`).
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.
  :::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is within the `value` array.

* not in: Select data items where the dimension field value is not within the `value` array.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text.

:::

**Example**
'Annotation text'

### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Description}
Text position.

:::

**Example**
'top'

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color.

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size.

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight.
:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment. Generally set to 'center'; text is displayed in the middle of the annotation area to ensure it remains within the visible area of the chart.

Suggested to be set to 'center' to ensure text is centered within the area.

* right: Text is on the left side of the annotation area, with the right edge aligned to the area.
* left: Text is on the right side of the annotation area, with the left edge aligned to the area.
* center: Text is centered in the annotation area.
  :::

**Example**
'center' (text is in the middle of the annotation area)

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text baseline. Generally set to 'top'; text is displayed at the bottom of the annotation area to ensure it remains within the visible area of the chart.

Suggested to be set to 'top' to ensure the label is fully visible.

* top: Text is at the bottom of the annotation area, with the top edge aligned to the area.
* middle: Text is vertically centered in the annotation area.
* bottom: Text is at the top of the annotation area, with the bottom edge aligned to the area.
  :::

**Example**
'top' (text is at the bottom of the annotation area)

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visibility.
:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color.
:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color.
:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width.
:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius.
:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding.
:::

**Example**
4

### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Annotation area color.
:::

**Example**
'red'

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Annotation area color opacity.
:::

**Example**
0.5

### areaBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Annotation area border color.
:::

**Example**
'red'

### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Annotation area border width.
:::

**Example**
2

### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Annotation area border radius.
:::

**Example**
4

### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Line style for the annotation area border.
:::

**Example**
\[2, 2]

### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Padding for the annotation area.
:::

**Example**
0

## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
Whether to enable the dimension linkage feature when the chart has pivot functionality or measure combinations enabled. When hovering over a dimension value, data with the same dimension value in other charts will be highlighted in coordination.

Configuration for dimension linkage in pivot charts.
:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether to enable dimension linkage for pivot charts.
:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show tooltips for all sub-charts corresponding to the dimension.
:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the crosshair label.
:::

## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Chart language configuration. Supports 'zh-CN' and 'en-US' languages. Additionally, the `intl.setLocale('zh-CN')` method can be called to set the language.
:::
