import * as Y from 'yjs'

export const isEmptyVBIDashboardDSL = (dsl: Y.Map<any>): boolean => {
  const widgets = dsl.get('widgets')
  if (widgets instanceof Y.Array) {
    return widgets.length === 0
  }

  if (Array.isArray(widgets)) {
    return widgets.length === 0
  }

  return true
}
