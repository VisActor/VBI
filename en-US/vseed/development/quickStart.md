# Quick Start

## Environment Setup

[Node Download](https://nodejs.org/en/download)

```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/installation#using-corepack)

> `package.json` configures `packageManager` as `pnpm@10.13.1`; `corepack` will automatically install this version.

```bash title="pnpm"
corepack enable pnpm
```

Check pnpm version, expected to be 10.26.1:

```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## Start the Project

Start the documentation site (supports simultaneous development and debugging of vseed):

```bash title="Development"
pnpm install

pnpm dev
```

Build:

```bash title="Build"
pnpm build 
```

Analyze the build output with `rsdoctor`:

```bash title="Analyze"
pnpm build:rsdoctor 
# or
pnpm dev:rsdoctor
```
