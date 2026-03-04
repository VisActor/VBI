# VQuery 同环比功能设计方案 (最终版)

## 1. 设计概述

将"偏移窗口"抽象为配置，通过两段式 SQL 实现：
1. 先按粒度聚合成时间序列
2. 再做 offset join

---

## 2. DSL 设计

### 2.1 类型定义

```typescript
// Period 配置
export type PeriodConfig = {
  // 基准日期字段（必选）
  dateField: string
  
  // 偏移单位（必选）
  offsetUnit: 'year' | 'quarter' | 'month' | 'week' | 'day'
  
  // 偏移量（必选，仅数字）
  offset: number
}

// SelectItem
export type SelectItem<T> = {
  field: keyof T
  alias?: string
  aggr?: {
    func: AggregateFunction
    quantile?: number
  }
  period?: PeriodConfig
}
```

### 2.2 使用示例

```typescript
const vquery = {
  select: [
    'month',
    
    // 普通聚合
    { field: 'sales', aggr: { func: 'sum' }, alias: 'current' },
    
    // 同比：offsetUnit = year, offset = -1
    { 
      field: 'sales', 
      aggr: { func: 'sum' },
      period: { 
        dateField: 'order_date',
        offsetUnit: 'year',
        offset: -1
      }, 
      alias: 'sales_last_year' 
    },
    
    // 环比：offsetUnit = month, offset = -1
    { 
      field: 'sales', 
      aggr: { func: 'sum' },
      period: { 
        dateField: 'order_date',
        offsetUnit: 'month',
        offset: -1
      }, 
      alias: 'sales_last_month' 
    },
    
    // QOQ：offsetUnit = quarter, offset = -1
    { 
      field: 'sales', 
      aggr: { func: 'sum' },
      period: { 
        dateField: 'order_date',
        offsetUnit: 'quarter',
        offset: -1
      }, 
      alias: 'sales_last_quarter' 
    }
  ],
  groupBy: ['month']
}
```

---

## 3. SQL 生成

### 3.1 核心规则

两段式 SQL：
1. **第一段**：按粒度聚合成时间序列
2. **第二段**：按时间键做 offset JOIN

```sql
-- 第一段：按月聚合
WITH monthly_sales AS (
  SELECT 
    DATE_TRUNC('month', order_date) AS period_key,
    SUM(sales) AS current
  FROM orders
  GROUP BY DATE_TRUNC('month', order_date)
)
-- 第二段：偏移 JOIN
SELECT 
  cur.period_key AS month,
  cur.current AS current,
  ly.current AS sales_last_year,
  lm.current AS sales_last_month
FROM monthly_sales cur
LEFT JOIN monthly_sales ly ON ly.period_key = cur.period_key - INTERVAL '1 year'
LEFT JOIN monthly_sales lm ON lm.period_key = cur.period_key - INTERVAL '1 month'
ORDER BY cur.period_key
```

### 3.2 offsetUnit 映射

| offsetUnit | INTERVAL |
|------------|----------|
| year | INTERVAL '1 year' |
| quarter | INTERVAL '3 month' |
| month | INTERVAL '1 month' |
| week | INTERVAL '1 week' |
| day | INTERVAL '1 day' |

---

## 4. 设计要点

| 设计点 | 说明 |
|--------|------|
| dateField | 必选，每个 period 独立指定基准日期字段 |
| offsetUnit | 必选，year/quarter/month/week/day |
| offset | 必选，仅支持 number |
| SQL 结构 | 两段式：先聚合时间序列，再 offset JOIN |
| 语义精准 | 完全明确每个字段的对比逻辑 |
| 多 dateField | 分别生成序列，最后按时间键 JOIN |

---

**方案完成，请龙王审核！**