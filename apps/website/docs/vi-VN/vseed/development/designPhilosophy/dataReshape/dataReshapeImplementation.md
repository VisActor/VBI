# Định hình lại dữ liệu-triển khai

:::info Đơn giản mà thông minh
Đây là mô-đun cốt lõi và thú vị nhất của VSeed. Nhìn có vẻ phức tạp nhưng thực chất nó rất đơn giản và thông minh, chỉ có chưa đầy 200 dòng mã.

Miễn là bạn sử dụng tốt các Kích thước gấp và Kích thước mở ra, bạn có thể chuyển đổi bất kỳ kích thước chỉ số nào thành các chỉ số và kích thước cố định, đạt được ánh xạ trực quan đủ tự do.
:::

## foldMeasures

[Vị trí mã nguồn](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

FoldMeasures chuyển đổi tất cả các chỉ số `fold`thành một chỉ số, thêm thứ nguyên `chiều tên chỉ số`và `ID chỉ số`, tất cả thông tin còn thiếu có thể được lưu trữ trong `foldInfo`và thống kê dữ liệu có thể được thực hiện trong quá trình này

### Tính năng

1. Tính năng 1: Sau khi thực thi các biện pháp gấp, chỉ được có một trường chỉ số, tức là dữ liệu được mô tả bởi nhiều chỉ số có thể được chuyển đổi thành một chỉ số; bất kỳ dữ liệu đa chỉ số nào cũng có thể tương ứng với một phần tử đồ họa
2. Tính năng 2: 1. Các mục nhập dữ liệu hoàn toàn nhất quán với dữ liệu của các thành phần đồ họa (thành phần hình học) và một phần dữ liệu tương ứng với một thành phần đồ họa.
3. Tính năng 3: Quá trình này thực hiện thống kê dữ liệu

:::tip Phần hay nhất!!!
- `1``0`chỉ số kích thước, sau khi gấpCác biện pháp bạn có thể nhận được `1``2`chỉ số kích thước (bao gồm tên chỉ số và Id chỉ số)
- Có thể thu được `4``1`chỉ số kích thước, sau `2`lần gấpCác biện pháp, `2``3`chỉ số kích thước (bao gồm tên chỉ số và ID chỉ số), do đó hỗ trợ hoàn hảo các kịch bản như biểu đồ hai trục.
- `N`Chỉ số`0`Kích thước, sau `Y`(Y ≤ N) gấpCác biện pháp, `Y`Chỉ số và `2`Kích thước (bao gồm tên chỉ số và ID chỉ số) có thể thu được

:::
### Ví dụ có thể chạy tối thiểu

```js title="foldMeasures"
const data = [
  { category: 'A', sales: 100, profit: 30 },
  { category: 'B', sales: 200, profit: 50 },
]

const measures = [
  { id: 'sales', alias: 'Sales' },
  { id: 'profit', alias: 'Profit' },
]

function foldMeasures(dataset, measures, options) {
  const {
    measureId,
    measureName,
    measureValue,
    colorMeasureId,
    allowEmptyFold = true,
  } = options || {}

  const foldInfo = {
    measureId,
    measureName,
    measureValue,
    statistics: {
      max: -Infinity,
      min: Infinity,
      sum: 0,
      count: 0,
      colorMin: Infinity,
      colorMax: -Infinity,
    },
    foldMap: {},
  }

  const ids = measures.map(m => m.id)
  const result = []

  for (const row of dataset) {
    for (const measure of measures) {
      const { id, alias } = measure
      const newRow = { ...row }

      // 删除其他指标字段，避免重复
      for (const key of ids) {
        delete newRow[key]
      }

      newRow[measureId] = id
      newRow[measureName] = alias || id
      newRow[measureValue] = row[id]

      if (colorMeasureId) {
        const colorValue = row[colorMeasureId]
        newRow.color = colorValue
        foldInfo.statistics.colorMin = Math.min(foldInfo.statistics.colorMin, Number(colorValue))
        foldInfo.statistics.colorMax = Math.max(foldInfo.statistics.colorMax, Number(colorValue))
      }

      const val = Number(row[id])
      foldInfo.statistics.min = Math.min(foldInfo.statistics.min, val)
      foldInfo.statistics.max = Math.max(foldInfo.statistics.max, val)
      foldInfo.statistics.sum += val
      foldInfo.statistics.count++

      foldInfo.foldMap[id] = alias

      result.push(newRow)
    }
  }

  return { dataset: result, foldInfo }
}

const { dataset: foldedData, foldInfo } = foldMeasures(data, measures, {
  measureId: '__MeaId__',
  measureName: '__MeaName__',
  measureValue: '__MeaValue__',
})

console.log(foldedData)
```

```json title="Đầu ra mong đợi"
[
  {
    "category": "A",
    "__MeaId__": "sales",
    "__MeaName__": "Sales",
    "__MeaValue__": 100
  },
  {
    "category": "A",
    "__MeaId__": "profit",
    "__MeaName__": "Profit",
    "__MeaValue__": 30
  },
  {
    "category": "B",
    "__MeaId__": "sales",
    "__MeaName__": "Sales",
    "__MeaValue__": 200
  },
  {
    "category": "B",
    "__MeaId__": "profit",
    "__MeaName__": "Profit",
    "__MeaValue__": 50
  }
]
```

## unfoldDimensions

[Vị trí mã nguồn](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


mở raDimensions chuyển đổi bất kỳ thứ nguyên `concat`nào thành thứ nguyên mới mà không làm mất thông tin và tất cả thông tin bổ sung được lưu trữ trong `unfoldInfo`.

Kích thước mở ra hoàn chỉnh == tất cả các giá trị kích thước được chuyển đổi thành chỉ số + một số đo

Tuy nhiên, chi phí duyệt qua tập dữ liệu là rất lớn và một FoldMeasures dư thừa sẽ làm giảm hiệu suất.

FoldMeasures có thể trực tiếp đảm bảo rằng một phần dữ liệu chỉ có một chỉ số, do đó, nó có thể chỉ cần hợp nhất trực tiếp trên dữ liệu nguồn để đạt được hiệu quả tương đương một cách khéo léo, cuối cùng là cải thiện đáng kể hiệu suất.

Sau khi suy nghĩ về điều đó, về mặt lý thuyết, các Kích thước mở ra có thể được hợp nhất hoàn toàn với các Biện pháp gấp và tất cả quá trình xử lý dữ liệu có thể được hoàn thành trong một lần duyệt tập dữ liệu. Tuy nhiên, để dễ đọc và bảo trì, dự kiến ​​không hợp nhất nó khi không có tắc nghẽn về hiệu suất.

### Tính năng

Tính năng 1: Sau khi thực thi các Kích thước mở rộng, chỉ được có một trường chỉ số.
Tính năng 2: Có thể hợp nhất các kích thước mà không làm mất dữ liệu gốc

:::tip Phần hay nhất!!!
1. Miễn là nó được thực hiện sau các biện pháp gấp, các kích thước mở rộng và các chỉ số đã hợp nhất có thể được hoàn thành thông qua thao tác nối đơn giản nhất và hiệu suất cực kỳ xuất sắc.
2. Bất kỳ thứ nguyên nào cũng có thể được hợp nhất vào trường thứ nguyên mới để đạt được bất kỳ ánh xạ kênh hình ảnh nào.
3. Vì nó không phức tạp nên về mặt lý thuyết nó có thể được hợp nhất với `foldMeasures`để giảm số lần truyền tải và cải thiện hiệu suất.

:::

### Ví dụ có thể chạy tối thiểu

```js
const XEncoding = '__DimX__'
const ColorEncoding = '__DimColor__'
/**
 * 展开并合并视觉通道的维度, 在foldMeasures后合并维度, 所以不需要进行笛卡尔积
 * @param {Array<Object>} dataset 原始数据集
 * @param {Array<Object>} dimensions 维度数组，每个维度对象至少包含 id 字段
 * @param {Object} encoding 编码对象，key为通道名，value为维度id数组
 * @param {Object} options 配置项
 *  - foldMeasureId: 折叠指标的字段名
 *  - separator: 维度值拼接分隔符
 *  - colorItemAsId: 是否只用颜色项作为 colorId，默认 false
 * @returns {Object} { dataset, unfoldInfo }
 */
function unfoldDimensions(dataset, dimensions, encoding, options) {
  const { foldMeasureId, separator, colorItemAsId } = options || {}

  const unfoldInfo = {
    encodingX: XEncoding,
    encodingColor: ColorEncoding,

    colorItems: [],
    colorIdMap: {},
  }

  // 根据 encoding 过滤对应维度
  const xDimensions = encoding.x ? dimensions.filter(d => encoding.x.includes(d.id)) : []
  const colorDimensions = encoding.color ? dimensions.filter(d => encoding.color.includes(d.id)) : []

  const colorItemsSet = new Set()
  const colorIdMap = {}

  for (let i = 0; i < dataset.length; i++) {
    const datum = dataset[i]

    applyEncoding(XEncoding, xDimensions, datum, separator)
    applyEncoding(ColorEncoding, colorDimensions, datum, separator)

    const measureId = String(datum[foldMeasureId])
    const colorItem = String(datum[ColorEncoding])
    colorItemsSet.add(colorItem)
  }

  unfoldInfo.colorItems = Array.from(colorItemsSet)

  return {
    dataset,
    unfoldInfo,
  }
}

/**
 * 应用编码至数据中, 原地修改 datum
 * @param {string} encoding 编码字段名
 * @param {Array<Object>} dimensions 维度数组
 * @param {Object} datum 单条数据
 * @param {string} separator 拼接分隔符
 */
function applyEncoding(encoding, dimensions, datum, separator) {
  if (encoding && dimensions.length) {
    datum[encoding] = dimensions.map(dim => String(datum[dim.id])).join(separator)
  }
}


const dataset = [
  { "category": "A", "__MeaId__": "sales",  "__MeaName__":  "Sales",  "__MeaValue__": 100 },
  { "category": "A", "__MeaId__": "profit", "__MeaName__": "Profit",  "__MeaValue__": 30  },
  { "category": "B", "__MeaId__": "sales",  "__MeaName__":  "Sales",  "__MeaValue__": 200 },
  { "category": "B", "__MeaId__": "profit", "__MeaName__": "Profit",  "__MeaValue__": 50  }
]
const dimensions = [
  { id: 'category'},
  { id: '__MeaName__'},
]

const encoding = {
  x: ['category'],
  color: ['__MeaName__'],
}

const options = {
  foldMeasureId: '__MeaId__',
  separator: '-',
  colorItemAsId: false,
}

const { dataset: unfoldedData, unfoldInfo } = unfoldDimensions(dataset, dimensions, encoding, options)

console.log(unfoldedData)


```

```json title="Đầu ra mong đợi"
[
  {
    "category": "A",
    "__MeaId__": "sales",
    "__MeaName__": "Sales",
    "__MeaValue__": 100,
    "__DimX__": "A",
    "__DimColor__": "Sales"
  },
  {
    "category": "A",
    "__MeaId__": "profit",
    "__MeaName__": "Profit",
    "__MeaValue__": 30,
    "__DimX__": "A",
    "__DimColor__": "Profit"
  },
  {
    "category": "B",
    "__MeaId__": "sales",
    "__MeaName__": "Sales",
    "__MeaValue__": 200,
    "__DimX__": "B",
    "__DimColor__": "Sales"
  },
  {
    "category": "B",
    "__MeaId__": "profit",
    "__MeaName__": "Profit",
    "__MeaValue__": 50,
    "__DimX__": "B",
    "__DimColor__": "Profit"
  }
]
```
