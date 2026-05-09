# Bối cảnh phát triển tác nhân (VSeed)

Tài liệu này dành cho mã đại lý và người đóng góp. Nó tóm tắt kiến ​​trúc cốt lõi, luồng dữ liệu và các phương pháp mở rộng của gói phụ VSeed, để nhanh chóng thiết lập sự hiểu biết toàn cầu trong quá trình phát triển tự động.

> Đây là "chỉ mục ngữ cảnh" được thiết kế để Đại lý sử dụng. Để biết thêm thông tin chi tiết về dự án, vui lòng tham khảo: `packages/vseed/AGENTS.md`.

## 1. Mục tiêu và định vị

VSeed là **Spec Builder** chuyển đổi `VSeed DSL`thành `VChart`/ `VTable`Spec có thể hiển thị, hỗ trợ khả năng tạo và chỉnh sửa biểu đồ một cách thông minh.

- Đầu vào: `VSeed DSL`
- Đầu ra: `VChart`/ `VTable`Thông số
- Quy trình cốt lõi: `AdvancedPipeline`+ `SpecPipeline`

## 2. Đường ống hai giai đoạn

1. **AdvancedPipeline**

- Đầu vào: `VSeed DSL`
- Đầu ra: `AdvancedVSeed`(trạng thái trung gian có thể tuần tự hóa)
- Chịu trách nhiệm: định hình lại dữ liệu, suy luận mặc định, mô hình hóa mã hóa, chủ đề và phong cách, cấu hình phân tích

2. **SpecPipeline**

- Đầu vào: `AdvancedVSeed`
- Đầu ra: Thông số cuối cùng (không thể tuần tự hóa, được hiển thị trực tiếp)
- Chịu trách nhiệm: ánh xạ các trạng thái trung gian tới các cấu hình VChart/VTable cụ thể

##3. Lối vào của thợ xây

- Sử dụng `Builder.from(vseed).build()`để tạo Spec
- `prepare()`Thực thi DynamicFilter (nếu cần)

Nhập mã nguồn:
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. Định hình lại dữ liệu (lõi)

- `foldMeasures`: Nhiều chỉ số được thu gọn thành một chỉ số duy nhất, tạo ra `foldInfo`
- `unfoldDimensions`: hợp nhất các kích thước theo kênh trực quan để tạo `unfoldInfo`
- `dataReshapeByEncoding`: gọi kết hợp (gấp + mở)

Nhập mã nguồn:
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. Gia hạn và đăng ký

- `registerAll()`: Đăng ký tất cả các biểu đồ và chủ đề
- `registerXxx()`: Đăng ký đường dẫn loại biểu đồ đơn
- `updateAdvanced()`/ `updateSpec()`: Chèn ống tùy chỉnh

Nhập mã nguồn:
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

##6. Nguyên tắc thiết kế đường ống

- Đường ống phải càng nguyên tử càng tốt để giảm if/else
- Kết hợp các quy trình có điều kiện thông qua Adaptor
- Loại biểu đồ được xác định bằng tổ hợp Pipe

Tham khảo:
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. Bối cảnh đầy đủ hơn

- `packages/vseed/AGENTS.md`
- `apps/website/docs/zh-CN/vseed/development/architecture.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/vseed.md`

