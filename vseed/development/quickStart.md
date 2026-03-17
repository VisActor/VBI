# 快速启动

## 环境准备

[Node Download](https://nodejs.org/zh-cn/download)

```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/zh/installation#%E4%BD%BF%E7%94%A8-corepack)

> `package.json`中配置`packageManager`为`pnpm@10.13.1`, `corepack`会自动安装该版本

```bash title="pnpm"
corepack enable pnpm
```

检查pnpm版本, 预期是10.26.1.

```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## 启动项目

启动站点, 可同时开发调试vseed

```bash title="开发"
pnpm install

pnpm dev
```

构建

```bash title="构建"
pnpm build 
```

使用 `rsdoctor` 分析产物

```bash title="分析"
pnpm build:rsdoctor 
# or
pnpm dev:rsdoctor
```
