# VSeed

:::info Summary
Bridges flexible business requirements from above, constrains data input formats from below, and orchestrates data uniformly — turning complexity into simplicity.
:::

## What is VSeed?

`VSeed` is a visualization tool for data analysis, focused on providing highly consistent data transformation capabilities across different chart types, along with a set of out-of-the-box features to meet lightweight data analysis needs.

## What are VSeed's Advantages?

> First, it's genuinely easy to use. Second, it's truly flexible. Third, VSeed contains many abstractions — you need to understand how VSeed performs data reshaping to use it perfectly.

1. The most intuitive way to switch chart types [Demo](/VBI/en-US/vseed/guide/intro/chartTypeSwitch.md)
2. The easiest-to-use pivot charts [Demo](/VBI/en-US/vseed/guide/intro/pivotAndCombine.md)
3. Powerful data reshaping — no manual data processing needed; any number of dimensions and measures, any chart type can be rendered [Demo](/VBI/en-US/vseed/guide/intro/dataReshape.md)
4. `VSeed` is fully serializable, enabling cross-platform transfer of `VSeed DSL` [Demo](/VBI/en-US/vseed/guide/intro/crossPlatformRender.md)
5. Out-of-the-box: number formatting, internationalization, light/dark themes, common styles, and more [Demo](/VBI/en-US/vseed/guide/intro/internationalization.md)
6. Excellent data processing performance — supports Node.js-side data processing with Web-side visualization [Demo](/VBI/en-US/vseed/guide/intro/separateBuild.md)

## What are VSeed's Limitations?

1. `VSeed` does not handle fine-grained customization of individual chart details — that's the responsibility of `VChart` and `VTable`. `VSeed` only provides the ability to flexibly modify `spec`; users can customize every chart detail according to their needs.
2. Only datasets conforming to the `tidyData` specification can be visualized by `VSeed`. Non-standard datasets are not accepted.
3. Built on top of the `VisActor` ecosystem — users need to understand the basic concepts of `VChart` and `VTable`.

## What are VSeed's Principles?

1. `VSeed` must support serialization.
2. `VSeed` should not provide excessive style configuration — it should focus on the relationship between charts and data.
3. `VSeed` should encapsulate common general-purpose features in the analytics domain, such as number formatting, internationalization, themes, common styles, and common functionality — providing them out of the box.
4. More flexible customization should be handled by users themselves. Therefore, VSeed only exposes a Spec Builder for building VChart and VTable specs.
   * Users can flexibly control VChart and VTable instances.
   * Users can modify VChart and VTable specs according to their needs.

## Why Design VSeed?

1. `VChart` can never seamlessly switch to `VTable` and vice versa — for such needs, a higher-level abstraction layer is inevitable.
2. Users of `VChart` and `VTable` must process data themselves — this work gets repeated hundreds or thousands of times unintentionally. `VSeed` aims to reduce data processing complexity in common scenarios and eliminate repetitive work.
3. Lowers the barrier to using `VChart` and `VTable` to some extent — for example, rendering `PivotChart` with `VTable`.
4. `VSeed` may ultimately evolve into a sub-module of `HeadlessBI`, used to build general-purpose data analysis tools.
