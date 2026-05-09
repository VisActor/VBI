# Register

## Theme

### registerCustomTheme

:::note{title="Mô tả"}
Đăng ký một chủ đề tùy chỉnh.
:::

```ts
function registerCustomTheme(key: string, themeConfig:
    | CustomThemeConfig
    | ((props: { lightTheme: CustomThemeConfig; darkTheme: CustomThemeConfig }) => CustomThemeConfig)): void
```

**Parameters:**

- Mã định danh duy nhất của chủ đề
- Đối tượng cấu hình chủ đề hoặc hàm trả về đối tượng cấu hình
Nếu là một hàm, nó sẽ nhận các đối tượng chứa lightTheme và darkTheme làm tham số, giúp dễ dàng mở rộng dựa trên các chủ đề hiện có.

**Example:**

`registerCustomTheme('myTheme', { ... });`
`// Hoặc sửa đổi dựa trên light theme`
`registerCustomTheme('myTheme', ({ lightTheme }) => ({ ...lightTheme, ... }));`

### registerDarkTheme

:::note{title="Mô tả"}
Đăng ký một chủ đề tối.
Sau khi đăng ký, bạn có thể lấy nó thông qua Builder.getTheme('dark').
:::

```ts
function registerDarkTheme(): void
```

### registerLightTheme

:::note{title="Mô tả"}
Đăng ký chủ đề ánh sáng.
Sau khi đăng ký, bạn có thể lấy nó thông qua Builder.getTheme('light').
:::

```ts
function registerLightTheme(): void
```

## ChartType

### registerArea

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ khu vực.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Cấu hình Spec và Advanced Config cho Biểu đồ vùng.
:::

```ts
function registerArea(): void
```

### registerAreaPercent

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Biểu đồ phần trăm diện tích.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Cấu hình nâng cao cho Biểu đồ phần trăm diện tích.
:::

```ts
function registerAreaPercent(): void
```

### registerBar

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ thanh.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Bar Chart.
:::

```ts
function registerBar(): void
```

### registerBarParallel

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ song song thanh.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Cấu hình Spec và Advanced Config của Biểu đồ song song thanh.
:::

```ts
function registerBarParallel(): void
```

### registerBarPercent

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Biểu đồ phần trăm thanh.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Cấu hình thông số kỹ thuật và nâng cao của Biểu đồ phần trăm thanh.
:::

```ts
function registerBarPercent(): void
```

### registerBoxPlot

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Box Plot Chart.
Sau khi đăng ký, Builder sẽ hỗ trợ Spec và Advanced Config để xây dựng Box Plot Chart.
:::

```ts
function registerBoxPlot(): void
```

### registerCirclePacking

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ CirclePacking.
Sau khi đăng ký, Builder sẽ hỗ trợ Spec và Advanced Config để xây dựng Biểu đồ CirclePacking.
:::

```ts
function registerCirclePacking(): void
```

### registerColumn

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ Cột.
Sau khi đăng ký, Builder sẽ hỗ trợ Biểu đồ cột xây dựng Cấu hình nâng cao và Cấu hình nâng cao.
:::

```ts
function registerColumn(): void
```

### registerColumnParallel

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ song song Cột.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Cấu hình nâng cao của Biểu đồ song song cột.
:::

```ts
function registerColumnParallel(): void
```

### registerColumnPercent

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Biểu đồ Phần trăm Cột.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config cho Biểu đồ phần trăm cột.
:::

```ts
function registerColumnPercent(): void
```

### registerDonut

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Biểu đồ Donut.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Cấu hình thông số kỹ thuật và nâng cao của Biểu đồ Donut.
:::

```ts
function registerDonut(): void
```

### registerDualAxis

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ trục kép.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Cấu hình thông số và cấu hình nâng cao cho Biểu đồ trục kép.
:::

```ts
function registerDualAxis(): void
```

### registerFunnel

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Biểu đồ kênh.
Sau khi đăng ký, Builder sẽ hỗ trợ Spec và Advanced Config để xây dựng Biểu đồ kênh.
:::

```ts
function registerFunnel(): void
```

### registerHeatmap

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ Heatmap.
Sau khi đăng ký, Người xây dựng sẽ hỗ trợ Biểu đồ nhiệt xây dựng Cấu hình cụ thể và Cấu hình nâng cao.
:::

```ts
function registerHeatmap(): void
```

### registerHistogram

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng Biểu đồ biểu đồ.
Sau khi đăng ký, Builder sẽ hỗ trợ Spec và Advanced Config để xây dựng Biểu đồ biểu đồ.
:::

```ts
function registerHistogram(): void
```

### registerLine

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ đường.
Sau khi đăng ký, Builder sẽ hỗ trợ Spec và Advanced Config để xây dựng Biểu đồ đường.
:::

```ts
function registerLine(): void
```

### registerPie

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng Biểu đồ hình tròn.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config cho Pie Charts.
:::

```ts
function registerPie(): void
```

### registerPivotTable

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Biểu đồ bảng tổng hợp.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Cấu hình Spec và Advanced Config cho Biểu đồ bảng tổng hợp.
:::

```ts
function registerPivotTable(): void
```

### registerRaceBar

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ RaceBar.
Sau khi đăng ký, Người xây dựng sẽ hỗ trợ xây dựng Thông số kỹ thuật cho Biểu đồ RaceBar.
:::

```ts
function registerRaceBar(): void
```

### registerRaceColumn

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ RaceColumn.
Sau khi đăng ký, Người xây dựng sẽ hỗ trợ xây dựng Thông số kỹ thuật cho Biểu đồ RaceColumn.
:::

```ts
function registerRaceColumn(): void
```

### registerRaceDonut

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Biểu đồ RaceDonut.
Sau khi đăng ký, Người xây dựng sẽ hỗ trợ xây dựng Thông số kỹ thuật cho Biểu đồ RaceDonut.
:::

```ts
function registerRaceDonut(): void
```

### registerRaceLine

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ RaceLine.
Sau khi đăng ký, Người xây dựng sẽ hỗ trợ xây dựng Thông số kỹ thuật cho Biểu đồ RaceLine.
:::

```ts
function registerRaceLine(): void
```

### registerRacePie

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ RacePie.
Sau khi đăng ký, Người xây dựng sẽ hỗ trợ xây dựng Thông số kỹ thuật cho Biểu đồ RacePie.
:::

```ts
function registerRacePie(): void
```

### registerRaceScatter

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Biểu đồ RaceScatter.
Sau khi đăng ký, Người xây dựng sẽ hỗ trợ xây dựng Thông số kỹ thuật cho Biểu đồ RaceScatter.
:::

```ts
function registerRaceScatter(): void
```

### registerRadar

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng cho Biểu đồ Radar.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Radar Chart.
:::

```ts
function registerRadar(): void
```

### registerRose

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng Biểu đồ Hoa hồng.
Sau khi đăng ký Builder sẽ hỗ trợ xây dựng Spec và Advanced Config của Rose Chart.
:::

```ts
function registerRose(): void
```

### registerRoseParallel

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Biểu đồ song song Rose.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Cấu hình Spec và Advanced Config của Biểu đồ song song Rose.
:::

```ts
function registerRoseParallel(): void
```

### registerScatter

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ phân tán.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Cấu hình Spec và Advanced Config cho Biểu đồ phân tán.
:::

```ts
function registerScatter(): void
```

### registerSunburst

:::note{title="Mô tả"}
Đăng ký quy trình xây dựng của Biểu đồ Sunburst.
Sau khi đăng ký, Builder sẽ hỗ trợ xây dựng Cấu hình Spec và Advanced Config cho Biểu đồ Sunburst.
:::

```ts
function registerSunburst(): void
```

### registerTable

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ bảng.
Sau khi đăng ký, Builder sẽ hỗ trợ Spec và Advanced Config để xây dựng Biểu đồ bảng.
:::

```ts
function registerTable(): void
```

### registerTreeMap

:::note{title="Mô tả"}
Đăng ký đường dẫn xây dựng của Biểu đồ TreeMap.
Sau khi đăng ký, Builder sẽ hỗ trợ Spec và Advanced Config để xây dựng Biểu đồ TreeMap.
:::

```ts
function registerTreeMap(): void
```

