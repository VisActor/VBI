# createVBI

Tạo một phiên bản VBI độc lập.

Mỗi phiên bản có registry resource riêng, phù hợp để cô lập các dashboard hoặc ngữ cảnh kiểm thử khác nhau trong cùng một ứng dụng.

## Chữ ký hàm

```typescript
function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
function createVBI<TQueryDSL, TSeedDSL>(defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>): VBIInstance<TQueryDSL, TSeedDSL>
```

## Tham số

| Tham số | Kiểu | Mô tả |
| --- | --- | --- |
| `defaultBuilderOptions` | VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | Cấu hình chart Builder mặc định, được truyền cho chart Builder tạo trong chart và dashboard. |

---

# VBI

Phiên bản VBI mặc định, phù hợp để dùng trực tiếp các khả năng Builder và resource được chia sẻ toàn cục.

**Kiểu**: `VBIInstance`

**Định nghĩa**:

```typescript
const VBI: VBIInstance = createVBI()
```

---

# VBIInstance

Phiên bản VBI do createVBI trả về, là điểm vào thống nhất để truy cập các khả năng như chart, insight, dashboard.

## Thuộc tính

| Thuộc tính | Kiểu | Mô tả |
| --- | --- | --- |
| **connectors** | `VBIConnectorNamespace` | API đăng ký, lấy và giải phóng connector. |
| **resources** | `VBIResourceNamespace` | API đăng ký resource chart và insight, dùng để dashboard tham chiếu resource dùng chung. |
| **chart** | `VBIChartNamespace<TQueryDSL, TSeedDSL>` | API tạo Chart Builder. |
| **insight** | `VBIInsightNamespace` | API tạo Insight Builder. |
| **dashboard** | `VBIDashboardNamespace<TQueryDSL, TSeedDSL>` | API tạo Dashboard Builder. |
