# Nguyên tắc định hình lại dữ liệu

:::định hình lại dữ liệu thông tin
VSeed đề xuất một phương pháp định hình lại kích thước phổ quát nhằm mục đích hạ thấp hơn nữa ngưỡng trực quan hóa dữ liệu.
:::

Định hình lại dữ liệu đề cập đến quá trình chuyển đổi dữ liệu từ dạng có cấu trúc này sang dạng có cấu trúc khác. Cốt lõi nằm ở việc thay đổi cách tổ chức dữ liệu (chẳng hạn như hàng, cột, chỉ mục, phân cấp) để thích ứng với các nhu cầu phân tích hoặc xử lý khác nhau trong khi vẫn duy trì tính toàn vẹn của dữ liệu.


## Định hình lại kích thước
Có các công cụ bằng ngôn ngữ Python và R đã hỗ trợ định hình lại kích thước.
1. Python Pandas cung cấp `pivot`và `melt`để định hình lại dữ liệu
2. R gọn gàng cung cấp `pivot_longer`và `pivot_wider`để định hình lại dữ liệu


## Tăng kích thước và giảm kích thước

Thúc đẩy kích thước và giảm kích thước về mặt tinh thần phù hợp với các ý tưởng của lý thuyết phạm trù (đối tượng, hình thái và đẳng cấu), nhưng chúng không tuân thủ nghiêm ngặt lý thuyết phạm trù trong việc thực hiện.
Điểm nhấn đặc biệt:
1. Khi nâng cấp, thông tin "tên chỉ số" và "giá trị chỉ số" không tồn tại sẽ được tạo ra "bất ngờ"
2. Trong quá trình giảm kích thước, thông tin "tên chỉ số" và "giá trị chỉ số" hiện có trong dữ liệu sẽ bị "xóa"

Nâng cấp thứ nguyên có thể biến đổi hoàn toàn dữ liệu, nhưng tên cột thứ nguyên sẽ có giá trị null nên hỗ trợ điền thông tin bổ sung.
Việc giảm kích thước sẽ làm mất nội dung thông tin, do đó cần phải lưu trữ thêm thông tin chuyển đổi để đạt được chuyển đổi đẳng cấu thực sự, nếu không thông tin chắc chắn sẽ bị mất.

![commonDataReshape](/images/commonDataReshape.png)

## Nhóm tăng cường kích thước và giảm kích thước

Tương tự như tăng cường kích thước thông thường và giảm kích thước thông thường, có những kịch bản tương tự về tăng thông tin hoặc mất thông tin. Ngoài ra, do việc giới thiệu tính năng nhóm nên sẽ có nhiều dữ liệu trống hơn được tạo ra.
Ý nghĩa:
1. Nhóm chỉ số: Dễ dàng tăng kích thước thông qua việc nhóm và xử lý nhanh chóng dữ liệu chi tiết
2. Truy vấn nhiều nhóm: Có thể dễ dàng lấy được nhiều phần dữ liệu chi tiết thông qua nhiều câu lệnh SQL và chúng có thể được hợp nhất thành một phần dữ liệu thông qua việc nhóm và giảm kích thước.

![groupedDataReshape](/images/groupedDataReshape.png)

## Dẫn xuất quy tắc

### Nâng cấp thứ nguyên

![rule](/images/ruleDataReshape.png)

![commonDataReshape2](/images/commonDataReshape2.png)

:::tip
1. Khi nhiều chỉ số được nâng cấp, số lượng chỉ số sẽ trở thành một. Sau khi một chỉ số được nâng cấp, chỉ số vẫn là 1.
2. Nâng cấp chiều đa chiều, nếu có thêm 1 chiều thì 0 chiều cũng sẽ tăng thêm 1
3. 0 thứ nguyên và 1 chỉ số, bạn có thể tăng kích thước nhiều lần để có được bất kỳ số thứ nguyên và 1 chỉ số nào (để một chỉ số cũng có thể vẽ biểu đồ)

:::

### Giảm kích thước

![rule](/images/ruleDataReshape2.png)

![groupedDataReshape2](/images/groupedDataReshape2.png)

:::tip
1. Giảm kích thước đa chỉ số, giá trị thứ nguyên và chỉ số sẽ là tích Descartes để trở thành chỉ số mới
2. Giảm đa chiều, giá trị đa chiều sẽ là tích Descartes trở thành một chiều mới

:::


## Ví dụ

#### 0 chiều 1 chỉ số
![0d1m](/images/0d1m.png)
#### 0 chiều 3 chỉ số
![0d3m](/images/0d3m.png)
####chỉ số 1 chiều 1
![1d1m](/images/1d1m.png)
####chỉ số 1 chiều 2
![1d2m](/images/1d2m.png)
####chỉ số 2 chiều 1
![2d1m](/images/2d1m.png)
#### 2 chiều 2 chỉ số
![2d2m](/images/2d2m.png)
