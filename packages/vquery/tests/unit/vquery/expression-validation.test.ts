import { VQuery, type ValidateExpressionOptions } from '@visactor/vquery'
import { VQuery as BrowserVQuery } from '../../../src/browser'
import { createNumericAstCases } from '../../fixtures/numeric-ast-cases'

it('validates expressions statically in both entrypoints without creating a dataset', () => {
  for (const Query of [VQuery, BrowserVQuery]) {
    expect(Query.validateExpression('x+1')).toBeUndefined()
    expect(Query.validateExpression('1', { columns: [] })).toBeUndefined()
    const options: ValidateExpressionOptions = {
      parameters: [2],
      columns: [{ name: 'x', type: 'number' }],
    }
    expect(Query.validateExpression('ABS(x)/NULLIF(?,0)', options)).toBeUndefined()
    expect(options.parameters).toEqual([2])
    expect(() => Query.validateExpression('missing', { columns: [] })).toThrow('number column: missing')
    expect(() => Query.validateExpression('x+1', { columns: [{ name: 'x', type: 'string' }] })).toThrow(
      'number column: x',
    )
  }
  for (const { expr, parameters } of createNumericAstCases())
    expect(() => VQuery.validateExpression(expr, { parameters })).not.toThrow()
})

it('rejects unsupported syntax, functions and invalid parameter bindings through the public API', () => {
  for (const expr of [
    '',
    ' ',
    'x+',
    '(x',
    'x)',
    '"x',
    'x.y',
    '*',
    'x,y',
    'x AS result',
    'x;SELECT 1',
    'x-- comment',
    'x/*comment*/',
    'x #comment',
    'ROUND(x)',
    'SUM(x)',
    'ABS()',
    'ABS(x,y)',
    'ABS(DISTINCT x)',
    'COALESCE(x)',
    'NULLIF(x,y,1)',
    'RANDOM()',
    '(SELECT x)',
    'CASE WHEN x>0 THEN x END',
    'CAST(x AS DOUBLE)',
    'x::DOUBLE',
    'x COLLATE binary',
    'x||y',
    "'1'",
    'TRUE',
    '1e999',
  ])
    expect(() => VQuery.validateExpression(expr)).toThrow()
  for (const expr of [null, undefined, 1, [], {}])
    expect(() => VQuery.validateExpression(expr as never)).toThrow('Expected numeric expression')
  expect(() => VQuery.validateExpression('?')).toThrow('Missing expression parameter')
  expect(() => VQuery.validateExpression('1', { parameters: [2] })).toThrow('Unused expression parameters')
  for (const parameters of [null, {}, [Infinity], [NaN], ['1'], [true]])
    expect(() => VQuery.validateExpression('?', { parameters: parameters as never })).toThrow('Expression parameters')
})
