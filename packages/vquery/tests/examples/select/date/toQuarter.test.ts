import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './toQuarter.json'

describe('toQuarter', () => {
  it('toQuarter', async () => {
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
          "area": "SHANG HAI",
          "date": "2025-Q4",
          "sales": 600,
        },
        {
          "area": "HANG ZHOU",
          "date": "2025-Q3",
          "sales": 500,
        },
        {
          "area": "SHANG HAI",
          "date": "2025-Q4",
          "sales": 400,
        },
        {
          "area": "BEI JING",
          "date": "2025-Q3",
          "sales": 300,
        },
        {
          "area": "SHANG HAI",
          "date": "2025-Q4",
          "sales": 300,
        },
        {
          "area": "HANG ZHOU",
          "date": "2025-Q2",
          "sales": 200,
        },
        {
          "area": "BEI JING",
          "date": "2025-Q2",
          "sales": 200,
        },
        {
          "area": "BEI JING",
          "date": "2025-Q1",
          "sales": 100,
        },
        {
          "area": "HANG ZHOU",
          "date": "2025-Q1",
          "sales": 100,
        },
      ]
    `)
  })
})
