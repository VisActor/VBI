# Register

## Theme

### registerCustomTheme

:::note{title="Description"}
Register a custom theme.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameters:**

- The unique identifier of the topic
- Theme configuration object, or a function that returns a configuration object
If it is a function, it will receive objects containing lightTheme and darkTheme as parameters, making it easy to extend based on existing themes.

**Example:**

`registerCustomTheme('myTheme', { ... });`
`// Or modify it based on the light theme`
`registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));`

### registerDarkTheme

:::note{title="Description"}
Register a Dark Theme.
After registration, it can be obtained through Builder.getTheme('dark').
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title="Description"}
Register the Light Theme.
After registration, it can be obtained through Builder.getTheme('light').
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title="Description"}
Register the Area Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Area Charts.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title="Description"}
Register the Area Percent Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Area Percent Chart.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title="Description"}
Register the Bar Chart's build pipeline.
Once registered, Builder will support building Bar Chart's Spec and Advanced Config.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title="Description"}
Register the Bar Parallel Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Bar Parallel Charts.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title="Description"}
Register the Bar Percent Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building the Bar Percent Chart.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title="Description"}
Register the Box Plot Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config for building Box Plot Charts.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title="Description"}
Register the CirclePacking Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building CirclePacking Chart.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title="Description"}
Register the Column Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Column Charts.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title="Description"}
Register the Column Parallel Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Column Parallel Chart.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title="Description"}
Register the Column Percent Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Column Percent Chart.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title="Description"}
Register the Donut Chart's build pipeline.
Once registered, Builder will support building Donut Chart's Spec and Advanced Config.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title="Description"}
Register the Dual Axis Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Dual Axis Charts.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title="Description"}
Register the Funnel Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config for building Funnel Charts.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title="Description"}
Register the Heatmap Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Heatmap Charts.
:::

```ts
function registerHeatmap(): void
```

### registerHistogram

:::note{title="Description"}
Register the Histogram Chart build pipeline.
Once registered, Builder will support Spec and Advanced Config for building Histogram Chart.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title="Description"}
Register the Line Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Line Charts.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title="Description"}
Register the Pie Chart build pipeline.
Once registered, Builder will support building Pie Chart's Spec and Advanced Config.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title="Description"}
Register the Pivot Table Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config for building Pivot Table Charts.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title="Description"}
Register the RaceBar Chart's build pipeline.
Once registered, Builder will support Spec building the RaceBar Chart.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title="Description"}
Register the RaceColumn Chart's build pipeline.
Once registered, Builder will support Spec building a RaceColumn Chart.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title="Description"}
Register the RaceDonut Chart's build pipeline.
Once registered, Builder will support Spec building the RaceDonut Chart.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title="Description"}
Register the RaceLine Chart's build pipeline.
Once registered, Builder will support Spec building the RaceLine Chart.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title="Description"}
Register the RacePie Chart's build pipeline.
Once registered, Builder will support Spec building the RacePie Chart.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title="Description"}
Register the RaceScatter Chart's build pipeline.
Once registered, Builder will support Spec building the RaceScatter Chart.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title="Description"}
Register the Radar Chart build pipeline.
Once registered, Builder will support Spec and Advanced Config for building Radar Charts.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title="Description"}
Register the Rose Chart build pipeline.
Once registered, Builder will support building Rose Chart's Spec and Advanced Config.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title="Description"}
Register the Rose Parallel Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Rose Parallel Chart.
:::

```ts
function registerRoseParallel(): void
```

### registerScatter

:::note{title="Description"}
Register the Scatter Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config building Scatter Chart.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title="Description"}
Register the Sunburst Chart's build pipeline.
Once registered, Builder will support building Sunburst Chart's Spec and Advanced Config.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title="Description"}
Register the Table Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config for building Table Charts.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title="Description"}
Register the TreeMap Chart's build pipeline.
Once registered, Builder will support Spec and Advanced Config for building TreeMap Charts.
:::

```ts
function registerTreeMap(): void
```

