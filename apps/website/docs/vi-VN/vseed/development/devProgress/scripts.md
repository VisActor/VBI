# Các tập lệnh thường được sử dụng

Để duy trì tính nhất quán của Monorepo, **tất cả các tập lệnh phải được thực thi trong thư mục gốc của dự án**.

## Tập lệnh lõi (g)

`g`(Generator) là tập lệnh phụ trợ quan trọng nhất trong quá trình phát triển VSeed.

```bash
pnpm run g
```

**Mô tả chức năng**:
Lệnh này là sự kết hợp của `build:test`, `build:docs`và `build:api`, được sử dụng để đảm bảo rằng các tài nguyên của môi trường phát triển được đồng bộ hóa:
1. **Tạo các trường hợp thử nghiệm**: Phân tích cú pháp Thông số JSON trong `tests/integrations`và tạo tệp `.test.ts`tương ứng.
2. **Tạo tài liệu**: Phân tích định nghĩa loại TypeScript và cập nhật tài liệu API trong `apps/website`.

**Tình huống sử dụng**:
- Sau khi sửa đổi logic biểu đồ hoặc thêm loại biểu đồ mới.
- Sau khi sửa đổi định nghĩa kiểu TypeScript.
- Trước khi gửi mã.

## Phát triển và xây dựng

### Bắt đầu môi trường phát triển
Đồng thời khởi động trang tài liệu và nghe VSeed.
```bash
pnpm run dev
```

### Xây dựng dự án
Xây dựng thư viện lõi VSeed.
```bash
pnpm --filter=@visactor/vseed run build
```

## Kiểm tra liên quan

### Chạy tất cả các bài kiểm tra
```bash
pnpm --filter=@visactor/vseed run test
```

### Chạy thử nghiệm đơn vị
```bash
pnpm --filter=@visactor/vseed run test:unit
```

### Chạy thử nghiệm tích hợp
```bash
pnpm --filter=@visactor/vseed run test:integration
```

### Cập nhật ảnh chụp nhanh thử nghiệm
Chạy khi mã của bạn thay đổi khiến ảnh chụp nhanh thay đổi (như mong đợi):
```bash
pnpm --filter=@visactor/vseed run test:update
```

## Chất lượng mã

### Kiểm tra lỗi mã nguồn
```bash
pnpm run lint
```

### Kiểm tra loại
```bash
pnpm run typecheck
```
