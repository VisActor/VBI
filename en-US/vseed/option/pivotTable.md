# PivotTable

:::info{title=Recommended}

* Recommended field configuration: `1` measure(s), `1` dimension(s)
* Supports Data Reshape: at least `1` measure(s), `0` dimension(s)
  :::

:::info{title=Encoding Mapping}
The Pivot Table supports the following visual channels:

`row`    : Row dimensions, supports `multiple dimensions`, groups data by dimension values on rows.

`column` : Column dimensions, supports `multiple dimensions`, groups data by dimension values on columns.

`detail` : Detail channel, supports `multiple measures`, displays measure values within cells.

:::

:::note{title=Description}
Pivot Table, suitable for multi-dimensional data cross-analysis scenarios, allowing flexible configuration of row/column dimensions and measure calculation methods.

Applicable scenarios:

* Complex multi-dimensional statistical analysis.
* Data drilling and aggregated display.
* Business report generation and data exploration.

:::

:::warning{title=Warning}
Data requirements:

* At least 1 row dimension, 1 column dimension, or 1 measure.
* Data must be pre-aggregated.
* Data must be groupable.

Features enabled by default:

* Row/column sorting, data filtering, aggregation/subtotal calculation, and subtotal/grand total display are enabled by default.

:::

## chartType

**Type:** `"pivotTable"`

:::note{title=Description}
Pivot Table, suitable for multi-dimensional data cross-analysis scenarios.

:::

**Example**
'pivotTable'

## dataset

**Type:** `Record[]`

:::note{title=Description}
Dataset compliant with the TidyData specification and already aggregated, defining the chart's data source and structure. User input does not require pre-processing; VSeed features powerful Data Reshape capabilities that handle formatting automatically. Pivot Table data is ultimately converted into a corresponding tree structure, so no manual data manipulation is required.

:::

**Example**
\[{region:'East China', product:'A', sales:1000}, {region:'East China', product:'B', sales:1500}]

## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title=Description}
Row and column dimensions for the Pivot Table. Data is automatically processed into a tree structure and mapped to row and column axes.

:::

**Example**
\[{id: 'region', alias: 'Region', isRow: true}, {id: 'product', alias: 'Product', isColumn: true}]

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

**Type:** `"row" | "column" | undefined`

:::note{title=Description}
Channel to which the dimension is mapped:

* row: supports mapping multiple dimensions to the row channel

* column: supports mapping multiple dimensions to the column channel

:::

## measures

**Type:** `TableMeasure[] | undefined`

:::note{title=Description}
Pivot Table supports multiple dimension measures.

:::

**Example**
\[{id: 'sales', alias: 'Sales', aggregation: 'sum'}]

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

**Type:** `"column" | undefined`

:::note{title=Description}
Channel to which the measure is mapped:

* column: measure column

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
Pagination configuration. Specifies the field name for pagination, which must be a dimension.

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
Chart background color. Default is transparent. Can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)').

:::

## borderColor

**Type:** `string | undefined`

:::note{title=Description}
Border color of the table.

:::

## bodyFontSize

**Type:** `number | undefined`

:::note{title=Description}
Font size of the table body.

:::

## bodyFontColor

**Type:** `string | undefined`

:::note{title=Description}
Font color of the table body.

:::

## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color of the table body.

:::

## headerFontSize

**Type:** `number | undefined`

:::note{title=Description}
Font size of row and column headers.

:::

## headerFontColor

**Type:** `string | undefined`

:::note{title=Description}
Font color of row and column headers.

:::

## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color of row and column headers.

:::

## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color when hovering over a row or column header cell, used to highlight the cell at the intersection of the hovered row and column.

:::

## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color when hovering over a row or column header cell, used to highlight all cells in the hovered row and column.

:::

## selectedBorderColor

**Type:** `string | undefined`

:::note{title=Description}
Border color of the selected cell, used for highlighting.

:::

## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Background color of the selected cell, used for highlighting.

:::

## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=Description}
Sets special styles for cells in the table body.

:::

### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=Description}
Data selector.

If `selector` is configured, it provides four types of data matching capabilities: numeric selector, local data selector, conditional dimension selector, and conditional measure selector.

If `selector` is not configured, the style applies globally.

Note: `selector` and `dynamicFilter` cannot be used simultaneously; `dynamicFilter` has higher priority.

:::

**Example**
Numeric selector:
selector = "tool"
selector = \["tool", "book"]
selector = 100
selector = \[100, 200]

Local data selector:
selector = { profit: 100 }
selector = \[{ profit: 100 }, { profit: 200 }]

Conditional dimension selector:
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

Conditional measure selector:
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

Field column filter:
selector = {
field: 'category'
}
selector = {
field: \['category', 'profit']
}

#### field

**Type:** `string | string[]`

:::note{title=Description}
Field name; can be a single field or an array of fields.

:::

**Example**
Single field:
field: 'sales'

Multiple fields:
field: \['sales', 'profit', 'revenue']

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

**Type:** `TableDynamicFilter | undefined`

:::note{title=Description}
Dynamic filter (code-driven).

Implement complex data filtering logic via AI-generated JavaScript code.
Suitable for Top N, statistical analysis, complex conditions, and other scenarios where static selectors are insufficient.

Key capabilities:

* Supports any complex data filtering conditions.

* Uses built-in utility functions for data operations.

* Executes safely in the browser environment (Web Worker sandbox).

Requirements: Supports only browser environments; Node.js environments will use the fallback.

Note: `selector` and `dynamicFilter` cannot be used simultaneously; `dynamicFilter` has higher priority.

Configuration for the table dynamic filter.

Implement precise cell-level filtering via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=Description}
User's filtering requirement description (natural language).

:::

**Example**
"Highlight cells where sales are greater than 1000."

"Highlight the cell with the maximum value in each row."

#### code

**Type:** `string`

:::note{title=Description}
AI-generated JavaScript filtering code.

* Can only use built-in utility functions (access via \_ or R).

* Input parameter: data (array); each item includes an `_index` field representing the row number.

* Must return an array of cell selectors: Array<{ \_\_row\_index: number, field: string }>.

* When `field` is "\*", the entire row is highlighted.

* Prohibited: eval, Function, asynchronous operations, DOM API, network requests.

:::

**Example**
Top N filter:
dynamicFilter = {
type: 'row-with-field',
description: 'Highlight the top 3 products by sales',
code: `const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten( _.map(result, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);`,
enabled: true
}

Multi-condition filter:
dynamicFilter = {
type: 'row-with-field',
description: 'Highlight products with a profit margin > 20% and sales > 5000',
code: `const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten( _.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);`,
enabled: true
}

Relative value filter:
dynamicFilter = {
type: 'row-with-field',
description: 'Highlight products with sales above average',
code: `const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten( _.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);`,
enabled: true
}

Grouped filter:
dynamicFilter = {
type: 'row-with-field',
description: 'Highlight the top-selling product in each region',
code: `const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten( _.map(topByRegion, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);`,
enabled: true
}

Highlight entire row:
dynamicFilter = {
description: 'Highlight rows where sales exceed profit',
code: `const matched = _.filter(data, item => item.sales > item.profit);
return matched.map(item => ({ __row_index: item._index,
field: '*'
}));`,
enabled: true
}

#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=Description}
Fallback plan when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note{title=Description}
Dimension field ID.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator:

* in: Select data items where the dimension field value is in the 'value' list.

* not in: Select data items where the dimension field value is not in the 'value' list.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=Description}
Operator:

* in: Select data items where the dimension field value is in the 'value' list.

* not in: Select data items where the dimension field value is not in the 'value' list.

Same as operator.

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=Description}
Selective dimension values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=Description}
Dynamic filter execution result (runtime field). Written during the `prepare()` phase; read-only at runtime.

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### backgroundColor

**Type:** `string | undefined`

:::note{title=Description}
Cell background color.

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable the color scale for cell backgrounds.

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=Description}
Mapping for the cell background color scale; has higher priority than `backgroundColor`.

:::

#### minValue

**Type:** `number | undefined`

:::note{title=Description}
Minimum value; if not configured, defaults to the minimum value in the current data column.

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=Description}
Maximum value; if not configured, defaults to the maximum value in the current data column.

:::

#### minColor

**Type:** `string`

:::note{title=Description}
Color corresponding to the minimum value.

:::

#### maxColor

**Type:** `string`

:::note{title=Description}
Color corresponding to the maximum value.

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to enable background progress bars (a bar reflecting the cell's magnitude). Disabled by default.

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the background bar when the cell value is positive.

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=Description}
Color of the background bar when the cell value is negative.

:::

### barMin

**Type:** `number | undefined`

:::note{title=Description}
Minimum value for the progress bar.
Automatically calculated from the column minimum if not configured.

:::

### barMax

**Type:** `number | undefined`

:::note{title=Description}
Maximum value for the progress bar.
Automatically calculated from the column maximum if not configured.

:::

### textColor

**Type:** `string | undefined`

:::note{title=Description}
Color of cell text.

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=Description}
Size of cell text.

:::

### borderColor

**Type:** `string | undefined`

:::note{title=Description}
Border color of the cell.

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=Description}
Line width of the cell border.

:::

## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title=Description}
Whether measures are displayed as columns. When `true`, measures expand horizontally (columns); when `false`, they expand vertically (rows).

:::

**Example**
true

## totals

**Type:** `PivotTableTotals | undefined`

:::note{title=Description}
Grand total and subtotal configuration for the Pivot Table.

:::

**Example**
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: \['category'] } }

### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=Description}
Grand total and subtotal configuration for rows.

:::

#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show grand totals (total row/column).

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show subtotals.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=Description}
Dimensions for subtotals; group subtotals by these dimensions.

:::

**Example**
\['category', 'region']

### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=Description}
Grand total and subtotal configuration for columns.

:::

#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show grand totals (total row/column).

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=Description}
Whether to show subtotals.

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=Description}
Dimensions for subtotals; group subtotals by these dimensions.

:::

**Example**
\['category', 'region']

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
Locale. Chart language configuration; supports 'zh-CN' and 'en-US'. Alternatively, call `intl.setLocale('zh-CN')` to set the language.

:::
