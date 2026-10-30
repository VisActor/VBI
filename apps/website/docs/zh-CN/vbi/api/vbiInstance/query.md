# VBI.query

独立查询 Builder 创建 API，不注册图表资源。

## 方法

### create

从查询 DSL 或已恢复的 Y.Doc 创建查询 Builder。

**定义**:

```typescript
create<TQueryDSL = VQueryDSL>(input: VBIQueryDSLInput | Y.Doc, options?: VBIQueryBuilderOptions<TQueryDSL>): VBIQueryBuilder<TQueryDSL>
```

**返回**: `VBIQueryBuilder<TQueryDSL>`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `input` | VBIQueryDSLInput \| Y.Doc | - |
| `options?` | VBIQueryBuilderOptions&lt;TQueryDSL> | - |

### createEmpty

创建一个空查询 DSL。

**定义**:

```typescript
createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIQueryDSL
```

**返回**: `VBIQueryDSL`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `connectorId` | VBIConnectorId | - |
| `uuid?` | string | - |