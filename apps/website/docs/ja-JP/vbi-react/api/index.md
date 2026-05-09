# API 概要

`@visactor/vbi-react` の現在のエクスポートは、次の 2 つに分かれています。

| モジュール | インポートパス | 内容 |
| --- | --- | --- |
| Hooks | `@visactor/vbi-react` | `useChartType`、`useDimensions`、`useHavingFilter`、`useMeasures`、`useVBI`、`useVSeed`、`useWhereFilter` |
| Components | `@visactor/vbi-react/components` | `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel` |

すべての hooks/components は `VBIChartBuilder` を中心に動作し、追加の業務状態ソースは保持しません。
