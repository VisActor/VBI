# API Ikhtisar

`@visactor/vbi-react` Ekspor saat ini dibagi menjadi dua bagian:

| modul | jalur impor | konten |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`、`useDimensions`、`useHavingFilter`、`useMeasures`、`useVBI`、`useVSeed`、`useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel` |

Semua `VBIChartBuilder` berfungsi di sekitar hooks/components dan tidak mempertahankan sumber status bisnis tambahan.
