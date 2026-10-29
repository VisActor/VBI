import { afterEach, expect, test } from '@rstest/core'
import { act, cleanup, renderHook } from '@testing-library/react'
import { createVBI } from '@visactor/vbi'
import { useFilterRootOperator } from 'src/components/Shelves/hooks/useFilterRootOperator'

afterEach(cleanup)

for (const type of ['where', 'having'] as const) {
  test(`${type} root operator uses Builder state and follows undo/redo`, () => {
    const vbi = createVBI()
    const builder = vbi.chart.create(vbi.chart.createEmpty('demo'))
    const filter = builder[type === 'where' ? 'whereFilter' : 'havingFilter']
    const { result, unmount } = renderHook(() => useFilterRootOperator({ builder, type }))
    expect(result.current.operator).toBe('and')
    act(() => result.current.setOperator('or'))
    expect(filter.getOperator()).toBe('or')
    expect(result.current.operator).toBe('or')
    act(() => result.current.setOperator('or'))
    act(() => {
      builder.undoManager.undo()
    })
    expect(result.current.operator).toBe('and')
    expect(builder.undoManager.canUndo()).toBe(false)
    act(() => {
      builder.undoManager.redo()
    })
    expect(result.current.operator).toBe('or')
    unmount()
    builder.doc.destroy()
  })

  test(`${type} root operator remains safe before a builder is available`, () => {
    const { result } = renderHook(() => useFilterRootOperator({ builder: undefined, type }))
    act(() => result.current.setOperator('or'))
    expect(result.current.operator).toBe('and')
  })
}
