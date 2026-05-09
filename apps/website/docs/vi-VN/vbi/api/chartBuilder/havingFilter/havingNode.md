# HavingFilterNodeBuilder

Có trình tạo nút bộ lọc để định cấu hình một điều kiện Có bộ lọc duy nhất

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

### getOperator

Nhận toán tử bộ lọc

**Định nghĩa**:

```typescript
getOperator(): string | undefined
```

**Trở về**: `string \| undefined`

### getAggregate

Nhận cấu hình tổng hợp

**Định nghĩa**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**Trở về**: `VBIHavingAggregate \| undefined`

### setValue

Đặt giá trị của điều kiện lọc

**Định nghĩa**:

```typescript
setValue(value: unknown): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `value` | unknown | - giá trị bộ lọc|

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

### setAggregate

Đặt cấu hình tổng hợp

**Định nghĩa**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `aggregate` | `VBIHavingAggregate` | - Cấu hình tổng hợp|

### toJSON

Xuất sang JSON

**Định nghĩa**:

```typescript
toJSON(): VBIHavingFilter
```

**Trở về**: `VBIHavingFilter`