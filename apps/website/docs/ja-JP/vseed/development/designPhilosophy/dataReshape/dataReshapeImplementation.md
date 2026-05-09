# データリシェイプ - 実装

:::info シンプルで巧妙
これは VSeed で最も面白く、最も中核的なモジュールです。複雑に見えますが、実際には非常にシンプルかつ巧妙で、コードは 200 行にも満たません。

`foldMeasures` と `unfoldDimensions` をうまく使えば、任意のメジャーとディメンションを固定されたメジャーとディメンションへ変換でき、十分に自由な可視化マッピングを実現できます。
:::

## foldMeasures

[ソースコード位置](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

foldMeasures はすべてのメジャーを 1 つのメジャーへ `fold` し、`メジャー名ディメンション` と `メジャーId` ディメンションを追加します。失われる可能性のある情報はすべて `foldInfo` に保存され、この過程でデータ統計も行えます。

### 特性

1. 特性 1: foldMeasures の実行後は必ずメジャーフィールドが 1 つだけになります。つまり、複数メジャーで記述されたデータをすべて 1 つのメジャーに変換し、任意の複数メジャーデータを 1 つの図形要素に対応させられます。
2. 特性 2: データ行と図形要素（ジオメトリ要素）のデータは厳密に一致し、1 行のデータが 1 つの図形要素に対応します。
3. 特性 3: この過程でデータ統計を行います。

:::tip 最も巧妙な点!!!
- `1` 個のメジャーと `0` 個のディメンションは、foldMeasures 後に `1` 個のメジャーと `2` 個のディメンション（メジャー名とメジャーIdを含む）を得られます。
- `4` 個のメジャーと `1` 個のディメンションは、`2` 回の foldMeasures 後に `2` 個のメジャーと `3` 個のディメンション（メジャー名とメジャーIdを含む）を得られ、二軸チャートなどのシーンを自然にサポートできます。
- `N` 個のメジャーと `0` 個のディメンションは、`Y` (Y ≤ N) 回の foldMeasures 後に、`Y` 個のメジャーと `2` 個のディメンション（メジャー名とメジャーIdを含む）を得られます。

:::
### 最小実行可能サンプル

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

```json title=期待される出力
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

[ソースコード位置](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


unfoldDimensions は情報を失わずに、任意のディメンションを新しい 1 つのディメンションへ `concat` します。追加された情報はすべて `unfoldInfo` に保存されます。

完全な unfoldDimensions == すべてのディメンション値をメジャーへ変換 + 1 回の foldMeasures

ただし dataset を走査するコストは大きく、余分な foldMeasures を 1 回行うだけでも性能低下につながります。

foldMeasures は 1 行のデータにメジャーが 1 つだけであることを直接保証できます。そのため、元データ上で単純な結合を行うだけで同等の効果を巧みに実現でき、最終的に性能を大幅に向上できます。

検討上、理論的には unfoldDimensions と foldMeasures を完全に統合し、1 回の dataset 走査ですべてのデータ処理を完了できます。ただし可読性と保守性のため、性能ボトルネックがない限り、現時点では統合しません。

### 特性

特性 1: unfoldDimensions の実行後は必ずメジャーフィールドが 1 つだけになります。
特性 2: 元データを失わずにディメンションを結合できます。

:::tip 最も巧妙な点!!!
1. foldMeasures の後に実行すれば、最も単純な concat 操作だけでディメンションの展開とメジャーの結合を完了でき、非常に高い性能を得られます。
2. 任意のディメンションをまったく新しいディメンションフィールドへ結合でき、任意の視覚チャネルマッピングを実現できます。
3. それ自体は複雑ではないため、理論上は `foldMeasures` と統合して走査回数を減らし、性能を向上できます。

:::

### 最小実行可能サンプル

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

```json title=期待される出力
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
