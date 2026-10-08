import type { z } from 'zod'
import { zBarConfig } from './bar'
import { zColumnConfig } from './column'
import { zScatterConfig } from './scatter'
import { zPieGeometry } from './pieGeometry'
import { zPieStyle } from '../markStyle/zPieStyle'

import { zPlayer } from './player'

export const zRaceBarConfig = zBarConfig.extend({
  player: zPlayer.nullish(),
})
export const zRaceColumnConfig = zColumnConfig.extend({
  player: zPlayer.nullish(),
})
export const zRaceScatterConfig = zScatterConfig.extend({
  player: zPlayer.nullish(),
})
export const zRaceLineConfig = zScatterConfig.extend({
  player: zPlayer.nullish(),
})
export const zRacePieConfig = zScatterConfig.extend({
  ...zPieGeometry.shape,
  pieStyle: zPieStyle.nullish(),
  player: zPlayer.nullish(),
})
export const zRaceDonutConfig = zScatterConfig.extend({
  ...zPieGeometry.shape,
  pieStyle: zPieStyle.nullish(),
  player: zPlayer.nullish(),
})

export type RaceLineConfig = z.infer<typeof zRaceLineConfig>
export type RacePieConfig = z.infer<typeof zRacePieConfig>
export type RaceDonutConfig = z.infer<typeof zRaceDonutConfig>

export type RaceBarConfig = z.infer<typeof zRaceBarConfig>
export type RaceColumnConfig = z.infer<typeof zRaceColumnConfig>
export type RaceScatterConfig = z.infer<typeof zRaceScatterConfig>
