---
title: libérer
---


# libérer

## Générer changeset

Pour générer un nouveau changesets, exécutez pnpm changeset dans le répertoire racine du référentiel. Les fichiers markdown générés dans le répertoire.changeset doivent être validés dans le référentiel.
```bash
pnpm changeset
```

Après avoir généré l'ensemble de modifications, exécutez git commit
```bash
git add .
git commit -m "chore: commit message"
```

Le processus ci-dessus peut être répété plusieurs fois et le contenu de chaque ensemble de modifications sera accumulé jusqu'à ce que la version finale soit publiée.

## Version mise à jour

Exécutez la commande suivante pour mettre à jour la version et mettre à jour le ChangeLog.
```bash
pnpm changeset version
```

Mettre à jour les dépendances et verrouiller file
```bash
pnpm install
```

Valider les modifications
```bash
git add .
git commit -m "chore: release message"
git push
```

Une fois le PR fusionné dans la branche principale, changesets workflow sera automatiquement déclenché pour l'empaquetage et la publication.