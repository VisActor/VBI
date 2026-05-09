# ReportPageCollectionBuilder

## Thuộc tính

## Phương pháp

### constructor

**Định nghĩa**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### add

**Định nghĩa**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Trở về**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `title` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### remove

**Định nghĩa**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Trở về**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `pageId` | string | - |

### update

**Định nghĩa**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Trở về**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### get

**Định nghĩa**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Trở về**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `pageId` | string | - |