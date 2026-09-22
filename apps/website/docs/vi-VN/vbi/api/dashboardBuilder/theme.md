# DashboardThemeBuilder

Builder chủ đề Dashboard. Quản lý cấu hình, chủ đề có sẵn, đăng ký theo dõi và đăng ký VSeed; thành phần dùng kết quả đã phân giải.

## Phương thức

### constructor

**Định nghĩa**:

```typescript
constructor(dsl: Y.Map<any>)
```

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `dsl` | Y.Map<any> | - |

### observe

Theo dõi thay đổi tên hoặc cấu hình từ thao tác cục bộ, hoàn tác/làm lại và đồng bộ cộng tác. Trả về hàm hủy đăng ký.

**Định nghĩa**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Trả về**: `() => void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `callback` | ObserveCallback | - Hàm gọi lại khi chủ đề thay đổi |

### setTheme

Chọn chủ đề. Cấu hình tùy chọn được lưu và chọn trong một thay đổi, không cần đăng ký trước và không sửa tài nguyên biểu đồ.

**Định nghĩa**:

```typescript
setTheme(theme: string, definition?: VBIDashboardThemeDefinition): void
```

**Trả về**: `void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `theme` | string | - Tên chủ đề không rỗng |
| `definition?` | VBIDashboardThemeDefinition | - Cấu hình đầy đủ tùy chọn được lưu trong Dashboard này |

### registerTheme

Đăng ký hoặc cập nhật chủ đề trong tài liệu mà không chọn nó. Cấu hình được lưu và đồng bộ cùng tài liệu.

**Định nghĩa**:

```typescript
registerTheme(theme: string, definition: VBIDashboardThemeDefinition): void
```

**Trả về**: `void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `theme` | string | - Tên chủ đề không rỗng |
| `definition` | VBIDashboardThemeDefinition | - Cấu hình chủ đề đầy đủ |

### getThemeConfig

Trả về bản sao cấu hình, ưu tiên tài liệu hơn chủ đề có sẵn. Trả về undefined nếu không có cấu hình.

**Định nghĩa**:

```typescript
getThemeConfig(theme?: string): VBIDashboardThemeDefinition | undefined
```

**Trả về**: `VBIDashboardThemeDefinition \| undefined`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - Tên chủ đề, mặc định là chủ đề hiện tại |

### getThemeDefinitions

Trả về bản sao của tất cả cấu hình chủ đề trong tài liệu. Dùng observe để theo dõi danh sách chủ đề khả dụng.

**Định nghĩa**:

```typescript
getThemeDefinitions(): Record<string, VBIDashboardThemeDefinition>
```

**Trả về**: `Record<string, VBIDashboardThemeDefinition>`

### getThemeOptions

Liệt kê tên, chế độ sáng/tối và bảng màu của chủ đề có sẵn và trong tài liệu. Cấu hình tài liệu được ưu tiên khi trùng tên.

**Định nghĩa**:

```typescript
getThemeOptions(): VBIDashboardThemeOption[]
```

**Trả về**: `VBIDashboardThemeOption[]`

### resolveTheme

Phân giải chủ đề và bảo đảm đăng ký VSeed với tên chạy độc lập. Tên không xác định dùng light mà không sửa tài liệu.

**Định nghĩa**:

```typescript
resolveTheme(theme?: string): VBIDashboardResolvedTheme
```

**Trả về**: `VBIDashboardResolvedTheme`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `theme?` = this.getTheme() | string | - Tên chủ đề, mặc định là lựa chọn hiện tại; có thể xem trước tạm thời chủ đề khác |

### getTheme

Lấy tên chủ đề, mặc định là light.

**Định nghĩa**:

```typescript
getTheme(): string
```

**Trả về**: `string`

### toJSON

Xuất tên chủ đề.

**Định nghĩa**:

```typescript
toJSON(): string
```

**Trả về**: `string`
