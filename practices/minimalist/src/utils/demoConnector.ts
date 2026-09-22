import { VBI, type VBIChartBuilder, type VBIConnector } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'

export const DEMO_CONNECTOR_ID = 'demo'
let registered = false

const schema = [
  'id:string',
  'order_id:string',
  'order_date:date',
  'delivery_date:date',
  'delivery_method:string',
  'customer_id:string',
  'customer_name:string',
  'customer_type:string',
  'city:string',
  'province:string',
  'country_or_region:string',
  'area:string',
  'product_id:string',
  'product_type:string',
  'product_sub_type:string',
  'product_name:string',
  'sales:number',
  'amount:number',
  'discount:number',
  'profit:number',
].map((item) => {
  const [name, type] = item.split(':')
  return { name, type }
})

export const registerDemoConnector = () => {
  if (registered) return DEMO_CONNECTOR_ID
  registered = true
  const vquery = new VQuery()
  VBI.connectors.register(
    DEMO_CONNECTOR_ID,
    async (): Promise<VBIConnector> => ({
      discoverSchema: async () => schema,
      query: async ({ queryDSL, schema }) => {
        if (!(await vquery.hasDataset(DEMO_CONNECTOR_ID))) {
          await vquery.createDataset(
            DEMO_CONNECTOR_ID,
            schema as DatasetColumn[],
            {
              type: 'csv',
              rawDataset: 'https://visactor.github.io/VBI/dataset/supermarket.csv',
            } as RawDatasetSource,
          )
        }
        const dataset = await vquery.connectDataset(DEMO_CONNECTOR_ID)
        const queryResult = await dataset.query(queryDSL as VQueryDSL<Record<string, string | number>>)
        return { dataset: queryResult.dataset }
      },
    }),
  )
  return DEMO_CONNECTOR_ID
}

export const createDefaultBuilder = (): VBIChartBuilder => {
  registerDemoConnector()
  return VBI.chart.create(VBI.chart.createEmpty(DEMO_CONNECTOR_ID))
}
