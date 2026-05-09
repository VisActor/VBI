# processus de développement

## Démarrer un projet

```bash title="Démarrer un projet"
pnpm install && pnpm dev
``` 

## Comprendre les exigences et écrire le code

C'est un processus compliqué, mais en général, il s'agit de trois choses :
1. Saisie explicite, `vseed`
2. Sortie explicite, `vseed` devient `advancedVSeed`, ou `advancedVSeed` devient `spec`
3. Écrire du code pour garantir que les nouvelles entrées produisent le résultat attendu

:::tip
`playground(apps/website/docs/zh-CN/playground/index.mdx)`, peut être débogué et développé.

:::

## Créer un nouveau scénario de test

Si nécessaire, vous pouvez envisager de créer un nouveau scénario de test

:::tip
Lorsque la couverture diminue, de nouveaux cas de test doivent être créés

:::

Dans le répertoire `packages/vseed/tests/*`, créez un nouveau `testName.json` et écrivez vseed DSL.

mettre en œuvre

```bash title="Créer des cas de tests"
pnpm build:canvasTest
```

## Exécuter des tests unitaires et mettre à jour la couverture

```bash title="Exécuter des tests unitaires et mettre à jour la couverture"
pnpm test:coverage
```

Assurez-vous de 3 choses
1. Tous les tests réussis
2. Les modifications apportées aux instantanés sont conformes aux attentes
3. Pas de baisse de couverture

> Les modifications de couverture seront automatiquement mises à jour dans README.md

## Mettre à jour la documentation des éléments de configuration

Si la définition Typescript du type de graphique est modifiée, veuillez mettre à jour le document de l'élément de configuration.

:::tip
Toutes les définitions de type sous `packages/vseed/src/types/chartType` correspondent au document d'élément de configuration de chaque carte. S'il y a des changements, assurez-vous de les mettre à jour.

:::

```bash title="Mettre à jour la documentation des éléments de configuration"
pnpm build:docs
```

## Publier et soumettre

```bash title="Décrire les changements"
pnpm changeset
```

Après avoir exécuté la commande `pnpm changeset`, choisissez d'effectuer les opérations suivantes selon les infobulles
1. Sélectionnez le package qui doit être modifié. Généralement, seul vseed
2. Suivez la version sémantique et sélectionnez le type de changement. Dans la plupart des cas, appuyez deux fois de suite sur la touche Entrée. Après avoir sauté `major` et `minor`, sélectionnez `patch`.
2. Saisissez une description du changement, par exemple : `fix: chart render error caused by only one measure` 

:::tip Suggestions
Une fonctionnalité ou un bugfix correspond à un `changeset`, qui correspond à un `commit`

Un `Pull Request`, correspondant à un `issue`

Un `Pull Request`, correspond à plusieurs fonctions ou plusieurs Bugfix, correspond à plusieurs `changeset`, correspond à plusieurs `commit`

:::

## soumettre

```bash title="Soumettre tout le contenu"
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
