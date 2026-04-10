# Dual Axis Chart

:::info{title=Recommended}

* Recommended field configuration: `2` measure(s), `2` dimension(s)

* Supports Data Reshape: at least `1` measure(s), `0` dimension(s)

:::

:::info{title=Encoding Mapping}
Dual Axis Chart supports the following visual channels:

`xAxis`          : x-axis channel, supports `multiple dimensions`, mapped to the x-axis by dimension value

`primaryYAxis`   : primary y-axis channel, supports `multiple measures`, maps measures to the primary axis

`secondaryYAxis` : secondary y-axis channel, supports `multiple measures`, maps measures to the secondary axis

`detail`         : detail channel, supports `multiple dimensions`, used for displaying more granular data within the same color series

`color`          : color channel, supports `multiple dimensions` or `one measure`, dimension colors are used to distinguish different data series, measure colors are used for linearly mapping measure values to graphical colors

`tooltip`        : tooltip channel, supports `multiple dimensions` and `multiple measures`, displayed when hovering over a data point

`label`          : label channel, supports `multiple dimensions` and `multiple measures`, displays data labels on data points

:::

:::note{title=Description}
Dual Axis Chart, suitable for comparing the relationship between two measures of different magnitudes or units, including primary and secondary axes.

Applicable scenarios:

* Comparative analysis of measures with different magnitudes

* Trend comparison of correlated measures

* Simultaneously displaying composite measures like values and growth rates

* Supports combinations of different chart types (e.g., Line + Bar / Line + Area / Area + Bar)

:::

:::warning{title=Warning}
Data requirements:

* At least 1 measure field

* Supports measure groups; the first group is placed on the primary (left) axis, the second on the secondary (right) axis

* The first dimension is placed on the X-axis; other dimensions merge with measure names (if multiple measures exist) to form legend items.

* Two measure groups can be mapped to the left and right Y-axes respectively; all measures within a group are automatically combined.

Features enabled by default:

* Axes, legend, data labels, and tooltips are enabled by default.

:::

## chartType

**Type:** `"dualAxis"`

:::note{title=Description}
Dual Axis Chart, a composite chart showing the comparison between two measures of different magnitudes.

:::

**Example**
'dualAxis'

## dataset

**Type:** `Record[]`

:::note{title=Description}
Dataset, compliant with TidyData specification and already aggregated, defines the chart's data source and structure. User input does not require pre-processing; VSeed features powerful Data Reshape capabilities that handle formatting automatically. Dual Axis Chart data is ultimately converted to 2 dimensions and 1 or 2 measure(s) (depending on if measure groups are configured).

:::

**Example**
\[{month:'Jan', value:100, growth:0.2}, {month:'Feb', value:150, growth:0.5}]

## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title=Description}
Dimensions; the first dimension is placed on the X-axis, while other dimensions merge with measure names (if multiple exist) to form legend items.

:::

**Example**
\[{id: 'month', alias: 'Month'}]

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

**Type:** `DualAxisMeasure[] | undefined`

:::note{title=Description}
Dual Axis Chart measures.

Measures mapped to primaryYAxis and secondaryYAxis through encoding can be grouped by setting the `parentId` property. Measures in different groups will be displayed in different sub-charts. You can also set the `chartType` property to specify the chart type for each measure group.

:::

**Example**
\[{ id: 'value', encoding: 'primaryYAxis' }, { id: 'growth', encoding: 'secondaryYAxis' }]

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
Number format symbol, e.g. %, ‰

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
Number format symbol, e.g. %, ‰

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

**Type:** `"color" | "tooltip" | "label" | "primaryYAxis" | "secondaryYAxis" | undefined`

:::note{title=Description}
Channel to which the measure is mapped:

* primaryYAxis: Measure mapped to the primary Y-axis.

* secondaryYAxis: Measure mapped to the secondary Y-axis.

* color: Measure mapped to the color channel.

* label: Measure mapped to the label channel.

* tooltip: Measure mapped to the tooltip channel.

:::

### parentId

**Type:** `string | undefined`

:::note{title=Description}
In a flat measure configuration, builds a tree-like measure structure. parentId points to the ID of the parent measure group, used for building the hierarchy.

:::

:::tip{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is providing a flat measure list with parentId. These two methods cannot be used simultaneously.

:::

### chartType

**Type:** `"area" | "column" | "areaPercent" | "columnParallel" | "columnPercent" | "line" | "scatter" | undefined`

:::note{title=Description}
Sets the chart type for this measure group in the Dual Axis Chart.

* line: Line Chart

* column: Bar (Column) Chart

* columnParallel: Parallel Column Chart

* columnPercent: Percent Column Chart

* area: Area Chart

* areaPercent: Percent Area Chart

* scatter: Scatter Chart

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

## alignTicks

**Type:** `boolean | boolean[] | undefined`

:::note{title=Description}
Defines whether the scales of the two axes in the Dual Axis Chart are aligned. When multiple measure groups exist, alignTicks can be configured as an array, with each item indicating if the respective axes should align.

:::

**Example**
{"chartType":"dualAxis","dataset":\[{"date":"2019","profit":10,"sales":100},{"date":"2020","profit":30,"sales":200},{"date":"2021","profit":30,"sales":300},{"date":"2022","profit":50,"sales":500}],"alignTicks":\[false,true],"dualMeasures":\[{"primaryMeasures":\[{"id":"profit"}],"secondaryMeasures":\[{"id":"sales"}]},{"primaryMeasures":\[{"id":"profit"}],"secondaryMeasures":\[{"id":"sales"}]}]}

## primaryYAxis

**Type:** `YLinearAxis | YLinearAxis[] | undefined`

:::note{title=Description}
Primary Y-axis configuration for the Dual Axis Chart, used to define the primary axis, including its position, style, etc. When multiple measure groups exist, primaryYAxis can be an array where each entry corresponds to a primary Y-axis.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible.

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Minimum value for the axis; higher priority than nice and zero.

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Maximum value for the axis; higher priority than nice and zero. If set to true, it automatically calculates based on data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic scale; only applies to numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
Base for the logarithmic scale; only applies to numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust the axis scale interval for readability; disabled if min and max are explicitly set. Only applies to numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to reverse the axis; only applies to numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force a 0 value to be shown on the axis; disabled if min and max are set. Only applies to numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format numeric axis tick labels. When enabled, numFormat configuration is ignored. Only applies to numeric axes.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatting configuration for numeric axis digits. Only applies to numeric axes; has lower priority than autoFormat.

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0.

:::

**Example**

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g., %, ‰.

:::

**Example**

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a thousands separator.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat minimumFractionDigits and maximumFractionDigits properties; has lower priority than significantDigits.

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
Significant digits for numeric formatting, using the browser's Intl.NumberFormat minimumSignificantDigits and maximumSignificantDigits properties; has higher priority than fractionDigits.

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
Rounding priority for number formatting when both significantDigits and fractionDigits are set; follows the browser's Intl.NumberFormat roundingPriority rules.

:::

**Example**

* 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
* 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode for number formatting, follows the browser's Intl.NumberFormat roundingMode rules.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Y-axis tick labels.

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
Label font size.

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
Y-axis line.

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
Y-axis ticks.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are oriented inwards.

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Tick color.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick length.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
Y-axis title.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text; defaults to following the field configuration.

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
Y-axis grid lines.

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
Grid line pattern (dash/dots).

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
Y-axis animation configuration.

:::

#### duration

**Type:** `number | undefined`

:::note{title=Description}
Duration of the animation.

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Easing function for the animation.

:::

## secondaryYAxis

**Type:** `YLinearAxis | YLinearAxis[] | undefined`

:::note{title=Description}
Secondary Y-axis configuration for the Dual Axis Chart, used to define the secondary Y-axis (position, style, etc.). If there are multiple measure groups, this can be an array where each entry corresponds to a secondary Y-axis.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible.

:::

### min

**Type:** `number | undefined`

:::note{title=Description}
Minimum value for the axis; higher priority than nice and zero.

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=Description}
Maximum value for the axis; higher priority than nice and zero. If set to true, it calculates automatically from data.

:::

### log

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to use a logarithmic scale; only applies to numeric axes.

:::

### logBase

**Type:** `number | undefined`

:::note{title=Description}
Base for the logarithmic scale; only applies to numeric axes.

:::

### nice

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically adjust the axis scale interval for readability; disabled if min and max are set. Only applies to numeric axes.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is displayed in reverse; only applies to numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to force a 0 value to be displayed on the axis; disabled if min and max are set. Only applies to numeric axes.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to automatically format numeric axis labels; disabled if numFormat is provided. Only applies to numeric axes.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Formatting configuration for numeric axis digits. Only applies to numeric axes; lower priority than autoFormat.

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Number format type, supports: number (decimal), percent (%), permille (‰), scientific notation.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Number format ratio, cannot be 0.

:::

**Example**

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Number format symbol, e.g., %, ‰.

:::

**Example**

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Thousands separator for numeric formatting.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Number format suffix.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Number format prefix.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Decimal places for numeric formatting, using the browser's Intl.NumberFormat properties.

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
Significant digits for numeric formatting, uses browser Intl.NumberFormat properties.

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
Rounding priority when both decimals and significant digits are specified.

:::

**Example**

* 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
* 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Rounding mode, using the browser's Intl.NumberFormat.roundingMode property.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Label configuration for the secondary Y-axis.

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
Label font size.

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
Axis line for the secondary Y-axis.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the line is visible.

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the axis line.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Thickness of the axis line.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
Ticks for the secondary Y-axis.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inwards.

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the ticks.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick length.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
Title for the secondary Y-axis.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the title is visible.

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Title text, follows the measure's configuration by default.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the title.

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Font size for the title.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Font weight for the title.

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
Grid lines associated with the secondary Y-axis.

:::

#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the grid lines.

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=Description}
Width of the grid lines.

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=Description}
Dash pattern for the grid lines.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
Secondary Y-axis animation properties.

:::

#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation length.

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Animation easing function.

:::

## xAxis

**Type:** `XBandAxis | undefined`

:::note{title=Description}
X-axis (category axis) configuration. Defines position, formatting, and appearance.

:::

### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the axis is visible.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to reverse the axis. Only effective for numeric axes.

:::

### zero

**Type:** `boolean | undefined`

:::note{title=Description}
Force a 0 value on the axis. Disabled if min and max are set. Only applies to numeric axes.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=Description}
Automatically hide overlapping labels if the gap is too small. Only effective for category axes.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=Description}
Minimum gap between labels. If smaller, overlapping labels are hidden. Only effective for category axes.

Uses autoHideSeparation when enabled, otherwise uses sampling-based minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=Description}
Automatically rotate labels if they exceed the available axis space. Only applies to category axes.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=Description}
Angle range for label rotation when auto-rotate is enabled. Only applies to category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=Description}
Truncates labels with an ellipsis if they exceed the available space; full label is visible on hover. Only for category axes.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=Description}
The maximum length before a label is truncated. Only applies to category axes.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=Description}
Labels for the X-axis ticks.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels are visible.

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Color of labels.

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Label font size.

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Font weight for labels.

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=Description}
Label rotation angle.

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
X-axis baseline.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether the line is visible.

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the axis line.

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=Description}
Width of the axis line.

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=Description}
Ticks for the X-axis.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks are visible.

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=Description}
Whether ticks point inwards.

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the ticks.

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=Description}
Tick length.

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=Description}
X-axis title.

:::

#### visible

**Type:** `boolean | undefined`

:::note{title=Description}
Whether titles are visible.

:::

#### titleText

**Type:** `string | undefined`

:::note{title=Description}
Text for the title. Defaults to following mapped fields.

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the title.

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=Description}
Font size for titles.

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=Description}
Font weight for titles.

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=Description}
Grid lines associated with the X-axis.

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
Grid line dash pattern.

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=Description}
X-axis animation properties.

:::

#### duration

**Type:** `number | undefined`

:::note{title=Description}
Animation duration for the X-axis.

:::

#### easing

**Type:** `string | undefined`

:::note{title=Description}
Easing function.

:::

## backgroundColor

**Type:** `BackgroundColor`

:::note{title=Description}
Chart background color. Can be a color string ('red'), hex, RGB, or RGBA.

:::

## color

**Type:** `Color | undefined`

:::note{title=Description}
Color schemes, including lists for discrete markers and linear gradients for continuous mapping.

:::

### colorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
A list of discrete colors to be used sequentially for different series.

:::

**Example**
\['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']

### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=Description}
Gradient colors used for linear mapping of measure values.

:::

**Example**
\['#FFCDD2, #F8BBD0]

### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=Description}
Manual mapping of specific data values to colors.

:::

**Example**
{
'profit': 'red',
'sales': 'blue',
}

### positiveColor

**Type:** `string | undefined`

:::note{title=Description}
Color assigned to positive values.

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=Description}
Color assigned to negative values.

:::

## label

**Type:** `Label | undefined`

:::note{title=Description}
Global data label configuration (position, formatting, style).

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Whether data labels are enabled globally.

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels wrap to subsequent lines.

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display measure values.

Note: encoding level label settings have higher priority.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display the percentage of a measure value relative to a total.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=Description}
Whether labels display dimension names.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=Description}
Whether label values are formatted automatically based on locale.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=Description}
Manual formatting settings for labels. Inherits from measure settings unless autoFormat is enabled.

:::

#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=Description}
Display unit/mode.

:::

#### ratio

**Type:** `number | undefined`

:::note{title=Description}
Scale conversion ratio (e.g., divide by 1000 for 'K').

:::

**Example**

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

#### symbol

**Type:** `string | undefined`

:::note{title=Description}
Suffix/symbol added to the number.

:::

**Example**

* 100000 converts to 10W, ratio:10000, symbol:"W"
* 100000 converts to 10K, ratio:1000, symbol:"K"

#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=Description}
Enable thousands separation.

:::

#### suffix

**Type:** `string | undefined`

:::note{title=Description}
Custom suffix string.

:::

#### prefix

**Type:** `string | undefined`

:::note{title=Description}
Custom prefix string.

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=Description}
Number of fixed decimal places.

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
Significant digits displayed.

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
Conflict resolution between decimals and significant figures.

:::

**Example**

* 1234.5678 converts to 1230, significantDigits:3 (roundingPriority:lessPrecision)
* 1234.5678 converts to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=Description}
Mathematical rounding algorithm.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Global label font size.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Font weight for data labels.

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color for label text box.

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=Description}
Stroke (outline) color for labels.

:::

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Text color for labels.

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=Description}
Inverts label text color automatically for legibility against graphic background colors.

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=Description}
Position of label relative to graphic element.

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=Description}
Whether collision detection is enabled to prevent label overlapping.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data filter for labels; uses dimension IDs and operations.

:::

#### field

**Type:** `string`

:::note{title=Description}
Dimension ID to filter on.

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Inclusion operator.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Alias for operator.

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Filter values.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
Dynamic logic filter (AI-generated code execution). Used for complex filtering like "Top 5" or statistical ranges.

Executes in a Web Worker sandbox.

Note: dynamicFilter takes priority over selector if both are present.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
Natural language description of the filtering requirement.

:::

**Example**
"Highlight sales columns greater than 1000."

#### code

**Type:** `string`

:::note{title=Description}
The AI-generated filtering logic in JavaScript.

* Uses built-in utilities via \_ or R.
* Input: data array (items include \_\_row\_index).
* Output: Array of { \_\_row\_index: number, field: string }.
* Restricted: no eval, Function, async, DOM, or network APIs.

:::

**Example**
Highlight 'sales' field where value > 1000:

```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
  __row_index: item.__row_index,
  field: 'sales'
}));
```

#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Static fallback filter if code execution fails or environment is unsupported.

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
Read-only runtime result of the filter execution.

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
Legend configuration (position, shapes, labeling).

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Toggle legend visibility.

:::

**Example**
enable: true

### border

**Type:** `boolean | undefined`

:::note{title=Description}
Toggle border around legend items.

:::

:::warning{title=Warning}
Applies only to discrete legends.

:::

**Example**
border: true

### labelColor

**Type:** `string | undefined`

:::note{title=Description}
Font color for legend text.

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=Description}
Color for active paging arrows.

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=Description}
Color for disabled paging arrows.

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=Description}
Legend font size.

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title=Description}
Legend font color.

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=Description}
Legend font weight.

:::

### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=Description}
Shape of the marker in the legend.

:::

:::warning{title=Warning}
Only applies to discrete legends.

:::

### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=Description}
Legend placement on the canvas.

:::

### maxSize

**Type:** `number | undefined`

:::note{title=Description}
Max number of rows/columns to display before pagination. Direction depends on alignment.

:::

## tooltip

**Type:** `Tooltip | undefined`

:::note{title=Description}
Tooltip configuration (trigger, layout, styling).

:::

### enable

**Type:** `false | true`

:::note{title=Description}
Toggle tooltip visibility.

:::

## brush

**Type:** `Brush | undefined`

:::note{title=Description}
Interactive region selection capabilities.

:::

### enable

**Type:** `boolean | undefined`

:::note{title=Description}
Whether region selection is enabled.

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=Description}
The selection tool shape (rectangle, along X, along Y, or arbitrary polygon).

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=Description}
Whether a new selection replaces the old one or adds to it.

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to clear the selection when clicking the empty area.

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Visual style for markers inside the selected region.

:::

#### opacity

**Type:** `number | undefined`

#### stroke

**Type:** `string | undefined`

#### lineWidth

**Type:** `number | undefined`

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=Description}
Visual style for markers outside the selected region.

:::

#### opacity

**Type:** `number | undefined`

#### stroke

**Type:** `string | undefined`

#### lineWidth

**Type:** `number | undefined`

## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=Description}
Highlighting area for the active category/axis location.

:::

### visible

**Type:** `boolean | undefined`

### rectColor

**Type:** `string | undefined`

### labelColor

**Type:** `string | undefined`

### labelVisible

**Type:** `boolean | undefined`

### labelBackgroundColor

**Type:** `string | undefined`

## sort

**Type:** `Sort | undefined`

:::note{title=Description}
Sorting logic for the axes (ascending, descending, or custom).

:::

### order

**Type:** `"asc" | "desc" | undefined`

### orderBy

**Type:** `string | undefined`

:::note{title=Description}
ID of the field used for sorting.

:::

### customOrder

**Type:** `string[] | undefined`

:::note{title=Description}
A fixed list of values to determine category order.

:::

## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=Description}
Sorting logic for legend items.

:::

### order

**Type:** `"asc" | "desc" | undefined`

### orderBy

**Type:** `string | undefined`

### customOrder

**Type:** `string[] | undefined`

## theme

**Type:** `Theme | undefined`

:::note{title=Description}
Global visual theme settings. Defaults use 'light' and 'dark' variants. Custom themes can be registered via the Builder.

:::

### length

**Type:** `number`

### brand

**Type:** `brand`

## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=Description}
Constraint for the maximum allowed column width (pixels or percentage).

:::

## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=Description}
The gap between adjacent columns in a group.

:::

## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=Description}
Visual properties for column/bar markers (colors, borders, radius). Supports conditional styling via selectors.

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Data filter for specific styling. Supports value-based, record-based, or dimension/measure condition mappings.

:::

#### field

**Type:** `string`

#### operator

**Type:** `"in" | "not in" | undefined`

#### op

**Type:** `"in" | "not in" | undefined`

#### value

**Type:** `string | number | (string | number)[]`

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=Description}
AI-generated logic for complex graphic styling (e.g., coloring the Max item).

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

#### code

**Type:** `string`

#### fallback

**Type:** `Selector | Selectors | undefined`

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

### barVisible

**Type:** `boolean | undefined`

### barColor

**Type:** `string | undefined`

### barColorOpacity

**Type:** `number | undefined`

### barBorderColor

**Type:** `string | undefined`

### barBorderWidth

**Type:** `number | undefined`

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

### barBorderOpacity

**Type:** `number | undefined`

### barRadius

**Type:** `number | number[] | undefined`

## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=Description}
Visual properties for line markers (color, smoothing, thickness).

:::

### selector

**Type:** `Selector | Selectors | undefined`

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

### lineVisible

**Type:** `boolean | undefined`

### lineSmooth

**Type:** `boolean | undefined`

### lineColor

**Type:** `string | undefined`

### lineColorOpacity

**Type:** `number | undefined`

### lineWidth

**Type:** `number | undefined`

## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=Description}
Visual properties for point markers (scatter dots, line nodes).

:::

### selector

**Type:** `Selector | Selectors | undefined`

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

### pointVisible

**Type:** `boolean | undefined`

### pointSize

**Type:** `number | undefined`

### pointColor

**Type:** `string | undefined`

### pointColorOpacity

**Type:** `number | undefined`

### pointBorderColor

**Type:** `string | undefined`

### pointBorderWidth

**Type:** `number | undefined`

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=Description}
Visual properties for area markers (fill color, opacity).

:::

### selector

**Type:** `Selector | Selectors | undefined`

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

### areaVisible

**Type:** `boolean | undefined`

### areaColor

**Type:** `string | undefined`

### areaColorOpacity

**Type:** `number | undefined`

## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=Description}
Data point annotations; highlights specific coordinates with text and markers.

:::

### selector

**Type:** `Selector | Selectors | undefined`

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

### text

**Type:** `string | string[] | undefined`

### textColor

**Type:** `string | undefined`

### textFontSize

**Type:** `number | undefined`

### textFontWeight

**Type:** `number | undefined`

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

### textBackgroundVisible

**Type:** `boolean | undefined`

### textBackgroundColor

**Type:** `string | undefined`

### textBackgroundBorderColor

**Type:** `string | undefined`

### textBackgroundBorderWidth

**Type:** `number | undefined`

### textBackgroundBorderRadius

**Type:** `number | undefined`

### textBackgroundPadding

**Type:** `number | undefined`

### offsetY

**Type:** `number | undefined`

:::note{title=Description}
Vertical offset for the entire annotation block.

:::

### offsetX

**Type:** `number | undefined`

:::note{title=Description}
Horizontal offset for the entire annotation block.

:::

## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=Description}
Vertical reference lines positioned at specific X values or calculated dynamically.

:::

### xValue

**Type:** `string | number | (string | number)[] | undefined`

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=Description}
Calculates the line's position dynamically (e.g., current date, mean X index).

:::

#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

#### code

**Type:** `string`

#### fallback

**Type:** `string | number | undefined`

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

### text

**Type:** `string | string[] | undefined`

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

### textColor

**Type:** `string | undefined`

### textFontSize

**Type:** `number | undefined`

### textFontWeight

**Type:** `number | undefined`

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

### lineVisible

**Type:** `boolean | undefined`

### lineColor

**Type:** `string | undefined`

### lineWidth

**Type:** `number | undefined`

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

### textBackgroundVisible

**Type:** `boolean | undefined`

### textBackgroundColor

**Type:** `string | undefined`

### textBackgroundBorderColor

**Type:** `string | undefined`

### textBackgroundBorderWidth

**Type:** `number | undefined`

### textBackgroundBorderRadius

**Type:** `number | undefined`

### textBackgroundPadding

**Type:** `number | undefined`

## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=Description}
Horizontal reference lines (e.g., Average, Target, Baseline) positioned at specific Y values.

:::

### yValue

**Type:** `string | number | (string | number)[] | undefined`

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

### text

**Type:** `string | string[] | undefined`

### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

### textColor

**Type:** `string | undefined`

### textFontSize

**Type:** `number | undefined`

### textFontWeight

**Type:** `number | undefined`

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

### textBackgroundVisible

**Type:** `boolean | undefined`

### textBackgroundColor

**Type:** `string | undefined`

### textBackgroundBorderColor

**Type:** `string | undefined`

### textBackgroundBorderWidth

**Type:** `number | undefined`

### textBackgroundBorderRadius

**Type:** `number | undefined`

### textBackgroundPadding

**Type:** `number | undefined`

### lineVisible

**Type:** `boolean | undefined`

### lineColor

**Type:** `string | undefined`

### lineWidth

**Type:** `number | undefined`

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=Description}
Allows split coloring of a line/graphic based on whether the data is above or below this reference line.

:::

#### positiveColor

**Type:** `string | undefined`

#### negativeColor

**Type:** `string | undefined`

## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=Description}
Highlighted background regions (ranges) based on dimension values.

:::

### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

### text

**Type:** `string | string[] | undefined`

### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

### textColor

**Type:** `string | undefined`

### textFontSize

**Type:** `number | undefined`

### textFontWeight

**Type:** `number | undefined`

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

### textBackgroundVisible

**Type:** `boolean | undefined`

### textBackgroundColor

**Type:** `string | undefined`

### textBackgroundBorderColor

**Type:** `string | undefined`

### textBackgroundBorderWidth

**Type:** `number | undefined`

### textBackgroundBorderRadius

**Type:** `number | undefined`

### textBackgroundPadding

**Type:** `number | undefined`

### areaColor

**Type:** `string | undefined`

### areaColorOpacity

**Type:** `number | undefined`

### areaBorderColor

**Type:** `string | undefined`

### areaBorderWidth

**Type:** `number | undefined`

### areaBorderRadius

**Type:** `number | undefined`

### areaLineDash

**Type:** `number[] | undefined`

### outerPadding

**Type:** `number | undefined`

## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=Description}
Coordinate dimensions between different charts. When hovering on a dimension value, related points in other charts are highlighted.

:::

### enable

**Type:** `false | true`

### showTooltip

**Type:** `boolean | undefined`

### showLabel

**Type:** `boolean | undefined`

## locale

**Type:** `Locale | undefined`

:::note{title=Description}
Internationalization setting. Supports 'zh-CN' and 'en-US'. Can also be set globally via `intl.setLocale`.

:::
