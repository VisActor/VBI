# API Aperçu

`@visactor/vbi-react` L'export actuel est divisé en deux parties :

| module | chemin d'importation | contenu |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`、`useDimensions`、`useHavingFilter`、`useMeasures`、`useVBI`、`useVSeed`、`useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel` |

Tous les hooks/components fonctionnent autour de `VBIChartBuilder` sans maintenance supplémentaire des sources de statut d'entreprise.
