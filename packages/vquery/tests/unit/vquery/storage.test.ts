import { VQuery as BrowserVQuery, type VQueryOptions } from '../../../src/browser'
import { VQuery as NodeVQuery } from '../../../src/node'

const originalIndexedDB = Object.getOwnPropertyDescriptor(globalThis, 'indexedDB')

beforeEach(() => {
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    get: () => {
      throw new Error('IndexedDB unavailable')
    },
  })
})

afterEach(() => {
  rstest.restoreAllMocks()
  if (originalIndexedDB) Object.defineProperty(globalThis, 'indexedDB', originalIndexedDB)
  else Reflect.deleteProperty(globalThis, 'indexedDB')
})

for (const [entrypoint, VQuery] of [
  ['browser', BrowserVQuery],
  ['node', NodeVQuery],
] as const) {
  describe(`${entrypoint} dataset storage`, () => {
    const defaults: Array<[string, VQueryOptions | undefined]> = [
      ['no options', undefined],
      ['empty options', {}],
      ['explicitly disabled', { enableIndexedDB: false }],
    ]

    for (const [name, options] of defaults) {
      it(`queries isolated memory datasets without IndexedDB: ${name}`, async () => {
        const vquery = new VQuery(options)
        const other = new VQuery(options)
        const columns = [{ name: 'sales', type: 'number' as const }]
        try {
          await vquery.createDataset('sales', columns, {
            type: 'json',
            rawDataset: [{ sales: 10 }, { sales: 20 }],
          })
          const dataset = await vquery.connectDataset('sales')
          expect(
            (
              await dataset.query({
                select: [{ field: 'sales', alias: 'total', aggr: { func: 'sum' } }],
              })
            ).dataset,
          ).toEqual([{ total: 30 }])
          expect(await other.listDatasets()).toEqual([])

          await vquery.updateDatasetSource('sales', columns, { type: 'json', rawDataset: [{ sales: 50 }] })
          const updated = await vquery.connectDataset('sales')
          expect((await updated.query({ select: ['sales'] })).dataset).toEqual([{ sales: 50 }])
          await vquery.dropDataset('sales')
          expect(await vquery.hasDataset('sales')).toBe(false)
        } finally {
          await vquery.close()
          await other.close()
        }
      })
    }

    it('opens IndexedDB lazily when explicitly enabled and closes it', async () => {
      const close = rstest.fn()
      const getAll = rstest.fn(() => {
        const request = { result: [], onsuccess: undefined as (() => void) | undefined }
        queueMicrotask(() => request.onsuccess?.())
        return request
      })
      const transaction = rstest.fn(() => ({ objectStore: () => ({ getAll }) }))
      const open = rstest.fn(() => {
        const request = {
          result: { close, transaction },
          onsuccess: undefined as ((event: unknown) => void) | undefined,
        }
        queueMicrotask(() => request.onsuccess?.({ target: request }))
        return request
      })
      Object.defineProperty(globalThis, 'indexedDB', { configurable: true, value: { open } })
      const vquery = new VQuery({ enableIndexedDB: true })
      expect(open).not.toHaveBeenCalled()
      try {
        expect(await vquery.listDatasets()).toEqual([])
        expect(await vquery.listDatasets()).toEqual([])
        expect(open).toHaveBeenCalledTimes(1)
        expect(open).toHaveBeenCalledWith('vquery', 2)
        expect(transaction).toHaveBeenCalledWith(['vqueryDatasets'], 'readonly')
        expect(getAll).toHaveBeenCalledTimes(2)
      } finally {
        await vquery.close()
      }
      expect(close).toHaveBeenCalledTimes(1)
    })

    it('reports unavailable IndexedDB when explicitly enabled', async () => {
      const vquery = new VQuery({ enableIndexedDB: true })
      await expect(vquery.listDatasets()).rejects.toThrow('IndexedDB unavailable')
    })
  })
}
