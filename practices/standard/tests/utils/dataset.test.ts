import { describe, expect, test } from '@rstest/core'
import { inferSchema, rowsToDataset } from 'src/utils/dataset'
import { type DatasetColumn } from '@visactor/vquery'

describe('dataset utils', () => {
  describe('inferSchema', () => {
    test('should detect numbers correctly', () => {
      const headers = ['id', 'score']
      const rows = [
        ['1', '90.5'],
        ['2', '88'],
        ['3', '100'],
      ]
      const schema = inferSchema(headers, rows)
      expect(schema).toEqual([
        { name: 'id', type: 'number' },
        { name: 'score', type: 'number' },
      ])
    })

    test('should detect dates correctly', () => {
      const headers = ['date1', 'date2']
      const rows = [
        ['2023-01-01', '2023/12/31'],
        ['2023-02-15', '2024/01/01'],
      ]
      const schema = inferSchema(headers, rows)
      expect(schema).toEqual([
        { name: 'date1', type: 'date' },
        { name: 'date2', type: 'date' },
      ])
    })

    test('should fallback to string for mixed types', () => {
      const headers = ['mixed']
      const rows = [['123'], ['abc'], ['456']]
      const schema = inferSchema(headers, rows)
      expect(schema).toEqual([{ name: 'mixed', type: 'string' }])
    })

    test('should handle empty values in inference', () => {
      const headers = ['mostly_empty', 'mostly_numbers']
      const rows = [
        ['', '1'],
        ['', ''],
        ['', '2'],
      ]
      const schema = inferSchema(headers, rows)
      expect(schema).toEqual([
        { name: 'mostly_empty', type: 'string' },
        { name: 'mostly_numbers', type: 'number' },
      ])
    })

    test('should handle invalid dates as strings', () => {
      const headers = ['invalid_date']
      const rows = [
        ['2023-13-45'], // Invalid date
        ['not-a-date'],
      ]
      const schema = inferSchema(headers, rows)
      expect(schema).toEqual([{ name: 'invalid_date', type: 'string' }])
    })

    test('should sample only first 100 rows', () => {
      const headers = ['col']
      const rows = Array.from({ length: 150 }, (_, i) => [i < 100 ? '123' : 'abc'])
      const schema = inferSchema(headers, rows)
      // It only checks the first 100, which are all numbers
      expect(schema).toEqual([{ name: 'col', type: 'number' }])
    })
  })

  describe('rowsToDataset', () => {
    test('normalizes calendar dates for correct lexical range comparisons without shifting timezones', () => {
      expect(
        rowsToDataset(['date'], [['2018/4/27'], ['2018-5-1'], ['2018-12-31'], ['']], [{ name: 'date', type: 'date' }]),
      ).toEqual([{ date: '2018-04-27' }, { date: '2018-05-01' }, { date: '2018-12-31' }])
    })
    test('applies renamed columns and their edited types by source position', () => {
      expect(
        rowsToDataset(
          ['source', 'value'],
          [['A', '0'], ['B', 'Infinity'], ['C']],
          [
            { name: 'region', type: 'string' },
            { name: 'revenue', type: 'number' },
          ],
        ),
      ).toEqual([
        { region: 'A', revenue: 0 },
        { region: 'B', revenue: null },
        { region: 'C', revenue: null },
      ])
      expect(rowsToDataset(['fallback'], [[' x ']], [])).toEqual([{ fallback: 'x' }])
    })
    test('should convert rows to objects based on schema', () => {
      const headers = ['name', 'age', 'joined']
      const rows = [
        ['Alice', '25', '2023-01-01'],
        ['Bob', '30', '2022-05-15'],
      ]
      const schema: DatasetColumn[] = [
        { name: 'name', type: 'string' },
        { name: 'age', type: 'number' },
        { name: 'joined', type: 'date' },
      ]

      const result = rowsToDataset(headers, rows, schema)
      expect(result).toEqual([
        { name: 'Alice', age: 25, joined: '2023-01-01' },
        { name: 'Bob', age: 30, joined: '2022-05-15' },
      ])
    })

    test('should handle numeric conversion and nulls', () => {
      const headers = ['rowId', 'val']
      const rows = [
        ['1', '123'],
        ['2', ''],
        ['3', 'abc'],
      ]
      const schema: DatasetColumn[] = [
        { name: 'rowId', type: 'string' },
        { name: 'val', type: 'number' },
      ]

      const result = rowsToDataset(headers, rows, schema)
      expect(result).toEqual([
        { rowId: '1', val: 123 },
        { rowId: '2', val: null },
        { rowId: '3', val: null },
      ])
    })

    test('should filter out completely empty rows', () => {
      const headers = ['a', 'b']
      const rows = [
        ['1', '2'],
        ['', ''],
        [' ', '\t'],
        ['3', '4'],
      ]
      const schema: DatasetColumn[] = [
        { name: 'a', type: 'string' },
        { name: 'b', type: 'string' },
      ]

      const result = rowsToDataset(headers, rows, schema)
      expect(result).toEqual([
        { a: '1', b: '2' },
        { a: '3', b: '4' },
      ])
    })

    test('should trim string values', () => {
      const headers = ['text']
      const rows = [['  hello  '], ['world\n']]
      const schema: DatasetColumn[] = [{ name: 'text', type: 'string' }]

      const result = rowsToDataset(headers, rows, schema)
      expect(result).toEqual([{ text: 'hello' }, { text: 'world' }])
    })
  })
})
