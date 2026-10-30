import type { VQueryDSL } from '@visactor/vquery'
import type { VBIQueryDSL } from 'src/types/queryDSL'

export type buildPipeContext = {
  vbiDSL: VBIQueryDSL
}

export type buildPipe = (queryDSL: VQueryDSL, context: buildPipeContext) => VQueryDSL
