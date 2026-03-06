import * as Y from 'yjs'

import { VSeedDSL } from '@visactor/vseed'
import { DimensionsBuilder } from './sub-builders/dimensions'
import { MeasuresBuilder } from './sub-builders/measures'
import { VBIDSL, VBIBuilderInterface } from 'src/types'
import { buildVQuery } from 'src/pipeline'
import { ChartTypeBuilder } from './sub-builders/chart-type'
import { HavingBuilder } from './sub-builders/having'
import { getConnector } from './connector'
import { VQueryDSL } from '@visactor/vquery'
import { EncodingBuilder } from './encoding-builder'

export class VBIBuilder implements VBIBuilderInterface {
  public doc: Y.Doc
  public dsl: Y.Map<any>
  public undoManager: Y.UndoManager

  public chartType: ChartTypeBuilder
  public measures: MeasuresBuilder
  public dimensions: DimensionsBuilder
  public having: HavingBuilder
  public encoding: EncodingBuilder

  constructor(doc: Y.Doc) {
    this.doc = doc
    this.dsl = doc.getMap('dsl') as Y.Map<any>

    this.undoManager = new Y.UndoManager(this.dsl)
    this.chartType = new ChartTypeBuilder(doc, this.dsl)
    this.measures = new MeasuresBuilder(doc, this.dsl)
    this.dimensions = new DimensionsBuilder(doc, this.dsl)
    this.having = new HavingBuilder(doc, this.dsl)
    this.encoding = new EncodingBuilder()
  }

  public applyUpdate(update: Uint8Array) {
    Y.applyUpdate(this.doc, update)
  }

  public encodeStateAsUpdate(targetStateVector?: Uint8Array) {
    return Y.encodeStateAsUpdate(this.doc, targetStateVector)
  }

  public buildVSeed = async (): Promise<VSeedDSL> => {
    const vbiDSL = this.build()
    const connectorId = vbiDSL.connectorId
    const connector = await getConnector(vbiDSL.connectorId)

    const queryDSL = this.buildVQuery()
    const schema = await connector.discoverSchema()
    const queryResult = await connector.query({ queryDSL, schema, connectorId })

    // 将 VBI DSL 的 measures/dimensions 转换为 VSeed 格式
    const mapMeasures = (tree: any[]): any[] => {
      return tree.map((node) => {
        if (MeasuresBuilder.isMeasureNode(node)) {
          return {
            id: node.field, // field → id
            alias: node.alias,
            encoding: node.encoding,
          }
        } else {
          return {
            alias: node.alias,
            children: mapMeasures(node.children),
          }
        }
      })
    }

    const mapDimensions = (tree: any[]): any[] => {
      return tree.map((node) => {
        if (DimensionsBuilder.isDimensionNode(node)) {
          return {
            id: node.field, // field → id
            alias: node.alias,
          }
        } else {
          return {
            alias: node.alias,
            children: mapDimensions(node.children),
          }
        }
      })
    }

    return {
      chartType: vbiDSL.chartType,
      dataset: queryResult.dataset,
      measures: vbiDSL.measures.length > 0 ? mapMeasures(vbiDSL.measures) : undefined,
      dimensions: vbiDSL.dimensions.length > 0 ? mapDimensions(vbiDSL.dimensions) : undefined,
    } as VSeedDSL
  }

  public buildVQuery = (): VQueryDSL => {
    const vbiDSL = this.build()
    return buildVQuery(vbiDSL, this)
  }

  public build = (): VBIDSL => {
    return this.dsl.toJSON() as VBIDSL
  }

  public getSchema = async () => {
    const connectorId = this.dsl.get('connectorId')
    const con = await getConnector(connectorId)
    const result = await con.discoverSchema()
    return result
  }

  /**
   * Get measure encoding information from a VChart spec
   * @param spec VChart spec to analyze
   * @param measureNames List of measure names
   * @returns Array of {encoding, measures} pairs
   */
  public getEncodings(spec: any, measureNames: string[] = []) {
    return this.encoding.getMeasureEncodings(spec, measureNames)
  }
}
