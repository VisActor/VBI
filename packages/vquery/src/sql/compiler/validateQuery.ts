import { getQuerySchema } from './getQuerySchema'
import type { DatasetColumn, VQueryDSL } from '../../types'
import { toSqlOperator } from './utils'
import { parseNumericExpression } from '../numericExpression'

const aggregates = [
  'count',
  'count_distinct',
  'sum',
  'avg',
  'min',
  'max',
  'variance',
  'variance_pop',
  'stddev',
  'median',
  'quantile',
]
const dates = ['to_year', 'to_quarter', 'to_month', 'to_week', 'to_day', 'to_hour', 'to_minute', 'to_second']
const operators = [
  '=',
  '!=',
  '>',
  '>=',
  '<',
  '<=',
  'like',
  'not like',
  'ilike',
  'not ilike',
  'in',
  'not in',
  'between',
  'not between',
  'is null',
  'is not null',
]

function assert(ok: unknown, message: string): asserts ok {
  if (!ok) throw new Error(message)
}
const object = (value: unknown): value is Record<string, any> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)
const name = (value: unknown) => typeof value === 'string' && value.length > 0
const scalar = (value: unknown) =>
  (value instanceof Date && Number.isFinite(value.getTime())) ||
  value === null ||
  typeof value === 'string' ||
  typeof value === 'boolean' ||
  (typeof value === 'number' && Number.isFinite(value))

function aggregate(value: unknown, allowDates: boolean) {
  assert(object(value), 'Invalid aggregate')
  assert(aggregates.includes(value.func) || (allowDates && dates.includes(value.func)), 'Unsupported aggregate')
  assert(
    Object.keys(value).every((key) => key === 'func' || key === 'quantile'),
    'Unsupported aggregate property',
  )
  if (value.quantile !== undefined) {
    assert(
      value.func === 'quantile' &&
        typeof value.quantile === 'number' &&
        Number.isFinite(value.quantile) &&
        value.quantile >= -1 &&
        value.quantile <= 1,
      'Invalid quantile',
    )
  }
}

export function validateQuery(dsl: unknown, columns: DatasetColumn[] = []): asserts dsl is VQueryDSL {
  const completeSchema = columns.length > 0
  assert(object(dsl), 'Expected query DSL')
  assert(
    Object.keys(dsl).every((key) => ['select', 'from', 'where', 'groupBy', 'having', 'orderBy', 'limit'].includes(key)),
    'Unsupported query property',
  )
  if (dsl.from !== undefined) {
    validateQuery(dsl.from, columns)
    columns = getQuerySchema(dsl.from, columns)
  }
  const numeric = ['sum', 'avg', 'variance', 'variance_pop', 'stddev', 'median', 'quantile']
  const columnTypes = new Map(columns.map((column) => [column.name, column.type]))
  const checkType = (field: string, func: string) => {
    if ((columnTypes.has(field) || completeSchema) && numeric.includes(func)) {
      assert(columnTypes.get(field) === 'number', `${func} requires a number column: ${field}`)
    }
  }
  const predicate = (node: unknown, having: boolean): void => {
    assert(object(node), 'Invalid filter')
    if ('conditions' in node) {
      assert((node.op === 'and' || node.op === 'or') && Array.isArray(node.conditions), 'Invalid filter group')
      node.conditions.forEach((child: unknown) => predicate(child, having))
      return
    }
    assert(name(node.field), 'Invalid filter field')
    if (having) {
      assert(
        object(node.aggr) && aggregates.includes(node.aggr.func),
        `Invalid having clause for field "${node.field}": aggr.func is required`,
      )
      aggregate(node.aggr, false)
      checkType(node.field, node.aggr.func)
    }
    assert(typeof node.op === 'string', 'Invalid filter operator')
    const op = toSqlOperator(having ? node.op.trim().toLowerCase() : node.op)
    assert(operators.includes(op) && (!having || !op.includes('like')), 'Unsupported filter operator')
    if (op === 'is null' || op === 'is not null') return
    if (op === 'in' || op === 'not in') {
      assert(
        Array.isArray(node.value) ? node.value.length > 0 && node.value.every(scalar) : scalar(node.value),
        'Invalid IN values',
      )
    } else if (op === 'between' || op === 'not between') {
      assert(Array.isArray(node.value) && node.value.length === 2 && node.value.every(scalar), 'Invalid range')
    } else assert(scalar(node.value), 'Invalid filter value')
    const fieldType = columnTypes.get(node.field)
    const type = having && node.aggr.func !== 'min' && node.aggr.func !== 'max' ? 'number' : fieldType
    if (op.includes('like'))
      assert(node.value === null || typeof node.value === 'string', 'LIKE requires a string pattern')
    if (columns.length && op.includes('like')) assert(type === 'string', `LIKE requires a string column: ${node.field}`)
    if (!columns.length || !type || op.includes('like')) return
    const values = Array.isArray(node.value) ? node.value : [node.value]
    assert(
      values.every(
        (value: unknown) =>
          value === null ||
          (type === 'number'
            ? typeof value === 'number'
            : type === 'string'
              ? typeof value === 'string'
              : typeof value === 'string' || value instanceof Date),
      ),
      `Filter value does not match ${type} column: ${node.field}`,
    )
  }
  assert(Array.isArray(dsl.select), 'Invalid select')
  for (const item of dsl.select) {
    if (typeof item === 'string') assert(name(item), 'Invalid select field')
    else {
      if (object(item) && item.expr !== undefined) {
        assert(
          name(item.alias) && item.field === undefined && item.aggr === undefined && item.when === undefined,
          'Invalid expression select item',
        )
        assert(
          !dsl.groupBy?.length &&
            dsl.having === undefined &&
            !dsl.select.some((other: any) => object(other) && other.aggr !== undefined),
          'Use FROM to separate expressions and aggregation',
        )
        parseNumericExpression(item.expr, item.parameters, columns, completeSchema)
        continue
      }
      assert(object(item) && name(item.field), 'Invalid select item')
      assert(item.parameters === undefined, 'Parameters require an expression')
      assert(item.alias === undefined || name(item.alias), 'Invalid select alias')
      if (item.when !== undefined) {
        assert(item.field !== '*', 'Conditional projections require a field')
        predicate(item.when, false)
      }
      assert(item.field !== '*' || item.aggr?.func === 'count', 'Wildcard aggregation requires count')
      if (item.aggr !== undefined) {
        aggregate(item.aggr, true)
        checkType(item.field, item.aggr.func)
      }
    }
  }
  if (dsl.where !== undefined) predicate(dsl.where, false)
  if (dsl.having !== undefined) predicate(dsl.having, true)
  if (dsl.groupBy !== undefined) assert(Array.isArray(dsl.groupBy) && dsl.groupBy.every(name), 'Invalid groupBy')
  if (dsl.orderBy !== undefined)
    assert(
      Array.isArray(dsl.orderBy) &&
        dsl.orderBy.every(
          (item: unknown) =>
            object(item) &&
            name(item.field) &&
            (item.order === undefined || item.order === 'asc' || item.order === 'desc') &&
            (item.nulls === undefined || item.nulls === 'first' || item.nulls === 'last'),
        ),
      'Invalid orderBy',
    )
  if (dsl.limit !== undefined) assert(Number.isSafeInteger(dsl.limit) && dsl.limit >= 0, 'Invalid limit')
}
