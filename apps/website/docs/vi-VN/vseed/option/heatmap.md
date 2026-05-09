# Heatmap

:::info{title="Khuyến nghị"}
\- cấu hình trường khuyến nghị: `1`chỉ số, `2`chiều

\- Hỗ trợ định hình lại dữ liệu: ít nhất `1`chỉ số, `0`chiều

:::

:::info{title="Ánh xạ mã hóa"}
Bản đồ nhiệt hỗ trợ các kênh trực quan sau:

`xAxis`: kênh trục X, hỗ trợ `nhiều chiều`, ánh xạ tới trục X theo giá trị thứ nguyên

`yAxis`: kênh trục Y, hỗ trợ `nhiều chiều`, được ánh xạ tới trục Y theo giá trị thứ nguyên

`detail`: kênh phân chia, hỗ trợ `nhiều chiều`, được sử dụng khi hiển thị nhiều dữ liệu chi tiết hơn trong cùng một chuỗi màu

`color`: Kênh màu, hỗ trợ `một chỉ số`, ánh xạ tới màu theo giá trị chỉ số

`tooltip`: Kênh nhắc nhở, hỗ trợ `nhiều chiều`và `nhiều chỉ số`, sẽ hiển thị khi chuột di chuột qua điểm dữ liệu

`label`: Kênh nhãn, hỗ trợ `nhiều chiều`và `nhiều chỉ số`, sẽ hiển thị nhãn dữ liệu trên các điểm dữ liệu

:::

:::note{title="Mô tả"}
Bản đồ nhiệt, hiển thị mối quan hệ phân bố và cường độ của dữ liệu thông qua độ sâu màu của ma trận hai chiều

Các tình huống áp dụng:

\- Hiển thị mật độ và cường độ của dữ liệu 2D quy mô lớn

\-Phân tích tương quan giữa phân loại và giá trị số

\- So sánh chéo chuỗi thời gian và danh mục

:::

:::warning{title="Warning"}
Yêu cầu về dữ liệu:

\- ít nhất 2 trường chiều, được sử dụng để xác định các hàng và cột của bản đồ nhiệt

\- ít nhất 1 trường số (số liệu), được sử dụng để ánh xạ các sắc thái màu

\- Khi nhiều chỉ số được hỗ trợ, thường một chỉ số được chọn để ánh xạ màu

Các tính năng được bật theo mặc định:

\-Chú giải, trục tọa độ, nhãn dữ liệu, thông tin nhắc nhở và tỷ lệ số được bật theo mặc định.

:::


## chartType

**Type:** `"heatmap"`

:::note{title="Mô tả"}
bản đồ nhiệt



Bản đồ nhiệt, hiển thị mối quan hệ phân bố và cường độ của dữ liệu thông qua độ sâu màu của ma trận hai chiều

:::

**Ví dụ**
```ts
'heatmap'




```
## dataset

**Type:** `Record[]`

:::note{title="Mô tả"}
Tập dữ liệu



Một tập dữ liệu tổng hợp tuân thủ đặc tả TidyData được dùng để xác định nguồn dữ liệu và cấu trúc của biểu đồ. Tập dữ liệu do người dùng nhập vào không yêu cầu bất kỳ xử lý nào. VSeed có chức năng định hình lại dữ liệu mạnh mẽ và sẽ tự định hình lại dữ liệu. Dữ liệu bản đồ nhiệt cuối cùng sẽ được chuyển đổi thành 2 chiều và 1 chỉ số.

:::

**Ví dụ**
```ts
[{tháng:'Tháng Một', giá trị:100}, {tháng:'Tháng Hai', giá trị:150}, {tháng:'Tháng Ba', giá trị:120}]




```
## dimensions

**Type:** `HeatmapDimension[] | undefined`

:::note{title="Mô tả"}
Kích thước



Kích thước đầu tiên của bản đồ nhiệt được ánh xạ tới trục góc và các kích thước còn lại được kết hợp với tên chỉ số (khi tồn tại nhiều chỉ số) và được hiển thị dưới dạng mục chú giải.

:::

**Ví dụ**
```ts
[{id: 'danh mục', bí danh: 'danh mục'}]




```
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

**Type:** `"xAxis" | "tooltip" | "label" | "row" | "column" | "yAxis" | undefined`

:::note{title="Mô tả"}
Các kênh ánh xạ thứ nguyên

\- xAxis: hỗ trợ ánh xạ nhiều chiều sang trục X

\- yAxis: hỗ trợ ánh xạ nhiều chiều sang trục Y

\- chú giải công cụ: Hỗ trợ ánh xạ nhiều thứ nguyên vào các kênh chú giải công cụ

\- label: hỗ trợ ánh xạ nhiều chiều tới các kênh nhãn

\- row: hỗ trợ ánh xạ nhiều chiều tới các kênh hàng

\- cột: hỗ trợ ánh xạ nhiều chiều tới các kênh cột

:::


## measures

**Type:** `HeatmapMeasure[] | undefined`

:::note{title="Mô tả"}
chỉ số



Các chỉ số của bản đồ nhiệt sẽ tự động được hợp nhất thành một chỉ số và ánh xạ tới trục bán kính. Khi có nhiều chỉ số, tên chỉ số sẽ được hợp nhất với các thứ nguyên khác và hiển thị dưới dạng mục chú giải.

:::

**Ví dụ**
```ts
[{id: 'giá trị', bí danh: 'giá trị'}]




```
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

**Type:** `"color" | "tooltip" | "label" | undefined`

:::note{title="Mô tả"}
Kênh ánh xạ chỉ số

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
## backgroundColor

**Type:** `BackgroundColor`

:::note{title="Mô tả"}
Màu nền biểu đồ



Màu nền có thể là một chuỗi màu, chẳng hạn như 'đỏ', 'xanh' hoặc hex, rgb hoặc rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title="Mô tả"}
màu sắc



Cấu hình màu, được sử dụng để xác định bảng màu của biểu đồ, bao gồm danh sách màu, ánh xạ màu, gradient màu, v.v.

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
Cấu hình nhãn bản đồ nhiệt được sử dụng để xác định nhãn dữ liệu của biểu đồ và tự động bật đảo ngược nhãn để đảm bảo khả năng đọc nhãn.

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

**Type:** `ColorLegend | undefined`

:::note{title="Mô tả"}
Truyền thuyết



Cấu hình chú giải màu của bản đồ nhiệt được sử dụng để xác định chú giải của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v. của chú giải.

:::


### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title="Mô tả"}
vị trí chú giải

:::

**Ví dụ**
```ts
position: 'rightTop'



```
### enable

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Chức năng chú giải có được bật không?

:::

**Ví dụ**
```ts
enable: true



```
### labelColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu chữ chú giải

:::

### labelFontColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu chữ chú giải

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
### labelFontWeight

**Type:** `string | number | undefined`

:::note{title="Mô tả"}
Trọng lượng phông chữ chú giải

:::

**Ví dụ**
```ts
labelFontWeight: 400



```
### railBackgroundColor

**Type:** `string | undefined`

### handlerBorderColor

**Type:** `string | undefined`


## tooltip

**Type:** `Tooltip | undefined`

:::note{title="Mô tả"}
Tin nhắn nhắc nhở



Cấu hình thông tin nhắc nhở của bản đồ nhiệt được sử dụng để xác định thông tin nhắc nhở của biểu đồ, bao gồm vị trí, định dạng, kiểu, v.v. của thông tin nhắc nhở.

:::


### enable

**Type:** `false | true`

:::note{title="Mô tả"}
Chức năng thông tin nhắc nhở có được bật hay không

:::


## brush

**Type:** `Brush | undefined`

:::note{title="Mô tả"}
Lựa chọn khung



Cấu hình chọn khung, dùng để bật/tắt khả năng chọn khung cọ



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


## theme

**Type:** `Theme | undefined`

:::note{title="Mô tả"}
Chủ đề của biểu đồ Chủ đề là một cấu hình chức năng có mức ưu tiên thấp hơn chứa các cấu hình chung cho tất cả các loại biểu đồ và cấu hình biểu đồ chung cho các loại biểu đồ một lớp.



Tích hợp sẵn các chủ đề sáng và tối, người dùng có thể tùy chỉnh chủ đề thông qua Builder



chủ đề



Có hai chủ đề tích hợp: ánh sáng và bóng tối. Các chủ đề mới có thể được tùy chỉnh thông qua registerTheme.

:::

**Ví dụ**
```ts
'dark'

'light'

'customThemeName'




```
### length

**Type:** `number`

### brand

**Type:** `brand`


## locale

**Type:** `Locale | undefined`

:::note{title="Mô tả"}
Ngôn ngữ



Cấu hình ngôn ngữ biểu đồ hỗ trợ ngôn ngữ 'zh\-CN' và 'en\-US'. Ngoài ra, bạn có thể gọi phương thức intl.setLocale('zh\-CN') để đặt ngôn ngữ.

:::

