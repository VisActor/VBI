type ValueFormatter = (value: string) => string | number
type BandFormatter = (text: string | string[]) => string | string[] | number

const formatters = new WeakMap<ValueFormatter, BandFormatter>()

/** Band axes receive arrays for hierarchical labels; keep their structure intact. */
export const bandAxisFormatter = (formatter: ValueFormatter): BandFormatter => {
  let result = formatters.get(formatter)
  if (!result) {
    result = (text) => (Array.isArray(text) ? text : formatter(String(text ?? '')))
    formatters.set(formatter, result)
  }
  return result
}
