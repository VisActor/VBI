# 数据标注

## 数据点标注

通过 `annotationPoint` 属性配置数据点标注，支持配置筛选条件 `selector` 和展示文本 `text`。

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

        text: '数据点标注',
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

## 数据水平线标注

通过 `annotationHorizontalLine` 属性配置水平线标注，需要指定 `yValue` 数值。

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
        text: '利润 70',
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

## 数据垂直线标注

通过 `annotationVerticalLine` 属性配置垂直线标注，支持通过 `selector` 指定维度值。

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
        text: '23年',
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

## 数据区域标注

通过 `annotationArea` 属性配置区域标注，可以配置起始和结束条件的 `selector`。

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
          text: '22~23年',
          textPosition: 'top',
          textAlign: 'center',
        },
        {
          selector: [{ date: '2022' }],
          text: '22~23年',
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
