import { expect, test } from 'vitest'
import { createAliasFormatter } from 'src/pipeline/utils/format/createAliasFormatter'

test('identity aliases do not allocate a formatter', () => {
  expect(createAliasFormatter({ A: { alias: 'A' } })).toBeUndefined()
  expect(createAliasFormatter({})).toBeUndefined()
})

test('equivalent aliases reuse a snapshot independent of input order and mutation', () => {
  const aliases = { A: { alias: 'Alpha' }, B: { alias: 'Beta' } }
  const formatter = createAliasFormatter(aliases)!
  expect(formatter).toBe(createAliasFormatter({ B: { alias: 'Beta' }, A: { alias: 'Alpha' }, C: { alias: 'C' } }))
  aliases.A.alias = 'Updated'
  expect(formatter('A')).toBe('Alpha')
  expect(createAliasFormatter(aliases)!('A')).toBe('Updated')
  expect(formatter(0)).toBe(0)
  expect(formatter('__proto__')).toBe('__proto__')
})

test('evicting old aliases preserves existing formatter correctness', () => {
  const first = createAliasFormatter({ value: { alias: 'first' } })!
  for (let index = 0; index < 70; index++) createAliasFormatter({ value: { alias: String(index) } })
  expect(first('value')).toBe('first')
  expect(createAliasFormatter({ value: { alias: 'first' } })!('value')).toBe('first')
})
