import { z } from 'zod'

export const VBI_SUPPORTED_ENCODINGS = [
  'yAxis',
  'xAxis',
  'color',
  'label',
  'tooltip',
  'size'
] as const

export const zVBIEncoding = z.enum(VBI_SUPPORTED_ENCODINGS)
export type VBIEncoding = z.infer<typeof zVBIEncoding>
