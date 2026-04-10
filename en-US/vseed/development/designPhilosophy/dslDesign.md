# DSL Design

:::info Significance

VSeed is a declarative DSL

* DSL design is the art of expressing domain problems — it effectively simplifies complex issues.
* DSL allows those familiar with it to code as naturally as writing in their native language. Once you are familiar with VSeed, rendering charts feels as simple as writing plain English.
* `VChart` and `VTable` follow the same philosophy.

:::

:::tip

A `Declarative DSL` focuses on **"What"**. It describes the expected result or final state, without specifying the exact steps the computer should take to reach that state.

An `Imperative DSL` focuses on **"How"**. It provides a series of explicit, step-by-step instructions, telling the computer exactly how to reach the desired state.
:::

## VSeed Trade-offs

1. Domain Focus

Sacrificing some generality to focus on solving domain-specific problems. The core goal of VSeed is not to deeply satisfy all the requirements of a single chart type, but to focus on data transformation before the chart type is determined. Other concerns, such as themes, interactions, and animations, are left to the consumer.

2. Abstraction Level

`VSeed` provides a high level of abstraction, allowing users to focus on solving problems rather than worrying about low-level implementation details. This boosts development efficiency — for example, switching chart types only requires changing a single parameter, without worrying about the underlying mechanics.

3. Constraint is Advantage

`VSeed` emphasizes constraints: it accepts a `VSeed DSL` as input and outputs a `spec` for either `VTable` or `VChart`. This allows users to maintain fine-grained control over individual chart features — `VSeed` is not a black box.

Therefore, VSeed can be simply thought of as a `Spec Builder` that does not break the original capabilities of `VTable` or `VChart`. Any `VChart` or `VTable` user can quickly integrate `VSeed` into their existing platform.
