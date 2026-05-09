# HavingFilterBuilder

Có trình tạo bộ lọc để thêm, sửa đổi và xóa các điều kiện lọc sau nhóm. Việc lọc có hiệu lực sau khi tổng hợp dữ liệu và được sử dụng để lọc các kết quả được nhóm.

## Thuộc tính

## Phương pháp

### constructor

**Định nghĩa**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### getConditions

**Định nghĩa**:

```typescript
getConditions(): Y.Array<any>
```

**Trở về**: `Y.Array<any>`

### add

Thêm bộ lọc Có

**Định nghĩa**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Trở về**: `HavingFilterBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `field` | string | - tên trường|
| `callback` | (node: HavingFilterNodeBuilder) => void | - chức năng gọi lại|

### addGroup

Thêm nhóm Có

**Định nghĩa**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Trở về**: `HavingFilterBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toán tử logic|
| `callback` | (group: HavingGroupBuilder) => void | - chức năng gọi lại|

### update

Cập nhật bộ lọc cho ID được chỉ định

**Định nghĩa**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**Trở về**: `HavingFilterBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `id` | string | - ID bộ lọc|
| `callback` | (node: HavingFilterNodeBuilder) => void | - chức năng gọi lại|

### updateGroup

Cập nhật nhóm với ID được chỉ định

**Định nghĩa**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**Trở về**: `HavingFilterBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `id` | string |- Mã nhóm|
| `callback` | (group: HavingGroupBuilder) => void | - chức năng gọi lại|

### remove

Xóa điều kiện của ID đã chỉ định hoặc mục của chỉ mục đã chỉ định

**Định nghĩa**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**Trở về**: `HavingFilterBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID hoặc chỉ mục|

### find

Tìm điều kiện đầu tiên (lọc hoặc nhóm) theo điều kiện gọi lại, hoạt động giống như Array.find

**Định nghĩa**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**Trả về**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean |- Tiêu chí tìm kiếm|

### clear

Xóa tất cả Có bộ lọc

**Định nghĩa**:

```typescript
clear()
```

### toJSON

Xuất cấu hình bộ lọc hoàn chỉnh

**Định nghĩa**:

```typescript
toJSON(): VBIHavingGroup
```

**Trở về**: `VBIHavingGroup`

### observe

Theo dõi các thay đổi trong điều kiện lọc và trả về hàm hủy giám sát.

**Định nghĩa**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Trở về**: `() => void`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - chức năng gọi lại|

### static isGroup

Xác định xem đó có phải là nút nhóm không

**Định nghĩa**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**Trở về**: `boolean`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### static isNode

Xác định xem đó có phải là nút lá không

**Định nghĩa**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**Trở về**: `boolean`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |