import { beforeEach, describe, expect, rs, test } from '@rstest/core'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

rs.mock('../src/views/workspace/ManageLayoutPage', () => ({
  ManageLayoutPage: ({ children }: { children: ReactNode }) => (
    <div data-testid='workspace-layout'>
      <aside data-testid='manage-sidebar' />
      <main data-testid='workspace-main'>{children}</main>
      <aside data-testid='agent-sider' />
    </div>
  ),
}))

rs.mock('../src/views/agent/AgentPage', () => ({
  AgentPage: () => <div data-testid='agent-page' />,
}))
rs.mock('../src/views/resources/chart/ManageChartsPage', () => ({
  ManageChartsPage: () => <div data-testid='charts-page' />,
}))

rs.mock('../src/views/resources/insight/ManageInsightsPage', () => ({
  ManageInsightsPage: () => <div data-testid='insights-page' />,
}))

rs.mock('../src/views/resources/chart/ChartEditorPage', () => ({
  ChartEditorPage: ({ id }: { id: string }) => <div data-testid='chart-editor'>{id}</div>,
}))

rs.mock('../src/views/resources/insight/InsightEditorPage', () => ({
  InsightEditorPage: ({ id }: { id: string }) => <div data-testid='insight-editor'>{id}</div>,
}))
const { App } = await import('../src/App')
const { useAppPreferencesStore } = await import('./application-test-stores')
const { useNavigationStore } = await import('./application-test-stores')

describe('rsbuild app routes', () => {
  beforeEach(() => {
    cleanup()
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useNavigationStore.setState({ navigate: null, pathname: '' })
  })

  test.each(['/', '/manage', '/manage/report', '/manage/reports/retired', '/manage/report/retired', '/unknown'])(
    'shows charts for the default or unmatched route %s',
    async (pathname) => {
      window.history.replaceState(null, '', pathname)
      render(<App />)
      expect(await screen.findByTestId('charts-page')).toBeInTheDocument()
    },
  )

  test('keeps workspace chrome mounted and hides resource pages for agent routes', async () => {
    window.history.replaceState(null, '', '/agent/conversation-1')

    render(<App />)

    expect(await screen.findByTestId('workspace-layout')).toBeInTheDocument()
    expect(screen.getByTestId('manage-sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('agent-sider')).toBeInTheDocument()
    expect(screen.getByTestId('workspace-main')).toBeEmptyDOMElement()
    expect(screen.queryByTestId('agent-page')).not.toBeInTheDocument()
    expect(screen.queryByTestId('charts-page')).not.toBeInTheDocument()
  })

  test('maps browser paths to resource pages', async () => {
    window.history.replaceState(null, '', '/manage/chart/chart%201')
    const { rerender } = render(<App />)

    expect(await screen.findByTestId('chart-editor')).toHaveTextContent('chart 1')

    window.history.pushState(null, '', '/manage/insight')
    window.dispatchEvent(new PopStateEvent('popstate'))
    rerender(<App />)
    expect(await screen.findByTestId('insights-page')).toBeInTheDocument()

    window.history.pushState(null, '', '/manage/chart/chart-1')
    window.dispatchEvent(new PopStateEvent('popstate'))
    rerender(<App />)
    await waitFor(() => expect(screen.getByTestId('chart-editor')).toHaveTextContent('chart-1'))
  })

  test('canonicalizes legacy plural manage resource routes to singular paths', async () => {
    window.history.replaceState(null, '', '/manage/insights/insight-1')
    render(<App />)

    expect(await screen.findByTestId('insight-editor')).toHaveTextContent('insight-1')
    await waitFor(() => expect(window.location.pathname).toBe('/manage/insight/insight-1'))
  })

  test('keeps workspace chrome mounted when opening a chart detail route', async () => {
    window.history.replaceState(null, '', '/manage/chart')
    render(<App />)

    expect(await screen.findByTestId('charts-page')).toBeInTheDocument()
    const workspaceLayout = screen.getByTestId('workspace-layout')
    const agentSider = screen.getByTestId('agent-sider')

    window.history.pushState(null, '', '/manage/chart/chart-1')
    window.dispatchEvent(new PopStateEvent('popstate'))

    await waitFor(() => expect(screen.getByTestId('chart-editor')).toHaveTextContent('chart-1'))
    expect(screen.getByTestId('workspace-layout')).toBe(workspaceLayout)
    expect(screen.getByTestId('agent-sider')).toBe(agentSider)
  })
})
