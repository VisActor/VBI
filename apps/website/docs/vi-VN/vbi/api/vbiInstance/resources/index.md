# VBI.resources

Không gian tên resource trên một phiên bản VBI, dùng để đăng ký các resource dùng chung có thể được dashboard tham chiếu.

## Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
| --- | --- | --- |
| **chart** | `VBIChartResourceNamespace` | API quản lý resource biểu đồ. |
| **insight** | `VBIInsightResourceNamespace` | API quản lý resource Insight. |


## Phương thức

### register

Đăng ký hàng loạt resource biểu đồ và insight.

**Định nghĩa**:

```typescript
register(resources: VBIResourceRegisterInput): VBIResourceRegisterResult
```

**Trả về**: `VBIResourceRegisterResult`

**Tham số**:

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `resources` | VBIResourceRegisterInput | - |

### clear

Xóa tất cả resource biểu đồ và insight của phiên bản VBI hiện tại.

**Định nghĩa**:

```typescript
clear(): void
```

**Trả về**: `void`

### snapshot

Xuất snapshot DSL của các resource mà phiên bản VBI hiện tại có thể tham chiếu.

**Định nghĩa**:

```typescript
snapshot(): VBIResourceSnapshot
```

**Trả về**: `VBIResourceSnapshot`
