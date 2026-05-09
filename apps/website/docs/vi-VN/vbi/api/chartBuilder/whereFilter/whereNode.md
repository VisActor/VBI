# WhereFilterNodeBuilder

Trình tạo nút bộ lọc Where để định cấu hình một điều kiện bộ lọc Where duy nhất

## Thuộc tính

## Phương pháp

### constructor

**Định nghĩa**:

```typescript
constructor(yMap: Y.Map<any>)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### getId

Nhận ID nút

**Định nghĩa**:

```typescript
getId(): string
```

**Trở về**: `string`

### getField

Lấy tên trường

**Định nghĩa**:

```typescript
getField(): string
```

**Trở về**: `string`

### setField

Đặt tên trường

**Định nghĩa**:

```typescript
setField(field: string): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `field` | string | - tên trường|

### getOperator

Nhận toán tử bộ lọc

**Định nghĩa**:

```typescript
getOperator(): string | undefined
```

**Trở về**: `string \| undefined`

### setOperator

Đặt toán tử bộ lọc

**Định nghĩa**:

```typescript
setOperator(operator: string): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `operator` | string | - nhà điều hành|

### setValue

Đặt giá trị bộ lọc

**Định nghĩa**:

```typescript
setValue(value: unknown): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `value` | unknown | - giá trị bộ lọc|

### setDate

Đặt bộ lọc ngày

**Định nghĩa**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `predicate` | `VBIWhereDatePredicate` | - vị ngữ ngày|

### getDate

Nhận điều kiện bộ lọc ngày, bộ lọc không ngày trả về không xác định

**Định nghĩa**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**Trở về**: `VBIWhereDatePredicate \| undefined`

### toJSON

Xuất sang JSON

**Định nghĩa**:

```typescript
toJSON(): VBIWhereFilter
```

**Trở về**: `VBIWhereFilter`