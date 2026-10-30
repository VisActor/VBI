import { VQuery } from '@visactor/vquery'
import type { DatasetColumn, RawDatasetSource } from '@visactor/vquery'

describe('VQuery Coverage', () => {
  let vquery: VQuery
  const datasetId = 'coverage_test_dataset'
  const schema: DatasetColumn[] = [{ name: 'id', type: 'string' }]
  const rawDataset: RawDatasetSource = {
    type: 'json',
    rawDataset: [{ id: '1' }],
  }

  beforeEach(async () => {
    vquery = new VQuery()
    await vquery.createDataset(datasetId, schema, rawDataset)
  })

  afterEach(async () => {
    try {
      if (await vquery.hasDataset(datasetId)) {
        await vquery.dropDataset(datasetId)
      }
    } catch {
      // ignore
    }
    await vquery.close()
  })

  it('should throw error when creating existing dataset', async () => {
    await expect(vquery.createDataset(datasetId, schema, rawDataset)).rejects.toThrow(
      `dataset ${datasetId} already exists`,
    )
  })

  it('should throw error when connecting to non-existent dataset', async () => {
    await expect(vquery.connectDataset('non_existent')).rejects.toThrow(
      'dataset non_existent not exists, please create it first',
    )
  })

  it('should list datasets', async () => {
    const datasets = await vquery.listDatasets()
    expect(datasets.length).toBeGreaterThan(0)
    expect(datasets.find((d) => d.datasetId === datasetId)).toBeDefined()
  })

  it('should update dataset source', async () => {
    const newRawDataset: RawDatasetSource = {
      type: 'json',
      rawDataset: [{ id: '2' }],
    }
    await vquery.updateDatasetSource(datasetId, schema, newRawDataset)
    const dataset = await vquery.connectDataset(datasetId)
    const result = await dataset.query({ select: ['id'] })
    expect(result.dataset).toEqual([{ id: '2' }])
  })

  it('should create and update a dataset without columns or a source', async () => {
    await vquery.dropDataset(datasetId)
    await vquery.createDataset(datasetId)
    await vquery.updateDatasetSource(datasetId)

    const dataset = (await vquery.listDatasets()).find((item) => item.datasetId === datasetId)
    expect(dataset?.datasetSchema.columns).toEqual([])
    expect(dataset?.datasetSource).toBeUndefined()
  })

  it('should connect with a temporary dataset source', async () => {
    const dataset = await vquery.connectDataset(datasetId, schema, {
      type: 'json',
      rawDataset: [{ id: 'temporary' }],
    })

    expect((await dataset.query({ select: ['id'] })).dataset).toEqual([{ id: 'temporary' }])
  })

  it('uses the connected schema for temporary sources and restores it on init', async () => {
    const dataset = await vquery.connectDataset(datasetId, [{ name: 'id', type: 'number' }], {
      type: 'json',
      rawDataset: [{ id: 42 }],
    })
    expect((await dataset.query({ select: [{ field: 'id', aggr: { func: 'sum' } }] })).dataset).toEqual([{ id: 42 }])
    expect((await vquery.listDatasets())[0].datasetSchema.columns).toEqual(schema)
    await dataset.init()
    expect((await dataset.query({ select: ['id'] })).dataset).toEqual([{ id: '1' }])
    await expect(dataset.query({ select: [{ field: 'id', aggr: { func: 'sum' } }] })).rejects.toThrow(
      'requires a number column',
    )
    await dataset.disconnect()
  })

  it('uses refreshed stored schema across existing connections', async () => {
    const first = await vquery.connectDataset(datasetId)
    await vquery.updateDatasetSource(datasetId, [{ name: 'id', type: 'number' }], {
      type: 'json',
      rawDataset: [{ id: 42 }],
    })
    const second = await vquery.connectDataset(datasetId)
    const query = { select: [{ field: 'id', alias: 'total', aggr: { func: 'sum' as const } }] }
    expect((await first.query(query)).dataset).toEqual([{ total: 42 }])
    expect((await second.query(query)).dataset).toEqual([{ total: 42 }])
    await second.disconnect()
  })

  it('should throw error when updating non-existent dataset', async () => {
    await expect(vquery.updateDatasetSource('non_existent', schema, rawDataset)).rejects.toThrow(
      'dataset non_existent not exists, please create it first',
    )
  })

  it('should drop dataset', async () => {
    await vquery.dropDataset(datasetId)
    expect(await vquery.hasDataset(datasetId)).toBe(false)
  })

  it('should throw error when dropping non-existent dataset', async () => {
    await expect(vquery.dropDataset('non_existent')).rejects.toThrow(
      'dataset non_existent not exists, please create it first',
    )
  })
})
