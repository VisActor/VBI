import * as Y from 'yjs'

import { VSeedDSL } from '@visactor/vseed'
import { VQueryDSL } from '@visactor/vquery'
import { DimensionsBuilder } from './sub-builders/dimensions'
import { MeasuresBuilder } from './sub-builders/measures'
import { HavingFiltersBuilder } from './sub-builders/havingFilters'
import { WhereFilterGroupBuilder, createWhereFilterBuilder } from './sub-builders'
import { ChartTypeBuilder } from './sub-builders'

import { VBIDSL, VBIBuilderInterface } from 'src/types'
import { buildVQuery } from 'src/pipeline'
import { getConnector } from './connector'

export class VBIBuilder implements VBIBuilderInterface {
  public doc: Y.Doc
  public dsl: Y.Map<any>
  public undoManager: Y.UndoManager

  public chartType: ChartTypeBuilder
  public measures: MeasuresBuilder
  public dimensions: DimensionsBuilder
  public havingFilters: HavingFiltersBuilder
  public whereFilters: WhereFilterGroupBuilder

  constructor(doc: Y.Doc) {
    this.doc = doc
    this.dsl = doc.getMap('dsl') as Y.Map<any>

    this.undoManager = new Y.UndoManager(this.dsl)
    this.chartType = new ChartTypeBuilder(doc, this.dsl)
    this.measures = new MeasuresBuilder(doc, this.dsl)
    this.dimensions = new DimensionsBuilder(doc, this.dsl)
    this.havingFilters = new HavingFiltersBuilder(doc, this.dsl)
    this.whereFilters = createWhereFilterBuilder(doc, this.dsl)
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

    return {
      chartType: vbiDSL.chartType,
      dataset: queryResult.dataset,
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

  public setLimit(limit: number): this {
    this.dsl.set('limit', limit)
    return this
  }

  public setLocale(locale: string): this {
    this.dsl.set('locale', locale)
    return this
  }

  public setTheme(theme: string): this {
    this.dsl.set('theme', theme)
    return this
  }
}
