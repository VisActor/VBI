# クイックスタート

## 環境準備

[Node Download](https://nodejs.org/zh-cn/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/zh/installation#%E4%BD%BF%E7%94%A8-corepack)
> `package.json` では `packageManager` が `pnpm@10.13.1` に設定されており、`corepack` がこのバージョンを自動的にインストールします。
```bash title="pnpm"
corepack enable pnpm
```

pnpm のバージョンを確認します。期待値は 10.26.1 です。
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## プロジェクトの起動

サイトを起動すると、vseed の開発とデバッグも同時に行えます。
```bash title="開発"
pnpm install

pnpm dev
```

ビルド
```bash title="ビルド"
pnpm build 
```

`rsdoctor` を使用して成果物を分析します。
```bash title="分析"
pnpm build:rsdoctor 
# or
pnpm dev:rsdoctor
```
