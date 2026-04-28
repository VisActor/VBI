# chart

This page showcases the chart builder examples.

## ChartType

| Example                                                                                                     | Description                                                                  | Label |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----- |
| [area-by-order-date](/VBI/en-US/vbi/examples/chart/chartType.md#area-by-order-date)                         | Area Chart - Sales trend by date                                             | -     |
| [bar-by-product-type](/VBI/en-US/vbi/examples/chart/chartType.md#bar-by-product-type)                       | Bar Chart - Sales by product type                                            | -     |
| [chart-type-switching](/VBI/en-US/vbi/examples/chart/chartType.md#chart-type-switching)                     | Switch between line and bar chart types                                      | -     |
| [column-by-area](/VBI/en-US/vbi/examples/chart/chartType.md#column-by-area)                                 | Column Chart - Sales by region                                               | -     |
| [donut-by-customer-type](/VBI/en-US/vbi/examples/chart/chartType.md#donut-by-customer-type)                 | Donut Chart - Sales share by customer type                                   | -     |
| [line-by-province](/VBI/en-US/vbi/examples/chart/chartType.md#line-by-province)                             | Line Chart - Sales trend by province                                         | -     |
| [line-chart](/VBI/en-US/vbi/examples/chart/chartType.md#line-chart)                                         | Line Chart - Sales trend by province                                         | -     |
| [pie-by-area](/VBI/en-US/vbi/examples/chart/chartType.md#pie-by-area)                                       | Pie Chart - Sales share by region                                            | -     |
| [pie-chart-measure-encoding](/VBI/en-US/vbi/examples/chart/chartType.md#pie-chart-measure-encoding)         | Pie Chart Measure Encoding - Test measure-encoding.ts Pie chart type         | -     |
| [rose-by-city](/VBI/en-US/vbi/examples/chart/chartType.md#rose-by-city)                                     | Rose Chart - Sales by city                                                   | -     |
| [scatter-chart-measure-encoding](/VBI/en-US/vbi/examples/chart/chartType.md#scatter-chart-measure-encoding) | Scatter Chart Measure Encoding - Test measure-encoding.ts Scatter chart type | -     |
| [scatter-sales-profit](/VBI/en-US/vbi/examples/chart/chartType.md#scatter-sales-profit)                     | Scatter Chart - Relationship between Sales and Profit                        | -     |

## Dimensions

| Example                                                                                                          | Description                                                                   | Label |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----- |
| [add-date-dimension-year](/VBI/en-US/vbi/examples/chart/dimensions.md#add-date-dimension-year)                   | Add date dimension with yearly aggregation                                    | -     |
| [add-dimension](/VBI/en-US/vbi/examples/chart/dimensions.md#add-dimension)                                       | Add dimension                                                                 | -     |
| [add-multiple-dimensions](/VBI/en-US/vbi/examples/chart/dimensions.md#add-multiple-dimensions)                   | Add multiple dimensions (chained calls)                                       | -     |
| [mixed-date-and-normal-dimensions](/VBI/en-US/vbi/examples/chart/dimensions.md#mixed-date-and-normal-dimensions) | Mixed grouping with regular dimension and quarterly-aggregated date dimension | -     |
| [remove-dimension](/VBI/en-US/vbi/examples/chart/dimensions.md#remove-dimension)                                 | Remove dimension                                                              | -     |
| [update-date-dimension-month](/VBI/en-US/vbi/examples/chart/dimensions.md#update-date-dimension-month)           | Update existing date dimension to monthly aggregation                         | -     |
| [update-dimension](/VBI/en-US/vbi/examples/chart/dimensions.md#update-dimension)                                 | Update dimension                                                              | -     |

## HavingFilter

| Example                                                                                                                                  | Description                                                                                                                                                                        | Label |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| [add-having-filter](/VBI/en-US/vbi/examples/chart/havingFilter.md#add-having-filter)                                                     | Filter high-performing regions with sales over 1M after grouping by region                                                                                                         | -     |
| [add-multiple-having-filter](/VBI/en-US/vbi/examples/chart/havingFilter.md#add-multiple-having-filter)                                   | Chain multiple Having conditions to filter regions with high sales and high profit                                                                                                 | -     |
| [clear-having-filter](/VBI/en-US/vbi/examples/chart/havingFilter.md#clear-having-filter)                                                 | Clear all Having filter conditions to display full grouped aggregation results                                                                                                     | -     |
| [having-array-value-with-in-operator](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-array-value-with-in-operator)                 | Having filter with array value that triggers 'in' operator conversion                                                                                                              | -     |
| [having-array-value-with-not-in-operator](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-array-value-with-not-in-operator)         | Having filter with array value that triggers 'not in' operator conversion                                                                                                          | -     |
| [having-clear-and-rebuild](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-clear-and-rebuild)                                       | Clear existing having conditions and rebuild new group filters, simulating user resetting the filter panel and reconfiguring                                                       | -     |
| [having-deeply-nested-groups](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-deeply-nested-groups)                                 | Three-level nested grouping: OR(AND(Sales > 500K, Profit > 50K), AND(Quantity > 100, Avg Discount \< 0.3)), simulating complex business filtering                                  | -     |
| [having-empty-dsl-compose-target](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-empty-dsl-compose-target)                         | Starting from an empty DSL, use builder to assemble where/having/measures/dimensions, including having conditions combining sum and countDistinct aggregations                     | -     |
| [having-field-not-in-measures-and-dimensions](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-field-not-in-measures-and-dimensions) | Initialize empty DSL, only add dimension area and measure sales via builder, and use the profit field (SUM(profit) > 100000) in having that does not appear in measures/dimensions | -     |
| [having-find-and-update](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-find-and-update)                                           | Add having conditions first, then use find to locate and dynamically update thresholds and operators, simulating interactive user filter adjustment                                | -     |
| [having-group-add-to-existing](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-group-add-to-existing)                               | Append new conditions to an existing having group, simulating a user progressively refining filter rules                                                                           | -     |
| [having-group-remove-condition](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-group-remove-condition)                             | Remove a specific condition from an existing having group, simulating a user canceling a filter                                                                                    | -     |
| [having-mix-filters-and-groups](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-mix-filters-and-groups)                             | Mix standalone filter conditions with OR groups: Sales > 500K AND (Profit > 100K OR Quantity >= 30)                                                                                | -     |
| [having-multi-dimension-aggregate](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-multi-dimension-aggregate)                       | Group by two dimensions (category and region), filter combinations where avg discount \< 20% and total sales > 100K, analyzing high-value low-discount business                    | -     |
| [having-nested-groups](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-nested-groups)                                               | Nested grouping: AND(Sales > 1M, OR(Profit > 200K, Quantity >= 50))                                                                                                                | -     |
| [having-or-group](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-or-group)                                                         | Use OR grouping to filter regions with high sales or high profit                                                                                                                   | -     |
| [having-scatter-profit-analysis](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-scatter-profit-analysis)                           | Scatter chart analysis: Group by category to filter categories with high profit rate and transaction count > 20, identifying high-quality business                                 | -     |
| [having-update-group-operator](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-update-group-operator)                               | Update the logical operator of an existing Having group from AND to OR                                                                                                             | -     |
| [having-with-where-combined](/VBI/en-US/vbi/examples/chart/havingFilter.md#having-with-where-combined)                                   | Combined where and having filtering: first filter office products category with where, then filter provinces with sales > 50K or profit > 10K with having                          | -     |
| [remove-having-filter](/VBI/en-US/vbi/examples/chart/havingFilter.md#remove-having-filter)                                               | Remove redundant Having filter conditions, keeping only the profit filter                                                                                                          | -     |

## Locale

| Example                                                              | Description          | Label |
| -------------------------------------------------------------------- | -------------------- | ----- |
| [en-US-locale](/VBI/en-US/vbi/examples/chart/locale.md#en-US-locale) | English locale tests | -     |
| [zh-CN-locale](/VBI/en-US/vbi/examples/chart/locale.md#zh-CN-locale) | Chinese locale tests | -     |

## Measures

| Example                                                                                                              | Description                                                                                                                                                     | Label |
| -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| [add-measure](/VBI/en-US/vbi/examples/chart/measures.md#add-measure)                                                 | Add measure                                                                                                                                                     | -     |
| [add-measure-encoding](/VBI/en-US/vbi/examples/chart/measures.md#add-measure-encoding)                               | Add measure and set encoding                                                                                                                                    | -     |
| [measure-with-custom-and-auto-format](/VBI/en-US/vbi/examples/chart/measures.md#measure-with-custom-and-auto-format) | Measure formatting: Sales uses 10K (10,000) custom format (¥ prefix, 2 decimal places), Profit growth uses auto formatting, and Discount uses percentage format | -     |
| [remove-measure](/VBI/en-US/vbi/examples/chart/measures.md#remove-measure)                                           | Remove measure                                                                                                                                                  | -     |
| [update-measure](/VBI/en-US/vbi/examples/chart/measures.md#update-measure)                                           | Update measure                                                                                                                                                  | -     |

## Theme

| Example                                                           | Description        | Label |
| ----------------------------------------------------------------- | ------------------ | ----- |
| [dark-theme](/VBI/en-US/vbi/examples/chart/theme.md#dark-theme)   | Dark theme charts  | -     |
| [light-theme](/VBI/en-US/vbi/examples/chart/theme.md#light-theme) | Light theme charts | -     |

## UndoManager

| Example                                                             | Description     | Label |
| ------------------------------------------------------------------- | --------------- | ----- |
| [undo-redo](/VBI/en-US/vbi/examples/chart/undoManager.md#undo-redo) | Undo/Redo tests | -     |

## WhereFilter

| Example                                                                                                                                 | Description                                                                                                                                                         | Label |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| [between-sales-range-analysis](/VBI/en-US/vbi/examples/chart/whereFilter.md#between-sales-range-analysis)                               | Sales range analysis: Use 'between' to filter orders between 1000 and 10000, summarized by category profit.                                                         | -     |
| [clear-and-rebuild-filters](/VBI/en-US/vbi/examples/chart/whereFilter.md#clear-and-rebuild-filters)                                     | Clear and rebuild filters: Clear old simple filters and rebuild complex conditions with grouping.                                                                   | -     |
| [date-filter-period-and-range-combo](/VBI/en-US/vbi/examples/chart/whereFilter.md#date-filter-period-and-range-combo)                   | Date range combined filter: Use 'period' to filter 2024 Q1 data, while using 'range' to limit profit range, cross-analyzed by category and shipping mode            | -     |
| [date-filter-relative-with-nested-conditions](/VBI/en-US/vbi/examples/chart/whereFilter.md#date-filter-relative-with-nested-conditions) | Date filter and nested conditions combo: Filter high-value orders from Consumers or Corporate customers within the last 30 days, statistics by province             | -     |
| [deeply-nested-or-and-groups](/VBI/en-US/vbi/examples/chart/whereFilter.md#deeply-nested-or-and-groups)                                 | Multi-level nested grouping: High-value orders with Same Day shipping for Consumers or First Class shipping for Corporate customers, three levels of AND/OR nesting | -     |
| [high-discount-tech-profit-analysis](/VBI/en-US/vbi/examples/chart/whereFilter.md#high-discount-tech-profit-analysis)                   | High discount Technology product profit analysis: Filter technology category orders with discount > 0.5, comparing profit by region.                                | -     |
| [in-operator-multi-area-delivery](/VBI/en-US/vbi/examples/chart/whereFilter.md#in-operator-multi-area-delivery)                         | Multi-region shipping efficiency comparison: Use 'in' to filter East China, North China, and Central South regions, statistics by shipping mode.                    | -     |
| [nested-group-region-product-filter](/VBI/en-US/vbi/examples/chart/whereFilter.md#nested-group-region-product-filter)                   | Office Supplies or Furniture sales in East China: Use nested grouping, AND connecting region condition and OR category conditions.                                  | -     |
| [not-between-sales-range](/VBI/en-US/vbi/examples/chart/whereFilter.md#not-between-sales-range)                                         | Not between filter: exclude sales between 1000\~10000                                                                                                               | -     |
| [not-between-with-explicit-operators](/VBI/en-US/vbi/examples/chart/whereFilter.md#not-between-with-explicit-operators)                 | Not between filter with explicit leftOp/rightOp to test invert functions                                                                                            | -     |
| [office-supplies-sales-by-province](/VBI/en-US/vbi/examples/chart/whereFilter.md#office-supplies-sales-by-province)                     | Office Supplies sales ranking by province: Filter Office Supplies category, summarized by province sales.                                                           | -     |
| [or-group-product-category-comparison](/VBI/en-US/vbi/examples/chart/whereFilter.md#or-group-product-category-comparison)               | Office Supplies vs. Technology category comparison: Use OR grouping to filter two categories, comparing sales by region.                                            | -     |
| [remove-condition-from-group](/VBI/en-US/vbi/examples/chart/whereFilter.md#remove-condition-from-group)                                 | Remove condition from group: Pre-defined OR group with three categories, remove one via updateGroup.                                                                | -     |
| [remove-filter-by-index](/VBI/en-US/vbi/examples/chart/whereFilter.md#remove-filter-by-index)                                           | Remove filter by index: Remove the first category filter, keeping only the region condition.                                                                        | -     |
| [update-filter-switch-province](/VBI/en-US/vbi/examples/chart/whereFilter.md#update-filter-switch-province)                             | Animated filter modification: Update province filter from Zhejiang to Guangdong, observing sales changes.                                                           | -     |
| [update-group-or-to-and](/VBI/en-US/vbi/examples/chart/whereFilter.md#update-group-or-to-and)                                           | Modify group logic: Switch pre-defined OR category group to AND, narrowing the filter scope.                                                                        | -     |
| [where-filter-array-value-converts-to-in](/VBI/en-US/vbi/examples/chart/whereFilter.md#where-filter-array-value-converts-to-in)         | Where filter with array value using '=' operator should convert to 'in'                                                                                             | -     |
| [where-filter-array-value-converts-to-not-in](/VBI/en-US/vbi/examples/chart/whereFilter.md#where-filter-array-value-converts-to-not-in) | Where filter with array value using '!=' operator should convert to 'not in'                                                                                        | -     |
