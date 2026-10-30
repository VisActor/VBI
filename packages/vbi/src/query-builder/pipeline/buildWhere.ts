import type { buildPipe } from './types'
import type { VBIWhereDatePredicate, VBIWhereFilter, VBIWhereClause, VBIWhereGroup } from 'src/types/queryDSL'
import { resolveDatePredicate } from './resolveDatePredicate'

export const buildWhere: buildPipe = (queryDSL, context) => {
  const { vbiDSL } = context
  const whereFilter = vbiDSL.whereFilter

  if (!whereFilter || whereFilter.conditions.length === 0) {
    return queryDSL
  }

  return { ...queryDSL, where: mapGroupToCondition(whereFilter) }
}

function isWhereGroup(clause: VBIWhereClause): clause is VBIWhereGroup {
  return 'op' in clause && 'conditions' in clause
}

function mapClauseToCondition(clause: VBIWhereClause): any[] {
  if (isWhereGroup(clause)) {
    return [mapGroupToCondition(clause)]
  }
  return mapFilterToCondition(clause)
}

function mapGroupToCondition(group: VBIWhereGroup): any {
  return {
    op: group.op,
    conditions: group.conditions.flatMap((c) => mapClauseToCondition(c)),
  }
}

function mapFilterToCondition(filter: VBIWhereFilter): any[] {
  if (filter.op === 'date') {
    return handleDateFilter(filter.field, filter.value as VBIWhereDatePredicate)
  }
  if (filter.op === 'between' || filter.op === 'not between') {
    return handleBetweenFilter(filter)
  }
  return handleSimpleFilter(filter)
}

function handleDateFilter(field: string, predicate: VBIWhereDatePredicate): any[] {
  const range = resolveDatePredicate(predicate)
  const startOp = '>='
  const endOp = range.bounds === '[]' ? '<=' : '<'

  return [
    { field, op: startOp, value: range.start },
    { field, op: endOp, value: range.end },
  ]
}

function handleBetweenFilter(filter: VBIWhereFilter): any[] {
  const value = normalizeBetweenValue(filter.value)
  const lowerCondition =
    value.min !== undefined && value.min !== null && value.min !== ''
      ? {
          field: filter.field,
          op: value.leftOp === '<' ? '>' : '>=',
          value: value.min,
        }
      : undefined
  const upperCondition =
    value.max !== undefined && value.max !== null && value.max !== ''
      ? {
          field: filter.field,
          op: value.rightOp === '<' ? '<' : '<=',
          value: value.max,
        }
      : undefined

  if (filter.op === 'not between') {
    const outsideConditions = [
      lowerCondition && invertLowerBound(lowerCondition),
      upperCondition && invertUpperBound(upperCondition),
    ].filter(Boolean)

    if (outsideConditions.length <= 1) {
      return outsideConditions as any[]
    }

    return [
      {
        op: 'or',
        conditions: outsideConditions,
      },
    ]
  }

  return [lowerCondition, upperCondition].filter(Boolean) as any[]
}

function normalizeBetweenValue(value: unknown): {
  min?: unknown
  max?: unknown
  leftOp?: string
  rightOp?: string
} {
  if (Array.isArray(value)) {
    return { min: value[0], max: value[1], leftOp: '<=', rightOp: '<=' }
  }
  if (typeof value === 'object' && value !== null) {
    return value as { min?: unknown; max?: unknown; leftOp?: string; rightOp?: string }
  }
  return {}
}

function invertLowerBound(condition: { field: string; op: string; value: unknown }) {
  return {
    field: condition.field,
    op: condition.op === '>' ? '<=' : '<',
    value: condition.value,
  }
}

function invertUpperBound(condition: { field: string; op: string; value: unknown }) {
  return {
    field: condition.field,
    op: condition.op === '<' ? '>=' : '>',
    value: condition.value,
  }
}

function handleSimpleFilter(filter: VBIWhereFilter): any[] {
  let mappedOp = filter.op
  const value = filter.value

  if (Array.isArray(value)) {
    if (mappedOp === '=') mappedOp = 'in'
    if (mappedOp === '!=') mappedOp = 'not in'
  }

  return [{ field: filter.field, op: mappedOp, value }] as any[]
}
