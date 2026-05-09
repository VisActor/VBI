#Quá trình phát triển

## Bắt đầu dự án

```bash title="Khởi động dự án"
pnpm install && pnpm dev
``` 

## Hiểu yêu cầu và viết code

Đó là một quá trình phức tạp, nhưng nói chung, đó là ba điều:
1. Nhập rõ ràng, `vseed`
2. Xóa đầu ra, `vseed`được chuyển thành `advancedVSeed`hoặc `advancedVSeed`được chuyển thành `spec`
3. Viết mã để đảm bảo rằng đầu vào mới có đầu ra như mong đợi

:::tip
`playground(apps/website/docs/zh-CN/playground/index.mdx)`, có thể được gỡ lỗi và phát triển.

:::

## Tạo trường hợp thử nghiệm mới

Nếu cần, bạn có thể xem xét việc tạo một test case mới

:::tip
Khi độ bao phủ giảm, các trường hợp thử nghiệm mới cần được tạo

:::

Trong thư mục `packages/vseed/tests/*`, tạo `testName.json`mới và viết vseed DSL.

thi hành

```bash title="Tạo ca kiểm thử"
pnpm build:canvasTest
```

## Thực hiện kiểm tra đơn vị và cập nhật phạm vi bảo hiểm

```bash title="Chạy unit test và cập nhật độ phủ"
pnpm test:coverage
```

Đảm bảo 3 điều
1. Tất cả các bài kiểm tra đều được thông qua
2. Những thay đổi về ảnh chụp nhanh phù hợp với mong đợi
3. Không giảm độ bao phủ

> Các thay đổi về phạm vi bảo hiểm sẽ được tự động cập nhật vào README.md

## Cập nhật tài liệu mục cấu hình

Nếu định nghĩa TypeScript của loại biểu đồ được sửa đổi, vui lòng cập nhật tài liệu mục cấu hình.

:::tip
Tất cả các định nghĩa loại trong `packages/vseed/src/types/chartType`tương ứng với tài liệu mục cấu hình của mỗi biểu đồ. Nếu có bất kỳ thay đổi nào, hãy nhớ cập nhật chúng.

:::

```bash title="Cập nhật tài liệu tùy chọn cấu hình"
pnpm build:docs
```

## Xuất bản và gửi

```bash title="Mô tả nội dung thay đổi"
pnpm changeset
```

Sau khi thực hiện lệnh `pnpm changeset`, chọn thực hiện các thao tác sau theo lời nhắc
1. Chọn gói cần thay đổi. Nói chung chỉ có vseed
2. Thực hiện theo phiên bản ngữ nghĩa và chọn loại thay đổi. Trong hầu hết các trường hợp, hãy nhấn phím Enter hai lần liên tiếp. Sau khi bỏ qua `major`và `minor`, chọn `patch`.
2. Nhập mô tả thay đổi, ví dụ: `fix: chart render error caused by only one measure`

:::gợi ý mẹo
Một chức năng hoặc bản sửa lỗi tương ứng với `changeset`, tương ứng với `commit`

`Pull Request`tương ứng với `issue`

Một `Pull Request`tương ứng với nhiều chức năng hoặc nhiều Bản sửa lỗi, tương ứng với nhiều `changeset`, tương ứng với nhiều `commit`

:::

## Gửi

```bash title="Commit toàn bộ nội dung"
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
