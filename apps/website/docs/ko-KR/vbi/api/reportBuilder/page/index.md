# ReportPageCollectionBuilder

## 속성

## 메서드

### constructor

**정의**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### add

**정의**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**반환**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `title` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### remove

**정의**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**반환**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `pageId` | string | - |

### update

**정의**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**반환**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### get

**정의**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**반환**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**매개변수**:

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| `pageId` | string | - |