# NumFormat

## autoFormat

autoFormat

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        profit: 12342.34567,
        sales: 23453.4567,
      },
    ],
    measures: [
      {
        id: 'profit',
        autoFormat: true,
      },
      {
        id: 'sales',
        autoFormat: true,
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## fractionDigits

fractionDigits

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        num0: 123.456,
        num1: 123.456,
        num2: 123.456,
        num3: 123.456,
        num4: 123.456,
        num5: 234.567,
        num6: 234.567,
        num7: 234.567,
        num8: 345.678,
        num9: 400,
      },
    ],
    measures: [
      {
        id: 'num0',
        format: {
          type: 'number',
          fractionDigits: 0,
        },
      },
      {
        id: 'num1',
        format: {
          type: 'number',
          fractionDigits: 1,
        },
      },
      {
        id: 'num2',
        format: {
          type: 'number',
          fractionDigits: 2,
        },
      },
      {
        id: 'num3',
        format: {
          type: 'number',
          fractionDigits: 3,
        },
      },
      {
        id: 'num4',
        format: {
          type: 'number',
          fractionDigits: 4,
        },
      },
      {
        id: 'num5',
        format: {
          type: 'number',
          fractionDigits: 5,
        },
      },
      {
        id: 'num6',
        format: {
          type: 'number',
          fractionDigits: 6,
        },
      },
      {
        id: 'num7',
        format: {
          type: 'number',
          fractionDigits: 7,
        },
      },
      {
        id: 'num8',
        format: {
          type: 'number',
          fractionDigits: 8,
        },
      },
      {
        id: 'num9',
        format: {
          type: 'number',
          fractionDigits: 9,
        },
      },
    ],
    yAxis: {},
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## ratio & symbol

ratio & symbol

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        num1: 1,
        num2: 10,
        num3: 100,
        num4: 1000,
        num5: 10000,
        num6: 100000,
        num7: 1000000,
        num8: 10000000,
        num9: 100000000,
      },
    ],
    measures: [
      {
        id: 'num1',
        format: {
          type: 'number',
          fractionDigits: 0,
          ratio: 1,
          symbol: '',
        },
      },
      {
        id: 'num2',
        format: {
          type: 'number',
          fractionDigits: 0,
          ratio: 10,
          symbol: ' (Tens)',
        },
      },
      {
        id: 'num3',
        format: {
          type: 'number',
          fractionDigits: 0,
          ratio: 100,
          symbol: ' (Hundreds)',
        },
      },
      {
        id: 'num4',
        format: {
          type: 'number',
          fractionDigits: 0,
          ratio: 1000,
          symbol: 'k',
        },
      },
      {
        id: 'num5',
        format: {
          type: 'number',
          fractionDigits: 0,
          ratio: 10000,
          symbol: '10k',
        },
      },
      {
        id: 'num6',
        format: {
          type: 'number',
          fractionDigits: 0,
          ratio: 100000,
          symbol: '100k',
        },
      },
      {
        id: 'num7',
        format: {
          type: 'number',
          fractionDigits: 0,
          ratio: 1000000,
          symbol: 'M',
        },
      },
      {
        id: 'num8',
        format: {
          type: 'number',
          fractionDigits: 0,
          ratio: 10000000,
          symbol: '10M',
        },
      },
      {
        id: 'num9',
        format: {
          type: 'number',
          fractionDigits: 0,
          ratio: 100000000,
          symbol: '100M',
        },
      },
    ],
    yAxis: {
      log: true,
      logBase: 10,
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## roundingMode

roundingMode

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        num0: 123.34,
        num1: 123.38,
        num2: -123.34,
        num3: -123.38,
        num4: 123.34,
        num5: 234.38,
        num6: -234.34,
        num7: -234.38,
        num8: 4.5,
        num9: 3.5,
      },
    ],
    measures: [
      {
        id: 'num0',
        format: {
          type: 'number',
          fractionDigits: 1,
          roundingMode: 'floor',
        },
      },
      {
        id: 'num1',
        format: {
          type: 'number',
          fractionDigits: 1,
          roundingMode: 'ceil',
        },
      },
      {
        id: 'num2',
        format: {
          type: 'number',
          fractionDigits: 1,
          roundingMode: 'expand',
        },
      },
      {
        id: 'num3',
        format: {
          type: 'number',
          fractionDigits: 1,
          roundingMode: 'trunc',
        },
      },
      {
        id: 'num4',
        format: {
          type: 'number',
          fractionDigits: 1,
          roundingMode: 'halfCeil',
        },
      },
      {
        id: 'num5',
        format: {
          type: 'number',
          fractionDigits: 1,
          roundingMode: 'halfFloor',
        },
      },
      {
        id: 'num6',
        format: {
          type: 'number',
          fractionDigits: 1,
          roundingMode: 'halfExpand',
        },
      },
      {
        id: 'num7',
        format: {
          type: 'number',
          fractionDigits: 1,
          roundingMode: 'halfTrunc',
        },
      },
      {
        id: 'num8',
        format: {
          type: 'number',
          fractionDigits: 0,
          roundingMode: 'halfEven',
        },
      },
      {
        id: 'num9',
        format: {
          type: 'number',
          fractionDigits: 0,
          roundingMode: 'halfEven',
        },
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## roundingPriority

roundingPriority

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        num0: 123.456,
        num1: 123.456,
        num2: 123.456,
        num3: 123.456,
        num4: 123.456,
        num5: 234.567,
        num6: 234.567,
        num7: 234.567,
        num8: 345.678,
        num9: 1000,
      },
    ],
    measures: [
      {
        id: 'num0',
        format: {
          type: 'number',
          significantDigits: 0,
          fractionDigits: 2,
          roundingPriority: 'morePrecision',
        },
      },
      {
        id: 'num1',
        format: {
          type: 'number',
          significantDigits: 1,
          fractionDigits: 2,
          roundingPriority: 'morePrecision',
        },
      },
      {
        id: 'num2',
        format: {
          type: 'number',
          significantDigits: 2,
          fractionDigits: 2,
          roundingPriority: 'morePrecision',
        },
      },
      {
        id: 'num3',
        format: {
          type: 'number',
          significantDigits: 3,
          fractionDigits: 2,
          roundingPriority: 'morePrecision',
        },
      },
      {
        id: 'num4',
        format: {
          type: 'number',
          significantDigits: 4,
          fractionDigits: 2,
          roundingPriority: 'morePrecision',
        },
      },
      {
        id: 'num5',
        format: {
          type: 'number',
          significantDigits: 5,
          fractionDigits: 2,
          roundingPriority: 'morePrecision',
        },
      },
      {
        id: 'num6',
        format: {
          type: 'number',
          significantDigits: 6,
          fractionDigits: 2,
          roundingPriority: 'morePrecision',
        },
      },
      {
        id: 'num7',
        format: {
          type: 'number',
          significantDigits: 7,
          fractionDigits: 2,
          roundingPriority: 'morePrecision',
        },
      },
      {
        id: 'num8',
        format: {
          type: 'number',
          significantDigits: 8,
          fractionDigits: 2,
          roundingPriority: 'morePrecision',
        },
      },
      {
        id: 'num9',
        format: {
          type: 'number',
          significantDigits: 9,
          fractionDigits: 2,
          roundingPriority: 'morePrecision',
        },
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## significantDigits

significantDigits

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        num0: 123.456,
        num1: 123.456,
        num2: 123.456,
        num3: 123.456,
        num4: 123.456,
        num5: 234.567,
        num6: 234.567,
        num7: 234.567,
        num8: 345.678,
        num9: 1000,
      },
    ],
    measures: [
      {
        id: 'num0',
        format: {
          type: 'number',
          significantDigits: 0,
        },
      },
      {
        id: 'num1',
        format: {
          type: 'number',
          significantDigits: 1,
        },
      },
      {
        id: 'num2',
        format: {
          type: 'number',
          significantDigits: 2,
        },
      },
      {
        id: 'num3',
        format: {
          type: 'number',
          significantDigits: 3,
        },
      },
      {
        id: 'num4',
        format: {
          type: 'number',
          significantDigits: 4,
        },
      },
      {
        id: 'num5',
        format: {
          type: 'number',
          significantDigits: 5,
        },
      },
      {
        id: 'num6',
        format: {
          type: 'number',
          significantDigits: 6,
        },
      },
      {
        id: 'num7',
        format: {
          type: 'number',
          significantDigits: 7,
        },
      },
      {
        id: 'num8',
        format: {
          type: 'number',
          significantDigits: 8,
        },
      },
      {
        id: 'num9',
        format: {
          type: 'number',
          significantDigits: 9,
        },
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## suffix & prefix

suffix & prefix

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        num0: 123.34,
        num1: 123.38,
        num2: -123.34,
        num3: -123.38,
        num4: 123.34,
        num5: 234.38,
        num6: -234.34,
        num7: -234.38,
        num8: 4.5,
        num9: 3.5,
      },
    ],
    measures: [
      {
        id: 'num0',
        format: {
          type: 'number',
          fractionDigits: 1,
          suffix: '¥',
        },
      },
      {
        id: 'num1',
        format: {
          type: 'number',
          fractionDigits: 1,
          suffix: '$',
        },
      },
      {
        id: 'num2',
        format: {
          type: 'number',
          fractionDigits: 1,
          suffix: '!',
        },
      },
      {
        id: 'num3',
        format: {
          type: 'number',
          fractionDigits: 1,
          suffix: '-',
        },
      },
      {
        id: 'num4',
        format: {
          type: 'number',
          fractionDigits: 1,
          suffix: '+',
        },
      },
      {
        id: 'num5',
        format: {
          type: 'number',
          fractionDigits: 1,
          prefix: '¥',
        },
      },
      {
        id: 'num6',
        format: {
          type: 'number',
          fractionDigits: 1,
          prefix: '$',
        },
      },
      {
        id: 'num7',
        format: {
          type: 'number',
          fractionDigits: 1,
          prefix: '!',
        },
      },
      {
        id: 'num8',
        format: {
          type: 'number',
          fractionDigits: 0,
          prefix: '-',
        },
      },
      {
        id: 'num9',
        format: {
          type: 'number',
          fractionDigits: 0,
          prefix: '+',
        },
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## thousandSeparator

thousandSeparator

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        profit: 12344567,
        sales: 12344567,
        count: 12344567,
      },
    ],
    measures: [
      {
        id: 'profit',
        format: {
          type: 'percent',
          thousandSeparator: true,
        },
      },
      {
        id: 'sales',
        format: {
          type: 'permille',
          thousandSeparator: false,
        },
      },
      {
        id: 'count',
        format: {
          type: 'number',
          thousandSeparator: true,
        },
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## type

type

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        profit: 1234.4567,
        sales: 1234.4567,
        count: 1234.4567,
      },
    ],
    measures: [
      {
        id: 'profit',
        format: {
          type: 'percent',
        },
      },
      {
        id: 'sales',
        format: {
          type: 'permille',
        },
      },
      {
        id: 'count',
        format: {
          type: 'scientific',
        },
      },
    ],
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
