# Scripts couramment utilisés

Pour maintenir la cohérence Monorepo, **tous les scripts doivent être exécutés dans le répertoire racine du projet**.

## Script principal (g)

`g` (Generator) est l'écriture auxiliaire la plus critique dans le développement de Generator.

```bash
pnpm run g
```

**Description de la fonction** :
Cette commande est une combinaison de `build:test`, `build:docs` et `build:api`, qui est utilisée pour assurer la synchronisation des ressources dans l'environnement de développement :
1. **Générer des cas de test** : analysez JSON Spec sous `tests/integrations` et générez le fichier `.test.ts` correspondant.
2. **Générer de la documentation** : analyser les définitions de type TypeScript, mettre à jour la documentation API dans `apps/website`.

**Scénario d'utilisation** :
- Après avoir modifié la logique du graphique ou ajouté un nouveau type de graphique.
- Après modification de la définition du type TypeScript.
- Avant de soumettre le code.

## Développer et construire

### Démarrer l'environnement de développement
Démarrez également les sites d'écoute et de documentation VSeed.
```bash
pnpm run dev
```

### Construire un projet
Construisez la bibliothèque principale VSeed.
```bash
pnpm --filter=@visactor/vseed run build
```

## Lié aux tests

### Exécutez tous les tests
```bash
pnpm --filter=@visactor/vseed run test
```

### Exécuter des tests unitaires
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### Exécuter des tests d'intégration
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### Mettre à jour l'instantané de test
Exécuté lorsque les modifications de votre code entraînent la modification de l'instantané (comme prévu) :
```bash
pnpm --filter=@visactor/vseed run test:update
```

## Qualité du code

### Lint Vérifier
```bash
pnpm run lint
```

### vérification du type
```bash
pnpm run typecheck
```
