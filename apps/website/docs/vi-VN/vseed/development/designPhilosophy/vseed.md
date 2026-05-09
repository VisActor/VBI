# VSeed

:::thông tin Tóm tắt một câu
Nó chấp nhận nhu cầu linh hoạt của doanh nghiệp trở lên, hạn chế hình thức truy cập dữ liệu xuống dưới, tổ chức dữ liệu theo cách thống nhất và đơn giản hóa sự phức tạp.
:::

##VSeed là gì?

`VSeed`là một công cụ trực quan để phân tích dữ liệu. Nó tập trung vào việc cung cấp khả năng chuyển đổi dữ liệu có tính nhất quán cao giữa các loại biểu đồ khác nhau. Nó cũng cung cấp một số chức năng có thể dùng ngay để đáp ứng nhu cầu phân tích dữ liệu nhẹ.

## Ưu điểm của VSeed là gì?

> Trước hết, nó thực sự dễ sử dụng. Thứ hai, nó thực sự linh hoạt. Cuối cùng, có rất nhiều gói trong VSeed. Bạn cần hiểu cách VSeed thực hiện việc định hình lại dữ liệu để có thể áp dụng nó một cách hoàn hảo.

1. Cách chuyển đổi biểu đồ trực quan nhất [Demo](/vseed/guide/intro/chartTypeSwitch)
2. Biểu đồ phối cảnh dễ sử dụng nhất [Demo](/vseed/guide/intro/pivotAndCombine)
3. Khả năng định hình lại dữ liệu mạnh mẽ, không cần xử lý dữ liệu, bất kỳ số thứ nguyên, chỉ số và bất kỳ loại biểu đồ nào đều có thể được xuất ra [Demo](/vseed/guide/intro/dataReshape)
4. `VSeed`hoàn toàn có thể tuần tự hóa và do đó hỗ trợ truyền đa nền tảng `VSeed DSL`[Demo](/vseed/guide/intro/crossPlatformRender)
5. Sẵn sàng để sử dụng ngay: chẳng hạn như định dạng số, quốc tế hóa, chủ đề sáng và tối, kiểu phổ biến, v.v. [Demo](/vseed/guide/intro/internationalization)
6. Hiệu suất xử lý dữ liệu tuyệt vời, hỗ trợ xử lý dữ liệu ở đầu `Node`và hiển thị ở đầu `Web`[Demo](/vseed/guide/intro/separateBuild)

## Nhược điểm của VSeed là gì?

1. `VSeed`không chịu trách nhiệm đánh bóng từng chi tiết của một biểu đồ. Những nhu cầu như vậy sẽ được cung cấp bởi `VChart`và `VTable`. `VSeed`chỉ cung cấp khả năng sửa đổi linh hoạt `spec`. Người dùng có thể linh hoạt sửa đổi từng chi tiết của biểu đồ theo nhu cầu riêng.
2. Chỉ những tập dữ liệu đáp ứng các thông số kỹ thuật của `tidyData`mới có thể được hiển thị bằng `VSeed`. Các tập dữ liệu không chuẩn không được chấp nhận bởi `VSeed`.
3. Dựa trên cấu trúc sinh thái của `VisActor`, người dùng cần hiểu các khái niệm cơ bản về `VChart`và `VTable`

## Nguyên tắc của VSeed là gì?

1. `VSeed`phải hỗ trợ tuần tự hóa
2. `VSeed`Không cần cung cấp quá nhiều khả năng cài đặt kiểu mà nên tập trung vào việc xử lý mối quan hệ giữa biểu đồ và dữ liệu.
3. `VSeed`phải gói gọn các hàm phổ biến thường được sử dụng trong trường phân tích, chẳng hạn như định dạng số, quốc tế hóa, chủ đề, kiểu phổ biến và các hàm phổ biến để chúng có thể được sử dụng ngay lập tức.
4. Người dùng nên tùy chỉnh nhu cầu tùy chỉnh linh hoạt hơn. Do đó, VSeed chỉ cung cấp Spec Builder để xây dựng các thông số kỹ thuật của VChart và VTable.
   - Người dùng có thể điều khiển linh hoạt VChart Instance và VTable Instance.
   - Người dùng có thể linh hoạt sửa đổi các thông số của VChart và VTable theo nhu cầu riêng.


##Tại sao lại thiết kế VSeed?

1. `VChart`không bao giờ có thể được chuyển đổi liền mạch sang `VTable`và ngược lại. Đối mặt với nhu cầu như vậy, sự đóng gói trừu tượng ở mức cao hơn chắc chắn sẽ xuất hiện.
2. Người dùng sử dụng `VChart`và `VTable`phải tự xử lý dữ liệu. Công việc này sẽ được lặp đi lặp lại hàng trăm, hàng nghìn lần một cách vô tình. `VSeed`muốn giảm độ phức tạp của việc xử lý dữ liệu trong các tình huống thông thường và giảm bớt công việc lặp đi lặp lại.
3. Ngưỡng sử dụng `VChart`và `VTable`có thể được hạ xuống ở một mức độ nhất định, ví dụ: sử dụng `VTable`để hiển thị `PivotChart`.
4. `VSeed`cuối cùng có thể phát triển thành mô-đun phụ của `HeadlessBI`, được sử dụng để tạo các công cụ phân tích dữ liệu chung.