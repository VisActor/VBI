# ReportPageCollectionBuilder

## 属性

## 方法

### constructor

**定义**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### add

**定义**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**返回**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### remove

**定义**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**返回**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pageId` | string | - |

### update

**定义**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**返回**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### get

**定义**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**返回**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `pageId` | string | - |