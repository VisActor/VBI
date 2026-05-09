# VBI React

`@visactor/vbi-react` adalah lapisan adaptasi `VBIChartBuilder` dari `@visactor/vbi`, yang bertanggung jawab untuk menghubungkan React ke pohon komponen React.

Ekspor saat ini dibagi menjadi dua tingkatan:

- Ekspor akar `@visactor/vbi-react`: `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- Ekspor sub-jalur `@visactor/vbi-react/components`: `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## posisi

- Langganan negara dan kemasan rendering untuk React 18+
- Gunakan `VBIChartBuilder` sebagai sumber status tunggal (SSOT) dan jangan menyimpan salinan bisnis tambahan
- Cocok untuk membuat panel konfigurasi BI, area pratinjau bagan, dan panel debug DSL

## Instal

Instalasi proyek reguler:

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

Saat melakukan debug inline di gudang ini, Anda dapat menggunakan ketergantungan ruang kerja:

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Mulai Cepat

Contoh berikut menunjukkan loop tertutup minimum dari `useVBI` + `useVSeed`:

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

- [./api/index Ikhtisar](./api/index)
- [Contoh](./examples/index)
