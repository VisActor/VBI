# Builder

## Methods

### prepare

```ts
prepare(): Promise<void>
```

Thực thi mã bộ lọc động không đồng bộ. Được gọi trước build() để thực thi mã trong DynamicFilter. Phương thức bình thường, nhiều cuộc gọi sẽ không được lặp lại

### build

```ts
build<T = S>(): T
```

Tạo cấu hình biểu đồ cuối cùng (Spec). Đây là phương pháp cốt lõi được sử dụng phổ biến nhất. Nếu cấu hình chứa mã DynamicFilter, chuẩn bị() cần được gọi trước

### buildSpec

```ts
buildSpec<T = S>(advanced: AdvancedVSeed): T
```

Chuyển đổi cấu hình cấp trung (AdvancedVSeed) sang Thông số kỹ thuật cuối cùng. Chỉ sử dụng khi bạn cần tùy chỉnh sâu cấu hình cấp trung

### buildAdvanced

```ts
buildAdvanced(): AdvancedVSeed | null
```

Tạo cấu hình lớp giữa (AdvancedVSeed), đây là mẫu biểu đồ. Chi tiết hơn VSeed ban đầu, hiển thị nhiều chi tiết biểu đồ hơn

### getColorItems

```ts
getColorItems(): __type[]
```

Lấy thông tin trường liên quan đến màu sắc trong dữ liệu. Giao diện người dùng bộ lọc màu hoặc chú thích thường được sử dụng để tạo biểu đồ

### getColorIdMap

```ts
getColorIdMap(): Record
```

Nhận bảng ánh xạ chi tiết cho các trường màu. Key là ID màu, Value là thông tin chi tiết

### getColorValueMap

```ts
getColorValueMap(): undefined | Record
```

Nhận ánh xạ của colorId tới các giá trị màu cuối cùng trong bản đồ màu rời rạc

## Static Methods

### getAdvancedPipeline

```ts
static getAdvancedPipeline(chartType: ChartType): Pipe[]
```

[Phương pháp nội bộ] Lấy quy trình xây dựng mẫu của loại biểu đồ đã chỉ định, được sử dụng để gỡ lỗi quá trình chuyển đổi từ VSeed sang AdvancedVSeed

### getSpecPipeline

```ts
static getSpecPipeline(chartType: ChartType): SpecPipe[]
```

[Phương pháp nội bộ] Lấy quy trình xây dựng Spec của loại biểu đồ đã chỉ định, được sử dụng để gỡ lỗi quá trình chuyển đổi từ AdvancedVSeed sang Spec

### getTheme

```ts
static getTheme(themeKey?: string): CustomThemeConfig
```

Nhận cấu hình của chủ đề được chỉ định. Nếu themeKey không được thông qua, chủ đề 'ánh sáng' sẽ được trả về theo mặc định.

### getThemeMap

```ts
static getThemeMap(): Record<string, CustomThemeConfig>
```

Nhận tất cả các cấu hình chủ đề đã đăng ký

### from

```ts
static from<T extends Spec = Spec>(vseed: VSeed): Builder<T>
```

Phương thức xuất xưởng tĩnh để tạo phiên bản Builder một cách thuận tiện

### registerAdvancedPipeline

```ts
static registerAdvancedPipeline(chartType: ChartType, pipeline: AdvancedPipeline): void
```

[Phương pháp mở rộng] Đăng ký quy trình xây dựng mẫu của loại biểu đồ mới

### registerSpecPipeline

```ts
static registerSpecPipeline(chartType: ChartType, pipeline: SpecPipeline): void
```

[Phương pháp mở rộng] Đăng ký quy trình xây dựng Spec cho loại biểu đồ mới

### updateAdvanced

```ts
static updateAdvanced(chartType: ChartType, pipe: AdvancedPipe): void
```

[Phương pháp mở rộng] Sửa đổi logic xây dựng mẫu của biểu đồ hiện có và chèn Ống tùy chỉnh để tác động đến AdvancedVSeed được tạo

### updateSpec

```ts
static updateSpec(chartType: ChartType, pipe: SpecPipe): void
```

[Phương pháp mở rộng] Sửa đổi logic xây dựng Thông số kỹ thuật của biểu đồ hiện có và chèn Ống tùy chỉnh để ảnh hưởng đến Thông số kỹ thuật được tạo cuối cùng

### registerTheme

```ts
static registerTheme(key: string, theme: CustomThemeConfig): void
```

[Phương pháp mở rộng] Đăng ký một chủ đề tùy chỉnh

## Properties

### get locale

```ts
get locale()
```

Nhận ngôn ngữ được sử dụng bởi Trình tạo hiện tại

### get vseed

```ts
get vseed()
```

Lấy dữ liệu đầu vào VSeed hiện tại

### set vseed

```ts
set vseed(value)
```

Cập nhật dữ liệu đầu vào VSeed. Trạng thái bộ nhớ đệm của prepare() sẽ bị xóa sau khi cập nhật.

### get isPrepared

```ts
get isPrepared()
```

Nhận trạng thái chuẩn bị ()

### set isPrepared

```ts
set isPrepared(value: boolean)
```

Đặt trạng thái chuẩn bị ()

### get advancedVSeed

```ts
get advancedVSeed()
```

Lấy đối tượng cấu hình trung gian AdvancedVSeed hiện tại

### set advancedVSeed

```ts
set advancedVSeed(value)
```

Đặt đối tượng cấu hình trung gian AdvancedVSeed. Thường được sử dụng để lưu trữ hoặc sử dụng lại các cấu hình trung gian hiện có

### get spec

```ts
get spec()
```

Lấy đối tượng Spec cuối cùng hiện được tạo

### set spec

```ts
set spec(value)
```

Đặt đối tượng Spec. Thường được sử dụng để lưu trữ

### get performance

```ts
get performance()
```

Nhận số liệu thống kê hiệu suất trong quá trình xây dựng. Bao gồm thời gian dành cho từng giai đoạn (đơn vị: ms)

### set performance

```ts
set performance(value)
```

Đặt thống kê hiệu suất

