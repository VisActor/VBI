import type * as VQueryModule from '@visactor/vquery'
import type { DatasetColumn, VQueryDSL, Where } from '@visactor/vquery'
import type { VBIQueryResult } from 'src/types/connector/query'
import type { getConnector } from '../connector'
import { createQueryContext } from '../execute'

export interface ProfileContext {
  columns: DatasetColumn[]
  query: (queryDSL: Omit<VQueryDSL, 'from'>) => Promise<VBIQueryResult['dataset']>
}

/** @description 固定查询快照与连接，所有统计通过同一个 Connector 执行 Query DSL。 */
export const createProfileContext = async (
  queryDSL: unknown,
  connectorId: string,
  resolveConnector: typeof getConnector,
  signal?: AbortSignal,
): Promise<ProfileContext> => {
  signal?.throwIfAborted()
  const snapshot = structuredClone(queryDSL)
  const vquery: typeof VQueryModule = await import('@visactor/vquery')
  vquery.validateQuery(snapshot)
  const context = await createQueryContext(connectorId, resolveConnector, signal)
  const { schema } = context
  vquery.validateQuery(snapshot, schema as DatasetColumn[])
  return {
    columns: vquery.getQuerySchema(snapshot, schema as DatasetColumn[]),
    query: async (queryDSL) => (await context.query({ ...queryDSL, from: snapshot })).dataset,
  }
}

export const positiveInteger = (value: number, name: string): number => {
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${name} must be a positive integer`)
  return value
}

export const selectColumns = (context: ProfileContext, names?: string[]) =>
  names
    ? [...new Set(names)].map((name) => {
        const column = context.columns.find((column) => column.name === name)
        if (!column) throw new Error(`Unknown profile column: ${name}`)
        return column
      })
    : context.columns

export const validValues = (column: DatasetColumn, emptyString?: 'value' | 'missing'): Where<Record<string, unknown>> =>
  column.type === 'number'
    ? { op: 'and', conditions: [{ field: column.name, op: 'between', value: [-Number.MAX_VALUE, Number.MAX_VALUE] }] }
    : {
        op: 'and',
        conditions: [
          { field: column.name, op: 'is not null' },
          ...(emptyString === 'missing' ? [{ field: column.name, op: '!=', value: '' } as const] : []),
        ],
      }

export const numericResult = (value: unknown): number => {
  const number = typeof value === 'string' && value.trim() !== '' ? Number(value) : value
  if (typeof number !== 'number' || !Number.isFinite(number)) throw new Error('Invalid statistics query result')
  return number
}

export const countResult = (value: unknown): number => {
  const count = numericResult(value)
  if (!Number.isSafeInteger(count) || count < 0) throw new Error('Invalid statistics count')
  return count
}

export const singleRow = (rows: VBIQueryResult['dataset']) => {
  if (rows.length !== 1) throw new Error('Expected one statistics row')
  return rows[0]
}
