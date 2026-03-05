import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { VQuery } from '@visactor/vquery'
import vqueryConfig from './toMinute.json'

describe('toMinute', () => {
  it('toMinute', async () => {
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
          "date": "2025-11-01 10:00",
          "sales": 600,
        },
        {
          "area": "HANG ZHOU",
          "date": "2025-01-01 10:45",
          "sales": 500,
        },
        {
          "area": "SHANG HAI",
          "date": "2025-11-01 10:30",
          "sales": 400,
        },
        {
          "area": "BEI JING",
          "date": "2025-01-01 10:45",
          "sales": 300,
        },
        {
          "area": "SHANG HAI",
          "date": "2025-11-01 10:45",
          "sales": 300,
        },
        {
          "area": "HANG ZHOU",
          "date": "2025-01-01 10:30",
          "sales": 200,
        },
        {
          "area": "BEI JING",
          "date": "2025-01-01 10:30",
          "sales": 200,
        },
        {
          "area": "BEI JING",
          "date": "2025-01-01 10:00",
          "sales": 100,
        },
        {
          "area": "HANG ZHOU",
          "date": "2025-01-01 10:00",
          "sales": 100,
        },
      ]
    `)
  })
})
