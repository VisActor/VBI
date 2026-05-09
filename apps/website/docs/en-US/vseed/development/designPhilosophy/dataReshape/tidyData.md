# TidyData

:::info meaning
TidyData greatly reduces the complexity of data cleaning through the core principle of "variables as columns and observations as rows", allowing us to focus more on business issues rather than data format conversion.
:::

## Paper

The author of the paper, `Hadley Wickham`, discusses a small module in data processing, data sorting, because tidy data sets are easy to operate, model and visualize, and have a specific structure.

This paper is highly recommended to be read, please check: [Tidy Data](https://www.jstatsoft.org/article/view/v059i10)


## Application of TidyData in VSeed

The `dataset` configuration in VSeed DSL is a data set in the `TidyData` format.

The core features are as follows:
1. One column per variable: Variable values are stored in separate columns, such as "age" and "gender".
2. One row for each observation: All variable values of each observation object form one row, such as a person's age and gender information.
3. One table for each observation unit: Different types of observation units (such as person, time, location) should be stored separately.


Therefore, the results of the `SQL` query can be directly passed into the `dataset` configuration of `VSeed`, and no additional data processing is required for rapid analysis and visualization.