#thiết kế đường ống

:::info Why Pipeline?
1. Lựa chọn tiền bối trong đội
2. Ưu điểm của Pipeline là cho phép `VSeed`kiểm soát độc lập quá trình thực hiện của từng loại biểu đồ. Thông qua thiết kế tốt, việc triển khai từng loại biểu đồ có thể được tách riêng và tái sử dụng một phần. Mỗi loại biểu đồ có thể có quyền kiểm soát hoàn hảo đối với mọi chi tiết. Đây là những gì Pipeline mang lại và là điều `VSeed`cần nhất.
3. So sánh, những thiếu sót của chế độ Đường ống có thể tránh được trong quá trình thiết kế. Chỉ cần bạn giảm kích thước của một `Pipe`và giảm sự phụ thuộc giữa `Pipe`khi thiết kế `Pipe`, bạn có thể tránh được những thiếu sót do chế độ này gây ra.
4. Sau bốn thế hệ thiết kế và tối ưu hóa Đường ống, VSeed đã có phiên bản thứ năm và những cạm bẫy cần khắc phục đã được khắc phục.

:::

## Đường ống là gì?

Pipeline là một phương pháp thực hành kỹ thuật và trừu tượng hóa mạnh mẽ nhằm mục đích phân tách một nhiệm vụ phức tạp thành một loạt các bước nhỏ hơn được kết nối và thực hiện theo trình tự. Khái niệm thiết kế và cách triển khai của nó bị ảnh hưởng sâu sắc bởi những ý tưởng cốt lõi của Lập trình chức năng (FP).

###Ưu điểm của Pipeline:
- Mô-đun hóa: Triển khai nguyên tử, các mô-đun thu được bằng cách kết hợp các nguyên tử
- Tự động hóa: Chỉ cần xác định đầu vào là bạn có thể tự động lấy đầu ra mà không cần chú ý đến việc triển khai nội bộ.
- Hàm thuần túy: Chỉ định đầu vào và bạn sẽ nhận được đầu ra như mong đợi, đây là đặc điểm của hàm thuần túy.
- Song song: Hỗ trợ đồng thời một cách tự nhiên.
- Khả năng tái sử dụng: Mọi module đều có thể được tái sử dụng.
- Khả năng kiểm thử: Về lý thuyết, mỗi module độc lập và có thể được kiểm thử riêng lẻ để đảm bảo chất lượng.
- Truy xuất nguồn gốc: Đầu vào và đầu ra của từng công đoạn đều rõ ràng, giúp dễ dàng xác định vấn đề và theo dõi tình trạng quá trình.
- Khả năng lưu vào bộ nhớ đệm: Về lý thuyết, đầu ra của một `Pipe`có thể được lưu vào bộ nhớ đệm riêng biệt, do đó có thể tránh được các phép tính lặp lại và cải thiện hiệu quả.

### Nhược điểm của Pipeline:
- Phụ thuộc tuần tự: Khi có sự phụ thuộc tuần tự giữa các Pipes sẽ làm tăng chi phí hiểu biết, vì bạn cần hiểu các giai đoạn trước thì mới có thể hiểu được các giai đoạn sau. Cần có sự hiểu biết sâu sắc hơn về quy trình tổng thể để nhanh chóng xác định được vấn đề.
- Chi phí debug: Do Pipeline được thực thi tuần tự nên một khi một giai đoạn nào đó bị lỗi thì toàn bộ Pipeline sẽ bị lỗi. Điều này làm cho việc gỡ lỗi trở nên khó khăn vì bạn cần xác định giai đoạn bị lỗi và sửa nó.
- Vấn đề về hiệu suất: Do Pipeline được thực thi tuần tự nên đầu ra của từng giai đoạn cần đợi hoàn thành giai đoạn trước, điều này có thể gây ra vấn đề về hiệu suất. Đặc biệt khi thời gian thực hiện của một giai đoạn nào đó kéo dài sẽ ảnh hưởng đến hiệu quả thực hiện của toàn bộ Pipeline.
- Lập trình chức năng: Để hiểu một khái niệm mới cần phải có một chi phí học tập nhất định. Vì vậy, các nguyên tắc thiết kế và chi tiết thực hiện cần phải được ghi trong hướng dẫn đóng góp để các nhà phát triển khác hiểu và sử dụng nó, đồng thời bù đắp những nhược điểm.

## Làm cách nào để viết Pipeline trong VSeed?

###Chế độ kết hợp ống

Nhiều Ống chức năng có thể được kết hợp thành một Ống chức năng lớn hơn hoặc thành một Đường ống phức tạp hơn.

Trong VSeed, một Đường ống hoàn chỉnh tương ứng với việc triển khai loại biểu đồ; bằng cách mô tả mối quan hệ kết hợp của các Ống, có thể tạo ra các loại biểu đồ khác nhau. Trong giai đoạn kết hợp Pipeline, không cần chú ý đến việc thực hiện cụ thể từng pipe.


#### Sự khác biệt khi kết hợp

Ví dụ:

Biểu đồ đường và biểu đồ vùng có một số lượng lớn các hàm có thể được sử dụng lại, chẳng hạn như nhãn, chú giải, trục tọa độ, v.v., nhưng biểu đồ đường không có kiểu thành phần bề mặt, do đó, đường ống giải quyết những khác biệt trên bằng cách kết hợp hàm Pipe, không có bất kỳ câu lệnh if nào trong toàn bộ quá trình.

```ts
const lineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const areaChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,

  // 仅面积图有面图元样式
  areaStyle,
]
```


### Mẫu bộ chuyển đổi ống

Ngoài chế độ kết hợp, việc xây dựng Pipe thường có những điều kiện nhất định. Để đáp ứng sự kết hợp của Pipe trong các điều kiện khác nhau, VSeed sử dụng một số lượng lớn Pipe adapter.

#### Điều kiện kết hợp

Ví dụ:

Biểu đồ đường có chức năng phối cảnh. Khi không có phối cảnh, nó sẽ được VChart hiển thị và thông số VChart được xuất ra. Khi có phối cảnh, nó được VTable hiển thị và thông số VTable được xuất ra.

Biểu đồ đường phối cảnh về cơ bản cần sử dụng lại các chức năng cơ bản của biểu đồ đường, chẳng hạn như nhãn, chú giải, trục tọa độ, v.v. Do đó, cần phải điều chỉnh Biểu đồ ống của biểu đồ đường thành Biểu đồ ống của biểu đồ đường phối cảnh thông qua chế độ bộ chuyển đổi.

```ts
const pivotLineChartPipeline = [
  initPivotChart,
  pivotIndicators([
    label,
    xAxis,
    yAxis,
    lineStyle,
    pointStyle,
  ]),
  pivotChartLegend,
] 

const commonLineChartPipeline = [
  label,
  legend,
  xAxis,
  yAxis,
  lineStyle,
  pointStyle,
]

const lineChartPipeline = [
  pivotAdapter(commonLineChartPipeline, pivotLineChartPipeline)
]
```

Tóm lại, mỗi bộ chuyển đổi là một if else, có thể trừu tượng hóa các điều kiện ẩn trong quy trình thành một bộ chuyển đổi, do đó, if else được đặt ở cấp cao nhất, từ đó thu được một Quy trình có các mối phụ thuộc rõ ràng hơn và giảm chi phí bảo trì.

### Đơn vị cơ bản nhất của Pipeline: Function Pipe

VSeed hy vọng rằng tất cả các loại biểu đồ sẽ sử dụng các chức năng như đơn vị cơ bản nhất để cung cấp đủ khả năng tái sử dụng và mở rộng; xây dựng một đường dẫn loại biểu đồ từ dưới lên; mỗi Ống chức năng phải là một mô-đun độc lập, có thể kiểm tra và tái sử dụng;

Điều quan trọng nhất là các Pipe khác nhau phải được trừu tượng hóa dựa trên sự khác biệt về chức năng (nghĩa là viết ít hơn nếu khác) thay vì viết một Pipe lớn và toàn diện.

#### Ống chức năng phẳng

Ví dụ:

Biểu đồ thanh, biểu đồ cột, biểu đồ đường, biểu đồ vùng và biểu đồ phân tán đều có trục X và trục Y. Chúng giống nhau nhưng hơi khác nhau. Nếu bạn viết một ống trục lớn và toàn diện, nó có thể trông như thế này

```ts
const lineChartPipeline = [
  axes
]
const barChartPipeline = [
  axes
]
const areaChartPipeline = [
  axes
]
const scatterChartPipeline = [
  axes
]
const axes = (spec, context) => {
  if (isLine || isArea || isColumn){
    // 折线图、面积图、柱状图有一个离散的轴, 一个连续的轴
    return xy(spec, context) 
  }
  if (isScatter){
    // 散点图有2个连续的轴
    return yy(spec, context) 
  }
  if (isBar){
    // 条形图有一个离散的轴, 一个连续的轴, 但与折线图、面积图、柱状图的轴方向不同
    return yx(spec, context) 
  }
}

const xy = (spec, context) => {
  linearAxis(spec, context, {orient: 'left'})
  bandAxis(spec, context, {orient: 'bottom'})
}

const yx = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  bandAxis(spec, context, {orient: 'left'})
}

const yy = (spec, context) => {
  linearAxis(spec, context, {orient: 'bottom'})
  linearAxis(spec, context, {orient: 'left'})
}
```

Logic trên được triển khai trong Ống chức năng để chọn các ống chức năng phụ khác nhau tùy theo loại biểu đồ. Vấn đề gây ra là:
1. Làm cách nào để sử dụng lại các hàm lặp lại trong xy, yx và yy? Một số lượng lớn các chức năng phụ tương tự nhưng khác nhau cần được gọi lặp đi lặp lại trong các đường dẫn chức năng phụ khác nhau. Sự phụ thuộc có thể dễ dàng trở nên phức tạp, dẫn đến tăng chi phí bảo trì.
2. Khi sửa đổi chức năng của biểu đồ đường và biểu đồ vùng, rất dễ bỏ sót biểu đồ thanh vì logic đã phân nhánh nên phải xem xét sự khác biệt khi thực hiện các chức năng mới.

Khi quy mô của toàn bộ đường ống thông số kỹ thuật mở rộng lên hàng trăm đường ống, việc viết logic như thế này sẽ mang lại chi phí bảo trì rất cao. Vì vậy, chúng ta cần một cách đơn giản hơn để chọn các ống chức năng phụ khác nhau dựa trên loại biểu đồ.

Tiếp tục ví dụ trên, trừu tượng hóa sự khác biệt thành các Ống khác nhau, gói gọn sự khác biệt trong các hàm chi tiết hơn và cuối cùng kết hợp chúng trực tiếp trong đường ống có thể tránh được các vấn đề trên.

```ts
const lineChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const barChartPipeline = [
  yBandAxis,
  xLinearAxis,
]
const areaChartPipeline = [
  xBandAxis,
  yLinearAxis,
]
const scatterChartPipeline = [
  xLinearAxis,
  yLinearAxis,
]

const xBandAxis = (spec, context) => {
}
const yBandAxis = (spec, context) => {
}
const xLinearAxis = (spec, context) => {
}
const yLinearAxis = (spec, context) => {
}
```

Trong ví dụ trên, ống trục không được triển khai nhưng bốn ống xBandAxis, yBandAxis, xLinearAxis và yLinearAxis được kết hợp trực tiếp. Điều này tránh được vấn đề lựa chọn các ống chức năng phụ khác nhau theo loại biểu đồ trong ống trục, từ đó tránh đưa ra các phán đoán khác nhau dựa trên loại biểu đồ, từ đó giảm việc sử dụng if else.

Do đó, nhánh phân nhánh của các loại biểu đồ phải nằm trên Đường ống. Trừ khi thực sự cần thiết, không cần phải chọn các ống chức năng phụ khác nhau theo loại biểu đồ trong Đường ống.

Sự kết hợp này phù hợp với triết lý thiết kế của VSeed, đó là sử dụng kết hợp các Pipe chức năng phẳng hơn thay vì sử dụng phán đoán có điều kiện if else để tạo ra một Pipe chức năng lớn và toàn diện.


