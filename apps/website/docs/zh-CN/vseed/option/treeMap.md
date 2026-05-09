# TreeMap

:::info{title="编码映射"}
矩形树图支持以下视觉通道:

`color`: 颜色通道, 支持`多个维度`或 `一个指标`

`label`: 标签通道, 支持`多个维度`与 `多个指标`

`tooltip`: 提示通道, 支持`多个维度`与 `多个指标`

:::

:::note{title="描述"}
矩形树图，用于展示层级数据，通过矩形面积大小表示数值大小

适用场景:

\- 展示层级数据的占比分布

\- 强调数据的整体与部分关系

:::

:::warning{title="Warning"}
数据要求:

\- 至少1个数值字段（度量）用于映射面积

\- 至少1个维度字段用于层级划分

:::


## chartType

**Type:** `"treeMap"`

:::note{title="描述"}
矩形树图



矩形树图，展示层级数据的占比关系

:::

**示例**
```ts
'treeMap'




```
## dataset

**Type:** `Record[]`

:::note{title="描述"}
数据集



符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构

:::

**示例**
```ts
[{category:'A', value:30}, {category:'B', value:70}]




```
## dimensions

**Type:** `HierarchyDimension[] | undefined`

:::note{title="描述"}
维度



维度配置，用于定义数据的层级结构

:::

**示例**
```ts
[{id: 'category', alias: '类别'}]




```
### id

**Type:** `string`

:::note{title="描述"}
维度对应的字段id

:::

### alias

**Type:** `string | undefined`

:::note{title="描述"}
维度别名

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title="描述"}
维度时间格式化配置

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="描述"}
时间粒度，决定日期展示精度

:::

### encoding

**Type:** `"tooltip" | "label" | "hierarchy" | undefined`

:::note{title="描述"}
维度映射的通道

\- hierarchy: 支持将多个维度映射到层级通道

\- label: 支持将多个维度映射到标签通道

\- tooltip: 支持将多个维度映射到提示通道

:::

:::tip{title="Tip"}
第一个维度会被直接映射到 color 通道

:::


## measures

**Type:** `HierarchyMeasure[] | undefined`

:::note{title="描述"}
指标



指标配置，用于定义扇形的大小（面积）

:::

**示例**
```ts
[{id: 'value', alias: '数值'}]




```
### id

**Type:** `string`

:::note{title="描述"}
指标id, 不能重复

:::

### alias

**Type:** `string | undefined`

:::note{title="描述"}
指标别名, 允许重复, 未填写时, alias 为 id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="描述"}
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

:::note{title="描述"}
自定义指标的数值格式化，会自动应用于 label、tooltip

注意：若要使用自定义格式化，必须显式设置 autoFormat=false，否则 autoFormat 会覆盖此配置

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="描述"}
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

:::

#### ratio

**Type:** `number | undefined`

:::note{title="描述"}
数值格式化比例, 不能为0

:::

**示例**
```ts
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="描述"}
数值格式化符号, 例如%、‰

:::

**示例**
```ts
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="描述"}
数值格式化千分位分隔符

:::

#### suffix

**Type:** `string | undefined`

:::note{title="描述"}
数值格式化后缀

:::

#### prefix

**Type:** `string | undefined`

:::note{title="描述"}
数值格式化前缀

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="描述"}
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

:::

**示例**
```ts
\- 1234.5678 转换为 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 转换为 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="描述"}
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

:::

**示例**
```ts
\- 1234.5678 转换为 1000, significantDigits:1
\- 1234.5678 转换为 1200, significantDigits:2
\- 1234.5678 转换为 1230, significantDigits:3
\- 1234.5678 转换为 1234, significantDigits:4
\- 1234.5678 转换为 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="描述"}
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

:::

**示例**
```ts
\- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="描述"}
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="描述"}
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

:::

#### ratio

**Type:** `number | undefined`

:::note{title="描述"}
数值格式化比例, 不能为0

:::

**示例**
```ts
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="描述"}
数值格式化符号, 例如%、‰

:::

**示例**
```ts
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="描述"}
数值格式化千分位分隔符

:::

#### suffix

**Type:** `string | undefined`

:::note{title="描述"}
数值格式化后缀

:::

#### prefix

**Type:** `string | undefined`

:::note{title="描述"}
数值格式化前缀

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="描述"}
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

:::

**示例**
```ts
\- 1234.5678 转换为 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 转换为 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="描述"}
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

:::

**示例**
```ts
\- 1234.5678 转换为 1000, significantDigits:1
\- 1234.5678 转换为 1200, significantDigits:2
\- 1234.5678 转换为 1230, significantDigits:3
\- 1234.5678 转换为 1234, significantDigits:4
\- 1234.5678 转换为 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="描述"}
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

:::

**示例**
```ts
\- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="描述"}
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

:::

### encoding

**Type:** `"tooltip" | "label" | "size" | undefined`

:::note{title="描述"}
指标映射的通道

\- size: 指标映射到大小通道，用于树图等图表的面积或大小展示

\- label: 指标映射的标签

\- tooltip: 指标映射的提示

:::

### parentId

**Type:** `string | undefined`

:::note{title="描述"}
以扁平的指标配置形式, 构建树形指标组, parentId指向父级指标组的id, 用于构建指标树

:::

:::tip{title="Tip"}
指标树的配置存在两种形式, 方式一是直接配置带children的指标树, 方式二是配置parentId的扁平指标列表, 两种方式不能同时配置

:::


## page

**Type:** `Page | undefined`

:::note{title="描述"}
分页配置



用于指定分页的字段名, 必须是维度

:::


### field

**Type:** `string`

:::note{title="描述"}
分页字段, 用于指定分页的字段名, 必须是维度

:::

### currentValue

**Type:** `string`

:::note{title="描述"}
当前分页值, 用于指定当前分页的依据值

:::

**示例**
```ts
'2023\-01\-01'




```
## backgroundColor

**Type:** `BackgroundColor`

:::note{title="描述"}
图表的背景颜色



背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title="描述"}
颜色



颜色配置, 用于定义图表的颜色方案, 包括颜色列表, 颜色映射, 颜色渐变等.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title="描述"}
离散颜色配色方案, 颜色配色方案用于定义图表中不同元素的颜色

:::

**示例**
```ts
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



```
### linearColorScheme

**Type:** `string[] | undefined`

:::note{title="描述"}
线性渐变颜色配色方案, 线性渐变颜色配色方案用于定义图表中不同元素的颜色

:::

**示例**
```ts
['#FFCDD2, #F8BBD0]



```
### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title="描述"}
颜色映射, 颜色映射用于将数据值映射到具体的颜色

:::

**示例**
```ts
{
 'profit': 'red',
 'sales': 'blue',
}



```
### positiveColor

**Type:** `string | undefined`

:::note{title="描述"}
正负颜色配置, 用于定义图表中正值的颜色

:::

### negativeColor

**Type:** `string | undefined`

:::note{title="描述"}
正负颜色配置, 用于定义图表中负值的颜色

:::


## label

**Type:** `Label | undefined`

:::note{title="描述"}
标签



标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.

:::


### enable

**Type:** `false | true`

:::note{title="描述"}
标签功能是否开启

:::

### wrap

**Type:** `boolean | undefined`

:::note{title="描述"}
标签是否换行

:::

### showValue

**Type:** `boolean | undefined`

:::note{title="描述"}
标签是否显示指标值

多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾

注意: encoding的label优先级更高, 此配置不影响encoding的label

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title="描述"}
标签是否显示指标值的百分比

多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾

注意: encoding的label优先级更高, 此配置不影响encoding的label

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title="描述"}
标签是否显示维度标签

展示所有维度标签

注意: encoding的label优先级更高, 此配置不影响encoding的label

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="描述"}
标签数值是否自动格式化, autoFormat 为 true 时, numFormat 配置失效

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="描述"}
标签数值格式化配置, 会和 `measure` 中的 `format` 进行合并, `measure` 中的 `format` 优先级更高. numFormat 优先级低于 autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="描述"}
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

:::

#### ratio

**Type:** `number | undefined`

:::note{title="描述"}
数值格式化比例, 不能为0

:::

**示例**
```ts
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="描述"}
数值格式化符号, 例如%、‰

:::

**示例**
```ts
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="描述"}
数值格式化千分位分隔符

:::

#### suffix

**Type:** `string | undefined`

:::note{title="描述"}
数值格式化后缀

:::

#### prefix

**Type:** `string | undefined`

:::note{title="描述"}
数值格式化前缀

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="描述"}
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

:::

**示例**
```ts
\- 1234.5678 转换为 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 转换为 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="描述"}
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

:::

**示例**
```ts
\- 1234.5678 转换为 1000, significantDigits:1
\- 1234.5678 转换为 1200, significantDigits:2
\- 1234.5678 转换为 1230, significantDigits:3
\- 1234.5678 转换为 1234, significantDigits:4
\- 1234.5678 转换为 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, significantDigits:8 (roundingMode:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="描述"}
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

:::

**示例**
```ts
\- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="描述"}
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="描述"}
标签字体大小

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="描述"}
标签字体粗细

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="描述"}
标签背景色

:::

### labelStroke

**Type:** `string | undefined`

:::note{title="描述"}
标签描边颜色

:::

### labelColor

**Type:** `string | undefined`

:::note{title="描述"}
标签字体颜色

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title="描述"}
标签是否自动根据图元颜色进行字体颜色的反转

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title="描述"}
标签位置

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title="描述"}
标签防重叠功能是否启用

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="描述"}
标签筛选，默认selectors之间条件关系为Or

:::


#### field

**Type:** `string`

:::note{title="描述"}
维度字段, dimensions 某一项的 id

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="描述"}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="描述"}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="描述"}
选择数据项中维度字段的值, 支持数组

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="描述"}
动态筛选器（AI生成代码执行）



通过 AI 生成的 JavaScript 代码实现复杂数据筛选逻辑



核心能力:

\- 支持任意复杂的数据筛选条件

\- 使用 内置工具函数 进行数据操作

\- 在浏览器环境中安全执行（Web Worker 沙箱）



环境要求: 仅支持浏览器环境，Node.js 环境将使用 fallback



注意: selector 和 dynamicFilter 不能同时使用，dynamicFilter 优先级更高



图表动态筛选器配置



通过 AI 生成的 JavaScript 代码实现图表标记（柱子、点等）的筛选

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="描述"}
用户的筛选需求描述（自然语言）

:::

**示例**
```ts
"高亮销售额大于1000的柱子"

"高亮每个区域中利润率最高的柱子"



```
#### code

**Type:** `string`

:::note{title="描述"}
AI 生成的 JavaScript 筛选代码



\- 只能使用内置工具函数（通过 _ 或 R 访问）

\- 输入参数: data (数组)，每个 item 包含 __row_index 字段表示行号

\- 必须返回行索引与字段组合的数组: ``Array<{ __row_index: number, field: string }>``

\- __row_index 表示原始数据项的行号，field 表示需要高亮的字段

\- 禁止使用: eval, Function, 异步操作, DOM API, 网络请求

:::

**示例**
```ts
高亮销售额大于1000的数据项的 sales 字段
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

高亮每个区域中利润率最高的数据项
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

高亮多条件筛选的数据项
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

:::note{title="描述"}
代码执行失败或环境不支持时的降级方案

:::


##### field

**Type:** `string`

:::note{title="描述"}
维度字段, dimensions 某一项的 id

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="描述"}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="描述"}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="描述"}
选择数据项中维度字段的值, 支持数组

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="描述"}
动态筛选执行结果（运行期字段）



`prepare() 阶段写入，运行时只读`

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title="描述"}
提示信息



提示信息配置, 用于定义图表的提示信息, 包括提示信息的位置, 格式, 样式等.

:::


### enable

**Type:** `false | true`

:::note{title="描述"}
提示信息功能是否开启

:::


## theme

**Type:** `Theme | undefined`

:::note{title="描述"}
图表的主题



内置light与dark两种主题, 用户可以通过Builder自定义主题



主题



内置 light、dark 两种主题, 新的主题可以通过registerTheme自定义主题.

:::

**示例**
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

:::note{title="描述"}
语言



图表语言配置, 支持'zh\-CN'与'en\-US'两种语言

:::

