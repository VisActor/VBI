# Bar Chart

:::info{title=Recommended}
\- Recommended field configuration: `1` measure(s), `2` dimension(s)

\- Supports Data Reshape: at least `1` measure(s), `0` dimension(s)

:::

:::info{title=Encoding Mapping}
Bar Chart supports the following visual channels:

`yAxis`  : Y-axis channel, supports `multiple dimensions`, mapped to the y-axis by dimension value

`xAxis`  : X-axis channel, supports `multiple measures`, mapped to the x-axis by measure value

`detail` : Detail channel, supports `multiple dimensions`, used to display finer-grained data under the same color series

`color`  : Color channel, supports `multiple dimensions` or `one measure`; dimension colors are used to distinguish different data series, while measure colors are used for linear mapping of measure values to graphical colors

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : Label channel, supports `multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Description}
Bar Chart is suitable for horizontal data comparison scenarios. The Y-axis is the category axis (categorical data), the X-axis is the numeric axis (continuous data), and bars are arranged horizontally.

Applicable scenarios:

\- When data item names are long

\- When data ranking comparisons need to be displayed

\- Displaying positive and negative bidirectional data

:::

:::warning{title=Warning}
Data requirements:

\- At least 1 measure(s)

\- The first dimension will be placed on the Y-axis. Remaining dimensions will be merged with measure names (when multiple measures exist) and displayed as legend items.

\- All measures are automatically merged into a single measure.

Features enabled by default:

\- Legend, axes, data labels, and tooltips are enabled by default.

:::

## chartType

**Type:** `"bar"`

:::note{title=Description}
Bar Chart is suitable for horizontal data comparison scenarios. The Y-axis is the category axis (categorical data), the X-axis is the numeric axis (continuous data), and bars are arranged horizontally.

:::

**Example**
'bar'

## dataset

**Type:** `Record[]`

:::note{title=Description}
Data source: A TidyData-compliant and already aggregated dataset used to define the chart's data source and structure. User input datasets do not require any preprocessing; VSeed includes a powerful Data Reshape feature that automatically performs reshaping. Bar chart data will finally be converted to 2 dimensions and 1 measure.

:::

**Example**
\[{date:'2020-01-01', value:100}, {date:'2020-01-02', value:200}]

## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title=Description}
Dimensions: The first dimension is mapped to the Y-axis. Remaining dimensions will be merged with measure names (when multiple measures exist) and displayed as legend items.

:::

**Example**
\[{id: "date", alias: "Date"}, {id: "value", alias: "Value"}]

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
Time granularity, determines date display precision

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Description}
Channel to which the dimension is mapped

\- yAxis: Supports mapping multiple dimensions to the Y-axis

\- color: Supports mapping multiple dimensions to the color channel

\- detail: Supports mapping multiple dimensions to the detail channel

\- tooltip: Supports mapping multiple dimensions to the tooltip channel

\- label: Supports mapping multiple dimensions to the label channel

\- row: Supports mapping multiple dimensions to the row channel

\- column: Supports mapping multiple dimensions to the column channel

:::

## measures

**Type:** `BarMeasure[] | undefined`

:::note{title=Description}
Measures

Measures: Bar chart measures are automatically merged into a single measure and mapped to the X-axis. When multiple measures exist, measure names are merged with remaining dimensions and displayed as legend items.

:::

**Example**
\[{id: "value", alias: "Value"}]

### id

**Type:** `string`

:::note{title=Description}
Measure ID, must be unique

:::

### alias

**Type:** `string | undefined`

:::note{title=Description}
Measure alias, duplicates allowed; when not set, alias defaults to ID

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Automatic numeric formatting, enabled by default, highest priority

When autoFormat=true, it overrides all numFormat configurations.

Once enabled, chart data labels and tooltips will automatically select appropriate formatting based on measure values and locale.

Formatting rules: Decimal numbers, compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation.

For example:

\- locale=zh-CN: 749740.264 → 74.45~74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Custom numeric formatting for measures; automatically applied to labels and tooltips.

Note: To use custom formatting, autoFormat must be explicitly set to false; otherwise, autoFormat will override this configuration.

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g., %, ‰

:::

**Example**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for numeric formatting

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### format

**Type:** `NumFormat | undefined`

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g., %, ‰

:::

**Example**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for numeric formatting

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=Description}
Channel to which the measure is mapped

\- xAxis: Measure mapped to the X-axis

\- detail: Measure mapped to the detail channel

\- color: Measure mapped to the color channel

\- label: Measure mapped to the label channel

\- tooltip: Measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
Builds a tree-shaped measure group in flat measure configuration form. parentId points to the ID of the parent measure group, used for building the measure tree.

:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously.

:::

## page

**Type:** `Page | undefined`

:::note{title=Description}
Pagination

Pagination configuration for the chart's pagination feature.

:::

### field

**Type:** `string`

:::note{title=Description}
Pagination field; specifies the field name for pagination, must be a dimension.

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Current pagination value; specifies the value used to determine the current page.

:::

**Example**
'2023-01-01'

## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color. Defaults to transparent background. Background color can be a color string (e.g., 'red', 'blue') or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

:::

## color

**Type:** `Color | undefined`

:::note{title=Description}
Color

Color configuration for defining the chart's color scheme, including color lists, color mappings, and color gradients.

:::

### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Discrete color scheme used to define the colors of different elements in the chart.

:::

**Example**
\['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']

### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Linear gradient color scheme used to define the colors of different elements in the chart.

:::

**Example**
\['#FFCDD2, #F8BBD0]

### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Color mapping used to map data values to specific colors.

:::

**Example**
{
'profit': 'red',
'sales': 'blue',
}

### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Positive/negative color configuration; defines the color for positive values in the chart.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Positive/negative color configuration; defines the color for negative values in the chart.

:::

## label

**Type:** `Label | undefined`

:::note{title=Description}
Label configuration for defining chart data labels, including their position, format, and style.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether label functionality is enabled.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels wrap to the next line.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure values.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Note: encoding's label has higher priority; this configuration does not affect encoding's label.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure values as percentages.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Note: encoding's label has higher priority; this configuration does not affect encoding's label.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display dimension labels.

Displays all dimension labels.

Note: encoding's label has higher priority; this configuration does not affect encoding's label.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label values are automatically formatted; when autoFormat is true, numFormat configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Label value format configuration; merged with the `format` in `measure`, where the `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0.

:::

**Example**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g., %, ‰

:::

**Example**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for numeric formatting.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

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
Whether the label font color automatically inverts based on the element's color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label overlap handling is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label selection; conditions between selectors default to OR.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; the ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic Filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code.

Core Capabilities:

\- Supports arbitrarily complex data filtering conditions.

\- Uses built-in utility functions for data manipulation.

\- Executes safely in the browser environment (Web Worker sandbox).

Environment Requirements: Supports browser environment only; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart Dynamic Filter configuration.

Filter chart markers (bars, points, etc.) via AI-generated JavaScript code.

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
AI-generated JavaScript filtering code.

\- Use only built-in utility functions (access via \_ or R).

\- Input parameter: data (array), each item contains `__row_index` field representing the row number.

\- Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` represents the row number of the original data item, and `field` represents the field to highlight.

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests.

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

Highlight data items based on multiple filtering conditions:

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
Fallback strategy when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field; the ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

Same as operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field).

Written during the prepare() phase; read-only at runtime.

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
Legend configuration, used to define the chart's legend, including its position, format, and style.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend feature is enabled.

:::

**Example**
enable: true

### border

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend border is enabled.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Example**
border: true

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Pagination icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Pagination icon disabled/grayed-out color.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Legend font size.

:::

**Example**
labelFontSize: 10

### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Legend font weight.

:::

**Example**
labelFontWeight: 400

### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Legend shape type.

:::

:::warning{title=Warning}
Applies only to discrete legends.

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
Maximum number of columns or rows when there are many legend items.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns shown.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows shown.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip configuration, used to define the chart's tooltips, including their position, format, and style.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether tooltips are enabled.

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush selection

Brush configuration, used to enable/disable the marquee selection capability.

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
Brush type

Defines the shape and direction of the selection box.

\- `rect`: Rectangular brush; can select in both X-axis and Y-axis directions.

\- `polygon`: Polygonal brush; allows drawing an arbitrary polygon by clicking multiple points.

\- `x`: X-axis brush; selects only in the X-axis direction, unrestricted on the Y-axis.

\- `y`: Y-axis brush; selects only in the Y-axis direction, unrestricted on the X-axis.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Brush mode; single or multiple selection.

Defines the selection mode.

\- `single`: Single selection mode; only one selection box can exist at a time.

\- `multiple`: Multiple selection mode; multiple selection boxes can exist simultaneously.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the selection box when brush ends.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for data selected by the brush.

Defines the style of data points within the selection.

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of the selected data points, ranging from 0 to 1.

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
Style for data NOT selected by the brush.

Defines the style of data points outside the selection.

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of the unselected data points, ranging from 0 to 1.

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
X-axis (numeric axis); X-axis configuration used to define the chart's X-axis, including its position, format, and style.

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
Maximum value of the axis; has higher priority than `nice` and `zero`. If set to `true`, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic axis; applies only to numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
Base of the logarithmic axis; applies only to numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust the axis scale interval to make labels more readable. This setting is ignored when `min` and `max` are configured. Applies only to numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the axis in reverse; applies only to numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the display of the 0 value on the axis. This setting is ignored when `min` and `max` are configured. Applies only to numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format axis scale labels; applies only to numeric axes. When `autoFormat` is `true`, `numFormat` configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Numeric axis number formatting; applies only to numeric axes and has lower priority than `autoFormat`.

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: decimal, percent (%), permille (‰), scientific notation.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0.

:::

**Example**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g., %, ‰.

:::

**Example**
\- 100000 converted to 10W, ratio:10000, symbol:"W"
\- 100000 converted to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for numeric formatting.

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
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for numeric formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for numeric formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
X-axis tick labels

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels are visible.

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
X-axis ticks

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inwards.

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
Title text; defaults to the field configuration.

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
X-axis grid lines

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
Grid line dash pattern

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
X-axis animation configuration. (Note: The original content mentioned Y-axis, but this is within xAxis block)

:::

#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=Description}
Y-axis (category axis); Y-axis configuration used to define the chart's Y-axis, including its position, format, and style.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the axis in reverse; applies only to numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the display of the 0 value on the axis. This setting is ignored when `min` and `max` are configured. Applies only to numeric axes.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}
Auto-hide axis labels: If two labels overlap (interval is less than `autoHideGap`), the labels causing overlap are automatically hidden. Applies only to category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}
Auto-hide interval for axis labels: If the gap between two text labels is less than `autoHideGap`, the labels causing overlap are automatically hidden. Applies only to category axes.

When auto-hide is enabled, it uses `autoHideSeparation`.
When auto-hide is disabled, it uses sampling, set on `minGap`.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
Auto-rotate axis labels: If label width exceeds axis length, labels are automatically rotated. Applies only to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
Auto-rotation angle range for axis labels: Specifies the range of rotation angles when auto-rotation is enabled. Applies only to category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Auto-limit axis label length: If label width exceeds axis length, the excess part is replaced with an ellipsis. The full label is visible on hover. Applies only to category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
Maximum length for auto-limiting axis labels: If label text length exceeds the maximum length, the excess part is replaced with an ellipsis. The full label is visible on hover. Applies only to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Y-axis tick labels

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels are visible.

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
Y-axis ticks

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inwards.

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
Title text; defaults to the field configuration.

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
Y-axis grid lines

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
Grid line dash pattern

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
Y-axis animation configuration

:::

#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function

:::

## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Description}
Horizontal tooltip configuration used to define the chart's horizontal tooltip, including color, label style, etc.

A configuration type for crosshair rectangular areas, used to display crosshair rectangles in the chart.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the crosshair rectangular area.

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangular area color.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangular area label color.

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the crosshair rectangular area label.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangular area label background color.

:::

## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Description}
Stacking corner radius for the bar chart.

:::

## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}
Maximum height of the rectangle; can be a pixel value or a percentage string.

:::

## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Y-axis sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders.

Category axis sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders.

:::

**Example**
sort: {
orderBy: 'profit',
order: 'asc',
}
sort: {
customOrder:\['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
or
\- customOrder:\['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sorting order; optional values are 'asc' or 'desc'.

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
The field the sorting depends on; can be either a dimension ID or a measure ID.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sorting order; this order will be directly applied to the category axis.

:::

## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders.

Legend sorting configuration; supports sorting based on dimensions or measures, as well as custom sorting orders; the sort array follows the order from left to right or top to bottom.

:::

**Example**
sortLegend: {
orderBy: 'profit',
order: 'asc',
}
sortLegend: {
customOrder:\['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
or
\- customOrder:\['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sorting order; optional values are 'asc' or 'desc'.

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
The field the sorting depends on; can be either a dimension ID or a measure ID.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sorting order; this order will be directly applied to the legend. Ascending follows left-to-right or top-to-bottom; descending follows right-to-left or bottom-to-top.

:::

## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme; the theme is a lower-priority configuration feature that includes general configurations shared across all chart types and specific configurations for individual chart categories. Built-in themes include `light` and `dark`, and users can also create custom themes via the Builder.

Theme

Includes built-in `light` and `dark` themes. Custom themes can be added via `registerTheme`.

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
Rectangular element style; bar chart style configuration used to define the chart's bars, including color, borders, corner radius, etc.

Supports global styles or conditional style configurations.

Data selector.

If `selector` is configured, it provides four types of data matching capabilities: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If `selector` is not configured, the style applies globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

If 'selector' is configured, it provides four types of data matching capabilities: numeric selector, partial data selector, conditional dimension selector, and conditional measure selector.

If 'selector' is not configured, the style applies globally.

:::

**Example**
Numeric selector
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
Dimension field; the ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic Filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, or complex conditions.

Core Capabilities:

\- Supports arbitrarily complex data filtering conditions.

\- Uses built-in utility functions for data manipulation.

\- Executes safely in the browser environment (Web Worker sandbox).

Environment Requirements: Supports browser environment only; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart Dynamic Filter configuration.

Filter chart markers (bars, points, etc.) via AI-generated JavaScript code.

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
AI-generated JavaScript filtering code.

\- Use only built-in utility functions (access via \_ or R).

\- Input parameter: data (array), each item contains `__row_index` field representing the row number.

\- Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` represents the row number of the original data item, and `field` represents the field to highlight.

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests.

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

Highlight data items based on multiple filtering conditions:

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
Fallback strategy when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field; the ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

Same as operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field).

Written during the prepare() phase; read-only at runtime.

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
Whether the bar element (rectangular element) is visible.

:::

### barColor

**Type:** `string | undefined`

:::note{title=Description}
Bar element (rectangular element) color.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Bar element (rectangular element) color opacity.

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Bar element (rectangular element) border color.

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Bar element (rectangular element) border width.

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Bar element (rectangular element) border style.

:::

**Example**
solid

dashed

dotted

### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Description}
Bar element (rectangular element) stroke opacity.

:::

### barRadius

**Type:** `number | number[] | undefined`

:::note{title=Description}
Bar element (rectangular element) corner radius.

:::

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Annotation point configuration. Define the annotation points of the chart based on selected data, including position, format, style, etc.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
The selector for annotation points, used to select data points.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; the ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic Filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, or complex conditions.

Core Capabilities:

\- Supports arbitrarily complex data filtering conditions.

\- Uses built-in utility functions for data manipulation.

\- Executes safely in the browser environment (Web Worker sandbox).

Environment Requirements: Supports browser environment only; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart Dynamic Filter configuration.

Filter chart markers (bars, points, etc.) via AI-generated JavaScript code.

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
AI-generated JavaScript filtering code.

\- Use only built-in utility functions (access via \_ or R).

\- Input parameter: data (array), each item contains `__row_index` field representing the row number.

\- Must return an array of row index and field combinations: `Array<{ __row_index: number, field: string }>`.

\- `__row_index` represents the row number of the original data item, and `field` represents the field to highlight.

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests.

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

Highlight data items based on multiple filtering conditions:

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
Fallback strategy when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field; the ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

Same as operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selected dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field).

Written during the prepare() phase; read-only at runtime.

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
'Annotation Text'

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
Text alignment. Generally set to 'right' to display text to the left of the annotation point, ensuring it remains within the visible area of the chart.

Recommended to set as 'right' to ensure text is to the left of the annotation point.

right: Text is to the left of the annotation point, with the right edge aligned with the point.

left: Text is to the right of the annotation point, with the left edge aligned with the point.

center: Text is centered on the annotation point.

:::

**Example**
'right' (Text to the left of the annotation point)

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. Generally set to 'top' to display text below the annotation point, ensuring it remains within the visible area of the chart.

Recommended to set as 'top' to ensure text is fully visible within the chart.

top: Text is below the annotation point, with the top edge aligned with the point.

middle: Text is centered vertically on the annotation point.

bottom: Text is above the annotation point, with the bottom edge aligned with the point.

:::

**Example**
'top' (Text below the annotation point)

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the background is visible.

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
Background border corner radius.

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
Vertical offset of the annotation point in pixels. When the point is above the chart (high value), a positive value is recommended; when it's below (low value), a negative value is recommended.

A negative value shifts the entire component upwards (e.g., -10 shifts text and background up by 10 pixels).

A positive value shifts the entire component downwards (e.g., 10 shifts text and background down by 10 pixels).

:::

**Example**
offsetY: 5 (entire component shifts down by 5 pixels)

### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Horizontal offset of the annotation point in pixels. When the point is on the left (category axis start), a positive value is recommended; when it's on the right (category axis end), a negative value is recommended.

A negative value shifts the entire component to the left (e.g., -10).

A positive value shifts the entire component to the right (e.g., 10).

:::

**Example**
offsetX: 5 (entire component shifts right by 5 pixels)

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Numeric annotation line (including mean line, max line, min line, etc.), displayed vertically. Position and style can be configured. Use this for lines corresponding to specific values.

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed x-value for the vertical line. If the category axis is on the X-axis, enter a category; if the numeric axis is on the X-axis, enter a specific value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic Filter (AI-generated code execution)

Dynamically calculate the annotation line value via AI-generated JavaScript code.

Suitable for scenarios where the position of the line is determined by data, such as average, maximum, quantiles, or business goals.

Supports browser environment only (requires Web Worker).

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

"Calculate the average sales for the annotation line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

\- Use only built-in utility functions (access via \_ or R).

\- Input parameter: data (array).

\- Must return a single numeric or string value: `number | string`.

\- Applicable scenarios: calculating the dynamic value needed for annotation lines (horizontal or vertical).

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests.

:::

**Example**
Get the maximum sales value as the annotation line value:

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate the average value for the annotation line:

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get a quantile as the annotation line:

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate a goal value based on conditions:

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
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field).

Written during the prepare() phase; read-only at runtime.

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
'Annotation Text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position; the location of the annotation line's label (relative position of the label to the line).

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
Text alignment. Generally no need to set.

Recommended to set 'right' to ensure the text is to the left of the annotation line.

right: Text is to the left of the reference line, with the right edge aligned with the (vertical) annotation line.

left: Text is to the right of the reference line, with the left edge aligned with the (vertical) annotation line.

center: Text is centered on the (vertical) annotation line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. Generally no need to set.

Recommended to set 'top' to ensure the text is fully visible within the chart.

top: Text is below the reference line, with the top edge aligned with the end of the (vertical) annotation line.

middle: Text is centered on the end of the (vertical) annotation line.

bottom: Text is above the reference line, with the bottom edge aligned with the end of the (vertical) annotation line.

:::

**Example**
'top'

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the line is visible.

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
Whether the background is visible.

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
Background border corner radius.

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
Dimension value annotation line, displayed horizontally. Position and style can be configured.

:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed y-value for the horizontal line. If the category axis is on the Y-axis, enter a category; if the numeric axis is on the Y-axis, enter a specific value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic Filter (AI-generated code execution)

Dynamically calculate the annotation line value via AI-generated JavaScript code.

Suitable for scenarios where the position of the line is determined by data, such as average, maximum, quantiles, or business goals.

Supports browser environment only (requires Web Worker).

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

"Calculate the average sales for the annotation line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

\- Use only built-in utility functions (access via \_ or R).

\- Input parameter: data (array).

\- Must return a single numeric or string value: `number | string`.

\- Applicable scenarios: calculating the dynamic value needed for annotation lines (horizontal or vertical).

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests.

:::

**Example**
Get the maximum sales value as the annotation line value:

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate the average value for the annotation line:

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get a quantile as the annotation line:

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate a goal value based on conditions:

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
Fallback strategy when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field).

Written during the prepare() phase; read-only at runtime.

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
'Annotation Text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position.

The location of the annotation line's label (relative position of the label to the line).

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
Text alignment. Generally no need to set.

Recommended to set 'right' to ensure the text is to the left of the annotation line.

right: Text is to the left of the reference line, with the right edge aligned with the end of the (horizontal) annotation line.

left: Text is to the right of the reference line, with the left edge aligned with the end of the (horizontal) annotation line.

center: Text is centered on the end of the (horizontal) annotation line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. Generally no need to set.

Recommended to set 'top' to ensure the text is fully visible within the chart.

top: Text is below the reference line, with the top edge aligned with the (horizontal) annotation line.

middle: Text is centered on the (horizontal) annotation line.

bottom: Text is above the reference line, with the bottom edge aligned with the (horizontal) annotation line.

:::

**Example**
'top'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the background is visible.

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
Background border corner radius.

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
Whether the line is visible.

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
Whether to enable the function to split the main line into two segments.

:::

#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
The main color for the portion greater than the annotation value.

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
The main color for the portion less than the annotation value.

:::

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Annotation area configuration. Define the annotation area of the chart based on selected data, including position and style.

:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Select data to perform data marking.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; the ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in the value list.

\- not in: Select data items where the dimension field value is NOT in the value list.

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
'Annotation Text'

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
Text alignment. Generally set to 'right' to display text in the middle of the annotation area, ensuring it remains within the visible area of the chart.

Recommended to set as 'center' to ensure text is in the middle of the annotation area.

right: Text is to the left of the annotation area, with the right edge aligned with the area.

left: Text is to the right of the annotation area, with the left edge aligned with the area.

center: Text is centered in the annotation area.

:::

**Example**
'center' (Text in the middle of the annotation area)

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. Generally set to 'top' to display text at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

Recommended to set as 'top' to ensure text is fully visible within the chart.

top: Text is at the bottom of the annotation area, with the top edge aligned with the area.

middle: Text is centered vertically in the annotation area.

bottom: Text is at the top of the annotation area, with the bottom edge aligned with the area.

:::

**Example**
'top' (Text at the bottom of the annotation area)

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the background is visible.

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
Background border corner radius.

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
Annotation area border corner radius.

:::

**Example**
4

### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Line dash style of the annotation area border.

:::

**Example**
\[2, 2]

### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Margin of the annotation area.

:::

**Example**
0

## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
Whether to enable the dimension linkage function when the chart has perspective enabled or when measures are combined.

When hovering over certain dimension value(s), it highlights data with the same dimension values in other charts.

Perspective chart dimension linkage configuration.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether to enable perspective chart dimension linkage.

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show tooltips for all dimension-corresponding subcharts.

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show labels corresponding to the crosshair.

:::

## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Chart language configuration. Supports 'zh-CN' and 'en-US'. Additionally, the `intl.setLocale('zh-CN')` method can be used to set the language.

:::
