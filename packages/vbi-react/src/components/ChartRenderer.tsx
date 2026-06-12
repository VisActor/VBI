import type { ReactNode } from 'react'
import type { VBIChartBuilder } from '@visactor/vbi'
import type { VSeedDSL } from '@visactor/vseed'

import { useVSeed } from '../hooks'
import type { BaseComponentProps } from './types'
import { joinClassNames } from './utils'

export interface ChartRendererProps extends BaseComponentProps {
  builder: VBIChartBuilder
  debounce?: number
  emptyFallback?: ReactNode
  loadingFallback?: ReactNode
  renderError?: (error: Error, refetch: () => Promise<void>) => ReactNode
  renderVSeed?: (vseed: VSeedDSL) => ReactNode
}

export function ChartRenderer(props: ChartRendererProps) {
  const {
    builder,
    className,
    debounce,
    emptyFallback = 'No chart data yet.',
    loadingFallback = 'Loading chart…',
    renderError,
    renderVSeed,
    style,
  } = props
  const { error, loading, refetch, vseed } = useVSeed(builder, {
    debounce,
  })

  let content: ReactNode = emptyFallback

  if (error) {
    content = renderError?.(error, refetch) ?? (
      <div className='vbi-react-chart-renderer__error' role='alert'>
        <span>{error.message}</span>
        <button
          className='vbi-react-button vbi-react-button--primary'
          onClick={() => {
            void refetch()
          }}
          type='button'
        >
          Retry
        </button>
      </div>
    )
  } else if (!vseed && loading) {
    content = loadingFallback
  } else if (vseed) {
    content = renderVSeed?.(vseed) ?? (
      <pre className='vbi-react-chart-renderer__pre'>{JSON.stringify(vseed, null, 2)}</pre>
    )
  }

  return (
    <section className={joinClassNames('vbi-react-chart-renderer', className)} style={style}>
      {loading && vseed ? (
        <div aria-live='polite' className='vbi-react-chart-renderer__status'>
          Updating chart…
        </div>
      ) : null}
      {content}
    </section>
  )
}
