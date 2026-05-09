# HavingGroupBuilder

Có trình tạo nhóm để định cấu hình mối quan hệ logic (AND/OR) của một tập hợp các điều kiện

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

### getConditions

**Định nghĩa**:

```typescript
getConditions(): Y.Array<any>
```

**Trở về**: `Y.Array<any>`

### getId

Nhận ID nhóm

**Định nghĩa**:

```typescript
getId(): string
```

**Trở về**: `string`

### getOperator

Nhận toán tử logic

**Định nghĩa**:

```typescript
getOperator(): 'and' | 'or'
```

**Trở về**: `'and' \| 'or'`

### setOperator

Đặt toán tử logic

**Định nghĩa**:

```typescript
setOperator(op: 'and' | 'or'): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toán tử logic|

### add

Thêm bộ lọc Có vào nhóm

**Định nghĩa**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `field` | string | - tên trường|
| `callback` | (node: HavingFilterNodeBuilder) => void | - chức năng gọi lại|

### addGroup

Thêm nhóm lồng nhau vào nhóm hiện tại

**Định nghĩa**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toán tử logic|
| `callback` | (group: HavingGroupBuilder) => void | - chức năng gọi lại|

### remove

Xóa điều kiện của ID đã chỉ định hoặc mục của chỉ mục đã chỉ định

**Định nghĩa**:

```typescript
remove(idOrIndex: string | number): this
```

**Trở về**: `this`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID hoặc chỉ mục|

### clear

Xóa tất cả các điều kiện trong nhóm

**Định nghĩa**:

```typescript
clear(): this
```

**Trở về**: `this`

### toJSON

Xuất sang JSON

**Định nghĩa**:

```typescript
toJSON(): VBIHavingGroup
```

**Trở về**: `VBIHavingGroup`