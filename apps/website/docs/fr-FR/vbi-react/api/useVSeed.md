# useVSeed

## Import

```ts
import { useVSeed } from '@visactor/vbi-react'
```

## Signature

```ts
useVSeed(builder: VBIChartBuilder, options: UseVSeedOptions =
```

## Description

Exécutez la requête et le processus de génération VSeed pour renvoyer l'état et les données requis pour le rendu.

## Exemple minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVSeed } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const { vseed, loading } = useVSeed(builder, { debounce: 100 })
  if (loading || !vseed) {
    return <div>Loading...</div>
  }
  return <pre>{JSON.stringify(vseed, null, 2)}</pre>
}
```
