# Radar

:::info\{title=Recommended}
\- Recommended field configuration: `1` measure(s), `1` dimension(s)

\- Supports Data Reshape: at least`1` measure(s), `0` dimension(s)

:::

:::info\{title=Encoding Mapping}
The Radar Chart supports the following visual channels:

`angle`  : Angle channel, supports `multiple dimensions`, mapping dimension values to the angle axis.

`radius` : Radius channel, supports `multiple measures`, mapping measure values to the radius axis.

`color`  : Color channel, supports `multiple dimensions` or `one measure`. Dimensions are used to distinguish different data series, while measures are used for linearly mapping values to colors.

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`, displayed when hovering over data elements.

`label`  : Label channel, supports `multiple dimensions` and `multiple measures`, displaying data labels on data points.

:::

:::note\{title=Description}
Radar Chart: Suitable for comparative analysis of multi-dimensional data, displaying the distribution of each dimension through a multi-axis coordinate system.

**Applicable scenarios:**

\- Comparative analysis of comprehensive performance across multiple dimensions.

\- Performance evaluation of multiple subjects across multiple measures.

\- Visualizing multi-dimensional characteristics of categorical data.

:::

:::warning\{title=Warning}
Data requirements:

\- At least one numeric field.

\- The first dimension(s) serve as the radar chart's axis dimensions, while other dimensions distinguish different data series for comparison.

\- Supports multiple measures displayed as different data series.

**Features enabled by default:**

\- Legend, radar coordinate system, data labels, tooltips, and numeric scaling are enabled by default.

:::

## chartType

**Type:** `"radar"`

:::note\{title=Description}
Radar Chart: Displays comparative relationships of multi-dimensional data through a multi-axis coordinate system.

:::

**Example**
'radar'

## dataset

**Type:** `Record[]`

:::note\{title=Description}
Dataset: An aggregated dataset conforming to the TidyData specification, defining the data source and structure. VSeed features powerful data reshaping capabilities and will automatically process the input data. Radar chart data is ultimately converted to two dimensions and one measure for mapping.

:::

**Example**
\[\{month:'Jan', value:100}, \{month:'Feb', value:150}, \{month:'Mar', value:120}]

## dimensions

**Type:** `RadarDimension[] | undefined`

:::note\{title=Description}
Dimensions: The first dimension is mapped to the angle axis. Remaining dimensions are combined with measure names (if multiple measures exist) to serve as legend items for series differentiation.

:::

**Example**
\[\{id: 'category', alias: 'Category'}]

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

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note\{title=Description}
Channel to which the dimension is mapped

\- angle: supports mapping multiple dimensions to the angle channel

\- color: supports mapping multiple dimensions to the color channel

\- detail: supports mapping multiple dimensions to the detail channel

\- tooltip: supports mapping multiple dimensions to the tooltip channel

\- label: supports mapping multiple dimensions to the label channel

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::

## measures

**Type:** `RadarMeasure[] | undefined`

:::note\{title=Description}
Measures: Radar chart measures are automatically merged into one composite measure and mapped to the radius axis. When multiple measures exist, their names are combined with dimensions to serve as legend items for series differentiation.

:::

**Example**
\[\{id: 'value', alias: 'Value'}]

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

\- locale=zh-CN: 749740.264 → 744.5万

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

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note\{title=Description}
Channel to which the measure is mapped

\- radius: measure mapped to the radius channel

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
Pagination configuration: Used to specify the field name for pagination, which must be a dimension.

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
Whether labels display the percentage of measure values.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures undergo `foldMeasures` processing and are merged into one measure representing a single data point.

Note: encoding's label has higher priority; this config does not affect encoding's label.

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
Whether the label color is automatically inverted based on the element color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note\{title=Description}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the label anti-overlap function is enabled

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Label filtering; the default relationship between selectors is 'OR'

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

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code

Core capabilities:

\- Supports any complex data filtering conditions

\- Use built-in utility functions for data operations

\- Execute safely in the browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environment; Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart dynamic filter configuration

Implement filtering of chart marks (bars, points, etc.) via AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (accessed via \_ or R)

\- Input parameters: data (array), each item contains \_\_row\_index field representing line number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's row number, field represents the field to be highlighted

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

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

Highlight data items with the highest profit margin in each region

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
Fallback solution when code execution fails or the environment is not supported

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

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

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
Legend

Legend configuration, used to define the chart's legend, including its position, format, style, etc.

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
Whether legend border is enabled

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
Maximum number of columns or rows when there are many legend items;

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of rows displayed

:::

:::warning\{title=Warning}
Only effective for discrete legends

:::

**Example**
maxSize: 2

## tooltip

**Type:** `Tooltip | undefined`

:::note\{title=Description}
Tooltip

Tooltip configuration, used to define the chart's tooltips, including its position, format, style, etc.

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

Brush configuration, used to enable/disable the brush selection capability.

Chart brush configuration

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

Define the shape and direction of the brush selection box

\- `rect`: Rectangular selection, can pick in both X and Y directions simultaneously

\- `polygon`: Polygon selection, pick an arbitrary polygon by clicking multiple points

\- `x`: X-axis selection, only pick along the X-axis, no restriction on the Y-axis

\- `y`: Y-axis selection, only pick along the Y-axis, no restriction on the X-axis

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note\{title=Description}
Selection mode: single or multiple

Define the picking mode

\- `single`: Single selection mode, only one picking box at a time

\- `multiple`: Multiple selection mode, multiple picking boxes can exist simultaneously

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to clear the selection box after picking ends

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note\{title=Description}
Style of selected data

Define the style of picked data points

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
Style of unselected data

Define the style of unpicked data points

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

## theme

**Type:** `Theme | undefined`

:::note\{title=Description}
Chart theme. Theme is a low-priority configuration that includes common settings shared across all chart types and specific settings for a single chart type.

Built-in light and dark themes; users can customize themes via Builder.

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

## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note\{title=Description}
Point element style configuration, used to define the chart's point element styles, including color, border, etc.

Supports global style or conditional style configuration.

Data filter

If selector is configured, it provides four types of data matching capabilities: numerical selector, partial data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Data selector

If selector is configured, it provides four types of data matching capabilities: numerical selector, partial data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.

:::

**Example**
Numerical selector
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
Dimension field, the ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code

Suitable for scenarios that are difficult to express with static selectors, such as Top N, statistical analysis, and complex conditions

Core capabilities:

\- Supports any complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Safely executed in the browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environment; Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart dynamic filter configuration

Implement filtering of chart marks (bars, points, etc.) using AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (accessed via \_ or R)

\- Input parameters: data (array), each item contains \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's row number, field represents the field to be highlighted

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

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

Highlight data items with the highest profit margin in each region

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
Fallback solution when code execution fails or the environment is not supported

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

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

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

:::note\{title=Description}
Whether the point is visible

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
Point element color

Point element color

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Point element color opacity

Point element color opacity

:::

### pointBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Point element border color

Point element border color

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note\{title=Description}
Point element border width

Point element border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note\{title=Description}
Point element border style

Point element border style

:::

**Example**
solid

dashed

dotted

## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note\{title=Description}
Line element style configuration, used to define the chart's line element styles, including color, opacity, curve, etc.

Supports global style or conditional style configuration.

Data filter

If selector is configured, it provides four types of data matching capabilities: numerical selector, partial data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Data selector

If selector is configured, it provides four types of data matching capabilities: numerical selector, partial data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.

:::

**Example**
Numerical selector
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
Dimension field, the ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code

Suitable for scenarios that are difficult to express with static selectors, such as Top N, statistical analysis, and complex conditions

Core capabilities:

\- Supports any complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Safely executed in the browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environment; Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart dynamic filter configuration

Implement filtering of chart marks (bars, points, etc.) using AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (accessed via \_ or R)

\- Input parameters: data (array), each item contains \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's row number, field represents the field to be highlighted

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

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

Highlight data items with the highest profit margin in each region

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
Fallback solution when code execution fails or the environment is not supported

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

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

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

:::note\{title=Description}
Whether the line segment is visible

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether the line segment is smooth

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
Area element style configuration, used to define the chart's area element styles, including color, opacity, border, etc.

Supports global style or conditional style configuration.

Data filter

If selector is configured, it provides four types of data matching capabilities: numerical selector, partial data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Data selector

If selector is configured, it provides four types of data matching capabilities: numerical selector, partial data selector, conditional dimension selector, and conditional measure selector.

If selector is not configured, the style applies globally.

:::

**Example**
Numerical selector
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
Dimension field, the ID of a dimension item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (AI-generated code execution)

Implement complex data filtering logic via AI-generated JavaScript code

Suitable for scenarios that are difficult to express with static selectors, such as Top N, statistical analysis, and complex conditions

Core capabilities:

\- Supports any complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Safely executed in the browser environment (Web Worker sandbox)

Environment requirements: Only supports browser environment; Node.js environment will use fallback

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority

Chart dynamic filter configuration

Implement filtering of chart marks (bars, points, etc.) using AI-generated JavaScript code

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language)

:::

**Example**
"Highlight bars with sales greater than 1000"

"Highlight the bar with the highest profit margin in each region"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code

\- Can only use built-in utility functions (accessed via \_ or R)

\- Input parameters: data (array), each item contains \_\_row\_index field representing the row number

\- Must return an array of row index and field combinations: Array\<\{ \_\_row\_index: number, field: string }>

\- \_\_row\_index represents the original data item's row number, field represents the field to be highlighted

\- Forbidden: eval, Function, asynchronous operations, DOM API, network requests

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

Highlight data items with the highest profit margin in each region

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
Fallback solution when code execution fails or the environment is not supported

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

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Select data items where the value of the dimension field is in 'value'

\- not in: Select data items where the value of the dimension field is not in 'value'

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Select the value of the dimension field in the data item, supports arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution results (runtime field)

Written during the prepare() phase, read-only at runtime

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
Whether the area element is visible

Whether the area element is visible

:::

### areaColor

**Type:** `string | undefined`

:::note\{title=Description}
Area element color

Area element color

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note\{title=Description}
Area element color opacity

Area element color opacity

:::

## locale

**Type:** `Locale | undefined`

:::note\{title=Description}
Language

Chart language configuration. Supports 'zh-CN' and 'en-US'. Additionally, the intl.setLocale('zh-CN') method can be called to set the language.

:::
