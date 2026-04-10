# ColumnParallel

:::info{title=Recommended}
\- Recommended field configuration: `1` measure(s), `2` dimension(s)

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info{title=Encoding Mapping}
The Bar Chart supports the following visual channels:

`xAxis`  : x-axis channel, supports`multiple dimensions`, mapped to the x-axis by dimension value

`yAxis`  : y-axis channel, supports`multiple measures`, mapped to the y-axis by measure value

`detail` : subdivision channel, supports`multiple dimensions`, used for displaying data at a finer granularity within the same color series

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Description}
Bar Chart, suitable for parallel comparison scenarios of multiple measures, where multiple bars are displayed side-by-side to show different measure values

Applicable scenarios:

\- Parallel comparison of multiple measures under the same dimension

\- Horizontal comparison of multi-dimensional data

\- Correlation analysis between measures

:::

:::warning{title=Warning}
Data requirements:

\- At least 1 measure field

\- The first dimension will be placed on the X-axis; the remaining dimensions will be merged with measure names (when multiple measures exist) and displayed as legend items.

\- All measures are automatically merged into one measure

Features enabled by default:

\- Legend, axes, data labels, tooltips, and measure sorting are enabled by default

:::

## chartType

**Type:** `"columnParallel"`

:::note{title=Description}
Bar Chart, suitable for parallel comparison scenarios of multiple measures

:::

**Example**
'columnParallel'

## dataset

**Type:** `Record[]`

:::note{title=Description}
Dataset: A dataset that conforms to the TidyData specification and has been aggregated, used to define the chart's data source and structure. User input does not require any processing; VSeed features powerful data reshaping capabilities that handle the transformation automatically. The final data for the Bar Chart will be converted into 2 dimension(s) and 1 measure(s).

:::

**Example**
\[{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]

## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Description}
Dimensions, The first dimension is mapped to the X-axis; the remaining dimensions are merged with measure names (when multiple measures exist) and displayed as legend items.

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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=Description}
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

:::note{title=Description}
Measures: All measures in the Bar Chart are automatically merged into a single measure and mapped to the Y-axis. When multiple measures exist, the measure names are merged with the remaining dimensions and displayed as legend items.

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

\- locale=zh-CN: 749740.264 → 74.45万

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Description}
Channel to which the measure is mapped

\- yAxis: measure mapped to the y-axis

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
Pagination configuration, used to specify the field name for pagination, which must be a dimension

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
Chart background color, Background color can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)')

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
Whether labels display the percentage of measure values

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
Whether labels automatically invert font color based on the color of graphic elements

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label collision avoidance is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filtering; the default relationship between selectors is "Or"

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select data items by dimension field value; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Implements complex data filtering logic using AI-generated JavaScript code

Key capabilities:

\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data manipulation

\- Executes safely in the browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environments; fallback will be used in Node.js environments

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart animated filter configuration

Implements filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code

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

"Highlight the bar with the highest profit rate in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (access via \_ or R)

\- Input parameters: data (array), where each item contains a \_\_row\_index field representing the row number

\- Must return an array of objects combining row indices and fields: Array<{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, and field represents the field to be highlighted

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field for data items with sales greater than 1000

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

:::note{title=Description}
Fallback solution when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select data items by dimension field value; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Animated filtering execution result (runtime field)

Written during the prepare() phase, read-only at runtime

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
Legend configuration, used to define the chart's legend, including its position, format, style, etc.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether legend functionality is enabled

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
legendfontColor

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Pagination icon color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Pagination icon disabled color

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
legendfontColor

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
Maximum number of columns or rows when there are many legends

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows displayed

:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip configuration, used to define the chart's tooltips, including their position, format, style, etc.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether tooltip functionality is enabled

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush selection

Brush selection configuration, used to enable/disable brush functionality

Chart brush selection configuration

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable brush selection

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Brush type

Defines the shape and orientation of the brush selection box

\- `rect`: Rectangular selection, allowing simultaneous selection in both X and Y directions

\- `polygon`: Polygonal selection, allowing the drawing of arbitrary polygons by clicking multiple points

\- `x`: X-axis selection, restricts selection to the X-axis direction

\- `y`: Y-axis selection, restricts selection to the Y-axis direction

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Selection mode: single or multiple

Defines the brush selection mode

\- `single`: Single selection mode, only one brush box at a time

\- `multiple`: Multiple selection mode, multiple brush boxes can coexist

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the selection box after brush ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for selected data items

Defines the style of data points within the brush selection

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of selected data points (range 0-1)

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
Style for unselected data items

Defines the style of data points outside the brush selection

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of unselected data points (range 0-1)

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

**Type:** `XBandAxis | undefined`

:::note{title=Description}
X-axis, category axis; X-axis configuration used to define the chart's x-axis, including its position, format, style, etc.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is reversed; effective only for numeric axes

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the display of 0 on the axis; this configuration is ignored if min and max are set. Effective only for numeric axes.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label auto-hide; if two labels overlap (distance less than autoHideGap), the overlapping label is hidden. Effective only for category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}
Axis label auto-hide interval; if the distance between two text labels is less than autoHideGap, the overlapping label is hidden. Effective only for category axes.

When auto-hide is enabled, autoHide is used, set on autoHideSeparation on

When auto-hide is disabled, sampling is used, set on minGap on

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label auto-rotation; when label width exceeds axis length, labels rotate automatically. Effective only for category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
Axis label auto-rotation angle range; defines the rotation range when auto-rotation is enabled. Effective only for category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label auto-truncation; when label width exceeds axis length, the excess is replaced by an ellipsis. Full label is visible on hover. Effective only for category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
Axis label maximum auto-truncation length; if the label exceeds this length, it is truncated with an ellipsis. Effective only for category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
X-axis tick label

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label is visible

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
LabelColor

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
X-axis ticks

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inward

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
Whether the title is visible

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text; defaults to field configuration

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
Grid line type

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
X-axis animation configuration

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
Y-axis, numeric axis; Y-axis configuration used to define the chart's y-axis, including its position, format, style, etc.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Axis minimum value; has higher priority than nice and zero

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Axis maximum value; has higher priority than nice and zero. If set to true, the maximum is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic axis; effective only for numeric axes

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
The base of the logarithmic axis; effective only for numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust the axis scale interval to make tick labels more readable; this configuration is ignored if min and max are set. Effective only for numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is reversed; effective only for numeric axes

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the display of 0 on the axis; this configuration is ignored if min and max are set. Effective only for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format the tick labels of numeric axes; if autoFormat is true, the numFormat configuration is ignored. Effective only for numeric axes.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Number formatting for numeric axes; effective only for numeric axes, with lower priority than autoFormat

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
Y-axis tick label

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label is visible

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
LabelColor

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
Y-axis ticks

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inward

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
Whether the title is visible

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text; defaults to field configuration

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
Grid line type

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
Vertical tooltip configuration used to define the chart's vertical tooltip, including its color, label style, etc.

Crosshair rectangle configuration used to define the area for displaying crosshairs in the chart

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the crosshair rectangle area

:::

### rectColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangle area color

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangle area label color

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the crosshair rectangle area label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangle area label background color

:::

## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Description}
Bar Chart stacking corner radius

:::

## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}
Maximum width of the bars, can be a pixel value or a percentage string

:::

## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=Description}
The distance between bars under the same category, can be a pixel value or a percentage string

:::

## sort

**Type:** `Sort | undefined`

:::note{title=Description}
X-axis sorting configuration; supports sorting by dimensions or measures, as well as custom sort orders

Category axis sorting configuration; supports sorting by dimensions or measures, as well as custom sort orders

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
sort order, optional values 'asc' or 'desc'

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
sorting field, can be a dimension ID or measure ID

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order to be applied directly to the category axis

:::

## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Legend sorting configuration; supports sorting by dimensions or measures, as well as custom sort orders

Legend sorting configuration; supports sorting by dimensions or measures, as well as custom sort orders; the sort array follows top-to-bottom or left-to-right order.

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
sort order, optional values 'asc' or 'desc'

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
sorting field, can be a dimension ID or measure ID

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order to be applied directly to the legend; ascending from left-to-right or top-to-bottom, descending from right-to-left or bottom-to-top.

:::

## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme; theme is a low-priority configuration containing general configurations shared across all chart types and specific ones for individual classes. Built-in light and dark themes are available; users can also customize themes via the Builder.

Theme

Built-in light and dark themes; new themes can be customized via registerTheme.

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
Rectangular element style: Bar Chart configuration used to define the side-by-side bar style, including color, borders, corner radius, etc.

Supports global style or conditional style configuration

Data filter

If selector is configured, it provides four types of data matching capabilities: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If no selector is configured, the style is applied globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

If selector is configured, it provides four types of data matching capabilities: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If no selector is configured, the style is applied globally.

:::

**Example**
Numeric selector
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
Dimension field, the ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select data items by dimension field value; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Implements complex data filtering logic using AI-generated JavaScript code

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, or complex conditions.

Key capabilities:

\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data manipulation

\- Executes safely in the browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environments; fallback will be used in Node.js environments

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart animated filter configuration

Implements filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code

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

"Highlight the bar with the highest profit rate in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (access via \_ or R)

\- Input parameters: data (array), where each item contains a \_\_row\_index field representing the row number

\- Must return an array of objects combining row indices and fields: Array<{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, and field represents the field to be highlighted

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field for data items with sales greater than 1000

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

:::note{title=Description}
Fallback solution when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select data items by dimension field value; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Animated filtering execution result (runtime field)

Written during the prepare() phase, read-only at runtime

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
Whether the bar element (rectangular element) is visible

:::

### barColor

**Type:** `string | undefined`

:::note{title=Description}
Bar element (rectangular element) color

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Bar element (rectangular element) color opacity

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Bar element (rectangular element) border color

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Bar element (rectangular element) border width

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Bar element (rectangular element) border style

:::

**Example**
solid

dashed

dotted

### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Description}
Bar element (rectangular element) corner radius

Bar element (rectangular element) stroke opacity

:::

**Example**
4

\[0, 0, 10, 10]

### barRadius

**Type:** `number | number[] | undefined`

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Mark point

Mark point configuration; defines mark points based on selected data, including their position, format, style, etc.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Mark point selector, used to select data points.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select data items by dimension field value; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Implements complex data filtering logic using AI-generated JavaScript code

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, or complex conditions.

Key capabilities:

\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data manipulation

\- Executes safely in the browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environments; fallback will be used in Node.js environments

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart animated filter configuration

Implements filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code

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

"Highlight the bar with the highest profit rate in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (access via \_ or R)

\- Input parameters: data (array), where each item contains a \_\_row\_index field representing the row number

\- Must return an array of objects combining row indices and fields: Array<{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, and field represents the field to be highlighted

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field for data items with sales greater than 1000

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

:::note{title=Description}
Fallback solution when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select data items by dimension field value; supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Animated filtering execution result (runtime field)

Written during the prepare() phase, read-only at runtime

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
'Annotation Text'

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
Text alignment; generally, setting it to 'right' displays the text to the left of the mark point, ensuring it remains within the visible area of the chart.

It is recommended to set it to 'right' to ensure the text is on the left side of the mark point.

right: Text is on the left of the mark point, aligned with its right edge.

left: Text is on the right of the mark point, aligned with its left edge.

center: Text is at the center of the mark point.

:::

**Example**
'right': Text is on the left side of the mark point.

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally, setting it to 'top' displays the text at the bottom of the mark point, ensuring it remains within the visible area of the chart.

It is recommended to set it to 'top' to ensure the text is fully displayed within the visible area.

top: Text is at the bottom of the mark point, aligned with its top edge.

middle: Text is at the center of the mark point.

bottom: Text is at the top of the mark point, aligned with its bottom edge.

:::

**Example**
'top': Text is at the bottom of the mark point.

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visible

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
Background border corner radius

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
Pixel offset of the entire mark point in the Y direction. When the mark point is above the chart (larger values), a positive value is recommended; when below (smaller values), a negative value is recommended.

Negative values offset upwards; e.g., -10 moves the entire mark point component (including text and background) up by 10 pixels.

Positive values offset downwards; e.g., 10 moves the entire component down by 10 pixels.

:::

**Example**
offsetY: 5, Move the entire mark point down by 5 pixels.

### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Pixel offset of the entire mark point in the X direction. When the mark point is on the left side (start of category axis), a positive value is recommended; when on the right side (end), a negative value is recommended.

Negative values offset to the left; e.g., -10 moves the entire component left by 10 pixels.

Positive values offset to the right; e.g., 10 moves the entire component right by 10 pixels.

:::

**Example**
offsetX: 5, Move the entire mark point right by 5 pixels.

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Dimension value mark line, displayed vertically; allows setting position, style, etc.

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed X value used for vertical mark lines. If the category axis is on the X direction, enter a dimension value; if the numeric axis is on the X direction, enter a specific numeric value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Calculates the mark line value dynamically via AI-generated JavaScript code.

Suitable for scenarios requiring dynamic determination of mark line positions based on data, such as average, maximum, quantiles, or business lines.

Only supports browser environments (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Use the highest sales value as a mark line reference"

"Calculate average sales for a mark line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (access via \_ or R)

\- Input parameters: data (array)

\- Must return a single numeric value or string: number | string

\- Applicable scenarios: Animated values required for mark lines (horizontal or vertical lines)

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get maximum sales value as the mark line value

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for the mark line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile as the mark line

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

:::note{title=Description}
Fallback solution when code execution fails or the environment is not supported

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Animated filtering execution result (runtime field)

Written during the prepare() phase, read-only at runtime

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
'Annotation Text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position; position of the mark line's label (relative to the line).

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
Text alignment; generally no configuration needed.

It is recommended to set it to 'right' to ensure the text is on the left side of the mark line.

right: Text is on the left of the reference line, aligned with its right edge (for vertical lines).

left: Text is on the right of the reference line, aligned with its left edge (for vertical lines).

center: Text is at the center of the reference line (for vertical lines).

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally no configuration needed.

It is recommended to set it to 'top' to ensure the text is fully displayed within the visible area.

top: Text is at the bottom of the reference line, aligned with the top edge (for vertical lines).

middle: Text is at the center of the reference line (for vertical lines).

bottom: Text is at the top of the reference line, aligned with the bottom edge (for vertical lines).

:::

**Example**
'top'

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Line visible

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
Background visible

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
Background border corner radius

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
Numeric mark line (including mean, maximum, minimum lines, etc.), displayed horizontally; allows setting position, style, etc. For drawing mark lines corresponding to numeric values like the mean, use this configuration.

:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed Y value used for horizontal mark lines. If the category axis is on the Y direction, enter a dimension value; if the numeric axis is on the Y direction, enter a specific numeric value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Calculates the mark line value dynamically via AI-generated JavaScript code.

Suitable for scenarios requiring dynamic determination of mark line positions based on data, such as average, maximum, quantiles, or business lines.

Only supports browser environments (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Use the highest sales value as a mark line reference"

"Calculate average sales for a mark line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (access via \_ or R)

\- Input parameters: data (array)

\- Must return a single numeric value or string: number | string

\- Applicable scenarios: Animated values required for mark lines (horizontal or vertical lines)

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get maximum sales value as the mark line value

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for the mark line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile as the mark line

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

:::note{title=Description}
Fallback solution when code execution fails or the environment is not supported

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=Description}
Animated filtering execution result (runtime field)

Written during the prepare() phase, read-only at runtime

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
'Annotation Text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position

Position of the mark line's label (relative to the line).

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
Text alignment; generally no configuration needed.

It is recommended to set it to 'right' to ensure the text is on the left side of the mark line.

right: Text is on the left of the reference line, aligned with its right edge (at the end of horizontal mark lines).

left: Text is on the right of the reference line, aligned with its left edge (at the end of horizontal mark lines).

center: Text is at the center of the reference line (at the end of horizontal mark lines).

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally no configuration needed.

It is recommended to set it to 'top' to ensure the text is fully displayed within the visible area.

top: Text is at the bottom of the reference line, aligned with its top edge (for horizontal lines).

middle: Text is at the center of the reference line (for horizontal lines).

bottom: Text is at the top of the reference line, aligned with its bottom edge (for horizontal lines).

:::

**Example**
'top'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visible

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
Background border corner radius

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
Line visible

Line visible

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
Whether to enable the function of splitting the main line into two segments.

:::

#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Main color for the portion greater than the mark value.

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Main color for the portion less than the mark value.

:::

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Mark Area

Mark area configuration; defines the mark area based on selected data, including position, style, etc.

:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Depends on selected data for data marking.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field, the ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the dimension field value is in "value"

\- not in: Select data items where the dimension field value is not in "value"

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select data items by dimension field value; supports arrays

:::

### text

**Type:** `string | string[] | undefined`

:::note{title=Description}
Annotation text

:::

**Example**
'Annotation Text'

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
Text alignment; generally, setting it to 'right' displays the text in the middle of the mark area, ensuring it remains within the visible area.

It is recommended to set it to 'center' to ensure the text is in the middle of the mark area.

right: Text is on the left of the mark area, aligned with its right edge.

left: Text is on the right of the mark area, aligned with its left edge.

center: Text is at the center of the mark area.

:::

**Example**
'center': Text is in the middle of the mark area.

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment; generally, setting it to 'top' displays the text at the bottom of the mark area, ensuring it remains within the visible area.

It is recommended to set it to 'top' to ensure the text is fully displayed within the visible area.

top: Text is at the bottom of the mark area, aligned with its top edge.

middle: Text is at the center of the mark area.

bottom: Text is at the top of the mark area, aligned with its bottom edge.

:::

**Example**
'top': Text is at the bottom of the mark area.

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Background visible

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
Background border corner radius

Background border corner radius

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
Mark area color

:::

**Example**
'red'

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Mark area color opacity

:::

**Example**
0.5

### areaBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Mark area border color

:::

**Example**
'red'

### areaBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Mark area border width

:::

**Example**
2

### areaBorderRadius

**Type:** `number | undefined`

:::note{title=Description}
Mark area border corner radius

:::

**Example**
4

### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Mark area border line style

:::

**Example**
\[2, 2]

### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Mark area margin

:::

**Example**
0

## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
Whether to enable the dimension linkage function when the chart is in pivot mode or when measures are combined.

When hovering over a dimension value, highlight data with the same dimension value in other charts.

Pivot chart dimension linkage configuration

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether to enable pivot chart dimension linkage.

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display tooltips for all sub-charts corresponding to dimensions.

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the label corresponding to the crosshair.

:::

## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Language

Chart language configuration; supports 'zh-CN' and 'en-US'. Additionally, the intl.setLocale('zh-CN') method can be called to set the language.

:::
