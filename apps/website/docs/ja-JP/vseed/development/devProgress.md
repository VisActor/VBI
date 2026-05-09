# 開発フロー

## プロジェクトを起動

```bash title=プロジェクトを起動
pnpm install && pnpm dev
``` 

## 要件を理解してコードを書く

これは複雑なプロセスですが、通常は次の 3 点に集約されます。
1. 入力、つまり `vseed` を明確にする
2. 出力、つまり `vseed` を `advancedVSeed` に変換するのか、`advancedVSeed` を `spec` に変換するのかを明確にする
3. コードを書き、新しい入力が期待どおりの出力を持つことを確認する

:::tip
`playground(apps/website/docs/zh-CN/playground/index.mdx)` でデバッグと開発を行えます。

:::

## テストケースを新規作成

必要であれば、テストケースの新規作成を検討してください。

:::tip
カバレッジが低下する場合は、テストケースを新規作成する必要があります。

:::

`packages/vseed/tests/*` ディレクトリ配下に `testName.json` を新規作成し、vseed DSL を書き込みます。

実行します。

```bash title=テストケースを作成
pnpm build:canvasTest
```

## 単体テストを実行してカバレッジを更新

```bash title=単体テストを実行してカバレッジを更新
pnpm test:coverage
```

次の 3 点を確認します。
1. すべてのテストが通る
2. スナップショットの変更がすべて期待どおりである
3. カバレッジが低下していない

> カバレッジの変化は README.md に自動更新されます。

## 設定項目ドキュメントを更新

チャートタイプの Typescript 定義を変更した場合は、設定項目ドキュメントを更新してください。

:::tip
`packages/vseed/src/types/chartType` 配下のすべての型定義は、各チャートの設定項目ドキュメントに対応しています。変更がある場合は必ず更新してください。

:::

```bash title=設定項目ドキュメントを更新
pnpm build:docs
```

## リリースとコミット

```bash title=変更内容を記述
pnpm changeset
```

`pnpm changeset` コマンドを実行した後、プロンプトに従って次を選択します。
1. 変更が必要なパッケージを選択します。通常は vseed のみです。
2. セマンティックバージョニングに従って変更種別を選択します。ほとんどの場合は Enter キーを 2 回押して `major` と `minor` をスキップし、`patch` を選べば十分です。
2. 変更説明を入力します。例: `fix: chart render error caused by only one measure`

:::tip 推奨
1 つの機能または Bugfix は、1 つの `changeset` と 1 つの `commit` に対応させます。

1 つの `Pull Request` は 1 つの `issue` に対応させます。

1 つの `Pull Request` が複数の機能または複数の Bugfix に対応する場合は、複数の `changeset` と複数の `commit` に対応させます。

:::

## コミット

```bash title=すべての内容をコミット
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
