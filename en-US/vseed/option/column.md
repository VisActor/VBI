# Column

:::info\{title=Recommended}
\- Recommended field configuration: `1` measure(s), `2` dimension(s)

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info\{title=Encoding Mapping}
The Bar Chart supports the following visual channels:

`xAxis`  : x-axis channel, supports`multiple dimensions`, mapped to the x-axis by dimension value

`yAxis`  : y-axis channel, supports`multiple measures`, mapped to the y-axis by measure value

`detail` : Detail channel, supports`multiple dimensions`, used when displaying finer-grained data under the same color series

`color`  : color channel, supports`multiple dimensions`or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports`multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports`multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note\{title=Description}
Column Chart, suitable for vertical data comparison scenarios, where the X-axis is the category axis (categorical data), the Y-axis is the numeric axis (continuous data), and bars are arranged vertically

Applicable scenarios:

\- When data item names are short

\- When visual comparison of values across different categories is needed

\- Displaying trends in time series data

:::

:::warning\{title=Warning}
Data requirements:

\- at least 1 numeric field

\- The first dimension is placed on the X-axis; other dimensions will be merged with measure names (when multiple measures exist) to be displayed as legend items

\- All measures are automatically merged into one measure

Features enabled by default:

\- legend, axes, data labels, and tooltips are enabled by default

:::

## chartType

**Type:** `"column"`

:::note\{title=Description}
Column Chart, suitable for vertical data comparison scenarios, where the X-axis is the category axis (categorical data), the Y-axis is the numeric axis (continuous data), and bars are arranged vertically

:::

**Example**
'column'

## dataset

**Type:** `Record[]`

:::note\{title=Description}
TidyData-compliant and already aggregated dataset used to define the chart's data source and structure. User-input datasets do not need pre-processing; VSeed includes powerful data reshape functionality that automatically converts data for the Column Chart into 2 dimensions and 1 measure.

:::

**Example**
\[\{category:'A', value:100}, \{category:'B', value:200}]

## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note\{title=Description}
The first dimension of the Column Chart is mapped to the X-axis; other dimensions will be merged with measure names (when multiple measures exist) to be displayed as legend items.

:::

**Example**
\[\{id: "category", alias: "Category"}]

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
All measures of the Column Chart are automatically merged into one measure and mapped to the Y-axis. When multiple measures exist, measure names will be merged with other dimensions to be displayed as legend items.

:::

**Example**
\[\{id: "value", alias: "Value"}]

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

\- locale=zh-CN: 749740.264 → 74.45万

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

Pagination configuration, used to specify the field name for pagination, which must be a dimension.

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
Chart background color. The background color can be a color string (default is transparent), such as 'red' or 'blue', or a hex, rgb, or rgba value like '#ff0000' or 'rgba(255,0,0,0.5)'.

:::

## color

**Type:** `Color | undefined`

:::note\{title=Description}
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
Whether labels display the percentage of measure values

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
Whether labels automatically invert font color based on the element color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note\{title=Description}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether label anti-overlap functionality is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Label filtering, default relationship between selectors is Or

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field, the ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Value of the dimension field, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Animated filter (AI-generated code execution)

Implements complex data filtering logic via AI-generated JavaScript code

Core capabilities:

\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data operations

\- Safely executes in the browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environment; Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart animated filter configuration

Implements filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales > 1000"

"Highlight the bar with the highest profit rate in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (accessed via \_ or R)

\- Input parameter: data (array), each item contains a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, field represents the field to be highlighted

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the 'sales' field for items with sales > 1000

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight items with the highest profit rate in each region

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

Highlight items meeting multiple filtering conditions

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
Fallback solution when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field, the ID of a dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Value of the dimension field, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Animated filter execution result (runtime field)

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

:::note\{title=Description}
Legend configuration, used to define the chart legend, including position, format, style, etc.

:::

### enable

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether legend functionality is enabled

:::

**Example**
enable: true

### border

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the legend border is enabled

:::

:::warning\{title=Warning}
Only effective for discrete legends

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
legendfontColor

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
Only effective for discrete legends

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
Maximum number of columns or rows when a large number of legends exist

If the position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of displayed columns

If the position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of displayed rows

:::

:::warning\{title=Warning}
Only effective for discrete legends

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note\{title=Description}
Tooltip configuration, used to define chart tooltips, including position, format, style, etc.

:::

### enable

**Type:** `false | true`

:::note\{title=Description}
Whether tooltip functionality is enabled

:::

## brush

**Type:** `Brush | undefined`

:::note\{title=Description}
Brush Selection

Brush selection configuration, used to enable/disable brush selection capabilities

Chart brush selection configuration

:::

### enable

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to enable brush selection

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note\{title=Description}
Brush type

Defines the shape and direction of the brush selection box

\- `rect`: Rectangular selection; selection can be performed in both X and Y axis directions simultaneously

\- `polygon`: Polygonal selection; draw arbitrary polygons by clicking multiple points for selection

\- `x`: X-axis selection; selection is performed only along the X-axis, with no restriction on the Y-axis

\- `y`: Y-axis selection; selection is performed only along the Y-axis, with no restriction on the X-axis

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note\{title=Description}
Brush selection mode: single or multiple

Defines the brush selection mode

\- `single`: Single-select mode; only one selection box can exist at a time

\- `multiple`: Multi-select mode; multiple selection boxes can exist simultaneously

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to clear the selection box when brushing ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
Style for selected data

Defines the style of selected data points

:::

#### opacity

**Type:** `number | undefined`

:::note\{title=Description}
Opacity

Opacity of selected data points, range 0-1

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
Style for unselected data

Defines the style of unselected data points

:::

#### opacity

**Type:** `number | undefined`

:::note\{title=Description}
Opacity

Opacity of unselected data points, range 0-1

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
X-axis, category axis, X-axis configuration; defines the X-axis of the chart, including its position, format, style, etc.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is visible

:::

### inverse

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is displayed in reverse; only effective for numeric axes

:::

### zero

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to force display of 0 value on axes; this configuration is ignored if min and max are set; only effective for numeric axes

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note\{title=Description}
Axis label, auto-hide; if two labels overlap (interval less than autoHideGap), the overlapping label is automatically hidden. Only effective for category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note\{title=Description}
Axis label, auto-hide interval; if the interval between two text labels is less than autoHideGap, the overlapping label is automatically hidden. Only effective for category axes.

When autoHide is enabled, use autoHide, configured on autoHideSeparation

When autoHide is disabled, use sampling, configured on minGap

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note\{title=Description}
Axis label, auto-rotate; labels rotate automatically when their width exceeds the axis length. Only effective for category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note\{title=Description}
Axis label, auto-rotate angle range; the range of label rotation angles when auto-rotation is enabled. Only effective for category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note\{title=Description}
Axis label, auto-limit length; when label width exceeds the axis length, the excess is indicated by ellipses, and the full label is visible on hover. Only effective for category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note\{title=Description}
Axis label, maximum length for auto-limiting; when label text length exceeds the maximum length, the excess is indicated by ellipses, and the full label is visible on hover. Only effective for category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note\{title=Description}
X-axis tick label

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the label is visible

:::

#### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
LabelColor

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
Whether the axis line is visible

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
Whether the tick is visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the tick points inward

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
Whether the title is visible

:::

#### titleText

**Type:** `string | undefined`

:::note\{title=Description}
Title text, defaults to the field configuration

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
Y-axis, numeric axis, Y-axis configuration; defines the Y-axis of the chart, including its position, format, style, etc.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is visible

:::

### min

**Type:** `number | undefined`

:::note\{title=Description}
Axis minimum value; takes priority over nice and zero

:::

### max

**Type:** `number | boolean | undefined`

:::note\{title=Description}
Axis maximum value; takes priority over nice and zero; if set to true, the maximum is automatically calculated based on the data range

:::

### log

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to use a logarithmic axis; only effective for numeric axes

:::

### logBase

**Type:** `number | undefined`

:::note\{title=Description}
Logarithmic base; only effective for numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically adjust the axis scale interval for better readability. When 'min' and 'max' are configured, this setting is ignored. Only applies to numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is displayed in reverse; only effective for numeric axes

:::

### zero

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to force display of 0 value on axes; this configuration is ignored if min and max are set; only effective for numeric axes

:::

### autoFormat

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically format numeric axis labels. Only applies to numeric axes. When 'autoFormat' is true, the 'numFormat' configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note\{title=Description}
Number formatting for numeric axes. Only applies to numeric axes; priority is lower than 'autoFormat'.

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
X-axis tick label

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the label is visible

:::

#### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
LabelColor

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
Whether the axis line is visible

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
Whether the tick is visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the tick points inward

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
Whether the title is visible

:::

#### titleText

**Type:** `string | undefined`

:::note\{title=Description}
Title text, defaults to the field configuration

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

## sort

**Type:** `Sort | undefined`

:::note\{title=Description}
X-axis sort configuration, supports sorting based on dimensions or measures, and custom sort order

Category axis sort configuration, supports sorting based on dimensions or measures, and custom sort order

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
Sort order, optional values are 'asc' or 'desc'

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note\{title=Description}
The field the sort depends on, can be a dimension ID or a measure ID

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note\{title=Description}
Custom sort order, which will be applied directly to the category axis

:::

## sortLegend

**Type:** `SortLegend | undefined`

:::note\{title=Description}
Legend sort configuration, supports sorting based on dimensions or measures, and custom sort order

Legend sort configuration, supports sorting based on dimensions or measures, and custom sort order; the sort array follows an order from left to right or from top to bottom

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
Sort order, optional values are 'asc' or 'desc'

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note\{title=Description}
The field the sort depends on, can be a dimension ID or a measure ID

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note\{title=Description}
Custom sort order, which will be applied directly to the legend; ascending from left to right or top to bottom, descending from right to left or bottom to top

:::

## theme

**Type:** `Theme | undefined`

:::note\{title=Description}
Chart theme; the theme is a lower-priority functional configuration, containing general configurations shared by all chart types and specific configurations for individual chart categories. Built-in themes include light and dark, and users can customize themes through the Builder

Theme

Built-in light and dark themes; new themes can be defined via registerTheme

:::

**Example**
'dark'

'light'

'customThemeName'

### length

**Type:** `number`

### brand

**Type:** `brand`

## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note\{title=Description}
Vertical tooltip configuration, used to define the vertical tooltip of the chart, including color, label style, etc.

Crosshair rectangular area configuration, a type of configuration used to display a crosshair rectangular area in the chart.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to display the crosshair rectangular area

:::

### rectColor

**Type:** `string | undefined`

:::note\{title=Description}
Crosshair rectangular area color

:::

### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Crosshair rectangular area label color

:::

### labelVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to display the crosshair rectangular area label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Crosshair rectangular area label background color

:::

## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note\{title=Description}
Stacking corner radius for bar charts

:::

## barMaxWidth

**Type:** `string | number | undefined`

:::note\{title=Description}
Maximum width of the bar; can be a pixel value or a percentage string.

:::

## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note\{title=Description}
Rectangular primitive style; used to define the bar chart style, including color, borders, corner radius, etc.

Supports global style or conditional style configurations.

Data filter

If a selector is configured, it provides four types of data matching capabilities: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If no selector is configured, the style is applied globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Data selector

If a selector is configured, it provides four types of data matching capabilities: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If no selector is configured, the style is applied globally.

:::

**Example**
Value selector
selector = "tool"
selector = \["tool", "book"]
selector = 100
selector = \[100, 200]

Local data selector
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
Dimension field, the ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Value of the dimension field, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Animated filter (AI-generated code execution)

Implements complex data filtering logic via AI-generated JavaScript code

Suitable for Top N, statistical analysis, complex conditions, and other scenarios that are difficult to express with static selectors.

Core capabilities:

\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data operations

\- Safely executes in the browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environment; Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart animated filter configuration

Implements filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales > 1000"

"Highlight the bar with the highest profit rate in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (accessed via \_ or R)

\- Input parameters: data (array), each item contains a \_\_row\_index field representing the row number

\- Must return an array of row index and field pairs: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, and field represents the field to be highlighted

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the 'sales' field for items with sales > 1000

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight items with the highest profit rate in each region

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

Highlight items meeting multiple filtering conditions

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
Fallback solution when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field, the ID of a dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Value of the dimension field, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Animated filter execution result (runtime field)

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

:::note\{title=Description}
Whether the bar primitive (rectangle) is visible

:::

### barColor

**Type:** `string | undefined`

:::note\{title=Description}
Bar primitive (rectangle) color

:::

### barColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Bar primitive (rectangle) color opacity

:::

### barBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Bar primitive (rectangle) stroke color

:::

### barBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Bar primitive (rectangle) stroke width

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note\{title=Description}
Bar primitive (rectangle) stroke style

:::

**Example**
solid

dashed

dotted

### barBorderOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Bar primitive (rectangle) corner radius

Bar primitive (rectangle) stroke opacity

:::

**Example**
4

\[0, 0, 10, 10]

### barRadius

**Type:** `number | number[] | undefined`

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note\{title=Description}
Annotation point configuration; defines chart annotation points based on selected data, including their position, format, style, etc.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Annotation point selector; used to select data points.

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field, the ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Value of the dimension field, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Animated filter (AI-generated code execution)

Implements complex data filtering logic via AI-generated JavaScript code

Suitable for Top N, statistical analysis, complex conditions, and other scenarios that are difficult to express with static selectors.

Core capabilities:

\- Supports any complex data filtering conditions

\- Uses built-in utility functions for data operations

\- Safely executes in the browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environment; Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart animated filter configuration

Implements filtering of chart markers (bars, points, etc.) via AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales > 1000"

"Highlight the bar with the highest profit rate in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (accessed via \_ or R)

\- Input parameters: data (array), each item contains a \_\_row\_index field representing the row number

\- Must return an array of row index and field pairs: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, and field represents the field to be highlighted

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the 'sales' field for items with sales > 1000

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight items with the highest profit rate in each region

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

Highlight items meeting multiple filtering conditions

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
Fallback solution when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field, the ID of a dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Value of the dimension field, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Animated filter execution result (runtime field)

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
Text alignment; typically set to 'right' so text appears on the left side of the annotation point, ensuring it remains within the visible area of the chart.

Recommended set to 'right' to ensure the text is on the left side of the annotation point.

right: Text is on the left side of the annotation point; the right edge of the text aligns with the point.

left: Text is on the right side of the annotation point; the left edge of the text aligns with the point.

center: Text is centered on the annotation point; the center of the text aligns with the point.

:::

**Example**
'right' Text is on the left side of the annotation point.

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation point, ensuring it remains within the visible area of the chart.

Recommended set to 'top' to ensure the text is fully displayed within the chart's visible area.

top: Text is at the bottom of the annotation point; the top edge of the text aligns with the point.

middle: Text is centered vertically; the middle of the text aligns with the point.

bottom: Text is at the top of the annotation point; the bottom edge of the text aligns with the point.

:::

**Example**
'top' Text is at the bottom of the annotation point.

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Background visibility

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
Background stroke color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Background stroke width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Background corner radius

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
Pixel offset distance for the entire annotation point in the Y direction. When the point is above the chart (larger values), a positive value is recommended; when below (smaller values), a negative value is recommended.

A negative value shifts the entire component upward; for example, -10 shifts the text and background up by 10 pixels.

A positive value shifts the entire component downward; for example, 10 shifts the text and background down by 10 pixels.

:::

**Example**
offsetY: 5, Offset the entire annotation point downward by 5 pixels.

### offsetX

**Type:** `number | undefined`

:::note\{title=Description}
Pixel offset distance for the entire annotation point in the X direction. When the point is on the left side (start of the category axis), a positive value is recommended; when on the right (end of the axis), a negative value is recommended.

A negative value shifts the entire component to the left; for example, -10 shifts the text and background left by 10 pixels.

A positive value shifts the entire component to the right; for example, 10 shifts the text and background right by 10 pixels.

:::

**Example**
offsetX: 5, Offset the entire annotation point to the right by 5 pixels.

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note\{title=Description}
Dimension value annotation line; displayed vertically; allows setting the annotation line's position, style, etc.

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note\{title=Description}
Fixed X value; used for marking vertical lines. If the category axis is on the X-axis, enter a dimension value; if a numeric axis is on the X-axis, enter a specific number.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note\{title=Description}
Animated filter (AI-generated code execution)

Calculate the annotation line value dynamically via AI-generated JavaScript code.

Suitable for scenarios where the annotation line position needs to be determined dynamically based on data, such as averages, maximums, quantiles, business lines, etc.

Only supports browser environments (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Get the highest sales value as an annotation line reference"

"Calculate average sales for the annotation line"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (accessed via \_ or R)

\- Input parameters: data (array)

\- Must return a single numeric or string value: number | string

\- Use case: Dynamic values required for annotation lines (horizontal, vertical)

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales value as the annotation line value

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate the average for the annotation line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get the quantile for the annotation line

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate the goal value based on conditions

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
Fallback solution when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note\{title=Description}
Animated filter execution result (runtime field)

Written during the prepare() phase, read-only at runtime

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
Text position; annotation line label position (relative position of the label to the line).

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
Vertical text alignment; typically not required.

Recommended set to 'top' to ensure the text is fully displayed within the chart's visible area.

top: Text is at the bottom of the reference line; the top edge aligns with the endpoint of the (vertical) annotation line.

middle: Text is centered on the reference line; the center aligns with the endpoint of the (vertical) annotation line.

bottom: Text is at the top of the reference line; the bottom edge aligns with the endpoint of the (vertical) annotation line.

:::

**Example**
'top'

### lineVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Line visibility

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
Background visibility

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
Background stroke color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Background stroke width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Background corner radius

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
Measure value annotation line (including average, maximum, minimum, etc.); displayed horizontally; defines the position, style, etc. Use this for lines corresponding to numeric values like averages.

:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note\{title=Description}
Fixed Y value; used for marking horizontal lines. If the category axis is on the Y-axis, enter a dimension value; if a numeric axis is on the Y-axis, enter a specific number.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note\{title=Description}
Animated filter (AI-generated code execution)

Calculate the annotation line value dynamically via AI-generated JavaScript code.

Suitable for scenarios where the annotation line position needs to be determined dynamically based on data, such as averages, maximums, quantiles, business lines, etc.

Only supports browser environments (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Get the highest sales value as an annotation line reference"

"Calculate average sales for the annotation line"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (accessed via \_ or R)

\- Input parameters: data (array)

\- Must return a single numeric or string value: number | string

\- Use case: Dynamic values required for annotation lines (horizontal, vertical)

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales value as the annotation line value

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate the average for the annotation line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get the quantile for the annotation line

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate the goal value based on conditions

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
Fallback solution when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note\{title=Description}
Animated filter execution result (runtime field)

Written during the prepare() phase, read-only at runtime

:::

Get the quantile for the annotation line

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate the goal value based on conditions

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
Fallback solution when code execution fails or the environment is not supported.

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note\{title=Description}
Animated filter execution result (runtime field)

Written during the prepare() phase, read-only at runtime

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

Annotation line label position (relative position of the label to the line).

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
Text alignment; typically not required.

Recommended set to 'right' to ensure the text is on the left side of the annotation line.

right: Text is on the left side of the reference line, right-aligned (horizontally) with the endpoint of the annotation line.

left: Text is on the right side of the reference line, left-aligned (horizontally) with the endpoint of the annotation line.

center: Text is centered on the reference line, center-aligned (horizontally) with the endpoint of the annotation line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Vertical text alignment; typically not required.

Recommended set to 'top' to ensure the text is fully displayed within the chart's visible area.

top: Text is at the bottom of the reference line; the top edge aligns with the (horizontal) annotation line.

middle: Text is centered on the reference line; the center aligns with the (horizontal) annotation line.

bottom: Text is at the top of the reference line; the bottom edge aligns with the (horizontal) annotation line.

:::

**Example**
'top'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
background visibility

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
background stroke color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
background stroke width

background stroke width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
background corner radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
background padding

:::

**Example**
4

### lineVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Line visibility

Line visibility

:::

**Example**
true

### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Line color

:::::note\{title=Description}
Annotation area configuration; defines the chart's annotation area based on the selected data, including position, style, etc.

:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note\{title=Description}
Depends on selected data for data marking.

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field, the ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in the value

\- not in: Select data items where the value of the dimension field is not in the value

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Value of the dimension field, supports arrays

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
Text alignment; typically set to 'right' so text appears centered within the annotation area, ensuring it remains within the visible area of the chart.

Recommended set to 'center' to ensure the text is centered within the annotation area.

right: Text is on the left side of the annotation area; the right edge of the text aligns with the area.

left: Text is on the right side of the annotation area; the left edge of the text aligns with the area.

center: Text is centered in the annotation area; the center of the text aligns with the area.

:::

**Example**
'center' Text is centered in the annotation area

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Vertical text alignment; typically set to 'top' so text appears at the bottom of the annotation area, ensuring it remains within the visible area of the chart.

Recommended set to 'top' to ensure the text is fully displayed within the chart's visible area.

top: Text is at the bottom of the annotation area; the top edge aligns with the area.

middle: Text is centered in the annotation area; the center aligns with the area.

bottom: Text is at the top of the annotation area; the bottom edge aligns with the area.

:::

**Example**
'top' Text is at the bottom of the annotation area

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
background visibility

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
background stroke color

background stroke color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
background stroke width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
background corner radius

background corner radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
background padding

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
Annotation area stroke color

:::

**Example**
'red'

### areaBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area stroke width

:::

**Example**
2

### areaBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area corner radius

:::

**Example**
4

### areaLineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Line type for the annotation area border

:::
ined\`

:::note\{title=Description}
background visibility

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
background color

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
background stroke color

background stroke color

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
background stroke width

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
background corner radius

background corner radius

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
background padding

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
Annotation area stroke color

:::

**Example**
'red'

### areaBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area stroke width

:::

**Example**
2

### areaBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area corner radius

:::

**Example**
4

### areaLineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Line type for the annotation area border

:::

**Example**
\[2, 2]

### outerPadding

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area margin

:::

**Example**
0

## polynomialRegressionLine

**Type:** `PolynomialRegressionLine | PolynomialRegressionLine[] | undefined`

:::note\{title=Description}
Polynomial regression line

Polynomial regression line configuration, including the polynomial order, regression line style, etc.

:::

### enable

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to enable

:::

### color

**Type:** `string | undefined`

:::note\{title=Description}
Regression line color

Used to set the regression line color; if not set, the chart's primary color is used by default.

:::

### degree

**Type:** `number | undefined`

:::note\{title=Description}
Order of the polynomial regression

:::

### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Regression line width

Used to set the width of the regression line, in pixels; defaults to 1.

:::

### lineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Regression line style

Used to set the regression line style, such as solid or dashed; defaults to solid.

:::

### text

**Type:** `string | undefined`

:::note\{title=Description}
Regression line label text

Used to set the regression line label text; an empty string means no label is displayed.

:::

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

### confidenceIntervalVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to display the confidence interval

:::

### confidenceLevel

**Type:** `number | undefined`

:::note\{title=Description}
Confidence level setting for the confidence interval; defaults to 0.95 (95%).

:::

### confidenceIntervalColor

**Type:** `string | undefined`

:::note\{title=Description}
Confidence interval color

:::

### confidenceIntervalOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Confidence interval opacity

:::

**Example**
0.5

## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note\{title=Description}
Whether to enable the dimension linkage function when the chart has perspective enabled or measures are combined.

When hovering over certain dimension value(s), it highlights data with the same dimension value in other charts.

Perspective chart dimension linkage configuration.

:::

### enable

**Type:** `false | true`

:::note\{title=Description}
Whether to enable perspective chart dimension linkage.

:::

### showTooltip

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to display tooltips for all sub-charts corresponding to the dimensions.

:::

### showLabel

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to display the label corresponding to the crosshair.

:::

## locale

**Type:** `Locale | undefined`

:::note\{title=Description}
Chart language configuration; supports 'zh-CN' and 'en-US'. Additionally, the intl.setLocale('zh-CN') method can be called to set the language globally.

:::
