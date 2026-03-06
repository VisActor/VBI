import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './toSecond.json'

describe('toSecond', () => {
  it('toSecond', async () => {
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
          "Sum(sales)": 600,
          "area": "SHANG HAI",
          "second": "2025-11-01 10:00:00",
        },
        {
          "Sum(sales)": 500,
          "area": "HANG ZHOU",
          "second": "2025-01-01 10:00:45",
        },
        {
          "Sum(sales)": 400,
          "area": "SHANG HAI",
          "second": "2025-11-01 10:00:30",
        },
        {
          "Sum(sales)": 300,
          "area": "BEI JING",
          "second": "2025-01-01 10:00:45",
        },
        {
          "Sum(sales)": 300,
          "area": "SHANG HAI",
          "second": "2025-11-01 10:00:45",
        },
        {
          "Sum(sales)": 200,
          "area": "HANG ZHOU",
          "second": "2025-01-01 10:00:30",
        },
        {
          "Sum(sales)": 200,
          "area": "BEI JING",
          "second": "2025-01-01 10:00:30",
        },
        {
          "Sum(sales)": 100,
          "area": "BEI JING",
          "second": "2025-01-01 10:00:00",
        },
        {
          "Sum(sales)": 100,
          "area": "HANG ZHOU",
          "second": "2025-01-01 10:00:00",
        },
      ]
    `)
  })
})
