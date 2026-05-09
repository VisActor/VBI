# VBI React

`@visactor/vbi-react` は `@visactor/vbi` の React アダプター層です。`VBIChartBuilder` を React コンポーネントツリーに接続します。

現在のエクスポートは 2 つの層に分かれています。

- ルートエクスポート `@visactor/vbi-react`: `useVBI`、`useVSeed`、`useChartType`、`useDimensions`、`useMeasures`、`useWhereFilter`、`useHavingFilter`
- サブパスエクスポート `@visactor/vbi-react/components`: `BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel`

## 位置づけ

- React 18+ 向けの状態購読とレンダリングのラッパー
- `VBIChartBuilder` を単一の状態ソース (SSOT) とし、追加の業務用コピーは保持しません
- BI 設定パネル、チャートプレビュー領域、DSL デバッグパネルの構築に適しています

## インストール

通常のプロジェクトでは次のようにインストールします。

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

このリポジトリ内で連携開発する場合は、workspace 依存を利用できます。

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## クイックスタート

次の例は、`useVBI` + `useVSeed` の最小構成の流れを示します。

```tsx
import { useMemo } from 'react'
import { VBI, type VBIConnector } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

const connectorId = 'local-demo'

const connector: VBIConnector = {
  discoverSchema: async () => [
    { name: 'region', type: 'string' },
    { name: 'sales', type: 'number' },
  ],
  query: async () => ({
    dataset: [
      { region: 'East', sales: 120 },
      { region: 'West', sales: 90 },
    ],
  }),
}

VBI.registerConnector(connectorId, connector)

export function App() {
  const builder = useMemo(
    () =>
      VBI.chart.create({
        ...VBI.chart.createEmpty(connectorId),
        chartType: 'bar',
      }),
    [],
  )

  const { dsl } = useVBI(builder)
  const { vseed, loading, error } = useVSeed(builder, { debounce: 0 })

  if (error) return <pre>{error.message}</pre>
  if (loading || !vseed) return <div>Loading...</div>

  return (
    <div>
      <h3>{dsl.chartType}</h3>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## ドキュメントナビゲーション

- [API 概要](./api/index)
- [サンプル](./examples/index)
