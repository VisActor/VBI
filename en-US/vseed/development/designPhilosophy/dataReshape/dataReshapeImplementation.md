# Data Reshape-Implementation

:::info Simple Yet Ingenious
This is the most interesting and core module of VSeed. It seems complex, but it is actually very simple and ingenious, consisting of less than 200 lines of code.

As long as `foldMeasures` and `unfoldDimensions` are properly utilized, any Measures and Dimensions can be converted to fixed Measures and Dimensions, achieving highly flexible visual mapping.
:::

## foldMeasures

[Source Code Location](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/foldMeasures.ts)

`foldMeasures` folds all Measures into one measure, adding a `Measure Name Dimension` and a `Measure ID Dimension`. Any potentially lost information is stored in `foldInfo`, and data statistics can also be computed during this process.

### Features

1. Feature 1: After `foldMeasures` finishes executing, there will be exactly 1 measure field. This means data described by multiple measures can all be converted to 1 measure; mapping any multiple measures data to exactly one graphic element.
2. Feature 2: A data item is strictly consistent with the graphic element (geometric element)'s data. One data item corresponds to one graphic element.
3. Feature 3: Data statistics are computed during this process.

:::tip The Most Ingenious Part!!!

- `1` measure `0` dimensions -> After `foldMeasures`, you get `1` measure and `2` dimensions (including Measure Name and Measure ID).
- `4` measures `1` dimension -> After `2` passes of `foldMeasures`, you can get `2` measures and `3` dimensions (including Measure Name and Measure ID), which perfectly supports scenarios like Dual Axis Charts.
- `N` measures `0` dimensions -> After `Y` (Y ≤ N) passes of `foldMeasures`, you can get `Y` measures and `2` dimensions (including Measure Name and Measure ID).

:::

### Minimal Runnable Example

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

      // Delete other Measure fields to avoid duplication
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

```json title=Expected Output
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

[Source Code Location](https://github.com/VisActor/VSeed/blob/main/packages/vseed/src/dataReshape/unfoldDimensions.ts)

`unfoldDimensions` concatenates any subset of Dimensions into a new Dimension without losing any information. All newly added information is stored in `unfoldInfo`.

A complete `unfoldDimensions` == Converting all Dimension values to Measures + One `foldMeasures` pass.

However, the cost of iterating over the dataset is significant. An extra `foldMeasures` pass would result in performance degradation.

Because `foldMeasures` inherently guarantees that one data item holds precisely one measure, we can directly apply a simple merge exclusively on the source data. This cleanly achieves the equivalent effect, ultimately scaling performance substantially.

Upon further consideration, theoretically, `unfoldDimensions` and `foldMeasures` could be fully merged to complete all data processing within a single dataset iteration. However, for the sake of readability and maintainability, they are tentatively kept apart when there is no performance bottleneck.

### Features

Feature 1: After `unfoldDimensions` is executed, there is strictly 1 measure field remaining.
Feature 2: It can merge Dimensions without losing the original data structure.

:::tip The Most Ingenious Part!!!

1. As long as it proceeds after `foldMeasures`, you can achieve the expansion of Dimensions and merging of Measures via a simple concat operation, yielding outstanding performance.
2. Arbitrary Dimensions can be merged together to form an entirely new Dimension field, empowering infinitely flexible visual channel mappings.
3. Since it is not complex intrinsically, it can theoretically be stitched seamlessly onto `foldMeasures` to diminish traversal passes and bolster performance.

:::

### Minimal Runnable Example

```js
const XEncoding = '__DimX__'
const ColorEncoding = '__DimColor__'
/**
 * Unfolds and merges Dimensions of visual channels. It executes after foldMeasures, so a Cartesian product is not needed.
 * @param {Array<Object>} dataset The original dataset
 * @param {Array<Object>} dimensions An array of Dimensions where each dimension object contains at least an id field
 * @param {Object} encoding Encoding object, where the key is the channel name and the value is an array of Dimension IDs
 * @param {Object} options Configuration items
 *  - foldMeasureId: The field name for the folded measures
 *  - separator: The separator to stitch dimension values
 *  - colorItemAsId: Whether to exclusively use the Color item as the colorId, default false
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

  // Filter corresponding Dimensions based on the given encoding
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
 * Applies encoding to the data by mutating datum directly
 * @param {string} encoding The encoding field name
 * @param {Array<Object>} dimensions Array of Dimensions
 * @param {Object} datum A single data item
 * @param {string} separator Stitching separator
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

```json title=Expected Output
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
