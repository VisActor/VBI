# ReportPageCollectionBuilder

## Properties

## Methods

### constructor

**Definition**:

```typescript
constructor(parent: VBIReportBuilder<TQueryDSL, TSeedDSL>, doc: Y.Doc, dsl: Y.Map<any>, options: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>)
```

**Parameters**:

| Parameter | Type                                          | Description |
| --------- | --------------------------------------------- | ----------- |
| `parent`  | VBIReportBuilder\<TQueryDSL, TSeedDSL>        | -           |
| `doc`     | Y.Doc                                         | -           |
| `dsl`     | Y.Map<any>                                    | -           |
| `options` | VBIReportBuilderOptions\<TQueryDSL, TSeedDSL> | -           |

### add

**Definition**:

```typescript
add(title: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Returns**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameters**:

| Parameter  | Type                                                    | Description |
| ---------- | ------------------------------------------------------- | ----------- |
| `title`    | string                                                  | -           |
| `callback` | (page: ReportPageBuilder\<TQueryDSL, TSeedDSL>) => void | -           |

### remove

**Definition**:

```typescript
remove(pageId: string): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Returns**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameters**:

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| `pageId`  | string | -           |

### update

**Definition**:

```typescript
update(pageId: string, callback: (page: ReportPageBuilder<TQueryDSL, TSeedDSL>) => void): VBIReportBuilder<TQueryDSL, TSeedDSL>
```

**Returns**: `VBIReportBuilder<TQueryDSL, TSeedDSL>`

**Parameters**:

| Parameter  | Type                                                    | Description |
| ---------- | ------------------------------------------------------- | ----------- |
| `pageId`   | string                                                  | -           |
| `callback` | (page: ReportPageBuilder\<TQueryDSL, TSeedDSL>) => void | -           |

### get

**Definition**:

```typescript
get(pageId: string): ReportPageBuilder<TQueryDSL, TSeedDSL> | undefined
```

**Returns**: `ReportPageBuilder<TQueryDSL, TSeedDSL> \| undefined`

**Parameters**:

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| `pageId`  | string | -           |
