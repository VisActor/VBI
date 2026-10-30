import { sql } from 'kysely'
import type { Kysely, RawBuilder } from 'kysely'
import type { DatasetColumn } from '../../../types'
import type { QueryTable } from '../types'

export const createSource = (
  db: Kysely<any>,
  table: QueryTable,
  columns: DatasetColumn[],
  text: (field: RawBuilder<unknown>) => RawBuilder<unknown>,
) => {
  const query = typeof table === 'string' ? db.selectFrom(table) : db.withSchema(table.database).selectFrom(table.name)
  if (!columns.some((column) => column.type === 'string')) return query
  // Collation is part of the logical string type, not a database/table default.
  const source = query
    .select(
      columns.map((column) => {
        const field = sql.id(column.name)
        return (column.type === 'string' ? text(field) : field).as(column.name)
      }),
    )
    .as('__vquery_source')
  return db.selectFrom(source)
}

export const normalizeValue = (value: unknown): unknown =>
  value instanceof Date ? value.toISOString().slice(0, 23).replace('T', ' ') : value
