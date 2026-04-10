# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

Asynchronously executes dynamic filter code. Call before `build()` to execute code defined in `dynamicFilter`. This is an idempotent method — multiple calls will not re-execute.

### build

```ts
build<T = S>(): T
```

Generates the final chart configuration (Spec). This is the most commonly used core method. If the configuration includes a `dynamicFilter` code, call `prepare()` first.

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

Converts the intermediate-layer configuration (AdvancedVSeed) to the final Spec. Use only when you need deep customization of the intermediate-layer configuration.

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

Generates the intermediate-layer configuration (AdvancedVSeed), i.e., the chart template. More detailed than the raw VSeed, exposing more chart internals.

### getColorItems

```ts
getColorItems(): __type[]
```

Gets field information related to colors in the data. Commonly used to generate chart legends or color filter UIs.

### getColorIdMap

```ts
getColorIdMap(): Record
```

Gets a detailed mapping table for color fields. Key is the color ID, Value is the detailed information.

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

\[Internal] Gets the template build pipeline for the specified chart type, used for debugging the VSeed → AdvancedVSeed conversion process.

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

\[Internal] Gets the Spec build pipeline for the specified chart type, used for debugging the AdvancedVSeed → Spec conversion process.

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

Gets the configuration of the specified theme. If `themeKey` is not provided, returns the `'light'` theme by default.

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

Gets all registered theme configurations.

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Static factory method for conveniently creating a `Builder` instance.

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

\[Extension] Registers a template build pipeline for a new chart type.

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

\[Extension] Registers a Spec build pipeline for a new chart type.

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

\[Extension] Modifies the template build logic for an existing chart, inserting a custom Pipe to influence the generated AdvancedVSeed.

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

\[Extension] Modifies the Spec build logic for an existing chart, inserting a custom Pipe to influence the final generated Spec.

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

\[Extension] Registers a custom theme.

## Properties

### get locale

```ts
get locale()
```

Gets the locale currently used by the Builder.

### get vseed

```ts
get vseed()
```

Gets the current VSeed input data.

### set vseed

```ts
set vseed(value)
```

Updates the VSeed input data. After updating, the cached state from `prepare()` will be cleared.

### get isPrepared

```ts
get isPrepared()
```

Gets the `prepare()` state.

### set isPrepared

```ts
set isPrepared(value: boolean)
```

Sets the `prepare()` state.

### get advancedVSeed

```ts
get advancedVSeed()
```

Gets the current AdvancedVSeed intermediate configuration object.

### set advancedVSeed

```ts
set advancedVSeed(value)
```

Sets the AdvancedVSeed intermediate configuration object. Typically used for caching or reusing an existing intermediate configuration.

### get spec

```ts
get spec()
```

Gets the currently generated final Spec object.

### set spec

```ts
set spec(value)
```

Sets the Spec object. Typically used for caching.

### get performance

```ts
get performance()
```

Gets performance statistics from the build process, including the duration of each phase (in ms).

### set performance

```ts
set performance(value)
```

Sets the performance statistics.
