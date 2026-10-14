import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './single_value_in.json'

describe('Where with Single Value IN / NOT IN', () => {
  it('Where with Single Value IN / NOT IN', async () => {
    const vquery = new VQuery()
    const { datasetId, schema, dataset: rawDataset, vquery: vqueryDSL } = vqueryConfig

    if (await vquery.hasDataset(datasetId)) {
      await vquery.dropDataset(datasetId)
    }

    if (!(await vquery.hasDataset(datasetId))) {
      await vquery.createDataset(datasetId, schema as DatasetColumn[], { type: 'json', rawDataset })
    }

    const dataset = await vquery.connectDataset(datasetId)

    const sql = convertDSLToDuckDB(vqueryDSL as VQueryDSL<Record<string, string | number>>, datasetId)

    expect(sql).toMatchInlineSnapshot(
      `"select "id", "name", "age", "gender" from "where-single-value-in" where ("gender" in ('male') or not "gender" in ('female'))"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "age": 30,
          "gender": "male",
          "id": 2,
          "name": "Bob",
        },
        {
          "age": 17,
          "gender": "male",
          "id": 3,
          "name": "Charlie",
        },
        {
          "age": 15,
          "gender": "male",
          "id": 4,
          "name": "David",
        },
      ]
    `)
  })
})
