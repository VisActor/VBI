# LocaleBuilder

Trình tạo ngôn ngữ để cài đặt và nhận ngôn ngữ hiện tại

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

Giám sát thay đổi ngôn ngữ và trả về chức năng hủy giám sát

**Định nghĩa**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Trở về**: `() => void`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `callback` | ObserveCallback | - chức năng gọi lại|

### setLocale

Đặt ngôn ngữ

**Định nghĩa**:

```typescript
setLocale(locale: string)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `locale` | string | - tên ngôn ngữ|

### getLocale

Nhận ngôn ngữ hiện tại

**Định nghĩa**:

```typescript
getLocale(): string
```

**Trở về**: `string`

### toJSON

Xuất sang JSON

**Định nghĩa**:

```typescript
toJSON(): string
```

**Trở về**: `string`