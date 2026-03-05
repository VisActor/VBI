import type { VQueryDSL } from '@visactor/vquery'
import type { VBIDSL } from '../dsl'
import type { VSeedDSL } from '@visactor/vseed'
import type { MeasuresBuilder, DimensionsBuilder, ChartTypeBuilder, HavingBuilder } from 'src/builder/sub-builders'
import type { EncodingBuilder } from 'src/builder/encoding-builder'
import type { Map, Doc, UndoManager } from 'yjs'

export interface VBIBuilderInterface {
  doc: Doc
  dsl: Map<any>
  undoManager: UndoManager

  chartType: ChartTypeBuilder
  measures: MeasuresBuilder
  dimensions: DimensionsBuilder
  having: HavingBuilder
  encoding: EncodingBuilder

  applyUpdate: (update: Uint8Array, origin?: any) => void
  encodeStateAsUpdate: (targetStateVector?: Uint8Array) => Uint8Array

  buildVSeed: () => Promise<VSeedDSL>
  buildVQuery: () => VQueryDSL
  build: () => VBIDSL
  getEncodings: (spec: any, measureNames?: string[]) => any[]
}
