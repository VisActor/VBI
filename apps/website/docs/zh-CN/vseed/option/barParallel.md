# BarParallel

:::info{title=推荐}
\- 推荐字段配置: `1`个指标, `2`个维度

\- 支持数据重塑: 至少`1`个指标, `0`个维度

:::

:::info{title=编码映射}
并列条形图支持以下视觉通道:

`yAxis`  : y轴通道, 支持`多个维度`, 按维度值映射至y轴

`xAxis`  : x轴通道, 支持`多个指标`, 按指标值映射至x轴

`detail` : 细分通道, 支持`多个维度`, 在同一个颜色系列下展示更细粒度的数据时使用

`color`  : 颜色通道, 支持`多个维度`或 `一个指标`, 维度颜色用于区分不同的数据系列, 指标颜色用于线性映射指标值到图形颜色

`tooltip`: 提示通道, 支持`多个维度`与 `多个指标`, 会在鼠标悬停在数据点上时展示

`label`  : 标签通道, 支持`多个维度`与 `多个指标`, 会在数据点上展示数据标签

:::

:::note{title=描述}
并列条形图，适用于多指标横向并行对比场景，多个条形平行排列展示不同指标值

适用场景:

\- 类别名称较长时的多指标对比

\- 排名与数值同时展示的横向比较

\- 多维度数据的并列分析

:::

:::warning{title=Warning}
数据要求:

\- 至少1个指标字段（度量）

\- 第一个维度会放至Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.

\- 所有指标会自动合并为一个指标

默认开启的功能:

\- 默认开启图例、坐标轴、数据标签、提示信息

:::


## chartType

**Type:** `"barParallel"`

:::note{title=描述}
并列条形图，适用于多指标横向并行对比场景

:::

**示例**
'barParallel'




## dataset

**Type:** `Record[]`

:::note{title=描述}
数据源, 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 并列条形图的数据最终会被转换为2个维度, 1个指标.

:::

**示例**
[{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]




## dimensions

**Type:** `BarDimension[] | undefined`

:::note{title=描述}
维度, 第一个维度被映射到Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.

:::

**示例**
[{id: 'category', alias: '类别'}]




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

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title=描述}
维度时间格式化配置

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title=描述}
时间粒度，决定日期展示精度

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title=描述}
维度映射的通道

\- yAxis: 支持将多个维度映射到y轴

\- color: 支持将多个维度映射到颜色通道

\- detail: 支持将多个维度映射到详情通道

\- tooltip: 支持将多个维度映射到提示通道

\- label: 支持将多个维度映射到标签通道

\- row: 支持将多个维度映射到行通道

\- column: 支持将多个维度映射到列通道

:::


## measures

**Type:** `BarMeasure[] | undefined`

:::note{title=描述}
指标, 并列条形图指标会自动合并为一个指标, 映射到X轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.

:::

**示例**
[{id: 'value1', alias: '指标1'}, {id: 'value2', alias: '指标2'}]




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

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | undefined`

:::note{title=描述}
指标映射的通道

\- xAxis: 指标映射的x轴

\- detail: 指标映射的详情

\- color: 指标映射的颜色

\- label: 指标映射的标签

\- tooltip: 指标映射的提示

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
分页



分页配置，用于配置图表的分页功能

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
图表的背景颜色, 默认为透明背景, 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=描述}
颜色配置, 用于定义图表的颜色方案, 包括颜色列表, 颜色映射, 颜色渐变等.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=描述}
离散颜色配色方案, 颜色配色方案用于定义图表中不同元素的颜色

:::

**示例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=描述}
线性渐变颜色配色方案, 线性渐变颜色配色方案用于定义图表中不同元素的颜色

:::

**示例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=描述}
颜色映射, 颜色映射用于将数据值映射到具体的颜色

:::

**示例**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=描述}
正负颜色配置, 用于定义图表中正值的颜色

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=描述}
正负颜色配置, 用于定义图表中负值的颜色

:::


## label

**Type:** `Label | undefined`

:::note{title=描述}
标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.

:::


### enable

**Type:** `false | true`

:::note{title=描述}
标签功能是否开启

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否换行

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否显示指标值

多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾

注意: encoding的label优先级更高, 此配置不影响encoding的label

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否显示指标值的百分比

多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾

注意: encoding的label优先级更高, 此配置不影响encoding的label

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否显示维度标签

展示所有维度标签

注意: encoding的label优先级更高, 此配置不影响encoding的label

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=描述}
标签数值是否自动格式化, autoFormat 为 true 时, numFormat 配置失效

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=描述}
标签数值格式化配置, 会和 `measure` 中的 `format` 进行合并, `measure` 中的 `format` 优先级更高. numFormat 优先级低于 autoFormat

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

### labelFontSize

**Type:** `number | undefined`

:::note{title=描述}
标签字体大小

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=描述}
标签字体粗细

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
标签背景色

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=描述}
标签描边颜色

:::

### labelColor

**Type:** `string | undefined`

:::note{title=描述}
标签字体颜色

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否自动根据图元颜色进行字体颜色的反转

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=描述}
标签位置

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=描述}
标签防重叠功能是否启用

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
标签筛选，默认selectors之间条件关系为Or

:::


#### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id

:::

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

**Type:** `ChartDynamicFilter | undefined`

:::note{title=描述}
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

:::note{title=描述}
用户的筛选需求描述（自然语言）

:::

**示例**
"高亮销售额大于1000的柱子"

"高亮每个区域中利润率最高的柱子"



#### code

**Type:** `string`

:::note{title=描述}
AI 生成的 JavaScript 筛选代码



\- 只能使用内置工具函数（通过 _ 或 R 访问）

\- 输入参数: data (数组)，每个 item 包含 __row_index 字段表示行号

\- 必须返回行索引与字段组合的数组: Array<{ __row_index: number, field: string }>

\- __row_index 表示原始数据项的行号，field 表示需要高亮的字段

\- 禁止使用: eval, Function, 异步操作, DOM API, 网络请求

:::

**示例**
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


## legend

**Type:** `Legend | undefined`

:::note{title=描述}
图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=描述}
图例功能是否开启

:::

**示例**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=描述}
图例边框是否开启

:::

:::warning{title=Warning}
仅离散图例生效

:::

**示例**
border: true



### labelColor

**Type:** `string | undefined`

:::note{title=描述}
图例字体颜色

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=描述}
分页器icon颜色

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=描述}
分页器icon置灰颜色

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=描述}
图例字体大小

:::

**示例**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=描述}
图例字体颜色

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=描述}
图例字体粗细

:::

**示例**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=描述}
图例形状

:::

:::warning{title=Warning}
仅离散图例生效

:::

**示例**
shapeType: 'circle'



### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=描述}
图例位置

:::

**示例**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=描述}
存在大量图例时, 最大列数 或 图例最大行数

如果position为水平方向(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize控制显示的列数

如果position为垂直方向(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize控制显示的行数

:::

:::warning{title=Warning}
仅离散图例生效

:::

**示例**
maxSize: 2




## regionPadding

**Type:** `RegionPadding | undefined`

:::note{title=描述}
绘图区内边距



映射到 VChart 的 region[0].padding，用于为标注、标签等绘图区外扩元素预留空间。

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

:::note{title=描述}
提示信息配置, 用于定义图表的提示信息, 包括提示信息的位置, 格式, 样式等.

:::


### enable

**Type:** `false | true`

:::note{title=描述}
提示信息功能是否开启

:::


## brush

**Type:** `Brush | undefined`

:::note{title=描述}
框选



框选配置，用于开启/关闭 brush 框选能力



图表框选配置

:::


### enable

**Type:** `boolean | undefined`

:::note{title=描述}
是否开启brush框选

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=描述}
brush的类型



定义刷选框的形状和刷选方向

\- `rect`: 矩形框选，可以在X轴和Y轴两个方向上同时进行框选

\- `polygon`: 多边形框选，通过点击多个点绘制任意多边形进行框选

\- `x`: X轴方向框选，只在X轴方向上进行框选，Y轴方向不限制

\- `y`: Y轴方向框选，只在Y轴方向上进行框选，X轴方向不限制

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=描述}
框选模式，单选还是多选



定义刷选的模式

\- `single`: 单选模式，每次只能有一个刷选框

\- `multiple`: 多选模式，可以同时存在多个刷选框

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=描述}
框选结束是否清除选框

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=描述}
被框选中的数据样式



定义被刷选中的数据点的样式

:::


#### opacity

**Type:** `number | undefined`

:::note{title=描述}
不透明度



被框选中的数据点的不透明度，取值范围 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=描述}
描边颜色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
描边宽度

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=描述}
未被框选中的数据样式



定义未被刷选中的数据点的样式

:::


#### opacity

**Type:** `number | undefined`

:::note{title=描述}
不透明度



未被框选中的数据点的不透明度，取值范围 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=描述}
描边颜色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
描边宽度

:::


## animation

**Type:** `BarLikeAnimation | undefined`

:::note{title=描述}
动画配置



图表动画配置，按图表类型约束可选效果

:::


### enable

**Type:** `boolean | undefined`

:::note{title=描述}
是否启用条形/柱形图动画

:::

### params

**Type:** `BarLikeAnimationParams | undefined`

:::note{title=描述}
条形/柱形图动画参数

:::


#### appear

**Type:** `BarLikeAppearAnimation | undefined`

:::note{title=描述}
条形/柱形图入场动画配置

:::


##### effects

**Type:** `"growth"[] | undefined`

:::note{title=描述}
条形/柱形图入场效果，支持生长动画

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=描述}
是否启用当前动画阶段

:::

##### ease

**Type:** `string | undefined`

:::note{title=描述}
动画缓动函数

:::

##### duration

**Type:** `number | undefined`

:::note{title=描述}
动画时长，单位为毫秒

:::

##### color

**Type:** `string | undefined`

:::note{title=描述}
动画高亮或氛围颜色

:::

#### update

**Type:** `BarLikeUpdateAnimation | undefined`

:::note{title=描述}
条形/柱形图更新动画配置

:::


##### effects

**Type:** `("growth" | "moveIn")[] | undefined`

:::note{title=描述}
条形/柱形图更新效果，支持生长和移入动画

:::

##### enable

**Type:** `boolean | undefined`

:::note{title=描述}
是否启用当前动画阶段

:::

##### ease

**Type:** `string | undefined`

:::note{title=描述}
动画缓动函数

:::

##### duration

**Type:** `number | undefined`

:::note{title=描述}
动画时长，单位为毫秒

:::

##### color

**Type:** `string | undefined`

:::note{title=描述}
动画高亮或氛围颜色

:::

#### loop

**Type:** `BarLikeAnimationLoop | undefined`

:::note{title=描述}
条形/柱形图循环动画配置

:::


##### enable

**Type:** `boolean | undefined`

:::note{title=描述}
是否启用循环动画

:::

##### interval

**Type:** `number | undefined`

:::note{title=描述}
循环动画间隔，单位为毫秒

:::

##### loop

**Type:** `BarLikeLoopAnimation | undefined`

:::note{title=描述}
条形/柱形图循环动画配置

:::


###### effects

**Type:** `BarLikeLoopEffect[] | undefined`

:::note{title=描述}
条形/柱形图循环效果

:::

###### enable

**Type:** `boolean | undefined`

:::note{title=描述}
是否启用当前动画阶段

:::

###### ease

**Type:** `string | undefined`

:::note{title=描述}
动画缓动函数

:::

###### duration

**Type:** `number | undefined`

:::note{title=描述}
动画时长，单位为毫秒

:::

###### color

**Type:** `string | undefined`

:::note{title=描述}
动画高亮或氛围颜色

:::

##### atmosphere

**Type:** `PointAtmosphereConfig | undefined`

:::note{title=描述}
条形/柱形图氛围动画配置

:::


###### ease

**Type:** `string | undefined`

:::note{title=描述}
氛围动画缓动函数

:::

###### color

**Type:** `string | undefined`

:::note{title=描述}
氛围动画颜色

:::

###### effect

**Type:** `PointAtmosphereEffect | undefined`

:::note{title=描述}
氛围动画效果，支持涟漪、显隐和呼吸

:::


## xAxis

**Type:** `XLinearAxis | undefined`

:::note{title=描述}
x轴, 数值轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=描述}
轴是否可见

:::

### min

**Type:** `number | undefined`

:::note{title=描述}
轴的最小值, 优先级高于 nice 与 zero

:::

### max

**Type:** `number | boolean | undefined`

:::note{title=描述}
轴的最大值, 优先级高于 nice 与 zero, 如果为true, 则自动根据数据范围计算最大值

:::

### log

**Type:** `boolean | undefined`

:::note{title=描述}
是否使用对数轴, 仅对数值轴生效

:::

### logBase

**Type:** `number | undefined`

:::note{title=描述}
对数轴的底数, 仅对数值轴生效

:::

### nice

**Type:** `boolean | undefined`

:::note{title=描述}
是否自动调整轴的刻度间隔，使刻度标签更易读, 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=描述}
轴是否反向展示, 仅对数值轴生效

:::

### zero

**Type:** `boolean | undefined`

:::note{title=描述}
是否在坐标轴上强制显示 0 值, 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=描述}
是否自动格式化数值轴的刻度标签, 仅对数值轴生效, autoFormat 为 true 时, numFormat 配置失效

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=描述}
数值轴的数字格式化, 仅对数值轴生效, 优先级低于 autoFormat

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

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=描述}
X轴刻度标签

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否可见

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=描述}
标签颜色

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=描述}
标签字体大小

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=描述}
标签字体粗细

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=描述}
标签旋转角度

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=描述}
X轴线

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=描述}
轴线是否可见

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=描述}
轴线颜色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
轴线宽度

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=描述}
X轴刻度

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=描述}
刻度是否可见

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=描述}
刻度是否朝内

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=描述}
刻度颜色

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=描述}
刻度尺寸

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=描述}
X轴标题

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=描述}
标题是否可见

:::

#### titleText

**Type:** `string | undefined`

:::note{title=描述}
标题文本, 默认跟随字段配置

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=描述}
标题颜色

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=描述}
标题字体大小

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=描述}
标题字体粗细

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=描述}
X轴网格线

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=描述}
网格线颜色

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=描述}
网格线宽度

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=描述}
网格线类型

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=描述}
Y轴动画配置

:::


#### duration

**Type:** `number | undefined`

:::note{title=描述}
动画时长

:::

#### easing

**Type:** `string | undefined`

:::note{title=描述}
动画 easing 函数

:::


## yAxis

**Type:** `YBandAxis | undefined`

:::note{title=描述}
y轴, 类目轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.

:::


### visible

**Type:** `boolean | undefined`

:::note{title=描述}
轴是否可见

:::

### inverse

**Type:** `boolean | undefined`

:::note{title=描述}
轴是否反向展示, 仅对数值轴生效

:::

### zero

**Type:** `boolean | undefined`

:::note{title=描述}
是否在坐标轴上强制显示 0 值, 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title=描述}
轴标签, 自动隐藏, 2个标签若重叠(间隔小于autoHideGap), 则自动隐藏导致重叠的标签. 仅对类目轴生效.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title=描述}
轴标签, 自动隐藏间隔, 若2个文本标签的间隔小于autoHideGap, 则自动隐藏导致重叠的标签. 仅对类目轴生效.

autoHide开启时, 使用autoHide, 设置在autoHideSeparation上

autoHide关闭时, 使用sampling采样, 设置在minGap上

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=描述}
轴标签, 自动旋转, 当标签宽度超过轴长度时, 自动旋转标签. 仅对类目轴生效.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=描述}
轴标签, 自动旋转角度范围, 当自动旋转开启时, 标签旋转角度范围. 仅对类目轴生效.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=描述}
轴标签, 自动限制长度, 当标签宽度超过轴长度时, 超出部分省略号表示, 鼠标悬浮后可见标签, 自动限制标签宽度. 仅对类目轴生效.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=描述}
轴标签, 自动限制长度的最大长度, 当标签文本长度超过最大长度时, 超出部分省略号表示, 鼠标悬浮后可见标签. 仅对类目轴生效.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=描述}
X轴刻度标签

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否可见

:::

#### labelColor

**Type:** `string | undefined`

:::note{title=描述}
标签颜色

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title=描述}
标签字体大小

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title=描述}
标签字体粗细

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title=描述}
标签旋转角度

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=描述}
X轴线

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=描述}
轴线是否可见

:::

#### lineColor

**Type:** `string | undefined`

:::note{title=描述}
轴线颜色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
轴线宽度

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=描述}
X轴刻度

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=描述}
刻度是否可见

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title=描述}
刻度是否朝内

:::

#### tickColor

**Type:** `string | undefined`

:::note{title=描述}
刻度颜色

:::

#### tickSize

**Type:** `number | undefined`

:::note{title=描述}
刻度尺寸

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=描述}
X轴标题

:::


#### visible

**Type:** `boolean | undefined`

:::note{title=描述}
标题是否可见

:::

#### titleText

**Type:** `string | undefined`

:::note{title=描述}
标题文本, 默认跟随字段配置

:::

#### titleColor

**Type:** `string | undefined`

:::note{title=描述}
标题颜色

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title=描述}
标题字体大小

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title=描述}
标题字体粗细

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title=描述}
X轴网格线

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title=描述}
网格线颜色

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title=描述}
网格线宽度

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title=描述}
网格线类型

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title=描述}
Y轴动画配置

:::


#### duration

**Type:** `number | undefined`

:::note{title=描述}
动画时长

:::

#### easing

**Type:** `string | undefined`

:::note{title=描述}
动画 easing 函数

:::


## crosshairRect

**Type:** `CrosshairRect | undefined`

:::note{title=描述}
水平提示框配置, 用于定义图表的水平提示框, 包括水平提示框的颜色、标签样式等.



十字准星线矩形区域配置，是一种用于在图表中显示十字准星线矩形区域的配置类型

:::


### visible

**Type:** `boolean | undefined`

:::note{title=描述}
是否显示十字准星线矩形区域

:::

### rectColor

**Type:** `string | undefined`

:::note{title=描述}
十字准星线矩形区域颜色

:::

### labelColor

**Type:** `string | undefined`

:::note{title=描述}
十字准星线矩形区域标签颜色

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title=描述}
是否显示十字准星线矩形区域标签

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
十字准星线矩形区域标签背景颜色

:::


## stackCornerRadius

**Type:** `number | number[] | undefined`

:::note{title=描述}
条形图 堆叠圆角

:::


## barMaxWidth

**Type:** `string | number | undefined`

:::note{title=描述}
矩形的最大高度，可以是像素值或者百分比字符串

:::


## barGapInGroup

**Type:** `string | number | undefined`

:::note{title=描述}
同一分类下，矩形之间的距离，可以是像素值或者百分比字符串

:::


## sort

**Type:** `Sort | undefined`

:::note{title=描述}
Y轴排序配置, 支持根据维度或指标排序, 以及自定义排序顺序



类目轴排序配置, 支持根据维度或指标排序, 以及自定义排序顺序

:::

**示例**
sort: {
  orderBy: 'profit',
  order: 'asc',
}
sort: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
或
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=描述}
排序顺序, 可选值为 'asc' 或 'desc'

:::

**示例**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=描述}
排序依赖的字段, 可以是维度id或指标id

:::

**示例**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=描述}
自定义排序顺序, 该顺序将直接应用至类目轴

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title=描述}
图例排序配置, 支持根据维度或指标排序, 以及自定义排序顺序



图例排序配置, 支持根据维度或指标排序, 以及自定义排序顺序; 排序数组遵循从左到右或从上到下的顺序

:::

**示例**
sortLegend: {
  orderBy: 'profit',
  order: 'asc',
}
sortLegend: {
  customOrder:['2019', '2020', '2021']
}

\- order:'asc'
\- orderBy:'date'
或
\- customOrder:['2019', '2020', '2021']




### order

**Type:** `"asc" | "desc" | undefined`

:::note{title=描述}
排序顺序, 可选值为 'asc' 或 'desc'

:::

**示例**
order:'asc'



### orderBy

**Type:** `string | undefined`

:::note{title=描述}
排序依赖的字段, 可以是维度id或指标id

:::

**示例**
\- orderBy:'date'
\- orderBy:'profit'



### customOrder

**Type:** `string[] | undefined`

:::note{title=描述}
自定义排序顺序, 该顺序将直接应用至图例, 升序从左到右或从上到下, 降序从右到左或从下到上

:::


## theme

**Type:** `Theme | undefined`

:::note{title=描述}
图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置, 内置light与dark两种主题, 用户可以通过Builder自定义主题



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


## barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

:::note{title=描述}
矩形图元样式, 条形图样式配置, 用于定义图表的条形图样式, 包括条形图的颜色, 边框, 圆角等.

支持全局样式或条件样式配置

数据筛选器

若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力

若未配置selector, 则样式全局生效.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
数据选择器



若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力

若未配置selector, 则样式全局生效.

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




#### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id

:::

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

**Type:** `ChartDynamicFilter | undefined`

:::note{title=描述}
动态筛选器（AI生成代码执行）



通过 AI 生成的 JavaScript 代码实现复杂数据筛选逻辑

适用于 Top N、统计分析、复杂条件等静态 selector 难以表达的场景



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

:::note{title=描述}
用户的筛选需求描述（自然语言）

:::

**示例**
"高亮销售额大于1000的柱子"

"高亮每个区域中利润率最高的柱子"



#### code

**Type:** `string`

:::note{title=描述}
AI 生成的 JavaScript 筛选代码



\- 只能使用内置工具函数（通过 _ 或 R 访问）

\- 输入参数: data (数组)，每个 item 包含 __row_index 字段表示行号

\- 必须返回行索引与字段组合的数组: Array<{ __row_index: number, field: string }>

\- __row_index 表示原始数据项的行号，field 表示需要高亮的字段

\- 禁止使用: eval, Function, 异步操作, DOM API, 网络请求

:::

**示例**
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

### barVisible

**Type:** `boolean | undefined`

:::note{title=描述}
柱图元(矩形图元)是否可见

:::

### barColor

**Type:** `string | undefined`

:::note{title=描述}
柱图元(矩形图元)颜色

:::

### barColorOpacity

**Type:** `number | undefined`

:::note{title=描述}
柱图元(矩形图元)颜色透明度

:::

### barBorderColor

**Type:** `string | undefined`

:::note{title=描述}
柱图元(矩形图元)边框颜色

:::

### barBorderWidth

**Type:** `number | undefined`

:::note{title=描述}
柱图元(矩形图元)边框宽度

:::

### barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=描述}
柱图元(矩形图元)边框样式

:::

**示例**
solid

dashed

dotted



### barBorderOpacity

**Type:** `number | undefined`

:::note{title=描述}
柱图元(矩形图元)圆角



柱图元(矩形图元)描边透明度

:::

**示例**
4

[0, 0, 10, 10]



### barRadius

**Type:** `number | number[] | undefined`


## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=描述}
标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
标注点的选择器, 用于选择数据点.

:::


#### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id

:::

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

### measureId

**Type:** `string | undefined`

:::note{title=描述}
指定标注点所属的指标 id。在多 measure 场景下，可与 selector 组合以唯一定位目标指标对应的标注点。

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title=描述}
动态筛选器（AI生成代码执行）



通过 AI 生成的 JavaScript 代码实现复杂数据筛选逻辑

适用于 Top N、统计分析、复杂条件等静态 selector 难以表达的场景



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

:::note{title=描述}
用户的筛选需求描述（自然语言）

:::

**示例**
"高亮销售额大于1000的柱子"

"高亮每个区域中利润率最高的柱子"



#### code

**Type:** `string`

:::note{title=描述}
AI 生成的 JavaScript 筛选代码



\- 只能使用内置工具函数（通过 _ 或 R 访问）

\- 输入参数: data (数组)，每个 item 包含 __row_index 字段表示行号

\- 必须返回行索引与字段组合的数组: Array<{ __row_index: number, field: string }>

\- __row_index 表示原始数据项的行号，field 表示需要高亮的字段

\- 禁止使用: eval, Function, 异步操作, DOM API, 网络请求

:::

**示例**
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

### text

**Type:** `string | string[] | undefined`

:::note{title=描述}
标注的文本

:::

**示例**
'标注文本'



### textColor

**Type:** `string | undefined`

:::note{title=描述}
文本颜色

:::

**示例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=描述}
文本字体大小

:::

**示例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=描述}
文本字体重量

:::

**示例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=描述}
文本对齐方式, 一般情况下, 设置为right, 文本显示在标注点左侧, 确保显示在图表的可见区域

建议设置为'right', 这样可以确保文本在标注点的左侧

right: 文本在标注点的左侧, 文本的右侧边缘对齐标注点

left: 文本在标注点的右侧, 文本的左侧边缘对齐标注点

center: 文本在标注点的中心, 文本的中心对齐标注点

:::

**示例**
'right' 文本在标注点的左侧



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=描述}
文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注点底部, 确保显示在图表的可见区域

建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域

top: 文本在标注点的底部, 文本的顶部边缘对齐标注点

middle: 文本在标注点的中心, 文本的中心对齐标注点

bottom: 文本在标注点的顶部, 文本的底部边缘对齐标注点

:::

**示例**
'top' 文本在标注点的底部



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=描述}
背景可见

:::

**示例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
背景颜色

:::

**示例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=描述}
背景边框颜色

:::

**示例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=描述}
背景边框宽度

:::

**示例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=描述}
背景边框圆角

:::

**示例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=描述}
背景内边距

:::

**示例**
4



### offsetY

**Type:** `number | undefined`

:::note{title=描述}
标注点整体在Y方向的偏移像素距离, 当标注点在图表上方(数值较大时)时, 建议设置为正值, 标注点在图表下方(数值较小时)时, 建议设置为负值.

负值则整体向上偏移, 例如设置为\-10, 则整个标注点组件包括文本、文本背景, 一起向上偏移10像素

正值则整体向下偏移, 例如设置为10, 则整个标注点组件包括文本、文本背景, 一起向下偏移10像素

:::

**示例**
offsetY: 5, 标注点整体向下偏移5像素



### offsetX

**Type:** `number | undefined`

:::note{title=描述}
标注点整体在X方向的偏移像素距离, 当标注点在图表左侧(类目轴起点)时, 建议设置为正值, 标注点在图表右侧(类目轴终点)时, 建议设置为负值.

负值则整体向左偏移, 例如设置为\-10, 则整个标注点组件包括文本、文本背景, 一起向左偏移10像素

正值则整体向右偏移, 例如设置为10, 则整个标注点组件包括文本、文本背景, 一起向右偏移10像素

:::

**示例**
offsetX: 5, 标注点整体向右偏移5像素




## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=描述}
数值标注线(包括均值线、最大值线、最小值线等)，竖直方向展示，能够设置标注线的位置, 样式等，如需绘制均值线等数值对应的标注线请使用该配置

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=描述}
固定的x值, 用于标注垂直线, 类目轴在x方向, 则可输入维值, 数值轴在x方向, 则可输入具体的数值

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=描述}
动态筛选器（AI生成代码执行）



通过 AI 生成的 JavaScript 代码动态计算标注线的值

适用于需要根据数据动态确定标注线位置，如平均值、最大值、分位数，业务线等



仅支持浏览器环境（需要 Web Worker）

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=描述}
用户的筛选需求描述（自然语言）

:::

**示例**
"获取销售额最高的值作为标注线参考"

"计算平均销售额用于标注线"



#### code

**Type:** `string`

:::note{title=描述}
AI 生成的 JavaScript 筛选代码



\- 只能使用内置工具函数（通过 _ 或 R 访问）

\- 输入参数: data (数组)

\- 必须返回单个数值或字符串: number | string

\- 适用场景：标注线（水平线、垂直线）需要的动态数值

\- 禁止使用: eval, Function, 异步操作, DOM API, 网络请求

:::

**示例**
获取销售额最大值作为标注线值
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

计算平均值用于标注线
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

获取分位数作为标注线
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

根据条件计算目标值
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=描述}
代码执行失败或环境不支持时的降级方案

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=描述}
动态筛选执行结果（运行期字段）



prepare() 阶段写入，运行时只读

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=描述}
标注的文本

:::

**示例**
'标注文本'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=描述}
文本位置, 标注线的标签位置（标签相对线的相对位置）。

:::

**示例**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=描述}
文本颜色

:::

**示例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=描述}
文本字体大小

:::

**示例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=描述}
文本字体重量

:::

**示例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=描述}
文本对齐方式, 一般情况下, 无需设置

建议设置为'right', 这样可以确保文本在标注线的左侧

right: 文本在参考线的左侧, 文本的右侧边缘对齐(垂直)标注线

left: 文本在参考线的右侧, 文本的左侧边缘对齐(垂直)标注线

center: 文本在参考线的中心, 文本的中心对齐(垂直)标注线

:::

**示例**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=描述}
文本垂直对齐方式, 一般情况下, 无需设置

建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域

top: 文本在参考线的底部, 文本的顶部边缘对齐(垂直)标注线的终点

middle: 文本在参考线的中心, 文本的中心对齐(垂直)标注线的终点

bottom: 文本在参考线的顶部, 文本的底部边缘对齐(垂直)标注线的终点

:::

**示例**
'top'



### lineVisible

**Type:** `boolean | undefined`

:::note{title=描述}
线可见

:::

**示例**
true



### lineColor

**Type:** `string | undefined`

:::note{title=描述}
线颜色

:::

**示例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
线宽度

:::

**示例**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=描述}
线样式

:::

**示例**
'solid'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=描述}
背景可见

:::

**示例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
背景颜色

:::

**示例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=描述}
背景边框颜色

:::

**示例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=描述}
背景边框宽度

:::

**示例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=描述}
背景边框圆角

:::

**示例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=描述}
背景内边距

:::

**示例**
4




## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=描述}
维度值标注线，水平展示，能够设置标注线的位置, 样式等

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=描述}
固定的y值, 用于标注水平线, 类目轴在y方向, 则可输入维值, 数值轴在y方向, 则可输入具体的数值

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title=描述}
动态筛选器（AI生成代码执行）



通过 AI 生成的 JavaScript 代码动态计算标注线的值

适用于需要根据数据动态确定标注线位置，如平均值、最大值、分位数，业务线等



仅支持浏览器环境（需要 Web Worker）

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title=描述}
用户的筛选需求描述（自然语言）

:::

**示例**
"获取销售额最高的值作为标注线参考"

"计算平均销售额用于标注线"



#### code

**Type:** `string`

:::note{title=描述}
AI 生成的 JavaScript 筛选代码



\- 只能使用内置工具函数（通过 _ 或 R 访问）

\- 输入参数: data (数组)

\- 必须返回单个数值或字符串: number | string

\- 适用场景：标注线（水平线、垂直线）需要的动态数值

\- 禁止使用: eval, Function, 异步操作, DOM API, 网络请求

:::

**示例**
获取销售额最大值作为标注线值
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

计算平均值用于标注线
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

获取分位数作为标注线
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

根据条件计算目标值
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



#### fallback

**Type:** `string | number | undefined`

:::note{title=描述}
代码执行失败或环境不支持时的降级方案

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title=描述}
动态筛选执行结果（运行期字段）



prepare() 阶段写入，运行时只读

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title=描述}
标注的文本

:::

**示例**
'标注文本'



### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=描述}
文本位置



标注线的标签位置（标签相对线的相对位置）。

:::

**示例**
'outsideEnd'



### textColor

**Type:** `string | undefined`

:::note{title=描述}
文本颜色

:::

**示例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=描述}
文本字体大小

:::

**示例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=描述}
文本字体重量

:::

**示例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=描述}
文本对齐方式, 一般情况下, 无需设置

建议设置为'right', 这样可以确保文本在标注线的左侧

right: 文本在参考线的左侧, 文本的右侧边缘对齐(水平)标注线的终点

left: 文本在参考线的右侧, 文本的左侧边缘对齐(水平)标注线的终点

center: 文本在参考线的中心, 文本的中心对齐(水平)标注线的终点

:::

**示例**
'right'



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=描述}
文本垂直对齐方式, 一般情况下, 无需设置

建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域

top: 文本在参考线的底部, 文本的顶部边缘对齐(水平)标注线

middle: 文本在参考线的中心, 文本的中心对齐(水平)标注线

bottom: 文本在参考线的顶部, 文本的底部边缘对齐(水平)标注线

:::

**示例**
'top'



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=描述}
背景可见

:::

**示例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
背景颜色

:::

**示例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=描述}
背景边框颜色

:::

**示例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=描述}
背景边框宽度



背景边框宽度

:::

**示例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=描述}
背景边框圆角

:::

**示例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=描述}
背景内边距

:::

**示例**
4



### lineVisible

**Type:** `boolean | undefined`

:::note{title=描述}
线可见



线可见

:::

**示例**
true



### lineColor

**Type:** `string | undefined`

:::note{title=描述}
线颜色

:::

**示例**
'red'



### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
线宽度

:::

**示例**
2



### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=描述}
线样式

:::

**示例**
'solid'



### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title=描述}
是否开启将主线分隔成两段的功能

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title=描述}
大于标注值的部分，对应的主色

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title=描述}
小于标注值的部分，对应的主色

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=描述}
标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title=描述}
依赖选择的数据, 进行数据标记.

:::


#### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id

:::

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

### text

**Type:** `string | string[] | undefined`

:::note{title=描述}
标注的文本

:::

**示例**
'标注文本'



### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=描述}
文本位置

:::

**示例**
'top'



### textColor

**Type:** `string | undefined`

:::note{title=描述}
文本颜色

:::

**示例**
'red'



### textFontSize

**Type:** `number | undefined`

:::note{title=描述}
文本字体大小

:::

**示例**
12



### textFontWeight

**Type:** `number | undefined`

:::note{title=描述}
文本字体重量

:::

**示例**
400



### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=描述}
文本对齐方式, 一般情况下, 设置为right, 文本显示在标注区域中间, 确保显示在图表的可见区域

建议设置为'center', 这样可以确保文本在标注区域的中间

right: 文本在标注区域的左侧, 文本的右侧边缘对齐标注区域

left: 文本在标注区域的右侧, 文本的左侧边缘对齐标注区域

center: 文本在标注区域的中心, 文本的中心对齐标注区域

:::

**示例**
'center' 文本在标注区域的中间



### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=描述}
文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注区域底部, 确保显示在图表的可见区域

建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域

top: 文本在标注区域的底部, 文本的顶部边缘对齐标注区域

middle: 文本在标注区域的中心, 文本的中心对齐标注区域

bottom: 文本在标注区域的顶部, 文本的底部边缘对齐标注区域

:::

**示例**
'top' 文本在标注区域的底部



### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=描述}
背景可见

:::

**示例**
true



### textBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
背景颜色

:::

**示例**
'red'



### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=描述}
背景边框颜色



背景边框颜色

:::

**示例**
'red'



### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=描述}
背景边框宽度

:::

**示例**
2



### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=描述}
背景边框圆角



背景边框圆角

:::

**示例**
4



### textBackgroundPadding

**Type:** `number | undefined`

:::note{title=描述}
背景内边距

:::

**示例**
4



### areaColor

**Type:** `string | undefined`

:::note{title=描述}
标注区域区域颜色

:::

**示例**
'red'



### areaColorOpacity

**Type:** `number | undefined`

:::note{title=描述}
标注区域区域颜色透明度

:::

**示例**
0.5



### areaBorderColor

**Type:** `string | undefined`

:::note{title=描述}
标注区域区域边框颜色

:::

**示例**
'red'



### areaBorderWidth

**Type:** `number | undefined`

:::note{title=描述}
标注区域区域边框宽度

:::

**示例**
2



### areaBorderRadius

**Type:** `number | undefined`

:::note{title=描述}
标注区域区域边框圆角

:::

**示例**
4



### areaLineDash

**Type:** `number[] | undefined`

:::note{title=描述}
标注区域区域边框的线型

:::

**示例**
[2, 2]



### outerPadding

**Type:** `number | undefined`

:::note{title=描述}
标注区域区域的边距

:::

**示例**
0




## annotationDifferenceLine

**Type:** `AnnotationDifferenceLine | AnnotationDifferenceLine[] | undefined`

:::note{title=描述}
差异标注线配置，用于绑定两个数据锚点并展示绝对差值或百分比差值。

:::


### start

**Type:** `DifferenceAnchor`

:::note{title=描述}
差异标注线的起始锚点。



差异标注锚点配置，用于选择起始点或终止点绑定的数据。

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=描述}
锚点选择器，必须最终定位到一个逻辑锚点。

:::

**示例**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




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

### end

**Type:** `DifferenceAnchor`

:::note{title=描述}
差异标注线的终止锚点。



差异标注锚点配置，用于选择起始点或终止点绑定的数据。

:::


#### selector

**Type:** `DifferenceSelector | DifferenceSelector[]`

:::note{title=描述}
锚点选择器，必须最终定位到一个逻辑锚点。

:::

**示例**
{ year: '1930', type: 'Autocracies' }

[{ field: 'year', operator: 'in', value: ['1930'] }, { field: 'type', operator: 'in', value: ['Autocracies'] }]




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

### differenceType

**Type:** `"percent" | "absolute" | undefined`

:::note{title=描述}
差异值类型。

\- absolute: 显示绝对差值，计算方式为 end \- start

\- percent: 显示百分比差值，计算方式为 (end \- start) / start

:::

### textFontSize

**Type:** `number | undefined`

:::note{title=描述}
文本字体大小。

:::

### textColor

**Type:** `string | undefined`

:::note{title=描述}
文本颜色。

:::

### textBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
文本背景色。

:::

### lineColor

**Type:** `string | undefined`

:::note{title=描述}
线条颜色。

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=描述}
线条样式。

:::


## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title=描述}
当图表开启透视功能或者指标组合的是否，是否开启维度联动功能

当hover 到某个维度值时，联动高亮其他图表中相同维度值的数据



透视图表维度联动配置

:::


### enable

**Type:** `false | true`

:::note{title=描述}
是否开启透视图表维度联动

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title=描述}
是否显示所有维度对应子图表的Tooltip提示信息

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title=描述}
是否显示crosshair 对应的标签

:::


## locale

**Type:** `Locale | undefined`

:::note{title=描述}
图表语言配置, 支持'zh\-CN'与'en\-US'两种语言, 另外可以调用 intl.setLocale('zh\-CN') 方法设置语言

:::

