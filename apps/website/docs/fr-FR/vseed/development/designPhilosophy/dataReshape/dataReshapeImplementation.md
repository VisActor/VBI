# Remodelage des données-implémentation

:::info Simple mais astucieux
Il s'agit du module le plus intéressant et essentiel du VSeed. Cela semble compliqué, mais en fait c'est très simple et astucieux, avec seulement moins de 200 lignes de code.

Tant que vous faites bon usage defoldMeasures et unfoldDimensions, vous pouvez convertir n'importe quelle dimension d'mesure en mesures et dimensions fixes, obtenant ainsi une cartographie visuelle suffisamment libre.
:::

## foldMeasures

[Emplacement du code source](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

foldMeasures Convertissez tous les mesures `fold` en un seul mesure, ajoutez une dimension `dimension du nom de mesure` et une dimension `ID de mesure`, toutes les informations manquantes possibles sont stockées dans `foldInfo`, et des statistiques de données peuvent être effectuées dans ce processus

### caractéristiques

1. Caractéristique 1 : Une fois FoldMeasures exécuté, il ne doit y avoir qu'un seul champ d'mesure, c'est-à-dire que les données décrites par plusieurs mesures peuvent être converties en un seul mesure ; toute donnée d'mesure multiple peut correspondre à un élément graphique
2. Caractéristique 2 : 1. Les saisies de données sont strictement cohérentes avec les données des éléments graphiques (éléments géométriques), et une donnée correspond à un élément graphique.
3. Caractéristique 3 : Ce processus effectue des statistiques de données

:::tip Le meilleur endroit !!!
- `1` mesures`0`dimensions, après foldMeasures, vous pouvez obtenir `1` mesures`2`dimensions (y compris le nom de l'mesure et l'ID de l'mesure)
- `4` mesures `1` dimensions, après `2` fois les temps de pliage, `2` les mesures peuvent être obtenus `3` dimensions (y compris le nom de l'mesure et l'ID de l'mesure), qui peuvent parfaitement prendre en charge des scénarios tels que les graphiques à deux axes.
- `N` mesures`0` dimensions, après `Y`(Y ≤ N) fois pliéMesures, vous pouvez obtenir les mesures `Y` et les `2` dimensions (y compris le nom de l'mesure et l'ID de l'mesure)

:::
### Exemple exécutable minimal

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

```json title="résultat attendu"
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

[Emplacement du code source](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


unfoldDimensions Convertissez n'importe quelle dimension `concat` en une nouvelle dimension sans perdre d'informations, et toutes les informations ajoutées sont stockées dans `unfoldInfo`.

Un unfoldDimensions complet == toutes les valeurs de dimension converties en mesures + un FoldMeasures

Mais la surcharge liée au parcours de dataset est énorme, et un foldMeasures redondant entraînera une dégradation des performances.

foldMeasures peut directement garantir qu'une donnée n'a qu'un seul mesure. Par conséquent, une simple fusion peut être effectuée directement sur les données sources pour obtenir intelligemment des effets équivalents, améliorant ainsi considérablement les performances.

Après y avoir réfléchi, théoriquement unfoldDimensions peut être complètement fusionné avecfoldMeasures, et tout le traitement des données peut être effectué en une seule traversée dataset. Cependant, pour des raisons de lisibilité et de maintenabilité, il n'est temporairement pas fusionné lorsqu'il n'y a pas de goulot d'étranglement en termes de performances.

### caractéristiques

Caractéristique 1 : après l'exécution de unfoldDimensions, il ne doit y avoir qu'un seul champ mesure. 
Fonctionnalité 2 : Les dimensions peuvent être fusionnées sans perdre les données d'origine

:::tip Le meilleur endroit !!!
1. Tant qu'elle est effectuée après FoldMeasures, les dimensions d'expansion et les mesures fusionnés peuvent être complétés par l'opération concat la plus simple, et les performances sont extrêmement excellentes.
2. Toutes les dimensions peuvent être fusionnées dans un nouveau champ de dimension pour obtenir n'importe quel mappage de canal visuel.
3. Parce que ce n'est pas compliqué, il peut théoriquement être fusionné avec `foldMeasures` pour réduire le nombre de parcours et améliorer les performances.

:::

### Exemple exécutable minimal

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

```json title="résultat attendu"
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
