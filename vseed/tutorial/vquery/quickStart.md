# 快速开始

## csv

```ts pure
const vquery = new VQuery()

const datasets = await vquery.listDatasets()

const url = 'https://visactor.github.io/VBI/dataset/supermarket.csv'

const datasetSchema = {
  datasetId: 'supermarket',
  datasetAlias: 'supermarket',
  columns: [
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
  ],
}

if (!datasets.find((d) => d.datasetId === datasetSchema.datasetId)) {
  await vquery.createDataset(datasetSchema.datasetId, url, 'csv', datasetSchema)
}

const dataset = await vquery.connectDataset(datasetSchema.datasetId)

const sql = `
	SELECT
		strftime('%Y-%m-%d', order_date) AS Date,
		SUM(sales) AS Sales
		FROM ${datasetSchema.datasetId}
		GROUP BY Date
		ORDER BY Date
`
const queryResult = await dataset.queryBySQL(sql)
```

## json

```ts pure
const vquery = new VQuery()

const datasets = await vquery.listDatasets()

const datasetSchema = {
  datasetId: 'arrayObject',
  datasetAlias: 'arrayObject',
  columns: [
    { name: 'area', type: 'string' },
    { name: 'sales', type: 'number' },
    { name: 'date', type: 'date' },
  ],
}
const values = [
  { area: '北京', date: '2025-11-06', sales: 100 },
  { area: '上海', date: '2025-11-06', sales: 100 },
]

if (!datasets.find((d) => d.datasetId === datasetSchema.datasetId)) {
  await vquery.createDataset(datasetSchema.datasetId, values, 'json', datasetSchema)
}

const dataset = await vquery.connectDataset(datasetSchema.datasetId)

const sql = `
  SELECT
    strftime('%Y-%m-%d', date) AS Date,
    SUM(sales) AS Sales
  FROM ${datasetSchema.datasetId}
  GROUP BY Date
  ORDER BY Date
`

const queryResult = await dataset.queryBySQL(sql)
```

## queryWithTempView

```ts pure
const vquery = new VQuery()

const datasets = await vquery.listDatasets()

const datasetSchema = {
  datasetId: 'arrayObject',
  datasetAlias: 'arrayObject',
}
const values = [
  { area: '北京', date: '2025-11-06', sales: 100 },
  { area: '上海', date: '2025-11-06', sales: 100 },
]

if (!datasets.find((d) => d.datasetId === datasetSchema.datasetId)) {
  await vquery.createDataset(datasetSchema.datasetId, values, 'json', datasetSchema)
}

const temporaryStructs = [
  { name: 'area', type: 'string' },
  { name: 'sales', type: 'number' },
  { name: 'date', type: 'date' },
]
const dataset = await vquery.connectTemporaryDataset(datasetSchema.datasetId, temporaryStructs)

const sql = `
  SELECT
    strftime('%Y-%m-%d', date) AS Date,
    SUM(sales) AS Sales
  FROM ${datasetSchema.datasetId}
  GROUP BY Date
  ORDER BY Date
`

const queryResult = await dataset.queryBySQL(sql)
await dataset.disconnect()
```
