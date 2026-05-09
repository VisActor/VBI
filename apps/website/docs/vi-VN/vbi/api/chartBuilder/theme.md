# ThemeBuilder

Trình tạo chủ đề để cài đặt và nhận chủ đề hiện tại

## Thuộc tính

## Phương pháp

### constructor

hàm tạo

**Định nghĩa**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `_doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

Giám sát các thay đổi chủ đề và trả về một chức năng để hủy giám sát

**Định nghĩa**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Trở về**: `() => void`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `callback` | ObserveCallback | - chức năng gọi lại|

### setTheme

Đặt chủ đề

**Định nghĩa**:

```typescript
setTheme(theme: string)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `theme` | string | - tên chủ đề|

### getTheme

Lấy chủ đề hiện tại

**Định nghĩa**:

```typescript
getTheme(): string
```

**Trở về**: `string`

### toJSON

Xuất sang JSON

**Định nghĩa**:

```typescript
toJSON(): string
```

**Trở về**: `string`