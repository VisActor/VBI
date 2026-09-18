import { expect, test } from '@rstest/core'
import { createTranslator, translations } from '../src/i18n'

test('keeps all eight locales complete with matching interpolation parameters', () => {
  const source = translations['zh-CN']
  expect(Object.keys(translations)).toHaveLength(8)
  for (const messages of Object.values(translations)) {
    expect(Object.keys(messages).sort()).toEqual(Object.keys(source).sort())
    for (const key of Object.keys(source) as (keyof typeof source)[]) {
      expect(messages[key].trim()).not.toBe('')
      expect(messages[key].match(/\{\{\w+\}\}/g)).toEqual(source[key].match(/\{\{\w+\}\}/g))
    }
  }
  expect(createTranslator('en-US')('editChart', { title: 'Sales' })).toBe('Edit chart: Sales')
})
