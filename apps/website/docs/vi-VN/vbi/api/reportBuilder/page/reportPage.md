# ReportPageBuilder

## Thuộc tính

## Phương pháp

### constructor

**Định nghĩa**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `page` | `Y.Map<any>` | - |

### getId

**Định nghĩa**:

```typescript
getId(): string
```

**Trở về**: `string`

### setTitle

**Định nghĩa**:

```typescript
setTitle(title: string): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**Định nghĩa**:

```typescript
setChartId(chart: ResourceReference): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**Định nghĩa**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**Định nghĩa**:

```typescript
toJSON(): VBIReportPageDSL
```

**Trở về**: `VBIReportPageDSL`