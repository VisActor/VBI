import { fireEvent, render } from '@testing-library/react'

import { FilterPanel } from '@visactor/vbi-react/components'

import { createTestBuilder } from '../utils/createTestBuilder'

describe('FilterPanel', () => {
  it('adds and edits where and having filters through the component UI', () => {
    const builder = createTestBuilder()
    const view = render(
      <FilterPanel
        aggregateOptions={[{ label: 'Average', value: 'avg' }]}
        builder={builder}
        fieldOptions={[
          { label: 'Region', value: 'region' },
          { label: 'Sales', value: 'sales' },
        ]}
        havingFieldOptions={[{ label: 'Sales', value: 'sales' }]}
      />,
    )

    fireEvent.change(view.getByLabelText('Where field'), {
      target: { value: 'region' },
    })
    fireEvent.change(view.getByLabelText('Where operator'), {
      target: { value: 'eq' },
    })
    fireEvent.input(view.getByLabelText('Where value'), {
      target: { value: 'East' },
    })
    fireEvent.click(view.getByRole('button', { name: 'Add where filter' }))

    fireEvent.change(view.getByLabelText('Having field'), {
      target: { value: 'sales' },
    })
    fireEvent.change(view.getByLabelText('Having aggregate'), {
      target: { value: 'avg' },
    })
    fireEvent.change(view.getByLabelText('Having operator'), {
      target: { value: 'gt' },
    })
    fireEvent.input(view.getByLabelText('Having value'), {
      target: { value: '1000' },
    })
    fireEvent.click(view.getByRole('button', { name: 'Add having filter' }))

    expect(builder.whereFilter.toJSON().conditions).toHaveLength(1)
    expect(builder.havingFilter.toJSON().conditions).toHaveLength(1)

    fireEvent.click(view.getByRole('button', { name: 'Edit where filter region' }))
    fireEvent.input(view.getByLabelText('Where value region'), {
      target: { value: 'West' },
    })
    fireEvent.click(view.getByRole('button', { name: 'Save where filter region' }))

    expect(builder.whereFilter.toJSON().conditions[0]).toMatchObject({
      field: 'region',
      op: '=',
      value: 'West',
    })

    fireEvent.click(view.getByRole('button', { name: 'Clear where filters' }))
    expect(builder.whereFilter.toJSON().conditions).toEqual([])
  })
})
