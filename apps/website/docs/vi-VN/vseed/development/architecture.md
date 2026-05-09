#thiết kế kiến trúc

VSeed là trình tạo biểu đồ dựa trên cấu hình ngữ nghĩa, được thiết kế để kết nối ý định của người dùng và công cụ hiển thị cơ bản (VChart/VTable).

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed) 

## Khái niệm cốt lõi

### 1. Kiến trúc đường ống
VSeed áp dụng chế độ đường ống để dần dần xây dựng biểu đồ Spec. Toàn bộ quá trình được chia thành hai giai đoạn chính:

- **AdvancedPipeline**: 
  - Đầu vào: đối tượng `VSeed`ban đầu.
  - Trách nhiệm: Định hình lại dữ liệu, áp dụng chủ đề, suy ra cấu hình mặc định.
- Đầu ra: `AdvancedVSeed`(mẫu trung gian).
  
- **SpecPipeline**:
  - Đầu vào: `AdvancedVSeed`.
  - Trách nhiệm: Chuyển đổi các mẫu trung gian thành các mục cấu hình VChart/VTable cụ thể.
  - Đầu ra: Thông số có thể hiển thị cuối cùng.

### 2. Chế độ xây dựng
Lớp `VSeedBuilder`là điều phối viên cốt lõi, chịu trách nhiệm quản lý Ngữ cảnh, đăng ký phần bổ trợ và thực thi quy trình.

### 3. Tiện ích mở rộng Plug-in (Extensibility)
Các khả năng cốt lõi của VSeed (chẳng hạn như các loại biểu đồ được hỗ trợ) hoàn toàn được triển khai thông qua cơ chế đăng ký plug-in.
- **Đăng ký loại biểu đồ**: Mỗi loại biểu đồ (chẳng hạn như `bar`, `line`) là một plugin đăng ký.
- **Đăng ký chủ đề**: Hỗ trợ đăng ký các chủ đề tùy chỉnh.

 