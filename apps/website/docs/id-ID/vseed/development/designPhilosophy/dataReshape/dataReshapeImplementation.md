# Implementasi pembentukan kembali data

:::info Sederhana namun cerdas
Ini adalah modul paling menarik dan inti dari VSeed. Kelihatannya rumit, namun nyatanya sangat sederhana dan cerdas, hanya dengan kurang dari 200 baris kode.

Selama Anda memanfaatkanfoldMeasures dan unfoldDimensions dengan baik, Anda dapat mengubah dimensi metrik apa pun menjadi metrik dan dimensi tetap, sehingga menghasilkan pemetaan visual yang cukup gratis.
:::

## foldMeasures

[Lokasi kode sumber](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

foldMeasures mengonversi semua metrik menjadi satu metrik, menambahkan dimensi `nama metrik` dan dimensi `ID metrik`; semua informasi yang mungkin hilang disimpan di `foldInfo`, dan statistik data dapat dilakukan selama proses ini

### Fitur

1. Fitur 1: Setelah pengukuran lipat dijalankan, hanya boleh ada satu field metrik, yaitu data yang dijelaskan oleh beberapa metrik dapat diubah menjadi satu metrik; setiap beberapa data metrik dapat berhubungan dengan satu elemen grafik
2. Fitur 2: 1. Entri data secara ketat konsisten dengan data elemen grafik (elemen geometris), dan satu bagian data berhubungan dengan satu elemen grafik.
3. Fitur 3: Proses ini melakukan statistik data

:::tip Bagian yang terbaik!!!
- `1` metrik `0` dimensi, setelah foldMeasures Anda bisa mendapatkan `1` metrik `2` dimensi (termasuk nama metrik dan Id metrik)
- `4` metrik `1` dimensi, setelah `2` kali lipatPengukuran, `2` metrik dapat diperoleh dimensi `3` (termasuk nama metrik dan ID metrik), sehingga sangat mendukung skenario seperti bagan sumbu ganda.
- `N` metrik `0` dimensi, setelah `Y` (Y ≤ N) kali lipatPengukuran, Anda bisa mendapatkan `Y` metrik dan `2` dimensi (termasuk nama metrik dan Id metrik)

:::
### Contoh minimal yang dapat dijalankan

```js title=foldMeasures
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

```json title=Output yang Diharapkan
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

[Lokasi kode sumber](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


unfoldDimensions mengubah dimensi apa pun unfoldDimensions menjadi dimensi baru tanpa kehilangan informasi, dan semua informasi tambahan disimpan di `concat`.

Dimensi terungkap lengkap == semua nilai dimensi dikonversi menjadi metrik + Pengukuran satu kali lipat

Namun, overhead yang diperlukan untuk melintasi kumpulan data sangat besar, dan foldMeasures tambahan akan menyebabkan penurunan kinerja.

foldMeasures dapat secara langsung menjamin bahwa suatu data hanya memiliki satu metrik, sehingga dapat dengan mudah digabungkan langsung pada data sumber untuk secara cerdik mencapai efek yang setara, yang pada akhirnya meningkatkan kinerja secara signifikan.

Setelah memikirkannya, secara teoritis terungkapDimensi dapat sepenuhnya digabungkan dengan pengukuran lipat, dan semua pemrosesan data dapat diselesaikan dalam satu traversal kumpulan data. Namun, demi keterbacaan dan pemeliharaan, sebaiknya jangan menggabungkannya jika tidak ada hambatan kinerja.

### Fitur

Fitur 1: Setelah unfoldDimensions dijalankan, hanya boleh ada satu field metrik.
Fitur 2: Dimensi dapat digabungkan tanpa kehilangan data aslinya

:::tip Bagian yang terbaik!!!
1. Selama dilakukan setelah pengukuran lipat, dimensi perluasan dan metrik gabungan dapat diselesaikan melalui operasi penggabungan yang paling sederhana, dan kinerjanya sangat luar biasa.
2. Setiap dimensi dapat digabungkan ke dalam field dimensi baru untuk mencapai pemetaan saluran visual.
3. Karena tidak rumit, secara teoritis dapat digabungkan dengan `foldMeasures` untuk mengurangi jumlah traversal dan meningkatkan kinerja.

:::

### Contoh minimal yang dapat dijalankan

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

```json title=Output yang Diharapkan
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
