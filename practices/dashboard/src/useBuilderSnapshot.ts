import { useCallback, useMemo, useSyncExternalStore } from 'react'
import type { VBIDashboardBuilder, VBIInsightBuilder } from '@visactor/vbi'

export function useBuilderSnapshot<T>(
  builder: Pick<VBIDashboardBuilder | VBIInsightBuilder, 'doc'> & { build: () => T },
): T {
  const subscribe = useCallback(
    (notify: () => void) => {
      builder.doc.on('update', notify)
      return () => {
        builder.doc.off('update', notify)
      }
    },
    [builder],
  )
  const getSnapshot = useCallback(() => JSON.stringify(builder.build()), [builder])
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return useMemo(() => JSON.parse(snapshot) as T, [snapshot])
}
