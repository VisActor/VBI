# Table

:::info\{title=Recommended}
\- Recommended field configuration: `Any` measure(s), `Any` dimension(s)

\- Supports Data Reshape: at least `Any` measure(s), `Any` dimension(s)

:::

:::info\{title=Encoding Mapping}
Only supports configuring dimension and measure trees; defaults to encoding to columns.

:::

:::note\{title=Description}
Table, suitable for detailed data display scenarios, with clear rows and columns for easy viewing of specific values.

Applicable scenarios:

\- Display detailed data records

\- Precise comparison of data items

\- Display attributes of multiple dimensions

:::

:::warning\{title=Warning}
Data requirements:

\- At least 1 dimension field

\- At least 1 measure field

\- Dimension fields will be used as table column headers

Features enabled by default:

\- Sorting, filtering, and pagination are enabled by default

:::

## chartType

**Type:** `"table"`

:::note\{title=Description}
Standard table component for displaying detailed data

:::

**Example**
'table'

## dataset

**Type:** `Record[]`

:::note\{title=Description}
A dataset that conforms to the TidyData specification and is already aggregated, used to define the chart's data source and structure. The dataset provided by the user does not need any preprocessing; each field corresponds to a column, and each record corresponds to a row.

:::

**Example**
\[\{id: 1, name: "A", value: 100}, \{id: 2, name: "B", value: 200}]

## dimensions

**Type:** `DimensionTree | undefined`

:::note\{title=Description}
Each dimension in the table corresponds to a column.

:::

**Example**
\[\{id: "name", alias: "Name"}]

### id

**Type:** `string`

### alias

**Type:** `string | undefined`

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

**Type:** `"row" | "column" | undefined`

:::note\{title=Description}
Channel to which the dimension is mapped

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::

### children

**Type:** `(TableDimension | DimensionGroup)[] | undefined`

#### id

**Type:** `string`

#### alias

**Type:** `string | undefined`

#### timeFormat

**Type:** `TimeFormat | undefined`

:::note\{title=Description}
Dimension date format configuration

:::

##### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note\{title=Description}
Time granularity, determines the date display precision

:::

#### encoding

**Type:** `"row" | "column" | undefined`

:::note\{title=Description}
Channel to which the dimension is mapped

\- row: supports mapping multiple dimensions to the row channel

\- column: supports mapping multiple dimensions to the column channel

:::

## measures

**Type:** `MeasureTree | undefined`

:::note\{title=Description}
Each measure in the table corresponds to a column, and natively supports measure combinations.

:::

**Example**
\[\{id: "value", alias: "Value"}]

### id

**Type:** `string`

:::note\{title=Description}
Measure group ID, must be unique.

:::

### alias

**Type:** `string | undefined`

:::note\{title=Description}
Measure group alias, can be duplicate; defaults to the ID if not specified.

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

**Type:** `"column" | undefined`

:::note\{title=Description}
Channel to which the measure is mapped

\- column: Measure column

:::

### parentId

**Type:** `string | undefined`

:::note\{title=Description}
In flat measure configuration form, builds a tree-shaped measure group. parentId points to the id of the parent measure group, used for building the measure tree

:::

:::tip\{title=Tip}
There are two ways to configure the measure tree: Option 1 is directly configuring a measure tree with children; Option 2 is configuring a flat measure list with parentId. These two methods cannot be used simultaneously

:::

### children

**Type:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note\{title=Description}
Child measures or measure groups within the measure group.

:::

## page

**Type:** `Page | undefined`

:::note\{title=Description}
Pagination configuration, used to specify the pagination field name, which must be a dimension.

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
Background color can be a color string (e.g. 'red', 'blue'), or a hex, rgb, or rgba value (e.g. '#ff0000', 'rgba(255,0,0,0.5)')

:::

## borderColor

**Type:** `string | undefined`

:::note\{title=Description}
Table border color

:::

## bodyFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Table body font size

:::

## bodyFontColor

**Type:** `string | undefined`

:::note\{title=Description}
Table body font color

:::

## bodyBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Table body background color

:::

## headerFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Header font size

:::

## headerFontColor

**Type:** `string | undefined`

:::note\{title=Description}
Header font color

:::

## headerBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Header background color

:::

## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color when the mouse hovers over a header cell, used to highlight the hovered cell.

:::

## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color of the entire row when the mouse hovers over the header, used to highlight the hovered row.

:::

## selectedBorderColor

**Type:** `string | undefined`

:::note\{title=Description}
Border color for selected cells, used to highlight the selection.

:::

## selectedBackgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Background color for selected cells, used to highlight the selection.

:::

## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note\{title=Description}
Sets special styles for cells in the table body.

:::

### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note\{title=Description}
Data selector

If a selector is configured, it provides four types of data matching capabilities: numeric selectors, partial data selectors, conditional dimension selectors, and conditional measure selectors.

If no selector is configured, the style applies globally.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

:::

**Example**
Numeric selector
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

Field column filtering
selector = \{
field: 'category'
}
selector = \{
field: \['category', 'profit']
}

#### field

**Type:** `string | string[]`

:::note\{title=Description}
Field name, can be a single field or an array of multiple fields.

:::

**Example**
Single field
field: 'sales'

Multiple fields
field: \['sales', 'profit', 'revenue']

#### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Selects data items where the dimension field value is in the value array.

\- not in: Selects data items where the dimension field value is not in the value array.

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Selects data items where the dimension field value is in the value array.

\- not in: Selects data items where the dimension field value is not in the value array.

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Selects dimension field values; supports arrays.

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note\{title=Description}
Dynamic filter (code-driven)

Implements complex data filtering logic via AI-generated JavaScript code.

Suitable for scenarios where static selectors are difficult to express, such as Top N, statistical analysis, and complex conditions.

Key capabilities:

\- Supports arbitrarily complex data filtering conditions.

\- Uses built-in utility functions for data manipulation.

\- Safely executed in the browser environment (Web Worker sandbox).

Environmental requirements: Only supports browser environments; Node.js environments will use the fallback.

Note: selector and dynamicFilter cannot be used simultaneously; dynamicFilter has higher priority.

Table dynamic filter configuration

Implements precise cell-level filtering in tables via AI-generated JavaScript code.

:::

#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note\{title=Description}
User's filtering requirement description (natural language).

:::

**Example**
"Highlight cells with sales greater than 1000"

"Highlight the cell with the maximum value in each row"

#### code

**Type:** `string`

:::note\{title=Description}
AI-generated JavaScript filtering code.

\- Can only use built-in utility functions (accessible via \_ or R).

\- Input parameters: data (array), where each item includes an \_index field representing the row number.

\- Must return an array of cell selectors: Array\<\{ \_\_row\_index: number, field: string }>.

\- When field is "\*", it indicates highlighting the entire row.

\- Prohibited: eval, Function, asynchronous operations, DOM APIs, and network requests.

:::

**Example**
Top N filtering
dynamicFilter = \{
type: 'row-with-field',
description: 'Highlight the top 3 products by sales',
code: `const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten( _.map(result, item => [ { __row_index: item._index, field: 'product' }, { __row_index: item._index, field: 'sales' }
])
);`,
enabled: true
}

Multi-condition filtering
dynamicFilter = \{
type: 'row-with-field',
description: 'Highlight products with profit margin > 20% and sales > 5000',
code: `const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten( _.map(matched, item => [ { __row_index: item._index, field: 'product' }, { __row_index: item._index, field: 'sales' }
])
);`,
enabled: true
}

Relative value filtering
dynamicFilter = \{   \*
type: 'row-with-field',
description: 'Highlight products with sales above average',
code: `const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten( _.map(matched, item => [ { __row_index: item._index, field: 'product' }, { __row_index: item._index, field: 'sales' }
])
);`,
enabled: true
}

Grouped filtering
dynamicFilter = \{
type: 'row-with-field',
description: 'Highlight the product with the highest sales in each region',
code: `const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten( _.map(topByRegion, item => [ { __row_index: item._index, field: 'product' }, { __row_index: item._index, field: 'sales' }
])
);`,
enabled: true
}

Highlight entire row
dynamicFilter = \{
description: 'Highlight rows where sales are greater than profit',
code: `const matched = _.filter(data, item => item.sales > item.profit);
return matched.map(item => ({ __row_index: item._index,
field: '*'
}));`,
enabled: true
}

#### fallback

**Type:** `Selector | Selectors | undefined`

:::note\{title=Description}
Fallback plan when code execution fails or the environment is not supported.

:::

##### field

**Type:** `string`

:::note\{title=Description}
Dimension field; ID of an item in dimensions.

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Selects data items where the dimension field value is in the value array.

\- not in: Selects data items where the dimension field value is not in the value array.

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note\{title=Description}
Operator

\- in: Selects data items where the dimension field value is in the value array.

\- not in: Selects data items where the dimension field value is not in the value array.

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note\{title=Description}
Selects dimension field values; supports arrays.

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note\{title=Description}
Dynamic filter execution result (runtime field)

Written during the prepare() phase; read-only at runtime

:::

##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### backgroundColor

**Type:** `string | undefined`

:::note\{title=Description}
Cell background color

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to enable color scale configuration for background colors

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note\{title=Description}
Cell background color scale mapping; takes priority over backgroundColor

:::

#### minValue

**Type:** `number | undefined`

:::note\{title=Description}
Minimum value; defaults to the minimum value in the current data column if not configured

:::

#### maxValue

**Type:** `number | undefined`

:::note\{title=Description}
Maximum value; defaults to the maximum value in the current data column if not configured

:::

#### minColor

**Type:** `string`

:::note\{title=Description}
Color corresponding to the minimum value

:::

#### maxColor

**Type:** `string`

:::note\{title=Description}
Color corresponding to the maximum value

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note\{title=Description}
Whether to enable the progress bar feature (a bar showing the relative size of the cell value); disabled by default

:::

### barPositiveColor

**Type:** `string | undefined`

:::note\{title=Description}
Progress bar color when the cell value is positive

:::

### barNegativeColor

**Type:** `string | undefined`

:::note\{title=Description}
Progress bar color when the cell value is negative

:::

### barMin

**Type:** `number | undefined`

:::note\{title=Description}
Progress bar minimum value

Automatically calculates the column minimum if not configured

:::

### barMax

**Type:** `number | undefined`

:::note\{title=Description}
Progress bar maximum value

Automatically calculates the column maximum if not configured

:::

### textColor

**Type:** `string | undefined`

:::note\{title=Description}
Cell text color

:::

### textFontSize

**Type:** `number | undefined`

:::note\{title=Description}
Cell text font size

:::

### borderColor

**Type:** `string | undefined`

:::note\{title=Description}
Cell border color

:::

### borderLineWidth

**Type:** `number | undefined`

:::note\{title=Description}
Cell border line width

:::

## totals

**Type:** `TotalType | undefined`

:::note\{title=Description}
The type of summary row to display; only applicable to measure columns

\- 'sum': Displays the sum row

\- 'avg': Displays the average row

\- 'max': Displays the maximum row

\- 'min': Displays the minimum row

\- 'count': Displays the count row

Table summary row type

\- 'sum': Sum

\- 'avg': Average

\- 'max': Maximum

\- 'min': Minimum

\- 'count': Count

:::

**Example**
'sum'

## theme

**Type:** `Theme | undefined`

:::note\{title=Description}
Chart theme. Theme is a lower-priority configuration that includes universal settings shared by all chart types and specific settings for individual chart types. Built-in themes include 'light' and 'dark'; users can customize themes via the Builder.

Theme

Built-in light and dark themes; new themes can be customized using registerTheme.

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

:::note\{title=Description}
Chart language configuration; supports 'zh-CN' and 'en-US'. Additionally, language can be set using the intl.setLocale('zh-CN') method.

:::
