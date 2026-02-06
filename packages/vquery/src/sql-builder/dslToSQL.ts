import { QueryDSL } from 'src/types'
import { Kysely, sql } from 'kysely'
import { PostgresDialect } from './dialect'
import { inlineParameters } from './compile'
import { applyWhere, applyGroupBy, applyLimit } from './builders'
import { isSelectItem } from './utils'

type TableDB<TableName extends string, Row> = {
  [K in TableName]: Row
}

export const convertDSLToSQL = <T, TableName extends string>(dsl: QueryDSL<T>, tableName: TableName): string => {
  console.log('[convertDSLToSQL] Input dsl:', JSON.stringify(dsl, null, 2));
  console.log('[convertDSLToSQL] tableName:', tableName);
  
  const db = new Kysely<TableDB<TableName, T>>({ dialect: new PostgresDialect() })

  let qb = db.selectFrom(tableName)

  if (dsl.select && dsl.select.length > 0) {
    console.log('[convertDSLToSQL] Processing', dsl.select.length, 'select items');
    qb = qb.select((eb) =>
      dsl.select.map((item) => {
        if (isSelectItem(item)) {
          const field = item.field as Extract<keyof T, string>
          console.log('[convertDSLToSQL] Select item - field:', field, 'func:', item.func, 'alias:', item.alias);
          if (item.func) {
            const alias = item.alias ?? (field as string)
            switch (item.func) {
              case 'avg':
                return eb.fn.avg(field).as(alias)
              case 'sum':
                return eb.fn.sum(field).as(alias)
              case 'min':
                return eb.fn.min(field).as(alias)
              case 'max':
                return eb.fn.max(field).as(alias)
              case 'count': {
                // COUNT(field) - 值计数
                console.log('[dslToSQL] Processing count aggregate for field:', field, 'alias:', alias);
                return eb.fn.count(field).as(alias)
              }
              case 'count_distinct': {
                // COUNT(DISTINCT field) - 不同值计数
                console.log('[dslToSQL] Processing count_distinct aggregate for field:', field, 'alias:', alias);
                return sql<number>`count(distinct ${eb.ref(field)})`.as(alias)
              }
            }
          }
          return item.alias ? eb.ref(field).as(item.alias) : field
        }
        return item as Extract<keyof T, string>
      }),
    )
  } else {
    qb = qb.selectAll()
  }

  if (dsl.where) {
    qb = qb.where(applyWhere<T>(dsl.where))
  }

  qb = applyGroupBy(qb, dsl.groupBy as Array<Extract<keyof T, string>> | undefined)

  if (dsl.orderBy && dsl.orderBy.length > 0) {
    for (const o of dsl.orderBy) {
      qb = qb.orderBy(o.field as Extract<keyof T, string>, (o.order ?? 'asc') as 'asc' | 'desc')
    }
  }

  qb = applyLimit(qb, dsl.limit)

  const compiled = qb.compile()
  const finalSQL = inlineParameters(compiled.sql, compiled.parameters)
  console.log('[convertDSLToSQL] Generated SQL:', finalSQL);
  return finalSQL
}
