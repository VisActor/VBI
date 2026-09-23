import { VBI, type VBIChartBuilder, type VBIConnector } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'

export const DEMO_CONNECTOR_ID = 'demo'

let registered = false

export const registerDemoConnector = () => {
  if (registered) return DEMO_CONNECTOR_ID
  registered = true

  const vquery = new VQuery()
  VBI.connectors.register(DEMO_CONNECTOR_ID, async (): Promise<VBIConnector> => {
    return {
      discoverSchema: async () => {
        return [
          { name: 'id', type: 'string' },
          { name: 'order_id', type: 'string' },
          { name: 'order_date', type: 'date' },
          { name: 'delivery_date', type: 'date' },
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
      },
      query: async ({ queryDSL, schema }) => {
        if (!(await vquery.hasDataset(DEMO_CONNECTOR_ID))) {
          const url = 'https://visactor.github.io/VBI/dataset/supermarket.csv'
          const datasetSource = { type: 'csv', rawDataset: url }
          await vquery.createDataset(DEMO_CONNECTOR_ID, schema as DatasetColumn[], datasetSource as RawDatasetSource)
        }
        const dataset = await vquery.connectDataset(DEMO_CONNECTOR_ID)
        const queryResult = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)

        return {
          dataset: queryResult.dataset,
        }
      },
    }
  })
  return DEMO_CONNECTOR_ID
}

export const createDefaultBuilder = (): VBIChartBuilder => {
  registerDemoConnector()
  return VBI.chart.create(VBI.chart.createEmpty(DEMO_CONNECTOR_ID))
}

export const initDemoConnector = async () => {
  registerDemoConnector()
}
