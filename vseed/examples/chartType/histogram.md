# Histogram

## Basic Histogram

A histogram showing the frequency distribution of a dataset.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'histogram',
    dataset: [
      {
        v: 1,
      },
      {
        v: 1,
      },
      {
        v: 1,
      },
      {
        v: 2,
      },
      {
        v: 5,
      },
      {
        v: 7,
      },
      {
        v: 8,
      },
      {
        v: 9,
      },
      {
        v: 10,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 直方图增加KDE回归线

直方图增加KDE回归线

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'histogram',
    dataset: [
      {
        v: 1,
      },
      {
        v: 1,
      },
      {
        v: 1,
      },
      {
        v: 2,
      },
      {
        v: 5,
      },
      {
        v: 7,
      },
      {
        v: 8,
      },
      {
        v: 9,
      },
      {
        v: 10,
      },
    ],
    kdeRegressionLine: {
      color: 'red',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 使用分箱数据展示直方图

使用分箱数据展示直方图

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'histogram',
    dataset: [
      {
        x0: -400,
        x1: -380,
        frequency: 0,
      },
      {
        x0: -380,
        x1: -360,
        frequency: 4,
      },
      {
        x0: -360,
        x1: -340,
        frequency: 7,
      },
      {
        x0: -340,
        x1: -320,
        frequency: 7,
      },
      {
        x0: -320,
        x1: -300,
        frequency: 18,
      },
      {
        x0: -300,
        x1: -280,
        frequency: 30,
      },
      {
        x0: -280,
        x1: -260,
        frequency: 33,
      },
      {
        x0: -260,
        x1: -240,
        frequency: 80,
      },
      {
        x0: -240,
        x1: -220,
        frequency: 98,
      },
      {
        x0: -220,
        x1: -200,
        frequency: 124,
      },
      {
        x0: -200,
        x1: -180,
        frequency: 161,
      },
      {
        x0: -180,
        x1: -160,
        frequency: 176,
      },
      {
        x0: -160,
        x1: -140,
        frequency: 227,
      },
      {
        x0: -140,
        x1: -120,
        frequency: 276,
      },
      {
        x0: -120,
        x1: -100,
        frequency: 321,
      },
      {
        x0: -100,
        x1: -80,
        frequency: 452,
      },
      {
        x0: -80,
        x1: -60,
        frequency: 441,
      },
      {
        x0: -60,
        x1: -40,
        frequency: 505,
      },
      {
        x0: -40,
        x1: -20,
        frequency: 521,
      },
      {
        x0: -20,
        x1: 0,
        frequency: 733,
      },
      {
        x0: 0,
        x1: 20,
        frequency: 892,
      },
      {
        x0: 20,
        x1: 40,
        frequency: 362,
      },
      {
        x0: 40,
        x1: 60,
        frequency: 267,
      },
      {
        x0: 60,
        x1: 80,
        frequency: 223,
      },
      {
        x0: 80,
        x1: 100,
        frequency: 157,
      },
      {
        x0: 100,
        x1: 120,
        frequency: 170,
      },
      {
        x0: 120,
        x1: 140,
        frequency: 124,
      },
      {
        x0: 140,
        x1: 160,
        frequency: 112,
      },
      {
        x0: 160,
        x1: 180,
        frequency: 73,
      },
      {
        x0: 180,
        x1: 200,
        frequency: 80,
      },
      {
        x0: 200,
        x1: 220,
        frequency: 49,
      },
      {
        x0: 220,
        x1: 240,
        frequency: 33,
      },
      {
        x0: 240,
        x1: 260,
        frequency: 30,
      },
      {
        x0: 260,
        x1: 280,
        frequency: 21,
      },
      {
        x0: 280,
        x1: 300,
        frequency: 9,
      },
      {
        x0: 300,
        x1: 320,
        frequency: 13,
      },
      {
        x0: 320,
        x1: 340,
        frequency: 11,
      },
      {
        x0: 340,
        x1: 360,
        frequency: 5,
      },
      {
        x0: 360,
        x1: 380,
        frequency: 4,
      },
      {
        x0: 380,
        x1: 400,
        frequency: 4,
      },
      {
        x0: 400,
        x1: 420,
        frequency: 2,
      },
      {
        x0: 420,
        x1: 440,
        frequency: 8,
      },
      {
        x0: 440,
        x1: 460,
        frequency: 2,
      },
      {
        x0: 460,
        x1: 480,
        frequency: 3,
      },
      {
        x0: 480,
        x1: 500,
        frequency: 10,
      },
      {
        x0: 500,
        x1: 520,
        frequency: 7,
      },
      {
        x0: 520,
        x1: 540,
        frequency: 14,
      },
      {
        x0: 540,
        x1: 560,
        frequency: 6,
      },
      {
        x0: 560,
        x1: 580,
        frequency: 1,
      },
      {
        x0: 580,
        x1: 600,
        frequency: 3,
      },
      {
        x0: 600,
        x1: 620,
        frequency: 0,
      },
      {
        x0: 620,
        x1: 640,
        frequency: 6,
      },
      {
        x0: 640,
        x1: 660,
        frequency: 5,
      },
      {
        x0: 660,
        x1: 680,
        frequency: 3,
      },
      {
        x0: 680,
        x1: 700,
        frequency: 2,
      },
      {
        x0: 700,
        x1: 720,
        frequency: 0,
      },
    ],
    measures: [
      {
        id: 'x0',
        encoding: 'x0',
      },
      {
        id: 'x1',
        encoding: 'x1',
      },
      {
        id: 'frequency',
        encoding: 'yAxis',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 透视直方图

透视直方图

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'histogram',
    dataset: [
      {
        color: 'red',
        shape: 'circle',
        v: 1,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 1,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 1,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 2,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 5,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 7,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 8,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 9,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 10,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 2,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 5,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 7,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 8,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 9,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 1,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 1,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 1,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 2,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 5,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 7,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 8,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 9,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 2,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 5,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 7,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 8,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 9,
      },
    ],
    dimensions: [
      {
        id: 'color',
        encoding: 'row',
      },
      {
        id: 'shape',
        encoding: 'column',
      },
    ],
    measures: [
      {
        id: 'v',
        encoding: 'value',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 透视直方图显示累计概率密度函数

透视直方图显示累计概率密度函数

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'histogram',
    dataset: [
      {
        color: 'red',
        shape: 'circle',
        v: 1,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 3,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 4,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 5,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 5,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 6,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 7,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 7,
      },
      {
        color: 'red',
        shape: 'circle',
        v: 10,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 2,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 3,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 3,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 4,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 5,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 7,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 9,
      },
      {
        color: 'blue',
        shape: 'circle',
        v: 9,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 1,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 2,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 3,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 4,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 5,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 7,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 8,
      },
      {
        color: 'red',
        shape: 'triangle',
        v: 9,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 2,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 3,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 4,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 4,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 5,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 7,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 8,
      },
      {
        color: 'blue',
        shape: 'triangle',
        v: 9,
      },
    ],
    dimensions: [
      {
        id: 'color',
        encoding: 'row',
      },
      {
        id: 'shape',
        encoding: 'column',
      },
    ],
    measures: [
      {
        id: 'v',
        encoding: 'value',
      },
    ],
    ecdfRegressionLine: {
      type: 'ecdf',
      color: 'red',
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
