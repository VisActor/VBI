# runtime

[API 索引](index.md)

- [VQuery (VQuery.ts)](runtime.md#vquery-vqueryts)
- [VQuery (browser, default, node)](runtime.md#vquery-browser-default-node)

类型引用沿用源码模块名，包的公开导出以索引为准：

```typescript
import type { RawDatasetSource, DatasetColumn, QueryAdapter, StorageAdapter, ValidateExpressionOptions } from './types'
import type { VQueryOptions } from './types'
import { Dataset } from './dataset/dataset'
import { VQuery as VQueryCore } from './VQuery'
```

## VQuery (VQuery.ts)

源码：[packages/vquery/src/VQuery.ts](https://github.com/VisActor/VBI/blob/main/packages/vquery/src/VQuery.ts#L6)

关联声明，未从包入口独立导出。

```typescript
export declare class VQuery {
  constructor(queryAdapter: QueryAdapter, storageAdapter: StorageAdapter)
  /** Validate a numeric expression without querying data; invalid syntax, bindings or columns throw. */
  static validateExpression(expr: string, options?: ValidateExpressionOptions): void
  createDataset(datasetId: string, columns?: DatasetColumn[], rawDatasetSource?: RawDatasetSource): Promise<void>
  updateDatasetSource(datasetId: string, columns?: DatasetColumn[], rawDatasetSource?: RawDatasetSource): Promise<void>
  dropDataset(datasetId: string): Promise<void>
  connectDataset(
    datasetId: string,
    temporaryColumns?: DatasetColumn[],
    temporaryRawDatasetSource?: RawDatasetSource,
  ): Promise<Dataset>
  hasDataset(datasetId: string): Promise<boolean>
  listDatasets(): Promise<
    {
      datasetId: string
      datasetSchema: import('./types').DatasetSchema
      datasetSource?: import('./types').DatasetSource
    }[]
  >
  close(): Promise<void>
}
```

参数默认值（来自源码）：

```typescript
// validateExpression
options = {}

// createDataset
columns = []

// updateDatasetSource
columns = []
```

## VQuery (browser, default, node)

源码：[packages/vquery/src/default-vquery.ts](https://github.com/VisActor/VBI/blob/main/packages/vquery/src/default-vquery.ts#L6)

包导出：`VQuery`

继承的公开成员见：[VQuery (VQuery.ts)](runtime.md#vquery-vqueryts)。

```typescript
export declare class VQuery extends VQueryCore {
  constructor({ enableIndexedDB }?: VQueryOptions)
}
```

参数默认值（来自源码）：

```typescript
// constructor
{ enableIndexedDB = false } = {}
```
