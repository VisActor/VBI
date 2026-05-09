# ReportPageCollectionBuilder

## Properti

## metode

### constructor

**definisi**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### add

**definisi**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Pengembalian**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `title` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### remove

**definisi**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Pengembalian**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `pageId` | string | - |

### update

**definisi**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Pengembalian**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### get

**definisi**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Pengembalian**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**parameter**:

| Parameter | Tipe | Deskripsi |
| --- | --- | --- |
| `pageId` | string | - |