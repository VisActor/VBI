# Register

## Theme

### registerCustomTheme

:::note{title=Description}
Register a custom theme.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameters:**

* Unique identifier for the theme
* Theme configuration object, or a function that returns a configuration object.
  If a function, it receives an object containing lightTheme and darkTheme as parameters, making it easy to extend existing themes.

**Example:**

registerCustomTheme('myTheme', { ... });
// Or modify based on the light theme
registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));

### registerDarkTheme

:::note{title=Description}
Register the dark theme (Dark Theme).
After registration, retrieve it via Builder.getTheme('dark').
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title=Description}
Register the light theme (Light Theme).
After registration, retrieve it via Builder.getTheme('light').
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title=Description}
Register the Area Chart build pipeline.
Once registered, Builder supports building Area Chart Spec and Advanced Config.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title=Description}
Register the Area Percent Chart build pipeline.
Once registered, Builder supports building Area Percent Chart Spec and Advanced Config.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title=Description}
Register the Bar Chart build pipeline.
Once registered, Builder supports building Bar Chart Spec and Advanced Config.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title=Description}
Register the Bar Parallel Chart build pipeline.
Once registered, Builder supports building Bar Parallel Chart Spec and Advanced Config.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title=Description}
Register the Bar Percent Chart build pipeline.
Once registered, Builder supports building Bar Percent Chart Spec and Advanced Config.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title=Description}
Register the Box Plot Chart build pipeline.
Once registered, Builder supports building Box Plot Chart Spec and Advanced Config.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title=Description}
Register the CirclePacking Chart build pipeline.
Once registered, Builder supports building CirclePacking Chart Spec and Advanced Config.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title=Description}
Register the Column Chart build pipeline.
Once registered, Builder supports building Column Chart Spec and Advanced Config.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title=Description}
Register the Column Parallel Chart build pipeline.
Once registered, Builder supports building Column Parallel Chart Spec and Advanced Config.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title=Description}
Register the Column Percent Chart build pipeline.
Once registered, Builder supports building Column Percent Chart Spec and Advanced Config.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title=Description}
Register the Donut Chart build pipeline.
Once registered, Builder supports building Donut Chart Spec and Advanced Config.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title=Description}
Register the Dual Axis Chart build pipeline.
Once registered, Builder supports building Dual Axis Chart Spec and Advanced Config.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title=Description}
Register the Funnel Chart build pipeline.
Once registered, Builder supports building Funnel Chart Spec and Advanced Config.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title=Description}
Register the Heatmap Chart build pipeline.
Once registered, Builder supports building Heatmap Chart Spec and Advanced Config.
:::

```ts
function registerHeatmap(): void
```

### registerHistogram

:::note{title=Description}
Register the Histogram Chart build pipeline.
Once registered, Builder supports building Histogram Chart Spec and Advanced Config.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title=Description}
Register the Line Chart build pipeline.
Once registered, Builder supports building Line Chart Spec and Advanced Config.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title=Description}
Register the Pie Chart build pipeline.
Once registered, Builder supports building Pie Chart Spec and Advanced Config.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title=Description}
Register the Pivot Table Chart build pipeline.
Once registered, Builder supports building Pivot Table Chart Spec and Advanced Config.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title=Description}
Register the RaceBar Chart build pipeline.
Once registered, Builder supports building RaceBar Chart Spec.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title=Description}
Register the RaceColumn Chart build pipeline.
Once registered, Builder supports building RaceColumn Chart Spec.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title=Description}
Register the RaceDonut Chart build pipeline.
Once registered, Builder supports building RaceDonut Chart Spec.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title=Description}
Register the RaceLine Chart build pipeline.
Once registered, Builder supports building RaceLine Chart Spec.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title=Description}
Register the RacePie Chart build pipeline.
Once registered, Builder supports building RacePie Chart Spec.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title=Description}
Register the RaceScatter Chart build pipeline.
Once registered, Builder supports building RaceScatter Chart Spec.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title=Description}
Register the Radar Chart build pipeline.
Once registered, Builder supports building Radar Chart Spec and Advanced Config.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title=Description}
Register the Rose Chart build pipeline.
Once registered, Builder supports building Rose Chart Spec and Advanced Config.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title=Description}
Register the Rose Parallel Chart build pipeline.
Once registered, Builder supports building Rose Parallel Chart Spec and Advanced Config.
:::

```ts
function registerRoseParallel(): void
```

### registerScatter

:::note{title=Description}
Register the Scatter Chart build pipeline.
Once registered, Builder supports building Scatter Chart Spec and Advanced Config.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title=Description}
Register the Sunburst Chart build pipeline.
Once registered, Builder supports building Sunburst Chart Spec and Advanced Config.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title=Description}
Register the Table Chart build pipeline.
Once registered, Builder supports building Table Chart Spec and Advanced Config.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title=Description}
Register the TreeMap Chart build pipeline.
Once registered, Builder supports building TreeMap Chart Spec and Advanced Config.
:::

```ts
function registerTreeMap(): void
```
