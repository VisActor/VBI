# RaceScatter

:::note{title=Description}
AnimatedScatter Chart (Race Scatter Chart)

Used to display the distribution of data over time, representing the values of two measures through the position of data points.

Application Scenarios:

\- Analyze the distribution characteristics of data in two-dimensional space and show its animated changes over time.

\- Display the evolution of correlation between multiple variables over time.

\- Observe the movement trajectory of data points in two-dimensional space.

:::

:::note{title=Note}
AnimatedScatter Chart:

\- Both X-axis and Y-axis are numeric axes (continuous data), supporting multiple measures mapping.

\- Supports controlling time dimensions through a player to display data changes animatedly.

\- Intuitively show animated changes in data through the change in data point positions.

:::

## chartType

**Type:** `"raceScatter"`

:::note{title=Description}
AnimatedScatter Chart, used to display the distribution of data over time.

:::

## dataset

**Type:** `Record[]`

:::note{title=Description}
Data source, a dataset following the TidyData specification.

:::

## dimensions

**Type:** `RaceScatterDimension[] | undefined`

:::note{title=Description}
Dimensions, used to distinguish different data series and for legend display.

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note{title=Description}
The channel in a competition scatter chart to which the dimension is mapped.

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

\- player: supports mapping multiple dimensions to the player channel

:::

## measures

**Type:** `ScatterMeasure[] | undefined`

:::note{title=Description}
Measures, at least 2 measures are required to be mapped to the X-axis and Y-axis respectively.

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

## player

**Type:** `Player | undefined`

:::note{title=Description}
Player configuration, used to specify the time dimension, which is the core configuration of the AnimatedScatter Chart.

Control the playback progress of the time dimension through the player to implement animated updates of data.

Player configuration, used to specify the field name for playback, which must be a dimension.

:::

:::warning{title=Warning}
This feature does not support chart types such as table, pivotTable, dualAxis, histogram, boxPlot, etc., and does not support use when measure combination or Row/Column pivot is enabled.

:::

### maxCount

**Type:** `number | false | undefined`

:::note{title=Description}
Maximum playback count; data exceeding this count will be truncated, set to 'false' for no limit.

:::

### interval

**Type:** `number | undefined`

:::note{title=Description}
Playback interval, unit: ms.

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to autoplay.

:::

### loop

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to loop playback.

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title=Description}
Player position.

:::

### railColor

**Type:** `string | undefined`

:::note{title=Description}
Player progress bar rail color.

:::

### trackColor

**Type:** `string | undefined`

:::note{title=Description}
Player progress bar track color.

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

## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Sort configuration, used to control the sorting method of dimension values.

Category axis sort configuration; supports sorting by dimensions or measures, as well as custom sort orders.

:::

**Example**
\- order:'asc'
\- orderBy:'date'
or
\- customOrder:\['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=Description}
Sort order; optional values are 'asc' or 'desc'.

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
The field the sort depends on, can be a dimension id or measure id.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
Custom sort order; this order will be directly applied to the category axis.

:::

## page

**Type:** `Page | undefined`

:::note{title=Description}
Pagination configuration, used for scenarios with large data volumes.

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
Background color configuration.

:::

## size

**Type:** `number | number[] | undefined`

:::note{title=Description}
The size of measures in the scatter chart, used to define the size or size range of data points.

\- If the size range is a single number, e.g., 10, it indicates the size of data points is fixed at 10.

\- If the size range is an array of length 2, e.g., \[10, 40], it indicates the size range of data points is between 10 and 40.

\- Mutually exclusive with sizeRange, lower priority than size.

:::

## sizeRange

**Type:** `number | number[] | undefined`

:::note{title=Description}
The size range of measures in the scatter chart, used to define the size range of data points.

\- If the size range is an array of length 2, e.g., \[10, 40], it indicates the size range of data points is between 10 and 40.

\- If the size range is a single number, e.g., 10, it indicates the size of data points is fixed at 10.

\- Mutually exclusive with sizeRange, higher priority than size.

:::

## color

**Type:** `Color | undefined`

:::note{title=Description}
Color configuration, used to distinguish different dimensions or measures.

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
Label configuration, used to display data labels on data points.

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
Whether labels display the percentage of measure values.

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
Label font weight.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Label background color.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Label stroke color.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label font color.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label font color is automatically inverted based on the graphic element color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label anti-overlap functionality is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filtering; the default condition relationship between selectors is Or.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; ID of a specific dimension item.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Value of the dimension field in the selected data items; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code

Core capabilities:

\- Supports arbitrary complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Safely execute in browser environments (Web Worker sandbox)

Environment Requirements: Only browser environments are supported; Node.js environments will use fallback

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart animated filter configuration

Filter chart symbols (bars, points, etc.) via AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering requirements (natural language).

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit rate in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

* Can only use built-in utility functions (accessed via \_ or R)

* Input parameter: data (array), where each item contains a \_\_row\_index field representing the row number

* Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

* \_\_row\_index represents the original data item's row number, and field represents the field to be highlighted

* Prohibited: eval, Function, asynchronous operations, DOM APIs, network requests.

:::

**Example**
Highlight the sales field for data items with sales greater than 1000.

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit rate in each region

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
Fallback plan when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field; ID of a specific dimension item.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Value of the dimension field in the selected data items; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution results (runtime fields).

Written during the prepare() phase, read-only at runtime.

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
Legend configuration.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend function is enabled.

:::

**Example**
enable: true

### border

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the legend border is enabled.

:::

:::warning{title=Warning}
Only applicable to discrete legends.

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
Pager icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Pager icon disabled color.

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
legendfontColor

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
Legend shape.

:::

:::warning{title=Warning}
Only effective for discrete legends

:::

**Example**
shapeType: 'circle'

### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Legend position.

:::

**Example**
position: 'rightTop'

### maxSize

**Type:** `number | undefined`

:::note{title=Description}
When there are a large number of legends, the maximum number of columns or rows.

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed.

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows displayed.

:::

:::warning{title=Warning}
Only applicable to discrete legends.

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip configuration, used to display detailed information on mouse hover.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether the tooltip function is enabled.

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush configuration, used to support brush selection interaction.

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
Define the shape and selection direction of the brush.

\- `rect`: Rectangular selection, can select in both X-axis and Y-axis directions simultaneously.

\- `polygon`: Polygonal selection, select by clicking multiple points to draw an arbitrary polygon.

\- `x`: X-axis selection, select only in the X-axis direction, Y-axis is not restricted.

\- `y`: Y-axis selection, select only in the Y-axis direction, X-axis is not restricted.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Brush mode, single or multiple selection

Define the selection mode.

\- `single`: Single selection mode, only one brush box at a time.

\- `multiple`: Multiple selection mode, multiple brush boxes can exist simultaneously.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the selection box when brushing ends.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style of selected data

Define the style of selected data points.

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
Stroke color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Stroke width.

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style of unselected data

Define the style of unselected data points.

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
Stroke color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Stroke width.

:::

## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=Description}
X-axis configuration; a numeric axis that displays the first measure value.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible.

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
The minimum value of the axis; has higher priority than 'nice' and 'zero'.

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
The maximum value of the axis; has higher priority than 'nice' and 'zero'. If set to true, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic axis; only effective for numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
The base of the logarithmic axis; only effective for numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust axis intervals for better readability. This setting is ignored if 'min' and 'max' are configured. Only applicable to numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display the axis in reverse; only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the display of the 0 value on the axis; when min and max are configured, this setting is ignored. Only effective for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format numeric axis tick labels. If set to true, 'numFormat' configuration is ignored. Only applicable to numeric axes.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Number format for the numeric axis; only effective for numeric axes. Lower priority than autoFormat.

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
X-axis tick label.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels are visible.

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label color.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Label font weight.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Label rotation angle.

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
X-axis line.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis line is visible.

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Axis line color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Axis line width.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
X-axis tick.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inward.

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Tick color.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick size.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
X-axis title.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text; follows field configuration by default.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Title color.

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Title font size.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Title font weight.

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
X-axis grid line.

:::

#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
Grid line color.

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
Grid line width.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Grid line type.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
X-axis animation configuration.

:::

#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration.

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function.

:::

## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title=Description}
Y-axis configuration; a numeric axis that displays the second measure value.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible.

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
The minimum value of the axis; has higher priority than 'nice' and 'zero'.

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
The maximum value of the axis; has higher priority than 'nice' and 'zero'. If set to true, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a log axis; only applicable to numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
The base of the log axis; only applicable to numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust axis intervals for better readability. This setting is ignored if 'min' and 'max' are configured. Only applicable to numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is reversed; only applicable to numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force the axis to include 0. This setting is ignored if 'min' and 'max' are configured. Only applicable to numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format numeric axis tick labels. If set to true, 'numFormat' configuration is ignored. Only applicable to numeric axes.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Numeric format for the numeric axis; only applicable to numeric axes. Has lower priority than 'autoFormat'.

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
X-axis tick label.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels are visible.

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label color.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Label font weight.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Label rotation angle.

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
X-axis line.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis line is visible.

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Axis line color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Axis line width.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
X-axis tick.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inward.

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Tick color.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick size.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
X-axis title.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text; follows field configuration by default.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Title color.

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Title font size.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Title font weight.

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
X-axis grid line.

:::

#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
Grid line color.

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
Grid line width.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Grid line type.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
X-axis animation configuration.

:::

#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration.

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function.

:::

## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title=Description}
Crosshair configuration used to display the precise position of data.

Crosshair configuration is a type of configuration used to display crosshair lines (prompt lines) on the chart.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to display crosshair lines.

:::

### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair line color.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair label color.

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show crosshair labels.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Crosshair label background color.

:::

## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Theme configuration.

Built-in light and dark themes; new themes can be customized via registerTheme.

:::

### length

**Type:** `number`

### brand

**Type:** `brand`

## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Description}
Data point style configuration; can be a single style or an array, supporting global styles or conditional style configurations.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data selector.

If a selector is configured, it provides four types of data matching capabilities: value selector, local data selector, conditional dimension selector, and conditional measure selector.

If no selector is configured, the style applies globally.

:::

**Example**
Value selector
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
Dimension field; ID of a specific dimension item.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Value of the dimension field in the selected data items, supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

:::note{title=Description}
Dynamic filter (AI-generated code execution).

Dynamically calculates filtering logic via AI-generated JavaScript code.

Suitable for scenarios difficult to express with static selectors, such as Top N, statistical analysis, and complex multi-condition filters.

Only supports browser environments (requires Web Worker).

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering requirements (natural language).

:::

**Example**
"Highlight bars with sales greater than 1000."

"Highlight the bar with the highest profit rate in each region."

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

* Can only use built-in utility functions (accessed via \_ or R)

* Input parameter: data (array), where each item contains a \_\_row\_index field representing the row number

* Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

* \_\_row\_index represents the original data item's row number, and field represents the field to be highlighted

* Prohibited: eval, Function, asynchronous operations, DOM APIs, network requests.

:::

**Example**
Highlight the sales field for data items with sales greater than 1000.

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit rate in each region.

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

Highlight data items filtered by multiple conditions.

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
Dimension field; ID of a specific dimension item.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

Same as operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Value of the dimension field in the selected data items, supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Animated filter execution results (runtime fields)

Written during the prepare() phase, read-only at runtime.

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
Whether points are visible.

:::

### pointSize

**Type:** `number | undefined`

:::note{title=Description}
Point size.

:::

### pointColor

**Type:** `string | undefined`

:::note{title=Description}
Point color.

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=Description}
Point color opacity.

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Point border color.

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=Description}
Point border width.

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=Description}
Point border style.

:::

**Example**
solid

dashed

dotted

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Annotation point configuration, used to add markers on specific data points.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Selector for annotation points, used to select data points.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; ID of a specific dimension item.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Value of the dimension field in the selected data items, supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution).

Dynamically calculates filtering logic via AI-generated JavaScript code.

Suitable for scenarios difficult to express with static selectors, such as Top N, statistical analysis, and complex multi-condition filters.

Only supports browser environments (requires Web Worker).

Chart dynamic filter configuration.

Filter chart symbols (bars, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering requirements (natural language).

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

* Can only use built-in utility functions (accessed via \_ or R)

* Input: data (array), where each item contains a \_\_row\_index field representing the row number

* Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>

* \_\_row\_index represents the original data item's row number, and field represents the field to be highlighted

* Prohibited: eval, Function, asynchronous operations, DOM APIs, network requests.

:::

**Example**
Highlight the 'sales' field for data items with sales greater than 1000.

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the data item with the highest profit margin in each region.

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

Highlight data items selected based on multiple conditions.

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
Dimension field; ID of a specific dimension item.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

Same as operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Value of the dimension field in the selected data items, supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution results (runtime fields).

Written during the prepare() phase, read-only at runtime.

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
Text alignment. Typically set to 'right' so text is displayed on the left side of the annotation point, ensuring it remains within the visible chart area.

It is recommended to set this to 'right' as it ensures the text appears on the left side of the point.

right: Text is on the left side of the point, with its right edge aligned to the point.

left: Text is on the right side of the point, with its left edge aligned to the point.

center: Text is centered on the point.

:::

**Example**
'right' // Text is on the left side of the annotation point.

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. Typically set to 'top' so text is displayed at the bottom of the annotation point, ensuring it remains within the visible chart area.

It is recommended to set this to 'top' as it ensures the text is fully displayed within the visible chart area.

top: Text is below the point, with its top edge aligned to the point.

middle: Text is centered vertically on the point.

bottom: Text is above the point, with its bottom edge aligned to the point.

:::

**Example**
'top' // Text is at the bottom of the annotation point.

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
Pixel offset distance of the annotation point in the Y direction. When the point is above the chart (large value), a positive offset is recommended; when it is below (small value), a negative offset is recommended.

A negative value shifts the entire component (text, background) upward.

A positive value shifts the entire component (text, background) downward.

:::

**Example**
offsetY: 5, Shifts the entire annotation point 5 pixels downward.

### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Pixel offset distance of the annotation point in the X direction. When the point is on the left side (dimension axis start), a positive offset is recommended; when it is on the right side (dimension axis end), a negative offset is recommended.

A negative value shifts the entire component (text, background) leftward.

A positive value shifts the entire component (text, background) rightward.

:::

**Example**
offsetX: 5, Shifts the entire annotation point 5 pixels to the right.

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Vertical annotation line used to mark specific X-axis values.

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed X-axis value for vertical annotation lines. Supports dimension values for category axes and numeric values for numeric axes.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution).

Dynamically calculates annotation line values via AI-generated JavaScript code.

Suitable for determining positions based on data, such as mean, max, quantiles, business targets, etc.

Only supports browser environments (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering requirements (natural language).

:::

**Example**
"Use the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

* Can only use built-in utility functions (accessed via \_ or R)

* Input parameter: data (array)

* Must return a single numeric or string value: number | string

* Use case: Dynamic values needed for annotation lines (horizontal/vertical lines)

* Prohibited: eval, Function, asynchronous operations, DOM APIs, network requests.

:::

**Example**
Get maximum sales as the annotation line value.

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average for the annotation line.

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile as the annotation line.

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate target value based on conditions.

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
Dynamic filter execution results (runtime fields).

Written during the prepare() phase, read-only at runtime.

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
Text position relative to the annotation line.

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
Text alignment. In most cases, this does not need to be set.

It is recommended to set this to 'right' to ensure the text is on the left side of the vertical line.

right: Text is on the left side of the vertical reference line, with the right edge aligned to the line.

left: Text is on the right side of the vertical reference line, with the left edge aligned to the line.

center: Text is at the center of the vertical reference line, with the center aligned to the line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. Typically doesn't need to be set.

Recommended to set to 'top' to ensure the text is fully displayed within the chart area.

top: Text is at the bottom of the reference line, with the top edge aligned to the endpoint of the (vertical) annotation line.

middle: Text is at the center of the reference line, with the center aligned to the endpoint of the (vertical) annotation line.

bottom: Text is at the top of the reference line, with the bottom edge aligned to the endpoint of the (vertical) annotation line.

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
Horizontal annotation line used to mark specific Y-axis values.

:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=Description}
Fixed Y-axis value for horizontal annotation lines. Supports dimension values for category axes and numeric values for numeric axes.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Animated filter (AI-generated code execution)

Animated calculation of annotation line values via AI-generated JavaScript code.

Suitable for cases where annotation line positions need to be determined dynamically based on data, such as mean, maximum, quantiles, business targets, etc.

Only supports browser environments (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Description of the user's filtering requirements (natural language).

:::

**Example**
"Use the highest sales value as the annotation line reference"

"Calculate average sales for the annotation line"

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

* Can only use built-in utility functions (accessed via \_ or R)

* Input parameter: data (array)

* Must return a single numeric or string value: number | string

* Use case: Dynamic values needed for annotation lines (horizontal/vertical lines)

* Prohibited: eval, Function, asynchronous operations, DOM APIs, network requests.

:::

**Example**
Get maximum sales as the annotation line value.

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average for the annotation line.

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantile as the annotation line.

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Calculate target value based on conditions.

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
Dynamic filter execution results (runtime fields).

Written during the prepare() phase, read-only at runtime.

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
Text position relative to the annotation line.

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
Text alignment. In most cases, this does not need to be set.

It is recommended to set this to 'right' to ensure the text is on the left side of the horizontal line endpoint.

right: Text is on the left side of the horizontal reference line, with the right edge aligned to the endpoint.

left: Text is on the right side of the horizontal reference line, with the left edge aligned to the endpoint.

center: Text is at the center of the horizontal reference line, with the center aligned to the endpoint.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. In most cases, this is set to 'top' so the text appears at the bottom of the annotation area and remains within the chart's visible region.

Recommended to set to 'top' to ensure the text is fully displayed within the chart area.

top: Text is at the bottom of the annotation area, with the top edge aligned to the area boundary.

middle: Text is at the center of the annotation area, with the center aligned to the area boundary.

bottom: Text is at the top of the annotation area, with the bottom edge aligned to the area boundary.

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
Whether to enable the feature of splitting the main line into two segments.

:::

#### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
The primary color for segments greater than the annotation value.

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
The primary color for segments less than the annotation value.

:::

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Annotation area configuration, used to highlight specific data ranges.

:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=Description}
Data markers based on selected data.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field; ID of a specific dimension item.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator.

* in: Selects data items where the dimension field value is in 'value'.

* not in: Selects data items where the dimension field value is not in 'value'.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Value of the dimension field in the selected data items; supports arrays.

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
Text alignment. In most cases, this is set to 'right' so the text appears in the middle of the annotation area and remains within the chart's visible region.

Recommended to set to 'center' to ensure the text is in the middle of the annotation area.

right: Text is on the left side of the annotation area, with the right edge aligned to the area boundary.

left: Text is on the right side of the annotation area, with the left edge aligned to the area boundary.

center: Text is at the center of the annotation area, with the center aligned to the area boundary.

:::

**Example**
'center' Text is in the middle of the annotation area.

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=Description}
Text vertical alignment. In most cases, this is set to 'top' so the text appears at the bottom of the annotation area and remains within the chart's visible region.

Recommended to set to 'top' to ensure the text is fully displayed within the chart area.

top: Text is at the bottom of the annotation area, with the top edge aligned to the area boundary.

middle: Text is at the center of the annotation area, with the center aligned to the area boundary.

bottom: Text is at the top of the annotation area, with the bottom edge aligned to the area boundary.

:::

**Example**
'top' Text is at the bottom of the annotation area.

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
Line type for the annotation area border.

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

## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Locale configuration.

:::
