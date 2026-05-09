# ReportPageBuilder

## Properti

## metode

### constructor

**definisi**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, page: Y.Map<any>)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `page` | `Y.Map<any>` | - |

### getId

**definisi**:

```typescript
getId(): string
```

**Pengembalian**: `string`

### setTitle

**definisi**:

```typescript
setTitle(title: string): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `title` | string | - |

### setChartId

**definisi**:

```typescript
setChartId(chart: ResourceReference): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `chart` | ResourceReference | - |

### setInsightId

**definisi**:

```typescript
setInsightId(insight: ResourceReference): this
```

**Pengembalian**: `this`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `insight` | ResourceReference | - |

### toJSON

**definisi**:

```typescript
toJSON(): VBIReportPageDSL
```

**Pengembalian**: `VBIReportPageDSL`