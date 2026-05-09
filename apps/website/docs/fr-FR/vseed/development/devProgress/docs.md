# document

:::info
Ecrire le type `Typescript` revient à écrire indirectement le document de l'élément de configuration. 
:::

VSeedLes documents de tous les types de graphiques se trouvent dans le répertoire [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType)

## Créer automatiquement de la documentation

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
Veuillez ne pas modifier directement le contenu du document, car il pourrait être écrasé à tout moment.

`build:docs` Se termine en quelques secondes, donc aucune mise à jour incrémentielle n'est effectuée, chaque génération du document supprime tous les anciens documents et en génère de nouveaux.

:::