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
          "Sum(sales)": 1300,
          "area": "SHANG HAI",
          "quarter": "2025-Q4",
        },
        {
          "Sum(sales)": 500,
          "area": "HANG ZHOU",
          "quarter": "2025-Q3",
        },
        {
          "Sum(sales)": 300,
          "area": "BEI JING",
          "quarter": "2025-Q3",
        },
        {
          "Sum(sales)": 200,
          "area": "HANG ZHOU",
          "quarter": "2025-Q2",
        },
        {
          "Sum(sales)": 200,
          "area": "BEI JING",
          "quarter": "2025-Q2",
        },
        {
          "Sum(sales)": 100,
          "area": "BEI JING",
          "quarter": "2025-Q1",
        },
        {
          "Sum(sales)": 100,
          "area": "HANG ZHOU",
          "quarter": "2025-Q1",
        },
      ]
    `)
  })
})
