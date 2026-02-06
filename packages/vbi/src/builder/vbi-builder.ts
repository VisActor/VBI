import * as Y from 'yjs'

import { VSeedDSL } from '@visactor/vseed'
import { DimensionsBuilder } from './sub-builders/dimensions'
import { MeasuresBuilder } from './sub-builders/measures'
import { VBIDSL, VBIBuilderInterface, VBIMeasureTree, VBIMeasure, VBIDimensionTree, VBIDimension } from 'src/types'
import { buildVQuery } from 'src/pipeline'
import { ChartTypeBuilder } from './sub-builders/chart-type'
import { getConnector } from './connector'
import { VQueryDSL } from '@visactor/vquery'

export class VBIBuilder implements VBIBuilderInterface {
  public doc: Y.Doc
  public dsl: Y.Map<any>
  public undoManager: Y.UndoManager

  public chartType: ChartTypeBuilder
  public measures: MeasuresBuilder
  public dimensions: DimensionsBuilder

  constructor(doc: Y.Doc) {
    this.doc = doc
    this.dsl = doc.getMap('dsl') as Y.Map<any>

    this.undoManager = new Y.UndoManager(this.dsl)
    this.chartType = new ChartTypeBuilder(doc, this.dsl)
    this.measures = new MeasuresBuilder(doc, this.dsl)
    this.dimensions = new DimensionsBuilder(doc, this.dsl)
  }

  public applyUpdate(update: Uint8Array) {
    Y.applyUpdate(this.doc, update)
  }

  public encodeStateAsUpdate(targetStateVector?: Uint8Array) {
    return Y.encodeStateAsUpdate(this.doc, targetStateVector)
  }

  // 辅助函数：将 VBIMeasureTree 展开为平面的 VBIMeasure 数组
  private flattenMeasureTree(tree?: VBIMeasureTree): VBIMeasure[] {
    if (!tree) return []
    const result: VBIMeasure[] = []
    const traverse = (node: VBIMeasureTree[number]) => {
      if ('expr' in node) {
        // 这是 VBIMeasure
        result.push(node as VBIMeasure)
      } else {
        // 这是 VBIMeasureGroup，遍历 children
        if ('children' in node && node.children) {
          node.children.forEach((child) => traverse(child))
        }
      }
    }
    tree.forEach((node) => traverse(node))
    return result
  }

  // 辅助函数：将 VBIDimensionTree 展开为平面的 VBIDimension 数组
  private flattenDimensionTree(tree?: VBIDimensionTree): VBIDimension[] {
    if (!tree) return []
    const result: VBIDimension[] = []
    const traverse = (node: VBIDimensionTree[number]) => {
      if ('field' in node && !('children' in node)) {
        // 这是 VBIDimension
        result.push(node as VBIDimension)
      } else if ('children' in node) {
        // 这是 VBIDimensionGroup，遍历 children
        const group = node as any
        if (group.children) {
          group.children.forEach((child: any) => traverse(child))
        }
      }
    }
    tree.forEach((node) => traverse(node))
    return result
  }

  public buildVSeed = async (): Promise<VSeedDSL> => {
    const vbiDSL = this.build()
    const connectorId = vbiDSL.connectorId
    const connector = await getConnector(vbiDSL.connectorId)

    const queryDSL = this.buildVQuery()
    const schema = await connector.discoverSchema()
    const queryResult = await connector.query({ queryDSL, schema, connectorId })

    // 转换 VBI measures 为 VSeed measures 格式
    const flatMeasures = this.flattenMeasureTree(vbiDSL.measures)
    const vseedMeasures = flatMeasures.map((m) => ({
      id: m.alias || (m.expr?.type === 'field' ? m.expr.field : 'measure'),
      alias: m.alias,
      encoding: m.encoding,
    }))

    // 转换 VBI dimensions 为 VSeed dimensions 格式
    const flatDimensions = this.flattenDimensionTree(vbiDSL.dimensions)
    const vseedDimensions = flatDimensions.map((d) => ({
      id: d.field,
      alias: d.alias,
      encoding: d.encoding,
    }))

    return {
      chartType: vbiDSL.chartType,
      dataset: queryResult.dataset,
      measures: vseedMeasures,
      dimensions: vseedDimensions,
      theme: vbiDSL.theme,
      locale: vbiDSL.locale,
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
}
