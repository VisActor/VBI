# PivotTable

:::info{title="Khuyến nghị"}
\- cấu hình trường khuyến nghị: `1`chỉ số, `1`chiều

\- Hỗ trợ định hình lại dữ liệu: ít nhất `1`chỉ số, `0`chiều

:::

:::info{title="Ánh xạ mã hóa"}
Bảng tổng hợp hỗ trợ các kênh trực quan sau:

`row`: thứ nguyên hàng, hỗ trợ `nhiều chiều`, nhóm các hàng theo giá trị thứ nguyên

`column`: Kích thước cột, hỗ trợ `nhiều chiều`, nhóm các cột theo giá trị thứ nguyên

`detail`: kênh phân chia, hỗ trợ `nhiều chỉ số`, hiển thị giá trị chỉ số trong ô

:::

:::note{title="Mô tả"}
Bảng tổng hợp phù hợp với các tình huống phân tích chéo dữ liệu đa chiều và có thể định cấu hình linh hoạt các kích thước hàng và cột cũng như phương pháp tính toán chỉ số.

Các tình huống áp dụng:

\-Phân tích thống kê dữ liệu đa chiều phức tạp

\-Hiển thị khoan và tổng hợp dữ liệu

\-Tạo báo cáo kinh doanh và khám phá dữ liệu

:::

:::warning{title="Warning"}
Yêu cầu về dữ liệu:

\- ít nhất 1 thứ nguyên hàng hoặc 1 thứ nguyên cột hoặc 1 chỉ số

\- dữ liệu phải được tổng hợp

\- dữ liệu có thể được nhóm lại

Các tính năng được bật theo mặc định:

\- Theo mặc định, tính năng sắp xếp hàng và cột, lọc dữ liệu, tính toán tổng hợp, tổng phụ/tổng ​​được bật.

:::


## chartType

**Type:** `"pivotTable"`

:::note{title="Mô tả"}
Bảng tổng hợp, phù hợp với các tình huống phân tích chéo dữ liệu đa chiều

:::

**Ví dụ**
```ts
'pivotTable'




```
## dataset

**Type:** `Record[]`

:::note{title="Mô tả"}
Một tập dữ liệu tổng hợp tuân thủ các thông số kỹ thuật của TidyData được sử dụng để xác định nguồn dữ liệu và cấu trúc của biểu đồ. Tập dữ liệu do người dùng nhập vào không yêu cầu bất kỳ xử lý nào. VSeed có chức năng định hình lại dữ liệu mạnh mẽ và sẽ tự định hình lại dữ liệu. Dữ liệu trong bảng tổng hợp cuối cùng sẽ được chuyển đổi thành cấu trúc cây tương ứng và người dùng không cần thực hiện xử lý dữ liệu thủ công.

:::

**Ví dụ**
```ts
[{khu vực:'Đông Trung Quốc', sản phẩm:'A', doanh số:1000}, {khu vực:'Đông Trung Quốc', sản phẩm:'B', doanh số:1500}]




```
## dimensions

**Type:** `TableDimension[] | undefined`

:::note{title="Mô tả"}
Kích thước hàng và cột của bảng trụ sẽ tự động xử lý dữ liệu thành cấu trúc cây và ánh xạ nó tới trục hàng và cột.

:::

**Ví dụ**
```ts
[{id: 'khu vực', bí danh: 'khu vực', isRow: true}, {id: 'sản phẩm', bí danh: 'sản phẩm', isColumn: true}]




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

**Type:** `"row" | "column" | undefined`

:::note{title="Mô tả"}
Các kênh ánh xạ thứ nguyên

\- row: hỗ trợ ánh xạ nhiều chiều tới các kênh hàng

\- cột: hỗ trợ ánh xạ nhiều chiều tới các kênh cột

:::


## measures

**Type:** `TableMeasure[] | undefined`

:::note{title="Mô tả"}
Bảng tổng hợp hỗ trợ nhiều chỉ số thứ nguyên

:::

**Ví dụ**
```ts
[{id: 'doanh số', bí danh: 'doanh số', tổng hợp: 'tổng'}]




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

**Type:** `"column" | undefined`

:::note{title="Mô tả"}
Kênh ánh xạ chỉ số

\- cột: cột chỉ số

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
Cấu hình phân trang, được sử dụng để chỉ định tên trường phân trang, phải là thứ nguyên

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
Màu nền có thể là một chuỗi màu, chẳng hạn như 'đỏ', 'xanh' hoặc hex, rgb hoặc rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## borderColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
màu viền bảng

:::


## bodyFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước phông chữ của nội dung bảng

:::


## bodyFontColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu phông chữ của thân bảng

:::


## bodyBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nền của thân bảng

:::


## headerFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước phông chữ của tiêu đề hàng và tiêu đề cột

:::


## headerFontColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu chữ của tiêu đề hàng và tiêu đề cột

:::


## headerBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nền của tiêu đề hàng và tiêu đề cột

:::


## hoverHeaderBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nền khi di chuột qua ô trong tiêu đề hàng hoặc cột. Nó được sử dụng để làm nổi bật các ô nơi hàng và cột nơi đặt chuột giao nhau.

:::


## hoverHeaderInlineBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Khi chuột di chuột qua ô ở đầu hàng hoặc cột, nó dùng để bôi đen tất cả các ô trong hàng và cột nơi đặt chuột.

:::


## selectedBorderColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu đường viền của ô đã chọn, dùng để đánh dấu ô đã chọn

:::


## selectedBackgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nền của các ô đã chọn, dùng để đánh dấu các ô đã chọn

:::


## bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title="Mô tả"}
Đặt kiểu đặc biệt cho các ô trong phần nội dung của bảng

:::


### selector

**Type:** `Selector | Selectors | FieldSelector | undefined`

:::note{title="Mô tả"}
bộ chọn dữ liệu



Nếu bộ chọn được định cấu hình thì bốn loại khả năng khớp dữ liệu sẽ được cung cấp: bộ chọn số, bộ chọn dữ liệu cục bộ, bộ chọn thứ nguyên có điều kiện và bộ chọn chỉ mục có điều kiện.

Nếu bộ chọn không được định cấu hình, kiểu sẽ có hiệu lực trên toàn cầu.



Lưu ý: không thể sử dụng bộ chọn và DynamicFilter cùng lúc, DynamicFilter có mức độ ưu tiên cao hơn

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

Bộ lọc cột trường
selector = {
field: 'category'
}
selector = {
field: ['category', 'profit']
}




```
#### field

**Type:** `string | string[]`

:::note{title="Mô tả"}
Tên trường, có thể là một trường hoặc một mảng gồm nhiều trường

:::

**Ví dụ**
```ts
trường đơn
field: 'sales'

nhiều trường
field: ['sales', 'profit', 'revenue']



```
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

**Type:** `TableDynamicFilter | undefined`

:::note{title="Mô tả"}
Bộ lọc động (điều khiển bằng mã)



Triển khai logic lọc dữ liệu phức tạp thông qua mã JavaScript do AI tạo

Thích hợp cho Top N, phân tích thống kê, điều kiện phức tạp và các tình huống khác khó diễn đạt bằng bộ chọn tĩnh



Năng lực cốt lõi:

\-Hỗ trợ các điều kiện lọc dữ liệu phức tạp tùy ý

\-Sử dụng các hàm tiện ích có sẵn để thao tác dữ liệu

\- Thực thi an toàn trong môi trường trình duyệt (Web Worker Sandbox)



Yêu cầu về môi trường: Chỉ hỗ trợ môi trường trình duyệt, môi trường Node.js sẽ sử dụng dự phòng



Lưu ý: không thể sử dụng bộ chọn và DynamicFilter cùng lúc, DynamicFilter có mức độ ưu tiên cao hơn



Cấu hình bộ lọc động bảng



Đạt được khả năng lọc chính xác ở cấp ô bảng thông qua mã JavaScript do AI tạo

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
"Đánh dấu các ô có doanh số lớn hơn 1000"

"Đánh dấu ô có giá trị lớn nhất trong mỗi hàng"



```
#### code

**Type:** `string`

:::note{title="Mô tả"}
Mã bộ lọc JavaScript do AI tạo



\-chỉ có thể sử dụng các chức năng tiện ích tích hợp sẵn (được truy cập qua _ hoặc R)

\-Tham số đầu vào: dữ liệu (mảng), mỗi mục chứa trường _index cho biết số dòng

\- Phải trả về mảng chọn ô: ``Array<{ __row_index: number, field: string }>``

\- Khi trường là "*", toàn bộ dòng được tô sáng.

\- Bị cấm sử dụng: eval, Hàm, hoạt động không đồng bộ, API DOM, yêu cầu mạng

:::

**Ví dụ**
```ts
Bộ lọc N hàng đầu
dynamicFilter = {
type: 'row\-with\-field',
description: 'Nổi bật top 3 sản phẩm có doanh số cao nhất',
code: `
const sorted = _.sortBy(data, 'sales');
const reversed = [...sorted].reverse();
const result = _.take(reversed, 3);
return _.flatten(
`_.map(result, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Lọc theo nhiều điều kiện
dynamicFilter = {
type: 'row\-with\-field',
mô tả: 'Làm nổi bật các sản phẩm có tỷ suất lợi nhuận lớn hơn 20% và doanh số vượt quá 5.000',
code: `
const matched = _.filter(data, item => {
const profitRate = (item.profit / item.sales) * 100;
return profitRate > 20 && item.sales > 5000;
});
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Bộ lọc giá trị tương đối
dynamicFilter = {   *
type: 'row\-with\-field',
mô tả: 'Làm nổi bật các sản phẩm có doanh số trên mức trung bình',
code: `
const avgSales = _.meanBy(data, 'sales');
const matched = _.filter(data, item => item.sales > avgSales);
return _.flatten(
`_.map(matched, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Bộ lọc nhóm
dynamicFilter = {
type: 'row\-with\-field',
description: 'Sản phẩm có doanh số cao nhất ở từng khu vực',
code: `
const grouped = _.groupBy(data, 'region');
const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
return _.flatten(
`_.map(topByRegion, item => [`
{ __row_index: item._index, field: 'product' },
{ __row_index: item._index, field: 'sales' }
])
);
`,
enabled: true
}

Đánh dấu toàn bộ dòng
dynamicFilter = {
mô tả: 'Đánh dấu toàn bộ các hàng có doanh số lớn hơn lợi nhuận',
code: `
const matched = _.filter(data, item => item.sales > item.profit);
`return matched.map(item => ({`
__row_index: item._index,
field: '*'
}));
`,
enabled: true
}



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

### backgroundColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu nền ô

:::

### enableBackgroundColorScale

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có bật cấu hình thang màu của màu nền hay không (thang màu)

:::

### backgroundColorScale

**Type:** `{ minValue?: number; maxValue?: number; minColor: string; maxColor: string; } | undefined`

:::note{title="Mô tả"}
Ánh xạ tỷ lệ màu nền của ô, mức độ ưu tiên cao hơn màu nền

:::


#### minValue

**Type:** `number | undefined`

:::note{title="Mô tả"}
Giá trị tối thiểu. Nếu không được định cấu hình, nó sẽ mặc định có giá trị tối thiểu trong cột dữ liệu hiện tại.

:::

#### maxValue

**Type:** `number | undefined`

:::note{title="Mô tả"}
Giá trị tối đa. Nếu không được cấu hình, nó sẽ mặc định có giá trị lớn nhất trong cột dữ liệu hiện tại.

:::

#### minColor

**Type:** `string`

:::note{title="Mô tả"}
Màu tương ứng với giá trị tối thiểu

:::

#### maxColor

**Type:** `string`

:::note{title="Mô tả"}
Màu tương ứng với giá trị lớn nhất

:::

### enableProgressBar

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có bật chức năng thanh dữ liệu nền (thanh hiển thị kích thước của ô hiện tại) hay không. Nó không được kích hoạt theo mặc định.

:::

### barPositiveColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu của thanh dữ liệu nền khi ô hiện tại là số dương

:::

### barNegativeColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu thanh dữ liệu nền khi giá trị âm

:::

### barMin

**Type:** `number | undefined`

:::note{title="Mô tả"}
Giá trị tối thiểu của thanh tiến trình



Tự động tính giá trị nhỏ nhất của cột khi không cấu hình

:::

### barMax

**Type:** `number | undefined`

:::note{title="Mô tả"}
Giá trị tối đa của thanh tiến trình



Tự động tính giá trị lớn nhất của cột khi không cấu hình

:::

### textColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu văn bản ô

:::

### textFontSize

**Type:** `number | undefined`

:::note{title="Mô tả"}
Kích thước văn bản ô

:::

### borderColor

**Type:** `string | undefined`

:::note{title="Mô tả"}
Màu đường viền ô

:::

### borderLineWidth

**Type:** `number | undefined`

:::note{title="Mô tả"}
Chiều rộng đường viền ô

:::


## indicatorsAsCol

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Liệu chỉ số có được hiển thị dưới dạng cột hay không. Khi đúng, chỉ số sẽ được mở rộng theo hướng cột; khi sai, chỉ số sẽ được mở rộng theo hướng hàng.

:::

**Ví dụ**
```ts
true




```
## totals

**Type:** `PivotTableTotals | undefined`

:::note{title="Mô tả"}
Cấu hình tổng và tổng phụ cho bảng tổng hợp



Tổng cấu hình tổng phụ cho bảng tổng hợp

:::

**Ví dụ**
```ts
{ row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }




```
### row

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title="Mô tả"}
Cấu hình tổng phụ hàng



Cấu hình tổng phụ của hàng hoặc cột

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có hiển thị tổng số (tổng hàng/cột) hay không

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có hiển thị tổng phụ hay không

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title="Mô tả"}
Thứ nguyên của tổng phụ, thứ nguyên nào được sử dụng để nhóm các tổng phụ

:::

**Ví dụ**
```ts
['category', 'region']



```
### column

**Type:** `RowOrColumnTotalConfig | undefined`

:::note{title="Mô tả"}
Tổng cấu hình tổng phụ cho các cột



Cấu hình tổng phụ của hàng hoặc cột

:::


#### showGrandTotals

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có hiển thị tổng số (tổng hàng/cột) hay không

:::

#### showSubTotals

**Type:** `boolean | undefined`

:::note{title="Mô tả"}
Có hiển thị tổng phụ hay không

:::

#### subTotalsDimensions

**Type:** `string[] | undefined`

:::note{title="Mô tả"}
Thứ nguyên của tổng phụ, thứ nguyên nào được sử dụng để nhóm các tổng phụ

:::

**Ví dụ**
```ts
['category', 'region']




```
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

