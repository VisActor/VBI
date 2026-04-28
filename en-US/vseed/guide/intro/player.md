# Player

VSeed supports the `player` property to enable automatic data playback.

## Race Scatter


```tsx
const vseed = {
  chartType: 'raceScatter',
  dimensions: [
    { id: 'year',    encoding: 'player' },
    { id: 'region',  encoding: 'color'  },
    { id: 'country', encoding: 'label'  },
  ],
  measures: [
    { id: 'income',         encoding: 'xAxis' },
    { id: 'lifeExpectancy', encoding: 'yAxis' },
    { id: 'population',     encoding: 'size'  },
  ],
  dataset: [......],
}
```

## Race Bar


```tsx
const vseed = {
  chartType: 'raceBar',
  dimensions: [
    { id: 'name', encoding: 'yAxis' },
    { id: 'category', encoding: 'color' },
    { id: 'year', encoding: 'player' },
  ],
  measures: [{ id: 'value', encoding: 'xAxis' }],
  dataset: [......],
}
```

## Race Column


```tsx
const vseed = {
  chartType: 'raceColumn',
  dimensions: [
    { id: 'name', encoding: 'xAxis' },
    { id: 'category', encoding: 'color' },
    { id: 'year', encoding: 'player' },
  ],
  measures: [{ id: 'value', encoding: 'yAxis' }],
  dataset: [......]
}
```

## Race Line


```tsx
const vseed = {
  chartType: 'raceLine',
  dimensions: [
    { id: 'date', encoding: 'xAxis' },
    { id: 'category', encoding: 'color' },
  ],
  measures: [{ id: 'sales', encoding: 'yAxis' }],
  dataset: [......],
  config: {
    raceLine: {
      player: {
        autoPlay: true,
        interval: 1000,
        maxCount: 4,
      },
    },
  },
}
```

## Race Pie


```tsx
const vseed = {
  chartType: 'racePie',
  dimensions: [
    { id: 'date', encoding: 'player' },
    { id: 'category', encoding: 'color' },
  ],
  measures: [{ id: 'sales', encoding: 'angle' }],
  dataset: [......],
  config: {
    racePie: {
      player: {
        autoPlay: true,
        interval: 1000,
      },
    },
  },
}
```

## Race Donut


```tsx
const vseed = {
  chartType: 'raceDonut',
  dimensions: [
    { id: 'date', encoding: 'player' },
    { id: 'category', encoding: 'color' },
  ],
  measures: [{ id: 'sales', encoding: 'angle' }],
  dataset: [......],
  config: {
    raceDonut: {
      player: {
        autoPlay: true,
        interval: 1000,
      },
    },
  },
}
```
