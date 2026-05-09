# LimitBuilder

Trình tạo giới hạn khối lượng dữ liệu, được sử dụng để đặt và nhận giới hạn hiện tại

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

Giám sát các thay đổi giới hạn và trả về chức năng hủy giám sát

**Định nghĩa**:

```typescript
observe(callback: ObserveCallback): () => void
```

**Trở về**: `() => void`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `callback` | ObserveCallback | - chức năng gọi lại|

### setLimit

đặt giới hạn

**Định nghĩa**:

```typescript
setLimit(limit: number)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `limit` | number | - Giới hạn dung lượng dữ liệu|

### getLimit

Nhận giới hạn hiện tại

**Định nghĩa**:

```typescript
getLimit(): number | undefined
```

**Trở về**: `number \| undefined`

### toJSON

Xuất sang JSON

**Định nghĩa**:

```typescript
toJSON(): number | undefined
```

**Trở về**: `number \| undefined`