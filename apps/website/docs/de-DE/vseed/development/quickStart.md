# Schnellstart

## Umweltvorbereitung

[Node Download](https://nodejs.org/zh-cn/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/zh/installation#%E4%BD%BF%E7%94%A8-corepack)
> `package.json`Mittlere Konfiguration`packageManager`für`pnpm@10.13.1`, `corepack`Diese Version wird automatisch installiert
```bash title="pnpm"
corepack enable pnpm
```

Pnpm-Version prüfen, Erwartet wird 10.26.1.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## Projekt starten

Startort, Kann vseed gleichzeitig entwickeln und debuggen
```bash title="Entwicklung"
pnpm install

pnpm dev
```

Build
```bash title="Build"
pnpm build 
```

Verwendung `rsdoctor` Analytische Produkte
```bash title="Analytik"
pnpm build:rsdoctor 
# or
pnpm dev:rsdoctor
```
