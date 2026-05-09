---
title: Phát hành
---


# xuất bản

## Tạo tập thay đổi

Để tạo các bộ thay đổi mới, hãy thực thi bộ thay đổi pnpm trong thư mục gốc của kho lưu trữ. Các tệp đánh dấu được tạo trong thư mục.changeset phải được cam kết vào kho lưu trữ.
```bash
pnpm changeset
```

Sau khi tạo bộ thay đổi, hãy thực thi git commit
```bash
git add .
git commit -m "chore: commit message"
```

Quá trình trên có thể được lặp lại nhiều lần và nội dung của từng bộ thay đổi sẽ được tích lũy cho đến khi phiên bản cuối cùng được phát hành.

## Phiên bản cập nhật

Thực hiện lệnh sau để cập nhật phiên bản và cập nhật ChangeLog.
```bash
pnpm changeset version
```

Cập nhật phụ thuộc và tập tin khóa
```bash
pnpm install
```

Cam kết thay đổi
```bash
git add .
git commit -m "chore: release message"
git push
```

Sau khi PR được sáp nhập vào nhánh chính, quy trình làm việc của bộ thay đổi sẽ được tự động kích hoạt để đóng gói và xuất bản.