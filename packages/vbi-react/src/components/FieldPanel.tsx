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

function RowTags(props: { aggregate?: string; encoding?: string }) {
  const { aggregate, encoding } = props
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {encoding ? (
        <span
          style={{ border: '1px solid #d9d9d9', borderRadius: 999, color: '#5f6673', fontSize: 11, padding: '1px 6px' }}
        >
          Enc: {encoding}
        </span>
      ) : null}
      {aggregate ? (
        <span
          style={{ border: '1px solid #d9d9d9', borderRadius: 999, color: '#5f6673', fontSize: 11, padding: '1px 6px' }}
        >
          Agg: {aggregate}
        </span>
      ) : null}
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
  const controlHeight = 24
  const panelGap = 8
  const itemPadding = 6

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
        'vbi-react-field-panel--compact',
        className,
        slotClassNames?.root,
      )}
      style={{
        display: 'grid',
        fontSize: 12,
        gap: panelGap,
        gridTemplateRows: 'auto minmax(0, 1fr)',
        minHeight: 0,
        ...style,
      }}
    >
      <header>
        <strong>{title}</strong>
      </header>
      <div style={{ display: 'grid', gap: panelGap, gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)', minHeight: 0 }}>
        <section
          className={slotClassNames?.dimensionsSection}
          style={{ display: 'grid', gap: 6, gridTemplateRows: 'auto minmax(0, 1fr)', minHeight: 0 }}
        >
          <div style={{ display: 'grid', gap: 6 }}>
            <strong>{dimensionsTitle}</strong>
            <div style={{ display: 'flex', gap: 6 }}>
              <select
                aria-label='Available dimensions'
                onChange={(event) => setSelectedDimension(event.target.value)}
                style={{
                  border: '1px solid #c7cad1',
                  borderRadius: 6,
                  flex: 1,
                  height: controlHeight,
                  minWidth: 0,
                  padding: '0 8px',
                }}
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
                disabled={!selectedDimension}
                onClick={() => addDimension(selectedDimension)}
                style={{
                  border: '1px solid #c7cad1',
                  borderRadius: 6,
                  cursor: 'pointer',
                  height: controlHeight,
                  padding: '0 8px',
                }}
                type='button'
              >
                Add dimension
              </button>
            </div>
          </div>
          <ul
            aria-label='Selected dimensions'
            className={slotClassNames?.dimensionsList}
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: 8,
              display: 'grid',
              gap: 6,
              listStyle: 'none',
              margin: 0,
              minHeight: 0,
              overflowY: 'auto',
              padding: 6,
            }}
          >
            {dimensions.length === 0 ? <li style={{ color: '#5f6673' }}>No dimensions selected</li> : null}
            {dimensions.map((dimension) => (
              <li
                key={dimension.id}
                style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: 8, padding: itemPadding }}
              >
                <div
                  style={{
                    alignItems: 'center',
                    display: 'grid',
                    gap: 6,
                    gridTemplateColumns: 'minmax(0, 1fr) auto auto',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <strong
                      style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {dimension.alias || dimension.field}
                    </strong>
                    <span
                      style={{
                        color: '#5f6673',
                        display: 'block',
                        fontSize: 11,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {dimension.field}
                    </span>
                  </div>
                  <RowTags aggregate={dimension.aggregate?.func} encoding={dimension.encoding} />
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button
                      aria-label={
                        editingDimensionId === dimension.id
                          ? `Finish editing dimension ${dimension.field}`
                          : `Edit dimension ${dimension.field}`
                      }
                      onClick={() => setEditingDimensionId((id) => (id === dimension.id ? null : dimension.id))}
                      style={{
                        border: '1px solid #c7cad1',
                        borderRadius: 6,
                        cursor: 'pointer',
                        height: controlHeight,
                        padding: '0 8px',
                      }}
                      type='button'
                    >
                      {editingDimensionId === dimension.id ? 'Done' : 'Edit'}
                    </button>
                    <button
                      aria-label={`Remove dimension ${dimension.field}`}
                      onClick={() => removeDimension(dimension.id)}
                      style={{
                        border: '1px solid #c7cad1',
                        borderRadius: 6,
                        cursor: 'pointer',
                        height: controlHeight,
                        padding: '0 8px',
                      }}
                      type='button'
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {editingDimensionId === dimension.id ? (
                  <div
                    style={{ display: 'grid', gap: 6, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginTop: 6 }}
                  >
                    <input
                      aria-label={`Alias for dimension ${dimension.field}`}
                      onChange={(event) => updateDimension(dimension.id, { alias: event.target.value })}
                      placeholder='Alias'
                      style={{
                        border: '1px solid #c7cad1',
                        borderRadius: 6,
                        height: controlHeight,
                        minWidth: 0,
                        padding: '0 8px',
                      }}
                      value={dimension.alias ?? ''}
                    />
                    <select
                      aria-label={`Encoding for dimension ${dimension.field}`}
                      onChange={(event) =>
                        updateDimension(dimension.id, { encoding: event.target.value as DimensionEncoding })
                      }
                      style={{
                        border: '1px solid #c7cad1',
                        borderRadius: 6,
                        height: controlHeight,
                        minWidth: 0,
                        padding: '0 8px',
                      }}
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
                      onChange={(event) => {
                        const nextFunc = event.target.value as DimensionAggregateFunction | ''
                        updateDimension(dimension.id, { aggregate: nextFunc ? { func: nextFunc } : null })
                      }}
                      style={{
                        border: '1px solid #c7cad1',
                        borderRadius: 6,
                        height: controlHeight,
                        minWidth: 0,
                        padding: '0 8px',
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
        <section
          className={slotClassNames?.measuresSection}
          style={{ display: 'grid', gap: 6, gridTemplateRows: 'auto minmax(0, 1fr)', minHeight: 0 }}
        >
          <div style={{ display: 'grid', gap: 6 }}>
            <strong>{measuresTitle}</strong>
            <div style={{ display: 'flex', gap: 6 }}>
              <select
                aria-label='Available measures'
                onChange={(event) => setSelectedMeasure(event.target.value)}
                style={{
                  border: '1px solid #c7cad1',
                  borderRadius: 6,
                  flex: 1,
                  height: controlHeight,
                  minWidth: 0,
                  padding: '0 8px',
                }}
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
                disabled={!selectedMeasure}
                onClick={() => addMeasure(selectedMeasure)}
                style={{
                  border: '1px solid #c7cad1',
                  borderRadius: 6,
                  cursor: 'pointer',
                  height: controlHeight,
                  padding: '0 8px',
                }}
                type='button'
              >
                Add measure
              </button>
            </div>
          </div>
          <ul
            aria-label='Selected measures'
            className={slotClassNames?.measuresList}
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: 8,
              display: 'grid',
              gap: 6,
              listStyle: 'none',
              margin: 0,
              minHeight: 0,
              overflowY: 'auto',
              padding: 6,
            }}
          >
            {measures.length === 0 ? <li style={{ color: '#5f6673' }}>No measures selected</li> : null}
            {measures.map((measure) => (
              <li
                key={measure.id}
                style={{ background: '#fff', border: '1px solid #d9d9d9', borderRadius: 8, padding: itemPadding }}
              >
                <div
                  style={{
                    alignItems: 'center',
                    display: 'grid',
                    gap: 6,
                    gridTemplateColumns: 'minmax(0, 1fr) auto auto',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <strong
                      style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {measure.alias || measure.field}
                    </strong>
                    <span
                      style={{
                        color: '#5f6673',
                        display: 'block',
                        fontSize: 11,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {measure.field}
                    </span>
                  </div>
                  <RowTags aggregate={measure.aggregate?.func} encoding={measure.encoding} />
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button
                      aria-label={
                        editingMeasureId === measure.id
                          ? `Finish editing measure ${measure.field}`
                          : `Edit measure ${measure.field}`
                      }
                      onClick={() => setEditingMeasureId((id) => (id === measure.id ? null : measure.id))}
                      style={{
                        border: '1px solid #c7cad1',
                        borderRadius: 6,
                        cursor: 'pointer',
                        height: controlHeight,
                        padding: '0 8px',
                      }}
                      type='button'
                    >
                      {editingMeasureId === measure.id ? 'Done' : 'Edit'}
                    </button>
                    <button
                      aria-label={`Remove measure ${measure.field}`}
                      onClick={() => removeMeasure(measure.id)}
                      style={{
                        border: '1px solid #c7cad1',
                        borderRadius: 6,
                        cursor: 'pointer',
                        height: controlHeight,
                        padding: '0 8px',
                      }}
                      type='button'
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {editingMeasureId === measure.id ? (
                  <div
                    style={{ display: 'grid', gap: 6, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginTop: 6 }}
                  >
                    <input
                      aria-label={`Alias for measure ${measure.field}`}
                      onChange={(event) => updateMeasure(measure.id, { alias: event.target.value })}
                      placeholder='Alias'
                      style={{
                        border: '1px solid #c7cad1',
                        borderRadius: 6,
                        height: controlHeight,
                        minWidth: 0,
                        padding: '0 8px',
                      }}
                      value={measure.alias ?? ''}
                    />
                    <select
                      aria-label={`Encoding for measure ${measure.field}`}
                      onChange={(event) =>
                        updateMeasure(measure.id, { encoding: event.target.value as MeasureEncoding })
                      }
                      style={{
                        border: '1px solid #c7cad1',
                        borderRadius: 6,
                        height: controlHeight,
                        minWidth: 0,
                        padding: '0 8px',
                      }}
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
                      onChange={(event) => {
                        const func = event.target.value as MeasureAggregateFunction
                        if (func === 'quantile') {
                          updateMeasure(measure.id, { aggregate: { func: 'quantile', quantile: 0.5 } })
                          return
                        }
                        updateMeasure(measure.id, { aggregate: { func } })
                      }}
                      style={{
                        border: '1px solid #c7cad1',
                        borderRadius: 6,
                        height: controlHeight,
                        minWidth: 0,
                        padding: '0 8px',
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
                        style={{
                          border: '1px solid #c7cad1',
                          borderRadius: 6,
                          height: controlHeight,
                          minWidth: 0,
                          padding: '0 8px',
                        }}
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
