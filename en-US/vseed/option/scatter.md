# Scatter

:::info{title=Recommended}
\- Recommended field configuration: `2` measure(s), `1` dimension(s)

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info{title=Encoding Mapping}
The Scatter Chart supports the following visual channels:

`xAxis`  : x-axis channel, supports`multiple measures`, mapped to the x-axis by measure value

`yAxis`  : y-axis channel, supports`multiple measures`, mapped to the y-axis by measure value

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Description}
Scatter Chart, suitable for showing data distribution, using point positions to represent data values.

Applicable scenarios:

\- Analyzing data distribution characteristics, such as central tendency, distribution range, outliers, etc.

:::

:::warning{title=Warning}
Data requirements:

\- At least 2 numerical fields

\- The first measure field will be placed on the X-axis, remaining measures will be merged and mapped to the Y-axis

\- Measure names and dimension names will be merged and displayed as legend items

Features enabled by default:

\- Legends, axes, data point markers, tooltips, and trend lines are enabled by default

:::

## chartType

**Type:** `"scatter"`

:::note{title=Description}
Scatter Chart

Scatter Chart, suitable for showing data distribution, using point positions to represent data values.

:::

**Example**
'scatter'

## dataset

**Type:** `Record[]`

:::note{title=Description}
Dataset

TidyData-compliant and already aggregated dataset used to define the chart's data source and structure. User-input datasets do not need manual processing; VSeed features powerful data reshaping capabilities and will automatically reshape the data. Scatter Chart data is ultimately converted to 2 dimensions and 1 measure.

:::

**Example**
\[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]

## dimensions

**Type:** `ScatterDimension[] | undefined`

:::note{title=Description}
Dimensions

The first dimension of the Scatter Chart is mapped to the X-axis; remaining dimensions are merged with measure names (when multiple measures exist) and displayed as legend items.

:::

**Example**
\[{id: "month", alias: "Month"}]

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Description}
Channel to which the dimension is mapped

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::

## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=Description}
Scatter Chart Measures

:::

**Example**
\[
{
id: 'profit', alias: 'Profit', encoding: 'xAxis'
},
{
id: 'sales', alias: 'Sales', encoding: 'yAxis'
}
]

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

\- locale=zh-CN: 749740.264 → 74.45~74.45万

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

**Type:** `"xAxis" | "color" | "tooltip" | "label" | "yAxis" | "size" | undefined`

:::note{title=Description}
Channel to which the measure is mapped

\- xAxis: measure mapped to the x-axis

\- yAxis: measure mapped to the y-axis

\- size: measure mapped to the size channel

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
Pagination configuration, used to specify the pagination field name, which must be a dimension

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

## size

**Type:** `number | number[] | undefined`

:::note{title=Description}
Scatter Chart measure size, used to define the size or size range of data points in the Scatter Chart.

\- If size is a single number, e.g., 10, it means the size of data points is fixed at 10.

\- If size is an array of length 2, e.g., \[10, 40], it means the size of data points ranges from 10 to 40.

\- Mutually exclusive with sizeRange; has lower priority than sizeRange.

:::

## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=Description}
Scatter Chart measure size range, used to define the size range of data points in the Scatter Chart.

\- If sizeRange is an array of length 2, e.g., \[10, 40], it means the size of data points ranges from 10 to 40.

\- If sizeRange is a single number, e.g., 10, it means the size of data points is fixed at 10.

\- Mutually exclusive with size; has higher priority than size.

:::

## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color

Background color can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)')

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
Discrete color scheme used to define the colors of different elements in the chart

:::

**Example**
\['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']

### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Linear gradient color scheme used to define the colors of different elements in the chart

:::

**Example**
\['#FFCDD2, #F8BBD0]

### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Color mapping used to map data values to specific colors

:::

**Example**
{
'profit': 'red',
'sales': 'blue',
}

### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Positive/negative color configuration; defines the color for positive values in the chart

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Positive/negative color configuration; defines the color for negative values in the chart

:::

## label

**Type:** `Label | undefined`

:::note{title=Description}
Label

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
Whether labels display measure values as a percentage

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
Whether labels automatically invert font color based on the mark's color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label anti-overlap functionality is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filter; default relationship between selectors is "Or"

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; the id of a specific dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selection value for the dimension field; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executed via AI-generated code)

Implement complex data filtering logic using AI-generated JavaScript code.

Key Capabilities:

\- Supports arbitrarily complex data filtering conditions

\- Uses internal utility functions for data operations

\- Executes safely in the browser environment (Web Worker sandbox)

Environment Requirements: Supports browser environment only; Node.js environments will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration.

Filtering of chart marks (bars, points, etc.) implemented via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Can only use internal utility functions (accessed via \_ or R)

\- Input parameter: data (array), each item includes a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's row number, field represents the field to highlight

\- Prohibited: eval, Function, asynchronous operations, DOM APIs, network requests

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

Highlight data items with multi-condition filtering

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
Fallback plan when code execution fails or the environment is unsupported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field; the id of a specific dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selection value for the dimension field; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the prepare() phase; read-only at runtime

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
Legend

Legend configuration used to define the chart's legend, including its position, format, and style.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend functionality is enabled

:::

**Example**
enable: true

### border

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend border is enabled

:::

:::warning{title=Warning}
Only effective for discrete legends

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
Pagination icon color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Pagination icon color when disabled

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
Only effective for discrete legends

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
Maximum number of columns or rows for the legend when a large number of legends exist.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of displayed columns.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of displayed rows.

:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
tooltips

Tooltips configuration used to define chart tooltips, including their position, format, and style.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether tooltips are enabled

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush selection

Brush configuration used to enable/disable the brush selection capability.

Chart brush configuration.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether brush selection is enabled

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Brush type

Defines the shape and direction of the brush selector.

\- `rect`: Rectangular selection; can perform selection in both X and Y axis directions simultaneously.

\- `polygon`: Polygonal selection; allows drawing arbitrary polygons by clicking multiple points.

\- `x`: X-axis selection; performs selection only in the X-axis direction, with no Y-axis restrictions.

\- `y`: Y-axis selection; performs selection only in the Y-axis direction, with no X-axis restrictions.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Brush mode; single selection or multiple selection

Defines the brush mode.

\- `single`: Single selection mode; only one brush selector can exist at a time.

\- `multiple`: Multiple selection mode; multiple brush selectors can exist simultaneously.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the selection box when brush ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for data items within the brush selection

Defines the visual style of data points that have been selected via the brush.

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of selected data points, ranging from 0 to 1.

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
Style for data items outside the brush selection

Defines the visual style of data points that have not been selected via the brush.

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of unselected data points, ranging from 0 to 1.

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
x-axis

Numeric axis; x-axis configuration used to define the chart's x-axis, including its position, format, and style.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Minimum value of the axis; has higher priority than nice and zero.

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Maximum value of the axis; has higher priority than nice and zero. If set to true, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic axis; effective only for numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
Base of the logarithmic axis; effective only for numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust axis tick intervals to make labels more readable. This setting is ignored when min and max are configured. Effective only for numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is displayed in reverse; effective only for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force display of the zero value on the axis. This setting is ignored when min and max are configured. Effective only for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format axis labels; effective only for numeric axes. When autoFormat is true, numFormat is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Number formatting for the axis; effective only for numeric axes. Has lower priority than autoFormat.

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
x-axis tick labels

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels are visible

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
x-axis line

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis line is visible

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
x-axis ticks

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inwards

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
x-axis title

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text; defaults to following the field configuration.

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
x-axis grid lines

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
y-axis animation configuration

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

**Type:** `YLinearAxis | undefined`

:::note{title=Description}
y-axis

Numeric axis; y-axis configuration used to define the chart's y-axis, including its position, format, and style.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Minimum value of the axis; has higher priority than nice and zero.

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Maximum value of the axis; has higher priority than nice and zero. If set to true, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic axis; effective only for numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
Base of the logarithmic axis; effective only for numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust axis tick intervals to make labels more readable. This setting is ignored when min and max are configured. Effective only for numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is displayed in reverse; effective only for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force display of the zero value on the axis. This setting is ignored when min and max are configured. Effective only for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format axis labels; effective only for numeric axes. When autoFormat is true, numFormat is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Number formatting for the axis; effective only for numeric axes. Has lower priority than autoFormat.

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
x-axis tick labels

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels are visible

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
x-axis line

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis line is visible

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
x-axis ticks

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inwards

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
x-axis title

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text; defaults to following the field configuration.

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
x-axis grid lines

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
y-axis animation configuration

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

## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Description}
Vertical crosshair line

A vertical line displayed when moving the mouse over the chart.

Crosshair configuration; a type used to define the crosshair (indicator line) in a chart.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the crosshair line

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair line color

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair line label color

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the crosshair label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair label background color

:::

## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme; themes are lower-priority configuration features containing general settings shared by all chart types as well as settings shared by specific chart classes.

Includes built-in 'light' and 'dark' themes; users can define custom themes via the Builder.

Theme

Built-in 'light' and 'dark' themes; new themes can be customized via registerTheme.

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

:::note{title=Description}
Point mark style

Point mark style configuration used to define the styling for data points, including color, borders, etc.

Supports global styling or conditional style configurations.

Data filter.

Provides four types of data matching capabilities if selector is configured: numerical selector, local data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

Provides four types of data matching capabilities if selector is configured: numerical selector, local data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.

:::

**Example**
Numerical selector
selector = "tool"
selector = \["tool", "book"]
selector = 100
selector = \[100, 200]

Local data selector
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
Dimension field; the id of a specific dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selection value for the dimension field; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executed via AI-generated code)

Implement complex data filtering logic using AI-generated JavaScript code.

Applicable to scenarios difficult to express with static selectors, such as Top N, statistical analysis, or complex conditions.

Key Capabilities:

\- Supports arbitrarily complex data filtering conditions

\- Uses internal utility functions for data operations

\- Executes safely in the browser environment (Web Worker sandbox)

Environment Requirements: Supports browser environment only; Node.js environments will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration.

Filtering of chart marks (bars, points, etc.) implemented via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Can only use internal utility functions (accessed via \_ or R)

\- Input parameter: data (array), each item includes a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's row number, field represents the field to highlight

\- Prohibited: eval, Function, asynchronous operations, DOM APIs, network requests

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

Highlight data items with multi-condition filtering

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
Fallback plan when code execution fails or the environment is unsupported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field; the id of a specific dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selection value for the dimension field; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the prepare() phase; read-only at runtime

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the point is visible

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Description}
Point size

Point size

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Description}
Point mark color

Point mark color

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Point mark color opacity

Point mark color opacity

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Point mark border color

Point mark border color

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Point mark border width

Point mark border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Point mark border style

Point mark border style

:::

**Example**
solid

dashed

dotted

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Annotation point

Annotation point configuration; defines chart annotation points based on selected data, including their position, format, style, etc.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Selector for the annotation point, used to select data points.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; the id of a specific dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selection value for the dimension field; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executed via AI-generated code)

Implement complex data filtering logic using AI-generated JavaScript code.

Applicable to scenarios difficult to express with static selectors, such as Top N, statistical analysis, or complex conditions.

Key Capabilities:

\- Supports arbitrarily complex data filtering conditions

\- Uses internal utility functions for data operations

\- Executes safely in the browser environment (Web Worker sandbox)

Environment Requirements: Supports browser environment only; Node.js environments will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration.

Filtering of chart marks (bars, points, etc.) implemented via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Can only use internal utility functions (accessed via \_ or R)

\- Input parameter: data (array), each item includes a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's row number, field represents the field to highlight

\- Prohibited: eval, Function, asynchronous operations, DOM APIs, network requests

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

Highlight data items with multi-condition filtering

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
Fallback plan when code execution fails or the environment is unsupported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field; the id of a specific dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selection value for the dimension field; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the prepare() phase; read-only at runtime

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
Annotation text

:::

**Example**
'Annotation text'

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment; in general, setting this to "right" displays text to the left of the annotation point, ensuring it stays within the visible area of the chart.

Recommended to set to 'right' to ensure text is on the left side of the annotation point.

right: Text is on the left of the annotation point; the right edge of the text aligns with the point.

left: Text is on the right of the annotation point; the left edge of the text aligns with the point.

center: Text is at the center of the annotation point; the center of the text aligns with the point.

:::

**Example**
'right' text is on the left side of the annotation point

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Vertical text alignment; in general, setting this to "top" displays text at the bottom of the annotation point, ensuring it stays within the visible area of the chart.

Recommended to set to 'top' to ensure text is fully displayed within the visible area of the chart.

top: Text is at the bottom of the annotation point; the top edge of the text aligns with the point.

middle: Text is at the center of the annotation point; the center of the text aligns with the point.

bottom: Text is at the top of the annotation point; the bottom edge of the text aligns with the point.

:::

**Example**
'top' text is at the bottom of the annotation point

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the background is visible

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
4

### offsetY

**Type:** `number | undefined`

:::note{title=Description}
Overall pixel offset distance for the annotation point in the Y direction. When the point is near the top (larger values), a positive offset is recommended; when near the bottom (smaller values), a negative offset is recommended.

A negative value offsets the component upwards (e.g., -10 pixels).

A positive value offsets the component downwards (e.g., 10 pixels).

:::

**Example**
offsetY: 5, the annotation point is offset downwards by 5 pixels

### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Overall pixel offset distance for the annotation point in the X direction. When the point is near the left edge (start of category axis), a positive offset is recommended; when near the right edge (end of axis), a negative offset is recommended.

A negative value offsets the component to the left (e.g., -10 pixels).

A positive value offsets the component to the right (e.g., 10 pixels).

:::

**Example**
offsetX: 5, the annotation point is offset to the right by 5 pixels

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Vertical annotation line

Numerical annotation line (including mean, max, min lines, etc.), displayed vertically. Position, style, etc. can be configured. Use this for lines corresponding to values such as the mean of an X-axis measure.

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed x-value for the vertical annotation line. For category axes in the X direction, enter dimension values; for numeric axes in the X direction, enter specific numerical values.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executed via AI-generated code)

Calculate the value of the annotation line dynamically via AI-generated JavaScript code.

Suitable for scenarios where the line position must be determined dynamically based on data, such as averages, maximums, quantiles, or business logic.

Supports browser environment only (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's requirement description (natural language)

:::

**Example**
"Use the highest sales value as the annotation line reference"

"Calculate the average sales for the annotation line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript calculation code

\- Can only use internal utility functions (accessed via \_ or R)

\- Input parameter: data (array)

\- Must return a single numerical value or string: number | string

\- Use case: Dynamic numerical values required for annotation lines (horizontal or vertical)

\- Prohibited: eval, Function, asynchronous operations, DOM APIs, network requests

:::

**Example**
Get the maximum sales value as the annotation line value

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for the annotation line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile as the annotation line

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate goal value based on conditions

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
Fallback plan when code execution fails or the environment is unsupported

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the prepare() phase; read-only at runtime

:::

##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text

:::

**Example**
'Annotation text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position; the position of the annotation line's label (relative to the line).

:::

**Example**
'outsideEnd'

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment; in general, no setting is required.

Recommended to set to 'right' to ensure text is on the left side of the annotation line.

right: Text is on the left side of the reference line; the right edge of the text aligns with the (vertical) annotation line.

left: Text is on the right side of the reference line; the left edge of the text aligns with the (vertical) annotation line.

center: Text is at the center of the reference line; the center of the text aligns with the (vertical) annotation line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Vertical text alignment; in general, no setting is required.

Recommended to set to 'top' to ensure text is fully displayed within the visible area of the chart.

top: Text is at the bottom of the reference line; the top edge of the text aligns with the endpoint of the (vertical) annotation line.

middle: Text is at the center of the reference line; the center of the text aligns with the endpoint of the (vertical) annotation line.

bottom: Text is at the top of the reference line; the bottom edge of the text aligns with the endpoint of the (vertical) annotation line.

:::

**Example**
'top'

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the line is visible

:::

**Example**
true

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line color

:::

**Example**
'red'

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Line width

:::

**Example**
2

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Line style

:::

**Example**
'solid'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the background is visible

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
4

## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Description}
Horizontal annotation line

Numerical annotation line (including mean, max, min lines, etc.), displayed horizontally. Position, style, etc. can be configured. Use this for lines corresponding to values such as the mean of a Y-axis measure.

:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed y-value for the horizontal annotation line. For category axes in the Y direction, enter dimension values; for numeric axes in the Y direction, enter specific numerical values.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executed via AI-generated code)

Calculate the value of the annotation line dynamically via AI-generated JavaScript code.

Suitable for scenarios where the line position must be determined dynamically based on data, such as averages, maximums, quantiles, or business logic.

Supports browser environment only (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's requirement description (natural language)

:::

**Example**
"Use the highest sales value as the annotation line reference"

"Calculate the average sales for the annotation line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript calculation code

\- Can only use internal utility functions (accessed via \_ or R)

\- Input parameter: data (array)

\- Must return a single numerical value or string: number | string

\- Use case: Dynamic numerical values required for annotation lines (horizontal or vertical)

\- Prohibited: eval, Function, asynchronous operations, DOM APIs, network requests

:::

**Example**
Get the maximum sales value as the annotation line value

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for the annotation line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile as the annotation line

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate goal value based on conditions

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
Fallback plan when code execution fails or the environment is unsupported

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field)

Written during the prepare() phase; read-only at runtime

:::

##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text

:::

**Example**
'Annotation text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position

The position of the annotation line's label (relative to the line).

:::

**Example**
'outsideEnd'

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment; in general, no setting is required.

Recommended to set to 'right' to ensure text is on the left side of the annotation line.

right: Text is on the left side of the reference line; the right edge of the text aligns with the endpoint of the (horizontal) annotation line.

left: Text is on the right side of the reference line; the left edge of the text aligns with the endpoint of the (horizontal) annotation line.

center: Text is at the center of the reference line; the center of the text aligns with the endpoint of the (horizontal) annotation line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Vertical text alignment; in general, no setting is required.

Recommended to set to 'top' to ensure text is fully displayed within the visible area of the chart.

top: Text is at the bottom of the reference line; the top edge of the text aligns with the (horizontal) annotation line.

middle: Text is at the center of the reference line; the center of the text aligns with the (horizontal) annotation line.

bottom: Text is at the top of the reference line; the bottom edge of the text aligns with the (horizontal) annotation line.

:::

**Example**
'top'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the background is visible

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width

Background border width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
4

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the line is visible

Whether the line is visible

:::

**Example**
true

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line color

:::

**Example**
'red'

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Line width

:::

**Example**
2

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Line style

:::

**Example**
'solid'

### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Description}
Whether to enable the feature that splits the main line into two segments

:::

#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
The main color for the portion greater than the annotation value

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
The main color for the portion less than the annotation value

:::

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Annotation area

Annotation area configuration; defines chart annotation areas based on selected data, including their position, style, etc.

:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Annotate data based on the selected data items.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; the id of a specific dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items whose dimension field value is in the value list

\- not in: Select data items whose dimension field value is not in the value list

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selection value for the dimension field; supports arrays

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text

:::

**Example**
'Annotation text'

### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=Description}
Text position

:::

**Example**
'top'

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=Description}
Text alignment; in general, setting this to "right" displays text in the middle of the annotation area, ensuring it stays within the visible area of the chart.

Recommended to set to 'center' to ensure text is in the middle of the annotation area.

right: Text is on the left of the annotation area; the right edge of the text aligns with the area.

left: Text is on the right of the annotation area; the left edge of the text aligns with the area.

center: Text is at the center of the annotation area; the center of the text aligns with the area.

:::

**Example**
'center' text is in the middle of the annotation area

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Vertical text alignment; in general, setting this to "top" displays text at the bottom of the annotation area, ensuring it stays within the visible area of the chart.

Recommended to set to 'top' to ensure text is fully displayed within the visible area of the chart.

top: Text is at the bottom of the annotation area; the top edge of the text aligns with the area.

middle: Text is at the center of the annotation area; the center of the text aligns with the area.

bottom: Text is at the top of the annotation area; the bottom edge of the text aligns with the area.

:::

**Example**
'top' text is at the bottom of the annotation area

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the background is visible

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Background border color

Background border color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Background border width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Background border radius

Background border radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=Description}
Background padding

:::

**Example**
4

### areaColor

**Type:** `string | undefined`

:::note{title=Description}
Annotation area color

:::

**Example**
'red'

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Annotation area color opacity

:::

**Example**
0.5

### areaBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Annotation area border color

:::

**Example**
'red'

### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Annotation area border width

:::

**Example**
2

### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Annotation area border radius

:::

**Example**
4

### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Annotation area border dash pattern

:::

**Example**
\[2, 2]

### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Margin of the annotation area

:::

**Example**
0

## linearRegressionLine

**Type:** `LinearRegressionLine | LinearRegressionLine[] | undefined`

:::note{title=Description}
Linear regression line

Linear regression line configuration, including line style, etc.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable

:::

### color

**Type:** `string | undefined`

:::note{title=Description}
Regression line color

Used to set the regression line color; if not set, the chart's main color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Regression line width

Used to set the regression line width, in pixels; default is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Regression line style

Used to set the regression line style, e.g., solid, dashed, etc.; default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Description}
Regression line label text

Used to set the regression line's label text; an empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
400

### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the confidence interval

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Description}
Confidence interval numerical setting; default is 95% confidence level.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Description}
Confidence interval color

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Description}
Confidence interval opacity

:::

**Example**
0.5

### shadowBlur

**Type:** `number | undefined`

:::note{title=Description}
Shadow blur level

:::

**Example**
0

### shadowColor

**Type:** `string | undefined`

:::note{title=Description}
Mark shadow color

:::

**Example**
'#FFFFFF4D'

### shadowOffsetX

**Type:** `number | undefined`

:::note{title=Description}
Horizontal shadow offset

:::

**Example**
0

### shadowOffsetY

**Type:** `number | undefined`

:::note{title=Description}
Vertical shadow offset

:::

**Example**
1

## lowessRegressionLine

**Type:** `LowessRegressionLine | LowessRegressionLine[] | undefined`

:::note{title=Description}
Locally weighted regression line configuration

Locally weighted regression line configuration, including line style, etc.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable

:::

### color

**Type:** `string | undefined`

:::note{title=Description}
Regression line color

Used to set the regression line color; if not set, the chart's main color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Regression line width

Used to set the regression line width, in pixels; default is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Regression line style

Used to set the regression line style, e.g., solid, dashed, etc.; default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Description}
Regression line label text

Used to set the regression line's label text; an empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
400

### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the confidence interval

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Description}
Confidence interval numerical setting; default is 95% confidence level.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Description}
Confidence interval color

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Description}
Confidence interval opacity

:::

**Example**
0.5

## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note{title=Description}
Polynomial regression line

Polynomial regression line configuration, including polynomial degree, line style, etc.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable

:::

### color

**Type:** `string | undefined`

:::note{title=Description}
Regression line color

Used to set the regression line color; if not set, the chart's main color is used by default.

:::

### degree

**Type:** `number | undefined`

:::note{title=Description}
Degree of the polynomial regression

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Regression line width

Used to set the regression line width, in pixels; default is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Regression line style

Used to set the regression line style, e.g., solid, dashed, etc.; default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Description}
Regression line label text

Used to set the regression line's label text; an empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
400

### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the confidence interval

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Description}
Confidence interval numerical setting; default is 95% confidence level.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Description}
Confidence interval color

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Description}
Confidence interval opacity

:::

**Example**
0.5

## logisticRegressionLine

**Type:** `LogisticRegressionLine | LogisticRegressionLine[] | undefined`

:::note{title=Description}
Logistic regression line

Logistic regression line configuration, including line style, etc.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable

:::

### color

**Type:** `string | undefined`

:::note{title=Description}
Regression line color

Used to set the regression line color; if not set, the chart's main color is used by default.

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Regression line width

Used to set the regression line width, in pixels; default is 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Regression line style

Used to set the regression line style, e.g., solid, dashed, etc.; default is solid.

:::

### text

**Type:** `string | undefined`

:::note{title=Description}
Regression line label text

Used to set the regression line's label text; an empty string means no label is shown.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Text color

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Text font size

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Text font weight

:::

**Example**
400

### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the confidence interval

:::

### confidenceLevel

**Type:** `number | undefined`

:::note{title=Description}
Confidence interval numerical setting; default is 95% confidence level.

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note{title=Description}
Confidence interval color

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note{title=Description}
Confidence interval opacity

:::

**Example**
0.5

## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
Whether to enable dimension linkage functionality when the chart has pivot features enabled or measures are combined.

When hovering over a dimension value, it highlights data with the same dimension value in other charts.

Pivot chart dimension linkage configuration.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether to enable pivot chart dimension linkage

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display tooltips for all sub-charts corresponding to the dimension

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the label corresponding to the crosshair

:::

## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Language

Chart language configuration; supports 'zh-CN' and 'en-US'. Additionally, the language can be set by calling intl.setLocale('zh-CN').

:::
