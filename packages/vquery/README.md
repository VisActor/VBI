# VQuery

Node.js and browser entrypoints use in-memory query and storage adapters by default. No IndexedDB API is required, and each VQuery instance owns its datasets.

```ts
import { VQuery } from '@visactor/vquery'

const vquery = new VQuery()
```

Enable IndexedDB explicitly to persist dataset schemas and sources between sessions:

```ts
const vquery = new VQuery({ enableIndexedDB: true })
```

The runtime must support IndexedDB when this option is enabled. Queries still run in memory. With the default storage, closing the instance or reloading the page discards its datasets.
