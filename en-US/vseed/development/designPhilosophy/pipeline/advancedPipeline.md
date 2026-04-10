# Advanced Pipeline

## Advanced pipeline

The `advanced pipeline` receives a VSeed DSL and outputs an advancedVSeed DSL.

`advancedVSeed` is a data structure designed based on the grammar of graphics. It is used to uniformly describe charts and tables, acting as a bridge between business requirements and the charting library.

`advancedVSeed` itself is fully serializable. Therefore, it can be constructed in a Node.js environment, transmitted via HTTP to the spec pipeline, and finally rendered as a chart on the frontend.
