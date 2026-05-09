# advanced Pipeline

## advanced pipeline

`advanced pipeline` は vseed DSL を受け取り、advancedVSeed DSL を出力します。

`advancedVSeed` はグラフィック文法に基づいて設計されたデータ構造であり、チャートやテーブルを統一的に記述するために使われ、業務とチャートライブラリをつなぐ橋渡しになります。


`advancedVSeed` 自体も完全にシリアライズ可能です。そのため Node.js 環境で構築し、http 経由で spec pipeline へ転送して、フロントエンドでチャートをレンダリングできます。
