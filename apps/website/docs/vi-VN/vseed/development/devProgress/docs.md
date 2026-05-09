# Tài liệu

:::info
Viết loại `TypeScript`có nghĩa là viết gián tiếp tài liệu mục cấu hình.
:::

Tài liệu cho tất cả các loại biểu đồ VSeed đều có trong thư mục [`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType)

## Tự động xây dựng tài liệu

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
Vui lòng không sửa đổi trực tiếp nội dung tài liệu vì chúng có thể bị ghi đè bất cứ lúc nào.

`build:docs`Hoàn thành sau vài giây nên không có cập nhật gia tăng nào được thực hiện, mỗi khi tài liệu được tạo, tất cả tài liệu cũ sẽ bị xóa và tài liệu mới được tạo.

:::