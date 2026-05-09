# démarrage rapide

## Préparation environnementale

[Node Download](https://nodejs.org/zh-cn/download)
```bash title="node"
nvm install 24
nvm use 24
```

[Pnpm Download](https://pnpm.io/zh/installation#%E4%BD%BF%E7%94%A8-corepack)
> Configurez `packageManager` dans `package.json` comme `pnpm@10.13.1`, et `corepack` installera automatiquement cette version.
```bash title="pnpm"
corepack enable pnpm
```

Vérification de la version pnpm, qui devrait être 10.26.1.
```bash title="pnpm version"
pnpm -v # expected 10.26.1
```

## Démarrer un projet

Démarrez le site et développez et déboguez vseed en même temps
```bash title="développer"
pnpm install

pnpm dev
```

construire
```bash title="construire"
pnpm build 
```

Analyser les produits à l'aide de `rsdoctor`
```bash title="analyser"
pnpm build:rsdoctor 
# or
pnpm dev:rsdoctor
```
