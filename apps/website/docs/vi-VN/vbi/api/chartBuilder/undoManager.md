# UndoManager

Trình quản lý hoàn tác/làm lại, cung cấp các chức năng hoàn tác và làm lại dựa trên YJS, hỗ trợ quản lý ngăn xếp và các hoạt động xóa lịch sử

## Thuộc tính

## Phương pháp

### constructor

hàm tạo

**Định nghĩa**:

```typescript
constructor(scope: any)
```

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `scope` | any | - Phạm vi loại hoặc tài liệu YJS, được sử dụng để xác định phạm vi theo dõi hoàn tác/làm lại|

### undo

Hoàn tác sửa đổi cuối cùng

**Định nghĩa**:

```typescript
undo(): boolean
```

**Trở về**: `boolean`

### redo

Làm lại những thay đổi đã hoàn tác

**Định nghĩa**:

```typescript
redo(): boolean
```

**Trở về**: `boolean`

### canUndo

Kiểm tra xem có bất kỳ thao tác nào có thể hoàn tác được không

**Định nghĩa**:

```typescript
canUndo(): boolean
```

**Trở về**: `boolean`

### canRedo

Kiểm tra xem có thao tác nào có thể thực hiện lại được không

**Định nghĩa**:

```typescript
canRedo(): boolean
```

**Trở về**: `boolean`

### clear

xóa lịch sử

**Định nghĩa**:

```typescript
clear(clearUndoStack: boolean, clearRedoStack: boolean): void
```

**Trở về**: `void`

**Thông số**:

| Tham số | loại| Giải thích |
| --- | --- | --- |
| `clearUndoStack` | boolean | - Có xóa ngăn xếp hoàn tác hay không, mặc định là đúng|
| `clearRedoStack` | boolean | - Có xóa ngăn xếp làm lại hay không, mặc định là true|