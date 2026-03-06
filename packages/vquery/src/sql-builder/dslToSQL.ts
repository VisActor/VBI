import { QueryDSL, VQueryDSL } from 'src/types'
import { Kysely } from 'kysely'
import { PostgresDialect } from './dialect'
import { inlineParameters } from './compile'
import { applyWhere, applyGroupBy, applyLimit, applySelect, applyHaving } from './builders'

type TableDB<TableName extends string, Row> = {
  [K in TableName]: Row
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

  qb = applyGroupBy(qb, dsl.groupBy as Array<Extract<keyof T, string>> | undefined)

  // Apply having after groupBy
  if (dsl.having) {
    qb = qb.having(applyHaving<T>(dsl.having))
  }

  if (dsl.orderBy && dsl.orderBy.length > 0) {
    for (const o of dsl.orderBy) {
      qb = qb.orderBy(o.field as Extract<keyof T, string>, (o.order ?? 'asc') as 'asc' | 'desc')
    }
  }

  qb = applyLimit(qb, dsl.limit)

  const compiled = qb.compile()
  return inlineParameters(compiled.sql, compiled.parameters)
}
