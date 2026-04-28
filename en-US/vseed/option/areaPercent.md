# AreaPercent

:::info\{title=Recommended}
\- Recommended field configuration: `1` measure(s), `2` dimension(s)

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info\{title=Encoding Mapping}
The Percent Area Chart supports the following visual channels:

`xAxis`  : x-axis channel, supports`multiple dimensions`, mapped to the x-axis by dimension value

`yAxis`  : y-axis channel, supports`multiple measures`, mapped to the y-axis by measure value

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note\{title=Description}
Percent Area Chart, suitable for showing trends of multiple category proportions over time, with the Y-axis displaying proportional relationships in percentage format.

Applicable scenarios:

\- Compositional change analysis of time series

\- Comparative analysis of proportional trends among multiple categories

\- Simultaneous display of cumulative and single category proportions

:::

:::warning\{title=Warning}
Data requirements:

\- At least 1 measure field

\- The first dimension(s) will be placed on the Y-axis; the remaining dimensions will be merged with measure names (when multiple measures exist) and displayed as legend items.

\- All measures are automatically merged into one measure

Features enabled by default:

\- Legends, axes, percentage labels, tooltips, and proportion calculations are enabled by default.

:::

## chartType

**Type:** `"areaPercent"`

:::note\{title=Description}
Percent Area Chart

Percent Area Chart, showing the change in proportions of multiple categories over a specific dimension in percentage format.

:::

**Example**
'areaPercent'

## dataset

**Type:** `Record[]`

:::note\{title=Description}
Dataset

A TidyData-compliant, pre-aggregated dataset defining the chart's data source and structure. Users do not need to manually process input data — VSeed's powerful Data Reshape capability handles it automatically. Percent Area Chart data is ultimately reshaped to 2 dimensions and 1 measure.

:::

**Example**
\[\{month:'Jan', category:'A', value:30}, \{month:'Jan', category:'B', value:70}]

## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note\{title=Description}
Dimensions

The first dimension is mapped to the X-axis; the remaining dimensions are merged with measure names (when multiple measures exist) and displayed as legend items.

:::

**Example**
\[\{ id: 'month', alias: 'Month' }, \{ id: 'year', alias: 'Year' }]

### id

**Type:** `string`

:::note\{title=Description}
Field ID corresponding to the dimension

:::

### alias

**Type:** `string | undefined`

:::note\{title=Description}
Dimension alias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note\{title=Description}
Dimension date format configuration

:::

#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note\{title=Description}
Time granularity, determines the date display precision

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note\{title=Description}
Channel to which the dimension is mapped

\- xAxis: supports mapping multiple dimensions to the x-axis

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::

## measures

**Type:** `ColumnMeasure[] | undefined`

:::note\{title=Description}
Measures

Percent Area Chart measures are automatically merged into one measure, mapped to the Y-axis. Measure names are merged with the remaining dimensions and displayed as legend items.

:::

**Example**
\[\{id: 'value', alias: 'Numerical Ratio', format: 'percent'}]

### id

**Type:** `string`

:::note\{title=Description}
Measure ID, must be unique

:::

### alias

**Type:** `string | undefined`

:::note\{title=Description}
Measure alias, duplicates allowed; when not set, alias defaults to id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note\{title=Description}
Automatic number formatting, enabled by default, highest priority

When autoFormat=true, it overrides all numFormat configurations

When enabled, chart data labels and tooltips will automatically select the appropriate formatting based on measure values and locale

Formatting rules: decimal numbers with compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation

For example:

\- locale=zh-CN: 749740.264 → 74.45\~74.45万

\- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note\{title=Description}
Custom number formatting for measures; automatically applied to labels and tooltips

Note: To use custom formatting, you must explicitly set autoFormat=false; otherwise autoFormat will override this config

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note\{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note\{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note\{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note\{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note\{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note\{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note\{title=Description}
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

:::note\{title=Description}
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

:::note\{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note\{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### format

**Type:** `NumFormat | undefined`

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note\{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note\{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note\{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note\{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note\{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note\{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note\{title=Description}
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

:::note\{title=Description}
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

:::note\{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note\{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note\{title=Description}
Channel to which the measure is mapped

\- yAxis: measure mapped to the y-axis

\- detail: measure mapped to the detail channel

\- color: measure mapped to the color channel

\- label: measure mapped to the label channel

\- tooltip: measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note\{title=Description}
In flat measure configuration form, builds a tree-shaped measure group. parentId points to the id of the parent measure group, used for building the measure tree

:::

:::tip\{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously

:::

## page

**Type:** `Page | undefined`

:::note\{title=Description}
Pagination

Pagination configuration for the chart's pagination feature

:::

### field

**Type:** `string`

:::note\{title=Description}
Pagination field; specifies the field name for pagination, must be a dimension

:::

### currentValue

**Type:** `string`

:::note\{title=Description}
Current pagination value; specifies the value used to determine the current page

:::

**Example**
'2023-01-01'

## backgroundColor

**Type:** `BackgroundColor`

:::note\{title=Description}
Chart background color

Background color can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)')

:::

## color

**Type:** `Color | undefined`

:::note\{title=Description}
Color

Color configuration for defining the chart's color scheme, including color lists, color mappings, and color gradients.

:::

### colorScheme

**Type:** `string[] | undefined`

:::note\{title=Description}
Discrete color scheme used to define the colors of different elements in the chart

:::

**Example**
\['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']

### linearColorScheme

**Type:** `string[] | undefined`

:::note\{title=Description}
Linear gradient color scheme used to define the colors of different elements in the chart

:::

**Example**
\['#FFCDD2, #F8BBD0]

### colorMapping

**Type:** `Record<string, string> | undefined`

:::note\{title=Description}
Color mapping used to map data values to specific colors

:::

**Example**
\{
'profit': 'red',
'sales': 'blue',
}

### positiveColor

**Type:** `string | undefined`

:::note\{title=Description}
Positive/negative color configuration; defines the color for positive values in the chart

:::

### negativeColor

**Type:** `string | undefined`

:::note\{title=Description}
Positive/negative color configuration; defines the color for negative values in the chart

:::

## label

**Type:** `Label | undefined`

:::note\{title=Description}
Label

Label configuration for defining chart data labels, including their position, format, and style.

:::

### enable

**Type:** `false | true`

:::note\{title=Description}
Whether label functionality is enabled

:::

### wrap

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether labels wrap to the next line

:::

### showValue

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether labels display measure values

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether labels display measure values as a percentage.

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### showDimension

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether labels display dimension labels

Display all dimension labels

Note: encoding's label has higher priority; this config does not affect encoding's label

:::

### autoFormat

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether label values are automatically formatted; when autoFormat is true, numFormat configuration is ignored

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note\{title=Description}
Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note\{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note\{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note\{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note\{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note\{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note\{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note\{title=Description}
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

:::note\{title=Description}
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

:::note\{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note\{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Label font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note\{title=Description}
Label font weight

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Label background color

:::

### labelStroke

**Type:** `string | undefined`

:::note\{title=Description}
Label stroke color

:::

### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Label font color

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the label automatically inverts font color based on the graphic element color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note\{title=Description}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the label anti-overlap feature is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Label filtering; by default, the relationship between selectors is OR.

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code.

Core Capabilities:

\- Supports any complex data filtering conditions.

\- Use built-in utility functions for data manipulation.

\- Safe execution in the browser environment (Web Worker sandbox).

Environment requirements: Only supports browser environment; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration

Implement filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions (accessible via \_ or R) are allowed

\- Input parameters: data (array)，each item contains \_\_row\_index field representing line number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's line number, field represents the field to be highlighted

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field of data items with sales greater than 1000

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region

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

Highlight data items filtered by multiple conditions

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

:::note\{title=Description}
Fallback plan when code execution fails or environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

## legend

**Type:** `Legend | undefined`

:::note\{title=Description}
Legend

Legend configuration, used to define chart legends, including position, format, style, etc.

:::

### enable

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether legend functionality is enabled.

:::

**Example**
enable: true

### border

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether legend border is enabled.

:::

:::warning\{title=Warning}
Only effective for discrete legends.

:::

**Example**
border: true

### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note\{title=Description}
Pager icon color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note\{title=Description}
Pager icon disabled color

:::

### labelFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Legend font size

:::

**Example**
labelFontSize: 10

### labelFontColor

**Type:** `string | undefined`

:::note\{title=Description}
Legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note\{title=Description}
Legend font weight

:::

**Example**
labelFontWeight: 400

### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note\{title=Description}
Legend shape

:::

:::warning\{title=Warning}
Only effective for discrete legends.

:::

**Example**
shapeType: 'circle'

### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note\{title=Description}
Legend position

:::

**Example**
position: 'rightTop'

### maxSize

**Type:** `number | undefined`

:::note\{title=Description}
When there are many legend items, the maximum number of columns or rows.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of displayed columns.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of displayed rows.

:::

:::warning\{title=Warning}
Only effective for discrete legends.

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note\{title=Description}
Tooltip

Tooltip configuration, used to define chart tooltips, including position, format, style, etc.

:::

### enable

**Type:** `false | true`

:::note\{title=Description}
Whether tooltip functionality is enabled.

:::

## brush

**Type:** `Brush | undefined`

:::note\{title=Description}
Brush Selection

Brush configuration used to enable/disable brush selection capability.

Chart brush configuration

:::

### enable

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to enable brush selection.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note\{title=Description}
Brush type

Define the shape and direction of the brush selection box.

\- `rect`: Rectangular selection, can box-select in both X and Y directions simultaneously.

\- `polygon`: Polygonal selection, draw any polygon by clicking multiple points for selection.

\- `x`: Selection in X direction only, X-axis is constrained, Y-axis is unlimited.

\- `y`: Selection in Y direction only, Y-axis is constrained, X-axis is unlimited.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note\{title=Description}
Brush mode; single or multiple.

Define the mode of selection.

\- `single`: Single selection mode, only one brush box at a time.

\- `multiple`: Multiple selection mode, multiple brush boxes can exist simultaneously.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to clear the selection box when brush ends.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
Style for data inside the brush selection.

Define the style of data points that are selected.

:::

#### opacity

**Type:** `number | undefined`

:::note\{title=Description}
Opacity

Opacity of the selected data points, range 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note\{title=Description}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Stroke width

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
Style for data outside the brush selection.

Define the style of data points that are NOT selected.

:::

#### opacity

**Type:** `number | undefined`

:::note\{title=Description}
Opacity

Opacity of data points not selected, range 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note\{title=Description}
Stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Stroke width

:::

## xAxis

**Type:** `XBandAxis | undefined`

:::note\{title=Description}
X-axis

Category axis (X-axis) configuration, used to define the chart's X-axis, including position, format, style, etc.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is visible.

:::

### inverse

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is displayed in reverse; only effective for the numeric axis.

:::

### zero

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to force the display of 0 values on the axes. This configuration is disabled if 'min' and 'max' are set; only effective for the numeric axis.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note\{title=Description}
Axis labels auto-hide; if two labels overlap (interval is less than 'autoHideGap'), the labels causing the overlap will be hidden. Only effective for the category axis.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note\{title=Description}
Axis label auto-hide gap; if the interval between two label texts is smaller than autoHideGap, the label causing overlap is automatically hidden. Only effective for category axes.

When autoHide is enabled, autoHide is used, set on autoHideSeparation.

When autoHide is disabled, sampling is used, set on minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note\{title=Description}
Axis label, auto-rotate; when label width exceeds axis length, automatically rotate the label. Only effective for category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note\{title=Description}
Axis label, auto-rotate angle range; the range of label rotation angles when auto-rotate is enabled. Only effective for category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note\{title=Description}
Axis label, auto-limit length; when label width exceeds axis length, the excess part is represented by an ellipsis. The label is visible on hover. Only effective for category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note\{title=Description}
Axis label, the maximum length for auto-limiting length; when label text length exceeds the maximum length, the excess part is represented by an ellipsis. The label is visible on hover. Only effective for category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note\{title=Description}
X-axis tick label

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the label is visible.

:::

#### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Label color

:::

#### labelFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Label font weight

:::

#### labelAngle

**Type:** `number | undefined`

:::note\{title=Description}
Label rotation angle

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
X-axis line

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis line is visible.

:::

#### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Axis line color

:::

#### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Axis line width

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note\{title=Description}
X-axis tick

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the tick is visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the tick is inside.

:::

#### tickColor

**Type:** `string | undefined`

:::note\{title=Description}
Tick color

:::

#### tickSize

**Type:** `number | undefined`

:::note\{title=Description}
Tick size

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note\{title=Description}
X-axis title

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note\{title=Description}
Title text, follows field configuration by default.

:::

#### titleColor

**Type:** `string | undefined`

:::note\{title=Description}
Title color

:::

#### titleFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Title font size

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Title font weight

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note\{title=Description}
X-axis grid line

:::

#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note\{title=Description}
Grid line color

:::

#### gridWidth

**Type:** `number | undefined`

:::note\{title=Description}
Grid line width

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Grid line type

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note\{title=Description}
X-axis animation configuration

:::

#### duration

**Type:** `number | undefined`

:::note\{title=Description}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note\{title=Description}
Animation easing function

:::

## yAxis

**Type:** `YLinearAxis | undefined`

:::note\{title=Description}
Y-axis

Numeric axis (Y-axis) configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is visible.

:::

### min

**Type:** `number | undefined`

:::note\{title=Description}
The minimum value of the axis, higher priority than 'nice' and 'zero'.

:::

### max

**Type:** `number | boolean | undefined`

:::note\{title=Description}
The maximum value of the axis, higher priority than 'nice' and 'zero'; if true, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to use a logarithmic axis. Only effective for numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note\{title=Description}
The base of the logarithmic axis. Only effective for numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically adjust the axis scale interval to make tick labels more readable. This configuration is disabled if 'min' and 'max' are set. Only effective for numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is displayed in reverse. Only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to force the display of the 0 value on the axis. This configuration is disabled if 'min' and 'max' are set. Only effective for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically format tick labels for numeric axes. Only effective for numeric axes. When 'autoFormat' is true, 'numFormat' configuration is disabled.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note\{title=Description}
Number formatting for numeric axes. Only effective for numeric axes, with lower priority than 'autoFormat'.

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note\{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note\{title=Description}
Number format ratio, cannot be 0

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note\{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**
\- 100000 converts to 10W, ratio:10000, symbol:"W"
\- 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note\{title=Description}
Thousands separator for number formatting

:::

#### suffix

**Type:** `string | undefined`

:::note\{title=Description}
Number format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note\{title=Description}
Number format prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note\{title=Description}
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

:::note\{title=Description}
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

:::note\{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**
\- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note\{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note\{title=Description}
Y-axis tick label

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the label is visible.

:::

#### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Label color

:::

#### labelFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Label font weight

:::

#### labelAngle

**Type:** `number | undefined`

:::note\{title=Description}
Label rotation angle

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
Y-axis line

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis line is visible.

:::

#### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Axis line color

:::

#### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Axis line width

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note\{title=Description}
Y-axis tick

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the tick is visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the tick is inside.

:::

#### tickColor

**Type:** `string | undefined`

:::note\{title=Description}
Tick color

:::

#### tickSize

**Type:** `number | undefined`

:::note\{title=Description}
Tick size

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note\{title=Description}
Y-axis title

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note\{title=Description}
Title text, follows field configuration by default.

:::

#### titleColor

**Type:** `string | undefined`

:::note\{title=Description}
Title color

:::

#### titleFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Title font size

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Title font weight

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note\{title=Description}
Y-axis grid line

:::

#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note\{title=Description}
Grid line color

:::

#### gridWidth

**Type:** `number | undefined`

:::note\{title=Description}
Grid line width

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Grid line type

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note\{title=Description}
Y-axis animation configuration

:::

#### duration

**Type:** `number | undefined`

:::note\{title=Description}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note\{title=Description}
Animation easing function
:::note\{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note\{title=Description}
Title text, follows field configuration by default.

:::

#### titleColor

**Type:** `string | undefined`

:::note\{title=Description}
Title color

:::

#### titleFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Title font size

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Title font weight

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note\{title=Description}
X-axis grid line

:::

#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note\{title=Description}
Grid line color

:::

#### gridWidth

**Type:** `number | undefined`

:::note\{title=Description}
Grid line width

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Grid line type

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note\{title=Description}
Y-axis animation configuration

:::

#### duration

**Type:** `number | undefined`

:::note\{title=Description}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note\{title=Description}
Animation easing function

:::

## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note\{title=Description}
Vertical prompt line

The vertical prompt line displayed when the mouse moves over the chart.

Crosshair configuration, a type used to display crosshairs (prompt lines) in charts.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to show the crosshair line.

:::

### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Crosshair line color

:::

### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Crosshair label color

:::

### labelVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to show the crosshair label.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Crosshair label background color

:::

## sort

**Type:** `Sort | undefined`

:::note\{title=Description}
X-axis sort configuration; supports sorting by dimensions, measures, or custom order.

Category axis sort configuration; supports sorting by dimensions, measures, or custom order.

:::

**Example**
sort: \{
orderBy: 'profit',
order: 'asc',
}
sort: \{
customOrder:\['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
or
\- customOrder:\['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note\{title=Description}
Sort order; selectable values are 'asc' or 'desc'.

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note\{title=Description}
The field the sort depends on; can be dimension ID or measure ID.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note\{title=Description}
Custom sort order; this order will be directly applied to the category axis.

:::

## sortLegend

**Type:** `SortLegend | undefined`

:::note\{title=Description}
Legend sort configuration; supports sorting by dimensions, measures, or custom order.

Legend sort configuration; supports sorting by dimensions, measures, or custom order. The sort array follows left-to-right or top-to-bottom order.

:::

**Example**
sortLegend: \{
orderBy: 'profit',
order: 'asc',
}
sortLegend: \{
customOrder:\['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
or
\- customOrder:\['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note\{title=Description}
Sort order; selectable values are 'asc' or 'desc'.

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note\{title=Description}
The field the sort depends on; can be dimension ID or measure ID.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note\{title=Description}
Custom sort order; this order will be directly applied to the legend. Ascending from left-to-right or top-to-bottom, descending from right-to-left or bottom-to-top.

:::

## theme

**Type:** `Theme | undefined`

:::note\{title=Description}
Chart theme. Theme is a lower-priority configuration containing common settings shared across all chart types and configurations for specific chart categories.

Includes built-in light and dark themes; users can define custom themes through the Builder.

Theme

Includes built-in light and dark themes; new themes can be customized via registerTheme.

:::

**Example**
'dark'

'light'

'customThemeName'

### length

**Type:** `number`

### brand

**Type:** `brand`

## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note\{title=Description}
Point marker style

Point marker style configuration, used to define chart point marker styles, including color, borders, etc.

Supports global styles or conditional style configurations.

Data filter

If 'selector' is configured, it provides four types of data matching: value selector, partial data selector, conditional dimension selector, and conditional measure selector.

If 'selector' is not configured, the style applies globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Data selector

If 'selector' is configured, it provides four types of data matching: value selector, partial data selector, conditional dimension selector, and conditional measure selector.

If 'selector' is not configured, the style applies globally.

:::

**Example**
Value selector
selector = "tool"
selector = \["tool", "book"]
selector = 100
selector = \[100, 200]

Partial data selector
selector = \{ profit: 100 }
selector = \[\{ profit: 100 }, \{ profit: 200 }]

Conditional dimension selector
selector = \{
field: 'category',
operator: 'in',
value: 'tool'
}
selector = \{
field: 'category',
operator: 'not in',
value: 'book'
}

Conditional measure selector
selector = \{
field: 'profit',
operator: '>=',
value: 100
}
selector = \{
field: 'profit',
operator: 'between'
value: \[100, 300]
}

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, or complex conditions.

Core Capabilities:

\- Supports any complex data filtering conditions.

\- Use built-in utility functions for data manipulation.

\- Safe execution in the browser environment (Web Worker sandbox).

Environment requirements: Only supports browser environment; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration

Implement filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions (accessible via \_ or R) are allowed

\- Input parameters: data (array)，each item contains \_\_row\_index field representing line number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's line number, field represents the field to be highlighted

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field of data items with sales greater than 1000

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region

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

Highlight data items filtered by multiple conditions

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

:::note\{title=Description}
Fallback plan when code execution fails or environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the point is visible.

:::

### pointSize

**Type:** `number | undefined`

:::note\{title=Description}
Point size

Point size

:::

### pointColor

**Type:** `string | undefined`

:::note\{title=Description}
Point marker color

Point marker color

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Point marker color opacity

Point marker color opacity

:::

### pointBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Point marker border color

Point marker border color

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Point marker border width

Point marker border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note\{title=Description}
Point marker border style

Point marker border style

:::

**Example**
solid

dashed

dotted

## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note\{title=Description}
Line marker style

Line marker style configuration, used to define chart line marker styles, including color, opacity, curves, etc.

Supports global styles or conditional style configurations.

Data filter

If 'selector' is configured, it provides four types of data matching: value selector, partial data selector, conditional dimension selector, and conditional measure selector.

If 'selector' is not configured, the style applies globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
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
selector = \{ profit: 100 }
selector = \[\{ profit: 100 }, \{ profit: 200 }]

Conditional dimension selector
selector = \{
field: 'category',
operator: 'in',
value: 'tool'
}
selector = \{
field: 'category',
operator: 'not in',
value: 'book'
}

Conditional measure selector
selector = \{
field: 'profit',
operator: '>=',
value: 100
}
selector = \{
field: 'profit',
operator: 'between'
value: \[100, 300]
}

#### field

**Type:** `string`

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, or complex conditions.

Core Capabilities:

\- Supports any complex data filtering conditions.

\- Use built-in utility functions for data manipulation.

\- Safe execution in the browser environment (Web Worker sandbox).

Environment requirements: Only supports browser environment; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration

Implement filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions (accessible via \_ or R) are allowed

\- Input parameters: data (array)，each item contains \_\_row\_index field representing line number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's line number, field represents the field to be highlighted

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field of data items with sales greater than 1000

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region

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

Highlight data items filtered by multiple conditions

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

:::note\{title=Description}
Fallback plan when code execution fails or environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the line segment is visible.

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the line segment is smooth.

:::

### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Line segment color

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Line segment color opacity

:::

### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Line segment width

:::

## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note\{title=Description}
Area marker style

Area marker style configuration, used to define chart area marker styles, including color, opacity, borders, etc.

Supports global styles or conditional style configurations.

Data filter

If 'selector' is configured, it provides four types of data matching: value selector, partial data selector, conditional dimension selector, and conditional measure selector.

If 'selector' is not configured, the style applies globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Data selector

If 'selector' is configured, it provides four types of data matching: value selector, partial data selector, conditional dimension selector, and conditional measure selector.

If 'selector' is not configured, the style applies globally.

:::

**Example**
Value selector
selector = "tool"
selector = \["tool", "book"]
selector = 100
selector = \[100, 200]

Partial data selector
selector = \{ profit: 100 }
selector = \[\{ profit: 100 }, \{ profit: 200 }]

Conditional dimension selector
selector = \{
field: 'category',
operator: 'in',
value: 'tool'
}
selector = \{
field: 'category',
operator: 'not in',
value: 'book'
}

Conditional measure selector
selector = \{
field: 'profit',
operator: '>=',
value: 100
}
selector = \{
field: 'profit',
operator: 'between'
value: \[100, 300]
}

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, or complex conditions.

Core Capabilities:

\- Supports any complex data filtering conditions.

\- Use built-in utility functions for data manipulation.

\- Safe execution in the browser environment (Web Worker sandbox).

Environment requirements: Only supports browser environment; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration

Implement filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions (accessible via \_ or R) are allowed

\- Input parameters: data (array)，each item contains \_\_row\_index field representing line number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's line number, field represents the field to be highlighted

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field of data items with sales greater than 1000

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region

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

Highlight data items filtered by multiple conditions

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

:::note\{title=Description}
Fallback plan when code execution fails or environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### areaVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the area marker is visible.

:::

### areaColor

**Type:** `string | undefined`

:::note\{title=Description}
Area marker color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Area marker color opacity

:::

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note\{title=Description}
Annotation point

Annotation point configuration; defines chart annotation points based on selected data, including position, format, style, etc.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Annotation point selector, used to select data points.

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, or complex conditions.

Core Capabilities:

\- Supports any complex data filtering conditions.

\- Use built-in utility functions for data manipulation.

\- Safe execution in the browser environment (Web Worker sandbox).

Environment requirements: Only supports browser environment; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration

Implement filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}

\- Only built-in utility functions (accessible via \_ or R) are allowed

\- Input parameters: data (array); each item contains the \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, and field represents the field to be highlighted

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field of data items with sales greater than 1000

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region

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

Highlight data items filtered by multiple conditions

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

:::note\{title=Description}
Fallback plan when code execution fails or environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note\{title=Description}
Annotation text

:::

**Example**
'Annotation text'

### textColor

**Type:** `string | undefined`

:::note\{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Text font weight

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note\{title=Description}
Text alignment; typically set to 'right'. Text is displayed on the left side of the annotation point to ensure it stays within the visible area of the chart.

Recommended to set to 'right' to ensure the text is to the left of the annotation point.

right: Text is to the left of the annotation point, with the right edge of the text aligned to the annotation point.

left: Text is to the right of the annotation point, with the left edge of the text aligned to the annotation point.

center: Text is centered on the annotation point, with the center of the text aligned to the annotation point.

:::

**Example**
'right' Text is to the left of the annotation point

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Text vertical alignment; typically set to 'top'. Text is displayed at the bottom of the annotation point to ensure it stays within the visible area of the chart.

Recommended to set to 'top' to ensure the text is fully displayed within the chart's visible area.

top: Text is at the bottom of the annotation point, with the top edge of the text aligned to the annotation point.

middle: Text is centered on the annotation point, with the center of the text aligned to the annotation point.

bottom: Text is at the top of the annotation point, with the bottom edge of the text aligned to the annotation point.

:::

**Example**
'top' Text is at the bottom of the annotation point

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Background visible

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Background border color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Background border width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Background border radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
Background padding

:::

**Example**
4

### offsetY

**Type:** `number | undefined`

:::note\{title=Description}
The overall pixel offset distance of the annotation point in the Y direction. When the annotation point is at the top of the chart (large values), a positive value is recommended; when it's at the bottom (small values), a negative value is recommended.

Negative values shift the entire unit upwards. For example, if set to -10, the entire annotation point component, including text and text background, will shift upwards by 10 pixels.

Positive values shift the entire unit downwards. For example, if set to 10, the entire annotation point component, including text and text background, will shift downwards by 10 pixels.

:::

**Example**
offsetY: 5, the entire annotation point shifts downwards by 5 pixels

### offsetX

**Type:** `number | undefined`

:::note\{title=Description}
The overall pixel offset distance of the annotation point in the X direction. When the annotation point is on the left side of the chart (category axis start), a positive value is recommended; when it's on the right side (category axis end), a negative value is recommended.

Negative values shift the entire unit to the left. For example, if set to -10, the entire annotation point component, including text and text background, will shift left by 10 pixels.

Positive values shift the entire unit to the right. For example, if set to 10, the entire annotation point component, including text and text background, will shift right by 10 pixels.

:::

**Example**
offsetX: 5, the entire annotation point shifts right by 5 pixels

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note\{title=Description}
Dimension value annotation line, displayed vertically; allows setting the position, style, etc.

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note\{title=Description}
Fixed x-value for the vertical annotation line. If the category axis is on the X-axis, enter a dimension value; if the numeric axis is on the X-axis, enter a specific numeric value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

AI-generated JavaScript code to dynamically calculate the annotation line value.

Suitable for cases where the annotation line position needs to be determined dynamically based on data, such as average, maximum, quantiles, business lines, etc.

Only supports browser environment (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User requirement description (natural language)

:::

**Example**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for annotation line"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions (accessible via \_ or R) are allowed

\- Input parameters: data (array)

\- Must return a single value: number | string

\- Suitable scenario: Dynamic values needed for annotation lines (horizontal or vertical)

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales as the annotation line value

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for annotation line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile as annotation line

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate target value based on conditions

```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```

#### fallback

**Type:** `string | number | undefined`

:::note\{title=Description}
Fallback plan when code execution fails or environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note\{title=Description}
Annotation text

:::

**Example**
'Annotation text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note\{title=Description}
Text position; location of the annotation line label (relative to the line).

:::

**Example**
'outsideEnd'

### textColor

**Type:** `string | undefined`

:::note\{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Text font weight

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note\{title=Description}
Text alignment; typically zero-configuration.

Recommended to set to 'right' to ensure the text is to the left of the annotation line.

right: Text is on the left side of the reference line, with the right edge of the text aligned to the (vertical) annotation line.

left: Text is on the right side of the reference line, with the left edge of the text aligned to the (vertical) annotation line.

center: Text is centered on the reference line, with the center of the text aligned to the (vertical) annotation line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Text vertical alignment; typically zero-configuration.

Recommended to set to 'top' to ensure the text is fully displayed within the chart's visible area.

top: Text is at the bottom of the reference line, with the top edge of the text aligned to the end point of the (vertical) annotation line.

middle: Text is centered on the reference line, with the center of the text aligned to the end point of the (vertical) annotation line.

bottom: Text is at the top of the reference line, with the bottom edge of the text aligned to the end point of the (vertical) annotation line.

:::

**Example**
'top'

### lineVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Line visible

:::

**Example**
true

### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Line color

:::

**Example**
'red'

### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Line width

:::

**Example**
2

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note\{title=Description}
Line style

:::

**Example**
'solid'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Background visible

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Background border color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Background border width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Background border radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
Background padding

:::

**Example**
4

## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note\{title=Description}
Numeric annotation line (including average line, maximum line, minimum line, etc.), displayed horizontally; allows setting the position, style, etc. Use this configuration to draw annotation lines corresponding to numeric values like the average.

:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note\{title=Description}
Fixed y-value for the horizontal annotation line. If the category axis is on the Y-axis, enter a dimension value; if the numeric axis is on the Y-axis, enter a specific numeric value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

AI-generated JavaScript code to dynamically calculate the annotation line value.

Suitable for cases where the annotation line position needs to be determined dynamically based on data, such as average, maximum, quantiles, business lines, etc.

Only supports browser environment (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User requirement description (natural language)

:::

**Example**
"Get the highest sales value as the annotation line reference"

"Calculate average sales for annotation line"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions (accessible via \_ or R) are allowed

\- Input parameters: data (array)

\- Must return a single value: number | string

\- Suitable scenario: Dynamic values needed for annotation lines (horizontal or vertical)

\- Forbidden to use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales as the annotation line value

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for annotation line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile as annotation line

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate target value based on conditions

```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```

#### fallback

**Type:** `string | number | undefined`

:::note\{title=Description}
Fallback plan when code execution fails or environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

Populated during the prepare() stage, read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note\{title=Description}
Annotation text

:::

**Example**
'Annotation text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note\{title=Description}
Text position

Annotation line label position (relative to the line).

:::

**Example**
'outsideEnd'

### textColor

**Type:** `string | undefined`

:::note\{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Text font weight

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note\{title=Description}
Text alignment; typically does not need to be set.

Recommended to set to 'right' to ensure the text is on the left side of the annotation line.

right: Text is on the left side of the reference line, with the right edge of the text aligned to the end point of the (horizontal) annotation line.

left: Text is on the right side of the reference line, with the left edge of the text aligned to the end point of the (horizontal) annotation line.

center: Text is centered on the reference line, with the center of the text aligned to the end point of the (horizontal) annotation line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Text vertical alignment; typically does not need to be set.

Recommended to set to 'top' to ensure the text is fully displayed within the chart's visible area.

top: Text is at the bottom of the reference line, with the top edge of the text aligned to the (horizontal) annotation line.

middle: Text is centered on the reference line, with the center of the text aligned to the (horizontal) annotation line.

bottom: Text is at the top of the reference line, with the bottom edge of the text aligned to the (horizontal) annotation line.

:::

**Example**
'top'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Background visible

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Background border color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Background border width

Background border width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Background border radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
Background padding

:::

**Example**
4

### lineVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Line visible

Line visible

:::

**Example**
true

### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Line color

:::

**Example**
'red'

### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Line width

:::

**Example**
2

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note\{title=Description}
Line style

:::

**Example**
'solid'

### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note\{title=Description}
Whether to enable the function to split the main line into two segments.

:::

#### positiveColor

**Type:** `string | undefined`

:::note\{title=Description}
The color for the segment above the annotation value.

:::

#### negativeColor

**Type:** `string | undefined`

:::note\{title=Description}
The color for the segment below the annotation value.

:::

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note\{title=Description}
Annotation area

Annotation area configuration; defines the chart's annotation area based on selected data, including position, style, etc.

:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note\{title=Description}
Depends on selected data for data markers.

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the dimension field value is in 'value'.

\- not in: Select data items where the dimension field value is NOT in 'value'.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select dimension field values; supports arrays.

:::

### text

**Type:** `string | string[] | undefined`

:::note\{title=Description}
Annotation text

:::

**Example**
'Annotation text'

### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note\{title=Description}
Text position

:::

**Example**
'top'

### textColor

**Type:** `string | undefined`

:::note\{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Text font weight

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note\{title=Description}
Text alignment; typically set to 'right'. Text is displayed in the middle of the annotation area, ensuring it stays within the visible area of the chart.

Recommended to set to 'center' to ensure the text is in the middle of the annotation area.

right: Text is on the left side of the annotation area, with the right edge of the text aligned to the annotation area.

left: Text is on the right side of the annotation area, with the left edge of the text aligned to the annotation area.

center: Text is centered on the annotation area, with the center of the text aligned to the annotation area.

:::

**Example**
'center' Text is in the middle of the annotation area

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Text vertical alignment; typically set to 'top'. Text is displayed at the bottom of the annotation area, ensuring it stays within the visible area of the chart.

Recommended to set to 'top' to ensure the text is fully displayed within the chart's visible area.

top: Text is at the bottom of the annotation area, with the top edge of the text aligned to the annotation area.

middle: Text is centered on the annotation area, with the center of the text aligned to the annotation area.

bottom: Text is at the top of the annotation area, with the bottom edge of the text aligned to the annotation area.

:::

**Example**
'top' Text is at the bottom of the annotation area

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Background visible

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Background border color

Background border color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Background border width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Background border radius

Background border radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
Background padding

:::

**Example**
4

### areaColor

**Type:** `string | undefined`

:::note\{title=Description}
Annotation area color

:::

**Example**
'red'

### areaColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area color opacity

:::

**Example**
0.5

### areaBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Annotation area border color

:::

**Example**
'red'

### areaBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area border width

:::

**Example**
2

### areaBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area border radius

:::

**Example**
4

### areaLineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Annotation area border line type

:::

**Example**
\[2, 2]

### outerPadding

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area margin.

:::

**Example**
0

## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note\{title=Description}
Whether to enable dimension linkage when pivot functionality or measure combinations are active.

When hovering over a dimension value, highlight data with the same dimension value in other charts.

Pivot chart dimension linkage configuration.

:::

### enable

**Type:** `false | true`

:::note\{title=Description}
Whether to enable pivot chart dimension linkage.

:::

### showTooltip

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to show tooltips for all sub-charts corresponding to the dimension.

:::

### showLabel

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to show the corresponding crosshair label.

:::

## locale

**Type:** `Locale | undefined`

:::note\{title=Description}
Language

Chart language configuration; supports 'zh-CN' and 'en-US'. Additionally, intl.setLocale('zh-CN') can be called to set the language.

:::
