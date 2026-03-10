import { VBIConnectorId } from 'src/types/connector/connector'
import { VBIDSL } from 'src/types'
import { VBIBuilder } from './vbi-builder'
import { connectorMap, getConnector, registerConnector } from './connector'

import * as Y from 'yjs'

const createVBI = () => {
  return {
    connectorMap: connectorMap,
    registerConnector: registerConnector,
    getConnector: getConnector,
    generateEmptyDSL: (connectorId: VBIConnectorId): VBIDSL => {
      return {
        connectorId: connectorId,
        chartType: 'table',
        measures: [],
        dimensions: [],
        whereFilters: {
          id: '00000000-0000-0000-0000-000000000000',
          op: 'AND',
          conditions: [],
        },
        havingFilters: [],
        theme: 'light',
        locale: 'zh-CN',
        version: 0,
      }
    },
    from: (vbi: VBIDSL) => {
      const doc = new Y.Doc()
      const dsl = doc.getMap('dsl')

      doc.transact(() => {
        if (vbi.connectorId) dsl.set('connectorId', vbi.connectorId)
        if (vbi.chartType) dsl.set('chartType', vbi.chartType)
        if (vbi.theme) dsl.set('theme', vbi.theme)
        if (vbi.limit) dsl.set('limit', vbi.limit)
        if (vbi.locale) dsl.set('locale', vbi.locale)
        if (vbi.version) dsl.set('version', vbi.version)

        // Initialize arrays - convert plain arrays to Y.Array if needed
        const ensureYArray = (arr: any) => {
          if (!arr) return new Y.Array()
          if (arr instanceof Y.Array) return arr
          const yArr = new Y.Array()
          // Convert plain objects to Y.Map
          arr.forEach((item: any) => {
            if (item instanceof Y.Map) {
              yArr.push([item])
            } else if (typeof item === 'object' && item !== null) {
              const yMap = new Y.Map<any>()
              for (const [key, value] of Object.entries(item)) {
                yMap.set(key, value)
              }
              yArr.push([yMap])
            } else {
              yArr.push([item])
            }
          })
          return yArr
        }

        // Initialize whereFilters with new nested structure
        const ensureWhereFiltersGroup = () => {
          const root = new Y.Map<any>()
          // Use deterministic UUID for test stability
          root.set('id', '00000000-0000-0000-0000-000000000000')
          root.set('op', 'AND')
          root.set('conditions', new Y.Array<any>())
          return root
        }
        dsl.set('whereFilters', ensureWhereFiltersGroup())

        // Initialize other arrays
        dsl.set('havingFilters', ensureYArray(vbi.havingFilters))
        dsl.set('measures', ensureYArray(vbi.measures))
        dsl.set('dimensions', ensureYArray(vbi.dimensions))
      })

      return new VBIBuilder(doc)
    },
  }
}

export const VBI = createVBI()
