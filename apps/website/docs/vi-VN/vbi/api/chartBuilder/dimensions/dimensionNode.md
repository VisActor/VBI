# DimensionNodeBuilder

Trình tạo nút thứ nguyên để định cấu hình các thứ nguyên riêng lẻ

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
getEncoding(): VBIDimension['encoding'] | undefined
```

**Trở về**: `VBIDimension['encoding'] \| undefined`

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
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `encoding` | `NonNullable<VBIDimension['encoding']>` | - Vị trí mã hóa kích thước|

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

Đặt chức năng tổng hợp ngày

**Định nghĩa**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `aggregate` | `NonNullable<VBIDimension['aggregate']>` | - Cấu hình tổng hợp ngày|

### clearAggregate

Xóa chức năng tổng hợp ngày

**Định nghĩa**:

```typescript
clearAggregate(): this
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
toJSON(): VBIDimension
```

**Trở về**: `VBIDimension`