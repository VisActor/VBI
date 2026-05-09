# Documentation

:::info
Writing the `TypeScript` type means writing the configuration item document indirectly.
:::

Documents for all chart types of VSeed are in the [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType) directory

## Automatically build documentation

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
Please do not modify the document contents directly, as they may be overwritten at any time.

`build:docs` is completed in a few seconds, so no incremental updates are done, each build of the document deletes all old documents and generates new documents.

:::