import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import vqueryConfig from './multi-conditions.json'

describe('Having Example with multiple conditions (AND/OR)', () => {
  it('Having Example with multiple conditions (AND/OR)', async () => {
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
      `"select "department", sum("salary") as "Total Salary", count("salary") as "Count" from "having-multi" group by "department" having (sum("salary") > 5000 and count("salary") > 1)"`,
    )

    const queryResult = await dataset.query(vqueryDSL as VQueryDSL<Record<string, string | number>>)

    await dataset.disconnect()
    await vquery.close()

    expect(queryResult.dataset).toMatchInlineSnapshot(`
      [
        {
          "Count": 2,
          "Total Salary": 11000,
          "department": "HR",
        },
        {
          "Count": 2,
          "Total Salary": 17000,
          "department": "Engineering",
        },
      ]
    `)
  })
})
