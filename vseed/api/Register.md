# Register

## Theme

### registerCustomTheme

:::note\{title=描述}
注册自定义主题。
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameters:**

- 主题的唯一标识符
- 主题配置对象，或者一个返回配置对象的函数
  如果是函数，它将接收包含 lightTheme 和 darkTheme 的对象作为参数，方便基于现有主题进行扩展。

**Example:**

registerCustomTheme('myTheme', \{ ... });
// 或者基于浅色主题修改
registerCustomTheme('myTheme', (\{ lightTheme }) => (\{ ...lightTheme, ... }));

### registerDarkTheme

:::note\{title=描述}
注册深色主题 (Dark Theme)。
注册后，可以通过 Builder.getTheme('dark') 获取。
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note\{title=描述}
注册浅色主题 (Light Theme)。
注册后，可以通过 Builder.getTheme('light') 获取。
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note\{title=描述}
注册 Area Chart 的构建管线。
注册后，Builder 将支持构建 Area Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note\{title=描述}
注册 Area Percent Chart 的构建管线。
注册后，Builder 将支持构建 Area Percent Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note\{title=描述}
注册 Bar Chart 的构建管线。
注册后，Builder 将支持构建 Bar Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note\{title=描述}
注册 Bar Parallel Chart 的构建管线。
注册后，Builder 将支持构建 Bar Parallel Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note\{title=描述}
注册 Bar Percent Chart 的构建管线。
注册后，Builder 将支持构建 Bar Percent Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note\{title=描述}
注册 Box Plot Chart 的构建管线。
注册后，Builder 将支持构建 Box Plot Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note\{title=描述}
注册 CirclePacking Chart 的构建管线。
注册后，Builder 将支持构建 CirclePacking Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note\{title=描述}
注册 Column Chart 的构建管线。
注册后，Builder 将支持构建 Column Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note\{title=描述}
注册 Column Parallel Chart 的构建管线。
注册后，Builder 将支持构建 Column Parallel Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note\{title=描述}
注册 Column Percent Chart 的构建管线。
注册后，Builder 将支持构建 Column Percent Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note\{title=描述}
注册 Donut Chart 的构建管线。
注册后，Builder 将支持构建 Donut Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note\{title=描述}
注册 Dual Axis Chart 的构建管线。
注册后，Builder 将支持构建 Dual Axis Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note\{title=描述}
注册 Funnel Chart 的构建管线。
注册后，Builder 将支持构建 Funnel Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note\{title=描述}
注册 Heatmap Chart 的构建管线。
注册后，Builder 将支持构建 Heatmap Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerHeatmap(): void
```

### registerHistogram

:::note\{title=描述}
注册 Histogram Chart 的构建管线。
注册后，Builder 将支持构建 Histogram Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note\{title=描述}
注册 Line Chart 的构建管线。
注册后，Builder 将支持构建 Line Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerLine(): void
```

### registerPie

:::note\{title=描述}
注册 Pie Chart 的构建管线。
注册后，Builder 将支持构建 Pie Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note\{title=描述}
注册 Pivot Table Chart 的构建管线。
注册后，Builder 将支持构建 Pivot Table Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note\{title=描述}
注册 RaceBar Chart 的构建管线。
注册后，Builder 将支持构建 RaceBar Chart 的 Spec。
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note\{title=描述}
注册 RaceColumn Chart 的构建管线。
注册后，Builder 将支持构建 RaceColumn Chart 的 Spec。
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note\{title=描述}
注册 RaceDonut Chart 的构建管线。
注册后，Builder 将支持构建 RaceDonut Chart 的 Spec。
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note\{title=描述}
注册 RaceLine Chart 的构建管线。
注册后，Builder 将支持构建 RaceLine Chart 的 Spec。
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note\{title=描述}
注册 RacePie Chart 的构建管线。
注册后，Builder 将支持构建 RacePie Chart 的 Spec。
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note\{title=描述}
注册 RaceScatter Chart 的构建管线。
注册后，Builder 将支持构建 RaceScatter Chart 的 Spec。
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note\{title=描述}
注册 Radar Chart 的构建管线。
注册后，Builder 将支持构建 Radar Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerRadar(): void
```

### registerRose

:::note\{title=描述}
注册 Rose Chart 的构建管线。
注册后，Builder 将支持构建 Rose Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note\{title=描述}
注册 Rose Parallel Chart 的构建管线。
注册后，Builder 将支持构建 Rose Parallel Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerRoseParallel(): void
```

### registerScatter

:::note\{title=描述}
注册 Scatter Chart 的构建管线。
注册后，Builder 将支持构建 Scatter Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note\{title=描述}
注册 Sunburst Chart 的构建管线。
注册后，Builder 将支持构建 Sunburst Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note\{title=描述}
注册 Table Chart 的构建管线。
注册后，Builder 将支持构建 Table Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note\{title=描述}
注册 TreeMap Chart 的构建管线。
注册后，Builder 将支持构建 TreeMap Chart 的 Spec 和 Advanced Config。
:::

```ts
function registerTreeMap(): void
```
