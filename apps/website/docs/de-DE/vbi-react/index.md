# VBI React

`@visactor/vbi-react` Ja `@visactor/vbi` der React-Anpassungsschicht, die verantwortlich ist für `VBIChartBuilder` Greifen Sie auf den React Component Tree zu.

Der aktuelle Export ist in zwei Ebenen unterteilt:

- Root-Export `@visactor/vbi-react`：`useVBI`、`useVSeed`、`useChartType`、`useDimensions`、`useMeasures`、`useWhereFilter`、`useHavingFilter`
- Subpfadexport `@visactor/vbi-react/components`：`BuilderLayout`、`ChartRenderer`、`ChartTypeSelector`、`FieldPanel`

## Positionierung

- Statusabonnements und Rendering-Fußabdrücke für React 18 +
- in `VBIChartBuilder` Single-State Source (SSOT) ohne zusätzliche Pflege von Geschäftskopien
- Geeignet für den Aufbau von BI-Konfigurationspanel, Diagrammvorschaubereich und DSL-Debug-Panel

## Installieren

Allgemeine Projektinstallation:

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

Beim Inline-Tuning in diesem Repository können Arbeitsbereichsabhängigkeiten verwendet werden:

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Schnellstart

Nachfolgend finden Sie eine Beispieldemonstration `useVBI` + `useVSeed` Minimaler geschlossener Kreislauf:

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

## Dokumentnavigation

- [API Übersicht](./api/index)
- [Beispiel](./examples/index)
