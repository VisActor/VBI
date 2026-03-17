# VSeed

:::info 一句话总结
向上承接业务灵活的需求, 向下约束数据接入形式, 将数据统一编排, 化繁为简.
:::

## VSeed是什么?

`VSeed` 是一款面向数据分析的可视化工具, 聚焦于在不同图表类型之间, 提供高一致性数据转换能力, 顺带提供部分开箱即用的功能, 用于满足轻量数据分析的需求.

## VSeed 的优势是什么

> 首先真的很好用, 其次确实很灵活, 最后是VSeed内有很多封装, 需要了解VSeed如何进行的数据重塑, 才能完美的应用.

1. 最直观的切换图表方式 [Demo](/VBI/vseed/guide/intro/chartTypeSwitch.md)
2. 最易用的透视图表 [Demo](/VBI/vseed/guide/intro/pivotAndCombine.md)
3. 强大的数据重塑能力, 无需进行任何数据处理, 任意数量维度、指标, 任意图表类型皆可出图 [Demo](/VBI/vseed/guide/intro/dataReshape.md)
4. `VSeed`是完全可序列化的, 因此支持跨平台传输`VSeed DSL` [Demo](/VBI/vseed/guide/intro/crossPlatformRender.md)
5. 开箱即用: 如数值格式、国际化、深浅色主题、常用样式等等 [Demo](/VBI/vseed/guide/intro/internationalization.md)
6. 优秀的数据处理性能, 支持在`Node`端处理数据, 在`Web`端进行可视化 [Demo](/VBI/vseed/guide/intro/separateBuild.md)

## VSeed 的劣势是什么

1. `VSeed` 不负责打磨单个图表的每一个细节, 这类需求将由`VChart`、`VTable`提供, `VSeed`仅提供灵活修改`spec`的能力, 用户可以根据自己的需求, 灵活修改图表的每一个细节.
2. 只有符合`tidyData`规范的数据集, 都可以被`VSeed`可视化. 不标准的数据集, 不被`VSeed`接受.
3. 基于`VisActor`生态建设, 使用者需了解`VChart` 与 `VTable`的基本概念

## VSeed 的原则是什么？

1. `VSeed` 必须支持序列化
2. `VSeed` 不需要提供过多的样式设置能力, 应聚焦于处理图表与数据之间的关系.
3. `VSeed` 应该封装分析领域常用的通用功能, 如数值格式、国际化、主题、常用样式、常用功能, 做到开箱即用.
4. 更灵活的定制需求, 应由用户二次定制, 因此VSeed仅对外提供一个Spec Builder, 用于构建VChart、VTable的spec.
   * 用户可以灵活控制VChart Instance与VTable Instance.
   * 用户可以根据自己的需求, 灵活修改VChart、VTable的spec.

## 为什么要设计 VSeed？

1. `VChart`永远无法无缝切换到`VTable`, 反之亦然, 面对这样的需求, 一个上层的抽象封装是必然会出现的.
2. 使用`VChart`、`VTable`的用户, 必须自行对数据进行处理, 这个工作会在无意间被重复成百上千次, `VSeed` 想降低常用场景的数据处理复杂度, 减少重复工作.
3. 一定程度上可以降低`VChart`与`VTable`的使用门槛, 例如使用`VTable`渲染`PivotChart`.
4. `VSeed` 最终可能会发展为`HeadlessBI`的一个子模块, 用于打造通用的数据分析工具.
