import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './between_operator.json'

describe('Where with BETWEEN / NOT BETWEEN Operator', () => {
  it('Where with BETWEEN / NOT BETWEEN Operator', async () => {
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
      `"select "id", "name", "age", "gender" from "where-between-operator" where (("age" between 18 and 30 and "gender" in ('male', 'female')) or ("age" not between 18 and 30 and not "gender" in ('male', 'female')))"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "age": 25,
          "gender": "female",
          "id": 1,
          "name": "Alice",
        },
        {
          "age": 30,
          "gender": "male",
          "id": 2,
          "name": "Bob",
        },
        {
          "age": 22,
          "gender": "female",
          "id": 5,
          "name": "Eve",
        },
      ]
    `)
  })
})
