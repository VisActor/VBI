import type { BinsResult, ColumnBins, ColumnProfile, ProfileResult, VBIQueryDSL, VBIQueryResult } from '@visactor/vbi'
import { VSeedRender } from '../vseed/VSeedRender'
import { JsonRender } from './JsonRender'

type Statistics = ProfileResult | BinsResult

export const QueryResultRender = ({ value, dsl }: { value: unknown; dsl: VBIQueryDSL }) => {
  const result = value as Partial<Statistics> & {
    dataset?: VBIQueryResult['dataset']
    result?: VBIQueryResult
    profile?: ProfileResult
  }
  const dataset = result.result?.dataset ?? result.dataset
  const statistics = result.profile ?? (result.columns ? (result as Statistics) : undefined)
  const measures = [...dsl.measures, ...(dsl.calculations ?? [])]
  const fields = [...dsl.dimensions, ...measures]
  const alias = (id: string) => fields.find((field) => field.id === id)?.alias ?? id
  const columns = Object.entries<ColumnProfile | ColumnBins>(statistics?.columns ?? {})
  const summary = columns.map(([field, column]) => ({
    字段: alias(field),
    类型: 'type' in column ? column.type : 'number',
    有效数: column.validCount,
    缺失数: column.missingCount,
    最小值: column.min,
    最大值: column.max,
    其他频次: 'otherCount' in column ? column.otherCount : undefined,
  }))
  const bins = columns.flatMap(([field, column]) =>
    (column.bins ?? []).map((bin) => ({ 字段: alias(field), 下界: bin.min, 上界: bin.max, 数量: bin.count })),
  )
  const top = columns.flatMap(([field, column]) =>
    ('top' in column ? (column.top ?? []) : []).map((item) => ({
      字段: alias(field),
      取值: item.value,
      数量: item.count,
    })),
  )

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {dataset && (
        <VSeedRender
          vseed={{
            chartType: 'table',
            dataset,
            dimensions: dsl.dimensions.map(({ id, alias }) => ({ id, alias })),
            measures: measures.map(({ id, alias }) => ({ id, alias })),
            autoFillWidth: true,
          }}
        />
      )}
      {statistics && (
        <>
          <div>结果行数：{statistics.rowCount}</div>
          <div>
            <strong>字段概况</strong>
            <VSeedRender vseed={{ chartType: 'table', dataset: summary, autoFillWidth: true }} />
          </div>
          {bins.length > 0 && (
            <div>
              <strong>数值分箱</strong>
              <VSeedRender vseed={{ chartType: 'table', dataset: bins, autoFillWidth: true }} />
            </div>
          )}
          {top.length > 0 && (
            <div>
              <strong>分类频次</strong>
              <VSeedRender vseed={{ chartType: 'table', dataset: top, autoFillWidth: true }} />
            </div>
          )}
        </>
      )}
      <details>
        <summary>查看完整返回值</summary>
        <JsonRender value={value} />
      </details>
    </div>
  )
}
