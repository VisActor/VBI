# VQuery

VQuery は `VQueryDSL` を使って dataset に対するクエリを記述し、SQL 生成とデータ取得の流れを扱う軽量なクエリエンジンです。

## 主な機能

- `select`、`where`、`groupBy`、`having`、`orderBy`、`limit` を組み合わせた queryDSL の構築。
- 集計関数、日付変換、NULL 判定、IN/BETWEEN 条件など、分析向けの基本的なクエリ操作。
- `@visactor/vquery` の Playground とサンプルによる実行結果の確認。

## 次に読む

- サンプルでは、各 DSL フィールドの使い方を実行可能な例で確認できます。
- Playground では、dataset の作成から queryDSL の実行、VSeed への受け渡しまでを試せます。
