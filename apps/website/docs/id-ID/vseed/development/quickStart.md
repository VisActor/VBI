# Mulai cepat

## Persiapan lingkungan

[Node Download](https://nodejs.org/zh-cn/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/zh/installation#%E4%BD%BF%E7%94%A8-corepack)
> Konfigurasikan `packageManager` di `package.json` ke `pnpm@10.13.1`, `corepack` akan menginstal versi ini secara otomatis
```bash title="pnpm"
corepack enable pnpm
```

Versi pnpm diperiksa, diharapkan 10.26.1.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## Mulai proyek

Mulai situs dan kembangkan serta debug vseed secara bersamaan
```bash title="Pengembangan"
pnpm install

pnpm dev
```

membangun
```bash title="Build"
pnpm build 
```

Analisis produk menggunakan `rsdoctor`
```bash title="Analisis"
pnpm build:rsdoctor 
# or
pnpm dev:rsdoctor
```
