# 데이터 리쉐이프 - 구현

:::info 간단하면서도 교묘함
VSeed에서 가장 흥미롭고 핵심적인 모듈로, 복잡해 보이지만 실제로는 매우 간단하고 교묘하며, 200줄 미만의 코드로 이루어져 있습니다.

foldMeasures와 unfoldDimensions를 잘 활용하면 임의의 측정값 차원을 고정된 측정값과 차원으로 변환하여 충분히 자유로운 시각화 매핑을 할 수 있습니다.
:::

## foldMeasures

[소스 코드 위치](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

foldMeasures는 모든 측정값을 하나의 측정값으로 `fold`하고, `측정값 이름 차원`과 `측정값 Id 차원`을 추가합니다. 손실될 수 있는 모든 정보는 `foldInfo`에 저장되며, 이 과정에서 데이터 통계를 수행할 수 있습니다.

### 특징

1. 특징1: foldMeasures 실행 후에는 반드시 1개의 측정값 필드만 존재합니다. 즉, 여러 측정값으로 설명된 데이터를 모두 1개의 측정값으로 변환할 수 있으며, 임의의 여러 측정값 데이터를 하나의 그래픽 요소에 대응시킵니다.
2. 특징2: 데이터 항목과 그래픽 요소(기하 요소)의 데이터가 엄격하게 일치하며, 하나의 데이터가 하나의 그래픽 요소에 대응됩니다.
3. 특징3: 이 과정에서 데이터 통계가 수행됩니다.

:::tip 가장 교묘한 점!!!
- `1`개 측정값 `0`개 차원, foldMeasures 후 `1`개 측정값 `2`개 차원(측정값 이름 및 측정값 Id 포함)을 얻을 수 있습니다.
- `4`개 측정값 `1`개 차원, `2`회 foldMeasures 후 `2`개 측정값 `3`개 차원(측정값 이름 및 측정값 Id 포함)을 얻을 수 있어, 이중 축 차트 등의 시나리오를 완벽하게 지원할 수 있습니다.
- `N`개 측정값 `0`개 차원, `Y`(Y ≤ N)회 foldMeasures 후 `Y`개 측정값과 `2`개 차원(측정값 이름 및 측정값 Id 포함)을 얻을 수 있습니다.

:::
### 최소 실행 가능 예제

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

```json title=예상 출력
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

[소스 코드 위치](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


unfoldDimensions는 정보 손실 없이 임의의 차원을 새로운 차원으로 `concat`하며, 추가된 모든 정보는 `unfoldInfo`에 저장됩니다.

하나의 완전한 unfoldDimensions == 모든 차원 값을 측정값으로 변환 + 한 번의 foldMeasures

그러나 dataset을 순회하는 비용은 크며, 불필요한 foldMeasures 한 번은 성능 저하를 초래할 수 있습니다.

foldMeasures는 하나의 데이터에 하나의 측정값만 있음을 직접 보장하므로, 원본 데이터에서 단순히 병합만으로도 교묘하게 동등한 효과를 얻을 수 있으며, 결과적으로 성능이 크게 향상됩니다.

고려해 본 결과, 이론적으로 unfoldDimensions는 foldMeasures와 완전히 병합되어 한 번의 dataset 순회로 모든 데이터 처리를 완료할 수 있지만, 가독성과 유지보수성을 위해 성능 병목이 없는 한 현재는 병합하지 않기로 했습니다.

### 특징

특징1: unfoldDimensions 실행 후에는 반드시 1개의 측정값 필드만 존재합니다.
특징2: 원본 데이터를 손실하지 않고 차원을 병합할 수 있습니다.

:::tip 가장 교묘한 점!!!
1. foldMeasures 후에만 수행하면 가장 간단한 concat 작업을 통해 차원 확장과 측정값 병합을 완료할 수 있으며, 성능이 매우 뛰어납니다.
2. 임의의 차원을 완전히 새로운 차원 필드로 병합하여 임의의 시각적 채널 매핑을 할 수 있습니다.
3. 자체적으로 복잡하지 않기 때문에 이론적으로 `foldMeasures`와 병합하여 순회 횟수를 줄이고 성능을 향상시킬 수 있습니다.

:::

### 최소 실행 가능 예제

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

```json title=예상 출력
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
