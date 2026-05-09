# Register

## Theme

### registerCustomTheme

:::note{title="Beschreibung"}
Registrieren Sie ein benutzerdefiniertes Design.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameters:**

- Eindeutige Kennung des Subjekts
- Theme-Konfigurationsobjekt oder eine Funktion, die ein Konfigurationsobjekt zurückgibt
Wenn eine Funktion ist, erhält sie ein Objekt, das lightTheme und darkTheme als Argumente enthält, sodass sie basierend auf vorhandenen Designs einfach erweitert werden kann.

**Example:**

`registerCustomTheme('myTheme', { ... });`
`// Oder modifizieren Sie basierend auf einem hellen Thema`
`registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));`

### registerDarkTheme

:::note{title="Beschreibung"}
Melden Sie sich für Dark Theme an.
Nach der Registrierung können Sie dies über Builder.getTheme ('dark') Holen Sie sich.
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title="Beschreibung"}
Lichtthema registrieren.
Nach der Registrierung können Sie dies über Builder.getTheme ('light') Holen Sie sich.
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title="Beschreibung"}
Registrieren Sie die Baupipeline für das Flächendiagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Flächendiagramms.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title="Beschreibung"}
Registrieren Sie die Baupipeline für das Flächenprozentdiagramm.
Nach der Registrierung unterstützt der Builder das Erstellen von Spezifikationen und erweiterten Konfigurationen für Flächenprozentdiagramme.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Balkendiagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Balkendiagramms.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Bar-Parallel-Diagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Balkenparalleldiagramms.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Balken-Prozent-Diagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Balken-Prozent-Diagramms.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title="Beschreibung"}
Registrieren Sie die Baupipeline für das Box-Plot-Diagramm.
Nach der Registrierung unterstützt der Builder das Erstellen von Box-Plot-Diagrammen für die Spezifikation und die erweiterte Konfiguration.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das CirclePacking-Diagramm.
Nach der Registrierung unterstützt der Builder den Aufbau der Spezifikation und der erweiterten Konfiguration des CirclePacking-Diagramms.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Säulendiagramm.
Nach der Registrierung unterstützt der Builder das Erstellen von Spezifikationen und erweiterten Konfigurationen für Säulendiagramme.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Säulenparalleldiagramm.
Nach der Registrierung unterstützt der Builder das Erstellen von Spezifikationen und erweiterten Konfigurationen für Spaltenparalleldiagramme.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Spalten-Prozent-Diagramm.
Nach der Registrierung unterstützt der Builder das Erstellen von Spezifikationen und erweiterten Konfigurationen für Spalten-Prozent-Diagramme.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für Donut Chart.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Donut-Diagramms.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title="Beschreibung"}
Registrieren Sie die Baupipeline für das Dual-Axis-Diagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Dual-Axis-Diagramms.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title="Beschreibung"}
Registrieren Sie die Baupipeline für das Trichterdiagramm.
Nach der Registrierung unterstützt der Builder das Erstellen von Trichterdiagrammen für die Spezifikation und die erweiterte Konfiguration.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Heatmap-Diagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Heatmap-Diagramms.
:::

```ts
function registerHeatmap(): void
```

### registerHistogram

:::note{title="Beschreibung"}
Registrieren Sie die Baupipeline für das Histogrammdiagramm.
Nach der Registrierung unterstützt der Builder die Erstellung von Histogrammdiagrammen für Spec und Advanced Config.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Liniendiagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Liniendiagramms.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title="Beschreibung"}
Registrieren Sie die Baupipeline für das Kreisdiagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Kreisdiagramms.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Pivot-Tabellendiagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Pivot-Tabellendiagramms.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das RaceBar Chart.
Nach der Registrierung unterstützt der Builder die Erstellung von Spezifikationen für RaceBar-Diagramme.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das RaceColumn-Diagramm.
Nach der Registrierung unterstützt der Builder die Erstellung von Spezifikationen für RaceColumn-Diagramme.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das RaceDonut-Diagramm.
Nach der Registrierung unterstützt der Builder die Erstellung von Spezifikationen für RaceDonut-Diagramme.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das RaceLine-Diagramm.
Nach der Registrierung unterstützt der Ersteller die Erstellung von Spezifikationen für RaceLine-Diagramme.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das RacePie-Diagramm.
Nach der Registrierung unterstützt der Builder die Erstellung von Spezifikationen für RacePie-Diagramme.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das RaceScatter-Diagramm.
Nach der Registrierung unterstützt der Builder die Erstellung von Spezifikationen für RaceScatter-Diagramme.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title="Beschreibung"}
Registrieren Sie die Baupipeline für Radardiagramm.
Nach der Registrierung unterstützt der Builder den Aufbau der Spezifikation und der erweiterten Konfiguration des Radardiagramms.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für Rose Chart.
Nach der Registrierung unterstützt der Builder das Erstellen der Spezifikation und der erweiterten Konfiguration des Rosendiagramms.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für Rose Parallel Chart.
Nach der Registrierung unterstützt der Builder Spec und Advanced Config zum Erstellen von parallelen Rosendiagrammen.
:::

```ts
function registerRoseParallel(): void
```

### registerScatter

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Streudiagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Streudiagramms.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für Sunburst Chart.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des Sunburst-Diagramms.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das Tabellendiagramm.
Nach der Registrierung unterstützt der Builder das Erstellen von Spezifikationen und die erweiterte Konfiguration für Tabellendiagramme.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title="Beschreibung"}
Registrieren Sie die Build-Pipeline für das TreeMap-Diagramm.
Nach der Registrierung unterstützt der Builder die Erstellung der Spezifikation und der erweiterten Konfiguration des TreeMap-Diagramms.
:::

```ts
function registerTreeMap(): void
```

