# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

Dynamischen Filtercode asynchron ausführen.Wird vor Build () aufgerufen, um Code in dynamicFilter auszuführen.exponentielle Methode, mehrere Anrufe werden nicht wiederholt

### build

```ts
build<T = S>(): T
```

Generiert die endgültige Diagrammkonfiguration (Spec).Dies ist die am häufigsten verwendete Kernmethode.Wenn dynamicFilter-Code in der Konfiguration enthalten ist, muss prepare () zuerst aufgerufen werden

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

Wandelt eine Zwischenkonfiguration (AdvancedVSeed) in eine endgültige Spezifikation um.Nur verwenden, wenn Sie die Konfiguration der mittleren Stufe tiefgreifend anpassen müssen

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

Erzeugt eine Zwischenkonfiguration (AdvancedVSeed), bei der es sich um eine Diagrammvorlage handelt.Mehr Details als der ursprüngliche VSeed und mehr Diagrammdetails

### getColorItems

```ts
getColorItems(): __type[]
```

Ruft Feldinformationen über die Farbe ab, die an den Daten beteiligt ist.Legende oder Farbfilter-Benutzeroberfläche, die üblicherweise zum Generieren von Diagrammen verwendet wird

### getColorIdMap

```ts
getColorIdMap(): Record
```

Ruft die detaillierte Zuordnungstabelle für das Farbfeld ab.Schlüssel ist die Farb-ID und Wert sind die Details

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

Holen Sie sich die Zuordnung der colorId im diskreten Farbdiagramm zum endgültigen Farbwert

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[Interne Methodik] Abrufen der Template-Build-Pipeline für den angegebenen Diagrammtyp zum Debuggen des Konvertierungsprozesses von VSeed zu AdvancedVSeed

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[Interne Methodik] Ruft die Spec-Build-Pipeline für den angegebenen Diagrammtyp zum Debuggen des AdvancedVSeed to-Spec-Konvertierungsprozesses ab

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

Ruft die Konfiguration für das angegebene Thema ab.ThemeKey nicht standardmäßig zurückgeben 'light' Theme

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

Alle registrierten Theme-Konfigurationen abrufen

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Eine statische Werksmethode zum einfachen Erstellen von Builder-Instanzen

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[Erweiterungsmethode] Registrieren einer Vorlagen-Build-Pipeline für einen neuen Diagrammtyp

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[Erweiterungsmethode] Registrieren einer Spec-Build-Pipeline für einen neuen Diagrammtyp

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[Erweiterungsmethode] Ändern Sie die Vorlagenerstellungslogik des vorhandenen Diagramms, fügen Sie die benutzerdefinierte Pipe ein, um den generierten AdvancedVSeed zu beeinflussen

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[Erweiterungsmethode] Ändern Sie die Spezifikationserstellungslogik des vorhandenen Diagramms, um die endgültige Spezifikation einzufügen, die durch den benutzerdefinierten Pipe-Einfluss generiert wurde

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[Erweiterungsmethode] Benutzerdefiniertes Theme registrieren

## Properties

### get locale

```ts
get locale()
```

Abrufen des aktuell vom Builder verwendeten Gebietsschemas

### get vseed

```ts
get vseed()
```

Aktuelle VSeed Eingangsdaten abrufen

### set vseed

```ts
set vseed(value)
```

VSeed Eingangsdaten aktualisieren.Der Cache-Status von prepare () wird nach der Aktualisierung gelöscht

### get isPrepared

```ts
get isPrepared()
```

Rufen Sie den Status prepare () ab

### set isPrepared

```ts
set isPrepared(value: boolean)
```

Status prepare () festlegen

### get advancedVSeed

```ts
get advancedVSeed()
```

Abrufen des aktuellen AdvancedVSeed Zwischenkonfigurationsobjekts

### set advancedVSeed

```ts
set advancedVSeed(value)
```

Legt das AdvancedVSeed Zwischenkonfigurationsobjekt fest.Wird häufig zum Zwischenspeichern oder Wiederverwenden vorhandener Zwischenkonfigurationen verwendet

### get spec

```ts
get spec()
```

Abrufen des aktuell generierten endgültigen Spec-Objekts

### set spec

```ts
set spec(value)
```

Legt das Spec -Objekt fest.Häufig für das Caching verwendet

### get performance

```ts
get performance()
```

Erhalten Sie Leistungsstatistiken während des Builds.Zeit, die in jeder Phase verbracht wird (in ms), einbeziehen

### set performance

```ts
set performance(value)
```

Leistungsstatistiken festlegen

