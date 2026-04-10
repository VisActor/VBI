# Data Reshaping — Principles

:::info Data Reshaping
VSeed proposes a universal dimension reshaping method to further lower the barrier to data visualization.
:::

Data reshaping refers to the process of converting data from one structured form to another. The core is changing the organization of data (rows, columns, indices, hierarchies) to suit different analysis or processing needs while maintaining data integrity.

## Dimension Reshaping

Python and R languages already have tools that support dimension reshaping:

1. Python Pandas provides `pivot` and `melt` for data reshaping
2. R tidyverse provides `pivot_longer` and `pivot_wider` for data reshaping

## Dimension Increase (Upsampling) and Reduction

Dimension increase and reduction philosophically align with category theory (objects and morphisms, isomorphisms), but are not strictly implemented following category theory.

Special notes:

1. During dimension increase, "measure name" and "measure value" information is created "out of nothing"
2. During dimension reduction, "measure name" and "measure value" information that exists in the data is "removed"

Dimension increase can completely transform data, but dimension column names may have null values, so filling in additional information is supported.
Dimension reduction loses information content, so additional transformation information needs to be saved to achieve true isomorphic transformation — otherwise information will inevitably be lost.

![commonDataReshape](/images/commonDataReshape.png)

## Grouped Dimension Increase and Reduction

Similar to ordinary increase and reduction, with similar information addition or loss scenarios. Additionally, the introduction of grouping creates more empty data.

Significance:

1. **Measure grouping**: Easily handles detail data through grouped dimension increase
2. **Multi-group queries**: Multiple SQL queries can easily fetch multiple sets of detail data, and they can be merged into one dataset via grouped dimension reduction

![groupedDataReshape](/images/groupedDataReshape.png)

## Rule Derivation

### Dimension Increase

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip

1. Multiple measures — dimension increase turns measure count to 1. 1 measure after dimension increase is still 1.
2. Multiple dimensions — dimension increase adds one more dimension. Even 0 dimensions becomes 1.
3. 0 dimensions, 1 measure — can repeatedly apply dimension increase to get any number of dimensions and 1 measure (so 1 measure can also render a bar chart)
   :::

### Dimension Reduction

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip

1. Multiple measures — dimension reduction: measure values and measures form a Cartesian product, creating new measures
2. Multiple dimensions — dimension reduction: multiple dimension values form a Cartesian product, creating new dimensions
   :::

## Examples

#### 0 Dimensions, 1 Measure

![0d1m](/images/0d1m.png)

#### 0 Dimensions, 3 Measures

![0d3m](/images/0d3m.png)

#### 1 Dimension, 1 Measure

![1d1m](/images/1d1m.png)

#### 1 Dimension, 2 Measures

![1d2m](/images/1d2m.png)

#### 2 Dimensions, 1 Measure

![2d1m](/images/2d1m.png)

#### 2 Dimensions, 2 Measures

![2d2m](/images/2d2m.png)
