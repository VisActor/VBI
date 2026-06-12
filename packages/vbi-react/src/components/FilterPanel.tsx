import { useEffect, useMemo, useState } from 'react'
import type {
  VBIChartBuilder,
  VBIHavingAggregate,
  VBIHavingClause,
  VBIHavingFilter,
  VBIHavingGroup,
  VBIWhereClause,
  VBIWhereFilter,
  VBIWhereGroup,
} from '@visactor/vbi'

import { useHavingFilter, useWhereFilter } from '../hooks'
import type { BaseComponentProps, SelectOption } from './types'
import { joinClassNames } from './utils'

const defaultWhereOperatorOptions: Array<SelectOption<string>> = [
  { label: 'eq', value: 'eq' },
  { label: 'neq', value: 'neq' },
  { label: 'gt', value: 'gt' },
  { label: 'gte', value: 'gte' },
  { label: 'lt', value: 'lt' },
  { label: 'lte', value: 'lte' },
  { label: 'like', value: 'like' },
  { label: 'in', value: 'in' },
  { label: 'not in', value: 'not in' },
]

const defaultHavingOperatorOptions: Array<SelectOption<string>> = [
  { label: 'gt', value: 'gt' },
  { label: 'gte', value: 'gte' },
  { label: 'lt', value: 'lt' },
  { label: 'lte', value: 'lte' },
  { label: 'eq', value: 'eq' },
  { label: 'neq', value: 'neq' },
]

type HavingAggregateFunction = VBIHavingAggregate['func']

const defaultAggregateOptions: Array<SelectOption<HavingAggregateFunction>> = [
  { label: 'sum', value: 'sum' },
  { label: 'avg', value: 'avg' },
  { label: 'count', value: 'count' },
  { label: 'countDistinct', value: 'countDistinct' },
  { label: 'max', value: 'max' },
  { label: 'min', value: 'min' },
  { label: 'variance', value: 'variance' },
  { label: 'variancePop', value: 'variancePop' },
  { label: 'stddev', value: 'stddev' },
  { label: 'median', value: 'median' },
  { label: 'quantile', value: 'quantile' },
]

const operatorAliases: Record<string, string> = {
  eq: '=',
  ne: '!=',
  neq: '!=',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  notIn: 'not in',
}

const dslOperatorAliases: Record<string, string> = {
  '=': 'eq',
  '!=': 'neq',
  '>': 'gt',
  '>=': 'gte',
  '<': 'lt',
  '<=': 'lte',
  'not in': 'not in',
}

export interface FilterPanelProps extends BaseComponentProps {
  builder: VBIChartBuilder
  fieldOptions?: Array<SelectOption<string>>
  aggregateOptions?: Array<SelectOption<HavingAggregateFunction>>
  havingFieldOptions?: Array<SelectOption<string>>
  havingTitle?: string
  havingOperatorOptions?: Array<SelectOption<string>>
  title?: string
  whereOperatorOptions?: Array<SelectOption<string>>
  whereTitle?: string
}

function isWhereGroup(entry: VBIWhereClause): entry is VBIWhereGroup {
  return 'conditions' in entry
}

function isHavingGroup(entry: VBIHavingClause): entry is VBIHavingGroup {
  return 'conditions' in entry
}

function toText(option: SelectOption<string>): string {
  return typeof option.label === 'string' ? option.label : option.value
}

function stringifyValue(value: unknown): string {
  if (value == null) return ''
  return typeof value === 'string' ? value : JSON.stringify(value)
}

function normalizeOperator(operator: string): string {
  return operatorAliases[operator] ?? operator
}

function toOptionOperator(operator: string, options: Array<SelectOption<string>>): string {
  if (options.some((option) => option.value === operator)) return operator

  const alias = dslOperatorAliases[operator]
  if (alias && options.some((option) => option.value === alias)) return alias

  const normalized = normalizeOperator(operator)
  if (options.some((option) => option.value === normalized)) return normalized

  return operator
}

function toListValue(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function createWhereDraft(operator: string, value: string) {
  const normalizedOperator = normalizeOperator(operator)

  if (normalizedOperator === 'in') {
    return { operator: '=', value: toListValue(value) }
  }
  if (normalizedOperator === 'not in') {
    return { operator: '!=', value: toListValue(value) }
  }
  if (normalizedOperator === 'is null' || normalizedOperator === 'is not null') {
    return { operator: normalizedOperator, value: undefined }
  }
  return { operator: normalizedOperator, value }
}

function createHavingAggregate(func: HavingAggregateFunction): VBIHavingAggregate {
  return func === 'quantile' ? { func: 'quantile' } : { func }
}

function FilterSummary(props: { aggregate?: string; field: string; operator: string; value: unknown }) {
  const { aggregate, field, operator, value } = props
  return (
    <div className='vbi-react-filter-panel__summary'>
      <span className='vbi-react-chip vbi-react-chip--filter'>{field}</span>
      {aggregate ? <span className='vbi-react-chip'>Agg: {aggregate}</span> : null}
      <span className='vbi-react-chip'>Op: {operator || '(unset)'}</span>
      <span className='vbi-react-chip'>Value: {stringifyValue(value) || '(empty)'}</span>
    </div>
  )
}

export function FilterPanel(props: FilterPanelProps) {
  const {
    aggregateOptions = defaultAggregateOptions,
    builder,
    className,
    fieldOptions = [],
    havingFieldOptions = fieldOptions,
    havingOperatorOptions = defaultHavingOperatorOptions,
    havingTitle = 'Having filters',
    style,
    title = 'Filters',
    whereOperatorOptions = defaultWhereOperatorOptions,
    whereTitle = 'Where filters',
  } = props
  const { clearHavingFilter, havingFilter, mutateHavingFilter, removeHavingEntry } = useHavingFilter(builder)
  const { clearWhereFilter, mutateWhereFilter, removeWhereEntry, whereFilter } = useWhereFilter(builder)
  const [selectedWhereField, setSelectedWhereField] = useState('')
  const [selectedWhereOperator, setSelectedWhereOperator] = useState(whereOperatorOptions[0]?.value ?? 'eq')
  const [whereValue, setWhereValue] = useState('')
  const [selectedHavingField, setSelectedHavingField] = useState('')
  const [selectedHavingAggregate, setSelectedHavingAggregate] = useState<HavingAggregateFunction>(
    aggregateOptions[0]?.value ?? 'sum',
  )
  const [selectedHavingOperator, setSelectedHavingOperator] = useState(havingOperatorOptions[0]?.value ?? 'gt')
  const [havingValue, setHavingValue] = useState('')
  const [editingWhereId, setEditingWhereId] = useState<string | null>(null)
  const [editingHavingId, setEditingHavingId] = useState<string | null>(null)

  const whereFieldValues = useMemo(() => fieldOptions.map((option) => option.value), [fieldOptions])
  const havingFieldValues = useMemo(() => havingFieldOptions.map((option) => option.value), [havingFieldOptions])

  useEffect(() => {
    if (!whereFieldValues.includes(selectedWhereField)) {
      setSelectedWhereField(whereFieldValues[0] ?? '')
    }
  }, [selectedWhereField, whereFieldValues])

  useEffect(() => {
    if (!havingFieldValues.includes(selectedHavingField)) {
      setSelectedHavingField(havingFieldValues[0] ?? '')
    }
  }, [havingFieldValues, selectedHavingField])

  return (
    <section className={joinClassNames('vbi-react-filter-panel', 'vbi-react-panel', className)} style={style}>
      <header className='vbi-react-panel__header'>
        <strong className='vbi-react-panel__title'>{title}</strong>
      </header>
      <div className='vbi-react-filter-panel__sections'>
        <section className='vbi-react-section'>
          <div className='vbi-react-toolbar'>
            <strong className='vbi-react-section__title'>{whereTitle}</strong>
            <div className='vbi-react-control-grid'>
              <select
                aria-label='Where field'
                className='vbi-react-control'
                onChange={(event) => setSelectedWhereField(event.target.value)}
                value={selectedWhereField}
              >
                {fieldOptions.length === 0 ? (
                  <option value=''>No where fields available</option>
                ) : (
                  fieldOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {toText(option)}
                    </option>
                  ))
                )}
              </select>
              <select
                aria-label='Where operator'
                className='vbi-react-control'
                onChange={(event) => setSelectedWhereOperator(event.target.value)}
                value={selectedWhereOperator}
              >
                {whereOperatorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {toText(option)}
                  </option>
                ))}
              </select>
              <input
                aria-label='Where value'
                className='vbi-react-input'
                onInput={(event) => setWhereValue(event.currentTarget.value)}
                placeholder='Value'
                value={whereValue}
              />
              <button
                aria-label='Add where filter'
                className='vbi-react-button vbi-react-button--primary'
                disabled={!selectedWhereField}
                onClick={() => {
                  const draft = createWhereDraft(selectedWhereOperator, whereValue)
                  mutateWhereFilter((nextWhereFilter) => {
                    nextWhereFilter.add(selectedWhereField, (node) => {
                      node.setOperator(draft.operator)
                      if (draft.value !== undefined) node.setValue(draft.value)
                    })
                  })
                  setWhereValue('')
                }}
                type='button'
              >
                Add where
              </button>
              <button
                aria-label='Add where group'
                className='vbi-react-button'
                onClick={() => {
                  mutateWhereFilter((nextWhereFilter) => {
                    nextWhereFilter.addGroup('and', () => undefined)
                  })
                }}
                type='button'
              >
                Add group
              </button>
              <button
                aria-label='Clear where filters'
                className='vbi-react-button vbi-react-button--quiet'
                onClick={clearWhereFilter}
                type='button'
              >
                Clear
              </button>
            </div>
          </div>
          <ul aria-label='Where conditions' className='vbi-react-list'>
            {whereFilter.conditions.length === 0 ? <li className='vbi-react-empty'>No where filters</li> : null}
            {whereFilter.conditions.map((entry) =>
              isWhereGroup(entry) ? (
                <li className='vbi-react-card' key={entry.id}>
                  <div className='vbi-react-item__row'>
                    <div className='vbi-react-item__main'>
                      <strong className='vbi-react-item__title'>Group</strong>
                      <span className='vbi-react-item__meta'>Conditions: {entry.conditions.length}</span>
                    </div>
                    <select
                      aria-label={`Where group operator ${entry.id}`}
                      className='vbi-react-control'
                      onChange={(event) => {
                        mutateWhereFilter((nextWhereFilter) => {
                          nextWhereFilter.updateGroup(entry.id, (group) => {
                            group.setOperator(event.target.value as 'and' | 'or')
                          })
                        })
                      }}
                      value={entry.op}
                    >
                      <option value='and'>and</option>
                      <option value='or'>or</option>
                    </select>
                    <div className='vbi-react-actions'>
                      <button
                        className='vbi-react-button vbi-react-button--danger'
                        onClick={() => removeWhereEntry(entry.id)}
                        type='button'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ) : (
                <WhereFilterRow
                  entry={entry}
                  fieldOptions={fieldOptions}
                  isEditing={editingWhereId === entry.id}
                  key={entry.id}
                  onEditToggle={() => setEditingWhereId((id) => (id === entry.id ? null : entry.id))}
                  onRemove={() => removeWhereEntry(entry.id)}
                  onSave={(nextField, nextOperator, nextValue) => {
                    const draft = createWhereDraft(nextOperator, nextValue)
                    mutateWhereFilter((nextWhereFilter) => {
                      nextWhereFilter.update(entry.id, (node) => {
                        node.setField(nextField).setOperator(draft.operator)
                        if (draft.value !== undefined) node.setValue(draft.value)
                      })
                    })
                  }}
                  operatorOptions={whereOperatorOptions}
                />
              ),
            )}
          </ul>
        </section>
        <section className='vbi-react-section'>
          <div className='vbi-react-toolbar'>
            <strong className='vbi-react-section__title'>{havingTitle}</strong>
            <div className='vbi-react-control-grid'>
              <select
                aria-label='Having field'
                className='vbi-react-control'
                onChange={(event) => setSelectedHavingField(event.target.value)}
                value={selectedHavingField}
              >
                {havingFieldOptions.length === 0 ? (
                  <option value=''>No having fields available</option>
                ) : (
                  havingFieldOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {toText(option)}
                    </option>
                  ))
                )}
              </select>
              <select
                aria-label='Having aggregate'
                className='vbi-react-control'
                onChange={(event) => setSelectedHavingAggregate(event.target.value as HavingAggregateFunction)}
                value={selectedHavingAggregate}
              >
                {aggregateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {toText(option)}
                  </option>
                ))}
              </select>
              <select
                aria-label='Having operator'
                className='vbi-react-control'
                onChange={(event) => setSelectedHavingOperator(event.target.value)}
                value={selectedHavingOperator}
              >
                {havingOperatorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {toText(option)}
                  </option>
                ))}
              </select>
              <input
                aria-label='Having value'
                className='vbi-react-input'
                onInput={(event) => setHavingValue(event.currentTarget.value)}
                placeholder='Value'
                value={havingValue}
              />
              <button
                aria-label='Add having filter'
                className='vbi-react-button vbi-react-button--primary'
                disabled={!selectedHavingField}
                onClick={() => {
                  mutateHavingFilter((nextHavingFilter) => {
                    nextHavingFilter.add(selectedHavingField, (node) => {
                      node
                        .setAggregate(createHavingAggregate(selectedHavingAggregate))
                        .setOperator(normalizeOperator(selectedHavingOperator))
                        .setValue(havingValue)
                    })
                  })
                  setHavingValue('')
                }}
                type='button'
              >
                Add having
              </button>
              <button
                aria-label='Add having group'
                className='vbi-react-button'
                onClick={() => {
                  mutateHavingFilter((nextHavingFilter) => {
                    nextHavingFilter.addGroup('and', () => undefined)
                  })
                }}
                type='button'
              >
                Add group
              </button>
              <button
                aria-label='Clear having filters'
                className='vbi-react-button vbi-react-button--quiet'
                onClick={clearHavingFilter}
                type='button'
              >
                Clear
              </button>
            </div>
          </div>
          <ul aria-label='Having conditions' className='vbi-react-list'>
            {havingFilter.conditions.length === 0 ? <li className='vbi-react-empty'>No having filters</li> : null}
            {havingFilter.conditions.map((entry) =>
              isHavingGroup(entry) ? (
                <li className='vbi-react-card' key={entry.id}>
                  <div className='vbi-react-item__row'>
                    <div className='vbi-react-item__main'>
                      <strong className='vbi-react-item__title'>Group</strong>
                      <span className='vbi-react-item__meta'>Conditions: {entry.conditions.length}</span>
                    </div>
                    <select
                      aria-label={`Having group operator ${entry.id}`}
                      className='vbi-react-control'
                      onChange={(event) => {
                        mutateHavingFilter((nextHavingFilter) => {
                          nextHavingFilter.updateGroup(entry.id, (group) => {
                            group.setOperator(event.target.value as 'and' | 'or')
                          })
                        })
                      }}
                      value={entry.op}
                    >
                      <option value='and'>and</option>
                      <option value='or'>or</option>
                    </select>
                    <div className='vbi-react-actions'>
                      <button
                        className='vbi-react-button vbi-react-button--danger'
                        onClick={() => removeHavingEntry(entry.id)}
                        type='button'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ) : (
                <HavingFilterRow
                  aggregateOptions={aggregateOptions}
                  entry={entry}
                  fieldOptions={havingFieldOptions}
                  isEditing={editingHavingId === entry.id}
                  key={entry.id}
                  onEditToggle={() => setEditingHavingId((id) => (id === entry.id ? null : entry.id))}
                  onRemove={() => removeHavingEntry(entry.id)}
                  onSave={(nextField, nextAggregate, nextOperator, nextValue) => {
                    mutateHavingFilter((nextHavingFilter) => {
                      nextHavingFilter.update(entry.id, (node) => {
                        node
                          .setAggregate(createHavingAggregate(nextAggregate))
                          .setOperator(normalizeOperator(nextOperator))
                          .setValue(nextValue)
                      })
                    })
                  }}
                  operatorOptions={havingOperatorOptions}
                />
              ),
            )}
          </ul>
        </section>
      </div>
    </section>
  )
}

type WhereFilterRowProps = {
  entry: VBIWhereFilter
  fieldOptions: Array<SelectOption<string>>
  isEditing: boolean
  onEditToggle: () => void
  onRemove: () => void
  onSave: (field: string, operator: string, value: string) => void
  operatorOptions: Array<SelectOption<string>>
}

function WhereFilterRow(props: WhereFilterRowProps) {
  const { entry, fieldOptions, isEditing, onEditToggle, onRemove, onSave, operatorOptions } = props
  const [field, setField] = useState(entry.field)
  const [operator, setOperator] = useState(toOptionOperator(entry.op, operatorOptions))
  const [value, setValue] = useState(stringifyValue(entry.value))

  useEffect(() => {
    setField(entry.field)
    setOperator(toOptionOperator(entry.op, operatorOptions))
    setValue(stringifyValue(entry.value))
  }, [entry.field, entry.op, entry.value, isEditing, operatorOptions])

  return (
    <li className='vbi-react-card'>
      <div className='vbi-react-item__row'>
        <div className='vbi-react-item__main'>
          <strong className='vbi-react-item__title'>{entry.field}</strong>
          <span className='vbi-react-item__meta'>Where condition</span>
        </div>
        <FilterSummary field={entry.field} operator={entry.op} value={entry.value} />
        <div className='vbi-react-actions'>
          <button
            aria-label={isEditing ? `Finish editing where filter ${entry.field}` : `Edit where filter ${entry.field}`}
            className='vbi-react-button'
            onClick={onEditToggle}
            type='button'
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
          <button
            aria-label={`Remove where filter ${entry.field}`}
            className='vbi-react-button vbi-react-button--danger'
            onClick={onRemove}
            type='button'
          >
            Remove
          </button>
        </div>
      </div>
      {isEditing ? (
        <div className='vbi-react-editor vbi-react-filter-panel__editor'>
          <select
            aria-label={`Where field ${entry.field}`}
            className='vbi-react-control'
            onChange={(event) => setField(event.target.value)}
            value={field}
          >
            {fieldOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {toText(option)}
              </option>
            ))}
          </select>
          <select
            aria-label={`Where operator ${entry.field}`}
            className='vbi-react-control'
            onChange={(event) => setOperator(event.target.value)}
            value={operator}
          >
            {operatorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {toText(option)}
              </option>
            ))}
          </select>
          <input
            aria-label={`Where value ${entry.field}`}
            className='vbi-react-input'
            onInput={(event) => setValue(event.currentTarget.value)}
            value={value}
          />
          <button
            aria-label={`Save where filter ${entry.field}`}
            className='vbi-react-button vbi-react-button--primary'
            onClick={() => {
              onSave(field, operator, value)
              onEditToggle()
            }}
            type='button'
          >
            Save
          </button>
        </div>
      ) : null}
    </li>
  )
}

type HavingFilterRowProps = {
  aggregateOptions: Array<SelectOption<HavingAggregateFunction>>
  entry: VBIHavingFilter
  fieldOptions: Array<SelectOption<string>>
  isEditing: boolean
  onEditToggle: () => void
  onRemove: () => void
  onSave: (field: string, aggregate: HavingAggregateFunction, operator: string, value: string) => void
  operatorOptions: Array<SelectOption<string>>
}

function HavingFilterRow(props: HavingFilterRowProps) {
  const { aggregateOptions, entry, fieldOptions, isEditing, onEditToggle, onRemove, onSave, operatorOptions } = props
  const [field, setField] = useState(entry.field)
  const [aggregate, setAggregate] = useState<HavingAggregateFunction>(entry.aggregate.func)
  const [operator, setOperator] = useState(toOptionOperator(entry.op, operatorOptions))
  const [value, setValue] = useState(stringifyValue(entry.value))

  useEffect(() => {
    setField(entry.field)
    setAggregate(entry.aggregate.func)
    setOperator(toOptionOperator(entry.op, operatorOptions))
    setValue(stringifyValue(entry.value))
  }, [entry.aggregate.func, entry.field, entry.op, entry.value, isEditing, operatorOptions])

  return (
    <li className='vbi-react-card'>
      <div className='vbi-react-item__row'>
        <div className='vbi-react-item__main'>
          <strong className='vbi-react-item__title'>{entry.field}</strong>
          <span className='vbi-react-item__meta'>Having condition</span>
        </div>
        <FilterSummary aggregate={entry.aggregate.func} field={entry.field} operator={entry.op} value={entry.value} />
        <div className='vbi-react-actions'>
          <button
            aria-label={isEditing ? `Finish editing having filter ${entry.field}` : `Edit having filter ${entry.field}`}
            className='vbi-react-button'
            onClick={onEditToggle}
            type='button'
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
          <button
            aria-label={`Remove having filter ${entry.field}`}
            className='vbi-react-button vbi-react-button--danger'
            onClick={onRemove}
            type='button'
          >
            Remove
          </button>
        </div>
      </div>
      {isEditing ? (
        <div className='vbi-react-editor vbi-react-filter-panel__editor'>
          <select
            aria-label={`Having field ${entry.field}`}
            className='vbi-react-control'
            onChange={(event) => setField(event.target.value)}
            value={field}
          >
            {fieldOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {toText(option)}
              </option>
            ))}
          </select>
          <select
            aria-label={`Having aggregate ${entry.field}`}
            className='vbi-react-control'
            onChange={(event) => setAggregate(event.target.value as HavingAggregateFunction)}
            value={aggregate}
          >
            {aggregateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {toText(option)}
              </option>
            ))}
          </select>
          <select
            aria-label={`Having operator ${entry.field}`}
            className='vbi-react-control'
            onChange={(event) => setOperator(event.target.value)}
            value={operator}
          >
            {operatorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {toText(option)}
              </option>
            ))}
          </select>
          <input
            aria-label={`Having value ${entry.field}`}
            className='vbi-react-input'
            onInput={(event) => setValue(event.currentTarget.value)}
            value={value}
          />
          <button
            aria-label={`Save having filter ${entry.field}`}
            className='vbi-react-button vbi-react-button--primary'
            onClick={() => {
              onSave(field, aggregate, operator, value)
              onEditToggle()
            }}
            type='button'
          >
            Save
          </button>
        </div>
      ) : null}
    </li>
  )
}
