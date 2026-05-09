# テストフロー

VQuery は `rstest` フレームワークを使用してテストします。**すべてのコマンドはルートディレクトリで実行してください。**

## テストの仕組み
VQuery のテストは次をカバーしています。
- **Unit**: ユーティリティ関数とコンパイラロジック。
- **examples**: 完全な SQL 生成とデータクエリのフロー。

## よく使うコマンド

### すべてのテストを実行
```bash
pnpm --filter=@visactor/vquery run test
```

### スナップショットの更新
SQL 生成ロジックの変更が期待どおりである場合は、スナップショットを更新してください。
```bash
pnpm --filter=@visactor/vquery run test:update
```

### カバレッジレポート
テストカバレッジを生成して確認します。
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
