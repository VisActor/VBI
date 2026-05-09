# Scripts couramment utilisés

Pour maintenir la cohérence Monorepo, **tous les scripts doivent être exécutés dans le répertoire racine du projet**.

## Script principal (g)

```bash
pnpm run g
```
**Description de la fonction** : Le script VQuery de `g` est responsable de :
1. `build:test` : Compiler les ressources de test.
2. `build:docs` : Générer le document API.

## Développer et construire

### construire
```bash
pnpm --filter=@visactor/vquery run build
```

## test

### Exécuter des tests
Rstest Utiliser Rstest pour les tests.
```bash
pnpm --filter=@visactor/vquery run test
```

### Mettre à jour l'instantané
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Couverture
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
