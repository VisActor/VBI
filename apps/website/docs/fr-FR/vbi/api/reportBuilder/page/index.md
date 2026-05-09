# ReportPageCollectionBuilder

## Propriétés

## Méthodes

### constructor

**définition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>)
```

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `parent` | `VBIReportBuilder<TQueryDSL, TSeedDSL>` | - |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### add

**définition**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Retour** : `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `title` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### remove

**définition**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Retour** : `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `pageId` | string | - |

### update

**définition**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Retour** : `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `pageId` | string | - |
| `callback` | `(page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void` | - |

### get

**définition**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Retour** : `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**paramètre**:

| Paramètres | taper | Description |
| --- | --- | --- |
| `pageId` | string | - |