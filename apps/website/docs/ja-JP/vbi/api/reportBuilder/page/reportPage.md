# ReportPageBuilder

## プロパティ

## メソッド

### constructor

**定義**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `page` | `Y.Map<any>` | - |

### getId

**定義**:

```typescript
getId(): string
```

**戻り値**: `string`

### setTitle

**定義**:

```typescript
setTitle(title: string): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**定義**:

```typescript
setChartId(chart: ResourceReference): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**定義**:

```typescript
setInsightId(insight: ResourceReference): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**定義**:

```typescript
toJSON(): VBIReportPageDSL
```

**戻り値**: `VBIReportPageDSL`
