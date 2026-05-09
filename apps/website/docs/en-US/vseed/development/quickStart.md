# Quick start

## Environment preparation

[Node Download](https://nodejs.org/zh-cn/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/zh/installation#%E4%BD%BF%E7%94%A8-corepack)
> Configure `packageManager` in `package.json` as `pnpm@10.13.1`, and `corepack` will automatically install this version
```bash title="pnpm"
corepack enable pnpm
```

Checked pnpm version, expected to be 10.26.1.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## Start project

Start the site and develop and debug vseed at the same time
```bash title="develop"
pnpm install

pnpm dev
```

build
```bash title="build"
pnpm build 
```

Analyze products using `rsdoctor`
```bash title="analysis"
pnpm build:rsdoctor 
# or
pnpm dev:rsdoctor
```
