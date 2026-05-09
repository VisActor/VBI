# TidyData

:::thông tin ý nghĩa
TidyData giảm đáng kể độ phức tạp của việc làm sạch dữ liệu thông qua nguyên tắc cốt lõi "biến là cột và quan sát là hàng", cho phép chúng ta tập trung hơn vào các vấn đề kinh doanh hơn là chuyển đổi định dạng dữ liệu.
:::

## Giấy

Tác giả của bài báo `Hadley Wickham`, bài viết thảo luận về một module nhỏ trong xử lý dữ liệu, sắp xếp dữ liệu, vì các tập dữ liệu gọn gàng dễ vận hành, mô hình hóa và trực quan hóa, đồng thời có cấu trúc cụ thể.

Bài viết này rất nên đọc, vui lòng kiểm tra: [Dữ liệu gọn gàng](https://www.jstatsoft.org/article/view/v059i10)


## Ứng dụng TidyData trong VSeed

Cấu hình `dataset`trong VSeed DSL là tập dữ liệu ở định dạng `TidyData`.

Các tính năng cốt lõi như sau:
1. Một cột cho mỗi biến: Các giá trị của biến được lưu trữ trong các cột riêng biệt, chẳng hạn như "tuổi" và "giới tính".
2. Một hàng cho mỗi quan sát: Tất cả các giá trị biến của từng đối tượng quan sát tạo thành một hàng, chẳng hạn như thông tin về tuổi và giới tính của một người.
3. Một bảng cho mỗi đơn vị quan sát: Các loại đơn vị quan sát khác nhau (chẳng hạn như người, thời gian, địa điểm) phải được lưu trữ riêng.


Do đó, kết quả của truy vấn `SQL`có thể được chuyển trực tiếp vào cấu hình `dataset`của `VSeed`và có thể được phân tích và hiển thị nhanh chóng mà không cần xử lý dữ liệu bổ sung.