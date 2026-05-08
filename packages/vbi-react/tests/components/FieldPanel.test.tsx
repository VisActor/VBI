import { fireEvent, render } from '@testing-library/react'

import { FieldPanel } from '@visactor/vbi-react/components'

import { createTestBuilder } from '../utils/createTestBuilder'

describe('FieldPanel', () => {
  it('adds and updates dimensions and measures through hooks', () => {
    const builder = createTestBuilder()

    const view = render(
      <FieldPanel
        builder={builder}
        dimensionOptions={[{ label: 'Region', value: 'region' }]}
        measureOptions={[{ label: 'Sales', value: 'sales' }]}
      />,
    )

    fireEvent.click(view.getByRole('button', { name: 'Add dimension' }))
    fireEvent.click(view.getByRole('button', { name: 'Add measure' }))

    fireEvent.click(view.getByRole('button', { name: 'Edit dimension region' }))
    fireEvent.click(view.getByRole('button', { name: 'Edit measure sales' }))

    fireEvent.change(view.getByLabelText('Aggregate for dimension region'), {
      target: { value: 'toMonth' },
    })
    fireEvent.change(view.getByLabelText('Encoding for dimension region'), {
      target: { value: 'color' },
    })
    fireEvent.change(view.getByLabelText('Aggregate for measure sales'), {
      target: { value: 'avg' },
    })
    fireEvent.change(view.getByLabelText('Encoding for measure sales'), {
      target: { value: 'color' },
    })

    expect(builder.dimensions.toJSON()[0].aggregate).toEqual({ func: 'toMonth' })
    expect(builder.dimensions.toJSON()[0].encoding).toBe('color')
    expect(builder.dimensions.toJSON()[0].field).toBe('region')
    expect(builder.measures.toJSON()[0].aggregate).toEqual({ func: 'avg' })
    expect(builder.measures.toJSON()[0].encoding).toBe('color')

    fireEvent.change(view.getByLabelText('Aggregate for dimension region'), {
      target: { value: '' },
    })

    expect(builder.dimensions.toJSON()[0].aggregate).toBeUndefined()

    fireEvent.click(view.getByRole('button', { name: 'Remove measure sales' }))

    expect(builder.measures.toJSON()).toHaveLength(0)
  })

  it('keeps selected field lists in dedicated scroll regions', () => {
    const builder = createTestBuilder()

    const view = render(
      <FieldPanel
        builder={builder}
        dimensionOptions={[{ label: 'Region', value: 'region' }]}
        measureOptions={[{ label: 'Sales', value: 'sales' }]}
      />,
    )

    expect(view.getByLabelText('Selected dimensions')).toBeTruthy()
    expect(view.getByLabelText('Selected measures')).toBeTruthy()
  })

  it('supports slot class names on compact field panel', () => {
    const builder = createTestBuilder()

    const view = render(
      <FieldPanel
        builder={builder}
        dimensionOptions={[{ label: 'Region', value: 'region' }]}
        measureOptions={[{ label: 'Sales', value: 'sales' }]}
        slotClassNames={{
          dimensionsList: 'test-dim-list',
          measuresList: 'test-mea-list',
          root: 'test-root',
        }}
      />,
    )

    const root = view.container.querySelector('.vbi-react-field-panel')
    expect(root?.className).toContain('vbi-react-field-panel--compact')
    expect(root?.className).toContain('test-root')
    expect(view.container.querySelector('.test-dim-list')).toBeTruthy()
    expect(view.container.querySelector('.test-mea-list')).toBeTruthy()
  })
})
