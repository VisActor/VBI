import { scatterLoop } from 'src/pipeline/spec/chart/pipes/animation/scatter'

describe('scatter animation', () => {
  it('should use scale channels for breath atmosphere', () => {
    const result = scatterLoop(
      {
        enable: true,
        interval: 2000,
        atmosphere: { effect: 'breath', ease: 'linear' },
      },
      false,
    ) as any
    const breath = result.point[0]

    expect(breath.channel.scaleX).toEqual({ from: 0.8, to: 2 })
    expect(breath.channel.scaleY).toEqual({ from: 0.8, to: 2 })
  })
})
