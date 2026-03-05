import { QueryDSL, VQueryDSL } from 'src/types'
import { Kysely } from 'kysely'
import { PostgresDialect } from './dialect'
import { inlineParameters } from './compile'
import { applyWhere, applyGroupBy, applyLimit, applySelect, applyHaving } from './builders'

type TableDB<TableName extends string, Row> = {
  [K in TableName]: Row
}

// Helper function to recursively resolve alias references in having clause
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolveHavingAliases = (having: any, aliasToFieldMap: Record<string, string>): any => {
  if (!having) return having

  if ('op' in having && 'conditions' in having) {
    return {
      ...having,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      conditions: (having.conditions as any[]).map((c: any) => resolveHavingAliases(c, aliasToFieldMap)),
    }
  }

  // This is a leaf condition
  if ('field' in having) {
    const resolvedField = aliasToFieldMap[having.field as string] || having.field
    return {
      ...having,
      field: resolvedField,
    }
  }

  return having
}

export const convertDSLToSQL = <T, TableName extends string>(
  dsl: QueryDSL<T> | VQueryDSL<T>,
  tableName: TableName,
): string => {
  const db = new Kysely<TableDB<TableName, T>>({ dialect: new PostgresDialect() })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let qb: any = db.selectFrom(tableName)

  qb = applySelect(qb, dsl.select)

  if (dsl.where) {
    qb = qb.where(applyWhere<T>(dsl.where))
  }

  // Build a mapping from alias to field for groupBy and orderBy resolution
  const aliasToFieldMap: Record<string, string> = {}
  if (dsl.select && Array.isArray(dsl.select)) {
    for (const item of dsl.select) {
      if (typeof item === 'object' && item !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const field = (item as any).field
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const alias = (item as any).alias
        if (alias && field) {
          aliasToFieldMap[alias] = field
        }
      }
    }
  }

  // Resolve groupBy fields using alias-to-field mapping
  let resolvedGroupBy = dsl.groupBy
  if (dsl.groupBy && dsl.groupBy.length > 0) {
    resolvedGroupBy = dsl.groupBy.map((g) => aliasToFieldMap[g as string] || g)
  }

  qb = applyGroupBy(qb, resolvedGroupBy as Array<Extract<keyof T, string>> | undefined)

  // Apply having after groupBy - resolve aliases first
  if (dsl.having) {
    const resolvedHaving = resolveHavingAliases(dsl.having, aliasToFieldMap)
    qb = qb.having(applyHaving<T>(resolvedHaving))
  }

  if (dsl.orderBy && dsl.orderBy.length > 0) {
    for (const o of dsl.orderBy) {
      // Resolve orderBy field: if it's an alias, map to the field; otherwise use as-is
      const fieldStr = o.field as string
      const resolvedField = (aliasToFieldMap[fieldStr] || fieldStr) as Extract<keyof T, string>
      qb = qb.orderBy(resolvedField, (o.order ?? 'asc') as 'asc' | 'desc')
    }
  }

  qb = applyLimit(qb, dsl.limit)

  const compiled = qb.compile()
  return inlineParameters(compiled.sql, compiled.parameters)
}
