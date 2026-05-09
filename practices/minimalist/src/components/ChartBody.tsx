import { Empty, Spin } from 'antd'
import { useMemo } from 'react'
import type { VSeed } from '@visactor/vseed'
import { VSeedRender } from 'src/components/Render'
import type { MinimalLabels } from 'src/config/labels'
import { useVBIStore, useVBIStoreConfig } from 'src/model'

export const ChartBody = ({ labels }: { labels: MinimalLabels }) => {
  const loading = useVBIStore((state) => state.loading)
  const vseed = useVBIStore((state) => state.vseed)
  const { locale, theme } = useVBIStoreConfig()
  const configuredVSeed = useMemo(() => {
    if (!vseed) return null
    return { ...vseed, ...(locale ? { locale } : {}), ...(theme ? { theme } : {}) } as VSeed
  }, [locale, theme, vseed])
  if (loading) return <Spin tip={labels.loading} />
  if (configuredVSeed) return <VSeedRender vseed={configuredVSeed} />
  return <Empty description={labels.emptyChart} image={Empty.PRESENTED_IMAGE_SIMPLE} />
}
