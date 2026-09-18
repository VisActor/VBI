import { resolveRoom } from './hocuspocus-handlers'

jest.mock('../common/vbi-doc', () => ({ toPrismaBytes: Uint8Array.from }))

describe('collaboration resource rooms', () => {
  it.each(['chart', 'insight'])('resolves %s rooms', (kind) => {
    const { id, handler } = resolveRoom(`${kind}:resource-1`)
    expect(id).toBe('resource-1')
    expect(handler.label.toLowerCase()).toBe(kind)
  })

  it.each(['report:archived-1', 'unknown:resource-1', 'chart:', 'insight:'])('rejects unsupported room %s', (room) =>
    expect(() => resolveRoom(room)).toThrow('Invalid room name'),
  )
})
