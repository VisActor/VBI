import { VBI } from '@visactor/vbi'
import type { DatasetColumn, RawDatasetSource, VQueryDSL } from '@visactor/vquery'

export const DEMO_CONNECTOR_ID = 'demoSupermarket'

const SUPERMARKET_SCHEMA: Array<{ name: string; type: string }> = [
  { name: 'id', type: 'string' },
  { name: 'order_id', type: 'string' },
  { name: 'order_date', type: 'string' },
  { name: 'delivery_date', type: 'string' },
  { name: 'delivery_method', type: 'string' },
  { name: 'customer_id', type: 'string' },
  { name: 'customer_name', type: 'string' },
  { name: 'customer_type', type: 'string' },
  { name: 'city', type: 'string' },
  { name: 'province', type: 'string' },
  { name: 'country_or_region', type: 'string' },
  { name: 'area', type: 'string' },
  { name: 'product_id', type: 'string' },
  { name: 'product_type', type: 'string' },
  { name: 'product_sub_type', type: 'string' },
  { name: 'product_name', type: 'string' },
  { name: 'sales', type: 'number' },
  { name: 'amount', type: 'number' },
  { name: 'discount', type: 'number' },
  { name: 'profit', type: 'number' },
]

let registered = false

export const registerDemoConnector = () => {
  if (registered) {
    return
  }
  registered = true

  VBI.connectors.register(DEMO_CONNECTOR_ID, async () => {
    const { VQuery } = await import('@visactor/vquery')
    const vquery = new VQuery()
    let datasetReady: Promise<void> | undefined

    return {
      discoverSchema: async () => {
        return SUPERMARKET_SCHEMA
      },
      query: async ({ queryDSL }) => {
        const url = 'https://visactor.github.io/VBI/dataset/supermarket.csv'
        const datasetSource: RawDatasetSource = {
          type: 'csv',
          rawDataset: url,
        }
        datasetReady ??= (async () => {
          if (!(await vquery.hasDataset(DEMO_CONNECTOR_ID))) {
            await vquery.createDataset(DEMO_CONNECTOR_ID, SUPERMARKET_SCHEMA as DatasetColumn[], datasetSource)
          }
        })().catch((error) => {
          datasetReady = undefined
          throw error
        })
        await datasetReady
        const dataset = await vquery.connectDataset(
          DEMO_CONNECTOR_ID,
          SUPERMARKET_SCHEMA as DatasetColumn[],
          datasetSource,
        )
        const queryResult = await dataset.query(queryDSL as VQueryDSL<any>)
        await dataset.disconnect()

        return {
          dataset: queryResult.dataset,
        }
      },
    }
  })
}
