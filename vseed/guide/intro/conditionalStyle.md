# 条件样式

## 矩形图元样式

通过 `barStyle` 属性配置矩形图元的样式。数组中第一项为默认样式，后续项为条件样式，满足 `selector` 条件的数据将应用对应的样式。

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
      chartType: 'column',
      dataset: [
        { date: '2019', profit: 10, sales: 100 },
        { date: '2020', profit: 30, sales: 200 },
        { date: '2021', profit: 30, sales: 300 },
        { date: '2022', profit: 50, sales: 400 },
        { date: '2023', profit: 40, sales: 500 },
        { date: '2024', profit: 70, sales: 100 },
      ],
      barStyle: [
        {
          barRadius: 10,
          barColorOpacity: 0.25,
        },
        {
          selector: {
            field: 'sales',
            op: '>',
            value: 400,
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
          barColorOpacity: 1,
          barRadius: 0,
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

## 点图元样式

通过 `pointStyle` 属性配置点图元的样式，同样支持条件样式配置。

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
      chartType: 'line',
      dataset: [
        { date: '2019', profit: 10, sales: 100 },
        { date: '2020', profit: 30, sales: 200 },
        { date: '2021', profit: 30, sales: 300 },
        { date: '2022', profit: 50, sales: 400 },
        { date: '2023', profit: 40, sales: 500 },
        { date: '2024', profit: 70, sales: 100 },
      ],
      pointStyle: [
        {
          pointSize: 10,
          pointColorOpacity: 0.25,
        },
        {
          selector: {
            field: 'profit',
            op: '>',
            value: 40,
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
          pointColorOpacity: 1,
          pointSize: 20,
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

## 线图元样式

通过 `lineStyle` 属性配置线图元的样式。

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
      chartType: 'line',
      dataset: [
        { date: '2019', profit: 10, sales: 100 },
        { date: '2020', profit: 30, sales: 200 },
        { date: '2021', profit: 30, sales: 300 },
        { date: '2022', profit: 50, sales: 400 },
        { date: '2023', profit: 40, sales: 500 },
        { date: '2024', profit: 70, sales: 100 },
      ],
      lineStyle: [
        {
          lineWidth: 2,
          lineColorOpacity: 0.25,
          lineSmooth: true,
        },
        {
          selector: {
            field: 'profit',
            op: '>',
            value: 40,
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
          lineColorOpacity: 1,
          lineWidth: 5,
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

## 面图元样式

通过 `areaStyle` 属性配置面图元的样式。

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
      areaStyle: [
        {
          areaColorOpacity: 0.2,
        },
        {
          selector: {
            field: 'profit',
            op: '>',
            value: 40,
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
          areaColorOpacity: 1,
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
