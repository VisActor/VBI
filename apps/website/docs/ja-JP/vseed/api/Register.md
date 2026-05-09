# Register

## Theme

### registerCustomTheme

:::note{title="説明"}
カスタムテーマを登録します。
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameters:**

- テーマの一意な識別子
- テーマ設定オブジェクト、または設定オブジェクトを返す関数
関数の場合は、`lightTheme` と `darkTheme` を含むオブジェクトを引数として受け取り、既存テーマを基に拡張しやすくします。

**Example:**

`registerCustomTheme('myTheme', { ... });`
`// またはライトテーマを基に変更`
`registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));`

### registerDarkTheme

:::note{title="説明"}
ダークテーマ (Dark Theme) を登録します。
登録後は `Builder.getTheme('dark')` で取得できます。
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title="説明"}
ライトテーマ (Light Theme) を登録します。
登録後は `Builder.getTheme('light')` で取得できます。
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title="説明"}
Area Chart の構築パイプラインを登録します。
登録後、Builder は Area Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title="説明"}
Area Percent Chart の構築パイプラインを登録します。
登録後、Builder は Area Percent Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title="説明"}
Bar Chart の構築パイプラインを登録します。
登録後、Builder は Bar Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title="説明"}
Bar Parallel Chart の構築パイプラインを登録します。
登録後、Builder は Bar Parallel Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title="説明"}
Bar Percent Chart の構築パイプラインを登録します。
登録後、Builder は Bar Percent Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title="説明"}
Box Plot Chart の構築パイプラインを登録します。
登録後、Builder は Box Plot Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title="説明"}
CirclePacking Chart の構築パイプラインを登録します。
登録後、Builder は CirclePacking Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title="説明"}
Column Chart の構築パイプラインを登録します。
登録後、Builder は Column Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title="説明"}
Column Parallel Chart の構築パイプラインを登録します。
登録後、Builder は Column Parallel Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title="説明"}
Column Percent Chart の構築パイプラインを登録します。
登録後、Builder は Column Percent Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title="説明"}
Donut Chart の構築パイプラインを登録します。
登録後、Builder は Donut Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title="説明"}
Dual Axis Chart の構築パイプラインを登録します。
登録後、Builder は Dual Axis Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title="説明"}
Funnel Chart の構築パイプラインを登録します。
登録後、Builder は Funnel Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title="説明"}
Heatmap Chart の構築パイプラインを登録します。
登録後、Builder は Heatmap Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerHeatmap(): void
```

### registerHistogram

:::note{title="説明"}
Histogram Chart の構築パイプラインを登録します。
登録後、Builder は Histogram Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title="説明"}
Line Chart の構築パイプラインを登録します。
登録後、Builder は Line Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title="説明"}
Pie Chart の構築パイプラインを登録します。
登録後、Builder は Pie Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title="説明"}
Pivot Table Chart の構築パイプラインを登録します。
登録後、Builder は Pivot Table Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title="説明"}
RaceBar Chart の構築パイプラインを登録します。
登録後、Builder は RaceBar Chart の Spec の構築をサポートします。
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title="説明"}
RaceColumn Chart の構築パイプラインを登録します。
登録後、Builder は RaceColumn Chart の Spec の構築をサポートします。
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title="説明"}
RaceDonut Chart の構築パイプラインを登録します。
登録後、Builder は RaceDonut Chart の Spec の構築をサポートします。
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title="説明"}
RaceLine Chart の構築パイプラインを登録します。
登録後、Builder は RaceLine Chart の Spec の構築をサポートします。
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title="説明"}
RacePie Chart の構築パイプラインを登録します。
登録後、Builder は RacePie Chart の Spec の構築をサポートします。
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title="説明"}
RaceScatter Chart の構築パイプラインを登録します。
登録後、Builder は RaceScatter Chart の Spec の構築をサポートします。
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title="説明"}
Radar Chart の構築パイプラインを登録します。
登録後、Builder は Radar Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title="説明"}
Rose Chart の構築パイプラインを登録します。
登録後、Builder は Rose Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title="説明"}
Rose Parallel Chart の構築パイプラインを登録します。
登録後、Builder は Rose Parallel Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerRoseParallel(): void
```

### registerScatter

:::note{title="説明"}
Scatter Chart の構築パイプラインを登録します。
登録後、Builder は Scatter Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title="説明"}
Sunburst Chart の構築パイプラインを登録します。
登録後、Builder は Sunburst Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title="説明"}
Table Chart の構築パイプラインを登録します。
登録後、Builder は Table Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title="説明"}
TreeMap Chart の構築パイプラインを登録します。
登録後、Builder は TreeMap Chart の Spec と Advanced Config の構築をサポートします。
:::

```ts
function registerTreeMap(): void
```
