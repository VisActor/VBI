# Ikhtisar API

`@visactor/vbi-react` saat ini mengekspor dua grup:

| Modul | Jalur import | Isi |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`, `useDimensions`, `useHavingFilter`, `useMeasures`, `useVBI`, `useVSeed`, `useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel` |

Semua hooks dan components bekerja di sekitar `VBIChartBuilder`; keduanya tidak menyimpan sumber state bisnis terpisah.
