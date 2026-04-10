# ColumnPercent

:::info{title=Recommended}

* Recommended field configuration: `1` measure(s), `2` dimension(s)

* Supports Data Reshape: at least `1` measure(s), `0` dimension(s)

:::

:::info{title=Encoding Mapping}
Percent Column Chart supports the following visual channels:

`xAxis`  : x-axis channel, supports `multiple dimensions`, mapped to the x-axis by dimension value

`yAxis`  : y-axis channel, supports `multiple measures`, mapped to the y-axis by measure value

`detail` : detail channel, supports `multiple dimensions`, used to display more granular data within the same color series

`color`  : color channel, supports `multiple dimensions` or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`: tooltip channel, supports `multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`  : label channel, supports `multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Description}
Percent Column Chart, suitable for scenarios showing the proportional relationship of each category. The Y-axis displays data proportions in percentage format.

Applicable scenarios:

* Proportional comparison of data across different categories

* Composition analysis of multi-dimensional data

* Proportional change trends in time series

:::

:::warning{title=Warning}
Data requirements:

* At least 1 measure field

* The first dimension will be placed on the X-axis. The remaining dimensions will be merged with the measure names (when multiple measures exist) and displayed as legend items.

* All measures are automatically merged into one measure

Features enabled by default:

* Legend, axes, percent labels, tooltips, and proportion calculation are enabled by default.

:::

## chartType

**Type:** `"columnPercent"`

:::note{title=Description}
Percent Column Chart

Percent Column Chart, displaying the proportional relationship between categories in percentage format.

:::

**Example**
'columnPercent'

## dataset

**Type:** `Record[]`

:::note{title=Description}
Dataset

A TidyData-compliant and already aggregated dataset used to define the chart's data source and structure. User-input datasets do not require manual processing as VSeed features powerful data reshaping capabilities and will automatically reshape the data. Percent Column Chart data will eventually be converted to 2 dimensions and 1 measure.

:::

**Example**
\[{category:'A', value:30}, {category:'B', value:70}]

## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Description}
Dimensions

The first dimension is mapped to the X-axis; the remaining dimensions are merged with measure names (when multiple measures exist) and displayed as legend items.

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

* xAxis: supports mapping multiple dimensions to the x-axis

* color: supports mapping multiple dimensions to the color channel

* detail: supports mapping multiple dimensions to the detail channel

* tooltip: supports mapping multiple dimensions to the tooltip channel

* label: supports mapping multiple dimensions to the label channel

* row: supports mapping multiple dimensions to the row channel

* column: supports mapping multiple dimensions to the column channel

:::

## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title=Description}
Measures

Percent Column Chart measures are automatically merged into one measure and mapped to the Y-axis. When multiple measures exist, the measure names will be merged with the remaining dimensions and displayed as legend items.

:::

**Example**
\[{id: 'value', alias: 'Value Proportion', format: 'percent'}]

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

\- locale=zh-CN: 749740.264 → 749.7万

\- locale=en-US: 749740.264 → 749.7K

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

* 100000 converts to 100,000, ratio:1, symbol:""
* 100000 converts to 100K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**

* 100000 converts to 100,000, ratio:1, symbol:""
* 100000 converts to 100K, ratio:1000, symbol:"K"

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

* 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
* 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**

* 1234.5678 converts to 1000, significantDigits:1
* 1234.5678 converts to 1200, significantDigits:2
* 1234.5678 converts to 1230, significantDigits:3
* 1234.5678 converts to 1234, significantDigits:4
* 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**

* 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
* 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

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

* 100000 converts to 100,000, ratio:1, symbol:""
* 100000 converts to 100K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**

* 100000 converts to 100,000, ratio:1, symbol:""
* 100000 converts to 100K, ratio:1000, symbol:"K"

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

* 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
* 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**

* 1234.5678 converts to 1000, significantDigits:1
* 1234.5678 converts to 1200, significantDigits:2
* 1234.5678 converts to 1230, significantDigits:3
* 1234.5678 converts to 1234, significantDigits:4
* 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**

* 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
* 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title=Description}
Channel to which the measure is mapped

* yAxis: measure mapped to the y-axis

* detail: measure mapped to the detail channel

* color: measure mapped to the color channel

* label: measure mapped to the label channel

* tooltip: measure mapped to the tooltip channel

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
Pagination configuration, used to specify the field name for pagination, which must be a dimension.

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
Chart background color. Defaults to a transparent background. Background color can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)')

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
Whether labels display measure values as a percentage.

In multi-measure scenarios, there is no concern about conflicting values, because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

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

* 100000 converts to 100,000, ratio:1, symbol:""
* 100000 converts to 100K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**

* 100000 converts to 100,000, ratio:1, symbol:""
* 100000 converts to 100K, ratio:1000, symbol:"K"

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

* 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
* 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**

* 1234.5678 converts to 1000, significantDigits:1
* 1234.5678 converts to 1200, significantDigits:2
* 1234.5678 converts to 1230, significantDigits:3
* 1234.5678 converts to 1234, significantDigits:4
* 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**

* 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
* 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

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
Whether labels automatically invert font color based on the graphical element's color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label overlap avoidance function is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filtering; the default relationship between selectors is OR

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; refers to the ID of a specific dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executed by AI-generated code)

Implement complex data filtering logic using AI-generated JavaScript code

Core Capabilities:

* Supports arbitrarily complex data filtering conditions

* Use built-in utility functions for data manipulation

* Secure execution in the browser environment (Web Worker sandbox)

Environment Requirements: Only supports browser environments; Node.js environments will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration

Implement filtering of chart markers (bars, points, etc.) using AI-generated JavaScript code

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

* Can only use built-in utility functions (accessed via \_ or R)

* Input parameters: data (array), where each item contains a \_\_row\_index field representing the row number

* Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

* \_\_row\_index represents the original data item's row number, and field represents the field to be highlighted

* Prohibited: eval, Function, asynchronous operations, DOM API, network requests

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
Fallback plan when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field; refers to the ID of a specific dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

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
Legend configuration, used to define the chart's legend, including position, format, style, etc.

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
Whether legend border is enabled

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
Maximum number of columns or rows for the legend when there are many legend items

If the position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed

If the position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows displayed

:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip configuration, used to define the chart's tooltips, including position, format, style, etc.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether tooltip functionality is enabled

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush

Brush configuration, used to enable/disable brush selection capabilities.

Chart brush configuration

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

Defines the shape and selection direction of the brush box

* `rect`: Rectangular selection, allows simultaneous selection in both X and Y directions

* `polygon`: Polygonal selection, allows for multi-point arbitrary polygon selection

* `x`: X-axis selection, selection is restricted to the X-axis direction, Y-axis is unrestricted

* `y`: Y-axis selection, selection is restricted to the Y-axis direction, X-axis is unrestricted

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Brush mode, single or multiple selection

Defines the selection mode

* `single`: Single selection mode, only one brush box can exist at a time

* `multiple`: Multiple selection mode, multiple brush boxes can exist simultaneously

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the selection box when brush ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for selected data items

Defines the style of data points within the selected brush area

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of selected data points, range 0-1

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

Defines the style of data points outside the selected brush area

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of unselected data points, range 0-1

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
X-axis, category axis. X-axis configuration, used to define the chart's X-axis, including position, format, style, etc.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is reversed; only effective for numeric axes

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the display of the 0 value on the axis. If min and max are configured, this setting is ignored. Only effective for numeric axes.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}
Axis labels, auto-hide. If two labels overlap (interval is smaller than autoHideGap), the label causing the overlap is automatically hidden. Only effective for category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}
Axis labels, auto-hide interval. If the interval between two text labels is smaller than autoHideGap, the label causing the overlap is automatically hidden. Only effective for category axes.

When autoHide is enabled, autoHide is used, set on autoHideSeparation

When autoHide is disabled, sampling is used, set on minGap

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
Axis labels, auto-rotate. When label width exceeds axis length, automatically rotate labels. Only effective for category axes.

:::

### labelAutoRotateAngle

**Type:** `number[] | undefined`

:::note{title=Description}
Axis labels, auto-rotation angle range. When auto-rotation is enabled, this defines the label rotation angle range. Only effective for category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Axis labels, auto-limit length. When label width exceeds axis length, redundant text is represented by an ellipsis. Full label is visible on hover. Only effective for category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
Axis labels, maximum auto-limited length. When label text length exceeds this value, redundant text is represented by an ellipsis. Full label is visible on hover. Only effective for category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
X-axis scale labels

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
Title text, defaults to the field configuration

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
Y-axis, numeric axis. Y-axis configuration, used to define the chart's Y-axis, including position, format, style, etc.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Minimum value of the axis; higher priority than `nice` and `zero`

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Maximum value of the axis; higher priority than `nice` and `zero`. If set to true, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic axis; only effective for numeric axes

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
Base of the logarithmic axis; only effective for numeric axes

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust the axis scale intervals to make labels more readable. This setting is ignored if `min` and `max` are configured. Only effective for numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is reversed; only effective for numeric axes

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the display of the 0 value on the axis. If min and max are configured, this setting is ignored. Only effective for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format numeric axis labels. Only effective for numeric axes. When `autoFormat` is true, `numFormat` configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Number formatting for numeric axes. Only effective for numeric axes. Lower priority than `autoFormat`.

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

* 100000 converts to 100,000, ratio:1, symbol:""
* 100000 converts to 100K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**

* 100000 converts to 100,000, ratio:1, symbol:""
* 100000 converts to 100K, ratio:1000, symbol:"K"

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

* 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
* 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits

:::

**Example**

* 1234.5678 converts to 1000, significantDigits:1
* 1234.5678 converts to 1200, significantDigits:2
* 1234.5678 converts to 1230, significantDigits:3
* 1234.5678 converts to 1234, significantDigits:4
* 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
* 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority

:::

**Example**

* 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
* 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Y-axis scale labels

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
Title text, defaults to the field configuration

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
Vertical tooltip configuration, used to define the chart's vertical tooltip, including color, label style, etc.

Crosshair rectangle area configuration, a configuration type used to display a crosshair rectangle area in the chart.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the crosshair rectangle area

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
Whether to display the crosshair rectangle area label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair rectangle area label background color

:::

## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=Description}
Stacking corner radius for Percent Column Chart

:::

## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}
Maximum width of the bars, can be a pixel value or a percentage string.

:::

## sort

**Type:** `Sort | undefined`

:::note{title=Description}
X-axis sort configuration, supports sorting by dimensions or measures, as well as custom sort order.

Category axis sort configuration, supports sorting by dimensions or measures, as well as custom sort order.

:::

**Example**
sort: {
orderBy: 'profit',
order: 'asc',
}
sort: {
customOrder:\['2019', '2020', '2021']
}

* order:'asc'
* orderBy:'date'
  or
* customOrder:\['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sort order, can be 'asc' or 'desc'

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
Field to sort by, can be a dimension ID or a measure ID

:::

**Example**

* orderBy:'date'
* orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order, applied directly to the category axis

:::

## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Legend sort configuration, supports sorting by dimensions or measures, as well as custom sort order.

Legend sort configuration, supports sorting by dimensions or measures, as well as custom sort order; the sort array follows the left-to-right or top-to-bottom order.

:::

**Example**
sortLegend: {
orderBy: 'profit',
order: 'asc',
}
sortLegend: {
customOrder:\['2019', '2020', '2021']
}

* order:'asc'
* orderBy:'date'
  or
* customOrder:\['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sort order, can be 'asc' or 'desc'

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
Field to sort by, can be a dimension ID or a measure ID

:::

**Example**

* orderBy:'date'
* orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order, applied directly to the legend; ascending is left-to-right or top-to-bottom, descending is right-to-left or bottom-to-top.

:::

## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Theme is a low-priority configuration functionality that includes common configurations shared by all chart types and those shared within a single chart type category. Built-in 'light' and 'dark' themes are provided, and users can customize themes via Builder.

Theme

Built-in 'light' and 'dark' themes are available; new themes can be customized via `registerTheme`.

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
Graphical rectangle (bar) style, used to define the style of graphical rectangles in the chart, including color, borders, corner radius, etc.

Supports global style or conditional style configuration.

Data Filter

If `selector` is configured, it provides four types of data matching capabilities: numerical selector, local data selector, conditional dimension selector, and conditional measure selector.

If `selector` is not configured, the style applies globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

If `selector` is configured, it provides four types of data matching capabilities: numerical selector, local data selector, conditional dimension selector, and conditional measure selector.

If `selector` is not configured, the style applies globally.

:::

**Example**
Numerical Selector
selector = "tool"
selector = \["tool", "book"]
selector = 100
selector = \[100, 200]

Local Data Selector
selector = { profit: 100 }
selector = \[{ profit: 100 }, { profit: 200 }]

Conditional Dimension Selector
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

Conditional Measure Selector
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
Dimension field; refers to the ID of a specific dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executed by AI-generated code)

Implement complex data filtering logic using AI-generated JavaScript code.

Applicable to Top N, statistical analysis, complex conditions, and other scenarios where static selectors are difficult to express.

Core Capabilities:

* Supports arbitrarily complex data filtering conditions.

* Use built-in utility functions for data manipulation.

* Secure execution in the browser environment (Web Worker sandbox).

Environment Requirements: Only supports browser environments; Node.js environments will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration

Implement filtering of chart markers (bars, points, etc.) using AI-generated JavaScript code.

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

* Can only use built-in utility functions (accessed via \_ or R)

* Input parameters: data (array), where each item contains a \_\_row\_index field representing the row number

* Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

* \_\_row\_index represents the original data item's row number, and field represents the field to be highlighted

* Prohibited: eval, Function, asynchronous operations, DOM API, network requests

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
Fallback plan when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field; refers to the ID of a specific dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

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

### barVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether graphical rectangles (bars) are visible

:::

### barColor

**Type:** `string | undefined`

:::note{title=Description}
Graphical rectangle (bar) color

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Graphical rectangle (bar) color opacity

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Graphical rectangle (bar) border color

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Graphical rectangle (bar) border width

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Graphical rectangle (bar) border style

:::

**Example**
solid

dashed

dotted

### barBorderOpacity

**Type:** `number | undefined`

:::note{title=Description}
Graphical rectangle (bar) corner radius

Graphical rectangle (bar) stroke opacity

:::

**Example**
4

\[0, 0, 10, 10]

### barRadius

**Type:** `number | number[] | undefined`

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Annotation point configuration; defines markers on data points based on selected data, including position, format, style, etc.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data point selector, used to select data points for annotation.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; refers to the ID of a specific dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executed by AI-generated code)

Implement complex data filtering logic using AI-generated JavaScript code.

Applicable to Top N, statistical analysis, complex conditions, and other scenarios where static selectors are difficult to express.

Core Capabilities:

* Supports arbitrarily complex data filtering conditions.

* Use built-in utility functions for data manipulation.

* Secure execution in the browser environment (Web Worker sandbox).

Environment Requirements: Only supports browser environments; Node.js environments will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart dynamic filter configuration

Implement filtering of chart markers (bars, points, etc.) using AI-generated JavaScript code.

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

* Can only use built-in utility functions (accessed via \_ or R)

* Input parameters: data (array), where each item contains a \_\_row\_index field representing the row number

* Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

* \_\_row\_index represents the original data item's row number, and field represents the field to be highlighted

* Prohibited: eval, Function, asynchronous operations, DOM API, network requests

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
Fallback plan when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field; refers to the ID of a specific dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

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
Text alignment. Generally, if set to 'right', text will appear on the left side of the annotation point to ensure visibility in the chart.

Recommended setting is 'right' to ensure the text remains on the left side of the point.

right: Text is on the left side of the point; the text's right edge aligns with the point.

left: Text is on the right side of the point; the text's left edge aligns with the point.

center: Text is centered on the point; the text's center aligns with the point.

:::

**Example**
'right' Text is on the left side of the point.

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. Generally, if set to 'top', text will appear at the bottom of the point to ensure visibility in the chart.

Recommended setting is 'top' to ensure the full text is visible.

top: Text is below the point; the text's top edge aligns with the point.

middle: Text is centered on the point; the text's center aligns with the point.

bottom: Text is above the point; the text's bottom edge aligns with the point.

:::

**Example**
'top' Text is below the point.

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the text background is visible

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
Overall offset in the Y direction for the annotation point component. Set to a positive value if the point is at the top of the chart (large values) or negative if it's at the bottom (small values).

Negative values shift the entire component (text, background) upwards. For example, -10 shifts it up by 10 pixels.

Positive values shift the entire component downwards. For example, 10 shifts it down by 10 pixels.

:::

**Example**
offsetY: 5 shifts the entire component down by 5 pixels.

### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Overall offset in the X direction for the annotation point component. Set to a positive value if the point is on the left side (category start) or negative if it's on the right side (category end).

Negative values shift the entire component (text, background) to the left. For example, -10 shifts it left by 10 pixels.

Positive values shift the entire component to the right. For example, 10 shifts it right by 10 pixels.

:::

**Example**
offsetX: 5 shifts the entire component to the right by 5 pixels.

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Dimension value annotation line, displayed vertically. Position, style, etc., can be configured.

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed X-value for the vertical annotation line. For category axes on the X-axis, enter a dimension value; for numeric axes, enter a specific number.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executed by AI-generated code)

Dynamically calculate the annotation line value using AI-generated JavaScript code.

Applicable for determining annotation line positions based on data, such as average, max, quantile, or target values.

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
"Get the highest sales value as a reference for the annotation line."

"Calculate the average sales value for the annotation line."

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

* Can only use built-in utility functions (accessed via \_ or R)

* Input parameters: data (array)

* Must return a single numerical value or string: number | string

* Applicable Scenarios: Dynamic values required for annotation lines (horizontal, vertical).

* Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales value for the annotation line

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for the annotation line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile for the annotation line

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
Fallback plan when code execution fails or the environment is not supported

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
Text position; the position of the annotation line label relative to the line.

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
Text alignment. Generally, no manual setting is required.

Recommended setting is 'right' to ensure the text remains on the left side of the annotation line.

right: Text is on the left side of the line; the text's right edge aligns with the vertical line.

left: Text is on the right side of the line; the text's left edge aligns with the vertical line.

center: Text is centered on the line; the text's center aligns with the vertical line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. Generally, no manual setting is required.

Recommended setting is 'top' to ensure the full text remains visible in the chart.

top: Text is at the bottom of the line; the text's top edge aligns with the end of the vertical line.

middle: Text is centered on the line; the text's center aligns with the end of the vertical line.

bottom: Text is at the top of the line; the text's bottom edge aligns with the end of the vertical line.

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
Whether text background is visible

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
Numerical annotation line (including average, maximum, minimum lines, etc.), displayed horizontally. Position, style, etc., can be configured. Use this configuration for drawing annotation lines corresponding to values like average lines.

:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed Y-value for the horizontal annotation line. For category axes on the Y-axis, enter a dimension value; for numeric axes, enter a specific number.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (executed by AI-generated code)

Dynamically calculate the annotation line value using AI-generated JavaScript code.

Applicable for determining annotation line positions based on data, such as average, max, quantile, or target values.

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
"Get the highest sales value as a reference for the annotation line."

"Calculate the average sales value for the annotation line."

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

* Can only use built-in utility functions (accessed via \_ or R)

* Input parameters: data (array)

* Must return a single numerical value or string: number | string

* Applicable Scenarios: Dynamic values required for annotation lines (horizontal, vertical).

* Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales value for the annotation line

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for the annotation line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile for the annotation line

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
Fallback plan when code execution fails or the environment is not supported

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

The position of the annotation line label (relative to the line).

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
Text alignment. Generally, no manual setting is required.

Recommended setting is 'right' to ensure the text remains on the left side of the annotation line.

right: Text is on the left side of the line; the text's right edge aligns with the (horizontal) annotation line's end point.

left: Text is on the right side of the line; the text's left edge aligns with the (horizontal) annotation line's end point.

center: Text is centered on the line; the text's center aligns with the (horizontal) annotation line's end point.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. Generally, no manual setting is required.

Recommended setting is 'top' to ensure the full text is visible.

top: Text is at the bottom of the line; the text's top edge aligns with the (horizontal) annotation line.

middle: Text is centered on the line; the text's center aligns with the (horizontal) annotation line.

bottom: Text is at the top of the line; the text's bottom edge aligns with the (horizontal) annotation line.

:::

**Example**
'top'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether text background is visible

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
Whether the line is visible

Line is visible

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
Whether to enable the function to split the main line into two segments.

:::

#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Primary color for segments greater than the annotation value.

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Primary color for segments smaller than the annotation value.

:::

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Annotation area configuration; defines marker areas on the chart based on selected data, including their position, style, etc.

:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Marks data based on selected items.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; refers to the ID of a specific dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

* in: Select data items where the dimension field value is in the specified value list

* not in: Select data items where the dimension field value is NOT in the specified value list

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item; supports arrays

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
Text alignment. Generally, if set to 'right', text will appear in the middle of the annotation area, ensuring visibility in the chart.

Recommended setting is 'center' to ensure the text remains centered within the annotation area.

right: Text is on the left side of the annotation area; the text's right edge aligns with the area.

left: Text is on the right side of the annotation area; the text's left edge aligns with the area.

center: Text is centered within the area; the text's center aligns with the area.

:::

**Example**
'center' Text is centered within the area.

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. Generally, if set to 'top', text will appear at the bottom of the annotation area to ensure visibility in the chart.

Recommended setting is 'top' to ensure the full text is visible.

top: Text is at the bottom of the area; the text's top edge aligns with the area.

middle: Text is centered within the area; the text's center aligns with the area.

bottom: Text is at the top of the area; the text's bottom edge aligns with the area.

:::

**Example**
'top' Text is at the bottom of the area.

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
Annotation area border corner radius

:::

**Example**
4

### areaLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Annotation area border line style

:::

**Example**
\[2, 2]

### outerPadding

**Type:** `number | undefined`

:::note{title=Description}
Outer padding of the annotation area

:::

**Example**
0

## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
Whether to enable dimension linkage in pivot charts or measure combinations.

When hovering over a dimension value, links and highlights data with the same dimension value in other charts.

Pivot chart dimension linkage configuration

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether to enable pivot chart dimension linkage

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show tooltips for all dimensions' sub-charts

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show the label for the corresponding crosshair

:::

## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Chart language configuration; supports 'zh-CN' and 'en-US'. You can also call `intl.setLocale('zh-CN')` to set the language.

:::
