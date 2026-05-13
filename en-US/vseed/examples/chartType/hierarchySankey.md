# HierarchySankey

## Regional Sales Hierarchy Sankey

A hierarchy sankey chart showing sales flowing from region to country to city.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'hierarchySankey',
    dataset: [
      {
        region: 'Asia',
        country: 'China',
        city: 'Beijing',
        sales: 30,
      },
      {
        region: 'Asia',
        country: 'China',
        city: 'Shanghai',
        sales: 20,
      },
      {
        region: 'Asia',
        country: 'Japan',
        city: 'Tokyo',
        sales: 10,
      },
      {
        region: 'Europe',
        country: 'Germany',
        city: 'Berlin',
        sales: 18,
      },
      {
        region: 'Europe',
        country: 'Germany',
        city: 'Munich',
        sales: 12,
      },
      {
        region: 'Europe',
        country: 'France',
        city: 'Paris',
        sales: 16,
      },
    ],
    dimensions: [
      {
        id: 'region',
        alias: 'Region',
      },
      {
        id: 'country',
        alias: 'Country',
      },
      {
        id: 'city',
        alias: 'City',
      },
    ],
    measures: [
      {
        id: 'sales',
        alias: 'Sales',
      },
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

## Multiple Hierarchy Dimensions + One Measure

This example shows a hierarchical flow from region to country and then to channel, with a single measure controlling the flow size.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'hierarchySankey',
    dataset: [
      { region: 'North China', country: 'China', channel: 'Direct', revenue: 42 },
      { region: 'North China', country: 'China', channel: 'Partner', revenue: 18 },
      { region: 'East China', country: 'China', channel: 'Direct', revenue: 36 },
      { region: 'East China', country: 'China', channel: 'E-commerce', revenue: 22 },
      { region: 'Southeast Asia', country: 'Singapore', channel: 'Direct', revenue: 15 },
      { region: 'Southeast Asia', country: 'Malaysia', channel: 'Partner', revenue: 12 },
    ],
    dimensions: [
      { id: 'region', alias: 'Region' },
      { id: 'country', alias: 'Country' },
      { id: 'channel', alias: 'Channel' },
    ],
    measures: [
      { id: 'revenue', alias: 'Revenue' },
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

## Measure Name As A Hierarchy Dimension + One Measure

This example places the measure name itself on the hierarchy path, so each region flows into different business metrics while a single numeric measure controls the magnitude.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'hierarchySankey',
    dataset: [
      { region: 'North China', metricName: 'Revenue', value: 42 },
      { region: 'North China', metricName: 'Profit', value: 12 },
      { region: 'East China', metricName: 'Revenue', value: 36 },
      { region: 'East China', metricName: 'Profit', value: 10 },
      { region: 'South China', metricName: 'Revenue', value: 28 },
      { region: 'South China', metricName: 'Profit', value: 8 },
    ],
    dimensions: [
      { id: 'region', alias: 'Region' },
      { id: 'metricName', alias: 'Metric Name' },
    ],
    measures: [
      { id: 'value', alias: 'Metric Value' },
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
