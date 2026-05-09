# Datenumgestaltung - Realisierung

:::info Einfach und subtil
Das ist das Interessanteste an VSeed, Es ist auch das Kernmodul, Scheinbar komplex, Es ist eigentlich sehr einfach und genial., Weniger als 200 Codezeilen.

Nutzen Sie einfach die Vorteile von foldMeasures und unfoldDimensions, Jede metrische Dimension kann, In feste Metriken und Dimensionen umwandeln, Machen Sie visuelle Zuordnungen frei genug.
:::

## foldMeasures

[Quellcodeposition](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

foldMeasures Alle Metriken kombinieren `fold` Ist ein Indikator, Eine hinzufügen`Indikatorenname Dimension`und eine`Indikator-ID`Dimension, Alle möglichen fehlenden Informationen werden im`foldInfo`Innen, und Statistiken können dabei durchgeführt werden.

### Funktionen

1. Merkmal 1: Nach Ausführung von foldMeasures, Es darf nur 1 metrisches Feld vorhanden sein, Das heißt, Daten, die mehrere Indikatoren beschreiben können, Alle in 1 Metrik umgerechnet; Ordnen Sie beliebige Multi-Index-Daten einem Primitiv zu
2. Eigenschaften 2: 1. Die Dateneingabe ist genau gleich wie die Daten des Primitiven (geometrisches Element), und ein Daten entspricht einem Primitiven
3. Merkmal 3: Der Prozess ist statistisch

:::tip Das Beste daran!!!
- `1`Metriken`0`Dimension (en), foldMeasures Sie können es erhalten, nachdem`1`Metriken`2`Abmessungen (einschließlich Metrikname und Metrik-ID)
- `4`Metriken`1`Dimension (en), Via`2`Erhalten nach FoldMeasures`2`Metriken`3`Abmessungen (einschließlich Metrikname und Metrik-ID), Somit ist es perfekt, um Szenarien wie biaxiale Diagramme zu unterstützen.
- `N`Metriken`0`Dimension (en), Via`Y`(Y ≤ N)Nach der nächsten foldMeasures, Verfügbar`Y`Metriken und`2`Abmessungen (einschließlich Metrikname und Metrik-ID)

:::
### Minimal Runnable Beispiele

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

```json title=Erwarteter Output
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

[Quellcodeposition](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)


unfoldDimensions Ohne Informationen zu verlieren, Willkürliche Dimension wird `concat` für eine neue Dimension, Alle hinzugefügten Informationen werden im`unfoldInfo`innerhalb.

a full unfoldDimensions = = alle Dimensionswert-Konvertierungsmetriken + one foldMeasures

Aber die Kosten für die Durchquerung des Datensatzes sind enorm., Eine zusätzliche FoldMeasures kann zu Leistungseinbußen führen.

foldMeasures Sie können direkt garantieren, dass es nur einen Indikator für ein Datenelement gibt, So ist es möglich, ein einfaches Zusammenführen direkt auf den Quelldaten durchzuführen, können Sie auf subtile Weise den äquivalenten Effekt erzielen., und letztlich die Leistung deutlich verbessern.

Nachdenklich, theoretisch entfaltenDimensionen können vollständig mit foldMeasures zusammengeführt werden, Schließen Sie die gesamte Datenverarbeitung in einem Datensatzdurchlauf ab, aber für Lesbarkeit und Wartbarkeit, Ohne Leistungsengpässe, Vorübergehend nicht zusammengeführt.

### Funktionen

Merkmal 1: Nach der Ausführung von unfoldDimensions, Es darf nur 1 metrisches Feld vorhanden sein, 
Funktion 2: Kann ohne Verlust von Originaldaten verwendet werden, Abmessungen zusammenführen

:::tip Das Beste daran!!!
1. Einfach nach foldMeasures machen, mit der einfachsten CONCAT-Operation., um die Dimension zu erweitern und die Metriken zusammenzuführen, Äußerst gute Leistung.
2. Jede Dimension kann zu einem neuen Dimensionsfeld zusammengeführt werden, Führen Sie eine visuelle Kanalzuordnung durch.
3. Weil es an sich nicht kompliziert ist., Es ist also theoretisch möglich, `foldMeasures` Zusammenführen, Verringern Sie die Anzahl der Durchläufe, Verbessern Sie die Leistung.

:::

### Minimal Runnable Beispiele

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

```json title=Erwarteter Output
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
