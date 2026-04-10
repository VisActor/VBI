# Totals

## Column Totals/Subtotals

Testing Total/Subtotal functionality with multiple measures.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    totals: {
      column: {
        showGrandTotals: true,
        showSubTotals: true,
        subTotalsDimensions: ['co_20260225121632_6410'],
      },
    },
    indicatorsAsCol: true,
    dimensions: [
      {
        id: 'co_20260225121632_6410',
        alias: 'order_date',
        encoding: 'column',
        autoFormat: true,
      },
      {
        id: 'ro_20260225121638_4cd6',
        alias: 'area',
        encoding: 'row',
        autoFormat: true,
      },
      {
        id: 'co_20260228165640_e677',
        alias: 'product_type',
        encoding: 'column',
        autoFormat: true,
      },
    ],
    measures: [
      {
        id: 'de_20260225121003_c2b8',
        alias: 'sales',
        encoding: 'detail',
        numFormat: {
          fractionDigits: 2,
          thousandSeparator: true,
          type: 'number',
        },
      },
      {
        id: 'de_20260225121006_9e24',
        alias: 'amount',
        encoding: 'detail',
      },
    ],
    chartType: 'pivotTable',
    dataset: [
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '189897.34399999998',
        de_20260225121006_9e24: '642',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '158716.76799999998',
        de_20260225121006_9e24: '689',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '243815.0119999999',
        de_20260225121006_9e24: '957',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '232243.92799999993',
        de_20260225121006_9e24: '1334',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '60857.328000000016',
        de_20260225121006_9e24: '228',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '42949.53600000001',
        de_20260225121006_9e24: '179',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '53203.44400000001',
        de_20260225121006_9e24: '254',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '110860.48399999998',
        de_20260225121006_9e24: '309',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '177054.88500000004',
        de_20260225121006_9e24: '242',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '157101.47599999997',
        de_20260225121006_9e24: '295',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '229175.30999999988',
        de_20260225121006_9e24: '389',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '357366.7300000001',
        de_20260225121006_9e24: '544',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '61369.644',
        de_20260225121006_9e24: '101',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '63285.32',
        de_20260225121006_9e24: '76',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '99101.74399999999',
        de_20260225121006_9e24: '127',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '92455.72',
        de_20260225121006_9e24: '164',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '133053.53600000002',
        de_20260225121006_9e24: '223',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '160068.132',
        de_20260225121006_9e24: '233',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '281681.4280000001',
        de_20260225121006_9e24: '389',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '361392.9199999999',
        de_20260225121006_9e24: '526',
        ro_20260225121638_4cd6: 'Northeast',
      },
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '59203.787999999986',
        de_20260225121006_9e24: '106',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '55404.69200000001',
        de_20260225121006_9e24: '74',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '48788.488',
        de_20260225121006_9e24: '64',
        ro_20260225121638_4cd6: 'Northwest',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '67559.408',
        de_20260225121006_9e24: '103',
        ro_20260225121638_4cd6: 'Northwest',
      },
    ],
    theme: 'light',
    locale: 'en-US',
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Row Totals/Subtotals

Testing Total/Subtotal functionality with multiple measures.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    measures: [
      {
        id: 'de_20260225121003_c2b8',
        alias: 'sales',
        encoding: 'detail',
        format: {
          auto: false,
          fractionDigits: 4,
          thousandSeparator: true,
          type: 'number',
        },
      },
      {
        id: 'de_20260225121006_9e24',
        alias: 'amount',
        encoding: 'detail',
      },
    ],
    dimensions: [
      {
        id: 'co_20260225121207_98b0',
        alias: 'country_or_region',
        encoding: 'column',
        autoFormat: true,
      },
      {
        id: 'co_20260225121042_2f3c',
        alias: 'area',
        encoding: 'column',
        autoFormat: true,
      },
      {
        id: 'ro_20260225121050_3d35',
        alias: 'order_date',
        encoding: 'row',
        autoFormat: true,
      },
      {
        id: 'ro_20260228140812_42ab',
        alias: 'product_type',
        encoding: 'row',
        autoFormat: true,
      },
    ],
    chartType: 'pivotTable',
    dataset: [
      {
        co_20260225121042_2f3c: 'Central South',
        co_20260225121207_98b0: 'China',
        de_20260225121003_c2b8: '3304.7',
        de_20260225121006_9e24: '5',
        ro_20260225121050_3d35: '2016-01-01',
        ro_20260228140812_42ab: 'Office Supplies',
      },
      {
        co_20260225121042_2f3c: 'Northeast',
        co_20260225121207_98b0: 'China',
        de_20260225121003_c2b8: '572.88',
        de_20260225121006_9e24: '4',
        ro_20260225121050_3d35: '2017-01-01',
        ro_20260228140812_42ab: 'Office Supplies',
      },
      {
        co_20260225121042_2f3c: 'Central South',
        co_20260225121207_98b0: 'China',
        de_20260225121003_c2b8: '5288.85',
        de_20260225121006_9e24: '3',
        ro_20260225121050_3d35: '2016-01-01',
        ro_20260228140812_42ab: 'Furniture',
      },
      {
        co_20260225121042_2f3c: 'Central South',
        co_20260225121207_98b0: 'China',
        de_20260225121003_c2b8: '3332.7',
        de_20260225121006_9e24: '6',
        ro_20260225121050_3d35: '2016-01-01',
        ro_20260228140812_42ab: 'Technology',
      },
    ],
    theme: 'light',
    totals: {
      row: {
        showGrandTotals: true,
        showSubTotals: true,
        subTotalsDimensions: ['ro_20260225121050_3d35'],
      },
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## Single Measure Totals/Subtotals

Testing Basic Total/Subtotal functionality with a single measure.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    totals: {
      row: {
        showGrandTotals: true,
        showSubTotals: true,
        subTotalsDimensions: ['ro_20260228173909_150e'],
      },
      column: {
        showGrandTotals: true,
        showSubTotals: true,
        subTotalsDimensions: ['co_20260225121632_6410'],
      },
    },
    measures: [
      {
        id: 'de_20260225121003_c2b8',
        alias: 'sales',
        encoding: 'detail',
        format: {
          auto: true,
          fractionDigits: 2,
          thousandSeparator: true,
          type: 'number',
        },
        autoFormat: true,
      },
    ],
    dimensions: [
      {
        id: 'co_20260225121632_6410',
        alias: 'order_date',
        encoding: 'column',
        autoFormat: true,
      },
      {
        id: 'ro_20260228173909_150e',
        alias: 'country_or_region',
        encoding: 'row',
        autoFormat: true,
      },
      {
        id: 'ro_20260225121638_4cd6',
        alias: 'area',
        encoding: 'row',
        autoFormat: true,
      },
      {
        id: 'co_20260228165640_e677',
        alias: 'product_type',
        encoding: 'column',
        autoFormat: true,
      },
    ],
    chartType: 'pivotTable',
    dataset: [
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '189897.34399999998',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '158716.76799999998',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '243815.0119999999',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '232243.92799999993',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '60857.328000000016',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '42949.53600000001',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '53203.44400000001',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Office Supplies',
        de_20260225121003_c2b8: '110860.48399999998',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '177054.88500000004',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '157101.47599999997',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '229175.30999999988',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '357366.7300000001',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '61369.644',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '63285.32',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '99101.74399999999',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Furniture',
        de_20260225121003_c2b8: '92455.72',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '133053.53600000002',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '160068.132',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '281681.4280000001',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '361392.9199999999',
        ro_20260225121638_4cd6: 'Northeast',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2016-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '59203.787999999986',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2017-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '55404.69200000001',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2018-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '48788.488',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
      {
        co_20260225121632_6410: '2019-01-01',
        co_20260228165640_e677: 'Technology',
        de_20260225121003_c2b8: '67559.408',
        ro_20260225121638_4cd6: 'Northwest',
        ro_20260228173909_150e: 'China',
      },
    ],
    theme: 'light',
    locale: 'en-US',
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
