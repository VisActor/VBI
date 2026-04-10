# TidyData

:::info Significance
TidyData, through its core principle of "variables as columns, observations as rows," dramatically reduces the complexity of data cleaning — letting us focus on business problems rather than data format conversion.
:::

## Paper

Author: `Hadley Wickham`. The paper discusses a small module in data processing — data tidying — because tidy datasets are easier to manipulate, model, and visualize, and have a specific structure.

This paper is highly recommended. See: [Tidy Data](https://www.jstatsoft.org/article/view/v059i10)

## TidyData in VSeed

The `dataset` configuration in VSeed DSL uses the `TidyData` format.

Core characteristics:

1. **Each variable has a column**: Variable values are stored in separate columns, e.g., "age", "gender".
2. **Each observation has a row**: All variable values for one observation form a row, e.g., a person's age and gender.
3. **Each unit of observation has a table**: Different types of observation units (e.g., person, time, location) should be stored separately.

Therefore, the result of an `SQL` query can be passed directly into VSeed's `dataset` configuration — no additional data processing needed for quick analysis and visualization.
