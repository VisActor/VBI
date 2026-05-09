# MeasureNodeBuilder

Trình tạo nút số liệu để định cấu hình các số liệu riêng lẻ

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

### getEncoding

Lấy vị trí mã hóa biểu đồ

**Định nghĩa**:

```typescript
getEncoding(): VBIMeasure['encoding'] | undefined
```

**Trở về**: `VBIMeasure['encoding'] \| undefined`

### getSort

Nhận cấu hình sắp xếp

**Định nghĩa**:

```typescript
getSort(): VBISort | undefined
```

**Trở về**: `VBISort \| undefined`

### setAlias

Đặt tên hiển thị

**Định nghĩa**:

```typescript
setAlias(alias: string): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `alias` | string | - tên hiển thị|

### setEncoding

Đặt vị trí mã hóa biểu đồ

**Định nghĩa**:

```typescript
setEncoding(encoding: NonNullable<VBIMeasure['encoding']>): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `encoding` | `NonNullable<VBIMeasure['encoding']>` | - Vị trí mã hóa chỉ thị|

### setSort

Đặt cấu hình sắp xếp

**Định nghĩa**:

```typescript
setSort(sort: VBISort): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `sort` | `VBISort` | - Sắp xếp cấu hình|

### setAggregate

Đặt hàm tổng hợp

**Định nghĩa**:

```typescript
setAggregate(aggregate: VBIMeasure['aggregate']): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `aggregate` | `VBIMeasure['aggregate']` | - Cấu hình tổng hợp|

### setFormat

Định dạng một số

**Định nghĩa**:

```typescript
setFormat(format: VBIMeasureFormat): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `format` | `VBIMeasureFormat` | - Cấu hình định dạng|

### getFormat

Nhận định dạng số

**Định nghĩa**:

```typescript
getFormat(): VBIMeasureFormat | undefined
```

**Trở về**: `VBIMeasureFormat \| undefined`

### clearFormat

Xóa cấu hình định dạng số

**Định nghĩa**:

```typescript
clearFormat(): this
```

**Trở về**: `this`

### clearSort

Xóa cấu hình sắp xếp

**Định nghĩa**:

```typescript
clearSort(): this
```

**Trở về**: `this`

### toJSON

Xuất sang JSON

**Định nghĩa**:

```typescript
toJSON(): VBIMeasure
```

**Trở về**: `VBIMeasure`