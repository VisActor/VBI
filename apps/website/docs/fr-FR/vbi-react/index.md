# VBI React

`@visactor/vbi-react` est la couche d'adaptation React de `@visactor/vbi`, responsable de la connexion de `VBIChartBuilder` à l'arborescence des composants React.

L'exportation actuelle est divisée en deux niveaux :

- Exportations racine `@visactor/vbi-react` : `useVBI`, `useVSeed`, `useChartType`, `useDimensions`, `useMeasures`, `useWhereFilter`, `useHavingFilter`
- Exportation de sous-chemin `@visactor/vbi-react/components` : `BuilderLayout`, `ChartRenderer`, `ChartTypeSelector`, `FieldPanel`

## position

- Forfait d'abonnement et de rendu de l'État pour les React 18+
- Utilisez `VBIChartBuilder` comme source de statut unique (SSOT) et ne conservez pas de copies professionnelles supplémentaires
- Convient pour créer le panneau de configuration BI, la zone d'aperçu des graphiques et le panneau de débogage DSL

## Installer

Installation régulière du projet :

```bash
pnpm add @visactor/vbi-react @visactor/vbi @visactor/vseed react react-dom
```

Lors du débogage en ligne dans cet entrepôt, vous pouvez utiliser la dépendance workspace :

```bash
pnpm --filter=<your-app> add @visactor/vbi-react@workspace:* @visactor/vbi@workspace:* @visactor/vseed@workspace:* react react-dom
```

## Démarrage rapide

L'exemple suivant démontre la boucle fermée minimale de `useVBI` + `useVSeed` :

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

## Navigation dans les documents

- [./api/index Aperçu](./api/index)
- [Exemple](./examples/index)
