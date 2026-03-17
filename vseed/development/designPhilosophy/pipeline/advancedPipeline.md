# advanced Pipeline

## advanced pipeline

`advanced pipeline`接收一个vseed DSL, 输出一个advancedVSeed DSL

`advancedVSeed` 是一个基于图形语法而设计的数据结构, 用于统一描述图表、表格， 是业务和图表库的桥梁

`advancedVSeed` 本身也是完全可以序列化的, 因此可以在Node.js环境中构建, 经过http传输到spec pipeline, 到前端渲染图表
