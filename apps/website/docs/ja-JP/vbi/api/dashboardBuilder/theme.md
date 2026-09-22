# DashboardThemeBuilder

テーマ名を保存する Dashboard テーマビルダーです。スタイルの登録と解決はレンダリング層が担当します。

## メソッド

### constructor

**定義**:

```typescript
constructor(dsl: Y.Map<any>)
```

**引数**:

| 引数 | 型 | 説明 |
| --- | --- | --- |
| `dsl` | Y.Map<any> | - |

### observe

ローカル変更、取り消し、共同編集によるテーマ変更を監視し、購読解除関数を返します。

**定義**:

```typescript
observe(callback: ObserveCallback): () => void
```

**戻り値**: `() => void`

**引数**:

| 引数 | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - テーマ変更コールバック |

### setTheme

参照先のチャートを変更せず、light、dark または登録済みカスタムテーマを設定します。

**定義**:

```typescript
setTheme(theme: string): void
```

**戻り値**: `void`

**引数**:

| 引数 | 型 | 説明 |
| --- | --- | --- |
| `theme` | string | - 空でないテーマ名 |

### getTheme

テーマ名を取得します。既定値は light です。

**定義**:

```typescript
getTheme(): string
```

**戻り値**: `string`

### toJSON

テーマ名をエクスポートします。

**定義**:

```typescript
toJSON(): string
```

**戻り値**: `string`