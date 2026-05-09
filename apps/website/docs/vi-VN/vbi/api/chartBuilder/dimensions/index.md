# DimensionsBuilder

Trình tạo thứ nguyên, được sử dụng để thêm, sửa đổi và xóa cấu hình thứ nguyên. Thứ nguyên là các trường phân loại dữ liệu, chẳng hạn như: thời gian, khu vực, danh mục sản phẩm

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

### add

thêm một thứ nguyên

**Định nghĩa**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Trở về**: `DimensionsBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `field` | string | - tên trường|
| `callback` | (node: DimensionNodeBuilder) => void | - chức năng gọi lại|

### remove

Xóa thứ nguyên với ID được chỉ định

**Định nghĩa**:

```typescript
remove(id: string): DimensionsBuilder
```

**Trở về**: `DimensionsBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `id` | string | - ID chiều |

### update

Cập nhật cấu hình cho ID thứ nguyên đã chỉ định

**Định nghĩa**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**Trở về**: `DimensionsBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `id` | string | - ID chiều |
| `callback` | (node: DimensionNodeBuilder) => void | - chức năng gọi lại|

### find

Tìm thứ nguyên đầu tiên theo điều kiện gọi lại, hành vi phù hợp với Array.find

**Định nghĩa**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**Trở về**: `DimensionNodeBuilder \| undefined`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean |- Tiêu chí tìm kiếm|

### findAll

Nhận tất cả các kích thước

**Định nghĩa**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**Trở về**: `DimensionNodeBuilder[]`

### toJSON

Xuất tất cả các kích thước dưới dạng mảng JSON

**Định nghĩa**:

```typescript
toJSON(): VBIDimension[]
```

**Trở về**: `VBIDimension[]`

### observe

Giám sát các thay đổi về kích thước và trả về một hàm để hủy giám sát.

**Định nghĩa**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Trở về**: `() => void`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - chức năng gọi lại|

### static isDimensionNode

**Định nghĩa**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**Trở về**: `node is VBIDimension`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |

### static isDimensionGroup

**Định nghĩa**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**Trở về**: `node is VBIDimensionGroup`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |