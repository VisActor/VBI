# API Übersicht

`@visactor/vbi-react` exportiert aktuell zwei Gruppen:

| Modul | Importpfad | Inhalt |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

Alle Hooks und Komponenten arbeiten rund um `VBIChartBuilder`; sie pflegen keine separate Quelle für den Fachzustand.
