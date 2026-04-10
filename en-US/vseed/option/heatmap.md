# Heatmap

:::info{title=Recommended}

* Recommended field configuration: `1` measure(s), `2` dimension(s)

* Supports Data Reshape: at least `1` measure(s), `0` dimension(s)

:::

:::info{title=Encoding Mapping}
The Heatmap Chart supports the following visual channels:

`xAxis`      : x-axis channel, supports `multiple dimensions`, mapped to the x-axis by dimension value

`yAxis`      : y-axis channel, supports `multiple dimensions`, mapped to the y-axis by dimension value

`detail`     : detail channel, supports `multiple dimensions`, used for displaying more granular data within the same color series

`color`      : color channel, supports `one measure`, maps measure values to color intensity

`tooltip`    : tooltip channel, supports `multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`      : label channel, supports `multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Description}
Heatmap Chart, showing distribution and intensity relationships of data through color depth in a two-dimensional matrix.

Applicable scenarios:

* Density and intensity display of large-scale two-dimensional data

* Correlation analysis between categories and numerical values

* Cross-comparison between time series and categories

:::

:::warning{title=Warning}
Data requirements:

* At least 2 dimension fields, used to determine the rows and columns of the Heatmap Chart

* At least 1 numerical field, used to map color depth

* When multiple measures are supported, typically one measure is selected for color mapping

Features enabled by default:

* Legend, axes, data labels, tooltips, and numerical scaling are enabled by default.

:::

## chartType

**Type:** `"heatmap"`

:::note{title=Description}
Heatmap Chart, showing distribution and intensity relationships of data through color depth in a two-dimensional matrix.

:::

**Example**
'heatmap'

## dataset

**Type:** `Record[]`

:::note{title=Description}
Dataset. Compliant with TidyData specification and already aggregated, defines the chart's data source and structure. User input does not require pre-processing; VSeed features powerful Data Reshape capabilities that handle formatting automatically. Heatmap Chart data is ultimately converted to 2 dimensions and 1 measure.

:::

**Example**
\[{month:'Jan', value:100}, {month:'Feb', value:150}, {month:'Mar', value:120}]

## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title=Description}
Dimensions. For Heatmap Charts, the first dimension is traditionally mapped to the X-axis, while other dimensions merge with measure names (if multiple exist) to serve as legend items.

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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=Description}
Channel to which the dimension is mapped:

* xAxis: supports mapping multiple dimensions to the x-axis

* yAxis: supports mapping multiple dimensions to the y-axis

* tooltip: supports mapping multiple dimensions to the tooltip channel

* label: supports mapping multiple dimensions to the label channel

* row: supports mapping multiple dimensions to the row channel

* column: supports mapping multiple dimensions to the column channel

:::

## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title=Description}
Measures. Heatmap Chart measures automatically merge into one measure, mapping to the color scale. If multiple measures exist, their names merge with other dimensions to serve as legend items.

:::

**Example**
\[{id: 'value', alias: 'Value'}]

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
Automatic number formatting, enabled by default, highest priority.

When autoFormat=true, it overrides all numFormat configurations.

When enabled, chart data labels and tooltips will automatically select the appropriate formatting based on measure values and locale.

Formatting rules: decimal numbers with compact notation enabled, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, using the browser's Intl.NumberFormat implementation.

For example:

* locale=zh-CN: 749740.264 → 74.45~74.45万

* locale=en-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Custom number formatting for measures; automatically applied to labels and tooltips.

Note: To use custom formatting, you must explicitly set autoFormat=false; otherwise autoFormat will override this configuration.

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

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g., %, ‰

:::

**Example**

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

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
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

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
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**

* 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
* 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

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

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g., %, ‰

:::

**Example**

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

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
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

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
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**

* 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
* 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title=Description}
Channel to which the measure is mapped:

* color: measure mapped to the color channel

* label: measure mapped to the label channel

* tooltip: measure mapped to the tooltip channel

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
In a flat measure configuration, builds a tree-like measure structure. parentId points to the ID of the parent measure group, used for building the hierarchy.

:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is providing a flat measure list with parentId. These two methods cannot be used simultaneously.

:::

## page

**Type:** `Page | undefined`

:::note{title=Description}
Pagination configuration.

:::

### field

**Type:** `string`

:::note{title=Description}
Pagination field; specifies the field name for pagination, must be a dimension.

:::

### currentValue

**Type:** `string`

:::note{title=Description}
Current pagination value; specifies the value used to determine the current page.

:::

**Example**
'2023-01-01'

## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color.

Background color can be a color string (e.g., 'red', 'blue'), or a hex, rgb, or rgba value (e.g., '#ff0000', 'rgba(255,0,0,0.5)').

:::

## color

**Type:** `Color | undefined`

:::note{title=Description}
Color configuration for defining the chart's color scheme, including color lists, color mappings, and color gradients.

:::

### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Discrete color scheme used to define the colors of different elements in the chart.

:::

**Example**
\['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']

### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Linear gradient color scheme used to define the colors of different elements in the chart.

:::

**Example**
\['#FFCDD2, #F8BBD0]

### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Color mapping used to map data values to specific colors.

:::

**Example**
{
'profit': 'red',
'sales': 'blue',
}

### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Positive/negative color configuration; defines the color for positive values in the chart.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Positive/negative color configuration; defines the color for negative values in the chart.

:::

## label

**Type:** `Label | undefined`

:::note{title=Description}
Heatmap Chart label configuration. Used to define data labels; automatically enables label inversion to ensure readability against background colors.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether label functionality is enabled.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels wrap to the next line.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure values.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Note: Encoding labels have higher priority; this config does not affect encoding labels.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure value percentages.

In multi-measure scenarios, there is no concern about conflicting values because all plot-related measures go through `foldMeasures` processing and are merged into one measure representing a single data point.

Note: Encoding labels have higher priority; this config does not affect encoding labels.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display dimension names.

Displays all dimension labels.

Note: Encoding labels have higher priority; this config does not affect encoding labels.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label values are automatically formatted. When autoFormat is true, numFormat configuration is ignored.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Label value format configuration; merged with the `format` in `measure`, where `measure`'s `format` has higher priority. numFormat priority is lower than autoFormat.

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

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g., %, ‰

:::

**Example**

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

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
Decimal places for number formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits; lower priority than significantDigits.

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
Significant digits for number formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits; higher priority than fractionDigits.

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
Rounding priority for number formatting when both significantDigits and fractionDigits are set; uses the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingPriority.

:::

**Example**

* 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
* 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, using the browser's Intl.NumberFormat, following the same rules as Intl.NumberFormat's roundingMode.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size.

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
Label stroke (outline) color.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Label font color.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically invert the label font color based on the graphic element color.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Label position.

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the label overlap avoidance function is enabled.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Label filtering; the default condition relationship between selectors is OR.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension field ID.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator:

* in: Select data items where the dimension field value is in the 'value' list.

* not in: Select data items where the dimension field value is not in the 'value' list.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator:

* in: Select data items where the dimension field value is in the 'value' list.

* not in: Select data items where the dimension field value is not in the 'value' list.

Same as operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selective dimension values; supports arrays.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (AI-generated code execution).

Implement complex data filtering logic via AI-generated JavaScript code.

Key capabilities:

* Supports any complex data filtering conditions.

* Uses built-in utility functions for data operations.

* Executes safely in the browser environment (Web Worker sandbox).

Requirements: Supports only browser environments; Node.js environments will use the fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Configuration for the chart dynamic filter.

Filter chart marks (columns, points, etc.) via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language).

:::

**Example**
"Highlight sales columns greater than 1000."

"Highlight the column with the highest profit margin in each region."

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

* Can only use built-in utility functions (access via \_ or R).

* Input parameter: data (array); each item includes a \_\_row\_index field representing the row number.

* Must return an array of row index and field combinations: Array<{ \_\_row\_index: number, field: string }>.

* \_\_row\_index represents the row number of the original data item, and field represents the field to be highlighted.

* Prohibited: eval, Function, asynchronous operations, DOM API, network requests.

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

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

##### operator

**Type:** `"in" | "not in" | undefined`

##### op

**Type:** `"in" | "not in" | undefined`

##### value

**Type:** `string | number | (string | number)[]`

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field). Written during the prepare() phase; read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

## legend

**Type:** `ColorLegend | undefined`

:::note{title=Description}
Legend. Color legend configuration for Heatmap Charts, used to define the chart's legend, including position, format, and style.

:::

### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Legend position.

:::

**Example**
position: 'rightTop'

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether legend functionality is enabled.

:::

**Example**
enable: true

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color.

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Legend font size.

:::

**Example**
labelFontSize: 10

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Legend font weight.

:::

**Example**
labelFontWeight: 400

### railBackgroundColor

**Type:** `string | undefined`

### handlerBorderColor

**Type:** `string | undefined`

## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltips configuration, used to define the chart's tooltips, including position, format, and style.

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether tooltip functionality is enabled.

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Brush configuration, used to enable/disable region selection capabilities.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether region selection is enabled.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
Brush type. Defines the selection box shape and direction:

* `rect`: Rectangular selection, allows selecting in both X and Y directions.

* `polygon`: Polygon selection, allows drawing arbitrary shapes by clicking multiple points.

* `x`: Horizontal selection, restricts selection to the X-axis direction.

* `y`: Vertical selection, restricts selection to the Y-axis direction.

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Selection mode, single or multiple. Defines the selection logic:

* `single`: Single selection mode, only one selection box can exist at a time.

* `multiple`: Multiple selection mode, multiple selection boxes can exist simultaneously.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear selection boxes after region selection ends.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Style for data within the selected region.

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity for selected data points, range 0-1.

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
Style for data outside the selected region.

:::

#### opacity

**Type:** `number | undefined`

:::note{title=Description}
Opacity for data points outside the selection, range 0-1.

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

## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Chart theme. Themes are lower-priority configurations containing general settings shared across all chart types and specific settings shared within a chart category.

Light and dark themes are built-in; users can define custom themes via the Builder.

:::

**Example**
'dark'

'light'

'customThemeName'

### length

**Type:** `number`

### brand

**Type:** `brand`

## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Locale. Chart language configuration; supports 'zh-CN' and 'en-US'. Alternatively, call intl.setLocale('zh-CN') to set the language.

:::
