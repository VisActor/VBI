# Data reshaping-implementation

:::info Simple yet clever
This is the most interesting and core module of VSeed. It seems complicated, but in fact it is very simple and clever, with only less than 200 lines of code.

As long as you make good use of foldMeasures and unfoldDimensions, you can convert any measure dimensions into fixed measures and dimensions, achieving sufficiently free visual mapping.
:::

## foldMeasures

[Source code location](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

foldMeasures converts all measures `fold` into one measure, adds a `measure name dimension` and a `measure ID` dimension, all possible missing information is stored in `foldInfo`, and data statistics can be performed in this process

### Features

1. Feature 1: After foldMeasures is executed, there must be only one measure field, that is, the data Descriptiond by multiple measures can be converted into one measure; any multiple measure data can correspond to one graphic element
2. Feature 2: 1. The data entries are strictly consistent with the data of the graphic elements (geometric elements), and one piece of data corresponds to one graphic element.
3. Feature 3: This process performs data statistics

:::tip The best part!!!
- `1` measures and `0` dimensions. After foldMeasures, you can get `1` measures and `2` dimensions (including measure name and measure ID).
- `4` measures and `1` dimensions. After `2` foldMeasures, `2` measures and `3` dimensions can be obtained (including measure names and measure IDs), thus perfectly supporting scenarios such as dual-axis charts.
- `N` measures and `0` dimensions. After `Y` (Y ≤ N) foldMeasures, `Y` measures and `2` dimensions can be obtained (including measure names and measure IDs)

:::
### Minimal runnable example

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

```json title="Expected Output"
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

[Source code location](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


unfoldDimensions converts any dimension `concat` into a new dimension without losing information, and all added information is stored in `unfoldInfo`.

A complete unfoldDimensions == all dimension values converted to measures + one foldMeasures

But the overhead of traversing the dataset is huge, and one redundant foldMeasures will cause performance degradation.

foldMeasures can directly guarantee that a piece of data has only one measure, so it can simply merge directly on the source data to cleverly achieve equivalent effects, ultimately greatly improving performance.

After thinking about it, theoretically unfoldDimensions can be completely merged with foldMeasures, and all data processing can be completed in one dataset traversal. However, for the sake of readability and maintainability, it is tentative to not merge it when there is no performance bottleneck.

### Features

Feature 1: After unfoldDimensions is executed, there must be only one measure field.
Feature 2: Dimensions can be merged without losing the original data

:::tip The best part!!!
1. As long as it is performed after foldMeasures, the expansion dimensions and merged measures can be completed through the simplest concat operation, and the performance is extremely excellent.
2. Any dimensions can be merged into a new dimension field to achieve any visual channel mapping.
3. Because it is not complicated, it can theoretically be merged with `foldMeasures` to reduce the number of traversals and improve performance.

:::

### Minimal runnable example

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

```json title="Expected Output"
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
