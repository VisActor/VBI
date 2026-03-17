# Boxplot

## Basic Boxplot

A boxplot showing the distribution of data based on a five-number summary.

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'boxPlot',
    dataset: [
      {
        Survived: 0,
        Sex: 'male',
        Age: 55,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 49,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 36,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 19,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 14,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 55,
      },
      {
        Survived: 0,
        Sex: 'female',
        Age: null,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 28,
      },
      {
        Survived: 0,
        Sex: 'female',
        Age: 45,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 6,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 36,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 28,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 1,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 18,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 33,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 52,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 29,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 17,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 29,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 28,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 7,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 19,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 26,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 36,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 21,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 28,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 29,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 21,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 44,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 0.42,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 34,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 16,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 30,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 28,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 26,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 36,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 47,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 31,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 13,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: null,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 19,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 18,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 22,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 17,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 40,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 36,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 1,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 18,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 28,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 58,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 28.5,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 24,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 36,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 23,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 65,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 52,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 32,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 35,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 27,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 15,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 20,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 39,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 71,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 33,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 36,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 5,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 17,
      },
      {
        Survived: 0,
        Sex: 'female',
        Age: 10,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 60,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 48,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 22,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 40.5,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 36,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 33,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 30,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 62,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 25,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 2,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: null,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 34,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 36,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 35,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 18,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 45,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 63,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 30,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 19,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 18,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: null,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 24,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 30,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 40.5,
      },
      {
        Survived: 0,
        Sex: 'female',
        Age: 24,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: null,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 34,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: 32,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 27,
      },
      {
        Survived: 1,
        Sex: 'male',
        Age: null,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 42,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 32,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 22,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 33,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 48,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 47,
      },
      {
        Survived: 1,
        Sex: 'female',
        Age: 30,
      },
      {
        Survived: 0,
        Sex: 'male',
        Age: 16,
      },
    ],
    dimensions: [
      {
        id: 'Survived',
        encoding: 'xAxis',
      },
      {
        id: 'Sex',
        encoding: 'color',
      },
    ],
    measures: [
      {
        id: 'Age',
        encoding: 'value',
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## 透视箱型图

透视箱型图

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'boxPlot',
    dataset: [
      {
        color: 'red',
        shape: 'circle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'red',
        shape: 'circle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'red',
        shape: 'circle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'red',
        shape: 'circle',
        Sex: 'male',
        v: 2,
      },
      {
        color: 'red',
        shape: 'circle',
        Sex: 'female',
        v: 5,
      },
      {
        color: 'red',
        shape: 'circle',
        Sex: 'female',
        v: 7,
      },
      {
        color: 'red',
        shape: 'circle',
        Sex: 'female',
        v: 8,
      },
      {
        color: 'red',
        shape: 'circle',
        Sex: 'female',
        v: 9,
      },
      {
        color: 'red',
        shape: 'circle',
        Sex: 'female',
        v: 10,
      },
      {
        color: 'blue',
        shape: 'circle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'circle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'circle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'circle',
        Sex: 'male',
        v: 2,
      },
      {
        color: 'blue',
        shape: 'circle',
        Sex: 'female',
        v: 5,
      },
      {
        color: 'blue',
        shape: 'circle',
        Sex: 'female',
        v: 7,
      },
      {
        color: 'blue',
        shape: 'circle',
        Sex: 'female',
        v: 8,
      },
      {
        color: 'blue',
        shape: 'circle',
        Sex: 'female',
        v: 9,
      },
      {
        color: 'red',
        shape: 'triangle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'red',
        shape: 'triangle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'red',
        shape: 'triangle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'red',
        shape: 'triangle',
        Sex: 'male',
        v: 2,
      },
      {
        color: 'red',
        shape: 'triangle',
        Sex: 'female',
        v: 5,
      },
      {
        color: 'red',
        shape: 'triangle',
        Sex: 'female',
        v: 7,
      },
      {
        color: 'red',
        shape: 'triangle',
        Sex: 'female',
        v: 8,
      },
      {
        color: 'red',
        shape: 'triangle',
        Sex: 'female',
        v: 9,
      },
      {
        color: 'blue',
        shape: 'triangle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'triangle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'triangle',
        Sex: 'male',
        v: 1,
      },
      {
        color: 'blue',
        shape: 'triangle',
        Sex: 'male',
        v: 2,
      },
      {
        color: 'blue',
        shape: 'triangle',
        Sex: 'female',
        v: 5,
      },
      {
        color: 'blue',
        shape: 'triangle',
        Sex: 'female',
        v: 7,
      },
      {
        color: 'blue',
        shape: 'triangle',
        Sex: 'female',
        v: 8,
      },
      {
        color: 'blue',
        shape: 'triangle',
        Sex: 'female',
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
      {
        id: 'Sex',
        encoding: 'xAxis',
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
