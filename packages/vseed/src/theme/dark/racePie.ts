import type { Player } from 'src/types'
import { getPieTheme } from './pie'
import { getDefaultDonutGeometry } from '../common/pie'
import { getDarkPlayer } from '../common'

export const getRacePieTheme = () => {
  const pieTheme = getPieTheme()
  const player = getDarkPlayer() as Player

  return {
    ...pieTheme,
    legend: {
      ...pieTheme.legend,
      enable: false,
    },
    player,
  }
}

export const getRaceDonutTheme = () => {
  return { ...getRacePieTheme(), ...getDefaultDonutGeometry() }
}
