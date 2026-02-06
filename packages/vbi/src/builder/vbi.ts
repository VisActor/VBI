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
        if (vbi.locale) dsl.set('locale', vbi.locale)
        if (vbi.version) dsl.set('version', vbi.version)

        // Always create Y.Array for measures, converting plain arrays if needed
        const measuresArray = new Y.Array<any>()
        if (vbi.measures && Array.isArray(vbi.measures) && vbi.measures.length > 0) {
          for (const m of vbi.measures) {
            const yMap = new Y.Map<any>()
            for (const [key, value] of Object.entries(m as Record<string, any>)) {
              if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                const nestedMap = new Y.Map<any>()
                for (const [k, v] of Object.entries(value)) {
                  nestedMap.set(k, v)
                }
                yMap.set(key, nestedMap)
              } else {
                yMap.set(key, value)
              }
            }
            measuresArray.insert(measuresArray.length, [yMap])
          }
        }
        dsl.set('measures', measuresArray)

        // Always create Y.Array for dimensions, converting plain arrays if needed
        const dimensionsArray = new Y.Array<any>()
        if (vbi.dimensions && Array.isArray(vbi.dimensions) && vbi.dimensions.length > 0) {
          for (const d of vbi.dimensions) {
            const yMap = new Y.Map<any>()
            for (const [key, value] of Object.entries(d as Record<string, any>)) {
              if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                const nestedMap = new Y.Map<any>()
                for (const [k, v] of Object.entries(value)) {
                  nestedMap.set(k, v)
                }
                yMap.set(key, nestedMap)
              } else {
                yMap.set(key, value)
              }
            }
            dimensionsArray.insert(dimensionsArray.length, [yMap])
          }
        }
        dsl.set('dimensions', dimensionsArray)
      })

      return new VBIBuilder(doc)
    },
  }
}

export const VBI = createVBI()
