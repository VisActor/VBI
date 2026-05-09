# ドキュメント

:::info
`Typescript` 型を書くことは、間接的に設定項目ドキュメントを書くことでもあります。
:::

VSeed のすべてのチャートタイプのドキュメントは、[`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType) ディレクトリ配下にあります。

## ドキュメントの自動構築

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
ドキュメント内容を直接変更しないでください。いつでも上書きされる可能性があります。

`build:docs` は数秒で完了するため、インクリメンタル更新は行いません。ドキュメントを構築するたびに、すべての旧ドキュメントを削除して新しいドキュメントを生成します。

:::
