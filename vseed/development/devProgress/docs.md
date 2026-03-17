# 文档

:::info
编写 `Typescript` 类型即间接编写配置项文档,
:::

VSeed所有图表类型的文档, 都在 [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType) 目录下

## 自动构建文档

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```

:::warning
因请勿直接修改文档内容, 它们随时会被覆盖

`build:docs` 在几秒钟内即可完成, 因此并未做增量更新, 每次构建文档都会删除所有旧文档, 并生成新文档.

:::
