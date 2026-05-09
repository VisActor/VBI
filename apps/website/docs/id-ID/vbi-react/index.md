# VBI React

`@visactor/vbi-react` adalah lapisan adapter React untuk `@visactor/vbi`. Paket ini menghubungkan `VBIChartBuilder` ke pohon komponen React.

Ekspor saat ini dibagi menjadi dua lapisan:

- Ekspor akar `@visactor/vbi-react`: `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- Ekspor sub-jalur `@visactor/vbi-react/components`: `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## Posisi

- Wrapper subscription state dan rendering untuk React 18+
- Menggunakan `VBIChartBuilder` sebagai single source of truth (SSOT), tanpa menyimpan salinan state bisnis tambahan
- Cocok untuk membangun panel konfigurasi BI, area pratinjau chart, dan panel debug DSL

## Instalasi

Instalasi proyek reguler:

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

Saat melakukan debug di dalam repositori ini, Anda dapat menggunakan dependensi workspace:

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Mulai Cepat

Contoh berikut menunjukkan alur minimal `useVBI` + `useVSeed`:

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

## Navigasi Dokumen

- [Ikhtisar API](./api/index)
- [Contoh](./examples/index)
