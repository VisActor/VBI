#dsldesign

:::thông tin ý nghĩa

VSeed là một DSL khai báo

- Thiết kế DSL là nghệ thuật thể hiện các vấn đề về miền và có thể đơn giản hóa các vấn đề phức tạp một cách hiệu quả.
- DSL làm cho việc viết mã trở nên tự nhiên như viết bằng ngôn ngữ mẹ đẻ của một người. Khi bạn đã quen với VSeed, việc hiển thị biểu đồ cũng dễ dàng như viết ngôn ngữ tự nhiên.
- Tương tự với `VChart`, `VTable`


:::

:::tip

`DSL khai báo`Tập trung vào "Cái gì". Mô tả kết quả mong muốn hoặc trạng thái cuối cùng sẽ trông như thế nào mà không cần quan tâm đến các bước cụ thể trong máy tính để đạt được trạng thái đó.


`DSL mệnh lệnh`Theo dõi "Làm thế nào". Cung cấp một loạt hướng dẫn rõ ràng, từng bước để cho máy tính biết cách đạt được trạng thái mục tiêu theo từng bước.
:::

## Đánh đổi VSeed

1. Tập trung

Hy sinh tính tổng quát nhất định và tập trung giải quyết các vấn đề trong lĩnh vực cụ thể. Vì vậy, mục tiêu cốt lõi của VSeed không phải là đáp ứng sâu sắc mọi nhu cầu của một loại biểu đồ mà tập trung vào việc chuyển đổi dữ liệu trước loại biểu đồ. Các tính năng còn lại như chủ đề, tương tác, hoạt ảnh, v.v. đều có sẵn.

2. Mức độ trừu tượng

`VSeed`Cung cấp mức độ trừu tượng cao hơn, cho phép người dùng tập trung vào giải quyết vấn đề thay vì chú ý đến các chi tiết triển khai cơ bản. Điều này cải thiện hiệu quả phát triển. Ví dụ: để chuyển đổi loại biểu đồ, chỉ cần thay đổi một tham số mà không cần chú ý đến chi tiết cách chuyển đổi.

3. Hạn chế là lợi thế

`VSeed`nhấn mạnh các ràng buộc, nhận `VSeed DSL`và xuất ra `VTable`hoặc `spec`của `VChart`, cho phép người dùng kiểm soát linh hoạt hơn các chức năng của một biểu đồ, `VSeed`không phải là hộp đen.

Do đó, VSeed có thể được coi đơn giản là `Spec Builder`mà không phá hủy các chức năng ban đầu của `VTable`hoặc `VChart`. Bất kỳ người dùng `VChart`, `VTable`nào cũng có thể truy cập nhanh chóng `VSeed`trong nền tảng hiện có.