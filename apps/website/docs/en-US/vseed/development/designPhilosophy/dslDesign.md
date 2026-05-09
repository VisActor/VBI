# DSL Design

:::info meaning

VSeed is the declarative DSL

- DSL Design is the art of expressing domain problems and can effectively simplify complex problems.
- DSL makes coding as natural as writing your native language for those familiar with it. When you become familiar with VSeed, rendering charts is as easy as writing natural language.
- Same goes for `VChart`, `VTable`


:::

:::tip

`Declarative DSL` focuses on "What". Description what a desired result or final state should look like, without caring about the specific steps within the computer to get to that state.


`Imperative DSL` focuses on "How". Provide a series of clear, step-by-step instructions to tell the computer how to reach the target state step by step.
:::

## VSeed Trade-off

1. Focus

Sacrifice certain generality and focus on solving problems in specific fields. Therefore, the core goal of VSeed is not to deeply meet all the needs of a chart type, but to focus on data conversion before the chart type. The rest of the features, such as themes, interactions, animations, etc.

2. Abstraction Level

`VSeed` provides a higher level of abstraction, allowing users to focus on solving problems rather than paying attention to the underlying implementation details. This improves development efficiency. For example, to switch chart types, just change a parameter without having to pay attention to the details of how to switch.

3. Constraint is Advantage

`VSeed` emphasizes constraints, receives a `VSeed DSL`, and outputs a `VTable` or `VChart`'s `spec`. This allows users to more flexibly control the functions of a single chart. `VSeed` is not a black box.

Therefore, VSeed can be simply regarded as a `Spec Builder`, without destroying the original functions of `VTable` or `VChart`. Any `VChart` or `VTable` user can quickly access `VSeed` within the existing platform.