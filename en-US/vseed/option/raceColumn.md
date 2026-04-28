# RaceColumn

:::note\{title=Description}
Race Column Chart: An animated column chart that ranks data over time or categories.

**Suitable scenarios:**

\- When data item names are long.

\- When you need to intuitively compare numerical values of different categories and show their changes in ranking over time.

\- To show the trend of time series data changes and animate the update of column sorting.

:::

:::note\{title=Note}
Animated Bar Chart:

Animated Bar Chart:

\- X-axis is the category axis (categorical data), displaying Dimension values.

\- Y-axis is the numeric axis (continuous data), displaying Measure values.

\- Supports using a player to control time Dimensions and animate data changes.

\- Columns are animated and sorted based on their values during the animation.

:::

## chartType

**Type:** `"raceColumn"`

:::note\{title=Description}
Race Column Chart: An animated column chart that ranks data over time or categories.

**Suitable scenarios:**
\- When data item names are long.
\- When you need to intuitively compare numerical values of different categories and show their changes in ranking over time.
\- To show the trend of time series data changes and animate the update of column sorting.
:::

## dataset

**Type:** `Dataset | undefined`

:::note\{title=Description}
Dataset configuration: Defines the source and structure of the data used for the chart.

:::

**Example**
\[\{category:'A', value:100, date: '2020'}, \{category:'B', value:200, date: '2020'}]

## dimensions

**Type:** `Dimension[] | undefined`

:::note\{title=Description}
Dimension configuration: Defines the categorical attributes of the data.

The first dimension(s) map to the player, and the second dimension(s) map to the X-axis.

:::

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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | "player" | undefined`

:::note\{title=Description}
Channel to which the dimension is mapped

\- xAxis: supports mapping multiple dimensions to the x-axis

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

\- player: supports mapping multiple dimensions to the player channel

:::

## measures

**Type:** `Measure[] | undefined`

:::note\{title=Description}
Measure configuration: Defines the quantitative values of the data.

All measures are automatically merged into one measure and mapped to the Y-axis. When multiple measures exist, measure names are merged with other dimensions and displayed as legend items.

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

## player

**Type:** `Player | undefined`

:::note\{title=Description}
Player (Animation) configuration: Controls the playback and timing of the animated race.

Used to specify the time Dimension, which is the core configuration of the Animated Bar Chart.

The player controls the playProgress of the time Dimension, implementing animated updates and sorting changes.

The player configuration is used to specify the field name for playback, which must be a Dimension.

:::

:::warning\{title=Warning}
This feature does not support table, pivotTable, dualAxis, histogram, boxPlot, etc., and does not support use with measure grouping or row/column pivoting enabled.

:::

### maxCount

**Type:** `number | false | undefined`

:::note\{title=Description}
Maximum number of playback items; data exceeding this count will be truncated. Set to false to disable the limit.

:::

### interval

**Type:** `number | undefined`

:::note\{title=Description}
Playback interval between frames (in ms).

:::

### autoPlay

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to play automatically.

:::

### loop

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to loop playback.

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note\{title=Description}
Player position.

:::

### railColor

**Type:** `string | undefined`

:::note\{title=Description}
Player progress bar track color.

:::

### trackColor

**Type:** `string | undefined`

:::note\{title=Description}
Player progress bar progress color.

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note\{title=Description}
Player progress bar slider handle color.

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Player progress bar slider handle border color.

:::

### startButtonColor

**Type:** `string | undefined`

:::note\{title=Description}
Player start button color.

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note\{title=Description}
Player pause button color.

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note\{title=Description}
Player backward button color.

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note\{title=Description}
Player forward button color.

:::

## sort

**Type:** `Sort | undefined`

:::note\{title=Description}
Sort configuration, Animated Bar Charts usually require animated sorting based on values.

Controls how columns are sorted on the X-axis.

\- customOrder:\['2019', '2020', '2021']
or
\- order:'asc'

### order

**Type:** `"asc" | "desc" | undefined`

:::note\{title=Description}
Sort order, optional values are 'asc' or 'desc'.

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note\{title=Description}
Field to sort by, can be a Dimension ID or Measure ID.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note\{title=Description}
Custom sort order, which will be applied directly to the category axis.

:::

## page

**Type:** `Page | undefined`

:::note\{title=Description}
Pagination configuration, used for handling large datasets.

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
Background color configuration.

:::

## color

**Type:** `Color | undefined`

:::note\{title=Description}
Color configuration, used to distinguish different Dimensions or Measures.

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
Label configuration: Used to display data labels on columns.

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
Whether labels display percentages of measure values.

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
Label font weight.

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
Whether to automatically invert the label font color based on the element color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note\{title=Description}
Label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether label anti-overlap functionality is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Label filter, default relationship between selectors is Or

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field, ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Dimension field value, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Animated filter (AI-generated code execution)

Implements complex data filtering logic via AI-generated JavaScript code.

Core capabilities:

\- Supports arbitrary complex data filtering conditions.

\- Uses built-in utility functions for data operations.

\- Safely executes in the browser environment (Web Worker sandbox).

Environment requirements: Only supports browser environment; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart animated filter configuration.

Implements filtering of chart markers (columns, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight columns with sales greater than 1000"

"Highlight the column with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (accessed via \_ or R)

\- Input parameter: data (array), each item contains a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original row number of the data item, field represents the field to highlight

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field for data items with sales > 1000

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

:::note\{title=Description}
Fallback solution when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field, ID of a dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Dimension field value, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Animated filter execution result (runtime field)

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

:::note\{title=Description}
Legend configuration.

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
Legend font color.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note\{title=Description}
Pagination icon color.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note\{title=Description}
Pagination icon disabled color.

:::

### labelFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Legend font size.

:::

**Example**
labelFontSize: 10

### labelFontColor

**Type:** `string | undefined`

:::note\{title=Description}
Legend font color.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note\{title=Description}
Legend font weight.

:::

**Example**
labelFontWeight: 400

### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note\{title=Description}
Legend shape.

:::

:::warning\{title=Warning}
Only effective for discrete legends.

:::

**Example**
shapeType: 'circle'

### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note\{title=Description}
Legend position.

:::

**Example**
position: 'rightTop'

### maxSize

**Type:** `number | undefined`

:::note\{title=Description}
Maximum number of columns or rows for the legend when there are many items.

If the position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed.

If the position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows displayed.

:::

:::warning\{title=Warning}
Only effective for discrete legends.

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note\{title=Description}
Tooltip configuration, used to display detailed information on hover.

:::

### enable

**Type:** `false | true`

:::note\{title=Description}
Whether tooltip functionality is enabled.

:::

## brush

**Type:** `Brush | undefined`

:::note\{title=Description}
Brush configuration, used to support brush interaction.

:::

### enable

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether brush selection is enabled.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note\{title=Description}
Brush type.

Defines the shape and direction of the brush selection box.

\- `rect`: Rectangular brush, can select in both X and Y directions simultaneously.

\- `polygon`: Polygonal brush, draws an arbitrary polygon by clicking multiple points.

\- `x`: X-axis direction brush, only selects in the X direction, Y direction is unrestricted.

\- `y`: Y-axis direction brush, only selects in the Y direction, X direction is unrestricted.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note\{title=Description}
Brush mode, single or multiple selection.

Defines the mode of the brush.

\- `single`: Single selection mode, only one brush box at a time.

\- `multiple`: Multiple selection mode, multiple brush boxes can exist simultaneously.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to clear the selection box when the brush ends.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
Style of selected data.

Defines the style of data points within the brush selection.

:::

#### opacity

**Type:** `number | undefined`

:::note\{title=Description}
Opacity of selected data points, range 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note\{title=Description}
Stroke color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Stroke width.

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
Style of unselected data.

Defines the style of data points outside the brush selection.

:::

#### opacity

**Type:** `number | undefined`

:::note\{title=Description}
Opacity of unselected data points, range 0-1.

:::

#### stroke

**Type:** `string | undefined`

:::note\{title=Description}
Stroke color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Stroke width.

:::

## bar

**Type:** `BarConfiguration | undefined`

:::note\{title=Description}
Bar configuration: General settings for the columns.

:::

## xAxis

**Type:** `XBandAxis | undefined`

:::note\{title=Description}
X-axis configuration, category axis, displays Dimension values, columns are sorted vertically.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is visible.

:::

### inverse

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is inverted, only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to force the display of 0 on the axis. When min and max are configured, this configuration item is invalid. Only effective for numeric axes.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note\{title=Description}
Axis label auto-hide. If two labels overlap (interval less than autoHideGap), the overlapping label is automatically hidden. Only effective for category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note\{title=Description}
Axis label auto-hide interval. If the interval between two text labels is less than autoHideGap, the overlapping label is automatically hidden. Only effective for category axes.

When autoHide is enabled, use autoHide, set in autoHideSeparation.

When autoHide is disabled, use sampling, set in minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note\{title=Description}
Axis label auto-rotate. When the label width exceeds the axis length, the label rotates automatically. Only effective for category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note\{title=Description}
Axis label auto-rotate angle range. When auto-rotate is enabled, the label rotation angle range. Only effective for category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note\{title=Description}
Axis label auto-limit length. When the label width exceeds the axis length, the excess is represented by an ellipsis, and the full label is visible on hover. Only effective for category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note\{title=Description}
Maximum length for axis label auto-limit. When the label text length exceeds the maximum length, the excess is represented by an ellipsis. Only effective for category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note\{title=Description}
X-axis tick label.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the label is visible.

:::

#### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Label color.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Label font size.

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Label font weight.

:::

#### labelAngle

**Type:** `number | undefined`

:::note\{title=Description}
Label rotation angle.

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
X-axis line.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis line is visible.

:::

#### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Axis line color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Axis line width.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note\{title=Description}
X-axis tick.

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
Tick color.

:::

#### tickSize

**Type:** `number | undefined`

:::note\{title=Description}
Tick size.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note\{title=Description}
X-axis title.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note\{title=Description}
Title text, defaults to the field configuration.

:::

#### titleColor

**Type:** `string | undefined`

:::note\{title=Description}
Title color.

:::

#### titleFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Title font size.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Title font weight.

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note\{title=Description}
X-axis grid line.

:::

#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note\{title=Description}
Grid line color.

:::

#### gridWidth

**Type:** `number | undefined`

:::note\{title=Description}
Grid line width.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Grid line type.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note\{title=Description}
X-axis animation configuration.

:::

#### duration

**Type:** `number | undefined`

:::note\{title=Description}
Animation duration.

:::

#### easing

**Type:** `string | undefined`

:::note\{title=Description}
Animation easing function.

:::

## yAxis

**Type:** `YLinearAxis | undefined`

:::note\{title=Description}
Y-axis configuration, numeric axis, displays Measure values.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is visible.

:::

### min

**Type:** `number | undefined`

:::note\{title=Description}
Axis minimum value, higher priority than nice and zero.

:::

### max

**Type:** `number | boolean | undefined`

:::note\{title=Description}
Axis maximum value, higher priority than nice and zero. If true, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to use a logarithmic axis, only effective for numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note\{title=Description}
Logarithmic axis base, only effective for numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically adjust the axis tick interval to make labels more readable. When min and max are configured, this configuration item is invalid. Only effective for numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is inverted, only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to force the display of 0 on the axis. When min and max are configured, this configuration item is invalid. Only effective for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically format numeric axis tick labels, only effective for numeric axes. When autoFormat is true, numFormat configuration is invalid.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note\{title=Description}
Numeric axis number formatting, only effective for numeric axes, lower priority than autoFormat.

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
X-axis tick label.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the label is visible.

:::

#### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Label color.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Label font size.

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Label font weight.

:::

#### labelAngle

**Type:** `number | undefined`

:::note\{title=Description}
Label rotation angle.

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
X-axis line.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis line is visible.

:::

#### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Axis line color.

:::

#### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Axis line width.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note\{title=Description}
X-axis tick.

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
Tick color.

:::

#### tickSize

**Type:** `number | undefined`

:::note\{title=Description}
Tick size.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note\{title=Description}
X-axis title.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note\{title=Description}
Title text, defaults to the field configuration.

:::

#### titleColor

**Type:** `string | undefined`

:::note\{title=Description}
Title color.

:::

#### titleFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Title font size.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Title font weight.

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note\{title=Description}
X-axis grid line.

:::

#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note\{title=Description}
Grid line color.

:::

#### gridWidth

**Type:** `number | undefined`

:::note\{title=Description}
Grid line width.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Grid line type.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note\{title=Description}
Y-axis animation configuration.

:::

#### duration

**Type:** `number | undefined`

:::note\{title=Description}
Animation duration.

:::

#### easing

**Type:** `string | undefined`

:::note\{title=Description}
Animation easing function.

:::

## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note\{title=Description}
Crosshair configuration, used to display precise values of data.

Crosshair rectangle area configuration, a configuration type used to display a crosshair rectangle area in the chart.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to display the crosshair rectangle area.

:::

### rectColor

**Type:** `string | undefined`

:::note\{title=Description}
Crosshair rectangle area color.

:::

### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Crosshair rectangle area label color.

:::

### labelVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to display the crosshair rectangle area label.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Crosshair rectangle area label background color.

:::

## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note\{title=Description}
Stacking corner radius configuration.

:::

## barMaxWidth

**Type:** `string | number | undefined`

:::note\{title=Description}
Maximum width configuration for rectangles.

:::

## sortLegend

**Type:** `SortLegend | undefined`

:::note\{title=Description}
Legend sort configuration.

\- customOrder:\['2019', '2020', '2021']
or
\- order:'asc'

### order

**Type:** `"asc" | "desc" | undefined`

:::note\{title=Description}
Sort order, optional values are 'asc' or 'desc'.

:::

**Example**
order:'asc'

### orderBy

**Type:** `string | undefined`

:::note\{title=Description}
Field to sort by, can be a Dimension ID or Measure ID.

:::

**Example**
\- orderBy:'date'
\- orderBy:'profit'

### customOrder

**Type:** `string[] | undefined`

:::note\{title=Description}
Custom sort order, which will be applied directly to the legend. Ascending is from left to right or top to bottom, descending is from right to left or bottom to top.

:::

## theme

**Type:** `Theme | undefined`

:::note\{title=Description}
Theme configuration.

Theme.

Built-in light and dark themes; new themes can be customized via registerTheme.

:::

### length

**Type:** `number`

### brand

**Type:** `brand`

## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note\{title=Description}
Column style configuration, can be a single style or an array.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Data selector.

If a selector is configured, it provides four types of data matching capabilities: numeric selector, local data selector, conditional Dimension selector, and conditional Measure selector.

If no selector is configured, the style applies globally.

:::

**Example**
Numeric selector
selector = "tool"
selector = \["tool", "book"]
selector = 100
selector = \[100, 200]

Local data selector
selector = \{ profit: 100 }
selector = \[\{ profit: 100 }, \{ profit: 200 }]

Conditional Dimension selector
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

Conditional Measure selector
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
Dimension field, ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Dimension field value, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Animated filter (AI-generated code execution)

Implements complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, and complex conditions.

Core capabilities:

\- Supports arbitrary complex data filtering conditions.

\- Uses built-in utility functions for data operations.

\- Safely executes in the browser environment (Web Worker sandbox).

Environment requirements: Only supports browser environment; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart animated filter configuration.

Implements filtering of chart markers (columns, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight columns with sales greater than 1000"

"Highlight the column with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (accessed via \_ or R)

\- Input parameter: data (array), each item contains a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original row number of the data item, field represents the field to highlight

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field for data items with sales > 1000

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

:::note\{title=Description}
Fallback solution when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field, ID of a dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Dimension field value, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Animated filter execution result (runtime field)

Written during the prepare() phase, read-only at runtime.

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
Whether the column element (rectangle element) is visible.

:::

### barColor

**Type:** `string | undefined`

:::note\{title=Description}
Column element (rectangle element) color.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Column element (rectangle element) color opacity.

:::

### barBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Column element (rectangle element) border color.

:::

### barBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Column element (rectangle element) border width.

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note\{title=Description}
Column element (rectangle element) border style.

:::

**Example**
solid

dashed

dotted

### barBorderOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Column element (rectangle element) corner radius.

Column element (rectangle element) stroke opacity.

:::

**Example**
4

\[0, 0, 10, 10]

### barRadius

**Type:** `number | number[] | undefined`

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note\{title=Description}
Annotation point configuration, used to add markers to specific data points.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Annotation point selector, used to select data points.

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field, ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Dimension field value, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Animated filter (AI-generated code execution)

Implements complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, and complex conditions.

Core capabilities:

\- Supports arbitrary complex data filtering conditions.

\- Uses built-in utility functions for data operations.

\- Safely executes in the browser environment (Web Worker sandbox).

Environment requirements: Only supports browser environment; Node.js environment will use fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Chart animated filter configuration.

Implements filtering of chart markers (columns, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight columns with sales greater than 1000"

"Highlight the column with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (accessed via \_ or R)

\- Input parameter: data (array), each item contains a \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original row number of the data item, field represents the field to highlight

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Highlight the sales field for data items with sales > 1000

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

:::note\{title=Description}
Fallback solution when code execution fails or the environment is not supported

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field, ID of a dimension item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

Same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Dimension field value, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Animated filter execution result (runtime field)

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

:::note\{title=Description}
Annotation text.

:::

**Example**
'Annotation text'

### textColor

**Type:** `string | undefined`

:::note\{title=Description}
Text color.

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Text font size.

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Text font weight.

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note\{title=Description}
Text alignment. Generally, set to 'right' so the text appears to the left of the annotation point, ensuring it is displayed in the visible area of the chart.

Recommended to set to 'right' to ensure the text is to the left of the annotation point.

right: Text is to the left of the annotation point, the right edge of the text aligns with the annotation point.

left: Text is to the right of the annotation point, the left edge of the text aligns with the annotation point.

center: Text is centered on the annotation point, the center of the text aligns with the annotation point.

:::

**Example**
'right' Text is to the left of the annotation point.

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Text vertical alignment. Generally, set to 'top' so the text appears below the annotation point, ensuring it is displayed in the visible area of the chart.

Recommended to set to 'top' to ensure the text is fully displayed in the visible area of the chart.

top: Text is below the annotation point, the top edge of the text aligns with the annotation point.

middle: Text is centered on the annotation point, the center of the text aligns with the annotation point.

bottom: Text is above the annotation point, the bottom edge of the text aligns with the annotation point.

:::

**Example**
'top' Text is below the annotation point.

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Background visible.

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color.

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Background border color.

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Background border width.

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Background border radius.

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
Background padding.

:::

**Example**
4

### offsetY

**Type:** `number | undefined`

:::note\{title=Description}
Annotation point vertical offset in pixels. When the annotation point is above the chart (higher value), it is recommended to set a positive value; when the annotation point is below the chart (lower value), it is recommended to set a negative value.

Negative value shifts the entire annotation component (including text and background) upward. For example, -10 shifts it upward by 10 pixels.

Positive value shifts the entire annotation component (including text and background) downward. For example, 10 shifts it downward by 10 pixels.

:::

**Example**
offsetY: 5, shifts the annotation point downward by 5 pixels.

### offsetX

**Type:** `number | undefined`

:::note\{title=Description}
Annotation point horizontal offset in pixels. When the annotation point is on the left side of the chart (start of the category axis), it is recommended to set a positive value; when the annotation point is on the right side of the chart (end of the category axis), it is recommended to set a negative value.

Negative value shifts the entire annotation component (including text and background) to the left. For example, -10 shifts it to the left by 10 pixels.

Positive value shifts the entire annotation component (including text and background) to the right. For example, 10 shifts it to the right by 10 pixels.

:::

**Example**
offsetX: 5, shifts the annotation point to the right by 5 pixels.

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note\{title=Description}
Numeric annotation line, vertical annotation line, marking a specific X-axis value.

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note\{title=Description}
Fixed X value used to annotate a vertical line. For category axes in the X direction, input the dimension value; for numeric axes in the X direction, input the specific value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note\{title=Description}
Animated filter (AI-generated code execution)

Implements animated calculation of the annotation line value via AI-generated JavaScript code.

Suitable for scenarios where the annotation line position needs to be determined animatedly based on data, such as average, maximum, quantile, business lines, etc.

Only supports browser environment (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Get the highest sales value as the annotation line reference"

"Calculate the average sales for the annotation line"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (accessed via \_ or R)

\- Input parameter: data (array)

\- Must return a single number or string: number | string

\- Applicable scenarios: Animated values required for annotation lines (horizontal lines, vertical lines)

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales value as the annotation line value

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate the average value for the annotation line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get the quantile as the annotation line

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

Written during the prepare() phase, read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note\{title=Description}
Annotation text.

:::

**Example**
'Annotation text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note\{title=Description}
Text position, annotation line label position (relative to the line).

:::

**Example**
'outsideEnd'

### textColor

**Type:** `string | undefined`

:::note\{title=Description}
Text color.

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Text font size.

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Text font weight.

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note\{title=Description}
Text alignment. Generally, no need to set.

Recommended to set to 'right' to ensure the text is to the left of the annotation line.

right: Text is to the left of the reference line, the right edge of the text aligns with the (vertical) annotation line.

left: Text is to the right of the reference line, the left edge of the text aligns with the (vertical) annotation line.

center: Text is centered on the reference line, the center of the text aligns with the (vertical) annotation line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Text vertical alignment. Generally, no need to set.

Recommended to set to 'top' to ensure the text is fully displayed in the visible area of the chart.

top: Text is below the reference line, the top edge of the text aligns with the (vertical) annotation line end.

middle: Text is centered on the reference line, the center of the text aligns with the (vertical) annotation line end.

bottom: Text is above the reference line, the bottom edge of the text aligns with the (vertical) annotation line end.

:::

**Example**
'top'

### lineVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Line visible.

:::

**Example**
true

### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Line color.

:::

**Example**
'red'

### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Line width.

:::

**Example**
2

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note\{title=Description}
Line style.

:::

**Example**
'solid'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Background visible.

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color.

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Background border color.

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Background border width.

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Background border radius.

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
Background padding.

:::

**Example**
4

## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note\{title=Description}
Dimension value annotation line, horizontal annotation line, marking a specific Y-axis category.

:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note\{title=Description}
Fixed Y value used to annotate a horizontal line. For category axes in the Y direction, input the dimension value; for numeric axes in the Y direction, input the specific value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note\{title=Description}
Animated filter (AI-generated code execution)

Implements animated calculation of the annotation line value via AI-generated JavaScript code.

Suitable for scenarios where the annotation line position needs to be determined animatedly based on data, such as average, maximum, quantile, business lines, etc.

Only supports browser environment (requires Web Worker).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Get the highest sales value as the annotation line reference"

"Calculate the average sales for the annotation line"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (accessed via \_ or R)

\- Input parameter: data (array)

\- Must return a single number or string: number | string

\- Applicable scenarios: Animated values required for annotation lines (horizontal lines, vertical lines)

\- Prohibited: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
Get the maximum sales value as the annotation line value

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate the average value for the annotation line

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get the quantile as the annotation line

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

Written during the prepare() phase, read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note\{title=Description}
Annotation text.

:::

**Example**
'Annotation text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note\{title=Description}
Text position.

Annotation line label position (relative to the line).

:::

**Example**
'outsideEnd'

### textColor

**Type:** `string | undefined`

:::note\{title=Description}
Text color.

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Text font size.

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Text font weight.

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note\{title=Description}
Text alignment. Generally, no need to set.

Recommended to set to 'right' to ensure the text is to the left of the annotation line.

right: Text is to the left of the reference line, the right edge of the text aligns with the (horizontal) annotation line end.

left: Text is to the right of the reference line, the left edge of the text aligns with the (horizontal) annotation line end.

center: Text is centered on the reference line, the center of the text aligns with the (horizontal) annotation line end.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Text vertical alignment. Generally, no need to set.

Recommended to set to 'top' to ensure the text is fully displayed in the visible area of the chart.

top: Text is below the reference line, the top edge of the text aligns with the (horizontal) annotation line.

middle: Text is centered on the reference line, the center of the text aligns with the (horizontal) annotation line.

bottom: Text is above the reference line, the bottom edge of the text aligns with the (horizontal) annotation line.

:::

**Example**
'top'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Background visible.

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color.

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Background border color.

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Background border width.

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Background border radius.

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
Background padding.

:::

**Example**
4

### lineVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Line visible.

:::

**Example**
true

### lineColor

**Type:** `string | undefined`

:::note\{title=Description}
Line color.

:::

**Example**
'red'

### lineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Line width.

:::

**Example**
2

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note\{title=Description}
Line style.

:::

**Example**
'solid'

### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note\{title=Description}
Whether to enable the function of splitting the main line into two segments.

:::

#### positiveColor

**Type:** `string | undefined`

:::note\{title=Description}
The main color corresponding to the part greater than the annotation value.

:::

#### negativeColor

**Type:** `string | undefined`

:::note\{title=Description}
The main color corresponding to the part less than the annotation value.

:::

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note\{title=Description}
Annotation area configuration, used to highlight specific data ranges.

:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note\{title=Description}
Data used for dependency selection, for data marking.

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field, ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the Dimension field value is in the value list

\- not in: Select data items where the Dimension field value is not in the value list

Same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Dimension field value, supports arrays

:::

### text

**Type:** `string | string[] | undefined`

:::note\{title=Description}
Annotation text.

:::

**Example**
'Annotation text'

### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note\{title=Description}
Text position.

:::

**Example**
'top'

### textColor

**Type:** `string | undefined`

:::note\{title=Description}
Text color.

:::

**Example**
'red'

### textFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Text font size.

:::

**Example**
12

### textFontWeight

**Type:** `number | undefined`

:::note\{title=Description}
Text font weight.

:::

**Example**
400

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note\{title=Description}
Text alignment. Generally, set to 'right' so the text appears in the middle of the annotation area, ensuring it is displayed in the visible area of the chart.

Recommended to set to 'center' to ensure the text is in the middle of the annotation area.

right: Text is to the left of the annotation area, the right edge of the text aligns with the annotation area.

left: Text is to the right of the annotation area, the left edge of the text aligns with the annotation area.

center: Text is centered in the annotation area, the center of the text aligns with the annotation area.

:::

**Example**
'center' Text is in the middle of the annotation area.

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Text vertical alignment. Generally, set to 'top' so the text appears at the bottom of the annotation area, ensuring it is displayed in the visible area of the chart.

Recommended to set to 'top' to ensure the text is fully displayed in the visible area of the chart.

top: Text is at the bottom of the annotation area, the top edge of the text aligns with the annotation area.

middle: Text is centered in the annotation area, the center of the text aligns with the annotation area.

bottom: Text is at the top of the annotation area, the bottom edge of the text aligns with the annotation area.

:::

**Example**
'top' Text is at the bottom of the annotation area.

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Background visible.

:::

**Example**
true

### textBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color.

:::

**Example**
'red'

### textBackgroundBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Background border color.

:::

**Example**
'red'

### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Background border width.

:::

**Example**
2

### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Background border radius.

:::

**Example**
4

### textBackgroundPadding

**Type:** `number | undefined`

:::note\{title=Description}
Background padding.

:::

**Example**
4

### areaColor

**Type:** `string | undefined`

:::note\{title=Description}
Annotation area color.

:::

**Example**
'red'

### areaColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area color opacity.

:::

**Example**
0.5

### areaBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Annotation area border color.

:::

**Example**
'red'

### areaBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area border width.

:::

**Example**
2

### areaBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area border radius.

:::

**Example**
4

### areaLineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Annotation area border line type.

:::

**Example**
\[2, 2]

### outerPadding

**Type:** `number | undefined`

:::note\{title=Description}
Annotation area padding.

:::

**Example**
0

## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note\{title=Description}
Dimension linkage configuration, supports dimension linkage interaction between multiple charts.

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
Whether to display tooltips for all sub-charts corresponding to the dimension.

:::

### showLabel

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to display the label corresponding to the crosshair.

:::

## locale

**Type:** `Locale | undefined`

:::note\{title=Description}
Language configuration.

:::
