# Aperçu de l'API

`@visactor/vbi-react` exporte actuellement deux groupes :

| Module | Chemin d'import | Contenu |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

Tous les hooks et composants s'appuient sur `VBIChartBuilder`; ils ne maintiennent pas de source d'état métier séparée.
