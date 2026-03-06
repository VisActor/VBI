# PivotTable

:::info{title=推荐}
\- 推荐字段配置: `1`个指标, `1`个维度

\- 支持数据重塑: 至少`1`个指标, `0`个维度

:::

:::info{title=编码映射}
透视表支持以下视觉通道:

`row`    : 行维度, 支持`多个维度`, 按维度值在行上进行分组

`column` : 列维度, 支持`多个维度`, 按维度值在列上进行分组

`detail` : 细分通道, 支持`多个指标`, 在单元格中展示指标值

:::

:::note{title=描述}
透视表格，适用于多维度数据交叉分析场景，可灵活配置行、列维度和指标计算方式

适用场景:

\- 复杂多维数据统计分析

\- 数据钻取与聚合展示

\- 业务报表生成与数据探索

:::

:::warning{title=Warning}
数据要求:

\- 至少1个行维度 或 1个列维度 或 1个指标

\- 数据必须已聚合

\- 数据可被分组

默认开启的功能:

\- 默认开启行列排序、数据筛选、聚合计算、小计/总计

:::


## chartType

**Type:** `"pivotTable"`

:::note{title=描述}
透视表，适用于多维度数据交叉分析场景

:::

**示例**
'pivotTable'




## dataset

**Type:** `Record[]`

:::note{title=描述}
符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 透视表的数据最终会被转换对应的树形结构, 用户无需手动进行数据处理.

:::

**示例**
[{region:'华东', product:'A', sales:1000}, {region:'华东', product:'B', sales:1500}]




## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title=描述}
透视表的行维度和列维度，会自动对数据进行处理为树形结构, 并映射到行和列轴,

:::

**示例**
[{id: 'region', alias: '地区', isRow: true}, {id: 'product', alias: '产品', isColumn: true}]




### id

**Type:** `string`

:::note{title=描述}
维度对应的字段id

:::

### alias

**Type:** `string | undefined`

:::note{title=描述}
维度别名

:::

### encoding

**Type:** `"row" | "column" | undefined`

:::note{title=描述}
维度映射的通道

\- row: 支持将多个维度映射到行通道

\- column: 支持将多个维度映射到列通道

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title=描述}
透视表支持多个维度指标

:::

**示例**
[{id: 'sales', alias: '销售额', aggregation: 'sum'}]




### id

**Type:** `string`

:::note{title=描述}
指标id, 不能重复

:::

### alias

**Type:** `string | undefined`

:::note{title=描述}
指标别名, 允许重复, 未填写时, alias 为 id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=描述}
自动数值格式化，默认开启，优先级最高

当 autoFormat=true 时，会覆盖 numFormat 的所有配置

开启后，图表的数据标签、提示信息会根据指标数值和语言环境自动选择合适的格式化方式

格式化规则：十进制数值，开启 compact notation，最小0位小数，最大2位小数，自动四舍五入，使用浏览器提供的 Intl.NumberFormat 实现

例如:

\- locale为zh\-CN: 749740.264 → 74.45万

\- locale为en\-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=描述}
自定义指标的数值格式化，会自动应用于 label、tooltip

注意：若要使用自定义格式化，必须显式设置 autoFormat=false，否则 autoFormat 会覆盖此配置

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=描述}
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

:::

#### ratio

**Type:** `number | undefined`

:::note{title=描述}
数值格式化比例, 不能为0

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=描述}
数值格式化符号, 例如%、‰

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=描述}
数值格式化千分位分隔符

:::

#### suffix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化后缀

:::

#### prefix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化前缀

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=描述}
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

:::

**示例**
\- 1234.5678 转换为 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 转换为 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=描述}
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

:::

**示例**
\- 1234.5678 转换为 1000, significantDigits:1
\- 1234.5678 转换为 1200, significantDigits:2
\- 1234.5678 转换为 1230, significantDigits:3
\- 1234.5678 转换为 1234, significantDigits:4
\- 1234.5678 转换为 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=描述}
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

:::

**示例**
\- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=描述}
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=描述}
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

:::

#### ratio

**Type:** `number | undefined`

:::note{title=描述}
数值格式化比例, 不能为0

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=描述}
数值格式化符号, 例如%、‰

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=描述}
数值格式化千分位分隔符

:::

#### suffix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化后缀

:::

#### prefix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化前缀

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title=描述}
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

:::

**示例**
\- 1234.5678 转换为 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 转换为 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



#### significantDigits

**Type:** `number | undefined`

:::note{title=描述}
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

:::

**示例**
\- 1234.5678 转换为 1000, significantDigits:1
\- 1234.5678 转换为 1200, significantDigits:2
\- 1234.5678 转换为 1230, significantDigits:3
\- 1234.5678 转换为 1234, significantDigits:4
\- 1234.5678 转换为 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, significantDigits:8 (roundingMode:halfCeil)



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=描述}
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

:::

**示例**
\- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=描述}
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

:::

### encoding

**Type:** `"column" | undefined`

:::note{title=描述}
指标映射的通道

\- column: 指标列

:::

### parentId

**Type:** `string | undefined`

:::note{title=描述}
以扁平的指标配置形式, 构建树形指标组, parentId指向父级指标组的id, 用于构建指标树

:::

:::tip{title=Tip}
指标树的配置存在两种形式, 方式一是直接配置带children的指标树, 方式二是配置parentId的扁平指标列表, 两种方式不能同时配置

:::


## page

**Type:** `Page | undefined`

:::note{title=描述}
分页配置, 用于指定分页的字段名, 必须是维度

:::


### field

**Type:** `string`

:::note{title=描述}
分页字段, 用于指定分页的字段名, 必须是维度

:::

### currentValue

**Type:** `string`

:::note{title=描述}
当前分页值, 用于指定当前分页的依据值

:::

**示例**
'2023\-01\-01'




## backgroundColor

**Type:** `BackgroundColor`

:::note{title=描述}
背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## borderColor

**Type:** `string | undefined`

:::note{title=描述}
表格的边框颜色

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title=描述}
表格体的字体大小

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title=描述}
表格体的字体颜色

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
表格体的背景颜色

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title=描述}
行表头、列表头的字体大小

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title=描述}
行表头、列表头的字体颜色

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
行表头、列表头的背景颜色

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
鼠标悬浮在行、列表头的单元格时的背景颜色, 用于突出显示鼠标所在的行列交叉的单元格

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
鼠标悬浮在行、列表头的单元格时, 用于突出显示鼠标所在的行与列的所有单元格

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title=描述}
选中的单元格的边框颜色, 用于突出显示选中的单元格

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
选中的单元格的背景颜色, 用于突出显示选中的单元格

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=描述}
设置表格正文部分单元格的特殊样式

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title=描述}
数据选择器



若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力

若未配置selector, 则样式全局生效.



注意: selector 和 dynamicFilter 不能同时使用，dynamicFilter 优先级更高

:::

**示例**
数值选择器
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

局部数据选择器
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

条件维度选择器
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

条件指标选择器
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

字段列筛选
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




#### field

**Type:** `string | string[]`

:::note{title=描述}
字段名，可以是单个字段或多个字段数组

:::

**示例**
单个字段
field: 'sales'

多个字段
field: ['sales', 'profit', 'revenue']



#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=描述}
选择数据项中维度字段的值, 支持数组

:::

### dynamicFilter

**Type:** `TableDynamicFilter | undefined`

:::note{title=描述}
动态筛选器（代码驱动）



通过 AI 生成的 JavaScript 代码实现复杂数据筛选逻辑

适用于 Top N、统计分析、复杂条件等静态 selector 难以表达的场景



核心能力:

\- 支持任意复杂的数据筛选条件

\- 使用 内置工具函数 进行数据操作

\- 在浏览器环境中安全执行（Web Worker 沙箱）



环境要求: 仅支持浏览器环境，Node.js 环境将使用 fallback



注意: selector 和 dynamicFilter 不能同时使用，dynamicFilter 优先级更高



表格动态筛选器配置



通过 AI 生成的 JavaScript 代码实现表格单元格级别的精确筛选

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title=描述}
用户的筛选需求描述（自然语言）

:::

**示例**
"高亮销售额大于1000的单元格"

"高亮每行中最大值所在的单元格"



#### code

**Type:** `string`

:::note{title=描述}
AI 生成的 JavaScript 筛选代码



\- 只能使用内置工具函数（通过 _ 或 R 访问）

\- 输入参数: data (数组)，每个 item 包含 _index 字段表示行号

\- 必须返回单元格选择器数组: Array<{ __row_index: number, field: string }>

\- field 为 "*" 时表示整行高亮

\- 禁止使用: eval, Function, 异步操作, DOM API, 网络请求

:::

**示例**
Top N 筛选
dynamicFilter = {
type: 'row\-with\-field',
description: '高亮销售额最高的前3个产品',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
_.map(result, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

多条件筛选
dynamicFilter = {
type: 'row\-with\-field',
description: '高亮利润率大于20%且销售额超过5000的产品',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

相对值筛选
dynamicFilter = {   *
type: 'row\-with\-field',
description: '高亮销售额高于平均值的产品',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
_.map(matched, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

分组筛选
dynamicFilter = {
type: 'row\-with\-field',
description: '每个区域中销售额最高的产品',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
_.map(topByRegion, item => [
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

整行高亮
dynamicFilter = {
description: '高亮销售额大于利润的整行',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
return matched.map(item => ({
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
代码执行失败或环境不支持时的降级方案

:::


##### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title=描述}
选择数据项中维度字段的值, 支持数组

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title=描述}
动态筛选执行结果（运行期字段）



prepare() 阶段写入，运行时只读

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### backgroundColor

**Type:** `string | undefined`

:::note{title=描述}
单元格背景色

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title=描述}
是否开启背景色的色阶配置（color scale）

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title=描述}
单元格背景色scale映射，优先级高于backgroundColor

:::


#### minValue

**Type:** `number | undefined`

:::note{title=描述}
最小值，不配置时默认为当前数据列中的最小值

:::

#### maxValue

**Type:** `number | undefined`

:::note{title=描述}
最大值，不配置时默认为当前数据列中的最大值

:::

#### minColor

**Type:** `string`

:::note{title=描述}
最小值对应的颜色

:::

#### maxColor

**Type:** `string`

:::note{title=描述}
最大值对应的颜色

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title=描述}
是否开启背景数据条条（一个条形柱来显示当前单元格的大小）功能，默认不开启

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title=描述}
当前单元格直为正数时的背景数据条颜色

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title=描述}
数值为负数时的背景数据条条颜色

:::

### barMin

**Type:** `number | undefined`

:::note{title=描述}
进度条最小值



未配置时自动计算列的最小值

:::

### barMax

**Type:** `number | undefined`

:::note{title=描述}
进度条最大值



未配置时自动计算列的最大值

:::

### textColor

**Type:** `string | undefined`

:::note{title=描述}
单元格文字颜色

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=描述}
单元格文字大小

:::

### borderColor

**Type:** `string | undefined`

:::note{title=描述}
单元格边框颜色

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title=描述}
单元格边框线宽

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title=描述}
指标是否作为列展示，当为 true 时指标在列方向展开，为 false 时在行方向展开

:::

**示例**
true




## totals

**Type:** `PivotTableTotals | undefined`

:::note{title=描述}
透视表的总计和小计配置



透视表的总计小计配置

:::

**示例**
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=描述}
行的总计小计配置



行或列的总计小计配置

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=描述}
是否显示总计（总计行/列）

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=描述}
是否显示小计

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=描述}
小计的维度，按哪些维度进行小计分组

:::

**示例**
['category', 'region']



### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title=描述}
列的总计小计配置



行或列的总计小计配置

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title=描述}
是否显示总计（总计行/列）

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title=描述}
是否显示小计

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title=描述}
小计的维度，按哪些维度进行小计分组

:::

**示例**
['category', 'region']




## theme

**Type:** `Theme | undefined`

:::note{title=描述}
图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置



内置light与dark两种主题, 用户可以通过Builder自定义主题



主题



内置 light、dark 两种主题, 新的主题可以通过registerTheme自定义主题.

:::

**示例**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `Locale | undefined`

:::note{title=描述}
语言



图表语言配置, 支持'zh\-CN'与'en\-US'两种语言, 另外可以调用 intl.setLocale('zh\-CN') 方法设置语言

:::

