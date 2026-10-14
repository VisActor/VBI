import { convertDSLToDuckDB } from '@visactor/vquery'

it('renders booleans and rejects object filter values', () => {
  expect(
    convertDSLToDuckDB(
      { select: ['id'], where: { op: 'and', conditions: [{ field: 'flag', op: '=', value: true }] } },
      'orders',
    ),
  ).toBe('select "id" from "orders" where ("flag" = TRUE)')
  expect(() =>
    convertDSLToDuckDB(
      { select: ['id'], where: { op: 'and', conditions: [{ field: 'meta', op: '=', value: { a: 1 } }] } },
      'orders',
    ),
  ).toThrow('Invalid filter value')
})
