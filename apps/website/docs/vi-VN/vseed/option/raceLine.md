# RaceLine

:::note{title="Mô tả"}
Biểu đồ đường động (Biểu đồ đường đua)

Thích hợp để hiển thị xu hướng thay đổi dữ liệu theo thời gian, kết nối các điểm dữ liệu qua các đoạn đường để tạo thành đường xu hướng

Các tình huống áp dụng:

\-Hiển thị xu hướng trong nhiều chuỗi dữ liệu theo thời gian

\- So sánh mô hình tăng trưởng hoặc suy giảm của các danh mục khác nhau

\-Quan sát sự biến động của dữ liệu theo chiều thời gian

:::

:::note{title="Note"}
Biểu đồ đường động:

\-trục X thường là trục thời gian hoặc trục danh mục, hiển thị các giá trị thứ nguyên

\-trục Y là trục số, hiển thị các giá trị chỉ số

\-Hỗ trợ kiểm soát kích thước thời gian thông qua trình phát và hiển thị động quá trình mở rộng của đa tuyến

:::


## chartType

**Type:** `"raceLine"`

:::note{title="Mô tả"}
Biểu đồ đường động, phù hợp để thể hiện xu hướng thay đổi dữ liệu theo thời gian

:::


## dataset

**Type:** `Record[]`

:::note{title="Mô tả"}
nguồn dữ liệu

:::


## dimensions

**Type:** `ColumnDimension[] | undefined`

:::note{title="Mô tả"}
Kích thước

:::


### id

**Type:** `string`

:::note{title="Mô tả"}
Id trường tương ứng với thứ nguyên

:::

### alias

**Type:** `string | undefined`

:::note{title="Mô tả"}
bí danh thứ nguyên

:::

### timeFormat

**Type:** `TimeFormat | undefined`

:::note{title="Mô tả"}
Cấu hình định dạng thời gian thứ nguyên

:::


#### type

**Type:** `"year" | "quarter" | "month" | "week" | "day" | "hour" | "minute" | "second"`

:::note{title="Mô tả"}
Độ chi tiết của thời gian xác định độ chính xác hiển thị ngày

:::

### encoding

**Type:** `"xAxis" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title="Mô tả"}
Các kênh ánh xạ thứ nguyên

\- xAxis: hỗ trợ ánh xạ nhiều chiều sang trục X

\- color: hỗ trợ ánh xạ nhiều chiều tới các kênh màu

\- chi tiết: hỗ trợ ánh xạ nhiều chiều tới các kênh chi tiết

\- chú giải công cụ: Hỗ trợ ánh xạ nhiều thứ nguyên vào các kênh chú giải công cụ

\- label: hỗ trợ ánh xạ nhiều chiều tới các kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới các kênh hàng

\- cột: hỗ trợ ánh xạ nhiều chiều tới các kênh cột

:::


## measures

**Type:** `ColumnMeasure[] | undefined`

:::note{title="Mô tả"}
chỉ số

:::


### id

**Type:** `string`

:::note{title="Mô tả"}
Id chỉ số, không thể lặp lại

:::

### alias

**Type:** `string | undefined`

:::note{title="Mô tả"}
Bí danh chỉ số, cho phép trùng lặp, nếu không điền, bí danh là id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Định dạng số tự động, được bật theo mặc định, có mức ưu tiên cao nhất

Khi autoFormat=true, tất cả cấu hình của numFormat sẽ bị ghi đè

Sau khi bật nó lên, nhãn dữ liệu và thông tin nhắc nhở của biểu đồ sẽ tự động chọn phương thức định dạng phù hợp dựa trên giá trị chỉ số và ngôn ngữ.

Quy tắc định dạng: giá trị thập phân, bật ký hiệu thu gọn, tối thiểu 0 chữ số thập phân, tối đa 2 chữ số thập phân, tự động làm tròn, được triển khai bằng Intl.NumberFormat do trình duyệt cung cấp

Ví dụ:

\- ngôn ngữ là zh\-CN: 749740.264 → 744.500

\- ngôn ngữ là en\-US: 749740.264 → 744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Mô tả"}
Định dạng số của các chỉ số tùy chỉnh sẽ được tự động áp dụng cho nhãn và chú giải công cụ.

Lưu ý: Để sử dụng định dạng tùy chỉnh, bạn phải đặt rõ ràng autoFormat=false, nếu không autoFormat sẽ ghi đè cấu hình này

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Mô tả"}
Loại định dạng số, hỗ trợ giá trị số (thập phân), phần trăm (%), phần nghìn (‰) và ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Mô tả"}
Tỷ lệ định dạng số, không thể bằng 0

:::

**Ví dụ**
```ts
\- 100000 được quy đổi thành 100.000, tỷ lệ:10000, ký hiệu: "vạn"
\- 100000 được quy đổi thành 10K, tỷ lệ:1000, ký hiệu: "K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Mô tả"}
Ký hiệu định dạng số, chẳng hạn như %, ‰

:::

**Ví dụ**
```ts
\- 100000 được quy đổi thành 100.000, tỷ lệ:10000, ký hiệu: "vạn"
\- 100000 được quy đổi thành 10K, tỷ lệ:1000, ký hiệu: "K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Định dạng số phân cách hàng nghìn

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Mô tả"}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Mô tả"}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Mô tả"}
Định dạng số theo vị trí thập phân, sử dụng MinimalFractionDigits và MaximumFractionDigits trong Intl.NumberFormat do trình duyệt cung cấp để định dạng, với mức độ ưu tiên thấp hơn importantDigits

:::

**Ví dụ**
```ts
\- 1234,5678 được chuyển đổi thành 1235, fractalDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển đổi thành 1234.6, fractalDigits:1 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,57, fractalDigits:2 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1230,568, fractalDigits:3 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,5678, fractalDigits:4 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,56780, fractalDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Mô tả"}
Các chữ số hợp lệ để định dạng số, sử dụng MiniSignificantDigits và MaximumSignificantDigits trong Intl.NumberFormat do trình duyệt cung cấp để định dạng, với mức độ ưu tiên cao hơn fractalDigits

:::

**Ví dụ**
```ts
\- 1234.5678 được chuyển đổi thành 1000, Chữ số quan trọng:1
\- 1234.5678 được chuyển đổi thành 1200, Chữ số quan trọng:2
\- 1234.5678 được chuyển đổi thành 1230, Chữ số quan trọng:3
\- 1234.5678 được chuyển đổi thành 1234, Chữ số quan trọng:4
\- 1234.5678 được chuyển đổi thành 1234.6, các chữ số quan trọng:5 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,57, các chữ số quan trọng:6 (làm trònChế độ:halfCeil)
\- 1234.5678 được chuyển đổi thành 1234.568, các chữ số quan trọng:7 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,5678, số có ý nghĩa: 8 (làm trònChế độ:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Mô tả"}
Ưu tiên làm tròn định dạng số, xử lý mức độ ưu tiên làm tròn khi các Chữ số có nghĩa và Chữ số phân số được đặt cùng lúc, sử dụng Intl.NumberFormat do trình duyệt cung cấp để định dạng, các quy tắc giống như làm trònƯu tiên trong Intl.NumberFormat

:::

**Ví dụ**
```ts
\- 1234.5678 được chuyển đổi thành 1230, số có ý nghĩa:3 (làm trònƯu tiên:ít chính xác)
\- 1234,5678 được chuyển đổi thành 1234,5678, Chữ số quan trọng:3 (làm trònƯu tiên:chính xác hơn)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Mô tả"}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat do trình duyệt cung cấp để định dạng, các quy tắc giống như roundingMode trong Intl.NumberFormat

:::

### format

**Type:** `NumFormat | undefined`


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Mô tả"}
Loại định dạng số, hỗ trợ giá trị số (thập phân), phần trăm (%), phần nghìn (‰) và ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Mô tả"}
Tỷ lệ định dạng số, không thể bằng 0

:::

**Ví dụ**
```ts
\- 100000 được quy đổi thành 100.000, tỷ lệ:10000, ký hiệu: "vạn"
\- 100000 được quy đổi thành 10K, tỷ lệ:1000, ký hiệu: "K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Mô tả"}
Ký hiệu định dạng số, chẳng hạn như %, ‰

:::

**Ví dụ**
```ts
\- 100000 được quy đổi thành 100.000, tỷ lệ:10000, ký hiệu: "vạn"
\- 100000 được quy đổi thành 10K, tỷ lệ:1000, ký hiệu: "K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Định dạng số phân cách hàng nghìn

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Mô tả"}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Mô tả"}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Mô tả"}
Định dạng số theo vị trí thập phân, sử dụng MinimalFractionDigits và MaximumFractionDigits trong Intl.NumberFormat do trình duyệt cung cấp để định dạng, với mức độ ưu tiên thấp hơn importantDigits

:::

**Ví dụ**
```ts
\- 1234,5678 được chuyển đổi thành 1235, fractalDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển đổi thành 1234.6, fractalDigits:1 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,57, fractalDigits:2 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1230,568, fractalDigits:3 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,5678, fractalDigits:4 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,56780, fractalDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Mô tả"}
Các chữ số hợp lệ để định dạng số, sử dụng MiniSignificantDigits và MaximumSignificantDigits trong Intl.NumberFormat do trình duyệt cung cấp để định dạng, với mức độ ưu tiên cao hơn fractalDigits

:::

**Ví dụ**
```ts
\- 1234.5678 được chuyển đổi thành 1000, Chữ số quan trọng:1
\- 1234.5678 được chuyển đổi thành 1200, Chữ số quan trọng:2
\- 1234.5678 được chuyển đổi thành 1230, Chữ số quan trọng:3
\- 1234.5678 được chuyển đổi thành 1234, Chữ số quan trọng:4
\- 1234.5678 được chuyển đổi thành 1234.6, các chữ số quan trọng:5 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,57, các chữ số quan trọng:6 (làm trònChế độ:halfCeil)
\- 1234.5678 được chuyển đổi thành 1234.568, các chữ số quan trọng:7 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,5678, số có ý nghĩa: 8 (làm trònChế độ:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Mô tả"}
Ưu tiên làm tròn định dạng số, xử lý mức độ ưu tiên làm tròn khi các Chữ số có nghĩa và Chữ số phân số được đặt cùng lúc, sử dụng Intl.NumberFormat do trình duyệt cung cấp để định dạng, các quy tắc giống như làm trònƯu tiên trong Intl.NumberFormat

:::

**Ví dụ**
```ts
\- 1234.5678 được chuyển đổi thành 1230, số có ý nghĩa:3 (làm trònƯu tiên:ít chính xác)
\- 1234,5678 được chuyển đổi thành 1234,5678, Chữ số quan trọng:3 (làm trònƯu tiên:chính xác hơn)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Mô tả"}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat do trình duyệt cung cấp để định dạng, các quy tắc giống như roundingMode trong Intl.NumberFormat

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "yAxis" | undefined`

:::note{title="Mô tả"}
Kênh ánh xạ chỉ số

\- yAxis: trục Y của ánh xạ chỉ số

\- chi tiết: chi tiết về ánh xạ chỉ số

\- color: màu của ánh xạ chỉ số

\- label: nhãn của ánh xạ chỉ số

\- chú giải công cụ: Mẹo lập bản đồ chỉ số

:::

### parentId

**Type:** `string | undefined`

:::note{title="Mô tả"}
Xây dựng nhóm chỉ số hình cây dưới dạng cấu hình chỉ số phẳng. parentId trỏ đến id của nhóm chỉ số gốc, được sử dụng để xây dựng cây chỉ số.

:::

:::tip{title="Tip"}
Có hai cách để cấu hình cây chỉ số. Cách đầu tiên là cấu hình trực tiếp cây chỉ số với trẻ em. Cách thứ hai là định cấu hình danh sách chỉ số phẳng của parentId. Hai cách không thể được cấu hình cùng một lúc.

:::


## page

**Type:** `Page | undefined`

:::note{title="Mô tả"}
Cấu hình phân trang

:::


### field

**Type:** `string`

:::note{title="Mô tả"}
Trường phân trang, được sử dụng để chỉ định tên trường cho phân trang, phải là thứ nguyên

:::

### currentValue

**Type:** `string`

:::note{title="Mô tả"}
Giá trị phân trang hiện tại, được sử dụng để chỉ định giá trị cơ bản của phân trang hiện tại

:::

**Ví dụ**
```ts
'2023\-01\-01'




```
## player

**Type:** `Player | undefined`

:::note{title="Mô tả"}
Cấu hình trình phát, được sử dụng để chỉ định thứ nguyên thời gian, cấu hình cốt lõi của biểu đồ đường động



Cấu hình trình phát, được sử dụng để chỉ định tên trường để phát lại, phải là thứ nguyên

:::

:::warning{title="Warning"}
Hàm này không hỗ trợ các loại biểu đồ như bảng, PivotTable, DualAxis, biểu đồ, boxPlot, v.v. và không hỗ trợ sử dụng khi bật kết hợp chỉ số hoặc phối cảnh hàng-cột.

:::


### maxCount

**Type:** `number | false | undefined`

:::note{title="Mô tả"}
Số lượt chơi tối đa. Dữ liệu vượt quá con số này sẽ bị cắt bớt. Đặt thành false để biểu thị không có giới hạn.

:::

### interval

**Type:** `number | undefined`

:::note{title="Mô tả"}
Khoảng thời gian phát lại, đơn vị ms

:::

### autoPlay

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có chơi tự động không

:::

### loop

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có lặp lại hay không

:::

### position

**Type:** `"left" | "top" | "right" | "bottom" | undefined`

:::note{title="Mô tả"}
vị trí cầu thủ

:::

### railColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu theo dõi thanh tiến trình của người chơi

:::

### fontFamily

**Type:** `string | undefined`

:::note{title="Mô tả"}
Phông chữ văn bản của người chơi

:::

### fontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước phông chữ văn bản trình phát

:::

### trackColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu tiến trình của thanh tiến trình của người chơi

:::

### sliderHandleColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu thanh trượt thanh tiến trình của người chơi

:::

### sliderHandleBorderColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu đường viền thanh trượt thanh tiến trình của người chơi

:::

### startButtonColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nút bắt đầu của trình phát

:::

### pauseButtonColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nút tạm dừng trình phát

:::

### backwardButtonColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nút quay lại của trình phát

:::

### forwardButtonColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nút chuyển tiếp của trình phát

:::


## backgroundColor

**Type:** `BackgroundColor`

:::note{title="Mô tả"}
màu nền

:::


## color

**Type:** `Color | undefined`

:::note{title="Mô tả"}
Cấu hình màu

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title="Mô tả"}
Cách phối màu rời rạc, cách phối màu được sử dụng để xác định màu sắc của các phần tử khác nhau trong biểu đồ

:::

**Ví dụ**
```ts
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



```
### linearColorScheme

**Type:** `string[] | undefined`

:::note{title="Mô tả"}
Lược đồ màu gradient tuyến tính, lược đồ màu gradient tuyến tính được sử dụng để xác định màu sắc của các phần tử khác nhau trong biểu đồ

:::

**Ví dụ**
```ts
['#FFCDD2, #F8BBD0]



```
### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title="Mô tả"}
Ánh xạ màu, ánh xạ màu được sử dụng để ánh xạ các giá trị dữ liệu thành các màu cụ thể

:::

**Ví dụ**
```ts
{
 'profit': 'red',
 'sales': 'blue',
}



```
### positiveColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Cấu hình màu dương và âm, được sử dụng để xác định màu của giá trị dương trong biểu đồ

:::

### negativeColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Cấu hình màu dương và âm, được sử dụng để xác định màu của giá trị âm trong biểu đồ

:::


## label

**Type:** `Label | undefined`

:::note{title="Mô tả"}
Cấu hình nhãn

:::


### enable

**Type:** `false | true`

:::note{title="Mô tả"}
Chức năng nhãn có được bật không?

:::

### wrap

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Liệu nhãn có kết thúc tốt đẹp hay không

:::

### showValue

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Liệu nhãn có hiển thị giá trị chỉ số hay không

Trong kịch bản nhiều chỉ số, không cần phải lo lắng về các giá trị xung đột của nhiều chỉ số, bởi vì tất cả các chỉ số liên quan đến bản vẽ sẽ được xử lý bởi `foldMeasures`và hợp nhất thành một chỉ số, đại diện cho một điểm dữ liệu, do đó sẽ không có xung đột.

Lưu ý: Nhãn mã hóa có mức độ ưu tiên cao hơn. Cấu hình này không ảnh hưởng đến nhãn mã hóa.

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Liệu nhãn có hiển thị phần trăm của giá trị số liệu hay không

Trong kịch bản nhiều chỉ số, không cần phải lo lắng về các giá trị xung đột của nhiều chỉ số, bởi vì tất cả các chỉ số liên quan đến bản vẽ sẽ được xử lý bởi `foldMeasures`và hợp nhất thành một chỉ số, đại diện cho một điểm dữ liệu, do đó sẽ không có xung đột.

Lưu ý: Nhãn mã hóa có mức độ ưu tiên cao hơn. Cấu hình này không ảnh hưởng đến nhãn mã hóa.

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Liệu nhãn có hiển thị nhãn kích thước hay không

Hiển thị tất cả các nhãn thứ nguyên

Lưu ý: Nhãn mã hóa có mức độ ưu tiên cao hơn. Cấu hình này không ảnh hưởng đến nhãn mã hóa.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Liệu giá trị nhãn có được định dạng tự động hay không. Khi autoFormat đúng, cấu hình numFormat không hợp lệ.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Mô tả"}
Cấu hình định dạng giá trị thẻ sẽ được hợp nhất với `format`trong `measure`và `format`trong `measure`có mức độ ưu tiên cao hơn. numFormat có mức độ ưu tiên thấp hơn autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Mô tả"}
Loại định dạng số, hỗ trợ giá trị số (thập phân), phần trăm (%), phần nghìn (‰) và ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Mô tả"}
Tỷ lệ định dạng số, không thể bằng 0

:::

**Ví dụ**
```ts
\- 100000 được quy đổi thành 100.000, tỷ lệ:10000, ký hiệu: "vạn"
\- 100000 được quy đổi thành 10K, tỷ lệ:1000, ký hiệu: "K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Mô tả"}
Ký hiệu định dạng số, chẳng hạn như %, ‰

:::

**Ví dụ**
```ts
\- 100000 được quy đổi thành 100.000, tỷ lệ:10000, ký hiệu: "vạn"
\- 100000 được quy đổi thành 10K, tỷ lệ:1000, ký hiệu: "K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Định dạng số phân cách hàng nghìn

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Mô tả"}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Mô tả"}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Mô tả"}
Định dạng số theo vị trí thập phân, sử dụng MinimalFractionDigits và MaximumFractionDigits trong Intl.NumberFormat do trình duyệt cung cấp để định dạng, với mức độ ưu tiên thấp hơn importantDigits

:::

**Ví dụ**
```ts
\- 1234,5678 được chuyển đổi thành 1235, fractalDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển đổi thành 1234.6, fractalDigits:1 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,57, fractalDigits:2 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1230,568, fractalDigits:3 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,5678, fractalDigits:4 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,56780, fractalDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Mô tả"}
Các chữ số hợp lệ để định dạng số, sử dụng MiniSignificantDigits và MaximumSignificantDigits trong Intl.NumberFormat do trình duyệt cung cấp để định dạng, với mức độ ưu tiên cao hơn fractalDigits

:::

**Ví dụ**
```ts
\- 1234.5678 được chuyển đổi thành 1000, Chữ số quan trọng:1
\- 1234.5678 được chuyển đổi thành 1200, Chữ số quan trọng:2
\- 1234.5678 được chuyển đổi thành 1230, Chữ số quan trọng:3
\- 1234.5678 được chuyển đổi thành 1234, Chữ số quan trọng:4
\- 1234.5678 được chuyển đổi thành 1234.6, các chữ số quan trọng:5 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,57, các chữ số quan trọng:6 (làm trònChế độ:halfCeil)
\- 1234.5678 được chuyển đổi thành 1234.568, các chữ số quan trọng:7 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,5678, số có ý nghĩa: 8 (làm trònChế độ:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Mô tả"}
Ưu tiên làm tròn định dạng số, xử lý mức độ ưu tiên làm tròn khi các Chữ số có nghĩa và Chữ số phân số được đặt cùng lúc, sử dụng Intl.NumberFormat do trình duyệt cung cấp để định dạng, các quy tắc giống như làm trònƯu tiên trong Intl.NumberFormat

:::

**Ví dụ**
```ts
\- 1234.5678 được chuyển đổi thành 1230, số có ý nghĩa:3 (làm trònƯu tiên:ít chính xác)
\- 1234,5678 được chuyển đổi thành 1234,5678, Chữ số quan trọng:3 (làm trònƯu tiên:chính xác hơn)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Mô tả"}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat do trình duyệt cung cấp để định dạng, các quy tắc giống như roundingMode trong Intl.NumberFormat

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước phông chữ nhãn

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ nhãn

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nền nhãn

:::

### labelStroke

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nét nhãn

:::

### labelColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu phông chữ nhãn

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Liệu nhãn có tự động đảo màu phông chữ theo màu phần tử hay không

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title="Mô tả"}
vị trí nhãn

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Chức năng chống chồng chéo nhãn có được bật không?

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Mô tả"}
Lọc thẻ, mối quan hệ có điều kiện mặc định giữa các bộ chọn là Hoặc

:::


#### field

**Type:** `string`

:::note{title="Mô tả"}
Trường thứ nguyên, id kích thước của một mục nhất định

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="Mô tả"}
Chọn giá trị của trường thứ nguyên trong mục dữ liệu, mảng hỗ trợ

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Mô tả"}
Bộ lọc động (thực thi mã do AI tạo)



Triển khai logic lọc dữ liệu phức tạp thông qua mã JavaScript do AI tạo



Năng lực cốt lõi:

\-Hỗ trợ các điều kiện lọc dữ liệu phức tạp tùy ý

\-Sử dụng các hàm tiện ích có sẵn để thao tác dữ liệu

\- Thực thi an toàn trong môi trường trình duyệt (Web Worker Sandbox)



Yêu cầu về môi trường: Chỉ hỗ trợ môi trường trình duyệt, môi trường Node.js sẽ sử dụng dự phòng



Lưu ý: không thể sử dụng bộ chọn và DynamicFilter cùng lúc, DynamicFilter có mức độ ưu tiên cao hơn



Cấu hình bộ lọc động biểu đồ



Lọc các điểm đánh dấu biểu đồ (thanh, điểm, v.v.) thông qua mã JavaScript do AI tạo

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="Mô tả"}
Mô tả nhu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
```ts
"Đánh dấu các thanh có doanh số lớn hơn 1000"

"Nổi bật các thanh có tỷ suất lợi nhuận cao nhất theo từng khu vực"



```
#### code

**Type:** `string`

:::note{title="Mô tả"}
Mã bộ lọc JavaScript do AI tạo



\-chỉ có thể sử dụng các chức năng tiện ích tích hợp sẵn (được truy cập qua _ hoặc R)

\-Tham số đầu vào: dữ liệu (mảng), mỗi mục chứa trường __row_index cho biết số hàng

\- Phải trả về một mảng gồm các kết hợp chỉ mục hàng và trường: ``Array<{ __row_index: number, field: string }>``

\- __row_index đại diện cho số hàng của mục dữ liệu gốc và trường đại diện cho trường cần được đánh dấu.

\- Bị cấm sử dụng: eval, Hàm, hoạt động không đồng bộ, API DOM, yêu cầu mạng

:::

**Ví dụ**
```ts
Đánh dấu trường bán hàng của các mục dữ liệu có doanh số lớn hơn 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Làm nổi bật các mục dữ liệu có lợi nhất trong từng lĩnh vực
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Đánh dấu các mục dữ liệu được lọc theo nhiều điều kiện
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



```
#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title="Mô tả"}
Hạ cấp giải pháp khi thực thi mã không thành công hoặc môi trường không hỗ trợ giải pháp đó

:::


##### field

**Type:** `string`

:::note{title="Mô tả"}
Trường thứ nguyên, id kích thước của một mục nhất định

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="Mô tả"}
Chọn giá trị của trường thứ nguyên trong mục dữ liệu, mảng hỗ trợ

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="Mô tả"}
Lọc động kết quả thực thi (trường thời gian chạy)



Viết ở giai đoạn chuẩn bị (), chỉ đọc trong thời gian chạy

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`


## legend

**Type:** `Legend | undefined`

:::note{title="Mô tả"}
Cấu hình chú giải

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Chức năng chú giải có được bật không?

:::

**Ví dụ**
```ts
enable: true



```
### border

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Đường viền chú giải có được bật hay không

:::

:::warning{title="Warning"}
Chỉ những truyền thuyết riêng biệt mới có hiệu lực

:::

**Ví dụ**
```ts
border: true



```
### labelColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu chữ chú giải

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu biểu tượng trang

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Biểu tượng phân trang màu xám

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Cỡ chữ chú giải

:::

**Ví dụ**
```ts
labelFontSize: 10



```
### labelFontColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu chữ chú giải

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ chú giải

:::

**Ví dụ**
```ts
labelFontWeight: 400



```
### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title="Mô tả"}
hình dạng chú giải

:::

:::warning{title="Warning"}
Chỉ những truyền thuyết riêng biệt mới có hiệu lực

:::

**Ví dụ**
```ts
shapeType: 'circle'



```
### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="Mô tả"}
vị trí chú giải

:::

**Ví dụ**
```ts
position: 'rightTop'



```
### maxSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Khi có số lượng chú giải lớn, số cột tối đa hoặc số hàng chú giải tối đa

Nếu vị trí nằm ngang (dưới cùng, dưới cùngLeft, dưới cùngRight, bl, br, top, topLeft, topRight, tl, tr), maxSize kiểm soát số lượng cột được hiển thị

Nếu vị trí thẳng đứng (trái, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize kiểm soát số dòng hiển thị

:::

:::warning{title="Warning"}
Chỉ những truyền thuyết riêng biệt mới có hiệu lực

:::

**Ví dụ**
```ts
maxSize: 2




```
## tooltip

**Type:** `Tooltip | undefined`

:::note{title="Mô tả"}
Cấu hình thông tin nhắc nhở

:::


### enable

**Type:** `false | true`

:::note{title="Mô tả"}
Chức năng thông tin nhắc nhở có được bật hay không

:::


## brush

**Type:** `Brush | undefined`

:::note{title="Mô tả"}
Cấu hình lựa chọn khung



Cấu hình lựa chọn khung biểu đồ

:::


### enable

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có bật lựa chọn cọ vẽ hay không

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title="Mô tả"}
loại bàn chải



Xác định hình dạng và hướng của hộp chọn cọ vẽ

\- `rect`: Chọn khung hình chữ nhật, có thể thực hiện chọn khung theo cả 2 hướng trục X và trục Y cùng lúc

\- `polygon`: Lựa chọn đa giác, bấm vào nhiều điểm để vẽ đa giác bất kỳ cần chọn.

\- `x`: Lựa chọn khung theo hướng trục X. Lựa chọn khung chỉ được thực hiện theo hướng trục X. Hướng trục Y không bị giới hạn.

\- `y`: Chọn khung hướng trục Y, chỉ chọn khung theo hướng trục Y, hướng trục X không giới hạn

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title="Mô tả"}
Chế độ chọn hộp, chọn một hoặc nhiều lựa chọn



Xác định chế độ chọn cọ vẽ

\- `single`: Chế độ chọn radio, mỗi lần chỉ được chọn một ô chọn cọ

\- `multiple`: Chế độ đa lựa chọn, nhiều ô lựa chọn có thể tồn tại cùng lúc

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có xóa hộp sau khi chọn hộp hoàn tất hay không

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Mô tả"}
Kiểu dữ liệu được chọn bởi hộp



Xác định kiểu của các điểm dữ liệu được chọn bởi cọ vẽ

:::


#### opacity

**Type:** `number | undefined`

:::note{title="Mô tả"}
độ mờ đục



Độ mờ của các điểm dữ liệu được chọn bởi hộp, phạm vi giá trị là 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu đột quỵ

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng nét

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title="Mô tả"}
Kiểu dữ liệu không được hộp chọn



Xác định kiểu của các điểm dữ liệu không được chọn bởi cọ vẽ

:::


#### opacity

**Type:** `number | undefined`

:::note{title="Mô tả"}
độ mờ đục



Độ mờ của các điểm dữ liệu không được hộp chọn, phạm vi giá trị là 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu đột quỵ

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng nét

:::


## xAxis

**Type:** `XBandAxis | undefined`

:::note{title="Mô tả"}
cấu hình trục X, là trục danh mục và hiển thị các giá trị thứ nguyên

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Trục có nhìn thấy được không?

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Trục có được hiển thị theo hướng ngược lại hay không, chỉ hợp lệ đối với trục số

:::

### zero

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có buộc hiển thị giá trị 0 trên trục tọa độ hay không. Khi đặt cấu hình tối thiểu và tối đa, mục cấu hình này không hợp lệ và chỉ có hiệu lực trên trục giá trị.

:::

### labelAutoHide

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Nhãn trục được tự động ẩn. Nếu hai nhãn trùng nhau (khoảng cách nhỏ hơn autoHideGap), các nhãn chồng chéo sẽ tự động bị ẩn. Chỉ có hiệu lực cho trục danh mục.

:::

### labelAutoHideGap

**Type:** `number | undefined`

:::note{title="Mô tả"}
Nhãn trục, tự động ẩn khoảng cách. Nếu khoảng cách giữa hai nhãn văn bản nhỏ hơn autoHideGap thì các nhãn chồng chéo sẽ tự động bị ẩn. Chỉ có hiệu lực cho trục danh mục.

Khi autoHide được bật, hãy sử dụng autoHide và đặt nó ở autoHideSeparation

Khi tính năng tự động ẩn bị tắt, việc lấy mẫu sẽ được sử dụng và đặt ở mức minGap.

:::

### labelAutoRotate

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Nhãn trục, tự động xoay, khi chiều rộng của nhãn vượt quá chiều dài của trục, nhãn sẽ tự động được xoay. Chỉ có hiệu lực cho trục danh mục.

:::

### labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title="Mô tả"}
Nhãn trục, phạm vi góc quay tự động, khi bật xoay tự động, phạm vi góc quay nhãn. Chỉ có hiệu quả đối với trục danh mục.

:::

### labelAutoLimit

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Nhãn trục tự động giới hạn độ dài. Khi chiều rộng nhãn vượt quá chiều dài trục, phần thừa được biểu thị bằng dấu chấm lửng. Nhãn hiển thị sau khi di chuột và chiều rộng nhãn sẽ tự động bị giới hạn. Chỉ có hiệu lực cho trục danh mục.

:::

### labelAutoLimitLength

**Type:** `number | undefined`

:::note{title="Mô tả"}
Nhãn trục tự động giới hạn độ dài tối đa. Khi độ dài của văn bản nhãn vượt quá độ dài tối đa, phần thừa được biểu thị bằng dấu chấm lửng và nhãn hiển thị sau khi di chuột. Nó chỉ có hiệu lực cho trục danh mục.

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Mô tả"}
Nhãn đánh dấu trục X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Nhãn có nhìn thấy được không?

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nhãn

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước phông chữ nhãn

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ nhãn

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="Mô tả"}
Góc xoay nhãn

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Mô tả"}
trục X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Trục có nhìn thấy được không?

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu trục

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng trục

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Mô tả"}
Thang đo trục X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Cân có thể nhìn thấy được không?

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Cân có hướng vào trong không?

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu sắc tỷ lệ

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước quy mô

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Mô tả"}
Tiêu đề trục X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Tiêu đề có hiển thị không?

:::

#### titleText

**Type:** `string | undefined`

:::note{title="Mô tả"}
Văn bản tiêu đề, mặc định theo cấu hình trường

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu tiêu đề

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Cỡ chữ tiêu đề

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ tiêu đề

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Mô tả"}
Đường lưới trục X

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu đường lưới

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng đường lưới

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="Mô tả"}
Kiểu đường lưới

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Mô tả"}
Cấu hình hoạt ảnh trục X

:::


#### duration

**Type:** `number | undefined`

:::note{title="Mô tả"}
Thời lượng hoạt ảnh

:::

#### easing

**Type:** `string | undefined`

:::note{title="Mô tả"}
chức năng giảm bớt hoạt ảnh

:::


## yAxis

**Type:** `YLinearAxis | undefined`

:::note{title="Mô tả"}
cấu hình trục Y, là trục số và hiển thị các giá trị chỉ số

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Trục có nhìn thấy được không?

:::

### min

**Type:** `number | undefined`

:::note{title="Mô tả"}
Giá trị tối thiểu của trục, với mức độ ưu tiên cao hơn nice và bằng 0

:::

### max

**Type:** `number | boolean | undefined`

:::note{title="Mô tả"}
Giá trị tối đa của trục, có mức độ ưu tiên cao hơn nice và 0. Nếu đúng, giá trị tối đa sẽ được tự động tính toán dựa trên phạm vi dữ liệu.

:::

### log

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có sử dụng trục logarit hay không, chỉ hiệu quả đối với trục số

:::

### logBase

**Type:** `number | undefined`

:::note{title="Mô tả"}
Cơ số của trục logarit, chỉ có giá trị đối với trục số

:::

### nice

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có tự động điều chỉnh khoảng cách tỷ lệ của trục để làm cho nhãn tỷ lệ dễ đọc hơn hay không. Khi tối thiểu và tối đa được định cấu hình, mục cấu hình này không hợp lệ và chỉ có hiệu lực đối với trục giá trị.

:::

### inverse

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Trục có được hiển thị theo hướng ngược lại hay không, chỉ hợp lệ đối với trục số

:::

### zero

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có buộc hiển thị giá trị 0 trên trục tọa độ hay không. Khi đặt cấu hình tối thiểu và tối đa, mục cấu hình này không hợp lệ và chỉ có hiệu lực trên trục giá trị.

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có tự động định dạng nhãn tỷ lệ của trục số hay không. Điều này chỉ có hiệu quả đối với trục số. Khi autoFormat đúng, cấu hình numFormat không hợp lệ.

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title="Mô tả"}
Định dạng số của trục giá trị, chỉ có tác dụng trên trục giá trị và có mức độ ưu tiên thấp hơn autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title="Mô tả"}
Loại định dạng số, hỗ trợ giá trị số (thập phân), phần trăm (%), phần nghìn (‰) và ký hiệu khoa học

:::

#### ratio

**Type:** `number | undefined`

:::note{title="Mô tả"}
Tỷ lệ định dạng số, không thể bằng 0

:::

**Ví dụ**
```ts
\- 100000 được quy đổi thành 100.000, tỷ lệ:10000, ký hiệu: "vạn"
\- 100000 được quy đổi thành 10K, tỷ lệ:1000, ký hiệu: "K"



```
#### symbol

**Type:** `string | undefined`

:::note{title="Mô tả"}
Ký hiệu định dạng số, chẳng hạn như %, ‰

:::

**Ví dụ**
```ts
\- 100000 được quy đổi thành 100.000, tỷ lệ:10000, ký hiệu: "vạn"
\- 100000 được quy đổi thành 10K, tỷ lệ:1000, ký hiệu: "K"



```
#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Định dạng số phân cách hàng nghìn

:::

#### suffix

**Type:** `string | undefined`

:::note{title="Mô tả"}
Hậu tố định dạng số

:::

#### prefix

**Type:** `string | undefined`

:::note{title="Mô tả"}
Tiền tố định dạng số

:::

#### fractionDigits

**Type:** `number | undefined`

:::note{title="Mô tả"}
Định dạng số theo vị trí thập phân, sử dụng MinimalFractionDigits và MaximumFractionDigits trong Intl.NumberFormat do trình duyệt cung cấp để định dạng, với mức độ ưu tiên thấp hơn importantDigits

:::

**Ví dụ**
```ts
\- 1234,5678 được chuyển đổi thành 1235, fractalDigits:0 (roundingMode:halfCeil)
\- 1234.5678 được chuyển đổi thành 1234.6, fractalDigits:1 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,57, fractalDigits:2 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1230,568, fractalDigits:3 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,5678, fractalDigits:4 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,56780, fractalDigits:5 (roundingMode:halfCeil)



```
#### significantDigits

**Type:** `number | undefined`

:::note{title="Mô tả"}
Các chữ số hợp lệ để định dạng số, sử dụng MiniSignificantDigits và MaximumSignificantDigits trong Intl.NumberFormat do trình duyệt cung cấp để định dạng, với mức độ ưu tiên cao hơn fractalDigits

:::

**Ví dụ**
```ts
\- 1234.5678 được chuyển đổi thành 1000, Chữ số quan trọng:1
\- 1234.5678 được chuyển đổi thành 1200, Chữ số quan trọng:2
\- 1234.5678 được chuyển đổi thành 1230, Chữ số quan trọng:3
\- 1234.5678 được chuyển đổi thành 1234, Chữ số quan trọng:4
\- 1234.5678 được chuyển đổi thành 1234.6, các chữ số quan trọng:5 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,57, các chữ số quan trọng:6 (làm trònChế độ:halfCeil)
\- 1234.5678 được chuyển đổi thành 1234.568, các chữ số quan trọng:7 (roundingMode:halfCeil)
\- 1234,5678 được chuyển đổi thành 1234,5678, số có ý nghĩa: 8 (làm trònChế độ:halfCeil)



```
#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title="Mô tả"}
Ưu tiên làm tròn định dạng số, xử lý mức độ ưu tiên làm tròn khi các Chữ số có nghĩa và Chữ số phân số được đặt cùng lúc, sử dụng Intl.NumberFormat do trình duyệt cung cấp để định dạng, các quy tắc giống như làm trònƯu tiên trong Intl.NumberFormat

:::

**Ví dụ**
```ts
\- 1234.5678 được chuyển đổi thành 1230, số có ý nghĩa:3 (làm trònƯu tiên:ít chính xác)
\- 1234,5678 được chuyển đổi thành 1234,5678, Chữ số quan trọng:3 (làm trònƯu tiên:chính xác hơn)



```
#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title="Mô tả"}
Chế độ làm tròn định dạng số, sử dụng Intl.NumberFormat do trình duyệt cung cấp để định dạng, các quy tắc giống như roundingMode trong Intl.NumberFormat

:::

### label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title="Mô tả"}
Nhãn đánh dấu trục X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Nhãn có nhìn thấy được không?

:::

#### labelColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nhãn

:::

#### labelFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước phông chữ nhãn

:::

#### labelFontWeight

**Type:** `number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ nhãn

:::

#### labelAngle

**Type:** `number | undefined`

:::note{title="Mô tả"}
Góc xoay nhãn

:::

### line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title="Mô tả"}
trục X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Trục có nhìn thấy được không?

:::

#### lineColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu trục

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng trục

:::

### tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title="Mô tả"}
Thang đo trục X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Cân có thể nhìn thấy được không?

:::

#### tickInside

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Cân có hướng vào trong không?

:::

#### tickColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu sắc tỷ lệ

:::

#### tickSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước quy mô

:::

### title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title="Mô tả"}
Tiêu đề trục X

:::


#### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Tiêu đề có hiển thị không?

:::

#### titleText

**Type:** `string | undefined`

:::note{title="Mô tả"}
Văn bản tiêu đề, mặc định theo cấu hình trường

:::

#### titleColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu tiêu đề

:::

#### titleFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Cỡ chữ tiêu đề

:::

#### titleFontWeight

**Type:** `number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ tiêu đề

:::

### grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; gridLineDash?: number[]; } | undefined`

:::note{title="Mô tả"}
Đường lưới trục X

:::


#### visible

**Type:** `boolean | undefined`

#### gridColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu đường lưới

:::

#### gridWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng đường lưới

:::

#### gridLineDash

**Type:** `number[] | undefined`

:::note{title="Mô tả"}
Kiểu đường lưới

:::

### animation

**Type:** `{ duration?: number; easing?: string; } | undefined`

:::note{title="Mô tả"}
Cấu hình hoạt ảnh trục Y

:::


#### duration

**Type:** `number | undefined`

:::note{title="Mô tả"}
Thời lượng hoạt ảnh

:::

#### easing

**Type:** `string | undefined`

:::note{title="Mô tả"}
chức năng giảm bớt hoạt ảnh

:::


## crosshairLine

**Type:** `CrosshairLine | undefined`

:::note{title="Mô tả"}
Cấu hình dòng nhắc dọc



Cấu hình đường chữ thập, một loại cấu hình được sử dụng để hiển thị đường chữ thập (đường tip) trong biểu đồ

:::


### visible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có hiển thị đường chữ thập hay không

:::

### lineColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu đường chữ thập

:::

### labelColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nhãn đường chữ thập

:::

### labelVisible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có hiển thị nhãn đường chữ thập hay không

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nền nhãn đường chữ thập

:::


## sort

**Type:** `Sort | undefined`

:::note{title="Mô tả"}
Cấu hình sắp xếp trục X



Cấu hình sắp xếp trục danh mục, hỗ trợ sắp xếp dựa trên thứ nguyên hoặc chỉ số và thứ tự sắp xếp tùy chỉnh

:::

**Ví dụ**
```ts
\- order:'asc'
\- orderBy:'date'
hoặc
\- customOrder:['2019', '2020', '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="Mô tả"}
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'

:::

**Ví dụ**
```ts
order:'asc'



```
### orderBy

**Type:** `string | undefined`

:::note{title="Mô tả"}
Trường sắp xếp phụ thuộc vào có thể là id thứ nguyên hoặc id chỉ số

:::

**Ví dụ**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Type:** `string[] | undefined`

:::note{title="Mô tả"}
Tùy chỉnh thứ tự sắp xếp sẽ được áp dụng trực tiếp cho trục danh mục

:::


## sortLegend

**Type:** `SortLegend | undefined`

:::note{title="Mô tả"}
Cấu hình sắp xếp chú giải



Cấu hình sắp xếp chú giải, hỗ trợ sắp xếp theo thứ nguyên hoặc chỉ số và thứ tự sắp xếp tùy chỉnh; mảng được sắp xếp theo thứ tự từ trái sang phải hoặc từ trên xuống dưới

:::

**Ví dụ**
```ts
\- order:'asc'
\- orderBy:'date'
hoặc
\- customOrder:['2019', '2020', '2021']




```
### order

**Type:** `"asc" | "desc" | undefined`

:::note{title="Mô tả"}
Thứ tự sắp xếp, giá trị tùy chọn là 'asc' hoặc 'desc'

:::

**Ví dụ**
```ts
order:'asc'



```
### orderBy

**Type:** `string | undefined`

:::note{title="Mô tả"}
Trường sắp xếp phụ thuộc vào có thể là id thứ nguyên hoặc id chỉ số

:::

**Ví dụ**
```ts
\- orderBy:'date'
\- orderBy:'profit'



```
### customOrder

**Type:** `string[] | undefined`

:::note{title="Mô tả"}
Tùy chỉnh thứ tự sắp xếp sẽ áp dụng trực tiếp vào chú giải, tăng dần từ trái sang phải hoặc từ trên xuống dưới, giảm dần từ phải sang trái hoặc từ dưới lên trên

:::


## theme

**Type:** `Theme | undefined`

:::note{title="Mô tả"}
Cấu hình chủ đề



chủ đề



Có hai chủ đề tích hợp: ánh sáng và bóng tối. Các chủ đề mới có thể được tùy chỉnh thông qua registerTheme.

:::


### length

**Type:** `number`

### brand

**Type:** `brand`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title="Mô tả"}
Cấu hình kiểu nguyên thủy điểm

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Mô tả"}
bộ chọn dữ liệu



Nếu bộ chọn được định cấu hình thì bốn loại khả năng khớp dữ liệu sẽ được cung cấp: bộ chọn số, bộ chọn dữ liệu cục bộ, bộ chọn thứ nguyên có điều kiện và bộ chọn chỉ mục có điều kiện.

Nếu bộ chọn không được định cấu hình, kiểu sẽ có hiệu lực trên toàn cầu.

:::

**Ví dụ**
```ts
Bộ chọn số
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

bộ chọn dữ liệu cục bộ
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Bộ chọn thứ nguyên có điều kiện
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

Bộ chọn chỉ số có điều kiện
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




```
#### field

**Type:** `string`

:::note{title="Mô tả"}
Trường thứ nguyên, id kích thước của một mục nhất định

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="Mô tả"}
Chọn giá trị của trường thứ nguyên trong mục dữ liệu, mảng hỗ trợ

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Mô tả"}
Bộ lọc động (thực thi mã do AI tạo)



Triển khai logic lọc dữ liệu phức tạp thông qua mã JavaScript do AI tạo

Thích hợp cho Top N, phân tích thống kê, điều kiện phức tạp và các tình huống khác khó diễn đạt bằng bộ chọn tĩnh



Năng lực cốt lõi:

\-Hỗ trợ các điều kiện lọc dữ liệu phức tạp tùy ý

\-Sử dụng các hàm tiện ích có sẵn để thao tác dữ liệu

\- Thực thi an toàn trong môi trường trình duyệt (Web Worker Sandbox)



Yêu cầu về môi trường: Chỉ hỗ trợ môi trường trình duyệt, môi trường Node.js sẽ sử dụng dự phòng



Lưu ý: không thể sử dụng bộ chọn và DynamicFilter cùng lúc, DynamicFilter có mức độ ưu tiên cao hơn



Cấu hình bộ lọc động biểu đồ



Lọc các điểm đánh dấu biểu đồ (thanh, điểm, v.v.) thông qua mã JavaScript do AI tạo

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="Mô tả"}
Mô tả nhu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
```ts
"Đánh dấu các thanh có doanh số lớn hơn 1000"

"Nổi bật các thanh có tỷ suất lợi nhuận cao nhất theo từng khu vực"



```
#### code

**Type:** `string`

:::note{title="Mô tả"}
Mã bộ lọc JavaScript do AI tạo



\-chỉ có thể sử dụng các chức năng tiện ích tích hợp sẵn (được truy cập qua _ hoặc R)

\-Tham số đầu vào: dữ liệu (mảng), mỗi mục chứa trường __row_index cho biết số hàng

\- Phải trả về một mảng gồm các kết hợp chỉ mục hàng và trường: ``Array<{ __row_index: number, field: string }>``

\- __row_index đại diện cho số hàng của mục dữ liệu gốc và trường đại diện cho trường cần được đánh dấu.

\- Bị cấm sử dụng: eval, Hàm, hoạt động không đồng bộ, API DOM, yêu cầu mạng

:::

**Ví dụ**
```ts
Đánh dấu trường bán hàng của các mục dữ liệu có doanh số lớn hơn 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Làm nổi bật các mục dữ liệu có lợi nhất trong từng lĩnh vực
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Đánh dấu các mục dữ liệu được lọc theo nhiều điều kiện
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



```
#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title="Mô tả"}
Hạ cấp giải pháp khi thực thi mã không thành công hoặc môi trường không hỗ trợ giải pháp đó

:::


##### field

**Type:** `string`

:::note{title="Mô tả"}
Trường thứ nguyên, id kích thước của một mục nhất định

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="Mô tả"}
Chọn giá trị của trường thứ nguyên trong mục dữ liệu, mảng hỗ trợ

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="Mô tả"}
Lọc động kết quả thực thi (trường thời gian chạy)



Viết ở giai đoạn chuẩn bị (), chỉ đọc trong thời gian chạy

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### pointVisible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Điểm có thể nhìn thấy được không?

:::

### pointSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
kích thước điểm



kích thước điểm

:::

### pointColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Điểm màu nguyên thủy



Điểm màu nguyên thủy

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title="Mô tả"}
Điểm trong suốt màu nguyên thủy



Điểm trong suốt màu nguyên thủy

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu đường viền của phần tử điểm



Màu đường viền của phần tử điểm

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
Chiều rộng đường viền nguyên thủy của điểm



Chiều rộng đường viền nguyên thủy của điểm

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Mô tả"}
Kiểu đường viền nguyên thủy điểm



Kiểu đường viền nguyên thủy điểm

:::

**Ví dụ**
```ts
solid

dashed

dotted




```
## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title="Mô tả"}
Cấu hình kiểu nguyên thủy của dòng

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Mô tả"}
bộ chọn dữ liệu



Nếu bộ chọn được định cấu hình thì bốn loại khả năng khớp dữ liệu sẽ được cung cấp: bộ chọn số, bộ chọn dữ liệu cục bộ, bộ chọn thứ nguyên có điều kiện và bộ chọn chỉ mục có điều kiện.

Nếu bộ chọn không được định cấu hình, kiểu sẽ có hiệu lực trên toàn cầu.

:::

**Ví dụ**
```ts
Bộ chọn số
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

bộ chọn dữ liệu cục bộ
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

Bộ chọn thứ nguyên có điều kiện
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

Bộ chọn chỉ số có điều kiện
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




```
#### field

**Type:** `string`

:::note{title="Mô tả"}
Trường thứ nguyên, id kích thước của một mục nhất định

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="Mô tả"}
Chọn giá trị của trường thứ nguyên trong mục dữ liệu, mảng hỗ trợ

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Mô tả"}
Bộ lọc động (thực thi mã do AI tạo)



Triển khai logic lọc dữ liệu phức tạp thông qua mã JavaScript do AI tạo

Thích hợp cho Top N, phân tích thống kê, điều kiện phức tạp và các tình huống khác khó diễn đạt bằng bộ chọn tĩnh



Năng lực cốt lõi:

\-Hỗ trợ các điều kiện lọc dữ liệu phức tạp tùy ý

\-Sử dụng các hàm tiện ích có sẵn để thao tác dữ liệu

\- Thực thi an toàn trong môi trường trình duyệt (Web Worker Sandbox)



Yêu cầu về môi trường: Chỉ hỗ trợ môi trường trình duyệt, môi trường Node.js sẽ sử dụng dự phòng



Lưu ý: không thể sử dụng bộ chọn và DynamicFilter cùng lúc, DynamicFilter có mức độ ưu tiên cao hơn



Cấu hình bộ lọc động biểu đồ



Lọc các điểm đánh dấu biểu đồ (thanh, điểm, v.v.) thông qua mã JavaScript do AI tạo

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="Mô tả"}
Mô tả nhu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
```ts
"Đánh dấu các thanh có doanh số lớn hơn 1000"

"Nổi bật các thanh có tỷ suất lợi nhuận cao nhất theo từng khu vực"



```
#### code

**Type:** `string`

:::note{title="Mô tả"}
Mã bộ lọc JavaScript do AI tạo



\-chỉ có thể sử dụng các chức năng tiện ích tích hợp sẵn (được truy cập qua _ hoặc R)

\-Tham số đầu vào: dữ liệu (mảng), mỗi mục chứa trường __row_index cho biết số hàng

\- Phải trả về một mảng gồm các kết hợp chỉ mục hàng và trường: ``Array<{ __row_index: number, field: string }>``

\- __row_index đại diện cho số hàng của mục dữ liệu gốc và trường đại diện cho trường cần được đánh dấu.

\- Bị cấm sử dụng: eval, Hàm, hoạt động không đồng bộ, API DOM, yêu cầu mạng

:::

**Ví dụ**
```ts
Đánh dấu trường bán hàng của các mục dữ liệu có doanh số lớn hơn 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Làm nổi bật các mục dữ liệu có lợi nhất trong từng lĩnh vực
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Đánh dấu các mục dữ liệu được lọc theo nhiều điều kiện
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



```
#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title="Mô tả"}
Hạ cấp giải pháp khi thực thi mã không thành công hoặc môi trường không hỗ trợ giải pháp đó

:::


##### field

**Type:** `string`

:::note{title="Mô tả"}
Trường thứ nguyên, id kích thước của một mục nhất định

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="Mô tả"}
Chọn giá trị của trường thứ nguyên trong mục dữ liệu, mảng hỗ trợ

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="Mô tả"}
Lọc động kết quả thực thi (trường thời gian chạy)



Viết ở giai đoạn chuẩn bị (), chỉ đọc trong thời gian chạy

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### lineVisible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Đoạn đường có thể nhìn thấy được không?

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Đoạn đường có bằng phẳng không?

:::

### lineColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu đoạn đường

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title="Mô tả"}
Độ trong suốt màu của đoạn đường

:::

### lineWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
Chiều rộng đường

:::

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Mô tả"}
Kiểu đường

:::

**Ví dụ**
```ts
`lineStyle: 'solid'`




```
## annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title="Mô tả"}
Cấu hình điểm nhãn

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title="Mô tả"}
Bộ chọn điểm nhãn, được sử dụng để chọn điểm dữ liệu.

:::


#### field

**Type:** `string`

:::note{title="Mô tả"}
Trường thứ nguyên, id kích thước của một mục nhất định

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="Mô tả"}
Chọn giá trị của trường thứ nguyên trong mục dữ liệu, mảng hỗ trợ

:::

### measureId

**Type:** `string | undefined`

:::note{title="Mô tả"}
Chỉ định id chỉ số mà điểm nhãn thuộc về. Trong trường hợp nhiều thước đo, nó có thể được kết hợp với bộ chọn để định vị duy nhất điểm nhãn tương ứng với chỉ số mục tiêu.

:::

### dynamicFilter

**Type:** `ChartDynamicFilter | undefined`

:::note{title="Mô tả"}
Bộ lọc động (thực thi mã do AI tạo)



Triển khai logic lọc dữ liệu phức tạp thông qua mã JavaScript do AI tạo

Thích hợp cho Top N, phân tích thống kê, điều kiện phức tạp và các tình huống khác khó diễn đạt bằng bộ chọn tĩnh



Năng lực cốt lõi:

\-Hỗ trợ các điều kiện lọc dữ liệu phức tạp tùy ý

\-Sử dụng các hàm tiện ích có sẵn để thao tác dữ liệu

\- Thực thi an toàn trong môi trường trình duyệt (Web Worker Sandbox)



Yêu cầu về môi trường: Chỉ hỗ trợ môi trường trình duyệt, môi trường Node.js sẽ sử dụng dự phòng



Lưu ý: không thể sử dụng bộ chọn và DynamicFilter cùng lúc, DynamicFilter có mức độ ưu tiên cao hơn



Cấu hình bộ lọc động biểu đồ



Lọc các điểm đánh dấu biểu đồ (thanh, điểm, v.v.) thông qua mã JavaScript do AI tạo

:::


#### type

**Type:** `"row-with-field"`

#### description

**Type:** `string | undefined`

:::note{title="Mô tả"}
Mô tả nhu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
```ts
"Đánh dấu các thanh có doanh số lớn hơn 1000"

"Nổi bật các thanh có tỷ suất lợi nhuận cao nhất theo từng khu vực"



```
#### code

**Type:** `string`

:::note{title="Mô tả"}
Mã bộ lọc JavaScript do AI tạo



\-chỉ có thể sử dụng các chức năng tiện ích tích hợp sẵn (được truy cập qua _ hoặc R)

\-Tham số đầu vào: dữ liệu (mảng), mỗi mục chứa trường __row_index cho biết số hàng

\- Phải trả về một mảng gồm các kết hợp chỉ mục hàng và trường: ``Array<{ __row_index: number, field: string }>``

\- __row_index đại diện cho số hàng của mục dữ liệu gốc và trường đại diện cho trường cần được đánh dấu.

\- Bị cấm sử dụng: eval, Hàm, hoạt động không đồng bộ, API DOM, yêu cầu mạng

:::

**Ví dụ**
```ts
Đánh dấu trường bán hàng của các mục dữ liệu có doanh số lớn hơn 1000
```javascript
const filtered = _.filter(data, item => item.sales > 1000);
return _.map(filtered, item => ({
__row_index: item.__row_index,
field: 'sales'
}));
```

Làm nổi bật các mục dữ liệu có lợi nhất trong từng lĩnh vực
```javascript
const grouped = _.groupBy(data, 'area');
const maxItems = _.map(grouped, group =>
_.maxBy(group, item => item.profit / item.sales)
);
return _.flatten(
_.map(maxItems, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'profit' }
])
);
```

Đánh dấu các mục dữ liệu được lọc theo nhiều điều kiện
```javascript
const filtered = _.filter(data, item => {
const profitRate = item.profit / item.sales;
return profitRate > 0.2 && item.sales > 5000;
});
return _.flatten(
_.map(filtered, item => [
{ __row_index: item.__row_index, field: 'product' },
{ __row_index: item.__row_index, field: 'sales' }
])
);
```



```
#### fallback

**Type:** `Selector | Selectors | undefined`

:::note{title="Mô tả"}
Hạ cấp giải pháp khi thực thi mã không thành công hoặc môi trường không hỗ trợ giải pháp đó

:::


##### field

**Type:** `string`

:::note{title="Mô tả"}
Trường thứ nguyên, id kích thước của một mục nhất định

:::

##### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

:::

##### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

same as operator

:::

##### value

**Type:** `string | number | (string | number)[]`

:::note{title="Mô tả"}
Chọn giá trị của trường thứ nguyên trong mục dữ liệu, mảng hỗ trợ

:::

#### result

**Type:** `DynamicFilterExecutionResult<RowWithFieldRes> | undefined`

:::note{title="Mô tả"}
Lọc động kết quả thực thi (trường thời gian chạy)



Viết ở giai đoạn chuẩn bị (), chỉ đọc trong thời gian chạy

:::


##### success

**Type:** `false | true`

##### data

**Type:** `T[] | undefined`

##### error

**Type:** `string | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="Mô tả"}
văn bản chú thích

:::

**Ví dụ**
```ts
'Văn bản chú thích'



```
### textColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu văn bản

:::

**Ví dụ**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước phông chữ văn bản

:::

**Ví dụ**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ văn bản

:::

**Ví dụ**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Mô tả"}
Căn chỉnh văn bản, thường được đặt ở bên phải, văn bản được hiển thị ở bên trái của điểm nhãn, đảm bảo rằng nó được hiển thị trong vùng hiển thị của biểu đồ

Nên đặt thành 'phải', điều này đảm bảo rằng văn bản nằm ở bên trái điểm nhãn

phải: Văn bản nằm ở bên trái của điểm nhãn và cạnh phải của văn bản được căn chỉnh với điểm nhãn.

trái: Văn bản nằm ở phía bên phải của điểm nhãn và cạnh trái của văn bản được căn chỉnh với điểm nhãn

center: Văn bản nằm ở giữa điểm nhãn và tâm của văn bản được căn chỉnh với điểm nhãn

:::

**Ví dụ**
```ts
văn bản 'phải' nằm ở bên trái của điểm nhãn



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Mô tả"}
Căn chỉnh văn bản theo chiều dọc. Nói chung, được đặt ở trên cùng, văn bản được hiển thị ở cuối điểm nhãn, đảm bảo rằng nó được hiển thị trong vùng hiển thị của biểu đồ

Nên đặt nó ở mức 'trên cùng' để đảm bảo rằng văn bản được hiển thị hoàn toàn trong vùng hiển thị của biểu đồ.

top: Văn bản nằm ở dưới cùng của điểm nhãn và cạnh trên của văn bản được căn chỉnh với điểm nhãn

giữa: Văn bản nằm ở giữa điểm nhãn và tâm của văn bản được căn chỉnh với điểm nhãn

dưới cùng: Văn bản nằm ở trên cùng của điểm nhãn và cạnh dưới cùng của văn bản được căn chỉnh với điểm nhãn

:::

**Ví dụ**
```ts
văn bản 'trên cùng' nằm ở cuối điểm nhãn



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
nền có thể nhìn thấy

:::

**Ví dụ**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu nền

:::

**Ví dụ**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu viền nền

:::

**Ví dụ**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng viền nền

:::

**Ví dụ**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Mô tả"}
viền nền bo tròn góc

:::

**Ví dụ**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Mô tả"}
đệm nền

:::

**Ví dụ**
```ts
4



```
### offsetY

**Type:** `number | undefined`

:::note{title="Mô tả"}
Khoảng cách pixel bù tổng thể của điểm ghi nhãn theo hướng Y. Khi điểm ghi nhãn nằm phía trên biểu đồ (khi giá trị lớn), bạn nên đặt điểm đó thành giá trị dương. Khi điểm ghi nhãn nằm bên dưới biểu đồ (khi giá trị nhỏ), bạn nên đặt điểm đó thành giá trị âm.

Một giá trị âm sẽ dịch chuyển toàn bộ lên trên. Ví dụ: nếu nó được đặt thành \-10, toàn bộ thành phần điểm nhãn, bao gồm cả văn bản và nền văn bản, sẽ được dịch chuyển lên trên 10 pixel.

Một giá trị dương sẽ dịch chuyển toàn bộ xuống dưới. Ví dụ: nếu nó được đặt thành 10, toàn bộ thành phần điểm nhãn, bao gồm văn bản và nền văn bản, sẽ được dịch chuyển xuống dưới 10 pixel.

:::

**Ví dụ**
```ts
offsetY: 5, toàn bộ điểm nhãn được bù xuống 5 pixel



```
### offsetX

**Type:** `number | undefined`

:::note{title="Mô tả"}
Khoảng cách pixel bù tổng thể của điểm ghi nhãn theo hướng X. Khi điểm ghi nhãn nằm ở phía bên trái của biểu đồ (điểm bắt đầu của trục danh mục), bạn nên đặt điểm này thành giá trị dương. Khi điểm ghi nhãn nằm ở phía bên phải của biểu đồ (điểm cuối của trục danh mục), bạn nên đặt điểm này thành giá trị âm.

Một giá trị âm sẽ dịch chuyển toàn bộ sang trái. Ví dụ: nếu nó được đặt thành \-10, toàn bộ thành phần điểm nhãn, bao gồm văn bản và nền văn bản, sẽ được dịch chuyển sang trái 10 pixel.

Một giá trị dương sẽ chuyển toàn bộ sang phải. Ví dụ: nếu nó được đặt thành 10, toàn bộ thành phần điểm nhãn, bao gồm cả văn bản và nền văn bản, sẽ được dịch chuyển sang phải 10 pixel.

:::

**Ví dụ**
```ts
offsetX: 5, toàn bộ điểm nhãn được dịch sang phải 5 pixel




```
## annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title="Mô tả"}
Cấu hình dòng nhãn giá trị thứ nguyên

:::


### xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="Mô tả"}
Giá trị x cố định, được sử dụng để đánh dấu các đường thẳng đứng. Nếu trục danh mục theo hướng x, bạn có thể nhập giá trị thứ nguyên. Nếu trục giá trị theo hướng x, bạn có thể nhập một giá trị cụ thể.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="Mô tả"}
Bộ lọc động (thực thi mã do AI tạo)



Tự động tính toán giá trị của đường kích thước thông qua mã JavaScript do AI tạo

Thích hợp để xác định động các vị trí dòng nhãn dựa trên dữ liệu, chẳng hạn như trung bình, tối đa, phân vị, ngành nghề kinh doanh, v.v.



Chỉ hỗ trợ môi trường trình duyệt (yêu cầu Web Worker)

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="Mô tả"}
Mô tả nhu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
```ts
"Lấy giá trị có doanh số cao nhất làm tham chiếu dòng nhãn"

"Tính doanh thu trung bình cho dây chuyền dán nhãn"



```
#### code

**Type:** `string`

:::note{title="Mô tả"}
Mã bộ lọc JavaScript do AI tạo



\-chỉ có thể sử dụng các chức năng tiện ích tích hợp sẵn (được truy cập qua _ hoặc R)

\- Tham số đầu vào: dữ liệu (mảng)

\- Phải trả về một số hoặc một chuỗi: number | chuỗi

\-Các tình huống có thể áp dụng: giá trị động cần thiết cho dòng ghi nhãn (đường ngang, đường dọc)

\- Bị cấm sử dụng: eval, Hàm, hoạt động không đồng bộ, API DOM, yêu cầu mạng

:::

**Ví dụ**
```ts
Lấy giá trị bán hàng tối đa làm giá trị dòng nhãn
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Tính giá trị trung bình cho dòng ghi nhãn
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Nhận lượng tử dưới dạng dòng nhãn
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Tính giá trị mục tiêu dựa trên các điều kiện
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



```
#### fallback

**Type:** `string | number | undefined`

:::note{title="Mô tả"}
Hạ cấp giải pháp khi thực thi mã không thành công hoặc môi trường không hỗ trợ giải pháp đó

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Mô tả"}
Lọc động kết quả thực thi (trường thời gian chạy)



Viết ở giai đoạn chuẩn bị (), chỉ đọc trong thời gian chạy

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="Mô tả"}
văn bản chú thích

:::

**Ví dụ**
```ts
'Văn bản chú thích'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Mô tả"}
Vị trí chữ, vị trí nhãn của đường kích thước (vị trí tương đối của nhãn so với đường thẳng).

:::

**Ví dụ**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu văn bản

:::

**Ví dụ**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước phông chữ văn bản

:::

**Ví dụ**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ văn bản

:::

**Ví dụ**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Mô tả"}
Căn chỉnh văn bản, nói chung, không cần thiết lập

Nên đặt thành 'phải', điều này đảm bảo văn bản nằm ở bên trái của dòng nhãn

right: Văn bản nằm ở bên trái của dòng hướng dẫn và cạnh phải của văn bản được căn chỉnh theo dòng nhãn (dọc)

trái: Văn bản nằm ở bên phải của dòng hướng dẫn và cạnh trái của văn bản được căn chỉnh theo dòng nhãn (dọc)

center: Văn bản nằm ở giữa đường hướng dẫn và tâm của văn bản được căn chỉnh theo đường kích thước (dọc)

:::

**Ví dụ**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Mô tả"}
Căn chỉnh văn bản theo chiều dọc. Nói chung, không cần cài đặt.

Nên đặt nó ở mức 'trên cùng' để đảm bảo rằng văn bản được hiển thị hoàn toàn trong vùng hiển thị của biểu đồ.

top: Văn bản nằm ở cuối dòng hướng dẫn và cạnh trên của văn bản được căn chỉnh (theo chiều dọc) với điểm cuối của dòng kích thước

giữa: Văn bản nằm ở giữa đường hướng dẫn và tâm của văn bản được căn chỉnh (theo chiều dọc) với điểm cuối của đường kích thước

dưới cùng: Văn bản nằm ở đầu dòng hướng dẫn và cạnh dưới của văn bản được căn chỉnh (theo chiều dọc) với điểm cuối của dòng kích thước

:::

**Ví dụ**
```ts
'top'



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Dòng hiển thị

:::

**Ví dụ**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu đường

:::

**Ví dụ**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng đường

:::

**Ví dụ**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Mô tả"}
kiểu đường

:::

**Ví dụ**
```ts
'solid'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
nền có thể nhìn thấy

:::

**Ví dụ**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu nền

:::

**Ví dụ**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu viền nền

:::

**Ví dụ**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng viền nền

:::

**Ví dụ**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Mô tả"}
viền nền bo tròn góc

:::

**Ví dụ**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Mô tả"}
đệm nền

:::

**Ví dụ**
```ts
4




```
## annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title="Mô tả"}
Cấu hình dòng nhãn số

:::


### yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title="Mô tả"}
Giá trị y cố định, được sử dụng để đánh dấu các đường ngang. Nếu trục danh mục theo hướng y, bạn có thể nhập giá trị thứ nguyên. Nếu trục giá trị theo hướng y, bạn có thể nhập một giá trị cụ thể.

:::

### dynamicFilter

**Type:** `ValueDynamicFilter | undefined`

:::note{title="Mô tả"}
Bộ lọc động (thực thi mã do AI tạo)



Tự động tính toán giá trị của đường kích thước thông qua mã JavaScript do AI tạo

Thích hợp để xác định động các vị trí dòng nhãn dựa trên dữ liệu, chẳng hạn như trung bình, tối đa, phân vị, ngành nghề kinh doanh, v.v.



Chỉ hỗ trợ môi trường trình duyệt (yêu cầu Web Worker)

:::


#### type

**Type:** `"value"`

#### description

**Type:** `string | undefined`

:::note{title="Mô tả"}
Mô tả nhu cầu lọc của người dùng (ngôn ngữ tự nhiên)

:::

**Ví dụ**
```ts
"Lấy giá trị có doanh số cao nhất làm tham chiếu dòng nhãn"

"Tính doanh thu trung bình cho dây chuyền dán nhãn"



```
#### code

**Type:** `string`

:::note{title="Mô tả"}
Mã bộ lọc JavaScript do AI tạo



\-chỉ có thể sử dụng các chức năng tiện ích tích hợp sẵn (được truy cập qua _ hoặc R)

\- Tham số đầu vào: dữ liệu (mảng)

\- Phải trả về một số hoặc một chuỗi: number | chuỗi

\-Các tình huống có thể áp dụng: giá trị động cần thiết cho dòng ghi nhãn (đường ngang, đường dọc)

\- Bị cấm sử dụng: eval, Hàm, hoạt động không đồng bộ, API DOM, yêu cầu mạng

:::

**Ví dụ**
```ts
Lấy giá trị bán hàng tối đa làm giá trị dòng nhãn
```javascript
const maxSales = _.maxBy(data, 'sales')?.sales;
return maxSales || 0;
```

Tính giá trị trung bình cho dòng ghi nhãn
```javascript
const avgSales = _.meanBy(data, 'sales');
return _.round(avgSales, 2);
```

Nhận lượng tử dưới dạng dòng nhãn
```javascript
const sorted = _.sortBy(data, 'sales');
const index = Math.floor(sorted.length * 0.75);
return sorted[index]?.sales || 0;
```

Tính giá trị mục tiêu dựa trên các điều kiện
```javascript
const currentYearTotal = _.sumBy(
_.filter(data, item => item.year === 2024),
'sales'
);
return currentYearTotal;
```



```
#### fallback

**Type:** `string | number | undefined`

:::note{title="Mô tả"}
Hạ cấp giải pháp khi thực thi mã không thành công hoặc môi trường không hỗ trợ giải pháp đó

:::

#### result

**Type:** `{ success: boolean; data?: number | string; } | undefined`

:::note{title="Mô tả"}
Lọc động kết quả thực thi (trường thời gian chạy)



Viết ở giai đoạn chuẩn bị (), chỉ đọc trong thời gian chạy

:::


##### success

**Type:** `false | true`

##### data

**Type:** `string | number | undefined`

### text

**Type:** `string | string[] | undefined`

:::note{title="Mô tả"}
văn bản chú thích

:::

**Ví dụ**
```ts
'Văn bản chú thích'



```
### textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title="Mô tả"}
vị trí văn bản



Vị trí nhãn của đường kích thước (vị trí tương đối của nhãn so với đường kích thước).

:::

**Ví dụ**
```ts
'outsideEnd'



```
### textColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu văn bản

:::

**Ví dụ**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước phông chữ văn bản

:::

**Ví dụ**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ văn bản

:::

**Ví dụ**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Mô tả"}
Căn chỉnh văn bản, nói chung, không cần thiết lập

Nên đặt thành 'phải', điều này đảm bảo văn bản nằm ở bên trái của dòng nhãn

right: Văn bản nằm ở bên trái của đường hướng dẫn và cạnh phải của văn bản được căn chỉnh với điểm cuối của đường kích thước (ngang)

trái: Văn bản nằm ở bên phải của đường hướng dẫn và cạnh trái của văn bản được căn chỉnh với điểm cuối của đường kích thước (ngang)

center: Văn bản nằm ở giữa đường hướng dẫn và tâm của văn bản được căn chỉnh với điểm cuối của đường kích thước (ngang)

:::

**Ví dụ**
```ts
'right'



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Mô tả"}
Căn chỉnh văn bản theo chiều dọc. Nói chung, không cần cài đặt.

Nên đặt nó ở mức 'trên cùng' để đảm bảo rằng văn bản được hiển thị hoàn toàn trong vùng hiển thị của biểu đồ.

top: Văn bản nằm ở dưới cùng của dòng hướng dẫn và cạnh trên của văn bản được căn chỉnh theo dòng nhãn (ngang)

giữa: Văn bản nằm ở giữa dòng hướng dẫn và trung tâm của văn bản được căn chỉnh với dòng nhãn (ngang)

đáy: Văn bản nằm trên cùng của dòng hướng dẫn và cạnh dưới của văn bản được căn chỉnh với dòng nhãn (ngang)

:::

**Ví dụ**
```ts
'top'



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
nền có thể nhìn thấy

:::

**Ví dụ**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu nền

:::

**Ví dụ**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu viền nền

:::

**Ví dụ**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng viền nền



chiều rộng viền nền

:::

**Ví dụ**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Mô tả"}
viền nền bo tròn góc

:::

**Ví dụ**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Mô tả"}
đệm nền

:::

**Ví dụ**
```ts
4



```
### lineVisible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Dòng hiển thị



Dòng hiển thị

:::

**Ví dụ**
```ts
true



```
### lineColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu đường

:::

**Ví dụ**
```ts
'red'



```
### lineWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng đường

:::

**Ví dụ**
```ts
2



```
### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title="Mô tả"}
kiểu đường

:::

**Ví dụ**
```ts
'solid'



```
### splitLine

**Type:** `boolean | { positiveColor?: string; negativeColor?: string; } | undefined`

:::note{title="Mô tả"}
Có bật chức năng chia dòng chính thành hai phần hay không

:::


#### positiveColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Phần lớn hơn giá trị được đánh dấu, màu chính tương ứng

:::

#### negativeColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Phần nhỏ hơn giá trị được đánh dấu, màu chủ đạo tương ứng

:::


## annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title="Mô tả"}
Cấu hình vùng nhãn

:::


### selector

**Type:** `AreaSelector | AreaSelectors | undefined`

:::note{title="Mô tả"}
Tùy thuộc vào dữ liệu đã chọn, việc ghi nhãn dữ liệu sẽ được thực hiện.

:::


#### field

**Type:** `string`

:::note{title="Mô tả"}
Trường thứ nguyên, id kích thước của một mục nhất định

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title="Mô tả"}
Toán tử

\- in: Chọn các mục dữ liệu có giá trị trường thứ nguyên bằng giá trị

\- not in: Chọn các mục dữ liệu có giá trị trường thứ nguyên không có giá trị

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title="Mô tả"}
Chọn giá trị của trường thứ nguyên trong mục dữ liệu, mảng hỗ trợ

:::

### text

**Type:** `string | string[] | undefined`

:::note{title="Mô tả"}
văn bản chú thích

:::

**Ví dụ**
```ts
'Văn bản chú thích'



```
### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title="Mô tả"}
vị trí văn bản

:::

**Ví dụ**
```ts
'top'



```
### textColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu văn bản

:::

**Ví dụ**
```ts
'red'



```
### textFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước phông chữ văn bản

:::

**Ví dụ**
```ts
12



```
### textFontWeight

**Type:** `number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ văn bản

:::

**Ví dụ**
```ts
400



```
### textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title="Mô tả"}
Căn chỉnh văn bản, thường được đặt ở bên phải, văn bản được hiển thị ở giữa vùng nhãn, đảm bảo rằng nó được hiển thị trong vùng hiển thị của biểu đồ

Bạn nên đặt nó ở vị trí 'center', điều này đảm bảo rằng văn bản nằm ở giữa khu vực chú thích.

phải: Văn bản nằm ở bên trái của vùng chú thích và cạnh phải của văn bản được căn chỉnh theo vùng chú thích.

trái: Văn bản nằm ở phía bên phải của vùng chú thích và cạnh trái của văn bản được căn chỉnh với vùng chú thích.

center: Văn bản nằm ở giữa vùng chú thích và tâm của văn bản được căn chỉnh với vùng chú thích.

:::

**Ví dụ**
```ts
văn bản 'ở giữa' nằm ở giữa khu vực chú thích



```
### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title="Mô tả"}
Căn chỉnh văn bản theo chiều dọc. Nói chung, đặt ở trên cùng, văn bản được hiển thị ở cuối vùng nhãn, đảm bảo rằng nó được hiển thị trong vùng hiển thị của biểu đồ

Nên đặt nó ở mức 'trên cùng' để đảm bảo rằng văn bản được hiển thị hoàn toàn trong vùng hiển thị của biểu đồ.

top: Văn bản nằm ở cuối vùng chú thích và cạnh trên của văn bản được căn chỉnh theo vùng chú thích.

ở giữa: Văn bản nằm ở giữa vùng chú thích và tâm của văn bản được căn chỉnh với vùng chú thích.

dưới cùng: Văn bản nằm ở trên cùng của vùng nhãn và cạnh dưới cùng của văn bản được căn chỉnh với vùng nhãn.

:::

**Ví dụ**
```ts
văn bản 'trên cùng' nằm ở cuối khu vực chú thích



```
### textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
nền có thể nhìn thấy

:::

**Ví dụ**
```ts
true



```
### textBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu nền

:::

**Ví dụ**
```ts
'red'



```
### textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu viền nền



Màu viền nền

:::

**Ví dụ**
```ts
'red'



```
### textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
chiều rộng viền nền

:::

**Ví dụ**
```ts
2



```
### textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title="Mô tả"}
viền nền bo tròn góc



viền nền bo tròn góc

:::

**Ví dụ**
```ts
4



```
### textBackgroundPadding

**Type:** `number | undefined`

:::note{title="Mô tả"}
đệm nền

:::

**Ví dụ**
```ts
4



```
### areaColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu vùng vùng nhãn

:::

**Ví dụ**
```ts
'red'



```
### areaColorOpacity

**Type:** `number | undefined`

:::note{title="Mô tả"}
Vùng nhãn vùng màu trong suốt

:::

**Ví dụ**
```ts
0.5



```
### areaBorderColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu đường viền vùng nhãn

:::

**Ví dụ**
```ts
'red'



```
### areaBorderWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
Chiều rộng đường viền vùng nhãn

:::

**Ví dụ**
```ts
2



```
### areaBorderRadius

**Type:** `number | undefined`

:::note{title="Mô tả"}
Vùng nhãn viền bo tròn các góc

:::

**Ví dụ**
```ts
4



```
### areaLineDash

**Type:** `number[] | undefined`

:::note{title="Mô tả"}
Kiểu đường viền vùng nhãn

:::

**Ví dụ**
```ts
[2, 2]



```
### outerPadding

**Type:** `number | undefined`

:::note{title="Mô tả"}
Lề vùng nhãn

:::

**Ví dụ**
```ts
0




```
## dimensionLinkage

**Type:** `DimensionLinkage | undefined`

:::note{title="Mô tả"}
Cấu hình liên kết thứ nguyên



Cấu hình liên kết kích thước biểu đồ phối cảnh

:::


### enable

**Type:** `false | true`

:::note{title="Mô tả"}
Có bật liên kết kích thước bảng phối cảnh hay không

:::

### showTooltip

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có hiển thị thông tin chú giải công cụ cho các biểu đồ con tương ứng với tất cả các thứ nguyên hay không

:::

### showLabel

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có hiển thị nhãn tương ứng với chữ thập hay không

:::


## locale

**Type:** `Locale | undefined`

:::note{title="Mô tả"}
Cấu hình ngôn ngữ

:::

