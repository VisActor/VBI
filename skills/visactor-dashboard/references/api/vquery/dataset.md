# dataset

[API 索引](index.md)

- [Dataset](dataset.md#dataset)
- [DatasetSourceBuilder](dataset.md#datasetsourcebuilder)

类型引用沿用源码模块名，包的公开导出以索引为准：

```typescript
import type {
  DatasetColumn,
  DatasetSource,
  RawDatasetSource,
  QueryDSL,
  QueryAdapter,
  StorageAdapter,
  VQueryDSL,
} from '../types'
import type { DatasetSourceType, RawDatasetSource } from '../types'
```

## Dataset

源码：[packages/vquery/src/dataset/dataset.ts](https://github.com/VisActor/VBI/blob/main/packages/vquery/src/dataset/dataset.ts#L13)

包导出：`Dataset`

```typescript
export declare class Dataset {
  constructor(queryAdapter: QueryAdapter, storageAdapter: StorageAdapter, datasetId: string)
  init(temporaryColumns?: DatasetColumn[], temporaryDatasetSource?: DatasetSource): Promise<void>
  createOrReplaceView(columns: DatasetColumn[], datasetSource: DatasetSource): Promise<void>
  /**
   * Replace the stored schema/source and reload this connected dataset, preserving its alias.
   * Operations on the connection must be ordered by the caller. If reloading fails, the updated
   * metadata remains stored; call init() to retry. An empty schema follows init() and skips loading.
   */
  replaceSource(columns: DatasetColumn[], rawDatasetSource: RawDatasetSource): Promise<void>
  query<T extends Record<string, number | string>>(
    queryDSL: QueryDSL<T> | VQueryDSL<T>,
  ): Promise<{
    performance: {
      startAt: string
      endAt: string
      duration: number
    }
    dataset: any[]
    table: any
  }>
  queryBySQL(sql: string): Promise<{
    performance: {
      startAt: string
      endAt: string
      duration: number
    }
    dataset: any[]
    table: any
  }>
  disconnect(): Promise<void>
  get datasetId(): string
}
```

## DatasetSourceBuilder

源码：[packages/vquery/src/data-source-builder/dataSourceBuilder.ts](https://github.com/VisActor/VBI/blob/main/packages/vquery/src/data-source-builder/dataSourceBuilder.ts#L9)

包导出：`DatasetSourceBuilder`

```typescript
export declare class DatasetSourceBuilder {
  constructor(raw: RawDatasetSource)
  static from(raw: RawDatasetSource): DatasetSourceBuilder
  build(): Promise<{
    type: DatasetSourceType
    blob: Blob
  }>
}
```
