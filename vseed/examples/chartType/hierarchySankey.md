# HierarchySankey

## 区域销售层次桑基图

展示销售额从区域流向国家再流向城市的层次桑基图。

```tsx preview 
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
  "chartType": "hierarchySankey",
  "dataset": [
    {
      "region": "Asia",
      "country": "China",
      "city": "Beijing",
      "sales": 30
    },
    {
      "region": "Asia",
      "country": "China",
      "city": "Shanghai",
      "sales": 20
    },
    {
      "region": "Asia",
      "country": "Japan",
      "city": "Tokyo",
      "sales": 10
    },
    {
      "region": "Europe",
      "country": "Germany",
      "city": "Berlin",
      "sales": 18
    },
    {
      "region": "Europe",
      "country": "Germany",
      "city": "Munich",
      "sales": 12
    },
    {
      "region": "Europe",
      "country": "France",
      "city": "Paris",
      "sales": 16
    }
  ],
  "dimensions": [
    {
      "id": "region",
      "alias": "Region"
    },
    {
      "id": "country",
      "alias": "Country"
    },
    {
      "id": "city",
      "alias": "City"
    }
  ],
  "measures": [
    {
      "id": "sales",
      "alias": "Sales"
    }
  ],
  "legend": {
    "enable": true,
    "position": "top"
  },
  "label": {
    "enable": true,
    "showDimension": true,
    "showValue": true
  },
  "tooltip": {
    "enable": true
  }
}

  return <VSeedRender vseed={vseedConfig} />
}
```

## 多层级维度 + 单指标

展示从大区到国家、再到渠道的层级流向，并通过单个指标控制流量大小。

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'hierarchySankey',
    dataset: [
      { region: '华北', country: '中国', channel: '直营', revenue: 42 },
      { region: '华北', country: '中国', channel: '代理', revenue: 18 },
      { region: '华东', country: '中国', channel: '直营', revenue: 36 },
      { region: '华东', country: '中国', channel: '电商', revenue: 22 },
      { region: '东南亚', country: '新加坡', channel: '直营', revenue: 15 },
      { region: '东南亚', country: '马来西亚', channel: '代理', revenue: 12 },
    ],
    dimensions: [
      { id: 'region', alias: '大区' },
      { id: 'country', alias: '国家' },
      { id: 'channel', alias: '渠道' },
    ],
    measures: [
      { id: 'revenue', alias: '营收' },
    ],
    legend: {
      enable: true,
      position: 'top',
    },
    label: {
      enable: true,
      showDimension: true,
      showValue: true,
    },
    tooltip: {
      enable: true,
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 指标名称作为层级维度 + 单指标

将“指标名称”本身放进层级路径中，展示每个大区下不同业务指标的流向，并通过单个数值指标控制大小。

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'hierarchySankey',
    dataset: [
      { region: '华北', metricName: '销售额', value: 42 },
      { region: '华北', metricName: '利润', value: 12 },
      { region: '华东', metricName: '销售额', value: 36 },
      { region: '华东', metricName: '利润', value: 10 },
      { region: '华南', metricName: '销售额', value: 28 },
      { region: '华南', metricName: '利润', value: 8 },
    ],
    dimensions: [
      { id: 'region', alias: '大区' },
      { id: 'metricName', alias: '指标名称' },
    ],
    measures: [
      { id: 'value', alias: '指标值' },
    ],
    legend: {
      enable: true,
      position: 'top',
    },
    label: {
      enable: true,
      showDimension: true,
      showValue: true,
    },
    tooltip: {
      enable: true,
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
