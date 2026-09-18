# createVBI

独立した VBI インスタンスを作成します。

各インスタンスは独自のリソースレジストリを持つため、同じアプリケーション内で異なるダッシュボード、またはテストコンテキストを分離する用途に適しています。

## 関数シグネチャ

```typescript
function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
function createVBI<TQueryDSL, TSeedDSL>(defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIInstance<TQueryDSL, TSeedDSL>
```

## パラメータ

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `defaultBuilderOptions` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | デフォルトのチャート Builder 設定です。chart、dashboard 内で作成されるチャート Builder に渡されます。 |

---

# VBI

デフォルトの VBI インスタンスです。グローバルに共有される Builder とリソース機能を直接使用する場合に適しています。

**型**: `VBIInstance`

**定義**:

```typescript
const VBI: VBIInstance = createVBI()
```

---

# VBIInstance

createVBI が返す VBI インスタンスです。chart、insight、dashboard などの機能へアクセスする統一エントリポイントです。

## プロパティ

| プロパティ | 型 | 説明 |
| --- | --- | --- |
| **connectors** | `VBIConnectorNamespace` | コネクタの登録、取得、解放 API。 |
| **resources** | `VBIResourceNamespace` | chart と insight のリソース登録 API。dashboard が共有リソースを参照するために使用します。 |
| **chart** | `VBIChartNamespace<TQueryDSL, TSeedDSL>` | Chart Builder 作成 API。 |
| **insight** | `VBIInsightNamespace` | Insight Builder 作成 API。 |
| **dashboard** | `VBIDashboardNamespace<TQueryDSL, TSeedDSL>` | Dashboard Builder 作成 API。 |
