# DashboardThemeBuilder

Dashboard テーマビルダー。設定、プリセット、購読、VSeed 登録を管理し、コンポーネントは解決済みの結果を利用します。

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

ローカル変更、元に戻す・やり直す操作、共同編集によるテーマ名や設定の変更を購読します。購読解除関数を返します。

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

テーマを選択します。設定を渡すと、事前登録なしで保存と選択を一度に行います。参照先のチャートは変更しません。

**定義**:

```typescript
setTheme(theme: string, definition?: VBIDashboardThemeDefinition): void
```

**戻り値**: `void`

**引数**:

| 引数 | 型 | 説明 |
| --- | --- | --- |
| `theme` | string | - 空でないテーマ名 |
| `definition?` | VBIDashboardThemeDefinition | - この Dashboard に保存する完全な設定（省略可能） |

### registerTheme

選択を変更せず、文書内のテーマ設定を登録または更新します。設定は文書とともに保存・同期されます。

**定義**:

```typescript
registerTheme(theme: string, definition: VBIDashboardThemeDefinition): void
```

**戻り値**: `void`

**引数**:

| 引数 | 型 | 説明 |
| --- | --- | --- |
| `theme` | string | - 空でないテーマ名 |
| `definition` | VBIDashboardThemeDefinition | - 完全なテーマ設定 |

### getThemeConfig

文書内の設定を内蔵プリセットより優先し、コピーを返します。未定義の場合は undefined を返します。

**定義**:

```typescript
getThemeConfig(theme?: string): VBIDashboardThemeDefinition | undefined
```

**戻り値**: `VBIDashboardThemeDefinition \| undefined`

**引数**:

| 引数 | 型 | 説明 |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - テーマ名。省略時は現在のテーマ |

### getThemeDefinitions

文書内のすべてのテーマ設定のコピーを返します。observe で選択可能なテーマの変更を購読できます。

**定義**:

```typescript
getThemeDefinitions(): Record<string, VBIDashboardThemeDefinition>
```

**戻り値**: `Record<string, VBIDashboardThemeDefinition>`

### getThemeOptions

内蔵テーマと文書内テーマの名前、明暗モード、配色を取得します。同名の場合は文書内の設定を優先します。

**定義**:

```typescript
getThemeOptions(): VBIDashboardThemeOption[]
```

**戻り値**: `VBIDashboardThemeOption[]`

### resolveTheme

テーマを解決し、独立した実行時名で VSeed に登録します。不明な名前は light にフォールバックし、文書は変更しません。

**定義**:

```typescript
resolveTheme(theme?: string): VBIDashboardResolvedTheme
```

**戻り値**: `VBIDashboardResolvedTheme`

**引数**:

| 引数 | 型 | 説明 |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - テーマ名。既定は選択中のテーマで、他のテーマの一時プレビューにも使用できます |

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
