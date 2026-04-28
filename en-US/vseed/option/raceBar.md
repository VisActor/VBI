# RaceBar

:::note\{title=Description}
Race Bar Chart.

Suitable for showing how rankings change over time through animation.

:::

## chartType

**Type:** `"raceBar"`

:::note\{title=Description}
Race Bar Chart. Suitable for showing how rankings change over time through animation.

:::

## dataset

**Type:** `Record[]`

:::note\{title=Description}
Data source.

:::

## dimensions

**Type:** `RaceBarDimension[] | undefined`

:::note\{title=Description}
Dimensions.

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | "player" | undefined`

:::note\{title=Description}
Channel to which the dimension is mapped:

- player: supports mapping multiple dimensions to the player (animation) channel.

- yAxis: supports mapping multiple dimensions to the Y-axis.

- color: supports mapping multiple dimensions to the color channel.

- detail: supports mapping multiple dimensions to the detail channel.

- tooltip: supports mapping multiple dimensions to the tooltip channel.

- label: supports mapping multiple dimensions to the label channel.

- row: supports mapping multiple dimensions to the row channel.

- column: supports mapping multiple dimensions to the column channel.

:::

## measures

**Type:** `RaceBarMeasure[] | undefined`

:::note\{title=Description}
Measures.

:::

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
Automatic number formatting, enabled by default, highest priority.

When autoFormat=true, it overrides all numFormat configurations.

When enabled, chart data labels and tooltips will automatically select the appropriate formatting based on measure values and locale.

Formatting rules: decimal numbers with compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation.

For example:

- locale=zh-CN: 749740.264 → 74.45\~74.45万

- locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note\{title=Description}
Custom number formatting for measures; automatically applied to labels and tooltips.

Note: To use custom formatting, you must explicitly set autoFormat=false; otherwise autoFormat will override this configuration.

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

- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note\{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**

- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**

- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note\{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**

- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note\{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**

- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note\{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

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

- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note\{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**

- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**

- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note\{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**

- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note\{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**

- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note\{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note\{title=Description}
Channel to which the measure is mapped:

- xAxis: measure mapped to the X-axis.

- detail: measure mapped to the detail channel.

- color: measure mapped to the color channel.

- label: measure mapped to the label channel.

- tooltip: measure mapped to the tooltip channel.

:::

### parentId

**Type:** `string | undefined`

:::note\{title=Description}
In a flat measure configuration, builds a tree-like measure structure. parentId points to the ID of the parent measure group, used for building the hierarchy.

:::

:::tip\{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is providing a flat measure list with parentId. These two methods cannot be used simultaneously.

:::

## player

**Type:** `Player | undefined`

:::note\{title=Description}
Player configuration. Used to specify the time dimension, which is the core configuration for Race Bar Charts.

Specifies the field name for playing (animating), which must be a dimension.

:::

:::warning\{title=Warning}
This feature does not support Table, PivotTable, DualAxis, Histogram, BoxPlot, etc., nor does it support measure combinations or row/column pivoting.

:::

### maxCount

**Type:** `number | false | undefined`

:::note\{title=Description}
Maximum number of items to play; data exceeding this count will be truncated. Set to `false` for no limit.

:::

### interval

**Type:** `number | undefined`

:::note\{title=Description}
Playback interval in milliseconds (ms).

:::

### autoPlay

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to start playback automatically.

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
Color of the player's progress bar rail.

:::

### trackColor

**Type:** `string | undefined`

:::note\{title=Description}
Color of the player's progress bar track.

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note\{title=Description}
Color of the player's progress bar slider handle.

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Border color of the slider handle.

:::

### startButtonColor

**Type:** `string | undefined`

:::note\{title=Description}
Color of the player's start button.

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note\{title=Description}
Color of the player's pause button.

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note\{title=Description}
Color of the player's backward button.

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note\{title=Description}
Color of the player's forward button.

:::

## sort

**Type:** `Sort | undefined`

:::note\{title=Description}
Sort configuration. Race Bar Charts typically require animated sorting based on measure values.

Category axis sort configuration. Supports sorting by dimension or measure, as well as custom sort orders.

:::

**Example**

- order: 'asc'
- orderBy: 'date'
  OR
- customOrder: \['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note\{title=Description}
Sort order: 'asc' or 'desc'.

:::

**Example**
order: 'asc'

### orderBy

**Type:** `string | undefined`

:::note\{title=Description}
The field used for sorting; can be a dimension ID or a measure ID.

:::

**Example**

- orderBy: 'date'
- orderBy: 'profit'

### customOrder

**Type:** `string[] | undefined`

:::note\{title=Description}
Custom sort order to be applied directly to the category axis.

:::

## page

**Type:** `Page | undefined`

:::note\{title=Description}
Pagination configuration.

:::

### field

**Type:** `string`

:::note\{title=Description}
Pagination field; specifies the field name for pagination, must be a dimension.

:::

### currentValue

**Type:** `string`

:::note\{title=Description}
Current pagination value; specifies the value used to determine the current page.

:::

**Example**
'2023-01-01'

## backgroundColor

**Type:** `BackgroundColor`

:::note\{title=Description}
Background color.

:::

## color

**Type:** `Color | undefined`

:::note\{title=Description}
Color configuration.

:::

### colorScheme

**Type:** `string[] | undefined`

:::note\{title=Description}
Discrete color scheme used to define the colors of different elements in the chart.

:::

**Example**
\['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']

### linearColorScheme

**Type:** `string[] | undefined`

:::note\{title=Description}
Linear gradient color scheme used to define the colors of different elements in the chart.

:::

**Example**
\['#FFCDD2, #F8BBD0]

### colorMapping

**Type:** `Record<string, string> | undefined`

:::note\{title=Description}
Color mapping used to map data values to specific colors.

:::

**Example**
\{
'profit': 'red',
'sales': 'blue',
}

### positiveColor

**Type:** `string | undefined`

:::note\{title=Description}
Positive/negative color configuration; defines the color for positive values in the chart.

:::

### negativeColor

**Type:** `string | undefined`

:::note\{title=Description}
Positive/negative color configuration; defines the color for negative values in the chart.

:::

## label

**Type:** `Label | undefined`

:::note\{title=Description}
Label configuration.

:::

### enable

**Type:** `false | true`

:::note\{title=Description}
Whether label functionality is enabled.

:::

### wrap

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether labels wrap to the next line.

:::

### showValue

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether labels display measure values.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Note: Encoding labels have higher priority; this config does not affect encoding labels.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether labels display measure value percentages.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Note: Encoding labels have higher priority; this config does not affect encoding labels.

:::

### showDimension

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether labels display dimension names.

Displays all dimension labels.

Note: Encoding labels have higher priority; this config does not affect encoding labels.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether label values are automatically formatted. When autoFormat is true, numFormat configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note\{title=Description}
Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

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

- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note\{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**

- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**

- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note\{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**

- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note\{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**

- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note\{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### labelFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Label font size.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note\{title=Description}
Label font weight.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Label background color.

:::

### labelStroke

**Type:** `string | undefined`

:::note\{title=Description}
Label stroke (outline) color.

:::

### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Label font color.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically invert the label font color based on the bar color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note\{title=Description}
Label position.

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the label overlap avoidance function is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Label filtering; the default condition relationship between selectors is OR.

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field ID.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Selective dimension values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution).

Implement complex data filtering logic via AI-generated JavaScript code.

Key capabilities:

- Supports any complex data filtering conditions.

- Uses built-in utility functions for data operations.

- Executes safely in the browser environment (Web Worker sandbox).

Requirements: Supports only browser environments; Node.js environments will use the fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Configuration for the chart dynamic filter.

Filter chart marks (bars, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language).

:::

**Example**
"Highlight bars where sales are greater than 1000."

"Highlight the item with the highest profit margin in each region."

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code.

- Can only use built-in utility functions (access via \_ or R).

- Input parameter: data (array); each item includes a \_\_row\_index field representing the row number.

- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>.

- \_\_row\_index represents the row number of the original data item, and field represents the field to be highlighted.

- Prohibited: eval, Function, asynchronous operations, DOM API, network requests.

:::

**Example**
Highlight 'sales' field for data items where sales > 1000:

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight data items with the highest profit margin in each region:

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

Highlight data items meeting multiple filtering conditions:

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
Fallback plan when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field ID.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

Same as operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Selective dimension values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution result (runtime field). Written during the prepare() phase; read-only at runtime.

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
Whether the legend border is enabled.

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
Maximum number of columns or rows for the legend when many items exist.

If position is horizontal (bottom, top, etc.), maxSize controls the number of columns.
If position is vertical (left, right, etc.), maxSize controls the number of rows.

:::

:::warning\{title=Warning}
Only effective for discrete legends.

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note\{title=Description}
Tooltip configuration.

:::

### enable

**Type:** `false | true`

:::note\{title=Description}
Whether tooltip functionality is enabled.

:::

## brush

**Type:** `Brush | undefined`

:::note\{title=Description}
Brush configuration.

:::

### enable

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether region selection is enabled.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note\{title=Description}
Brush type. Defines the selection box shape and direction:

- `rect`: Rectangular selection, allows selecting in both X and Y directions.

- `polygon`: Polygon selection, allows drawing arbitrary shapes by clicking multiple points.

- `x`: Horizontal selection, restricts selection to the X-axis direction.

- `y`: Vertical selection, restricts selection to the Y-axis direction.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note\{title=Description}
Selection mode, single or multiple. Defines the selection logic:

- `single`: Single selection mode, only one selection box can exist at a time.

- `multiple`: Multiple selection mode, multiple selection boxes can exist simultaneously.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to clear selection boxes after region selection ends.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
Style for data within the selected region.

:::

#### opacity

**Type:** `number | undefined`

:::note\{title=Description}
Opacity for selected data points, range 0-1.

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
Style for data outside the selected region.

:::

#### opacity

**Type:** `number | undefined`

:::note\{title=Description}
Opacity for data points outside the selection, range 0-1.

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

## xAxis

**Type:** `XLinearAxis | undefined`

:::note\{title=Description}
X-axis configuration. A numeric axis used for displaying measure values.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is visible.

:::

### min

**Type:** `number | undefined`

:::note\{title=Description}
Minimum value of the axis. Higher priority than `nice` and `zero`.

:::

### max

**Type:** `number | boolean | undefined`

:::note\{title=Description}
Maximum value of the axis. Higher priority than `nice` and `zero`. If `true`, the maximum value is automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to use a logarithmic axis. Only effective for numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note\{title=Description}
The base of the logarithm for a logarithmic axis. Only effective for numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically adjust axis tick intervals for readability. Ignored if `min` and `max` are set. Only effective for numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is reversed. Only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to force 0 to be displayed on the axis. Ignored if `min` and `max` are set. Only effective for numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically format axis labels. Only effective for numeric axes. If `true`, `numFormat` is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note\{title=Description}
Number formatting for the numeric axis. Lower priority than `autoFormat`.

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

- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note\{title=Description}
Number format symbol, e.g. %, ‰

:::

**Example**

- 100000 converts to 10W, ratio:10000, symbol:"W"
- 100000 converts to 10K, ratio:1000, symbol:"K"

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

:::

**Example**

- 1234.5678 converts to 1235, fractionDigits:0 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
- 1234.5678 converts to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

:::note\{title=Description}
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

:::

**Example**

- 1234.5678 converts to 1000, significantDigits:1
- 1234.5678 converts to 1200, significantDigits:2
- 1234.5678 converts to 1230, significantDigits:3
- 1234.5678 converts to 1234, significantDigits:4
- 1234.5678 converts to 1234.6, significantDigits:5 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.57, significantDigits:6 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.568, significantDigits:7 (roundingMode:halfCeil)
- 1234.5678 converts to 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note\{title=Description}
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**

- 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
- 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note\{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note\{title=Description}
X-axis tick labels.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether labels are visible.

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

:::note\{Description}
Axis line width.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note\{title=Description}
X-axis ticks.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether ticks point inwards.

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
Title text. Defaults to field configuration.

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
X-axis grid lines.

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
Grid line dash pattern.

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

**Type:** `YBandAxis | undefined`

:::note\{title=Description}
Y-axis configuration. A category axis for displaying dimension values, with vertical sorting of bars.

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is visible.

:::

### inverse

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the axis is reversed. Only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to force 0 to be displayed on the axis. Ignored if `min` and `max` are set. Only effective for numeric axes.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically hide overlapping labels. Only effective for category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note\{title=Description}
The minimum gap between labels; labels are hidden if the gap is smaller than this value. Only effective for category axes.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically rotate labels when they exceed the axis length. Only effective for category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note\{title=Description}
The range of allowed rotation angles. Only effective for category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to automatically limit label length. Excess text is replaced with an ellipsis and shown on hover. Only effective for category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note\{title=Description}
The maximum length for axis labels. Excess text is replaced with an ellipsis and shown on hover. Only effective for category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note\{title=Description}
Y-axis tick labels.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether labels are visible.

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
Y-axis line.

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
Y-axis ticks.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether ticks point inwards.

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
Y-axis title.

:::

#### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note\{title=Description}
Title text. Defaults to field configuration.

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
Y-axis grid lines.

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
Grid line dash pattern.

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
Crosshair rectangle area configuration (for horizontal tooltips).

:::

### visible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to show the crosshair rectangle area.

:::

### rectColor

**Type:** `string | undefined`

:::note\{title=Description}
Color of the crosshair rectangle area.

:::

### labelColor

**Type:** `string | undefined`

:::note\{title=Description}
Color of the crosshair rectangle label.

:::

### labelVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to show the crosshair rectangle label.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color of the crosshair rectangle label.

:::

## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note\{title=Description}
Stacking corner radius.

:::

## barMaxWidth

**Type:** `string | number | undefined`

:::note\{title=Description}
Maximum width (or height) of the bars.

:::

## sortLegend

**Type:** `SortLegend | undefined`

:::note\{title=Description}
Legend sort configuration. Supports sorting by dimension or measure, as well as custom sort orders. The sorting follows a left-to-right or top-to-bottom order.

:::

**Example**

- order: 'asc'
- orderBy: 'date'
  OR
- customOrder: \['2019', '2020', '2021']

### order

**Type:** `"asc" | "desc" | undefined`

:::note\{title=Description}
Sort order: 'asc' or 'desc'.

:::

**Example**
order: 'asc'

### orderBy

**Type:** `string | undefined`

:::note\{title=Description}
The field used for sorting; can be a dimension ID or a measure ID.

:::

**Example**

- orderBy: 'date'
- orderBy: 'profit'

### customOrder

**Type:** `string[] | undefined`

:::note\{title=Description}
Custom sort order for the legend; 'ascending' is left-to-right or top-to-bottom, 'descending' is right-to-left or bottom-to-top.

:::

## theme

**Type:** `Theme | undefined`

:::note\{title=Description}
Theme. Light and dark themes are built-in; new themes can be added via `registerTheme`.

:::

### length

**Type:** `number`

### brand

**Type:** `brand`

## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note\{title=Description}
Bar chart styling configuration.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Data selector.

Provides four types of data matching: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If not configured, the style applies globally.

:::

**Example**
Numeric selector:
selector = "tool"
selector = \["tool", "book"]
selector = 100
selector = \[100, 200]

Local data selector:
selector = \{ profit: 100 }
selector = \[\{ profit: 100 }, \{ profit: 200 }]

Conditional dimension selector:
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

Conditional measure selector:
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
Dimension field ID.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Selective dimension values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution).

Implement complex data filtering logic via AI-generated JavaScript code. Suitable for scenarios where static selectors are insufficient (e.g., Top N, statistical analysis).

Key capabilities:

- Supports any complex data filtering conditions.

- Uses built-in utility functions for data operations.

- Executes safely in the browser environment (Web Worker sandbox).

Requirements: Supports only browser environments; Node.js environments will use the fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Configuration for the chart dynamic filter.

Filter chart marks (bars, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language).

:::

**Example**
"Highlight bars where sales are greater than 1000."

"Highlight the item with the highest profit margin in each region."

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code.

- Can only use built-in utility functions (access via \_ or R).

- Input parameter: data (array); each item includes a \_\_row\_index field representing the row number.

- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>.

- \_\_row\_index represents the row number of the original data item, and field represents the field to be highlighted.

- Prohibited: eval, Function, asynchronous operations, DOM API, network requests.

:::

**Example**
Highlight 'sales' field for data items where sales > 1000:

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight data items with the highest profit margin in each region:

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

Highlight data items meeting multiple filtering conditions:

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
Fallback plan when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field ID.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

Same as operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Selective dimension values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution result (runtime field). Written during the prepare() phase; read-only at runtime.

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
Whether the bar elements (rectangles) are visible.

:::

### barColor

**Type:** `string | undefined`

:::note\{title=Description}
Color of the bar elements.

:::

### barColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Opacity of the bar elements' color.

:::

### barBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Border color of the bar elements.

:::

### barBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Border width of the bar elements.

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note\{title=Description}
Border style of the bar elements.

:::

**Example**
solid

dashed

dotted

### barBorderOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Border (stroke) opacity of the bar elements.

:::

**Example**
4

\[0, 0, 10, 10]

### barRadius

**Type:** `number | number[] | undefined`

:::note\{title=Description}
Corner radius of the bar elements.

:::

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note\{title=Description}
Annotation point configuration.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Data point selector for annotations.

:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field ID.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Selective dimension values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution).

Implement complex data filtering logic via AI-generated JavaScript code. Suitable for scenarios where static selectors are insufficient (e.g., Top N, statistical analysis).

Key capabilities:

- Supports any complex data filtering conditions.

- Uses built-in utility functions for data operations.

- Executes safely in the browser environment (Web Worker sandbox).

Requirements: Supports only browser environments; Node.js environments will use the fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Configuration for the chart dynamic filter.

Filter chart marks (bars, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language).

:::

**Example**
"Highlight bars where sales are greater than 1000."

"Highlight the item with the highest profit margin in each region."

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code.

- Can only use built-in utility functions (access via \_ or R).

- Input parameter: data (array); each item includes a \_\_row\_index field representing the row number.

- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>.

- \_\_row\_index represents the row number of the original data item, and field represents the field to be highlighted.

- Prohibited: eval, Function, asynchronous operations, DOM API, network requests.

:::

**Example**
Highlight 'sales' field for data items where sales > 1000:

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight data items with the highest profit margin in each region:

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

Highlight data items meeting multiple filtering conditions:

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
Fallback plan when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field ID.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator:

- in: Select data items where the dimension field value is in the 'value' list.

- not in: Select data items where the dimension field value is not in the 'value' list.

Same as operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Selective dimension values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution result (runtime field). Written during the prepare() phase; read-only at runtime.

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
'Annotation Text'

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
Text alignment. Recommended: 'right' ensuring text is on the left of the annotation point (visible within the chart).

- right: Text is on the left of the point; right edge aligns with the point.

- left: Text is on the right of the point; left edge aligns with the point.

- center: Text is centered on the point.

:::

**Example**
'right' (Text is on the left of the point)

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Vertical baseline. Recommended: 'top' ensuring text is at the bottom of the point (visible within the chart).

- top: Text is at the bottom; top edge aligns with the point.

- middle: Text is vertically centered on the point.

- bottom: Text is at the top; bottom edge aligns with the point.

:::

**Example**
'top' (Text is at the bottom of the point)

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the text background is visible.

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
Background corner radius.

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
Vertical offset in pixels for the entire annotation component.

- Positive: Moves downward (e.g., 10px).

- Negative: Moves upward (e.g., -10px).

Recommended for points at the top/bottom of the chart to ensure visibility.

:::

**Example**
offsetY: 5 (Moves the annotation component 5 pixels downward)

### offsetX

**Type:** `number | undefined`

:::note\{title=Description}
Horizontal offset in pixels for the entire annotation component.

- Positive: Moves rightward (e.g., 10px).

- Negative: Moves leftward (e.g., -10px).

Recommended for points at the edges of the chart to ensure visibility.

:::

**Example**
offsetX: 5 (Moves the annotation component 5 pixels rightward)

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note\{title=Description}
Numeric annotation line (Vertical).
:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note\{title=Description}
Fixed X-value for the vertical annotation line. Input dimension values (if category axis) or numeric values (if numeric axis).
:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution). Dynamically calculate the value for the annotation line (e.g., average, maximum, quantiles) based on data. Requires browser environment (Web Worker).
:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language).
:::

**Example**
"Use the maximum sales value as the annotation line reference."

"Calculate average sales for the annotation line."

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript calculation code.

- Can only use built-in utility functions (access via \_ or R).

- Input parameter: data (array).

- Must return a single value: number | string.

- Prohibited: eval, Function, asynchronous operations, DOM API, network requests.

:::

**Example**
Get maximum sales:

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average sales:

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get 75th percentile:

```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

#### fallback

**Type:** `string | number | undefined`

:::note\{title=Description}
Fallback value when code execution fails or the environment is not supported.
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note\{title=Description}
Dynamic filter execution result (runtime field). Written during the prepare() phase.
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
'Annotation Text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note\{title=Description}
Text position relative to the annotation line.
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
Text alignment. Recommended: 'right' ensuring text is on the left of the line.

- right: Text is on the left; right edge aligns with the (vertical) line.

- left: Text is on the right; left edge aligns with the (vertical) line.

- center: Text is centered on the (vertical) line.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Vertical baseline. Recommended: 'top' ensuring text visibility.

- top: Text is at the bottom; top edge aligns with the line endpoint.

- middle: Text is vertically centered on the line endpoint.

- bottom: Text is at the top; bottom edge aligns with the line endpoint.

:::

**Example**
'top'

### lineVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the line is visible.
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
Whether the text background is visible.
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
Background corner radius.
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
Dimension annotation line (Horizontal).
:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note\{title=Description}
Fixed Y-value for the horizontal annotation line. Input dimension values (if category axis) or numeric values (if numeric axis).
:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution). Dynamically calculate the value for the annotation line based on data. Requires browser environment (Web Worker).
:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language).
:::

**Example**
"Use the maximum sales value as the annotation line reference."

"Calculate average sales for the annotation line."

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript calculation code.

- Can only use built-in utility functions (access via \_ or R).

- Input parameter: data (array).

- Must return a single value: number | string.

- Prohibited: eval, Function, asynchronous operations, DOM API, network requests.

:::

**Example**
Get maximum sales:

```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average sales:

```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

#### fallback

**Type:** `string | number | undefined`

:::note\{title=Description}
Fallback value when code execution fails or the environment is not supported.
:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note\{title=Description}
Dynamic filter execution result (runtime field). Written during the prepare() phase.
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
'Annotation Text'

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note\{title=Description}
Text position relative to the line.
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
Text alignment. Recommended: 'right' ensuring text is on the left of the line endpoints.

- right: Text is on the left; right edge aligns with the (horizontal) line endpoint.

- left: Text is on the right; left edge aligns with the (horizontal) line endpoint.

- center: Text is centered on the (horizontal) line endpoint.

:::

**Example**
'right'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Vertical baseline. Recommended: 'top' ensuring visibility.

- top: Text is at the bottom; top edge aligns with the (horizontal) line.

- middle: Text is vertically centered on the (horizontal) line.

- bottom: Text is at the top; bottom edge aligns with the (horizontal) line.

:::

**Example**
'top'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the text background is visible.
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
Background corner radius.
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
Whether the line is visible.
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
Whether to split the main line into two segments (above/below the annotation value).
:::

#### positiveColor

**Type:** `string | undefined`

:::note\{title=Description}
The primary color for segments exceeding the annotation value.
:::

#### negativeColor

**Type:** `string | undefined`

:::note\{title=Description}
The primary color for segments below the annotation value.
:::

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note\{title=Description}
Annotation area configuration.
:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note\{title=Description}
Selects data points to define the marked area.
:::

#### field

**Type:** `string`

:::note\{title=Description}
Dimension field ID.
:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator (in / not in).
:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator (in / not in). Same as `operator`.
:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Dimension values; supports arrays.
:::

### text

**Type:** `string | string[] | undefined`

:::note\{title=Description}
Annotation text.
:::

**Example**
'Annotation Text'

### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note\{title=Description}
Text position within the annotation area.
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
Text alignment. Recommended: 'center' for centered display.

- right: Right edge aligns with the area boundary.

- left: Left edge aligns with the area boundary.

- center: Centered within the area.

:::

**Example**
'center'

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note\{title=Description}
Vertical baseline. Recommended: 'top' for visibility at the bottom.

- top: Text is at the bottom; top edge aligns with the area.

- middle: Centered within the area.

- bottom: Text is at the top; bottom edge aligns with the area.

:::

**Example**
'top'

### textBackgroundVisible

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the text background is visible.
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
Background corner radius.
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
Color of the annotation area.
:::

**Example**
'red'

### areaColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Opacity of the annotation area color.
:::

**Example**
0.5

### areaBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Border color of the annotation area.
:::

**Example**
'red'

### areaBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Border width of the annotation area.
:::

**Example**
2

### areaBorderRadius

**Type:** `number | undefined`

:::note\{title=Description}
Corner radius of the annotation area.
:::

**Example**
4

### areaLineDash

**Type:** `number[] | undefined`

:::note\{title=Description}
Dash pattern for the annotation area border.
:::

**Example**
\[2, 2]

### outerPadding

**Type:** `number | undefined`

:::note\{title=Description}
Padding for the annotation area.
:::

**Example**
0

## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note\{title=Description}
Dimension linkage configuration.
:::

### enable

**Type:** `false | true`

:::note\{title=Description}
Whether to enable dimension linkage.
:::

### showTooltip

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to show tooltips for all linked dimension sub-charts.
:::

### showLabel

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to show labels for the linked crosshairs.
:::

## locale

**Type:** `Locale | undefined`

:::note\{title=Description}
Language configuration.
:::
