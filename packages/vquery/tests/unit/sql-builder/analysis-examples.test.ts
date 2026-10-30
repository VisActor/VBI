import { VQuery, type DatasetColumn, type VQueryDSL } from '@visactor/vquery'
import monthly from '../../examples/analysis/periodComparison/month-over-month.json'
import monthlyYear from '../../examples/analysis/periodComparison/month-year-over-year.json'
import yearly from '../../examples/analysis/periodComparison/year-to-date-yoy.json'
import category from '../../examples/analysis/percentage/category-share.json'
import share from '../../examples/analysis/percentage/share-change.json'
import target from '../../examples/analysis/comparison/target-attainment.json'
import conversion from '../../examples/analysis/comparison/conversion-comparison.json'

const cases = [
  {
    config: monthly,
    expected: [
      { region: 'A', currentSales: 120, baselineSales: 100, delta: 20, growthRate: 0.2 },
      { region: 'B', currentSales: 80, baselineSales: 100, delta: -20, growthRate: -0.2 },
      { region: 'C', currentSales: 20, baselineSales: 0, delta: 20, growthRate: null },
      { region: 'D', currentSales: 50, baselineSales: null, delta: null, growthRate: null },
      { region: 'E', currentSales: 0, baselineSales: 60, delta: -60, growthRate: -1 },
      { region: 'F', currentSales: null, baselineSales: 80, delta: null, growthRate: null },
    ],
  },
  {
    config: monthlyYear,
    expected: [
      { region: 'A', currentSales: 120, baselineSales: 100, delta: 20, growthRate: 0.2 },
      { region: 'B', currentSales: 80, baselineSales: 100, delta: -20, growthRate: -0.2 },
      { region: 'C', currentSales: 20, baselineSales: 0, delta: 20, growthRate: null },
      { region: 'D', currentSales: 50, baselineSales: null, delta: null, growthRate: null },
      { region: 'E', currentSales: 0, baselineSales: 60, delta: -60, growthRate: -1 },
      { region: 'F', currentSales: null, baselineSales: 80, delta: null, growthRate: null },
    ],
  },
  {
    config: yearly,
    expected: [
      { region: 'A', currentSales: 150, baselineSales: 120, delta: 30, growthRate: 0.25 },
      { region: 'B', currentSales: 90, baselineSales: 120, delta: -30, growthRate: -0.25 },
      { region: 'C', currentSales: 10, baselineSales: 0, delta: 10, growthRate: null },
      { region: 'D', currentSales: 40, baselineSales: null, delta: null, growthRate: null },
      { region: 'E', currentSales: 0, baselineSales: 80, delta: -80, growthRate: -1 },
      { region: 'F', currentSales: null, baselineSales: 20, delta: null, growthRate: null },
    ],
  },
  {
    config: category,
    expected: [
      { region: 'A', totalSales: 400, electronicsShare: 0.25, foodShare: 0.25, otherShare: 0.5 },
      { region: 'B', totalSales: 160, electronicsShare: 0, foodShare: 0.5, otherShare: 0.5 },
      { region: 'C', totalSales: 0, electronicsShare: null, foodShare: null, otherShare: null },
      { region: 'D', totalSales: null, electronicsShare: null, foodShare: null, otherShare: null },
    ],
  },
  {
    config: share,
    expected: [
      { region: 'A', currentShare: 0.5, baselineShare: 0.25, changePp: 25, relativeChange: 1 },
      { region: 'B', currentShare: 0.5, baselineShare: 0, changePp: 50, relativeChange: null },
      { region: 'C', currentShare: null, baselineShare: 0.5, changePp: null, relativeChange: null },
      { region: 'D', currentShare: 0.5, baselineShare: null, changePp: null, relativeChange: null },
    ],
  },
  {
    config: target,
    expected: [
      { region: 'A', actual: 120, target: 100, variance: 20, attainmentRate: 1.2 },
      { region: 'B', actual: 80, target: 100, variance: -20, attainmentRate: 0.8 },
      { region: 'C', actual: 20, target: 0, variance: 20, attainmentRate: null },
      { region: 'D', actual: null, target: 100, variance: null, attainmentRate: null },
      { region: 'E', actual: 0, target: 80, variance: -80, attainmentRate: 0 },
      { region: 'F', actual: 50, target: null, variance: null, attainmentRate: null },
    ],
  },
  {
    config: conversion,
    expected: [
      { market: 'A', controlRate: 0.5, variantRate: 0.75, differencePp: 25, relativeLift: 0.5 },
      { market: 'B', controlRate: 0, variantRate: 0.5, differencePp: 50, relativeLift: null },
      { market: 'C', controlRate: 0.5, variantRate: null, differencePp: null, relativeLift: null },
      { market: 'D', controlRate: null, variantRate: 0.5, differencePp: null, relativeLift: null },
    ],
  },
]

it.each(cases)('matches the independent BI expectations for $config.datasetId', async ({ config, expected }) => {
  const engine = new VQuery()
  await engine.createDataset(config.datasetId, config.schema as DatasetColumn[], {
    type: 'json',
    rawDataset: config.dataset,
  })
  const dataset = await engine.connectDataset(config.datasetId)
  try {
    expect((await dataset.query(config.vquery as VQueryDSL)).dataset).toEqual(expected)
  } finally {
    await dataset.disconnect()
    await engine.close()
  }
})
