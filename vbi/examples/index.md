# VBI 示例

本页面展示 VBI 的各种使用示例。

## chartType

| 示例                                                         | 描述                                    | 标签 |
| ------------------------------------------------------------ | --------------------------------------- | ---- |
| [area-by-order-date](/VBI/vbi/examples/chartType.md#area-by-order-date)         | 面积图 - 按日期销售额趋势               | -    |
| [bar-by-product-type](/VBI/vbi/examples/chartType.md#bar-by-product-type)       | 柱状图 - 按产品类型销售额               | -    |
| [chart-type-switching](/VBI/vbi/examples/chartType.md#chart-type-switching)     | Switch between line and bar chart types | -    |
| [column-by-area](/VBI/vbi/examples/chartType.md#column-by-area)                 | 柱形图 - 按区域销售额                   | -    |
| [donut-by-customer-type](/VBI/vbi/examples/chartType.md#donut-by-customer-type) | 环形图 - 按客户类型销售占比             | -    |
| [line-by-province](/VBI/vbi/examples/chartType.md#line-by-province)             | 折线图 - 按省份销售额趋势               | -    |
| [line-chart](/VBI/vbi/examples/chartType.md#line-chart)                         | 折线图 - 按省份销售额趋势               | -    |
| [pie-by-area](/VBI/vbi/examples/chartType.md#pie-by-area)                       | 饼图 - 按区域销售占比                   | -    |
| [rose-by-city](/VBI/vbi/examples/chartType.md#rose-by-city)                     | 玫瑰图 - 按城市销售额                   | -    |
| [scatter-sales-profit](/VBI/vbi/examples/chartType.md#scatter-sales-profit)     | 散点图 - 销售额与利润关系               | -    |

## dimensions

| 示例                                                                              | 描述                                   | 标签 |
| --------------------------------------------------------------------------------- | -------------------------------------- | ---- |
| [add-date-dimension-year](/VBI/vbi/examples/dimensions.md#add-date-dimension-year)                   | 添加按年聚合的日期维度                 | -    |
| [add-dimension](/VBI/vbi/examples/dimensions.md#add-dimension)                                       | 添加维度                               | -    |
| [add-multiple-dimensions](/VBI/vbi/examples/dimensions.md#add-multiple-dimensions)                   | 添加多个维度（链式调用）               | -    |
| [mixed-date-and-normal-dimensions](/VBI/vbi/examples/dimensions.md#mixed-date-and-normal-dimensions) | 普通维度与按季度聚合的日期维度混合分组 | -    |
| [remove-dimension](/VBI/vbi/examples/dimensions.md#remove-dimension)                                 | 删除维度                               | -    |
| [update-date-dimension-month](/VBI/vbi/examples/dimensions.md#update-date-dimension-month)           | 将已有日期维度更新为按月聚合           | -    |
| [update-dimension](/VBI/vbi/examples/dimensions.md#update-dimension)                                 | 更新维度                               | -    |

## havingFilter

| 示例                                                                                                      | 描述                                                                                                                                 | 标签 |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| [add-having-filter](/VBI/vbi/examples/havingFilter.md#add-having-filter)                                                     | 按区域分组后筛选销售额超过百万的高业绩区域                                                                                           | -    |
| [add-multiple-having-filter](/VBI/vbi/examples/havingFilter.md#add-multiple-having-filter)                                   | 链式添加多个Having条件筛选高销售额且高利润的区域                                                                                     | -    |
| [clear-having-filter](/VBI/vbi/examples/havingFilter.md#clear-having-filter)                                                 | 清空所有Having过滤条件，展示全量分组聚合结果                                                                                         | -    |
| [having-clear-and-rebuild](/VBI/vbi/examples/havingFilter.md#having-clear-and-rebuild)                                       | 清除已有having条件后重新构建全新的分组筛选，模拟用户重置筛选面板后重新配置                                                           | -    |
| [having-deeply-nested-groups](/VBI/vbi/examples/havingFilter.md#having-deeply-nested-groups)                                 | 三层嵌套分组：OR(AND(销售额超50万, 利润超5万), AND(数量超100, 折扣均值低于0.3))，模拟复杂业务筛选                                    | -    |
| [having-empty-dsl-compose-target](/VBI/vbi/examples/havingFilter.md#having-empty-dsl-compose-target)                         | 从空DSL出发，通过builder拼装where/having/measures/dimensions，包含sum与countDistinct聚合的having条件组合                             | -    |
| [having-field-not-in-measures-and-dimensions](/VBI/vbi/examples/havingFilter.md#having-field-not-in-measures-and-dimensions) | 初始化空DSL，仅通过builder添加维度area与指标sales，并在having中使用未出现在measures/dimensions里的profit字段（SUM(profit) > 100000） | -    |
| [having-find-and-update](/VBI/vbi/examples/havingFilter.md#having-find-and-update)                                           | 先添加having条件，然后通过find查找并动态更新阈值和操作符，模拟用户交互式调整筛选条件                                                 | -    |
| [having-group-add-to-existing](/VBI/vbi/examples/havingFilter.md#having-group-add-to-existing)                               | 向已有的having分组中追加新条件，模拟用户逐步细化筛选规则                                                                             | -    |
| [having-group-remove-condition](/VBI/vbi/examples/havingFilter.md#having-group-remove-condition)                             | 从已有的having分组中移除特定条件，模拟用户取消某个筛选项                                                                             | -    |
| [having-mix-filters-and-groups](/VBI/vbi/examples/havingFilter.md#having-mix-filters-and-groups)                             | 混合使用独立过滤条件和OR分组：销售额超50万 AND (利润超10万 OR 数量不少于30)                                                          | -    |
| [having-multi-dimension-aggregate](/VBI/vbi/examples/havingFilter.md#having-multi-dimension-aggregate)                       | 按品类和区域双维度分组，筛选平均折扣低于20%且总销售额超过10万的组合，分析高价值低折扣业务                                            | -    |
| [having-nested-groups](/VBI/vbi/examples/havingFilter.md#having-nested-groups)                                               | 嵌套分组：AND(销售额超100万, OR(利润超20万, 数量不少于50))                                                                           | -    |
| [having-or-group](/VBI/vbi/examples/havingFilter.md#having-or-group)                                                         | 使用OR分组筛选高销售额或高利润的区域                                                                                                 | -    |
| [having-scatter-profit-analysis](/VBI/vbi/examples/havingFilter.md#having-scatter-profit-analysis)                           | 散点图分析：按品类分组筛选高利润率且交易量超20笔的品类，定位优质业务                                                                 | -    |
| [having-update-group-operator](/VBI/vbi/examples/havingFilter.md#having-update-group-operator)                               | 更新已有Having分组的逻辑操作符从AND改为OR                                                                                            | -    |
| [having-with-where-combined](/VBI/vbi/examples/havingFilter.md#having-with-where-combined)                                   | where与having联合筛选：先按where筛选办公用品品类，再按having筛选销售额超5万或利润超1万的省份                                         | -    |
| [remove-having-filter](/VBI/vbi/examples/havingFilter.md#remove-having-filter)                                               | 移除多余的Having过滤条件，只保留利润筛选                                                                                             | -    |

## locale

| 示例                                  | 描述             | 标签 |
| ------------------------------------- | ---------------- | ---- |
| [en-US-locale](/VBI/vbi/examples/locale.md#en-US-locale) | 英文 locale 测试 | -    |
| [zh-CN-locale](/VBI/vbi/examples/locale.md#zh-CN-locale) | 中文 locale 测试 | -    |

## measures

| 示例                                                    | 描述               | 标签 |
| ------------------------------------------------------- | ------------------ | ---- |
| [add-measure](/VBI/vbi/examples/measures.md#add-measure)                   | 添加度量           | -    |
| [add-measure-encoding](/VBI/vbi/examples/measures.md#add-measure-encoding) | 添加度量并设置编码 | -    |
| [remove-measure](/VBI/vbi/examples/measures.md#remove-measure)             | 删除度量           | -    |
| [update-measure](/VBI/vbi/examples/measures.md#update-measure)             | 更新度量           | -    |

## theme

| 示例                               | 描述         | 标签 |
| ---------------------------------- | ------------ | ---- |
| [dark-theme](/VBI/vbi/examples/theme.md#dark-theme)   | 深色主题图表 | -    |
| [light-theme](/VBI/vbi/examples/theme.md#light-theme) | 浅色主题图表 | -    |

## undoManager

| 示例                                 | 描述             | 标签 |
| ------------------------------------ | ---------------- | ---- |
| [undo-redo](/VBI/vbi/examples/undoManager.md#undo-redo) | 撤销重做功能测试 | -    |

## whereFilter

| 示例                                                                                       | 描述                                                                           | 标签 |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ---- |
| [between-sales-range-analysis](/VBI/vbi/examples/whereFilter.md#between-sales-range-analysis)                 | 销售额区间分析：使用 between 筛选单笔 1000~10000 元的订单，按品类汇总利润      | -    |
| [clear-and-rebuild-filters](/VBI/vbi/examples/whereFilter.md#clear-and-rebuild-filters)                       | 清空并重建过滤条件：清除旧的简单筛选，重建为包含分组的复杂条件                 | -    |
| [deeply-nested-or-and-groups](/VBI/vbi/examples/whereFilter.md#deeply-nested-or-and-groups)                   | 多层嵌套分组：消费者当日达或企业客户一级配送的高额订单，三层 AND/OR 嵌套       | -    |
| [high-discount-tech-profit-analysis](/VBI/vbi/examples/whereFilter.md#high-discount-tech-profit-analysis)     | 高折扣技术类产品利润分析：筛选技术品类且折扣大于0.5的订单，按区域对比利润      | -    |
| [in-operator-multi-area-delivery](/VBI/vbi/examples/whereFilter.md#in-operator-multi-area-delivery)           | 多区域配送效率对比：使用 in 筛选华东、华北、中南三大区域，按配送方式统计订单量 | -    |
| [nested-group-region-product-filter](/VBI/vbi/examples/whereFilter.md#nested-group-region-product-filter)     | 华东区域办公用品或家具销售额：使用嵌套分组，AND 连接区域条件与 OR 品类条件     | -    |
| [office-supplies-sales-by-province](/VBI/vbi/examples/whereFilter.md#office-supplies-sales-by-province)       | 各省份办公用品销售额排名：筛选办公用品品类，按省份汇总销售额                   | -    |
| [or-group-product-category-comparison](/VBI/vbi/examples/whereFilter.md#or-group-product-category-comparison) | 办公用品与技术类品类对比：使用 OR 分组筛选两个品类，按区域对比销售额           | -    |
| [remove-condition-from-group](/VBI/vbi/examples/whereFilter.md#remove-condition-from-group)                   | 从分组中移除条件：预设 OR 分组含三个品类，通过 updateGroup 移除其中一个        | -    |
| [remove-filter-by-index](/VBI/vbi/examples/whereFilter.md#remove-filter-by-index)                             | 按索引移除过滤条件：移除第一个品类筛选，只保留区域条件                         | -    |
| [update-filter-switch-province](/VBI/vbi/examples/whereFilter.md#update-filter-switch-province)               | 动态修改过滤条件：将省份筛选从浙江更新为广东，观察销售额变化                   | -    |
| [update-group-or-to-and](/VBI/vbi/examples/whereFilter.md#update-group-or-to-and)                             | 修改分组逻辑：将预设的 OR 品类分组切换为 AND，收窄筛选范围                     | -    |
