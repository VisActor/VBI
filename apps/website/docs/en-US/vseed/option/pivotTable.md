# PivotTable

:::info{title="Recommended"}
\- Recommended field configuration: `1` measures, `2` dimensions

\- Support data reshaping: at least `1` measures, `0` dimensions

:::

:::info{title="Encoding Mapping"}
Pivot tables support the following visual channels:

`row`: Row dimension, supports `multiple dimensions`, groups rows by dimension value

`column`: Column dimension, supports `multiple dimensions`, grouping on columns by dimension value

`detail`: subdivision channel, supports `multiple measures`, displays measure values in cells

:::

:::note{title="Description"}
Pivot tables are suitable for multi-dimensional data cross-analysis scenarios, and can flexibly configure row and column dimensions and measure calculation methods.

Applicable scenarios:

\- Statistical analysis of complex multidimensional data

\- Data drilling and aggregation display

\- Business report generation and data exploration

:::

:::warning{title="Warning"}
Data requirements:

\- at least 1 row dimension or 1 column dimension or 1 measure

\- data must be aggregated

\- data can be grouped

Features enabled by default:

\- By default, row and column sorting, data filtering, aggregation calculation, subtotal/total are enabled.

:::


## chartType

**Type:** `"pivotTable"`

:::note{title="Description"}
Pivot table, suitable for multi-dimensional data cross-analysis scenarios

:::

**Example**
```ts
'pivotTable'




```
## dataset

**Type:** `Record[]`

:::note{title="Description"}
An aggregated data set that complies with the TidyData specification is used to define the data source and structure of the chart. The data set input by the user does not require any processing. VSeed has a powerful data reshaping function and will reshape the data on its own. The data in the pivot table will eventually be converted into the corresponding tree structure, and the user does not need to perform manual data processing.

:::

**Example**
```ts
[{region:'East China', product:'A', sales:1000}, {region:'East China', product:'B', sales:1500}]




```
## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title="Description"}
The row and column dimensions of the pivot table will automatically process the data into a tree structure and map it to the row and column axes.

:::

**Example**
```ts
[{id: 'region', alias: 'region', isRow: true}, {id: 'product', alias: 'product', isColumn: true}]




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

**Type:** `"row" | "column" | undefined`

:::note{title="Description"}
Dimension mapping channels

\- row: supports mapping multiple dimensions to row channels

\- column: supports mapping multiple dimensions to column channels

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title="Description"}
Pivot tables support multiple dimension measures

:::

**Example**
```ts
[{id: 'sales', alias: 'sales', aggregation: 'sum'}]




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

**Type:** `"column" | undefined`

:::note{title="Description"}
Measure mapping channel

\- column: measure column

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
The background color can be a color string, such as 'red', 'blue', or hex, rgb or rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## borderColor

**Type:** `string | undefined`

:::note{title="Description"}
table border color

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Table body font size

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title="Description"}
Table body font color

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
The background color of the table body

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Font size of row headers and column headers

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title="Description"}
Font color of row headers and column headers

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
The background color of row headers and column headers

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
The background color when the mouse is hovering over the cell in the row or column header. It is used to highlight the cells where the row and column where the mouse is located intersect.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
When the mouse is hovering over the cell at the head of a row or column, it is used to highlight all cells in the row and column where the mouse is located.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title="Description"}
The border color of the selected cell, used to highlight the selected cell

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
The background color of the selected cells, used to highlight the selected cells

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title="Description"}
Set special styles for cells in the body part of the table

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title="Description"}
data selector



If a selector is configured, four types of data matching capabilities are provided: numerical selector, local data selector, conditional dimension selector, and conditional index selector.

If the selector is not configured, the style takes effect globally.



Note: selector and dynamicFilter cannot be used at the same time, dynamicFilter has higher priority

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

Field column filter
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




```
#### field

**Type:** `string | string[]`

:::note{title="Description"}
Field name, which can be a single field or an array of multiple fields

:::

**Example**
```ts
single field
field: 'sales'

multiple fields
field: ['sales', 'profit', 'revenue']



```
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

**Type:** `TableDynamicFilter | undefined`

:::note{title="Description"}
Dynamic filters (code driven)



Implement complex data filtering logic through AI-generated JavaScript code

Suitable for Top N, statistical analysis, complex conditions and other scenarios that are difficult to express with static selectors



Core competencies:

\- Supports arbitrarily complex data filtering conditions

\- Use built-in utility functions for data manipulation

\- Execute securely in a browser environment (Web Worker Sandbox)



Environment requirements: Only browser environment is supported, Node.js environment will use fallback



Note: selector and dynamicFilter cannot be used at the same time, dynamicFilter has higher priority



Table dynamic filter configuration



Achieve precise filtering at table cell level through AI-generated JavaScript code

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
"Highlight cells with sales greater than 1000"

"Highlight the cell with the largest value in each row"



```
#### code

**Type:** `string`

:::note{title="Description"}
AI generated JavaScript filter code



\- can only use built-in utility functions (accessed via _ or R)

\- Input parameter: data (array), each item contains the _index field indicating the line number

\- Must return the cell selector array: ``Array<{ __row_index: number, field: string }>``

\- When field is "*", the entire line is highlighted.

\- Prohibited use: eval, Function, asynchronous operations, DOM API, network requests

:::

**Example**
```ts
Top N filter
dynamicFilter = {
type: 'row\- with\- field',
description: 'Highlight the top 3 products with the highest sales',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
`_.map(result, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Filter by multiple conditions
dynamicFilter = {
type: 'row\- with\- field',
description: 'Highlight products with profit margins greater than 20% and sales exceeding 5,000',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Relative value filter
dynamicFilter = {   *
type: 'row\- with\- field',
description: 'Highlight products with sales above average',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Group filter
dynamicFilter = {
type: 'row\- with\- field',
description: 'Products with the highest sales in each region',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
`_.map(topByRegion, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Highlight entire line
dynamicFilter = {
description: 'Highlight entire rows where sales are greater than profits',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
`return matched.map(item => ({`
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



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

### backgroundColor

**Type:** `string | undefined`

:::note{title="Description"}
Cell background color

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to enable the color scale configuration of the background color (color scale)

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title="Description"}
Cell background color scale mapping, priority is higher than backgroundColor

:::


#### minValue

**Type:** `number | undefined`

:::note{title="Description"}
Minimum value. If not configured, it defaults to the minimum value in the current data column.

:::

#### maxValue

**Type:** `number | undefined`

:::note{title="Description"}
Maximum value. If not configured, it defaults to the maximum value in the current data column.

:::

#### minColor

**Type:** `string`

:::note{title="Description"}
The color corresponding to the minimum value

:::

#### maxColor

**Type:** `string`

:::note{title="Description"}
The color corresponding to the maximum value

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to enable the background data bar (a bar to display the size of the current cell) function. It is not enabled by default.

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title="Description"}
The color of the background data bar when the current cell is a positive number

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title="Description"}
Background data bar color when the value is negative

:::

### barMin

**Type:** `number | undefined`

:::note{title="Description"}
Progress bar minimum value



Automatically calculate the minimum value of the column when not configured

:::

### barMax

**Type:** `number | undefined`

:::note{title="Description"}
Progress bar maximum value



Automatically calculate the maximum value of the column when not configured

:::

### textColor

**Type:** `string | undefined`

:::note{title="Description"}
Cell text color

:::

### textFontSize

**Type:** `number | undefined`

:::note{title="Description"}
Cell text size

:::

### borderColor

**Type:** `string | undefined`

:::note{title="Description"}
Cell border color

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title="Description"}
Cell border line width

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether the measure is displayed as a column. When true, the measure is expanded in the column direction; when false, the measure is expanded in the row direction.

:::

**Example**
```ts
true




```
## totals

**Type:** `PivotTableTotals | undefined`

:::note{title="Description"}
Total and subtotal configuration for pivot tables



Total subtotal configuration for pivot table

:::

**Example**
```ts
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




```
### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title="Description"}
Row total subtotal configuration



Row or column total subtotal configuration

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to display totals (total rows/columns)

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to display subtotals

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title="Description"}
The dimension of the subtotal, which dimensions are used to group the subtotals

:::

**Example**
```ts
['category', 'region']



```
### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title="Description"}
Total subtotal configuration for columns



Row or column total subtotal configuration

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to display totals (total rows/columns)

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title="Description"}
Whether to display subtotals

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title="Description"}
The dimension of the subtotal, which dimensions are used to group the subtotals

:::

**Example**
```ts
['category', 'region']




```
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

