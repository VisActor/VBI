# ReportPageBuilder

## 속성

## 메서드

### constructor

**정의**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `page` | `Y.Map<any>` | - |

### getId

**정의**:

```typescript
getId(): string
```

**반환**: `string`

### setTitle

**정의**:

```typescript
setTitle(title: string): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**정의**:

```typescript
setChartId(chart: ResourceReference): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**정의**:

```typescript
setInsightId(insight: ResourceReference): this
```

**반환**: `this`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**정의**:

```typescript
toJSON(): VBIReportPageDSL
```

**반환**: `VBIReportPageDSL`