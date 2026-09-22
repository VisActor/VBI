# DashboardThemeBuilder

Builder giao diện Dashboard lưu tên giao diện; lớp kết xuất đăng ký và xác định kiểu hiển thị.

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

Theo dõi thay đổi giao diện cục bộ, hoàn tác và đồng bộ cộng tác; trả về hàm hủy đăng ký.

**Định nghĩa**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Trả về**: `() => void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `callback` | ObserveCallback | - Hàm gọi lại khi giao diện thay đổi |

### setTheme

Đặt light, dark hoặc giao diện tùy chỉnh đã đăng ký mà không thay đổi tài nguyên biểu đồ được tham chiếu.

**Định nghĩa**:

```typescript
setTheme(theme: string): void
```

**Trả về**: `void`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `theme` | string | - Tên giao diện không rỗng |

### getTheme

Lấy tên giao diện, mặc định là light.

**Định nghĩa**:

```typescript
getTheme(): string
```

**Trả về**: `string`

### toJSON

Xuất tên giao diện.

**Định nghĩa**:

```typescript
toJSON(): string
```

**Trả về**: `string`