#Quy trình kiểm tra

VQuery sử dụng khung `rstest`để thử nghiệm. **Tất cả các lệnh phải được thực thi trong thư mục gốc. **

## Cơ chế kiểm thử
Các thử nghiệm của VQuery bao gồm:
- **Đơn vị**: Chức năng công cụ và logic trình biên dịch.
- **ví dụ**: Hoàn tất quá trình tạo SQL và truy vấn dữ liệu.

## Các lệnh thông dụng

### Chạy tất cả các bài kiểm tra
```bash
pnpm --filter=@visactor/vquery run test
```

### Cập nhật ảnh chụp nhanh
Nếu logic do SQL tạo thay đổi như mong đợi thì ảnh chụp nhanh cần được cập nhật:
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Báo cáo phạm vi bảo hiểm
Tạo và xem phạm vi kiểm tra:
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
