# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

异步执行动态过滤器代码。在 build() 前调用，用于执行 dynamicFilter 中的 code。幂等方法，多次调用不会重复执行

### build

```ts
build<T = S>(): T
```

生成最终的图表配置 (Spec)。这是最常用的核心方法。如果配置中包含 dynamicFilter code，需要先调用 prepare()

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

将中间层配置 (AdvancedVSeed) 转换为最终 Spec。仅当你需要深度定制中间层配置时使用

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

生成中间层配置 (AdvancedVSeed)，即图表模版。比原始 VSeed 更详细，暴露了更多图表细节

### getColorItems

```ts
getColorItems(): __type[]
```

获取数据中涉及颜色的字段信息。常用于生成图表的图例或颜色筛选器 UI

### getColorIdMap

```ts
getColorIdMap(): Record
```

获取颜色字段的详细映射表。Key 为颜色 ID，Value 为详细信息

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

获取离散颜色图中 colorId 到最终颜色值的映射

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[内部方法] 获取指定图表类型的模版构建管线，用于调试 VSeed 到 AdvancedVSeed 的转换过程

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[内部方法] 获取指定图表类型的 Spec 构建管线，用于调试 AdvancedVSeed 到 Spec 的转换过程

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

获取指定主题的配置。不传 themeKey 默认返回 'light' 主题

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

获取所有已注册的主题配置

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

静态工厂方法，用于便捷地创建 Builder 实例

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[扩展方法] 注册新图表类型的模版构建管线

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[扩展方法] 注册新图表类型的 Spec 构建管线

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[扩展方法] 修改现有图表的模版构建逻辑，插入自定义 Pipe 影响生成的 AdvancedVSeed

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[扩展方法] 修改现有图表的 Spec 构建逻辑，插入自定义 Pipe 影响生成的最终 Spec

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[扩展方法] 注册自定义主题

## Properties

### get locale

```ts
get locale()
```

获取当前 Builder 使用的语言环境

### get vseed

```ts
get vseed()
```

获取当前的 VSeed 输入数据

### set vseed

```ts
set vseed(value)
```

更新 VSeed 输入数据。更新后会清除 prepare() 的缓存状态

### get isPrepared

```ts
get isPrepared()
```

获取 prepare() 状态

### set isPrepared

```ts
set isPrepared(value: boolean)
```

设置 prepare() 状态

### get advancedVSeed

```ts
get advancedVSeed()
```

获取当前的 AdvancedVSeed 中间配置对象

### set advancedVSeed

```ts
set advancedVSeed(value)
```

设置 AdvancedVSeed 中间配置对象。通常用于缓存或复用已有的中间配置

### get spec

```ts
get spec()
```

获取当前生成的最终 Spec 对象

### set spec

```ts
set spec(value)
```

设置 Spec 对象。通常用于缓存

### get performance

```ts
get performance()
```

获取构建过程中的性能统计信息。包含各阶段耗时 (单位: ms)

### set performance

```ts
set performance(value)
```

设置性能统计信息

