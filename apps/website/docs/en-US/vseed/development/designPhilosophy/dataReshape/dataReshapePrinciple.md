# Data reshaping-principle

:::info data reshaping
VSeed proposes a general dimension reshaping method, aiming to further lower the threshold of data visualization
:::

Data reshaping refers to the process of converting data from one structured form to another. The core lies in changing the way data is organized (such as rows, columns, indexes, hierarchies) to adapt to different analysis or processing needs while maintaining the integrity of the data.


## Dimension reshaping
There are tools in Python and R languages that already support dimension reshaping.
1. Python Pandas provides `pivot` and `melt` for data reshaping
2. R tidyverse provides `pivot_longer` and `pivot_wider` for data reshaping


## Dimensionality raising and dimensionality reduction

Dimensionality promotion and dimensionality reduction are spiritually consistent with the ideas of category theory (objects, morphisms, and isomorphisms), but they do not strictly follow category theory in implementation.
Special emphasis:
1. When upgrading, non-existent "measure name" and "measure value" information will be created "out of thin air"
2. During dimensionality reduction, the "measure name" and "measure value" information existing in the data will be "removed"

Dimension upscaling can completely transform the data, but dimension column names will have null values, so it supports filling in additional information.
Dimensionality reduction will lose information content, so additional storage of transformation information is required to achieve true isomorphic transformation, otherwise the information will definitely be lost.

![commonDataReshape](/images/commonDataReshape.png)

## Grouping dimensionality enhancement and dimensionality reduction

Similar to ordinary dimensionality enhancement and dimensionality reduction, there are similar scenarios of information increase or information loss. In addition, due to the introduction of grouping, more empty data will be generated.
Meaning:
1. Measure grouping: Easily increase the dimension through grouping and quickly process detailed data
2. Multi-group query: Multiple pieces of detailed data can be easily obtained through multiple pieces of SQL. They can be merged into one piece of data by grouping and dimensionality reduction.

![groupedDataReshape](/images/groupedDataReshape.png)

## Derivation of rules

### Dimension Upgrade

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip
1. When multiple measures are upgraded, the number of measures becomes one. After one measure is upgraded, the measure is still 1.
2. Multi-dimensional dimension upgrading, if there is one more dimension, 0 dimensions will also be increased by 1
3. 0 dimensions and 1 measure, you can repeatedly increase the dimension to get any number of dimensions and 1 measure (so that one measure can also draw a histogram)

:::

### Dimensionality reduction

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip
1. Multi-measure dimensionality reduction, the dimension value and the measure will be Cartesian product to become a new measure
2. Multi-dimensional dimensionality reduction, multiple dimension values will be Cartesian product to become a new dimension

:::


## Example

#### 0 dimensions 1 measure
![0d1m](/images/0d1m.png)
#### 0 dimensions 3 measures
![0d3m](/images/0d3m.png)
#### 1 dimension 1 measure
![1d1m](/images/1d1m.png)
#### 1 dimension 2 measures
![1d2m](/images/1d2m.png)
#### 2 dimensions 1 measure
![2d1m](/images/2d1m.png)
#### 2 dimensions 2 measures
![2d2m](/images/2d2m.png)
