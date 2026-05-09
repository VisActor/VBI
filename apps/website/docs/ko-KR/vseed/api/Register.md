# Register

## 테마(Theme)

### registerCustomTheme

:::note{title="설명"}
사용자 정의 테마를 등록합니다.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameters:**

- 테마의 고유 식별자
- 테마 구성 객체 또는 구성 객체를 반환하는 함수
함수인 경우 lightTheme 및 darkTheme를 포함하는 객체를 인수로 받아 기존 테마를 기반으로 확장할 수 있습니다.

**Example:**

`registerCustomTheme('myTheme', { ... });`
`// 또는 밝은 테마를 기반으로 수정`
`registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));`

### registerDarkTheme

:::note{title="설명"}
다크 테마(Dark Theme)를 등록합니다.
등록 후 Builder.getTheme('dark')로 가져올 수 있습니다.
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title="설명"}
라이트 테마(Light Theme)를 등록합니다.
등록 후 Builder.getTheme('light')로 가져올 수 있습니다.
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title="설명"}
Area Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Area Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title="설명"}
Area Percent Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Area Percent Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title="설명"}
Bar Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Bar Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title="설명"}
Bar Parallel Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Bar Parallel Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title="설명"}
Bar Percent Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Bar Percent Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title="설명"}
Box Plot Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Box Plot Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title="설명"}
CirclePacking Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 CirclePacking Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title="설명"}
Column Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Column Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title="설명"}
Column Parallel Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Column Parallel Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title="설명"}
Column Percent Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Column Percent Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title="설명"}
Donut Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Donut Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title="설명"}
Dual Axis Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Dual Axis Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title="설명"}
Funnel Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Funnel Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title="설명"}
Heatmap Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Heatmap Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerHeatmap(): void
```

### registerHistogram

:::note{title="설명"}
Histogram Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Histogram Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title="설명"}
Line Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Line Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title="설명"}
Pie Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Pie Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title="설명"}
Pivot Table Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Pivot Table Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title="설명"}
RaceBar Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 RaceBar Chart의 Spec 생성을 지원합니다.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title="설명"}
RaceColumn Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 RaceColumn Chart의 Spec 생성을 지원합니다.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title="설명"}
RaceDonut Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 RaceDonut Chart의 Spec 생성을 지원합니다.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title="설명"}
RaceLine Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 RaceLine Chart의 Spec 생성을 지원합니다.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title="설명"}
RacePie Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 RacePie Chart의 Spec 생성을 지원합니다.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title="설명"}
RaceScatter Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 RaceScatter Chart의 Spec 생성을 지원합니다.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title="설명"}
Radar Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Radar Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title="설명"}
Rose Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Rose Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title="설명"}
Rose Parallel Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Rose Parallel Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerRoseParallel(): void
```

### registerScatter

:::note{title="설명"}
Scatter Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Scatter Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title="설명"}
Sunburst Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Sunburst Chart의 Spec 및 Advanced Config 생성을 지원합니다.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title="설명"}
Table Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 Table Chart의 Spec 및 Advanced Config 빌드를 지원합니다.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title="설명"}
TreeMap Chart의 빌드 파이프라인을 등록합니다.
등록 후 Builder는 TreeMap Chart의 Spec 및 Advanced Config 빌드를 지원합니다.
:::

```ts
function registerTreeMap(): void
```

