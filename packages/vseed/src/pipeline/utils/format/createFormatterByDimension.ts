import type { Dimension, Formatter, Locale } from 'src/types'
import { createTimeFormatter } from './createTimeFormatter'
import { intl } from 'src/i18n'

export const createFormatterByDimension = (dimension?: Dimension, locale: Locale = intl.getLocale()): Formatter => {
  if (dimension?.timeFormat) {
    return createTimeFormatter(dimension.timeFormat, locale)
  }
  return String
}
