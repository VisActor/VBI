# よく使うスクリプト

Monorepo の一貫性を保つため、**すべてのスクリプトはプロジェクトルートで実行する必要があります**。

## 中核スクリプト (g)

`g` (Generator) は VSeed 開発で最も重要な補助スクリプトです。

```bash
pnpm run g
```

**機能説明**:
このコマンドは `build:test`、`build:docs`、`build:api` の組み合わせであり、開発環境のリソース同期を保証するために使用します。
1. **テストケースの生成**: `tests/integrations` 配下の JSON Spec を解析し、対応する `.test.ts` ファイルを生成します。
2. **ドキュメントの生成**: TypeScript 型定義を解析し、`apps/website` 内の API ドキュメントを更新します。

**使用シーン**:
- チャートロジックを変更した後、または新しいチャートタイプを追加した後。
- TypeScript 型定義を変更した後。
- コードをコミットする前。

## 開発とビルド

### 開発環境を起動
VSeed の監視とドキュメントサイトを同時に起動します。
```bash
pnpm run dev
```

### プロジェクトをビルド
VSeed コアライブラリをビルドします。
```bash
pnpm --filter=@visactor/vseed run build
```

## テスト関連

### すべてのテストを実行
```bash
pnpm --filter=@visactor/vseed run test
```

### 単体テストを実行
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### 統合テストを実行
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### テストスナップショットを更新
コード変更によってスナップショットが変わり、それが期待どおりである場合に実行します。
```bash
pnpm --filter=@visactor/vseed run test:update
```

## コード品質

### Lint チェック
```bash
pnpm run lint
```

### 型チェック
```bash
pnpm run typecheck
```
