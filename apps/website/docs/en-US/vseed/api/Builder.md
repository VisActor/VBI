# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

Execute dynamic filter code asynchronously. Called before build() to execute the code in dynamicFilter. Idempotent method, multiple calls will not be repeated

### build

```ts
build<T = S>(): T
```

Generate the final chart configuration (Spec). This is the most commonly used core method. If the configuration contains dynamicFilter code, prepare() needs to be called first

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

Convert mid-tier configuration (AdvancedVSeed) to final Spec. Use only when you need to deeply customize the middle-tier configuration

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

Generate the middle layer configuration (AdvancedVSeed), which is the chart template. More detailed than original VSeed, exposing more chart details

### getColorItems

```ts
getColorItems(): __type[]
```

Get the field information involving color in the data. Legend or color filter UI commonly used to generate charts

### getColorIdMap

```ts
getColorIdMap(): Record
```

Get a detailed mapping table for color fields. Key is the color ID, Value is the detailed information

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

Get the mapping of colorId to final color values in a discrete colormap

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[Internal method] Get the template construction pipeline of the specified chart type, used to debug the conversion process from VSeed to AdvancedVSeed

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[Internal method] Get the Spec build pipeline of the specified chart type, used to debug the conversion process from AdvancedVSeed to Spec

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

Get the configuration of the specified topic. If themeKey is not passed, the 'light' theme will be returned by default.

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

Get all registered theme configurations

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Static factory method for conveniently creating Builder instances

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[Extension method] Register the template construction pipeline of the new chart type

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[Extension method] Register Spec build pipeline for new chart type

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[Extension method] Modify the template construction logic of the existing chart and insert a custom Pipe to affect the generated AdvancedVSeed

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[Extension method] Modify the Spec construction logic of the existing chart and insert a custom Pipe to affect the final Spec generated.

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[Extension method] Register a custom theme

## Properties

### get locale

```ts
get locale()
```

Get the locale currently used by Builder

### get vseed

```ts
get vseed()
```

Get the current VSeed input data

### set vseed

```ts
set vseed(value)
```

Update VSeed input data. The cache status of prepare() will be cleared after updating.

### get isPrepared

```ts
get isPrepared()
```

Get prepare() status

### set isPrepared

```ts
set isPrepared(value: boolean)
```

Set prepare() state

### get advancedVSeed

```ts
get advancedVSeed()
```

Get the current AdvancedVSeed intermediate configuration object

### set advancedVSeed

```ts
set advancedVSeed(value)
```

Sets the AdvancedVSeed intermediate configuration object. Usually used to cache or reuse existing intermediate configurations

### get spec

```ts
get spec()
```

Get the currently generated final Spec object

### set spec

```ts
set spec(value)
```

Sets the Spec object. Usually used for caching

### get performance

```ts
get performance()
```

Get performance statistics during the build process. Including the time spent in each stage (unit: ms)

### set performance

```ts
set performance(value)
```

Set performance statistics

