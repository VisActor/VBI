# TreeMap

:::info{title="Encoding Mapping"}
Rectangular treemap supports the following visual channels:

`color`: color channel, supports `multiple dimensions` or `one measure`

`label`: tag channel, supports `multiple dimensions` and `multiple measures`

`tooltip`: Tooltip channel, supports `multiple dimensions` and `multiple measures`

:::

:::note{title="Description"}
Rectangular tree diagram, used to display hierarchical data, expressing numerical size through the size of the rectangular area

Applicable scenarios:

\- Display the proportion distribution of hierarchical data

\- Emphasize the relationship between the whole and parts of the data

:::

:::warning{title="Warning"}
Data requirements:

\- at least 1 numeric field (measurement) used to map area

\- At least 1 dimension field is used for hierarchical division

:::


## chartType

**Type:** `"treeMap"`

:::note{title="Description"}
Rectangular tree diagram



Rectangular tree diagram, showing the proportion relationship of hierarchical data

:::

**Example**
```ts
'treeMap'




```
## dataset

**Type:** `Record[]`

:::note{title="Description"}
Dataset



An aggregated data set that conforms to the TidyData specification and is used to define the data source and structure of the chart

:::

**Example**
```ts
[{category:'A', value:30}, {category:'B', value:70}]




```
## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title="Description"}
Dimensions



Dimension configuration, used to define the hierarchical structure of data

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

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title="Description"}
Dimension mapping channels

\- hierarchy: supports mapping multiple dimensions to hierarchy channels

\- label: supports mapping multiple dimensions to label channels

\- tooltip: Support mapping multiple dimensions to tooltip channels

:::

:::tip{title="Tip"}
The first dimension will be mapped directly to the color channel

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title="Description"}
measure



Measure configuration to define the size (area) of the sector

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

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title="Description"}
Measure mapping channel

\- size: The measure is mapped to the size channel, which is used to display the area or size of charts such as tree diagrams.

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
Paging configuration



Field name used to specify paging, must be a dimension

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


## theme

**Type:** `Theme | undefined`

:::note{title="Description"}
Theme of the chart



There are two built-in themes: light and dark. Users can customize the theme through Builder



Topic



There are two built-in themes: light and dark. New themes can be customized through registerTheme.

:::

**Example**
```ts
'dark'

'light'




```
### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `Locale | undefined`

:::note{title="Description"}
language



Chart language configuration, supports 'zh\- CN' and 'en\- US' languages

:::

