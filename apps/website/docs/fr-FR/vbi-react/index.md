# VBI React

`@visactor/vbi-react` est la couche d'adaptation React de `@visactor/vbi`. Elle connecte `VBIChartBuilder` à l'arborescence de composants React.

Les exports actuels sont organisés en deux niveaux :

- Export racine `@visactor/vbi-react` : `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- Exportation de sous-chemin `@visactor/vbi-react/components` : `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## Positionnement

- Wrappers d'abonnement d'état et de rendu pour React 18+
- Utilise `VBIChartBuilder` comme source unique de vérité (SSOT), sans maintenir de copie supplémentaire de l'état métier
- Adapté aux panneaux de configuration BI, aux zones d'aperçu de graphiques et aux panneaux de débogage DSL

## Installation

Installation régulière du projet :

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

Lors du débogage dans ce dépôt, vous pouvez utiliser les dépendances workspace :

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Démarrage rapide

L'exemple suivant montre le flux minimal avec `useVBI` + `useVSeed` :

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

## Documentation

- [Aperçu de l'API](./api/index)
- [Exemples](./examples/index)
