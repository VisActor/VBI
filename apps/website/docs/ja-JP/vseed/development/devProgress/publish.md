---
title: リリース
---


# リリース

## changeset を生成

新しい changesets を生成するには、リポジトリのルートディレクトリで `pnpm changeset` を実行します。`.changeset` ディレクトリに生成された markdown ファイルは、リポジトリにコミットしてください。
```bash
pnpm changeset
```

changeset を生成した後、git commit を実行します。
```bash
git add .
git commit -m "chore: commit message"
```

上記のプロセスは複数回繰り返せます。各 changeset の内容は、最終的なバージョンリリースへ累積されます。

## バージョンを更新

次のコマンドを実行してバージョンを更新し、ChangeLog も更新します。
```bash
pnpm changeset version
```

依存関係と lock file を更新します。
```bash
pnpm install
```

変更をコミットします。
```bash
git add .
git commit -m "chore: release message"
git push
```

PR が main ブランチにマージされると、changesets workflow が自動的にトリガーされ、パッケージングとリリース作業が行われます。
