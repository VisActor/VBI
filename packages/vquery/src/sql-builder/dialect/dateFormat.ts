/**
 * 日期格式化方言适配器
 * 不同数据库使用不同的日期格式化函数和格式字符串
 */

export type DatabaseDialect = 'duckdb' | 'postgres'

/**
 * 日期格式配置
 */
export interface DateFormatConfig {
  /** 格式化函数，例如 strftime 或 TO_CHAR */
  formatFunc: string
  /** 格式字符串 */
  format: string
}

/**
 * 日期格式映射表（按周期单位）
 */
export interface DateFormatMap {
  year: DateFormatConfig
  month: DateFormatConfig
  day: DateFormatConfig
  week: DateFormatConfig
  hour: DateFormatConfig
  minute: DateFormatConfig
  second: DateFormatConfig
  quarter: DateFormatConfig
}

/**
 * DuckDB 日期格式配置
 * 使用 strftime 函数，格式字符串使用 %Y 等占位符
 */
const DUCKDB_DATE_FORMAT_MAP: DateFormatMap = {
  year: { formatFunc: 'strftime', format: '%Y' },
  month: { formatFunc: 'strftime', format: '%Y-%m' },
  day: { formatFunc: 'strftime', format: '%Y-%m-%d' },
  week: { formatFunc: 'strftime', format: '%Y-W%W' },
  hour: { formatFunc: 'strftime', format: '%Y-%m-%d %H' },
  minute: { formatFunc: 'strftime', format: '%Y-%m-%d %H:%M' },
  second: { formatFunc: 'strftime', format: '%Y-%m-%d %H:%M:%S' },
  quarter: { formatFunc: 'strftime_quarter', format: '%Y' }, // 季度需要特殊处理
}

/**
 * PostgreSQL 日期格式配置
 * 使用 TO_CHAR 函数，格式字符串使用 YYYY 等占位符
 */
const POSTGRES_DATE_FORMAT_MAP: DateFormatMap = {
  year: { formatFunc: 'TO_CHAR', format: 'YYYY' },
  month: { formatFunc: 'TO_CHAR', format: 'YYYY-MM' },
  day: { formatFunc: 'TO_CHAR', format: 'YYYY-MM-DD' },
  week: { formatFunc: 'TO_CHAR', format: 'IYYY-IW' },
  hour: { formatFunc: 'TO_CHAR', format: 'YYYY-MM-DD HH24' },
  minute: { formatFunc: 'TO_CHAR', format: 'YYYY-MM-DD HH24:MI' },
  second: { formatFunc: 'TO_CHAR', format: 'YYYY-MM-DD HH24:MI:SS' },
  quarter: { formatFunc: 'TO_CHAR_quarter', format: 'YYYY' }, // 季度需要特殊处理
}

/**
 * 获取指定方言的日期格式映射
 */
export function getDateFormatMap(dialect: DatabaseDialect): DateFormatMap {
  switch (dialect) {
    case 'postgres':
      return POSTGRES_DATE_FORMAT_MAP
    case 'duckdb':
    default:
      return DUCKDB_DATE_FORMAT_MAP
  }
}

/**
 * 根据方言和日期字段生成日期格式化 SQL 表达式
 * @param dialect 数据库方言
 * @param dateFieldExpr 日期字段表达式 (可以是字符串或 Kysely 表达式对象)
 * @param periodUnit 周期单位 (year/quarter/month/week/day/hour/minute/second)
 * @returns 格式化后的 SQL 表达式
 */
export function getDateFormatExpression(
  dialect: DatabaseDialect,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dateFieldExpr: any,
  periodUnit: string,
): string {
  const formatMap = getDateFormatMap(dialect)
  const config = formatMap[periodUnit as keyof DateFormatMap]

  // 获取字段名称，如果是 Kysely 表达式对象，尝试获取其 sql 表示
  const fieldName = typeof dateFieldExpr === 'string' ? dateFieldExpr : 'field'

  if (!config) {
    // 默认使用 year
    const defaultConfig = formatMap.year
    return `${defaultConfig.formatFunc}(CAST(${fieldName} AS TIMESTAMP), '${defaultConfig.format}')`
  }

  // 季度需要特殊处理
  if (periodUnit === 'quarter') {
    if (dialect === 'postgres') {
      return `TO_CHAR(CAST(${fieldName} AS TIMESTAMP), 'YYYY') || '-Q' || EXTRACT(QUARTER FROM CAST(${fieldName} AS TIMESTAMP))`
    }
    // DuckDB
    return `strftime(CAST(${fieldName} AS TIMESTAMP), '%Y') || '-Q' || date_part('quarter', CAST(${fieldName} AS TIMESTAMP))`
  }

  return `${config.formatFunc}(CAST(${fieldName} AS TIMESTAMP), '${config.format}')`
}
