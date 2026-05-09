# ReportPageCollectionBuilder

## Eigenschaften

## Methoden

### constructor

**Definition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### add

**Definition**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Rückgabe**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `title` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### remove

**Definition**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Rückgabe**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `pageId` | string | - |

### update

**Definition**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Rückgabe**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### get

**Definition**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Rückgabe**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameter**:

| Parameter | Typ | Beschreibung |
| --- | --- | --- |
| `pageId` | string | - |