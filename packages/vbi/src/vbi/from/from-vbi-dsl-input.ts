import * as Y from 'yjs'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartDSLInput, VBIChartBuilderOptions } from 'src/types'
import { VBIChartBuilder } from 'src/chart-builder/builder'
import { ensureHavingGroup } from '../normalize/ensure-having-group'
import { ensureWhereGroup } from '../normalize/ensure-where-group'
import { ensureYArray } from '../normalize/ensure-y-array'
import { setBaseDSLFields } from './set-base-dsl-fields'

export const createChartBuilderFromVBIChartDSLInput = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  vbi: VBIChartDSLInput,
  options?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
) => {
  const doc = new Y.Doc()
  const dsl = doc.getMap('dsl')

  doc.transact(() => {
    dsl.clear()
    setBaseDSLFields(dsl, vbi)
    dsl.set('whereFilter', ensureWhereGroup(vbi.whereFilter))
    dsl.set('havingFilter', ensureHavingGroup(vbi.havingFilter))
    dsl.set('measures', ensureYArray(vbi.measures, 'field'))
    dsl.set('dimensions', ensureYArray(vbi.dimensions, 'field'))
    if (vbi.calculations) dsl.set('calculations', ensureYArray(vbi.calculations))
  })

  return new VBIChartBuilder<TQueryDSL, TSeedDSL>(doc, options, dsl)
}
