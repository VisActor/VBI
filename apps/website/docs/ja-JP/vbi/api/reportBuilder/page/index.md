# ReportPageCollectionBuilder

## プロパティ

## メソッド

### constructor

**定義**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### add

**定義**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**戻り値**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `title` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### remove

**定義**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**戻り値**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `pageId` | string | - |

### update

**定義**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**戻り値**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### get

**定義**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**戻り値**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `pageId` | string | - |
