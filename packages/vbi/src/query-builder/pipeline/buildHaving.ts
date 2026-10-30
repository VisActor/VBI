import type { buildPipe } from './types'
import type { VBIHavingClause, VBIHavingFilter, VBIHavingGroup } from 'src/types/queryDSL'
import { mapAggregateForVQuery } from './aggregateMap'

export const buildHaving: buildPipe = (queryDSL, context) => {
  const { vbiDSL } = context
  const havingFilter = vbiDSL.havingFilter

  if (!havingFilter || havingFilter.conditions.length === 0) {
    return queryDSL
  }

  return {
    ...queryDSL,
    having: {
      op: havingFilter.op,
      conditions: havingFilter.conditions.flatMap(mapClauseToCondition),
    },
  }
}

function isHavingGroup(clause: VBIHavingClause): clause is VBIHavingGroup {
  return 'op' in clause && 'conditions' in clause
}

function mapClauseToCondition(clause: VBIHavingClause): any[] {
  if (isHavingGroup(clause)) {
    return [mapGroupToCondition(clause)]
  }
  return mapFilterToCondition(clause)
}

function mapGroupToCondition(group: VBIHavingGroup): any {
  return {
    op: group.op,
    conditions: group.conditions.flatMap(mapClauseToCondition),
  }
}

function mapFilterToCondition(filter: VBIHavingFilter): any[] {
  const mappedOp = normalizeOperator(filter.op, filter.value)
  const aggregate = mapAggregateForVQuery(filter.aggregate)

  return [
    {
      field: filter.field,
      aggr: aggregate,
      op: mappedOp,
      value: filter.value,
    },
  ]
}

function normalizeOperator(op: string, value: unknown): string {
  let mappedOp = op

  if (Array.isArray(value)) {
    if (mappedOp === '=') mappedOp = 'in'
    if (mappedOp === '!=') mappedOp = 'not in'
  }

  return mappedOp
}
