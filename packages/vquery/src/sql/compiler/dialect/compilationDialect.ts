import { DummyDriver } from 'kysely'
import type { Dialect, DialectAdapter, QueryCompiler } from 'kysely'

// Compilation never opens a database connection or introspects a live schema.
export const compilationDialect = (compiler: QueryCompiler, adapter: DialectAdapter): Dialect => ({
  createDriver: () => new DummyDriver(),
  createQueryCompiler: () => compiler,
  createAdapter: () => adapter,
  createIntrospector: () => ({
    getSchemas: async () => [],
    getTables: async () => [],
    getMetadata: async () => ({ tables: [] }),
  }),
})
