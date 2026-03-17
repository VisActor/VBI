# Brush

## enable

enable

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        value: 1,
      },
    ],
    brush: {
      enable: true,
      removeOnClick: true,
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```

## removeOnClick

removeOnClick

```tsx preview
import { VSeedRender } from '@components'

export default () => {
  const vseedConfig = {
    chartType: 'column',
    dataset: [
      {
        value: 1,
      },
    ],
    brush: {
      enable: true,
      removeOnClick: false,
    },
  }

  return <VSeedRender vseed={vseedConfig} />
}
```
