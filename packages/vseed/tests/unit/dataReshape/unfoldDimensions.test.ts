import { DimensionKey, MeasureId, unfoldDimensions } from 'src/dataReshape'

const options = { foldMeasureId: 'customMeasure', separator: '-', colorItemAsId: false }

test('dimension identity is independent of encoding, measure folds and display formatting', () => {
  const dimensions = [{ id: 'a' }, { id: 'b' }, { id: MeasureId }, { id: 'customMeasure' }]
  const data = [
    { a: 'A-B', b: 'C', [MeasureId]: 'sales', customMeasure: 'sales' },
    { a: 'A', b: 'B-C', [MeasureId]: 'profit', customMeasure: 'profit' },
    { a: '', b: 0, [MeasureId]: 'sales', customMeasure: 'sales' },
  ]
  const first = unfoldDimensions(structuredClone(data), dimensions, { x: ['a'], color: ['b'] }, options)
  const second = unfoldDimensions(structuredClone(data), dimensions.toReversed(), { angle: ['b'], color: ['a'] }, {
    ...options, formatDimensionValue: () => 'display alias',
  })
  expect(first.dataset.map(row => row[DimensionKey])).toEqual(second.dataset.map(row => row[DimensionKey]))
  expect(new Set(first.dataset.map(row => row[DimensionKey])).size).toBe(3)
  expect(first.unfoldInfo.colorIdMap['C'].alias).toBe('C')
  expect(second.unfoldInfo.colorIdMap['A-B'].alias).toBe('display alias')
  expect(data[0]).not.toHaveProperty(DimensionKey)
})

test('dimensionless folds share a valid group and retain measure aliases', () => {
  const folded = [{ [MeasureId]: 'sales', __MeaName__: 'Sales' }, { [MeasureId]: 'profit', __MeaName__: 'Profit' }]
  const result = unfoldDimensions(folded, [{ id: MeasureId }], { color: [MeasureId] }, {
    ...options, foldMeasureId: MeasureId,
  })
  expect(result.dataset.map(row => row[DimensionKey])).toEqual(['[]', '[]'])
  expect(result.unfoldInfo.colorIdMap.sales.alias).toBe('Sales')
  expect(result.unfoldInfo.colorIdMap.profit.alias).toBe('Profit')
})
