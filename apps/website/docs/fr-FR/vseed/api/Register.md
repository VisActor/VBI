# Register

## Theme

### registerCustomTheme

:::note{title="Description"}
Enregistrez un thème personnalisé.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameters:**

- L'identifiant unique du sujet
- Objet de configuration de thème ou fonction qui renvoie un objet de configuration
S'il s'agit d'une fonction, elle recevra des objets contenant lightTheme et darkTheme comme paramètres, ce qui facilitera son extension en fonction de thèmes existants.

**Example:**

`registerCustomTheme('myTheme', { ... });`
`// Ou modifiez-le en fonction du thème clair`
`registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));`

### registerDarkTheme

:::note{title="Description"}
Enregistrez un thème sombre (Dark Theme).
Après inscription, il peut être obtenu via Builder.getTheme('dark').
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title="Description"}
Enregistrez un thème clair (Light Theme).
Après inscription, il peut être obtenu via Builder.getTheme('light').
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title="Description"}
Enregistrez le pipeline de build pour Area Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Area Chart de Spec et Advanced Config.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title="Description"}
Enregistrez le pipeline de build pour Area Percent Chart.
Une fois enregistré, Area Percent Chart prendra en charge la construction des Area Percent Chart des Spec et Advanced Config.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title="Description"}
Enregistrez le pipeline de build pour Bar Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Bar Chart de Spec et Advanced Config.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title="Description"}
Enregistrez le pipeline de build pour Bar Parallel Chart.
Une fois enregistré, Bar Parallel Chart prendra en charge la construction des Bar Parallel Chart des Spec et Advanced Config.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title="Description"}
Enregistrez le pipeline de build pour Bar Percent Chart.
Une fois enregistré, Bar Percent Chart prendra en charge la construction des Bar Percent Chart des Spec et Advanced Config.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title="Description"}
Enregistrez le pipeline de build pour Box Plot Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Box Plot Chart des Spec et Advanced Config.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title="Description"}
Enregistrez le pipeline de build pour CirclePacking Chart.
Une fois enregistré, CirclePacking Chart prendra en charge la construction des CirclePacking Chart de Spec et Advanced Config.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title="Description"}
Enregistrez le pipeline de build pour Column Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Column Chart de Spec et Advanced Config.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title="Description"}
Enregistrez le pipeline de build pour Column Parallel Chart.
Une fois enregistré, Column Parallel Chart prendra en charge la construction des Column Parallel Chart des Spec et Advanced Config.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title="Description"}
Enregistrez le pipeline de build pour Column Percent Chart.
Une fois enregistré, Column Percent Chart prendra en charge la construction des Column Percent Chart des Spec et Advanced Config.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title="Description"}
Enregistrez le pipeline de build pour Donut Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Donut Chart de Spec et Advanced Config.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title="Description"}
Enregistrez le pipeline de build pour Dual Axis Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Dual Axis Chart des Spec et Advanced Config.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title="Description"}
Enregistrez le pipeline de build pour Funnel Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Funnel Chart de Spec et Advanced Config.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title="Description"}
Enregistrez le pipeline de build pour Heatmap Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Heatmap Chart de Spec et Advanced Config.
:::

```ts
function registerHeatmap(): void
```

### registerHistogram

:::note{title="Description"}
Enregistrez le pipeline de build pour Histogram Chart.
Une fois enregistré, Histogram Chart prendra en charge la construction des Histogram Chart de Spec et Advanced Config.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title="Description"}
Enregistrez le pipeline de build pour Line Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Line Chart de Spec et Advanced Config.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title="Description"}
Enregistrez le pipeline de build pour Pie Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Pie Chart de Spec et Advanced Config.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title="Description"}
Enregistrez le pipeline de build pour Pivot Table Chart.
Une fois enregistré, Pivot Table Chart prendra en charge la construction des Pivot Table Chart des Spec et Advanced Config.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title="Description"}
Enregistrez le pipeline de build pour RaceBar Chart.
Une fois enregistré, RaceBar Chart prendra en charge le bâtiment Spec RaceBar Chart.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title="Description"}
Enregistrez le pipeline de build pour RaceColumn Chart.
Une fois enregistré, RaceColumn Chart prendra en charge le bâtiment Spec RaceColumn Chart.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title="Description"}
Enregistrez le pipeline de build pour RaceDonut Chart.
Une fois enregistré, RaceDonut Chart prendra en charge le bâtiment Spec RaceDonut Chart.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title="Description"}
Enregistrez le pipeline de build pour RaceLine Chart.
Une fois enregistré, RaceLine Chart prendra en charge le bâtiment Spec RaceLine Chart.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title="Description"}
Enregistrez le pipeline de build pour RacePie Chart.
Une fois enregistré, RacePie Chart prendra en charge le bâtiment Spec RacePie Chart.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title="Description"}
Enregistrez le pipeline de build pour RaceScatter Chart.
Une fois enregistré, RaceScatter Chart prendra en charge le bâtiment Spec RaceScatter Chart.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title="Description"}
Enregistrez le pipeline de build pour Radar Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Radar Chart de Spec et Advanced Config.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title="Description"}
Enregistrez le pipeline de build pour Rose Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Rose Chart de Spec et Advanced Config.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title="Description"}
Enregistrez le pipeline de build pour Rose Parallel Chart.
Une fois enregistré, Rose Parallel Chart prendra en charge la construction des Rose Parallel Chart des Spec et Advanced Config.
:::

```ts
function registerRoseParallel(): void
```

### registerScatter

:::note{title="Description"}
Enregistrez le pipeline de build pour Scatter Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Scatter Chart de Spec et Advanced Config.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title="Description"}
Enregistrez le pipeline de build pour Sunburst Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Sunburst Chart de Spec et Advanced Config.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title="Description"}
Enregistrez le pipeline de build pour Table Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des Table Chart de Spec et Advanced Config.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title="Description"}
Enregistrez le pipeline de build pour TreeMap Chart.
Une fois enregistré, Advanced Config prendra en charge la construction des TreeMap Chart de Spec et Advanced Config.
:::

```ts
function registerTreeMap(): void
```

