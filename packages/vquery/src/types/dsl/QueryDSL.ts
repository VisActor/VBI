import type { GroupBy } from './GroupBy'
import type { Having } from './Having'
import type { OrderBy } from './OrderBy'
import type { Select } from './Select'
import type { Where } from './Where'

export interface QueryDSL<Table> {
  select: Select<Table>
  /** Use a SQL subquery in FROM; the physical dataset remains the execution context. */
  from?: VQueryDSL
  where?: Where<Table>
  groupBy?: GroupBy<Table>
  having?: Having<Table>
  orderBy?: OrderBy<Table>
  limit?: number
}

export type VQueryDSL<Table = Record<string, unknown>> = QueryDSL<Table>
