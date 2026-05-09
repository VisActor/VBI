# Các tập lệnh thường được sử dụng

Để duy trì tính nhất quán của Monorepo, **tất cả các tập lệnh phải được thực thi trong thư mục gốc của dự án**.

## Tập lệnh lõi (g)

```bash
pnpm run g
```
**Mô tả chức năng**: Tập lệnh `g`của VQuery chịu trách nhiệm:
1. `build:test`: Biên soạn tài nguyên kiểm tra.
2. `build:docs`: Tạo tài liệu API.

## Phát triển và xây dựng

### Xây dựng
```bash
pnpm --filter=@visactor/vquery run build
```

## Kiểm tra

### Chạy thử nghiệm
VQuery sử dụng Rstest để thử nghiệm.
```bash
pnpm --filter=@visactor/vquery run test
```

### Cập nhật ảnh chụp nhanh
```bash
pnpm --filter=@visactor/vquery run test:update
```

### Bảo hiểm
```bash
pnpm --filter=@visactor/vquery run test:coverage
```
