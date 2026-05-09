# MeasuresBuilder

Trình tạo số liệu để thêm, sửa đổi và xóa cấu hình số liệu. Số đo là các trường dữ liệu dạng số như: doanh số, lợi nhuận, số lượng

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

Thêm số liệu

**Định nghĩa**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Trở về**: `MeasuresBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `field` | string | - tên trường|
| `callback` | (node: MeasureNodeBuilder) => void | - chức năng gọi lại|

### remove

Xóa số liệu có ID được chỉ định

**Định nghĩa**:

```typescript
remove(id: string): MeasuresBuilder
```

**Trở về**: `MeasuresBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `id` | string | - ID số liệu|

### update

Cập nhật cấu hình đo

**Định nghĩa**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**Trở về**: `MeasuresBuilder`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `id` | string | - ID số liệu|
| `callback` | (node: MeasureNodeBuilder) => void | - chức năng gọi lại|

### find

Tìm số liệu đầu tiên theo tiêu chí gọi lại, hoạt động giống như Array.find

**Định nghĩa**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**Trở về**: `MeasureNodeBuilder \| undefined`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean |- Tiêu chí tìm kiếm|

### findAll

Nhận tất cả các số liệu

**Định nghĩa**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**Trở về**: `MeasureNodeBuilder[]`

### toJSON

Xuất tất cả số liệu dưới dạng mảng JSON

**Định nghĩa**:

```typescript
toJSON(): VBIMeasure[]
```

**Trở về**: `VBIMeasure[]`

### observe

Lắng nghe những thay đổi về số liệu

**Định nghĩa**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**Trở về**: `() => void`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - chức năng gọi lại|

### static isMeasureNode

**Định nghĩa**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**Trở về**: `node is VBIMeasure`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |

### static isMeasureGroup

**Định nghĩa**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**Trở về**: `node is VBIMeasureGroup`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |