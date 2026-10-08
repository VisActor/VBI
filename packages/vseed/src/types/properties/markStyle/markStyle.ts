import type { z } from 'zod'
import type { zMarkStyle } from './zMarkStyle'

export type MarkStyle = z.infer<typeof zMarkStyle>
