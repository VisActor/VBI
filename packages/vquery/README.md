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

## Source organization

- `VQuery.ts` manages datasets through adapter interfaces. `default-vquery.ts` assembles the default adapters; `browser.ts` and `node.ts` expose the public entrypoints.
- `dataset/` owns connected datasets and data sources. `dataset/source/` normalizes external inputs and loads records; it does not depend on SQL or adapters.
- `sql/ast.ts` defines shared syntax structures. `sql/parser.ts` parses SQL and expressions; `sql/numericExpression.ts` validates the public numeric expression subset. These modules do not depend on Kysely or execution adapters.
- `sql/compiler/` validates the DSL and generates SQL through Kysely, with clause builders and dialect-specific strategies. Compilation does not execute queries.
- `adapters/query/in-memory/` loads datasets and interprets parsed SQL. It depends on the parser and data-source helpers, not the compiler. `adapters/storage/` owns persistence implementations.
- `types/` contains public data, DSL and adapter contracts. `dataset/types.ts` contains the internal row type.

The compiler and executor share the AST without depending on one another. Unit tests enforce module boundaries and reject local import cycles.
