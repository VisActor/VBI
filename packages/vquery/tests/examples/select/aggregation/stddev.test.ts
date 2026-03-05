import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './stddev.json'

describe('Select Stddev Example', () => {
  it('Select Stddev Example', async () => {
    const vquery = new VQuery()
    const { datasetId, schema, dataset: rawDataset, vquery: vqueryDSL } = vqueryConfig

    if (await vquery.hasDataset(datasetId)) {
      await vquery.dropDataset(datasetId)
    }

    if (!(await vquery.hasDataset(datasetId))) {
      await vquery.createDataset(datasetId, schema as DatasetColumn[], { type: 'json', rawDataset })
    }

    const dataset = await vquery.connectDataset(datasetId)

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "salary": 1870.8286933869706,
        },
      ]
    `)
  })
})
