import { useEffect, useMemo, useState } from 'react'
import type { VBIChartBuilder, VBIDimension, VBIMeasure } from '@visactor/vbi'

import { useDimensions, useMeasures } from '../hooks'
import type { BaseComponentProps, SelectOption } from './types'
import { joinClassNames } from './utils'

type MeasureAggregateFunction = NonNullable<NonNullable<VBIMeasure['aggregate']>['func']>
type DimensionAggregateFunction = NonNullable<NonNullable<VBIDimension['aggregate']>['func']>
type MeasureEncoding = NonNullable<VBIMeasure['encoding']>
type DimensionEncoding = NonNullable<VBIDimension['encoding']>
type FieldPanelSlotClassNames = {
  dimensionsList?: string
  dimensionsSection?: string
  measuresList?: string
  measuresSection?: string
  root?: string
}

const defaultMeasureAggregateOptions: Array<SelectOption<MeasureAggregateFunction>> = [
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

const defaultMeasureEncodingOptions: Array<SelectOption<MeasureEncoding>> = [
  { label: 'yAxis', value: 'yAxis' },
  { label: 'xAxis', value: 'xAxis' },
  { label: 'primaryYAxis', value: 'primaryYAxis' },
  { label: 'secondaryYAxis', value: 'secondaryYAxis' },
  { label: 'color', value: 'color' },
  { label: 'detail', value: 'detail' },
  { label: 'label', value: 'label' },
  { label: 'tooltip', value: 'tooltip' },
  { label: 'size', value: 'size' },
  { label: 'angle', value: 'angle' },
  { label: 'radius', value: 'radius' },
]

const defaultDimensionAggregateOptions: Array<SelectOption<DimensionAggregateFunction>> = [
  { label: 'toYear', value: 'toYear' },
  { label: 'toQuarter', value: 'toQuarter' },
  { label: 'toMonth', value: 'toMonth' },
  { label: 'toWeek', value: 'toWeek' },
  { label: 'toDay', value: 'toDay' },
  { label: 'toHour', value: 'toHour' },
  { label: 'toMinute', value: 'toMinute' },
  { label: 'toSecond', value: 'toSecond' },
]

const defaultDimensionEncodingOptions: Array<SelectOption<DimensionEncoding>> = [
  { label: 'xAxis', value: 'xAxis' },
  { label: 'yAxis', value: 'yAxis' },
  { label: 'angle', value: 'angle' },
  { label: 'color', value: 'color' },
  { label: 'detail', value: 'detail' },
  { label: 'tooltip', value: 'tooltip' },
  { label: 'label', value: 'label' },
  { label: 'row', value: 'row' },
  { label: 'column', value: 'column' },
  { label: 'player', value: 'player' },
  { label: 'hierarchy', value: 'hierarchy' },
]

export interface FieldPanelProps extends BaseComponentProps {
  builder: VBIChartBuilder
  dimensionAggregateOptions?: Array<SelectOption<DimensionAggregateFunction>>
  dimensionEncodingOptions?: Array<SelectOption<DimensionEncoding>>
  dimensionOptions?: Array<SelectOption<string>>
  dimensionsTitle?: string
  measureAggregateOptions?: Array<SelectOption<MeasureAggregateFunction>>
  measureEncodingOptions?: Array<SelectOption<MeasureEncoding>>
  measureOptions?: Array<SelectOption<string>>
  measuresTitle?: string
  slotClassNames?: FieldPanelSlotClassNames
  title?: string
}

function clampQuantile(value: number): number {
  if (Number.isNaN(value)) return 0.5
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

function toActiveSet(items: { field: string }[]): Set<string> {
  return new Set(items.map((item) => item.field))
}

function toText(option: SelectOption<string>): string {
  return typeof option.label === 'string' ? option.label : option.value
}

function FieldTags(props: { aggregate?: string; encoding?: string; role: 'dimension' | 'measure' }) {
  const { aggregate, encoding, role } = props
  return (
    <div className='vbi-react-tags'>
      <span className={`vbi-react-chip vbi-react-chip--${role}`}>{role}</span>
      {encoding ? <span className='vbi-react-chip'>Enc: {encoding}</span> : null}
      {aggregate ? <span className='vbi-react-chip'>Agg: {aggregate}</span> : null}
    </div>
  )
}

export function FieldPanel(props: FieldPanelProps) {
  const {
    builder,
    className,
    dimensionAggregateOptions = defaultDimensionAggregateOptions,
    dimensionEncodingOptions = defaultDimensionEncodingOptions,
    dimensionOptions = [],
    dimensionsTitle = 'Dimensions',
    measureAggregateOptions = defaultMeasureAggregateOptions,
    measureEncodingOptions = defaultMeasureEncodingOptions,
    measureOptions = [],
    measuresTitle = 'Measures',
    slotClassNames,
    style,
    title = 'Fields',
  } = props

  const { addDimension, dimensions, removeDimension, updateDimension } = useDimensions(builder)
  const { addMeasure, measures, removeMeasure, updateMeasure } = useMeasures(builder)
  const [selectedDimension, setSelectedDimension] = useState('')
  const [selectedMeasure, setSelectedMeasure] = useState('')
  const [editingDimensionId, setEditingDimensionId] = useState<string | null>(null)
  const [editingMeasureId, setEditingMeasureId] = useState<string | null>(null)

  const availableDimensions = useMemo(() => {
    const activeSet = toActiveSet(dimensions)
    return dimensionOptions.filter((option) => !activeSet.has(option.value))
  }, [dimensionOptions, dimensions])

  const availableMeasures = useMemo(() => {
    const activeSet = toActiveSet(measures)
    return measureOptions.filter((option) => !activeSet.has(option.value))
  }, [measureOptions, measures])

  useEffect(() => {
    if (!availableDimensions.some((option) => option.value === selectedDimension)) {
      setSelectedDimension(availableDimensions[0]?.value ?? '')
    }
  }, [availableDimensions, selectedDimension])

  useEffect(() => {
    if (!availableMeasures.some((option) => option.value === selectedMeasure)) {
      setSelectedMeasure(availableMeasures[0]?.value ?? '')
    }
  }, [availableMeasures, selectedMeasure])

  return (
    <section
      className={joinClassNames(
        'vbi-react-field-panel',
        'vbi-react-panel',
        'vbi-react-field-panel--compact',
        className,
        slotClassNames?.root,
      )}
      style={style}
    >
      <header className='vbi-react-panel__header'>
        <strong className='vbi-react-panel__title'>{title}</strong>
      </header>
      <div className='vbi-react-field-panel__sections'>
        <section className={joinClassNames('vbi-react-section', slotClassNames?.dimensionsSection)}>
          <div className='vbi-react-toolbar'>
            <strong className='vbi-react-section__title'>{dimensionsTitle}</strong>
            <div className='vbi-react-control-row vbi-react-control-row--inline'>
              <select
                aria-label='Available dimensions'
                className='vbi-react-control'
                onChange={(event) => setSelectedDimension(event.target.value)}
                value={selectedDimension}
              >
                {availableDimensions.length === 0 ? (
                  <option value=''>No dimensions available</option>
                ) : (
                  availableDimensions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {toText(option)}
                    </option>
                  ))
                )}
              </select>
              <button
                aria-label='Add dimension'
                className='vbi-react-button vbi-react-button--primary'
                disabled={!selectedDimension}
                onClick={() => addDimension(selectedDimension)}
                type='button'
              >
                Add dimension
              </button>
            </div>
          </div>
          <ul
            aria-label='Selected dimensions'
            className={joinClassNames('vbi-react-list', slotClassNames?.dimensionsList)}
          >
            {dimensions.length === 0 ? <li className='vbi-react-empty'>No dimensions selected</li> : null}
            {dimensions.map((dimension) => (
              <li className='vbi-react-card' key={dimension.id}>
                <div className='vbi-react-item__row'>
                  <div className='vbi-react-item__main'>
                    <strong className='vbi-react-item__title'>{dimension.alias || dimension.field}</strong>
                    <span className='vbi-react-item__meta'>{dimension.field}</span>
                  </div>
                  <FieldTags aggregate={dimension.aggregate?.func} encoding={dimension.encoding} role='dimension' />
                  <div className='vbi-react-actions'>
                    <button
                      aria-label={
                        editingDimensionId === dimension.id
                          ? `Finish editing dimension ${dimension.field}`
                          : `Edit dimension ${dimension.field}`
                      }
                      className='vbi-react-button'
                      onClick={() => setEditingDimensionId((id) => (id === dimension.id ? null : dimension.id))}
                      type='button'
                    >
                      {editingDimensionId === dimension.id ? 'Done' : 'Edit'}
                    </button>
                    <button
                      aria-label={`Remove dimension ${dimension.field}`}
                      className='vbi-react-button vbi-react-button--danger'
                      onClick={() => removeDimension(dimension.id)}
                      type='button'
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {editingDimensionId === dimension.id ? (
                  <div className='vbi-react-editor vbi-react-field-panel__editor'>
                    <input
                      aria-label={`Alias for dimension ${dimension.field}`}
                      className='vbi-react-input'
                      onChange={(event) => updateDimension(dimension.id, { alias: event.target.value })}
                      placeholder='Alias'
                      value={dimension.alias ?? ''}
                    />
                    <select
                      aria-label={`Encoding for dimension ${dimension.field}`}
                      className='vbi-react-control'
                      onChange={(event) =>
                        updateDimension(dimension.id, { encoding: event.target.value as DimensionEncoding })
                      }
                      value={dimension.encoding ?? 'xAxis'}
                    >
                      {dimensionEncodingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {toText(option)}
                        </option>
                      ))}
                    </select>
                    <select
                      aria-label={`Aggregate for dimension ${dimension.field}`}
                      className='vbi-react-control'
                      onChange={(event) => {
                        const nextFunc = event.target.value as DimensionAggregateFunction | ''
                        updateDimension(dimension.id, { aggregate: nextFunc ? { func: nextFunc } : null })
                      }}
                      value={dimension.aggregate?.func ?? ''}
                    >
                      <option value=''>None</option>
                      {dimensionAggregateOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {toText(option)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
        <section className={joinClassNames('vbi-react-section', slotClassNames?.measuresSection)}>
          <div className='vbi-react-toolbar'>
            <strong className='vbi-react-section__title'>{measuresTitle}</strong>
            <div className='vbi-react-control-row vbi-react-control-row--inline'>
              <select
                aria-label='Available measures'
                className='vbi-react-control'
                onChange={(event) => setSelectedMeasure(event.target.value)}
                value={selectedMeasure}
              >
                {availableMeasures.length === 0 ? (
                  <option value=''>No measures available</option>
                ) : (
                  availableMeasures.map((option) => (
                    <option key={option.value} value={option.value}>
                      {toText(option)}
                    </option>
                  ))
                )}
              </select>
              <button
                aria-label='Add measure'
                className='vbi-react-button vbi-react-button--primary'
                disabled={!selectedMeasure}
                onClick={() => addMeasure(selectedMeasure)}
                type='button'
              >
                Add measure
              </button>
            </div>
          </div>
          <ul aria-label='Selected measures' className={joinClassNames('vbi-react-list', slotClassNames?.measuresList)}>
            {measures.length === 0 ? <li className='vbi-react-empty'>No measures selected</li> : null}
            {measures.map((measure) => (
              <li className='vbi-react-card' key={measure.id}>
                <div className='vbi-react-item__row'>
                  <div className='vbi-react-item__main'>
                    <strong className='vbi-react-item__title'>{measure.alias || measure.field}</strong>
                    <span className='vbi-react-item__meta'>{measure.field}</span>
                  </div>
                  <FieldTags aggregate={measure.aggregate?.func} encoding={measure.encoding} role='measure' />
                  <div className='vbi-react-actions'>
                    <button
                      aria-label={
                        editingMeasureId === measure.id
                          ? `Finish editing measure ${measure.field}`
                          : `Edit measure ${measure.field}`
                      }
                      className='vbi-react-button'
                      onClick={() => setEditingMeasureId((id) => (id === measure.id ? null : measure.id))}
                      type='button'
                    >
                      {editingMeasureId === measure.id ? 'Done' : 'Edit'}
                    </button>
                    <button
                      aria-label={`Remove measure ${measure.field}`}
                      className='vbi-react-button vbi-react-button--danger'
                      onClick={() => removeMeasure(measure.id)}
                      type='button'
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {editingMeasureId === measure.id ? (
                  <div className='vbi-react-editor vbi-react-field-panel__editor'>
                    <input
                      aria-label={`Alias for measure ${measure.field}`}
                      className='vbi-react-input'
                      onChange={(event) => updateMeasure(measure.id, { alias: event.target.value })}
                      placeholder='Alias'
                      value={measure.alias ?? ''}
                    />
                    <select
                      aria-label={`Encoding for measure ${measure.field}`}
                      className='vbi-react-control'
                      onChange={(event) =>
                        updateMeasure(measure.id, { encoding: event.target.value as MeasureEncoding })
                      }
                      value={measure.encoding ?? 'yAxis'}
                    >
                      {measureEncodingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {toText(option)}
                        </option>
                      ))}
                    </select>
                    <select
                      aria-label={`Aggregate for measure ${measure.field}`}
                      className='vbi-react-control'
                      onChange={(event) => {
                        const func = event.target.value as MeasureAggregateFunction
                        if (func === 'quantile') {
                          updateMeasure(measure.id, { aggregate: { func: 'quantile', quantile: 0.5 } })
                          return
                        }
                        updateMeasure(measure.id, { aggregate: { func } })
                      }}
                      value={measure.aggregate?.func ?? 'sum'}
                    >
                      {measureAggregateOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {toText(option)}
                        </option>
                      ))}
                    </select>
                    {measure.aggregate?.func === 'quantile' ? (
                      <input
                        aria-label={`Quantile for measure ${measure.field}`}
                        className='vbi-react-input'
                        max={1}
                        min={0}
                        onChange={(event) => {
                          const { value } = event.target
                          const currentQuantile =
                            measure.aggregate?.func === 'quantile' ? (measure.aggregate.quantile ?? 0.5) : 0.5
                          const quantile = value === '' ? currentQuantile : clampQuantile(Number(value))
                          updateMeasure(measure.id, { aggregate: { func: 'quantile', quantile } })
                        }}
                        step={0.05}
                        type='number'
                        value={measure.aggregate?.func === 'quantile' ? (measure.aggregate.quantile ?? 0.5) : 0.5}
                      />
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
