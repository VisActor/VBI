# Data Annotations

## Data Point Annotation

Configure data point annotations via the `annotationPoint` property. Supports a `selector` filter condition and a display `text`.

```tsx direction=vertical playground
import { useRef, useEffect } from 'react'
import VChart from '@visactor/vchart'
import { registerAll, VSeed, Builder } from '@visactor/vseed'
registerAll()

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const vseed: VSeed = {
      chartType: 'area',
      dataset: [
        { date: '2019', profit: 10, sales: 100 },
        { date: '2020', profit: 30, sales: 200 },
        { date: '2021', profit: 30, sales: 300 },
        { date: '2022', profit: 50, sales: 400 },
        { date: '2023', profit: 40, sales: 500 },
        { date: '2024', profit: 70, sales: 100 },
      ],
      annotationPoint: {
        selector: {
          field: 'profit',
          op: '>',
          value: 10,
        },
        // selector: {
        //   field: 'sales',
        //   op: '>=',
        //   value: 400,
        // },
        // selector: 30,
        // selector: [40,30,50],
        // selector: { date:"2019" },
        // selector: [{ date:"2019" },{ date:"2020", profit: 30 }],

        text: 'Data point annotation',
      },
    }

    const spec = Builder.from(vseed).build()

    const vchart = new VChart(spec, { dom: ref.current })
    vchart.renderSync()

    return () => vchart.release()
  })

  return <div ref={ref} style={{ height: 260, width: '100%' }}></div>
}

export default Demo
```

## Horizontal Line Annotation

Configure horizontal line annotations via the `annotationHorizontalLine` property. Requires a `yValue` number.

```tsx direction=vertical {23-26}
import { useRef, useEffect } from 'react'
import VChart from '@visactor/vchart'
import { registerAll, VSeed, Builder } from '@visactor/vseed'
registerAll()

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const vseed: VSeed = {
      chartType: 'area',
      dataset: [
        { date: '2019', profit: 10, sales: 100 },
        { date: '2020', profit: 30, sales: 200 },
        { date: '2021', profit: 30, sales: 300 },
        { date: '2022', profit: 50, sales: 400 },
        { date: '2023', profit: 40, sales: 500 },
        { date: '2024', profit: 70, sales: 100 },
      ],
      annotationHorizontalLine: {
        yValue: 170,
        text: 'Profit 70',
      },
    }

    const spec = Builder.from(vseed).build()

    const vchart = new VChart(spec, { dom: ref.current })
    vchart.renderSync()

    return () => vchart.release()
  })

  return <div ref={ref} style={{ height: 260, width: '100%' }}></div>
}

export default Demo
```

## Vertical Line Annotation

Configure vertical line annotations via the `annotationVerticalLine` property. Supports specifying a dimension value via `selector`.

```tsx direction=vertical {25-28}
import { useRef, useEffect } from 'react'
import VChart from '@visactor/vchart'
import { registerAll, VSeed, Builder } from '@visactor/vseed'
registerAll()

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const vseed: VSeed = {
      chartType: 'columnParallel',
      dataset: [
        { date: '2019', profit: 10, sales: 100 },
        { date: '2020', profit: 30, sales: 200 },
        { date: '2021', profit: 30, sales: 300 },
        { date: '2022', profit: 50, sales: 400 },
        { date: '2023', profit: 40, sales: 500 },
        { date: '2024', profit: 70, sales: 100 },
      ],
      annotationVerticalLine: {
        selector: '2023',
        text: 'Year 2023',
      },
    }

    const spec = Builder.from(vseed).build()

    const vchart = new VChart(spec, { dom: ref.current })
    vchart.renderSync()

    return () => vchart.release()
  })

  return <div ref={ref} style={{ height: 260, width: '100%' }}></div>
}

export default Demo
```

## Area Annotation

Configure area annotations via the `annotationArea` property. You can configure `selector` conditions for the start and end of the annotated region.

```tsx direction=vertical {25-38}
import { useRef, useEffect } from 'react'
import VChart from '@visactor/vchart'
import { registerAll, VSeed, Builder } from '@visactor/vseed'
registerAll()

const Demo = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const vseed: VSeed = {
      chartType: 'columnParallel',
      dataset: [
        { date: '2019', profit: 10, sales: 100 },
        { date: '2020', profit: 30, sales: 200 },
        { date: '2021', profit: 30, sales: 300 },
        { date: '2022', profit: 50, sales: 400 },
        { date: '2023', profit: 40, sales: 500 },
        { date: '2024', profit: 70, sales: 100 },
      ],
      annotationArea: [
        {
          selector: [{ date: '2021' }],
          text: '2021~2022',
          textPosition: 'top',
          textAlign: 'center',
        },
        {
          selector: [{ date: '2022' }],
          text: '2022~2023',
          textPosition: 'top',
          textAlign: 'center',
        },
      ],
    }

    const spec = Builder.from(vseed).build()

    const vchart = new VChart(spec, { dom: ref.current })
    vchart.renderSync()

    return () => vchart.release()
  })

  return <div ref={ref} style={{ height: 260, width: '100%' }}></div>
}

export default Demo
```
