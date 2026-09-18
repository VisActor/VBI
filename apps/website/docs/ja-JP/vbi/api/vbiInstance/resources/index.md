# VBI.resources

VBI インスタンス上のリソース名前空間です。dashboard から参照できる共有リソースを登録するために使用します。

## プロパティ

| プロパティ | 型 | 説明 |
| --- | --- | --- |
| **chart** | `VBIChartResourceNamespace` | チャートリソース管理 API。 |
| **insight** | `VBIInsightResourceNamespace` | Insight リソース管理 API。 |


## メソッド

### register

チャートと insight リソースを一括登録します。

**定義**:

```typescript
register(resources: VBIResourceRegisterInput): VBIResourceRegisterResult
```

**戻り値**: `VBIResourceRegisterResult`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `resources` | VBIResourceRegisterInput | - |

### clear

現在の VBI インスタンスのすべてのチャートと insight リソースをクリアします。

**定義**:

```typescript
clear(): void
```

**戻り値**: `void`

### snapshot

現在の VBI インスタンスから参照可能なリソースの DSL スナップショットをエクスポートします。

**定義**:

```typescript
snapshot(): VBIResourceSnapshot
```

**戻り値**: `VBIResourceSnapshot`
