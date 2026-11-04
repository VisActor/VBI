# @visactor/vquery API

适用版本：`0.7.4`。
包含 TypeScript 公开导出、接口声明与使用说明；实现代码、private / protected 成员不属于此 API。

## 分类

- [adapters](vquery-adapters.md)
- [dataset](vquery-dataset.md)
- [runtime](vquery-runtime.md)
- [sql-compiler](vquery-sql-compiler.md)
- [types](vquery-types.md)
- [utils](vquery-utils.md)

## 公开导出（48）

| 导出                        | 入口条件               | 声明                                                                             |
| --------------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `CompileQueryOptions`       | browser, default, node | [CompileQueryOptions](vquery-sql-compiler.md#compilequeryoptions)                |
| `CompiledQuery`             | browser, default, node | [CompiledQuery](vquery-sql-compiler.md#compiledquery)                            |
| `DataType`                  | browser, default, node | [DataType](vquery-types.md#datatype)                                             |
| `Dataset`                   | browser, default, node | [Dataset](vquery-dataset.md#dataset)                                             |
| `DatasetColumn`             | browser, default, node | [DatasetColumn](vquery-types.md#datasetcolumn)                                   |
| `DatasetSchema`             | browser, default, node | [DatasetSchema](vquery-types.md#datasetschema)                                   |
| `DatasetSource`             | browser, default, node | [DatasetSource](vquery-types.md#datasetsource)                                   |
| `DatasetSourceBuilder`      | browser, default, node | [DatasetSourceBuilder](vquery-dataset.md#datasetsourcebuilder)                   |
| `DatasetSourceType`         | browser, default, node | [DatasetSourceType](vquery-types.md#datasetsourcetype)                           |
| `DatasetSourceValue`        | browser, default, node | [DatasetSourceValue](vquery-types.md#datasetsourcevalue)                         |
| `GroupBy`                   | browser, default, node | [GroupBy](vquery-types.md#groupby)                                               |
| `Having`                    | browser, default, node | [Having](vquery-types.md#having)                                                 |
| `HavingAggregateFunction`   | browser, default, node | [HavingAggregateFunction](vquery-types.md#havingaggregatefunction)               |
| `HavingAggregation`         | browser, default, node | [HavingAggregation](vquery-types.md#havingaggregation)                           |
| `HavingClause`              | browser, default, node | [HavingClause](vquery-types.md#havingclause)                                     |
| `HavingComparisonOperator`  | browser, default, node | [HavingComparisonOperator](vquery-types.md#havingcomparisonoperator)             |
| `HavingGroup`               | browser, default, node | [HavingGroup](vquery-types.md#havinggroup)                                       |
| `HavingLeaf`                | browser, default, node | [HavingLeaf](vquery-types.md#havingleaf)                                         |
| `HavingOperator`            | browser, default, node | [HavingOperator](vquery-types.md#havingoperator)                                 |
| `InMemoryAdapter`           | node                   | [InMemoryAdapter](vquery-adapters.md#inmemoryadapter)                            |
| `InMemoryQueryAdapter`      | browser, default, node | [InMemoryQueryAdapter](vquery-adapters.md#inmemoryqueryadapter)                  |
| `IndexedDBAdapter`          | browser, default       | [IndexedDBAdapter](vquery-adapters.md#indexeddbadapter)                          |
| `OrderBy`                   | browser, default, node | [OrderBy](vquery-types.md#orderby)                                               |
| `QueryAdapter`              | browser, default, node | [QueryAdapter](vquery-types.md#queryadapter)                                     |
| `QueryDSL`                  | browser, default, node | [QueryDSL](vquery-types.md#querydsl)                                             |
| `QueryDialect`              | browser, default, node | [QueryDialect](vquery-sql-compiler.md#querydialect)                              |
| `QueryResult`               | browser, default, node | [QueryResult](vquery-types.md#queryresult)                                       |
| `QueryTable`                | browser, default, node | [QueryTable](vquery-sql-compiler.md#querytable)                                  |
| `RawDatasetSource`          | browser, default, node | [RawDatasetSource](vquery-types.md#rawdatasetsource)                             |
| `Select`                    | browser, default, node | [Select](vquery-types.md#select)                                                 |
| `StorageAdapter`            | browser, default, node | [StorageAdapter](vquery-types.md#storageadapter)                                 |
| `TidyDatum`                 | browser, default, node | [TidyDatum](vquery-types.md#tidydatum)                                           |
| `VQuery`                    | browser, default, node | [VQuery (browser, default, node)](vquery-runtime.md#vquery-browser-default-node) |
| `VQueryDSL`                 | browser, default, node | [VQueryDSL](vquery-types.md#vquerydsl)                                           |
| `VQueryOptions`             | browser, default, node | [VQueryOptions](vquery-types.md#vqueryoptions)                                   |
| `ValidateExpressionOptions` | browser, default, node | [ValidateExpressionOptions](vquery-types.md#validateexpressionoptions)           |
| `Where`                     | browser, default, node | [Where](vquery-types.md#where)                                                   |
| `WhereClause`               | browser, default, node | [WhereClause](vquery-types.md#whereclause)                                       |
| `WhereGroup`                | browser, default, node | [WhereGroup](vquery-types.md#wheregroup)                                         |
| `WhereLeaf`                 | browser, default, node | [WhereLeaf](vquery-types.md#whereleaf)                                           |
| `compileQuery`              | browser, default, node | [compileQuery](vquery-sql-compiler.md#compilequery)                              |
| `convertDSLToDuckDB`        | browser, default, node | [convertDSLToDuckDB](vquery-sql-compiler.md#convertdsltoduckdb)                  |
| `convertDSLToMysql`         | browser, default, node | [convertDSLToMysql](vquery-sql-compiler.md#convertdsltomysql)                    |
| `getQuerySchema`            | browser, default, node | [getQuerySchema](vquery-sql-compiler.md#getqueryschema)                          |
| `isBase64Url`               | browser, default, node | [isBase64Url](vquery-utils.md#isbase64url)                                       |
| `isHttpUrl`                 | browser, default, node | [isHttpUrl](vquery-utils.md#ishttpurl)                                           |
| `isUrl`                     | browser, default, node | [isUrl](vquery-utils.md#isurl)                                                   |
| `validateQuery`             | browser, default, node | [validateQuery](vquery-sql-compiler.md#validatequery)                            |
