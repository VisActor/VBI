# VSeed

:::info One sentence summary
It accepts the flexible needs of business upwards, constrains the data access form downwards, organizes data in a unified way, and simplifies the complex.
:::

## What is VSeed?

`VSeed` is a visualization tool for data analysis. It focuses on providing highly consistent data conversion capabilities between different chart types. It also provides some out-of-the-box functions to meet the needs of lightweight data analysis.

## What are the advantages of VSeed

> First of all, it is really easy to use. Secondly, it is really flexible. Finally, there are many packages in VSeed. You need to understand how VSeed performs data reshaping in order to apply it perfectly.

1. The most intuitive way to switch charts [Demo](/vseed/guide/intro/chartTypeSwitch)
2. The most easy-to-use perspective chart [Demo](/vseed/guide/intro/pivotAndCombine)
3. Powerful data reshaping ability, without any data processing, any number of dimensions, measures, and any chart type can be output [Demo](/vseed/guide/intro/dataReshape)
4. `VSeed` is fully serializable, so it supports cross-platform transmission `VSeed DSL` [Demo](/vseed/guide/intro/crossPlatformRender)
5. Available out of the box: such as numerical format, internationalization, light and dark themes, common styles, etc. [Demo](/vseed/guide/intro/internationalization)
6. Excellent data processing performance, supports data processing on the `Node` side and visualization on the `Web` side [Demo](/vseed/guide/intro/separateBuild)

## What are the disadvantages of VSeed

1. `VSeed` is not responsible for polishing every detail of a single chart. Such needs will be provided by `VChart` and `VTable`. `VSeed` only provides the ability to flexibly modify `spec`. Users can flexibly modify every detail of the chart according to their own needs.
2. Only data sets that comply with the `tidyData` specification can be visualized by `VSeed`. Non-standard data sets are not accepted by `VSeed`.
3. Based on the ecological construction of `VisActor`, users need to understand the basic concepts of `VChart` and `VTable`

## What are the principles of VSeed?

1. `VSeed` must support serialization
2. `VSeed` does not need to provide too many style setting capabilities and should focus on processing the relationship between charts and data.
3. `VSeed` should encapsulate common functions commonly used in the analysis field, such as numerical formats, internationalization, themes, common styles, and common functions, so that they can be used out of the box.
4. More flexible customization needs should be customized by the user. Therefore, VSeed only provides one Spec Builder to the outside world, which is used to build the specs of VChart and VTable.
   - Users can flexibly control VChart Instance and VTable Instance.
   - Users can flexibly modify the specs of VChart and VTable according to their own needs.


## Why design VSeed?

1. `VChart` can never be seamlessly switched to `VTable`, and vice versa. Faced with such a demand, an upper-layer abstract encapsulation is bound to appear.
2. Users who use `VChart` and `VTable` must process the data by themselves. This work will be repeated hundreds or thousands of times unintentionally. `VSeed` wants to reduce the complexity of data processing in common scenarios and reduce repetitive work.
3. The threshold for using `VChart` and `VTable` can be lowered to a certain extent, for example, using `VTable` to render `PivotChart`.
4. `VSeed` may eventually develop into a sub-module of `HeadlessBI`, used to create general data analysis tools.