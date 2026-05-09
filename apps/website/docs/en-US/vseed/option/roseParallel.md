# RoseParallel

:::info{title="Recommended"}
\- Recommended field configuration: `1` measures, `2` dimensions

\- Support data reshaping: at least `1` measures, `0` dimensions

:::

:::info{title="Encoding Mapping"}
Grouped rose charts support the following visual channels:

`angle`: Angle channel, supports `multiple dimensions`, mapped to angle axis according to dimension value

`radius`: radius channel, supports `multiple measures`, mapped to the radius axis according to the measure value

`detail`: Subdivision channel, supports `multiple dimensions`, used when displaying more fine-grained data in the same color series

`color`: color channel, supports `multiple dimensions` or `one measure`, dimension color is used to distinguish different data series, measure color is used to linearly map measure values to graphic colors

`tooltip`: tooltip channel, supports `multiple dimensions` and `multiple measures`, will be displayed when the mouse hovers over the data point

`label`: Label channel, supports `multiple dimensions` and `multiple measures`, will display data labels on data points

:::

:::note{title="Description"}
Grouped rose chart, suitable for multi-dimensional data comparison scenarios, showing data size through sector arc and radius in polar coordinate system

Applicable scenarios:

\- Distribution comparison of multi-dimensional data

\- Strength comparison of cyclical data

\- The numerical value and proportion of classified data are displayed at the same time

:::

:::warning{title="Warning"}
Data requirements:

\- at least 1 numeric field (metric)

\- The first dimension will be placed on the angle axis, and the remaining dimensions will be merged with the measure name (when there are multiple measures) and displayed as legend items

\- All measures will be automatically merged into one measure

Features enabled by default:

\- The legend, polar coordinate system, data labels, tooltips, and numerical scaling are enabled by default.

:::


## chartType

**Type:** `"roseParallel"`

:::note{title="Description"}
Grouped Rose Chart



Grouped rose chart, showing multi-dimensional data comparison relationship through polar coordinate system

:::

**Example**
```ts
'roseParallel'




```
## dataset

**Type:** `Record[]`

:::note{title="Description"}
Dataset



An aggregated data set that conforms to the TidyData specification is used to define the data source and structure of the chart. The data set input by the user does not require any processing. VSeed has a powerful data reshaping function and will reshape the data on its own. The rose chart data will eventually be converted into 2 dimensions and 1 measure.

:::

**Example**
```ts
[{month:'January', value:100}, {month:'February', value:150}, {month:'March', value:120}]




```
## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title="Description"}
Dimensions



The first dimension of the rose chart is mapped to the angle axis, and the remaining dimensions are combined with the measure name (when there are multiple measures) and displayed as legend items.

:::

**Example**
```ts
[{id: 'category', alias: 'category'}]




```
### id

**Type:** `string`

:::note{title="Description"}
The field id corresponding to the dimension

:::

### alias

**Type:** `string | undefined`

:::note{title="Description"}
dimension alias

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title="Description"}
Dimension time formatting configuration

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="Description"}
Time granularity determines date display accuracy

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title="Description"}
Dimension mapping channels

\- angle: supports mapping multiple dimensions to angle channels

\- color: supports mapping multiple dimensions to color channels

\- detail: supports mapping multiple dimensions to detail channels

\- tooltip: Support mapping multiple dimensions to tooltip channels

\- label: supports mapping multiple dimensions to label channels

\- row: supports mapping multiple dimensions to row channels

\- column: supports mapping multiple dimensions to column channels

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title="Description"}
measure



The measures of the rose chart will be automatically merged into one measure and mapped to the radius axis. When there are multiple measures, the measure name will be merged with the other dimensions and displayed as a legend item.

:::

**Example**
```ts
[{id: 'value', alias: 'value'}]




```
### id

**Type:** `string`

:::note{title="Description"}
Measure id, cannot be repeated

:::

### alias

**Type:** `string | undefined`

:::note{title="Description"}
Measure alias, duplicates allowed, if not filled in, alias is id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Description"}
Automatic numerical formatting, enabled by default, has the highest priority

When autoFormat=true, all configurations of numFormat will be overwritten

After turning it on, the data labels and tooltips of the chart will automatically select the appropriate formatting method based on the measure value and locale.

Formatting rules: decimal value, enable compact notation, minimum 0 decimal places, maximum 2 decimal places, automatic rounding, implemented using the Intl.NumberFormat provided by the browser

For example:

\- locale is zh\- CN: 749740.264 → 744,500

\- locale is en\- US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Description"}
The numerical formatting of custom measures will be automatically applied to labels and tooltips.

Note: To use custom formatting, you must explicitly set autoFormat=false, otherwise autoFormat will override this configuration

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Description"}
Number formatting type, supporting numerical value (decimal), percentage (%), thousandths (‰), and scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Description"}
Numeric formatting ratio, cannot be 0

:::

**Example**
```ts
\- 100000 is converted into 100,000, ratio:10000, symbol: "ten-thousand"
\- 100000 is converted to 10K, ratio:1000, symbol: "K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Description"}
Numeric formatting symbols, such as %, ‰

:::

**Example**
```ts
\- 100000 is converted into 100,000, ratio:10000, symbol: "ten-thousand"
\- 100000 is converted to 10K, ratio:1000, symbol: "K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Description"}
Numeric formatting thousands separator

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Description"}
Numeric format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Description"}
Numeric formatting prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Description"}
Numeric formatting decimal places, use minimumFractionDigits and maximumFractionDigits in Intl.NumberFormat provided by the browser for formatting, with a lower priority than significantDigits

:::

**Example**
```ts
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Description"}
Valid digits for numerical formatting, use minimumSignificantDigits and maximumSignificantDigits in the Intl.NumberFormat provided by the browser for formatting, with a higher priority than fractionDigits

:::

**Example**
```ts
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Description"}
Numeric formatting rounding priority, handles the rounding priority when significantDigits and fractionDigits are set at the same time, uses the Intl.NumberFormat provided by the browser for formatting, the rules are the same as the roundingPriority in Intl.NumberFormat

:::

**Example**
```ts
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Description"}
Numeric formatting rounding mode, use the Intl.NumberFormat provided by the browser for formatting, the rules are the same as the roundingMode in Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Description"}
Number formatting type, supporting numerical value (decimal), percentage (%), thousandths (‰), and scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Description"}
Numeric formatting ratio, cannot be 0

:::

**Example**
```ts
\- 100000 is converted into 100,000, ratio:10000, symbol: "ten-thousand"
\- 100000 is converted to 10K, ratio:1000, symbol: "K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Description"}
Numeric formatting symbols, such as %, ‰

:::

**Example**
```ts
\- 100000 is converted into 100,000, ratio:10000, symbol: "ten-thousand"
\- 100000 is converted to 10K, ratio:1000, symbol: "K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Description"}
Numeric formatting thousands separator

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Description"}
Numeric format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Description"}
Numeric formatting prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Description"}
Numeric formatting decimal places, use minimumFractionDigits and maximumFractionDigits in Intl.NumberFormat provided by the browser for formatting, with a lower priority than significantDigits

:::

**Example**
```ts
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Description"}
Valid digits for numerical formatting, use minimumSignificantDigits and maximumSignificantDigits in the Intl.NumberFormat provided by the browser for formatting, with a higher priority than fractionDigits

:::

**Example**
```ts
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Description"}
Numeric formatting rounding priority, handles the rounding priority when significantDigits and fractionDigits are set at the same time, uses the Intl.NumberFormat provided by the browser for formatting, the rules are the same as the roundingPriority in Intl.NumberFormat

:::

**Example**
```ts
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Description"}
Numeric formatting rounding mode, use the Intl.NumberFormat provided by the browser for formatting, the rules are the same as the roundingMode in Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title="Description"}
Measure mapping channel

\- radius: radius of measure mapping

\- color: color of measure mapping

\- label: label of measure mapping

\- tooltip: Tips for measure mapping

:::

### parentId

**Type:** `string | undefined`

:::note{title="Description"}
Construct a tree-shaped measure group in the form of a flat measure configuration. parentId points to the id of the parent measure group, which is used to build the measure tree.

:::

:::tip{title="Tip"}
There are two ways to configure the measure tree. The first way is to directly configure the measure tree with children. The second way is to configure the flat measure list of parentId. The two ways cannot be configured at the same time.

:::


## page

**Type:** `Page | undefined`

:::note{title="Description"}
Paging configuration, used to specify the field name of paging, must be a dimension

:::


### field

**Type:** `string`

:::note{title="Description"}
Paging field, used to specify the field name for paging, must be a dimension

:::

### currentValue

**Type:** `string`

:::note{title="Description"}
Current paging value, used to specify the basis value of the current paging

:::

**Example**
```ts
'2023\-01\-01'




```
## backgroundColor

**Type:** `BackgroundColor`

:::note{title="Description"}
Chart background color



The background color can be a color string, such as 'red', 'blue', or hex, rgb or rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title="Description"}
color



Color configuration, used to define the color scheme of the chart, including color list, color mapping, color gradient, etc.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title="Description"}
Discrete color schemes, color schemes are used to define the colors of different elements in a chart

:::

**Example**
```ts
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



```
### linearColorScheme

**Type:** `string[] | undefined`

:::note{title="Description"}
Linear gradient color scheme, linear gradient color scheme is used to define the colors of different elements in the chart

:::

**Example**
```ts
['#FFCDD2, #F8BBD0]



```
### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title="Description"}
Color mapping, color mapping is used to map data values to specific colors

:::

**Example**
```ts
{
 'profit': 'red',
 'sales': 'blue',
}



```
### positiveColor

**Type:** `string | undefined`

:::note{title="Description"}
Positive and negative color configuration, used to define the color of positive values in the chart

:::

### negativeColor

**Type:** `string | undefined`

:::note{title="Description"}
Positive and negative color configuration, used to define the color of negative values in the chart

:::


## label

**Type:** `PieLabel | undefined`

:::note{title="Description"}
tag



Label configuration is used to define the data labels of the chart, including the position, format, style, etc. of the data labels.

:::


### enable

**Type:** `false | true`

:::note{title="Description"}
Is the label function enabled?

:::

### wrap

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the label wraps

:::

### showValue

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the label displays the measure value

In multi-measure scenarios, there is no need to worry about conflicting values of multiple measures, because all drawing-related measures will be processed by `foldMeasures` and merged into one measure, representing one data point, so there will be no conflicts.

Note: The encoding label has a higher priority. This configuration does not affect the encoding label.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the label displays the percentage of the metric value

In multi-measure scenarios, there is no need to worry about conflicting values of multiple measures, because all drawing-related measures will be processed by `foldMeasures` and merged into one measure, representing one data point, so there will be no conflicts.

Note: The encoding label has a higher priority. This configuration does not affect the encoding label.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the label displays dimension labels

Show all dimension labels

Note: The encoding label has a higher priority. This configuration does not affect the encoding label.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the label value is automatically formatted. When autoFormat is true, the numFormat configuration is invalid.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Description"}
Tag value formatting configuration will be merged with `format` in `measure`. `format` in `measure` has a higher priority. numFormat has a lower priority than autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Description"}
Number formatting type, supporting numerical value (decimal), percentage (%), thousandths (‰), and scientific notation

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Description"}
Numeric formatting ratio, cannot be 0

:::

**Example**
```ts
\- 100000 is converted into 100,000, ratio:10000, symbol: "ten-thousand"
\- 100000 is converted to 10K, ratio:1000, symbol: "K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Description"}
Numeric formatting symbols, such as %, ‰

:::

**Example**
```ts
\- 100000 is converted into 100,000, ratio:10000, symbol: "ten-thousand"
\- 100000 is converted to 10K, ratio:1000, symbol: "K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Description"}
Numeric formatting thousands separator

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Description"}
Numeric format suffix

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Description"}
Numeric formatting prefix

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Description"}
Numeric formatting decimal places, use minimumFractionDigits and maximumFractionDigits in Intl.NumberFormat provided by the browser for formatting, with a lower priority than significantDigits

:::

**Example**
```ts
\- 1234.5678 converted to 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 converted to 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Description"}
Valid digits for numerical formatting, use minimumSignificantDigits and maximumSignificantDigits in the Intl.NumberFormat provided by the browser for formatting, with a higher priority than fractionDigits

:::

**Example**
```ts
\- 1234.5678 converted to 1000, significantDigits:1
\- 1234.5678 converted to 1200, significantDigits:2
\- 1234.5678 converted to 1230, significantDigits:3
\- 1234.5678 converted to 1234, significantDigits:4
\- 1234.5678 converted to 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 converted to 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Description"}
Numeric formatting rounding priority, handles the rounding priority when significantDigits and fractionDigits are set at the same time, uses the Intl.NumberFormat provided by the browser for formatting, the rules are the same as the roundingPriority in Intl.NumberFormat

:::

**Example**
```ts
\- 1234.5678 converted to 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 converted to 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Description"}
Numeric formatting rounding mode, use the Intl.NumberFormat provided by the browser for formatting, the rules are the same as the roundingMode in Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Label font size

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="Description"}
Label font weight

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
Label background color

:::

### labelStroke

**Type:** `string | undefined`

:::note{title="Description"}
Label stroke color

:::

### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Label font color

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the label automatically inverts the font color according to the element color

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title="Description"}
label position

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the label anti-overlap function enabled?

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Description"}
Tag filtering, the default conditional relationship between selectors is Or

:::


#### field

**Type:** `string`

:::note{title="Description"}
Dimension field, dimensions id of a certain item

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Description"}
Operator

\- in: Select data items whose dimension field value is in value

\- not in: Select data items whose dimension field values are not in value

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Description"}
Operator

\- in: Select data items whose dimension field value is in value

\- not in: Select data items whose dimension field values are not in value

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="Description"}
Select the value of the dimension field in the data item, supporting arrays

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Description"}
Dynamic filters (AI generated code execution)



Implement complex data filtering logic through AI-generated JavaScript code



Core competencies:

\- Supports arbitrarily complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Execute securely in a browser environment (Web Worker Sandbox)



Environment requirements: Only browser environment is supported, Node.js environment will use fallback



Note: selector and dynamicFilter cannot be used at the same time, dynamicFilter has higher priority



Chart dynamic filter configuration



Filter chart markers (bars, points, etc.) through AI-generated JavaScript code

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="Description"}
Description of user's filtering needs (natural language)

:::

**Example**
```ts
"Highlight bars with sales greater than 1000"

"Highlight the bars with the highest profit margin in each area"



```
#### code

**Type:** `string`

:::note{title="Description"}
AI generated JavaScript filter code



\- can only use built-in utility functions (accessed via _ or R)

\- Input parameters: data (array), each item contains the __row_index field indicating the row number

\- Must return an array of row index and field combinations: ``Array<{ __row_index: number, field: string }>``

\- __row_index represents the row number of the original data item, and field represents the field that needs to be highlighted.

\- Prohibited use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
```ts
Highlight the sales field of data items with sales greater than 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Highlight the most profitable data items in each area
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



```
#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title="Description"}
Downgrade solution when code execution fails or the environment does not support it

:::


##### field

**Type:** `string`

:::note{title="Description"}
Dimension field, dimensions id of a certain item

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Description"}
Operator

\- in: Select data items whose dimension field value is in value

\- not in: Select data items whose dimension field values are not in value

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Description"}
Operator

\- in: Select data items whose dimension field value is in value

\- not in: Select data items whose dimension field values are not in value

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="Description"}
Select the value of the dimension field in the data item, supporting arrays

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="Description"}
Dynamically filter execution results (runtime fields)



Write in prepare() stage, read only during runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### labelLayout

**Type:** `"arc" | "labelLine" | "edge" | undefined`

:::note{title="Description"}
Label layout method, only effective for pie charts and donut charts and when `labelPosition` is `outside`

\- arc: layout labels according to arc shape

\- labelLine: Align both ends of the label, connect the sector primitives and labels through guide lines

\- edge: Align both ends of the label, connect the fan-shaped primitives and labels through guide lines, and close to the edges of both ends of the chart

:::


## legend

**Type:** `Legend | undefined`

:::note{title="Description"}
Legend



Legend configuration is used to define the legend of the chart, including the location, format, style, etc. of the legend.

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the legend function enabled?

:::

**Example**
```ts
enable: true



```
### border

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the legend border is turned on

:::

:::warning{title="Warning"}
Only discrete legends take effect

:::

**Example**
```ts
border: true



```
### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Legend font color

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title="Description"}
Paginator icon color

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title="Description"}
Paginator icon gray color

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Legend font size

:::

**Example**
```ts
labelFontSize: 10



```
### labelFontColor

**Type:** `string | undefined`

:::note{title="Description"}
Legend font color

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="Description"}
Legend font weight

:::

**Example**
```ts
labelFontWeight: 400



```
### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title="Description"}
legend shape

:::

:::warning{title="Warning"}
Only discrete legends take effect

:::

**Example**
```ts
shapeType: 'circle'



```
### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="Description"}
legend location

:::

**Example**
```ts
position: 'rightTop'



```
### maxSize

**Type:** `number | undefined`

:::note{title="Description"}
When there are a large number of legends, the maximum number of columns or the maximum number of legend rows

If position is horizontal (bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize controls the number of columns displayed

If position is vertical (left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize controls the number of displayed lines

:::

:::warning{title="Warning"}
Only discrete legends take effect

:::

**Example**
```ts
maxSize: 2




```
## tooltip

**Type:** `Tooltip | undefined`

:::note{title="Description"}
Prompt message



Prompt information configuration is used to define the tooltips of the chart, including the location, format, style, etc. of the tooltips.

:::


### enable

**Type:** `false | true`

:::note{title="Description"}
Whether the tooltips function is turned on

:::


## brush

**Type:** `Brush | undefined`

:::note{title="Description"}
Frame selection



Frame selection configuration, used to turn on/off brush frame selection ability



Chart frame selection configuration

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to enable brush selection

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="Description"}
brush type



Define the shape and direction of the brush selection box

\- `rect`: Rectangular frame selection, which can perform frame selection in both directions of the X-axis and Y-axis at the same time

\- `polygon`: Polygon selection, click on multiple points to draw any polygon for selection.

\- `x`: X-axis direction frame selection, only frame selection in the X-axis direction, there is no limit in the Y-axis direction

\- `y`: Y-axis direction frame selection, only frame selection in the Y-axis direction, X-axis direction is not limited

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title="Description"}
Box selection mode, single selection or multiple selection



Define brush selection mode

\- `single`: Radio selection mode, there can only be one brush selection box at a time

\- `multiple`: Multi-selection mode, multiple selection boxes can exist at the same time

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to clear the box after the box selection is completed

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Description"}
The data style selected by the box



Define the style of the data points selected by the brush

:::


#### opacity

**Type:** `number | undefined`

:::note{title="Description"}
opacity



The opacity of the data points selected by the box, the value range is 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="Description"}
stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
stroke width

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Description"}
Data style that is not selected by the box



Define the style of data points that are not selected by the brush

:::


#### opacity

**Type:** `number | undefined`

:::note{title="Description"}
opacity



The opacity of data points that are not selected by the box, the value range is 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="Description"}
stroke color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
stroke width

:::


## animation

**Type:** `PieLikeAnimation | undefined`

:::note{title="Description"}
Animation configuration



Chart animation configuration, optional effects constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to enable pie chart/ring chart/rose chart animation

:::

### params

**Type:** `PieLikeAnimationParams | undefined`

:::note{title="Description"}
Pie chart/ring chart/rose chart animation parameters

:::


#### appear

**Type:** `PieLikeAppearAnimation | undefined`

:::note{title="Description"}
Pie chart/ring chart/rose chart entry animation configuration

:::


##### effects

**Type:** `("radial" | "scale")[] | undefined`

:::note{title="Description"}
Pie chart/ring chart/rose chart entry effect, supporting radial and zoom animations

:::

##### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to enable the current animation stage

:::

##### ease

**Type:** `string | undefined`

:::note{title="Description"}
animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title="Description"}
animation duration in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title="Description"}
Animated highlights or mood colors

:::

#### update

**Type:** `PieLikeUpdateAnimation | undefined`

:::note{title="Description"}
Pie chart/ring chart/rose chart update animation configuration

:::


##### effects

**Type:** `"radial"[] | undefined`

:::note{title="Description"}
Pie chart/ring chart/rose chart update effect, supporting radial animation

:::

##### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to enable the current animation stage

:::

##### ease

**Type:** `string | undefined`

:::note{title="Description"}
animation easing function

:::

##### duration

**Type:** `number | undefined`

:::note{title="Description"}
animation duration in milliseconds

:::

##### color

**Type:** `string | undefined`

:::note{title="Description"}
Animated highlights or mood colors

:::

#### loop

**Type:** `PieLikeAnimationLoop | undefined`

:::note{title="Description"}
Pie chart/ring chart/rose chart cycle animation configuration

:::


##### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to enable loop animation

:::

##### interval

**Type:** `number | undefined`

:::note{title="Description"}
Loop animation interval in milliseconds

:::

##### loop

**Type:** `PieLikeLoopAnimation | undefined`

:::note{title="Description"}
Pie chart/ring chart/rose chart cycle animation configuration

:::


###### effects

**Type:** `PieLikeLoopEffect[] | undefined`

:::note{title="Description"}
Pie chart/ring chart/rose chart loop effect

:::

###### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to enable the current animation stage

:::

###### ease

**Type:** `string | undefined`

:::note{title="Description"}
animation easing function

:::

###### duration

**Type:** `number | undefined`

:::note{title="Description"}
animation duration in milliseconds

:::

###### color

**Type:** `string | undefined`

:::note{title="Description"}
Animated highlights or mood colors

:::

##### atmosphere

**Type:** `NoEffectAtmosphereConfig | undefined`

:::note{title="Description"}
Pie chart/ring chart/rose chart atmosphere animation configuration

:::


###### ease

**Type:** `string | undefined`

:::note{title="Description"}
Atmosphere animation easing function

:::

###### color

**Type:** `string | undefined`

:::note{title="Description"}
Atmosphere animation color

:::


## theme

**Type:** `Theme | undefined`

:::note{title="Description"}
The theme of a chart. A theme is a lower-priority functional configuration that contains common configurations common to all chart types and chart configurations common to single-class chart types.



There are two built-in themes: light and dark. Users can customize the theme through Builder



Topic



There are two built-in themes: light and dark. New themes can be customized through registerTheme.

:::

**Example**
```ts
'dark'

'light'

'customThemeName'




```
### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `Locale | undefined`

:::note{title="Description"}
language



Chart language configuration supports 'zh\- CN' and 'en\- US' languages. In addition, you can call the intl.setLocale('zh\- CN') method to set the language.

:::

