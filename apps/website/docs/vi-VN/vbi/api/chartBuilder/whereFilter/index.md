# WhereFilterBuilder

Nơi tạo bộ lọc, được sử dụng để thêm, sửa đổi và xóa các điều kiện lọc cấp hàng. Trường hợp quá trình lọc có hiệu lực trước khi truy vấn dữ liệu và được sử dụng để lọc dữ liệu gốc

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

Thêm bộ lọc Địa điểm

**Định nghĩa**:

```typescript
add(field: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Trở về**: `WhereFilterBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `field` | string | - tên trường|
| `callback` | (node: WhereFilterNodeBuilder) => void | - chức năng gọi lại|

### addGroup

Thêm nhóm Ở đâu

**Định nghĩa**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Trở về**: `WhereFilterBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - Toán tử logic|
| `callback` | (group: WhereGroupBuilder) => void | - chức năng gọi lại|

### update

Cập nhật bộ lọc cho ID được chỉ định

**Định nghĩa**:

```typescript
update(id: string, callback: (node: WhereFilterNodeBuilder) => void): WhereFilterBuilder
```

**Trở về**: `WhereFilterBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `id` | string | - ID bộ lọc|
| `callback` | (node: WhereFilterNodeBuilder) => void | - chức năng gọi lại|

### updateGroup

Cập nhật nhóm với ID được chỉ định

**Định nghĩa**:

```typescript
updateGroup(id: string, callback: (group: WhereGroupBuilder) => void): WhereFilterBuilder
```

**Trở về**: `WhereFilterBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `id` | string |- Mã nhóm|
| `callback` | (group: WhereGroupBuilder) => void | - chức năng gọi lại|

### remove

Xóa điều kiện của ID đã chỉ định hoặc mục của chỉ mục đã chỉ định

**Định nghĩa**:

```typescript
remove(idOrIndex: string | number): WhereFilterBuilder
```

**Trở về**: `WhereFilterBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID hoặc chỉ mục|

### find

Tìm điều kiện đầu tiên (lọc hoặc nhóm) theo điều kiện gọi lại, hoạt động giống như Array.find

**Định nghĩa**:

```typescript
find(predicate: (entry: WhereFilterNodeBuilder | WhereGroupBuilder, index: number) => boolean): WhereFilterNodeBuilder | WhereGroupBuilder | undefined
```

**Trả về**: `WhereFilterNodeBuilder \| WhereGroupBuilder \| undefined`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `predicate` | (entry: WhereFilterNodeBuilder \| WhereGroupBuilder, index: number) => boolean |- Tiêu chí tìm kiếm|

### clear

Xóa tất cả các bộ lọc Ở đâu

**Định nghĩa**:

```typescript
clear()
```

### toJSON

Xuất hoàn tất Cấu hình lọc ở đâu

**Định nghĩa**:

```typescript
toJSON(): VBIWhereGroup
```

**Trở về**: `VBIWhereGroup`

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