# AreaPercent

:::info{title="Recommended"}
\- Recommended field configuration: `1` measures, `2` dimensions

\- Support data reshaping: at least `1` measures, `0` dimensions

:::

:::info{title="Encoding Mapping"}
Percent area charts support the following visual channels:

`xAxis`: x-axis channel, supports `multiple dimensions`, mapped to x-axis according to dimension value

`yAxis`: y-axis channel, supports `multiple measures`, mapped to y-axis according to measure value

`color`: color channel, supports `multiple dimensions` or `one measure`, dimension color is used to distinguish different data series, measure color is used to linearly map measure values to graphic colors

`tooltip`: tooltip channel, supports `multiple dimensions` and `multiple measures`, will be displayed when the mouse hovers over the data point

`label`: Label channel, supports `multiple dimensions` and `multiple measures`, will display data labels on data points

:::

:::note{title="Description"}
Percentage area chart, suitable for showing the trend of multi-category proportion changes over time. The Y-axis shows the proportion relationship in the form of percentage.

Applicable scenarios:

\- Analysis of composition changes of time series

\- Comparison of multi-category proportion trends

\- The cumulative proportion and the proportion of a single category are displayed at the same time

:::

:::warning{title="Warning"}
Data requirements:

\- at least 1 measure field (metric)

\- The first dimension will be placed on the Y-axis, and the remaining dimensions will be merged with the measure name (when there are multiple measures) and displayed as legend items.

\- All measures will be automatically merged into one measure

Features enabled by default:

\- Legend, axis, percentage label, tooltips, and proportion calculation are enabled by default.

:::


## chartType

**Type:** `"areaPercent"`

:::note{title="Description"}
Percent Area Chart



Percentage area chart, showing the changes in the proportion of multiple categories with a certain dimension in the form of percentages

:::

**Example**
```ts
'areaPercent'




```
## dataset

**Type:** `Record[]`

:::note{title="Description"}
Dataset



An aggregated data set that complies with the TidyData specification and is used to define the data source and structure of the chart. The data set input by the user does not require any processing. VSeed has a powerful data reshaping function and will reshape the data on its own. The data of the percentage area chart will eventually be converted into 2 dimensions and 1 measure.

:::

**Example**
```ts
[{month:'January', category:'A', value:30}, {month:'January', category:'B', value:70}]




```
## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title="Description"}
Dimensions



The first dimension is mapped to the X-axis, and the remaining dimensions are combined with the measure name (when there are multiple measures) and displayed as legend items.

:::

**Example**
```ts
[{ id: 'month', alias: 'month' }, { id: 'year', alias: 'year' }]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title="Description"}
Dimension mapping channels

\- xAxis: supports mapping multiple dimensions to the x-axis

\- color: supports mapping multiple dimensions to color channels

\- detail: supports mapping multiple dimensions to detail channels

\- tooltip: Support mapping multiple dimensions to tooltip channels

\- label: supports mapping multiple dimensions to label channels

\- row: supports mapping multiple dimensions to row channels

\- column: supports mapping multiple dimensions to column channels

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title="Description"}
measure



The measures of the percentage area chart will be automatically merged into one measure, mapped to the Y-axis, and the measure name will be merged with the other dimensions and displayed as a legend item.

:::

**Example**
```ts
[{id: 'value', alias: 'numeric proportion', format: 'percent'}]




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

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title="Description"}
Measure mapping channel

\- yAxis: y-axis of measure mapping

\- detail: details of measure mapping

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
Pagination



Paging configuration, used to configure the paging function of charts

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

**Type:** `Label | undefined`

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
## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title="Description"}
Drawing area padding



Region[0].padding mapped to VChart is used to reserve space for external expansion elements of the drawing area such as annotations and labels.

:::


### top

**Type:** `number | undefined`

### right

**Type:** `number | undefined`

### bottom

**Type:** `number | undefined`

### left

**Type:** `number | undefined`


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

**Type:** `LineAreaAnimation | undefined`

:::note{title="Description"}
Animation configuration



Chart animation configuration, optional effects constrained by chart type

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to enable line/area chart animation

:::

### params

**Type:** `LineAreaAnimationParams | undefined`

:::note{title="Description"}
Line/area chart animation parameters

:::


#### appear

**Type:** `LineAreaAppearAnimation | undefined`

:::note{title="Description"}
Line/area chart entry animation configuration

:::


##### effects

**Type:** `("load" | "growth")[] | undefined`

:::note{title="Description"}
Line/area chart entry effect, supports loading and growth animation

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

**Type:** `LineAreaUpdateAnimation | undefined`

:::note{title="Description"}
Line/area chart update animation configuration

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title="Description"}
Line/area chart update effect, support growth animation

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

**Type:** `LineAreaAnimationLoop | undefined`

:::note{title="Description"}
Line/area chart cycle animation configuration

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

**Type:** `LineAreaLoopAnimation | undefined`

:::note{title="Description"}
Line/area chart cycle animation configuration

:::


###### effects

**Type:** `LineAreaLoopEffect[] | undefined`

:::note{title="Description"}
Line/area chart loop effect

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

**Type:** `PointAtmosphereConfig | undefined`

:::note{title="Description"}
Line/area chart atmosphere animation configuration

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

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title="Description"}
Atmospheric animation effects, supporting ripples, hiding and breathing

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title="Description"}
x-axis



Category axis, x-axis configuration, used to define the x-axis of the chart, including the position, format, style, etc. of the x-axis.

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the axis visible?

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the axis is displayed in reverse direction, only valid for numerical axis

:::

### zero

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to force the display of 0 value on the coordinate axis. When min and max are configured, this configuration item is invalid and only takes effect on the value axis.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title="Description"}
Axis labels are automatically hidden. If two labels overlap (the interval is less than autoHideGap), the overlapping labels will be automatically hidden. Only effective for the category axis.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title="Description"}
Axis labels, automatically hide the gap. If the gap between two text labels is less than autoHideGap, the overlapping labels will be automatically hidden. Only effective for the category axis.

When autoHide is turned on, use autoHide and set it on autoHideSeparation

When autoHide is turned off, sampling is used and set on minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title="Description"}
Axis labels, automatically rotate, when the width of the label exceeds the length of the axis, the label will be automatically rotated. Only effective for the category axis.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title="Description"}
Axis label, automatic rotation angle range, when automatic rotation is turned on, label rotation angle range. Only effective for category axes.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title="Description"}
Axis labels automatically limit the length. When the label width exceeds the axis length, the excess part is represented by an ellipsis. The label is visible after the mouse is hovered, and the label width is automatically limited. Only effective for the category axis.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title="Description"}
Axis labels automatically limit the maximum length. When the length of the label text exceeds the maximum length, the excess part is represented by an ellipsis, and the label is visible after the mouse is hovered. It only takes effect for the category axis.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Description"}
X-axis tick labels

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the label visible?

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Label color

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Label font weight

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="Description"}
Label rotation angle

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Description"}
X-axis

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the axis visible?

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
axis color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
axis width

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Description"}
X-axis scale

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the scale visible?

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the scale facing inward?

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="Description"}
Scale color

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="Description"}
Scale size

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Description"}
X-axis title

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the title visible?

:::

#### titleText

**Type:** `string | undefined`

:::note{title="Description"}
Title text, default follows field configuration

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="Description"}
title color

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Title font size

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Title font weight

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Description"}
X-axis grid lines

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="Description"}
grid line color

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="Description"}
grid line width

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="Description"}
Grid line type

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Description"}
X-axis animation configuration

:::


#### duration

**Type:** `number | undefined`

:::note{title="Description"}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note{title="Description"}
animation easing function

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title="Description"}
y-axis



Value axis, y-axis configuration, used to define the y-axis of the chart, including the position, format, style, etc. of the y-axis.

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the axis visible?

:::

### min

**Type:** `number | undefined`

:::note{title="Description"}
The minimum value of the axis, with priority higher than nice and zero

:::

### max

**Type:** `number | boolean | undefined`

:::note{title="Description"}
The maximum value of the axis, which has higher priority than nice and zero. If it is true, the maximum value will be automatically calculated based on the data range.

:::

### log

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to use logarithmic axis, only effective for numerical axis

:::

### logBase

**Type:** `number | undefined`

:::note{title="Description"}
The base of the logarithmic axis, only valid for the numerical axis

:::

### nice

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to automatically adjust the scale interval of the axis to make the scale labels more readable. When min and max are configured, this configuration item is invalid and only takes effect for the value axis.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the axis is displayed in reverse direction, only valid for numerical axis

:::

### zero

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to force the display of 0 value on the coordinate axis. When min and max are configured, this configuration item is invalid and only takes effect on the value axis.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to automatically format the scale labels of the numerical axis. This is only effective for the numerical axis. When autoFormat is true, the numFormat configuration is invalid.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Description"}
Number formatting of the value axis, only takes effect on the value axis, and has a lower priority than autoFormat

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

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Description"}
X-axis tick labels

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the label visible?

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Label color

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Label font size

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Label font weight

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="Description"}
Label rotation angle

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Description"}
X-axis

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the axis visible?

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
axis color

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
axis width

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Description"}
X-axis scale

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the scale visible?

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the scale facing inward?

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="Description"}
Scale color

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="Description"}
Scale size

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Description"}
X-axis title

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the title visible?

:::

#### titleText

**Type:** `string | undefined`

:::note{title="Description"}
Title text, default follows field configuration

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="Description"}
title color

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Title font size

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Title font weight

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Description"}
X-axis grid lines

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="Description"}
grid line color

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="Description"}
grid line width

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="Description"}
Grid line type

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Description"}
Y-axis animation configuration

:::


#### duration

**Type:** `number | undefined`

:::note{title="Description"}
Animation duration

:::

#### easing

**Type:** `string | undefined`

:::note{title="Description"}
animation easing function

:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title="Description"}
vertical tip line



When the mouse is moved over the chart, the vertical prompt line is displayed



Crosshair line configuration, a type of configuration used to display crosshair lines (tip lines) in charts

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to display crosshair lines

:::

### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
Crosshair line color

:::

### labelColor

**Type:** `string | undefined`

:::note{title="Description"}
Crosshair line label color

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to display crosshair line labels

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
Crosshair line label background color

:::


## sort

**Type:** `Sort | undefined`

:::note{title="Description"}
X-axis sorting configuration, supports sorting based on dimensions or measures, and custom sorting order



Category axis sorting configuration, supports sorting based on dimensions or measures, and custom sorting order

:::

**Example**
```ts
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
or
\- customOrder:['2019', '2020', '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="Description"}
Sorting order, optional values are 'asc' or 'desc'

:::

**Example**
```ts
order:'asc'



```
### orderBy

**Type:** `string | undefined`

:::note{title="Description"}
The field that sorting depends on can be dimension id or measure id

:::

**Example**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Type:** `string[] | undefined`

:::note{title="Description"}
Customize the sort order, which will be applied directly to the category axis

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title="Description"}
Legend sorting configuration, supports sorting according to dimensions or measures, and custom sorting order



Legend sorting configuration, supports sorting according to dimensions or measures, and custom sorting order; the sorted array follows the order from left to right or top to bottom

:::

**Example**
```ts
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
or
\- customOrder:['2019', '2020', '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="Description"}
Sorting order, optional values are 'asc' or 'desc'

:::

**Example**
```ts
order:'asc'



```
### orderBy

**Type:** `string | undefined`

:::note{title="Description"}
The field that sorting depends on can be dimension id or measure id

:::

**Example**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Type:** `string[] | undefined`

:::note{title="Description"}
Customize the sort order, which will be applied directly to the legend, ascending from left to right or top to bottom, descending from right to left or bottom to top

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


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title="Description"}
Point primitive style



Point primitive style configuration is used to define the point primitive style of the chart, including the color, border, etc. of the point primitive.

Supports global style or conditional style configuration

Data filter

If a selector is configured, four types of data matching capabilities are provided: numerical selector, local data selector, conditional dimension selector, and conditional index selector.

If the selector is not configured, the style takes effect globally.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Description"}
data selector



If a selector is configured, four types of data matching capabilities are provided: numerical selector, local data selector, conditional dimension selector, and conditional index selector.

If the selector is not configured, the style takes effect globally.

:::

**Example**
```ts
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

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
value: [100, 300]
}




```
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

Suitable for Top N, statistical analysis, complex conditions and other scenarios that are difficult to express with static selectors



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

### pointVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the point visible?

:::

### pointSize

**Type:** `number | undefined`

:::note{title="Description"}
point size



point size

:::

### pointColor

**Type:** `string | undefined`

:::note{title="Description"}
Point primitive color



Point primitive color

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title="Description"}
Point primitive color transparency



Point primitive color transparency

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Point element border color



Point element border color

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
Point primitive border width



Point primitive border width

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Description"}
Point primitive border style



Point primitive border style

:::

**Example**
```ts
solid

dashed

dotted




```
## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title="Description"}
Line primitive style



Line primitive style configuration, used to define the line primitive style of the chart, including the color, transparency, curve, etc. of the line primitive.

Supports global style or conditional style configuration

Data filter

If a selector is configured, four types of data matching capabilities are provided: numerical selector, local data selector, conditional dimension selector, and conditional index selector.

If the selector is not configured, the style takes effect globally.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Description"}
data selector



If a selector is configured, four types of data matching capabilities are provided: numerical selector, local data selector, conditional dimension selector, and conditional index selector.

If the selector is not configured, the style takes effect globally.

:::

**Example**
```ts
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

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
value: [100, 300]
}




```
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

Suitable for Top N, statistical analysis, complex conditions and other scenarios that are difficult to express with static selectors



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

### lineVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the line segment visible?

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title="Description"}
Is the line segment smooth?

:::

### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
Line segment color

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title="Description"}
Line segment color transparency

:::

### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
Line width

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Description"}
Line style

:::

**Example**
```ts
`lineStyle: 'solid'`




```
## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title="Description"}
Area primitive style



Area primitive style configuration is used to define the area primitive style of the chart, including the color, transparency, border, etc. of the area primitive.

Supports global style or conditional style configuration

Data filter

If a selector is configured, four types of data matching capabilities are provided: numerical selector, local data selector, conditional dimension selector, and conditional index selector.

If the selector is not configured, the style takes effect globally.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Description"}
data selector



If a selector is configured, four types of data matching capabilities are provided: numerical selector, local data selector, conditional dimension selector, and conditional index selector.

If the selector is not configured, the style takes effect globally.

:::

**Example**
```ts
Numeric selector
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

local data selector
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

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
value: [100, 300]
}




```
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

Suitable for Top N, statistical analysis, complex conditions and other scenarios that are difficult to express with static selectors



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

### areaVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the area primitive is visible



Whether the area primitive is visible

:::

### areaColor

**Type:** `string | undefined`

:::note{title="Description"}
Color of area primitives



Color of area primitives

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title="Description"}
Color transparency of area primitives



Color transparency of area primitives

:::


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="Description"}
Label points



Label point configuration, based on the selected data, defines the label points of the chart, including the position, format, style, etc. of the label points.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Description"}
Label point selector, used to select data points.

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

### measureId

**Type:** `string | undefined`

:::note{title="Description"}
Specifies the measure id to which the label point belongs. In a multi-measure scenario, it can be combined with selector to uniquely locate the label point corresponding to the target measure.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Description"}
Dynamic filters (AI generated code execution)



Implement complex data filtering logic through AI-generated JavaScript code

Suitable for Top N, statistical analysis, complex conditions and other scenarios that are difficult to express with static selectors



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

### text

**Type:** `string | string[] | undefined`

:::note{title="Description"}
Annotated text

:::

**Example**
```ts
'Annotation text'



```
### textColor

**Type:** `string | undefined`

:::note{title="Description"}
text color

:::

**Example**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Text font size

:::

**Example**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Text font weight

:::

**Example**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Description"}
Text alignment, generally set to right, the text is displayed to the left of the label point, ensuring that it is displayed in the visible area of the chart

It is recommended to set it to 'right', which ensures that the text is to the left of the label point

right: The text is on the left side of the label point, and the right edge of the text is aligned with the label point.

left: The text is on the right side of the label point, and the left edge of the text is aligned with the label point

center: The text is in the center of the label point, and the center of the text is aligned with the label point

:::

**Example**
```ts
'right' text is to the left of the label point



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Description"}
Text vertical alignment. Generally, set to top, the text is displayed at the bottom of the label point, ensuring that it is displayed in the visible area of the chart

It is recommended to set it to 'top' to ensure that the text is completely displayed in the visible area of the chart

top: The text is at the bottom of the label point, and the top edge of the text is aligned with the label point

middle: The text is in the center of the label point, and the center of the text is aligned with the label point

bottom: The text is at the top of the label point, and the bottom edge of the text is aligned with the label point

:::

**Example**
```ts
'top' text is at the bottom of the label point



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
background visible

:::

**Example**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
background color

:::

**Example**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Background border color

:::

**Example**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
background border width

:::

**Example**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Description"}
background border rounded corners

:::

**Example**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Description"}
background padding

:::

**Example**
```ts
4



```
### offsetY

**Type:** `number | undefined`

:::note{title="Description"}
The overall offset pixel distance of the labeling point in the Y direction. When the labeling point is above the chart (when the value is large), it is recommended to set it to a positive value. When the labeling point is below the chart (when the value is small), it is recommended to set it to a negative value.

A negative value will shift the whole upward. For example, if it is set to \-10, the entire label point component, including text and text background, will be shifted upward by 10 pixels.

A positive value will shift the whole downward. For example, if it is set to 10, the entire label point component, including text and text background, will be shifted downward by 10 pixels.

:::

**Example**
```ts
offsetY: 5, the entire label point is offset downward by 5 pixels



```
### offsetX

**Type:** `number | undefined`

:::note{title="Description"}
The overall offset pixel distance of the labeling point in the X direction. When the labeling point is on the left side of the chart (the starting point of the category axis), it is recommended to set it to a positive value. When the labeling point is on the right side of the chart (the end point of the category axis), it is recommended to set it to a negative value.

A negative value will shift the whole to the left. For example, if it is set to \-10, the entire label point component, including text and text background, will be shifted to the left by 10 pixels.

A positive value will shift the whole to the right. For example, if it is set to 10, the entire label point component, including text and text background, will be shifted to the right by 10 pixels.

:::

**Example**
```ts
offsetX: 5, the entire label point is offset to the right by 5 pixels




```
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="Description"}
Dimension value label line, displayed in vertical direction, can set the position, style, etc. of the label line

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="Description"}
Fixed x value, used to mark vertical lines. If the category axis is in the x direction, you can enter a dimension value. If the value axis is in the x direction, you can enter a specific value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="Description"}
Dynamic filters (AI generated code execution)



Dynamically calculate the value of the dimension line through the AI-generated JavaScript code

Suitable for dynamic determination of label line positions based on data, such as average, maximum, quantiles, business lines, etc.



Supports browser environment only (requires Web Worker)

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="Description"}
Description of user's filtering needs (natural language)

:::

**Example**
```ts
"Get the value with the highest sales volume as the label line reference"

"Calculate average sales for labeling lines"



```
#### code

**Type:** `string`

:::note{title="Description"}
AI generated JavaScript filter code



\- can only use built-in utility functions (accessed via _ or R)

\- Input parameters: data (array)

\- Must return a single number or string: number | string

\- Applicable scenarios: dynamic values required for labeling lines (horizontal lines, vertical lines)

\- Prohibited use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
```ts
Get the maximum sales value as the label line value
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for labeling lines
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantiles as label lines
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



```
#### fallback

**Type:** `string | number | undefined`

:::note{title="Description"}
Downgrade solution when code execution fails or the environment does not support it

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Description"}
Dynamically filter execution results (runtime fields)



Write in prepare() stage, read only during runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="Description"}
Annotated text

:::

**Example**
```ts
'Annotation text'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Description"}
Text position, label position of the dimension line (relative position of the label relative to the line).

:::

**Example**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="Description"}
text color

:::

**Example**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Text font size

:::

**Example**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Text font weight

:::

**Example**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Description"}
Text alignment, generally, no need to set

It is recommended to set it to 'right', which ensures that the text is on the left side of the label line

right: The text is on the left side of the guide line, and the right edge of the text is aligned with the (vertical) label line

left: The text is on the right side of the guide line, and the left edge of the text is aligned with the (vertical) label line

center: The text is in the center of the guide line, and the center of the text is aligned with the (vertical) dimension line

:::

**Example**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Description"}
Vertical alignment of text. Generally, no setting is required.

It is recommended to set it to 'top' to ensure that the text is completely displayed in the visible area of the chart

top: The text is at the bottom of the guide line, and the top edge of the text is aligned (vertically) with the end point of the dimension line

middle: The text is in the center of the guide line, and the center of the text is aligned (vertically) with the end point of the dimension line

bottom: The text is at the top of the guide line, and the bottom edge of the text is aligned (vertically) with the end point of the dimension line

:::

**Example**
```ts
'top'



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
Line visible

:::

**Example**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
line color

:::

**Example**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
line width

:::

**Example**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Description"}
line style

:::

**Example**
```ts
'solid'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
background visible

:::

**Example**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
background color

:::

**Example**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Background border color

:::

**Example**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
background border width

:::

**Example**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Description"}
background border rounded corners

:::

**Example**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Description"}
background padding

:::

**Example**
```ts
4




```
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title="Description"}
Numerical label lines (including mean line, maximum value line, minimum value line, etc.) are displayed in the horizontal direction. The position and style of the label line can be set. If you need to draw label lines corresponding to values such as mean lines, please use this configuration.

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="Description"}
Fixed y value, used to mark horizontal lines. If the category axis is in the y direction, you can enter a dimension value. If the value axis is in the y direction, you can enter a specific value.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="Description"}
Dynamic filters (AI generated code execution)



Dynamically calculate the value of the dimension line through the AI-generated JavaScript code

Suitable for dynamic determination of label line positions based on data, such as average, maximum, quantiles, business lines, etc.



Supports browser environment only (requires Web Worker)

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="Description"}
Description of user's filtering needs (natural language)

:::

**Example**
```ts
"Get the value with the highest sales volume as the label line reference"

"Calculate average sales for labeling lines"



```
#### code

**Type:** `string`

:::note{title="Description"}
AI generated JavaScript filter code



\- can only use built-in utility functions (accessed via _ or R)

\- Input parameters: data (array)

\- Must return a single number or string: number | string

\- Applicable scenarios: dynamic values required for labeling lines (horizontal lines, vertical lines)

\- Prohibited use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
```ts
Get the maximum sales value as the label line value
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Calculate average value for labeling lines
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Get quantiles as label lines
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



```
#### fallback

**Type:** `string | number | undefined`

:::note{title="Description"}
Downgrade solution when code execution fails or the environment does not support it

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Description"}
Dynamically filter execution results (runtime fields)



Write in prepare() stage, read only during runtime

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="Description"}
Annotated text

:::

**Example**
```ts
'Annotation text'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Description"}
text position



The label position of the dimension line (the relative position of the label relative to the line).

:::

**Example**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="Description"}
text color

:::

**Example**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Text font size

:::

**Example**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Text font weight

:::

**Example**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Description"}
Text alignment, generally, no need to set

It is recommended to set it to 'right', which ensures that the text is on the left side of the label line

right: The text is to the left of the guide line, and the right edge of the text is aligned with the end point of the (horizontal) dimension line

left: The text is on the right side of the guide line, and the left edge of the text is aligned with the end point of the (horizontal) dimension line

center: The text is in the center of the guide line, and the center of the text is aligned with the end point of the (horizontal) dimension line

:::

**Example**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Description"}
Vertical alignment of text. Generally, no setting is required.

It is recommended to set it to 'top' to ensure that the text is completely displayed in the visible area of the chart

top: The text is at the bottom of the guide line, and the top edge of the text is aligned with the (horizontal) label line

middle: The text is in the center of the guide line, and the center of the text is aligned with the (horizontal) label line

bottom: The text is on top of the guide line, and the bottom edge of the text is aligned with the (horizontal) label line

:::

**Example**
```ts
'top'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
background visible

:::

**Example**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
background color

:::

**Example**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Background border color

:::

**Example**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
background border width



background border width

:::

**Example**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Description"}
background border rounded corners

:::

**Example**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Description"}
background padding

:::

**Example**
```ts
4



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
Line visible



Line visible

:::

**Example**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="Description"}
line color

:::

**Example**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="Description"}
line width

:::

**Example**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Description"}
line style

:::

**Example**
```ts
'solid'



```
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title="Description"}
Whether to enable the function of dividing the main line into two sections

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title="Description"}
The part greater than the marked value, the corresponding main color

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title="Description"}
The part smaller than the marked value, the corresponding main color

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title="Description"}
Label area



Annotation area configuration, according to the selected data, defines the annotation area of the chart, including the location, style, etc. of the annotation area.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title="Description"}
Depending on the selected data, data labeling is performed.

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

### text

**Type:** `string | string[] | undefined`

:::note{title="Description"}
Annotated text

:::

**Example**
```ts
'Annotation text'



```
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title="Description"}
text position

:::

**Example**
```ts
'top'



```
### textColor

**Type:** `string | undefined`

:::note{title="Description"}
text color

:::

**Example**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Text font size

:::

**Example**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Description"}
Text font weight

:::

**Example**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Description"}
Text alignment, generally set to right, the text is displayed in the middle of the label area, ensuring that it is displayed in the visible area of the chart

It is recommended to set it to 'center', which ensures that the text is in the middle of the annotation area.

right: The text is on the left side of the annotation area, and the right edge of the text is aligned with the annotation area.

left: The text is on the right side of the annotation area, and the left edge of the text is aligned with the annotation area.

center: The text is in the center of the annotation area, and the center of the text is aligned with the annotation area.

:::

**Example**
```ts
'center' text is in the middle of the annotation area



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Description"}
Text vertical alignment. Generally, set to top, the text is displayed at the bottom of the label area, ensuring that it is displayed in the visible area of the chart

It is recommended to set it to 'top' to ensure that the text is completely displayed in the visible area of the chart

top: The text is at the bottom of the label area, and the top edge of the text is aligned with the label area.

middle: The text is in the center of the annotation area, and the center of the text is aligned with the annotation area.

bottom: The text is at the top of the label area, and the bottom edge of the text is aligned with the label area.

:::

**Example**
```ts
'top' text is at the bottom of the annotation area



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Description"}
background visible

:::

**Example**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
background color

:::

**Example**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Background border color



Background border color

:::

**Example**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
background border width

:::

**Example**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Description"}
background border rounded corners



background border rounded corners

:::

**Example**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Description"}
background padding

:::

**Example**
```ts
4



```
### areaColor

**Type:** `string | undefined`

:::note{title="Description"}
Label area area color

:::

**Example**
```ts
'red'



```
### areaColorOpacity

**Type:** `number | undefined`

:::note{title="Description"}
Label area area color transparency

:::

**Example**
```ts
0.5



```
### areaBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
Label area border color

:::

**Example**
```ts
'red'



```
### areaBorderWidth

**Type:** `number | undefined`

:::note{title="Description"}
Label area border width

:::

**Example**
```ts
2



```
### areaBorderRadius

**Type:** `number | undefined`

:::note{title="Description"}
Label area border rounded corners

:::

**Example**
```ts
4



```
### areaLineDash

**Type:** `number[] | undefined`

:::note{title="Description"}
Line style of label area border

:::

**Example**
```ts
[2, 2]



```
### outerPadding

**Type:** `number | undefined`

:::note{title="Description"}
Margins of label area

:::

**Example**
```ts
0




```
## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title="Description"}
When the chart turns on the perspective function or measure combination, whether to turn on the dimension linkage function

When hovering to a certain dimension value, data with the same dimension value in other charts will be highlighted



Perspective chart dimension linkage configuration

:::


### enable

**Type:** `false | true`

:::note{title="Description"}
Whether to enable perspective table dimension linkage

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to display tooltip information for subcharts corresponding to all dimensions

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to display the label corresponding to crosshair

:::


## locale

**Type:** `Locale | undefined`

:::note{title="Description"}
language



Chart language configuration supports 'zh\- CN' and 'en\- US' languages. In addition, you can call the intl.setLocale('zh\- CN') method to set the language.

:::

