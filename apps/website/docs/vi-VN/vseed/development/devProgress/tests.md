#Quy trình kiểm tra

VSeed áp dụng quy trình phát triển dựa trên thử nghiệm nghiêm ngặt. **Tất cả các lệnh kiểm tra phải được thực thi trong thư mục gốc của dự án. **

## Phân loại bài kiểm tra

### 1. Kiểm tra đơn vị
- **Mục tiêu**: Kiểm tra các chức năng công cụ độc lập và logic nút Đường ống.
- **Vị trí**: `packages/vseed/tests/unit`
- **Chạy**:
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. Kiểm tra tích hợp
- **Mục tiêu**: Kiểm tra quy trình tạo biểu đồ hoàn chỉnh (VSeed Spec -> VChart Spec).
- **Cơ chế**: Điều khiển dữ liệu. Tự động tạo các trường hợp thử nghiệm và so sánh ảnh chụp nhanh bằng cách đọc tệp JSON trong `packages/vseed/tests/integrations`.
- **Chạy**:
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## Quy trình làm việc cốt lõi (Quy trình công việc)

### Bước 1: Chạy thử nghiệm
Trong quá trình phát triển, hãy chạy thử nghiệm liên quan thường xuyên để xác minh tính logic.
```bash
# 运行所有测试
pnpm --filter=@visactor/vseed run test
```

### Bước 2: Xử lý các thay đổi của ảnh chụp nhanh
Nếu mã được sửa đổi khiến Thông số đầu ra thay đổi (ví dụ: lỗi được sửa hoặc Tính năng được thêm vào):
1. Kiểm tra đầu ra Diff trên bảng điều khiển để xác nhận xem các thay đổi có như mong đợi hay không.
2. Nếu đúng như mong đợi, hãy chạy lệnh cập nhật:
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### Bước 3: Kiểm tra vùng phủ sóng
Trước khi chuyển mã, bạn nên kiểm tra phạm vi kiểm thử.
```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## Ghi chú
- **Được tạo tự động**: Tệp `.test.ts`của thử nghiệm tích hợp được tạo bởi tập lệnh `g`, **Vui lòng không sửa đổi thủ công**.
- **Trường hợp sử dụng mới**: Để thêm thử nghiệm tích hợp mới, chỉ cần thêm tệp cấu hình JSON mới vào thư mục danh mục tương ứng bên dưới `packages/vseed/tests/integrations`, sau đó chạy `pnpm run g`.
