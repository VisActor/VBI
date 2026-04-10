# RaceLine

:::note{title=Description}
AnimatedLine Chart (Race Line Chart)

Suitable for showing data trends over time, connecting data points with line segments to form trend lines.

Applicable scenarios:

\- Display trend changes of multiple data series over time

\- Compare growth or decline patterns of different categories

\- Observe data fluctuations on the time dimension

:::

:::note{title=Note}
AnimatedLine Chart:

\- X-axis is usually a time axis or category axis, showing dimension values

\- Y-axis is a numeric axis, showing measure values

\- Supports controlling the time dimension through a player, animating the extension process of the line

:::

## chartType

**Type:** `"raceLine"`

:::note{title=Description}
AnimatedLine Chart, suitable for showing data trends over time

:::

## dataset

**Type:** `Record[]`

:::note{title=Description}
Data source

:::

## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Description}
Dimensions

:::

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
Measures

:::

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
Pagination Configuration

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

## player

**Type:** `Player | undefined`

:::note{title=Description}
Player configuration, used to specify the time dimension, a core configuration of the animated line chart.

Used to specify the play field name, which must be a dimension.

:::

:::warning{title=Warning}
This feature does not support chart types such as table, pivotTable, dualAxis, histogram, boxPlot, etc., and does not support use when measure combination or row/column pivot is enabled.

:::

### maxCount

**Type:** `number | false | undefined`

:::note{title=Description}
Maximum play count, data exceeding this number will be truncated, set to false for no limit.

:::

### interval

**Type:** `number | undefined`

:::note{title=Description}
Play interval, unit in ms.

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to auto-play.

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to loop play.

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Description}
Player position.

:::

### railColor

**Type:** `string | undefined`

:::note{title=Description}
Player progress bar track color.

:::

### trackColor

**Type:** `string | undefined`

:::note{title=Description}
Player progress bar progress color.

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title=Description}
Player progress bar slider color.

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Player progress bar slider border color.

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Player start button color.

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Player pause button color.

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Player backward button color.

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title=Description}
Player forward button color.

:::

## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Background color.

:::

## color

**Type:** `Color | undefined`

:::note{title=Description}
Color configuration.

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
Label Configuration

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
Whether the label automatically inverts font color based on the element color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label anti-overlap function is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filtering, default condition relationship between selectors is OR

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field, ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Implementation of complex data filtering logic through AI-generated JavaScript code

Core capabilities:

\- Supports any complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Safe execution in the browser environment (Web Worker sandbox)

Environment requirement: Only supports browser environment, Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously, dynamicFilter has higher priority

Chart animated filter configuration

Filter chart markers (bars, points, etc.) through AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering needs (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (access via \_ or R)

\- Input parameter: data (array), each item includes a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, field represents the field to be highlighted

\- Prohibited use: eval, Function, asynchronous operations, DOM API, network requests

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

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field, ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
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

:::note{title=Description}
Legend Configuration

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend function is enabled

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
When there are a large number of legends, specify the maximum number of columns or legend rows.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows displayed.

:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip Configuration

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether the tooltip function is enabled

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush Configuration

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

Defines the shape and direction of the brush box.

\- `rect`: Rectangular selection, can be performed on both X and Y axes simultaneously.

\- `polygon`: Polygon selection, click multiple points to draw an arbitrary polygon for selection.

\- `x`: X-axis selection, only performs selection on the X-axis, no limit on the Y-axis.

\- `y`: Y-axis selection, only performs selection on the Y-axis, no limit on the X-axis.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Selection mode, single or multiple choices.

Defines the selection mode.

\- `single`: Single selection mode, only one selection box can exist at a time.

\- `multiple`: Multiple selection mode, multiple selection boxes can exist simultaneously.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the selection box after selection ends.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style of selected data

Defines the style of selected data points.

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of selected data points, range 0-1.

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
Style of unselected data

Defines the style of unselected data points.

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity

Opacity of unselected data points, range 0-1.

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
X-axis configuration, a category axis, showing dimension values.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is displayed in reverse, only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force display of 0 on the axes. When min and max are configured, this configuration item becomes invalid. Only effective for numeric axes.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label, automatic hiding. If two labels overlap (interval less than autoHideGap), the label causing overlap will be automatically hidden. Only effective for category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}
Axis label, automatic hiding interval. If two labels overlap (interval less than autoHideGap), the label causing overlap will be automatically hidden. Only effective for category axes.

When autoHide is on, use autoHide, configured on autoHideSeparation.

When autoHide is off, use sampling, configured on minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label, automatic rotation. When the label width exceeds the axis length, the label is automatically rotated. Only effective for category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
Axis label, automatic rotation angle range. When automatic rotation is enabled, specify the label rotation angle range. Only effective for category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Axis label, automatic length limit. When the label width exceeds the axis length, the excess is shown as an ellipsis, and the full label is visible on hover. Only effective for category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
Axis label, maximum length for automatic length limit. When the label text length exceeds the maximum length, the excess is shown as an ellipsis, and the full label is visible on hover. Only effective for category axes.

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
X-axis tick

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick is visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick is oriented inwards

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
Title text, follows field configuration by default.

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
Y-axis configuration, a numeric axis, showing measure values.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Minimum value of the axis, higher priority than nice and zero.

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Maximum value of the axis, higher priority than nice and zero. If true, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic axis, only effective for numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
The base of the logarithmic axis, only effective for numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust the axis ticks to make labels more readable. When min and max are configured, this configuration item becomes invalid. Only effective for numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is displayed in reverse, only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force display of 0 on the axes. When min and max are configured, this configuration item becomes invalid. Only effective for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format the tick labels of the numeric axis. Only effective for numeric axes. When autoFormat is true, numFormat configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Number formatting for numeric axis, only effective for numeric axes, lower priority than autoFormat.

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
Whether the label is visible

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
X-axis tick

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick is visible

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the tick is oriented inwards

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
Title text, follows field configuration by default.

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

## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Description}
Vertical crosshair line configuration

Crosshair line configuration, a configuration type used to display crosshair lines (prompt lines) in a chart.

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
Whether to display the crosshair line label

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair line label background color

:::

## sort

**Type:** `Sort | undefined`

:::note{title=Description}
X-axis sort configuration

Category axis sort configuration, supports sorting based on dimensions or measures, and custom sort order.

:::

**Example**
\- order:'asc'
\- orderBy:'date'
or
\- customOrder:\['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sort order, optional values are 'asc' or 'desc'

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
Sort field dependencies, can be dimension ID or measure ID.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order, applied directly to the category axis.

:::

## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Legend sort configuration

Legend sort configuration, supports sorting based on dimensions or measures, and custom sort order; the sort array follows a left-to-right or top-to-bottom order.

:::

**Example**
\- order:'asc'
\- orderBy:'date'
or
\- customOrder:\['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sort order, optional values are 'asc' or 'desc'

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
Sort field dependencies, can be dimension ID or measure ID.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order, applied directly to the legend; ascending from left to right or top to bottom, descending from right to left or bottom to top.

:::

## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Theme configuration

Theme

Built-in light and dark themes; new themes can be customized via registerTheme.

:::

### length

**Type:** `number`

### brand

**Type:** `brand`

## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Description}
Point element style configuration

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

If selector is configured, it provides four types of data matching: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style takes effect globally.

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
Dimension field, ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Implementation of complex data filtering logic through AI-generated JavaScript code. Suitable for scenarios difficult to express with static selectors, such as Top N, statistical analysis, and complex conditions.

Core capabilities:

\- Supports any complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Safe execution in the browser environment (Web Worker sandbox)

Environment requirement: Only supports browser environment, Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously, dynamicFilter has higher priority

Chart animated filter configuration

Filter chart markers (bars, points, etc.) through AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering needs (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (access via \_ or R)

\- Input parameter: data (array), each item includes a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, field represents the field to be highlighted

\- Prohibited use: eval, Function, asynchronous operations, DOM API, network requests

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

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field, ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Animated filter execution result (runtime field)

Written during the prepare() phase, read-only at runtime

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
Whether points are visible

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
Point element color

Point element color

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Point element color opacity

Point element color opacity

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Point element border color

Point element border color

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Point element border width

Point element border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Point element border style

Point element border style

:::

**Example**
solid

dashed

dotted

## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Line element style configuration

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector

If selector is configured, it provides four types of data matching: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style takes effect globally.

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
Dimension field, ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Implementation of complex data filtering logic through AI-generated JavaScript code. Suitable for scenarios difficult to express with static selectors, such as Top N, statistical analysis, and complex conditions.

Core capabilities:

\- Supports any complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Safe execution in the browser environment (Web Worker sandbox)

Environment requirement: Only supports browser environment, Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously, dynamicFilter has higher priority

Chart animated filter configuration

Filter chart markers (bars, points, etc.) through AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering needs (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (access via \_ or R)

\- Input parameter: data (array), each item includes a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, field represents the field to be highlighted

\- Prohibited use: eval, Function, asynchronous operations, DOM API, network requests

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

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field, ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Animated filter execution result (runtime field)

Written during the prepare() phase, read-only at runtime

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the line segment is visible

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the line segment is smooth

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Line segment color

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Line segment color opacity

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Line segment width

:::

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Annotation point configuration

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Selector for annotation points, used to select data points.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field, ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Implementation of complex data filtering logic through AI-generated JavaScript code. Suitable for scenarios difficult to express with static selectors, such as Top N, statistical analysis, and complex conditions.

Core capabilities:

\- Supports any complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Safe execution in the browser environment (Web Worker sandbox)

Environment requirement: Only supports browser environment, Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously, dynamicFilter has higher priority

Chart animated filter configuration

Filter chart markers (bars, points, etc.) through AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering needs (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (access via \_ or R)

\- Input parameter: data (array), each item includes a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the row number of the original data item, field represents the field to be highlighted

\- Prohibited use: eval, Function, asynchronous operations, DOM API, network requests

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

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field, ID of an item in dimensions

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
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
Text alignment; generally set to 'right', where text is displayed to the left of the annotation point to ensure it's in the chart's visible area.

It is recommended to set to 'right' to ensure the text is on the left side of the annotation point.

right: Text is on the left side of the annotation point, with its right edge aligned to the point.

left: Text is on the right side of the annotation point, with its left edge aligned to the point.

center: Text is centered on the annotation point, with its center aligned to the point.

:::

**Example**
'right' text is on the left side of the annotation point

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Vertical text alignment; generally set to 'top', where text is displayed at the bottom of the annotation point to ensure it's in the chart's visible area.

It is recommended to set to 'top' to ensure the text is fully displayed in the chart's visible area.

top: Text is at the bottom of the annotation point, with its top edge aligned to the point.

middle: Text is centered on the annotation point, with its center aligned to the point.

bottom: Text is above the annotation point, with its bottom edge aligned to the point.

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
Overall pixel offset of the annotation point in the Y direction. When the point is above the chart (larger values), positive values are recommended; when below (smaller values), negative values are recommended.

Negative values offset upwards, e.g., set to -10 to move the entire component (text, background) up by 10 pixels.

Positive values offset downwards, e.g., set to 10 to move the entire component (text, background) down by 10 pixels.

:::

**Example**
offsetY: 5, the overall annotation point offsets down by 5 pixels

### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Overall pixel offset of the annotation point in the X direction. When the point is on the left side of the chart (start of the category axis), positive values are recommended; when on the right (end of the axis), negative values are recommended.

Negative values offset to the left, e.g., set to -10 to move the entire component (text, background) left by 10 pixels.

Positive values offset to the right, e.g., set to 10 to move the entire component (text, background) right by 10 pixels.

:::

**Example**
offsetX: 5, the overall annotation point offsets right by 5 pixels

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Dimension value annotation line configuration

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed X value for annotating vertical lines. If the category axis is on the X-axis, input a dimension value; if the numeric axis is on the X-axis, input a specific numeric value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Animated calculation of annotation line values through AI-generated JavaScript code. Suitable for cases requiring dynamic determination of annotation line positions based on data, such as average, maximum, quantile, business lines, etc.

Only supports browser environment (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering needs (natural language)

:::

**Example**
"Get the highest sales value as an annotation line reference"

"Calculate the average sales for the annotation line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (access via \_ or R)

\- Input parameter: data (array)

\- Must return a single numeric value or string: number | string

\- Applicable scenarios: Animated numeric values needed for annotation lines (horizontal, vertical)

\- Prohibited use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales value as an annotation line value

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

Calculate the target value based on conditions

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
Animated filter execution result (runtime field)

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
'Annotation text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position; the location of the annotation line label (relative to the line).

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
Text alignment; generally no setting needed.

Recommended to set to 'right' to ensure text is on the left side of the annotation line.

right: Text is on the left side of the reference line, with its right edge aligned to the (vertical) annotation line.

left: Text is on the right side of the reference line, with its left edge aligned to the (vertical) annotation line.

center: Text is centered on the reference line, with its center aligned to the (vertical) annotation line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Vertical text alignment; generally no setting needed.

Recommended to set to 'top' to ensure the text is fully displayed in the chart's visible area.

top: Text is at the bottom of the reference line, with its top edge aligned to the end of the (vertical) annotation line.

middle: Text is centered on the reference line, with its center aligned to the end of the (vertical) annotation line.

bottom: Text is at the top of the reference line, with its bottom edge aligned to the end of the (vertical) annotation line.

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
Numeric annotation line configuration

:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed Y value for annotating horizontal lines. If the category axis is on the Y-axis, input a dimension value; if the numeric axis is on the Y-axis, input a specific numeric value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Animated calculation of annotation line values through AI-generated JavaScript code. Suitable for cases requiring dynamic determination of annotation line positions based on data, such as average, maximum, quantile, business lines, etc.

Only supports browser environment (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering needs (natural language)

:::

**Example**
"Get the highest sales value as an annotation line reference"

"Calculate the average sales for the annotation line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code

\- Only built-in utility functions can be used (access via \_ or R)

\- Input parameter: data (array)

\- Must return a single numeric value or string: number | string

\- Applicable scenarios: Animated numeric values needed for annotation lines (horizontal, vertical)

\- Prohibited use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales value as an annotation line value

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

Calculate the target value based on conditions

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
Animated filter execution result (runtime field)

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
'Annotation text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=Description}
Text position

The location of the annotation line label (relative to the line).

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
Text alignment; generally no setting needed.

Recommended to set to 'right' to ensure text is on the left side of the annotation line.

right: Text is on the left side of the reference line, with its right edge aligned to the (horizontal) annotation line's end.

left: Text is on the right side of the reference line, with its left edge aligned to the (horizontal) annotation line's end.

center: Text is centered on the reference line, with its center aligned to the (horizontal) annotation line's end.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Vertical text alignment; generally no setting needed.

Recommended to set to 'top' to ensure the text is fully displayed in the chart's visible area.

top: Text is at the bottom of the reference line, with its top edge aligned to the (horizontal) annotation line.

middle: Text is centered on the reference line, with its center aligned to the (horizontal) annotation line.

bottom: Text is at the top of the reference line, with its bottom edge aligned to the (horizontal) annotation line.

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
Whether to enable the function of splitting the main line into two segments.

:::

#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Primary color for the part greater than the annotation value.

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Primary color for the part smaller than the annotation value.

:::

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Annotation area configuration

:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Data tagging based on selected data.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field, ID of an item in dimensions

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Select the value of the dimension field in the data item, supports arrays

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
Text alignment; generally set to 'right', where text is displayed in the middle of the annotation area to ensure it's in the chart's visible area.

Recommended to set to 'center' to ensure the text is in the middle of the annotation area.

right: Text is on the left side of the annotation area, with its right edge aligned to the area.

left: Text is on the right side of the annotation area, with its left edge aligned to the area.

center: Text is centered in the annotation area, with its center aligned to the area.

:::

**Example**
'center' Text is in the middle of the annotation area

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Vertical text alignment; generally set to 'top', where text is displayed at the bottom of the annotation area to ensure it's in the chart's visible area.

Recommended to set to 'top' to ensure the text is fully displayed in the chart's visible area.

top: Text is at the bottom of the annotation area, with its top edge aligned to the area.

middle: Text is centered on the annotation area, with its center aligned to the area.

bottom: Text is at the top of the annotation area, with its bottom edge aligned to the area.

:::

**Example**
'top' Text is at the bottom of the annotation area

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
Annotation area opacity

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
Line style of the annotation area border.

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
Dimension linkage configuration

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
Whether to display tooltips for all sub-charts corresponding to the dimensions.

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the label corresponding to the crosshair.

:::

## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Locale configuration

:::
