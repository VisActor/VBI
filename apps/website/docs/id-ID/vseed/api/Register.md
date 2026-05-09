# Register

## Theme

### registerCustomTheme

:::note{title="Deskripsi"}
Daftarkan tema khusus.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameters:**

- Pengidentifikasi unik topik
- Objek konfigurasi tema, atau fungsi yang mengembalikan objek konfigurasi
Jika berupa fungsi, ia akan menerima objek berisi lightTheme dan darkTheme sebagai parameter, sehingga mudah untuk diperluas berdasarkan tema yang ada.

**Example:**

`registerCustomTheme('myTheme', { ... });`
`// Atau modifikasi berdasarkan tema terang`
`registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));`

### registerDarkTheme

:::note{title="Deskripsi"}
Daftar untuk tema gelap (Dark Theme).
Setelah registrasi dapat diperoleh melalui Builder.getTheme.getTheme('dark').
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title="Deskripsi"}
Daftar untuk tema ringan (Light Theme).
Setelah registrasi dapat diperoleh melalui Builder.getTheme.getTheme('light').
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Area Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Area Chart dari Area dan Advanced Config.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Area Percent Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Area Percent Chart dari Area dan Advanced Config.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Bar Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Bar Chart dari Bar dan Advanced Config.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Bar Parallel Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Bar Parallel Chart dari Bar dan Advanced Config.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Bar Percent Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Bar Percent Chart dari Bar dan Advanced Config.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Box Plot Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Box Plot Chart dari Box dan Advanced Config.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk CirclePacking Chart.
Setelah terdaftar, Builder akan mendukung pembangunan CirclePacking Chart dari CirclePacking dan Advanced Config.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Column Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Column Chart dari Column dan Advanced Config.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Column Parallel Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Column Parallel Chart dari Column dan Advanced Config.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Column Percent Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Column Percent Chart dari Column dan Advanced Config.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Donut Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Donut Chart dari Donut dan Advanced Config.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Dual Axis Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Dual Axis Chart dari Dual dan Advanced Config.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Funnel Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Funnel Chart dari Funnel dan Advanced Config.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Heatmap Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Heatmap Chart dari Heatmap dan Advanced Config.
:::

```ts
function registerHeatmap(): void
```

### registerHistogram

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Histogram Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Histogram Chart dari Histogram dan Advanced Config.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Line Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Line Chart dari Line dan Advanced Config.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Pie Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Pie Chart dari Pie dan Advanced Config.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Pivot Table Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Pivot Table Chart dari Pivot dan Advanced Config.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk RaceBar Chart.
Setelah terdaftar, Builder akan mendukung RaceBar gedung RaceBar Chart.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk RaceColumn Chart.
Setelah terdaftar, Builder akan mendukung RaceColumn gedung RaceColumn Chart.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk RaceDonut Chart.
Setelah terdaftar, Builder akan mendukung RaceDonut gedung RaceDonut Chart.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk RaceLine Chart.
Setelah terdaftar, Builder akan mendukung RaceLine gedung RaceLine Chart.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk RacePie Chart.
Setelah terdaftar, Builder akan mendukung RacePie gedung RacePie Chart.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk RaceScatter Chart.
Setelah terdaftar, Builder akan mendukung RaceScatter gedung RaceScatter Chart.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Radar Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Radar Chart dari Radar dan Advanced Config.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Rose Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Rose Chart dari Rose dan Advanced Config.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Rose Parallel Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Rose Parallel Chart dari Rose dan Advanced Config.
:::

```ts
function registerRoseParallel(): void
```

### registerScatter

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Scatter Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Scatter Chart dari Scatter dan Advanced Config.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Sunburst Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Sunburst Chart dari Sunburst dan Advanced Config.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk Table Chart.
Setelah terdaftar, Builder akan mendukung pembangunan Table Chart dari Table dan Advanced Config.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title="Deskripsi"}
Daftarkan pipeline build untuk TreeMap Chart.
Setelah terdaftar, Builder akan mendukung pembangunan TreeMap Chart dari TreeMap dan Advanced Config.
:::

```ts
function registerTreeMap(): void
```

