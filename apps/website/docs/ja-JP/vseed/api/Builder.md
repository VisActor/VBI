# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

動的フィルターコードを非同期に実行します。`build()` の前に呼び出し、`dynamicFilter` 内の `code` を実行するために使用します。冪等なメソッドであり、複数回呼び出しても重複して実行されません。

### build

```ts
build<T = S>(): T
```

最終的なチャート設定 (Spec) を生成します。最もよく使われる中核メソッドです。設定に `dynamicFilter code` が含まれる場合は、先に `prepare()` を呼び出す必要があります。

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

中間層の設定 (AdvancedVSeed) を最終的な Spec に変換します。中間層の設定を深くカスタマイズする必要がある場合にのみ使用します。

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

中間層の設定 (AdvancedVSeed)、つまりチャートテンプレートを生成します。元の VSeed より詳細で、より多くのチャート詳細を公開します。

### getColorItems

```ts
getColorItems(): __type[]
```

データ内で色に関係するフィールド情報を取得します。チャートの凡例や色フィルター UI の生成によく使用します。

### getColorIdMap

```ts
getColorIdMap(): Record
```

色フィールドの詳細なマッピング表を取得します。Key は色 ID、Value は詳細情報です。

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

離散カラーマップにおける `colorId` から最終的な色値へのマッピングを取得します。

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[内部メソッド] 指定したチャートタイプのテンプレート構築パイプラインを取得します。VSeed から AdvancedVSeed への変換プロセスをデバッグするために使用します。

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[内部メソッド] 指定したチャートタイプの Spec 構築パイプラインを取得します。AdvancedVSeed から Spec への変換プロセスをデバッグするために使用します。

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

指定したテーマの設定を取得します。`themeKey` を渡さない場合は、デフォルトで `'light'` テーマを返します。

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

登録済みのすべてのテーマ設定を取得します。

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Builder インスタンスを簡単に作成するための静的ファクトリメソッドです。

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[拡張メソッド] 新しいチャートタイプのテンプレート構築パイプラインを登録します。

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[拡張メソッド] 新しいチャートタイプの Spec 構築パイプラインを登録します。

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[拡張メソッド] 既存チャートのテンプレート構築ロジックを変更し、カスタム Pipe を挿入して生成される AdvancedVSeed に反映します。

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[拡張メソッド] 既存チャートの Spec 構築ロジックを変更し、カスタム Pipe を挿入して生成される最終 Spec に反映します。

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[拡張メソッド] カスタムテーマを登録します。

## Properties

### get locale

```ts
get locale()
```

現在の Builder が使用しているロケールを取得します。

### get vseed

```ts
get vseed()
```

現在の VSeed 入力データを取得します。

### set vseed

```ts
set vseed(value)
```

VSeed 入力データを更新します。更新後は `prepare()` のキャッシュ状態がクリアされます。

### get isPrepared

```ts
get isPrepared()
```

`prepare()` の状態を取得します。

### set isPrepared

```ts
set isPrepared(value: boolean)
```

`prepare()` の状態を設定します。

### get advancedVSeed

```ts
get advancedVSeed()
```

現在の AdvancedVSeed 中間設定オブジェクトを取得します。

### set advancedVSeed

```ts
set advancedVSeed(value)
```

AdvancedVSeed 中間設定オブジェクトを設定します。通常は既存の中間設定をキャッシュまたは再利用するために使用します。

### get spec

```ts
get spec()
```

現在生成されている最終 Spec オブジェクトを取得します。

### set spec

```ts
set spec(value)
```

Spec オブジェクトを設定します。通常はキャッシュに使用します。

### get performance

```ts
get performance()
```

構築プロセス中のパフォーマンス統計情報を取得します。各段階の所要時間 (単位: ms) を含みます。

### set performance

```ts
set performance(value)
```

パフォーマンス統計情報を設定します。
