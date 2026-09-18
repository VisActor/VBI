import { beforeEach, describe, expect, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'

const { useAppPreferencesStore } = await import('./application-test-stores')
const {
  defaultWorkspaceSidePanelWidth,
  useWorkspaceSidePanelStore,
  workspaceSidePanelFloatingPositionStorageKey,
  workspaceSidePanelModeStorageKey,
  workspaceSidePanelWidthStorageKey,
} = await import('./application-test-stores')
const { WorkspaceSidePanel } = await import('../src/views/workspace/WorkspaceSidePanel')

const renderSidePanel = (contentKind: 'agent' | 'resource' = 'agent') =>
  render(
    <WorkspaceSidePanel contentKind={contentKind} title={contentKind === 'agent' ? 'VBI Agent' : 'Charts'}>
      <div data-testid={`${contentKind}-content`} />
    </WorkspaceSidePanel>,
  )

describe('WorkspaceSidePanel', () => {
  beforeEach(() => {
    cleanup()
    window.localStorage.clear()
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useWorkspaceSidePanelStore.setState({
      collapsed: false,
      floatingPosition: null,
      mode: 'fixed',
      width: defaultWorkspaceSidePanelWidth,
    })
  })

  test('renders fixed by default and persists floating mode for any content', () => {
    renderSidePanel('resource')

    const panel = screen.getByLabelText('Charts')
    expect(panel).toHaveAttribute('data-workspace-side-panel-mode', 'fixed')
    expect(panel).toHaveAttribute('data-workspace-content', 'resource')
    expect(panel).toHaveStyle({ width: `${defaultWorkspaceSidePanelWidth}px` })
    expect(screen.getByRole('heading', { name: 'Charts' })).toBeInTheDocument()
    expect(screen.getByTestId('resource-content')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Float Panel' }))

    expect(panel).toHaveAttribute('data-workspace-side-panel-mode', 'floating')
    expect(window.localStorage.getItem(workspaceSidePanelModeStorageKey)).toBe('floating')
    expect(screen.getByRole('button', { name: 'Dock Panel' })).toBeInTheDocument()
    expect(screen.getByRole('separator', { name: 'Resize Panel' })).toBeInTheDocument()
  })

  test('collapses to a compact rail and expands again', () => {
    renderSidePanel()

    const panel = screen.getByLabelText('VBI Agent')
    expect(panel).toHaveAttribute('data-workspace-side-panel-collapsed', 'false')
    expect(screen.getByTestId('agent-content')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Collapse Panel' }))

    expect(panel).toHaveAttribute('data-workspace-side-panel-collapsed', 'true')
    expect(screen.queryByTestId('agent-content')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'VBI Agent' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Expand Panel' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Expand Panel' }))

    expect(panel).toHaveAttribute('data-workspace-side-panel-collapsed', 'false')
    expect(screen.getByTestId('agent-content')).toBeInTheDocument()
  })

  test('resizes the docked panel and persists width', () => {
    renderSidePanel()

    expect(screen.getByRole('separator', { name: 'Resize Panel' })).toBeInTheDocument()

    fireEvent.pointerDown(screen.getByRole('separator', { name: 'Resize Panel' }), { clientX: 0 })
    fireEvent.pointerMove(document, { clientX: -80 })
    fireEvent.pointerUp(document)

    expect(screen.getByLabelText('VBI Agent')).toHaveStyle({ width: '680px' })
    expect(window.localStorage.getItem(workspaceSidePanelWidthStorageKey)).toBe('680')
  })

  test('resets the docked panel width on separator double click', () => {
    useWorkspaceSidePanelStore.setState({ collapsed: false, floatingPosition: null, mode: 'fixed', width: 560 })
    renderSidePanel()

    const separator = screen.getByRole('separator', { name: 'Resize Panel' })
    expect(screen.getByLabelText('VBI Agent')).toHaveStyle({ width: '560px' })

    fireEvent.doubleClick(separator)

    expect(screen.getByLabelText('VBI Agent')).toHaveStyle({ width: `${defaultWorkspaceSidePanelWidth}px` })
    expect(window.localStorage.getItem(workspaceSidePanelWidthStorageKey)).toBe(String(defaultWorkspaceSidePanelWidth))
  })

  test('resizes a floating panel while keeping the right edge stable', () => {
    useWorkspaceSidePanelStore.setState({
      collapsed: false,
      floatingPosition: { x: 400, y: 24 },
      mode: 'floating',
      width: defaultWorkspaceSidePanelWidth,
    })
    renderSidePanel('resource')

    const panel = screen.getByLabelText('Charts')
    const separator = screen.getByRole('separator', { name: 'Resize Panel' })
    expect(panel).toHaveStyle({ left: '400px', width: `${defaultWorkspaceSidePanelWidth}px` })

    fireEvent.pointerDown(separator, { clientX: 400 })
    fireEvent.pointerMove(document, { clientX: 320 })
    fireEvent.pointerUp(document)

    expect(panel).toHaveStyle({ left: '320px', width: '680px' })
    expect(window.localStorage.getItem(workspaceSidePanelWidthStorageKey)).toBe('680')
    expect(window.localStorage.getItem(workspaceSidePanelFloatingPositionStorageKey)).toContain('"x":320')

    fireEvent.doubleClick(separator)

    expect(panel).toHaveStyle({ left: '400px', width: `${defaultWorkspaceSidePanelWidth}px` })
    expect(window.localStorage.getItem(workspaceSidePanelWidthStorageKey)).toBe(String(defaultWorkspaceSidePanelWidth))
  })

  test('drags the floating panel and persists position', async () => {
    renderSidePanel()

    fireEvent.click(screen.getByRole('button', { name: 'Float Panel' }))

    await waitFor(() => {
      expect(screen.getByLabelText('VBI Agent')).toHaveAttribute('data-workspace-side-panel-mode', 'floating')
      expect(window.localStorage.getItem(workspaceSidePanelFloatingPositionStorageKey)).not.toBeNull()
    })

    fireEvent.pointerDown(screen.getByTestId('workspace-side-panel-drag-handle'), { clientX: 900, clientY: 40 })
    fireEvent.pointerMove(document, { clientX: 800, clientY: 120 })
    fireEvent.pointerUp(document)

    const position = JSON.parse(window.localStorage.getItem(workspaceSidePanelFloatingPositionStorageKey) ?? '{}') as {
      x: number
      y: number
    }
    expect(position.x).toBeLessThan(594)
    expect(position.y).toBeGreaterThan(12)
    expect(screen.getByLabelText('VBI Agent')).toHaveStyle({ left: `${position.x}px`, top: `${position.y}px` })
  })

  test('collapses a floating panel toward the right-side collapse button', () => {
    useWorkspaceSidePanelStore.setState({
      collapsed: false,
      floatingPosition: { x: 400, y: 24 },
      mode: 'floating',
      width: defaultWorkspaceSidePanelWidth,
    })

    renderSidePanel()

    const panel = screen.getByLabelText('VBI Agent')
    expect(panel).toHaveStyle({ left: '400px', width: `${defaultWorkspaceSidePanelWidth}px` })

    fireEvent.click(screen.getByRole('button', { name: 'Collapse Panel' }))

    expect(panel).toHaveAttribute('data-workspace-side-panel-collapsed', 'true')
    expect(panel).toHaveStyle({
      left: `${400 + defaultWorkspaceSidePanelWidth - 44}px`,
      width: '44px',
    })
  })
})
