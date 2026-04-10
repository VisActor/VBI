# Documentation

:::info
Writing `TypeScript` types is indirectly writing the configuration options' documentation.
:::

The documentation for all VSeed chart types is located in the [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType) directory.

## Automatically Building Documentation

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```

:::warning
Please do not directly modify the documentation content, as it will be overwritten at any time.

`build:docs` completes in just a few seconds, so incremental updates are not implemented. Each documentation build will delete all old documentation and generate brand new documentation.

:::
