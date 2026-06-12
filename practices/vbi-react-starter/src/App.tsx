import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { VBI } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'
import { FieldPanel, FilterPanel } from '@visactor/vbi-react/components'
import type { DatasetColumn } from '@visactor/vquery'

import './App.css'
import { StarterFooter, type StarterFooterProps } from './components/StarterFooter'
import { StarterMainPanel } from './components/StarterMainPanel'
import { StarterTopBar } from './components/StarterTopBar'
import './styles/tokens.css'
import { createLocalConnector, setLocalDataWithSchema, type LocalRow } from './utils/localConnector'
import { clearBuilderSelections, inferSchema, rowsToDataset } from './utils/dataset'
import { readDebugState } from './utils/debugState'
import { isCompactViewport } from './utils/layout'
import { parseCsv } from './utils/parseCsv'
import { supermarketSchema } from './utils/supermarketSchema'

type DemoStatusTone = StarterFooterProps['statusTone']

const CONNECTOR_ID = 'vbiReactStarterLocalDataConnector'

let connectorInitialized = false

function ensureConnectorInitialized() {
  if (connectorInitialized) {
    return
  }

  createLocalConnector(CONNECTOR_ID)
  connectorInitialized = true
}

function parseCsvRows(csvText: string) {
  const [headerRow = [], ...dataRows] = parseCsv(csvText)
  const headers = headerRow.map((header) => header.trim())

  if (headers.length === 0) {
    throw new Error('CSV is empty')
  }

  return { dataRows, headers }
}

function inferDimensionAndMeasureOptions(schema: DatasetColumn[]) {
  const dimensions: string[] = []
  const measures: string[] = []

  for (const field of schema) {
    if (field.type === 'number') {
      measures.push(field.name)
      continue
    }

    dimensions.push(field.name)
  }

  return { dimensions, measures }
}

function extractDatasetFromCsv(csvText: string, schema: DatasetColumn[]) {
  const { dataRows, headers } = parseCsvRows(csvText)
  return rowsToDataset(headers, dataRows, schema)
}

function extractDatasetFromUploadedCsv(csvText: string) {
  const { dataRows, headers } = parseCsvRows(csvText)
  const schema = inferSchema(headers, dataRows)
  const data = rowsToDataset(headers, dataRows, schema)
  return { data, schema }
}

export function APP() {
  const debugState = typeof window === 'undefined' ? 'none' : readDebugState(window.location.search)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const [builder] = useState(() => {
    ensureConnectorInitialized()
    return VBI.chart.create(VBI.chart.createEmpty(CONNECTOR_ID))
  })
  const { dsl } = useVBI(builder)
  const [availableDimensions, setAvailableDimensions] = useState<string[]>([])
  const [availableMeasures, setAvailableMeasures] = useState<string[]>([])
  const [dataSourceLabel, setDataSourceLabel] = useState('未加载数据')
  const [rowCount, setRowCount] = useState(0)
  const [statusMessage, setStatusMessage] = useState('先加载 demo 数据或上传 CSV，再用 starter components 组装图表。')
  const [statusTone, setStatusTone] = useState<DemoStatusTone>('idle')
  const [isCompactLayout, setIsCompactLayout] = useState(() =>
    typeof window === 'undefined' ? false : isCompactViewport(window.innerWidth),
  )
  const [isFieldPanelVisible, setIsFieldPanelVisible] = useState(() =>
    typeof window === 'undefined' ? true : !isCompactViewport(window.innerWidth),
  )
  const wasCompactLayoutRef = useRef(isCompactLayout)

  const dimensionOptions = useMemo(
    () => availableDimensions.map((field) => ({ label: field, value: field })),
    [availableDimensions],
  )

  const measureOptions = useMemo(
    () => availableMeasures.map((field) => ({ label: field, value: field })),
    [availableMeasures],
  )

  const filterFieldOptions = useMemo(() => {
    const fields = new Set<string>()

    return [...dimensionOptions, ...measureOptions].filter((option) => {
      if (fields.has(option.value)) {
        return false
      }

      fields.add(option.value)
      return true
    })
  }, [dimensionOptions, measureOptions])

  const hasAvailableFields = availableDimensions.length > 0 || availableMeasures.length > 0
  const hasConfiguredFields = (dsl.dimensions?.length ?? 0) > 0 || (dsl.measures?.length ?? 0) > 0

  const refreshAvailableFields = async () => {
    const schema = (await builder.getSchema()) as DatasetColumn[]
    const { dimensions, measures } = inferDimensionAndMeasureOptions(schema)

    setAvailableDimensions(dimensions)
    setAvailableMeasures(measures)
  }

  const applyDataset = async (data: LocalRow[], schema: DatasetColumn[], sourceLabel: string) => {
    setLocalDataWithSchema(data, schema)
    clearBuilderSelections(builder)
    await refreshAvailableFields()
    setDataSourceLabel(sourceLabel)
    setRowCount(data.length)
    setStatusTone('success')
    setStatusMessage(`已加载 ${data.length} 行数据。先在左侧添加维度和指标，再切换图表类型。`)
  }

  const handleLoadDemoData = async () => {
    try {
      const response = await fetch('https://visactor.github.io/VBI/dataset/supermarket.csv')

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const csv = await response.text()
      const data = extractDatasetFromCsv(csv, supermarketSchema)
      await applyDataset(data, supermarketSchema, 'supermarket.csv')
    } catch (error) {
      console.error('Failed to load starter demo data:', error)
      setStatusTone('error')
      setStatusMessage('加载 demo 数据失败，请稍后重试。')
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const text = await file.text()
      const { data, schema } = extractDatasetFromUploadedCsv(text)
      await applyDataset(data, schema, file.name)
    } catch (error) {
      console.error('Failed to load uploaded CSV:', error)
      setStatusTone('error')
      setStatusMessage(`读取文件 ${file.name} 失败，请检查 CSV 格式。`)
    } finally {
      event.target.value = ''
    }
  }

  useEffect(() => {
    void refreshAvailableFields()
  }, [builder])

  useEffect(() => {
    const syncPanelWidth = () => {
      const nextWidth = pageRef.current?.clientWidth || window.innerWidth
      const nextCompact = isCompactViewport(nextWidth)

      setIsCompactLayout(nextCompact)

      if (nextCompact && !wasCompactLayoutRef.current) {
        setIsFieldPanelVisible(false)
      }
      if (!nextCompact) {
        setIsFieldPanelVisible(true)
      }
      wasCompactLayoutRef.current = nextCompact
    }

    syncPanelWidth()

    const pageElement = pageRef.current
    const resizeObserver =
      typeof ResizeObserver === 'undefined' || !pageElement ? null : new ResizeObserver(syncPanelWidth)

    if (pageElement) {
      resizeObserver?.observe(pageElement)
    }
    window.addEventListener('resize', syncPanelWidth)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', syncPanelWidth)
    }
  }, [])

  const fieldPanel = (
    <FieldPanel
      builder={builder}
      className='starter-field-panel'
      dimensionOptions={dimensionOptions}
      measureOptions={measureOptions}
      title='Starter Fields'
    />
  )
  const filterPanel = (
    <FilterPanel
      aggregateOptions={[
        { label: 'Sum', value: 'sum' },
        { label: 'Average', value: 'avg' },
        { label: 'Count', value: 'count' },
        { label: 'Max', value: 'max' },
        { label: 'Min', value: 'min' },
      ]}
      builder={builder}
      className='starter-filter-panel'
      fieldOptions={filterFieldOptions}
      havingFieldOptions={measureOptions}
      havingTitle='Having'
      title='Starter Filters'
      whereTitle='Where'
    />
  )

  return (
    <div
      className={[
        'starter-page',
        'starter-theme',
        isCompactLayout ? 'starter-page--compact' : '',
        isCompactLayout && isFieldPanelVisible ? 'starter-page--panel-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      ref={pageRef}
    >
      <StarterTopBar
        builder={builder}
        isFieldPanelVisible={!isCompactLayout || isFieldPanelVisible}
        isToggleVisible={isCompactLayout}
        onLoadDemoData={() => {
          void handleLoadDemoData()
        }}
        onToggleFieldPanel={() => {
          setIsFieldPanelVisible((visible) => !visible)
        }}
        onUploadClick={handleUploadClick}
      />

      <section className='starter-workbench' aria-label='VBI starter workbench'>
        {(!isCompactLayout || isFieldPanelVisible) && (
          <aside className='starter-workbench__panel starter-workbench__panel--fields' aria-label='Fields panel'>
            {fieldPanel}
          </aside>
        )}

        <main className='starter-chart-stage' aria-label='Chart workspace'>
          <div className='starter-chart-stage__header'>
            <div>
              <span className='starter-chart-stage__eyebrow'>Chart Workspace</span>
              <strong className='starter-chart-stage__title'>
                {hasConfiguredFields ? 'Rendered VSeed output' : 'Configure fields to render'}
              </strong>
            </div>
            <span className='starter-chart-stage__meta'>{rowCount > 0 ? `${rowCount} rows` : 'No data'}</span>
          </div>
          <div className='starter-chart-stage__body'>
            <StarterMainPanel
              builder={builder}
              debugState={debugState}
              hasAvailableFields={hasAvailableFields}
              hasConfiguredFields={hasConfiguredFields}
              isCompactLayout={isCompactLayout}
              isFieldPanelVisible={isFieldPanelVisible}
              onLoadDemoData={() => {
                void handleLoadDemoData()
              }}
              onShowFieldPanel={() => {
                setIsFieldPanelVisible(true)
              }}
            />
          </div>
        </main>

        {(!isCompactLayout || isFieldPanelVisible) && (
          <aside className='starter-workbench__panel starter-workbench__panel--filters' aria-label='Filters panel'>
            {filterPanel}
          </aside>
        )}
      </section>

      <section className='starter-insights-slot' aria-label='Starter diagnostics'>
        <StarterFooter
          availableDimensionsCount={availableDimensions.length}
          availableMeasuresCount={availableMeasures.length}
          dataSourceLabel={dataSourceLabel}
          dsl={dsl}
          rowCount={rowCount}
          statusMessage={statusMessage}
          statusTone={statusTone}
        />
      </section>

      <input accept='.csv,text/csv' hidden onChange={handleFileChange} ref={fileInputRef} type='file' />
    </div>
  )
}

export default APP
