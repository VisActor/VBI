# ChartTypeBuilder

Trình tạo loại biểu đồ để chuyển đổi và nhận các loại biểu đồ. Hỗ trợ nhiều loại biểu đồ khác nhau như bảng, biểu đồ thanh, biểu đồ đường, biểu đồ hình tròn, biểu đồ phân tán, v.v.

## Thuộc tính

## Phương pháp

### constructor

hàm tạo

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

Theo dõi các thay đổi về loại biểu đồ

**Định nghĩa**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Trở về**: `() => void`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `callback` | ObserveCallback | - chức năng gọi lại|

### changeChartType

Đặt loại biểu đồ

**Định nghĩa**:

```typescript
changeChartType(chartType: string)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `chartType` | string |- Loại biểu đồ|

### getChartType

Lấy loại biểu đồ hiện tại

**Định nghĩa**:

```typescript
getChartType(): string
```

**Trở về**: `string`

### getSupportedDimensionEncodings

Nhận mã hóa thứ nguyên được loại biểu đồ hiện tại hỗ trợ

**Định nghĩa**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

Trả về mã thứ nguyên được đề xuất theo thứ tự thứ nguyên dựa trên loại biểu đồ hiện tại.

**Định nghĩa**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `dimensionCount` | number | - Số lượng kích thước. Theo mặc định, số lượng kích thước trong DSL hiện tại được sử dụng.|

### getSupportedMeasureEncodings

Nhận mã chỉ số được loại biểu đồ hiện tại hỗ trợ

**Định nghĩa**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

Trả về mã chỉ số được đề xuất theo thứ tự chỉ số dựa trên loại biểu đồ hiện tại.

**Định nghĩa**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `measureCount` | number | - Số lượng chỉ số, theo mặc định số lượng chỉ số trong DSL hiện tại được sử dụng|

### toJSON

Xuất sang JSON

**Định nghĩa**:

```typescript
toJSON(): string
```

**Trở về**: `string`

### getAvailableChartTypes

Nhận tất cả các loại biểu đồ được hỗ trợ

**Định nghĩa**:

```typescript
getAvailableChartTypes(): string[]
```

**Trở về**: `string[]`