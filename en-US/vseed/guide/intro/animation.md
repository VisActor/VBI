# Animation

VSeed animation supports appear, loop, ambient, update, and exit stages. This guide combines bar, line/area, pie, radar, and scatter examples in one place so you can compare the animation configuration across chart types.

## Bar / Column Animation

All examples are based on the large-screen (dark) theme and provide a dropdown to switch between different themes.
Themes are loaded from: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json`

### 1. Appear Animation

Appear animation is the motion played when a chart first enters the view.
For bar/column series, the appear effect currently supports `growth`.

#### 1.1 growth

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const THEME_URL = 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json'
const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

const DIMENSIONS = [
  { id: 'HqlYadRdHJ5c', alias: 'Category' },
  { id: '7ti8XuX4kcY1', alias: 'Year' },
]
const MEASURES = [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }]

const useLargeScreenThemes = () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch(THEME_URL)
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        const firstKey = Object.keys(remote)[0] || ''
        setThemeKey(firstKey)
      })
      .catch(() => {})
  }, [])
  return { themes, themeKey, setThemeKey }
}

const ThemeSelect = ({ themes, themeKey, onChange }) => (
  <select
    value={themeKey}
    onChange={(e) => onChange(e.target.value)}
    style={{
      marginBottom: 12,
      color: '#EAF7FF',
      background: 'rgba(0, 213, 255, 0.18)',
      border: '1px solid rgba(0, 213, 255, 0.45)',
      padding: '6px 12px',
    }}
  >
    {Object.entries(themes).map(([key, value]) => (
      <option key={key} value={key} style={{ color: '#000' }}>
        {value?.name || key}
      </option>
    ))}
  </select>
)

export default () => {
  const { themes, themeKey, setThemeKey } = useLargeScreenThemes()
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'columnParallel',
    dataset: DATASET,
    dimensions: DIMENSIONS,
    measures: MEASURES,
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['growth'], ease: 'circInOut', duration: 1 },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <ThemeSelect themes={themes} themeKey={themeKey} onChange={setThemeKey} />
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

### 2. Loop Animation

Loop animation is the continuous motion after initial rendering, useful for emphasis and dynamic rhythm.

#### 2.1 highlight (group highlight) + atmo (ambient effect)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'columnParallel',
    dataset: DATASET,
    dimensions: [
      { id: 'HqlYadRdHJ5c', alias: 'Category' },
      { id: '7ti8XuX4kcY1', alias: 'Year' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 },
        loop: {
          enable: true,
          interval: 3,
          loop: { enable: true, effects: ['highLight'], ease: 'linear', duration: 1 },
          atmo: { effect: 'breath', ease: 'linear', color: '#4A90E2' },
        },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 2.2 growth (loop) + atmo (ambient effect)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'barParallel',
    dataset: DATASET,
    dimensions: [
      { id: 'HqlYadRdHJ5c', alias: 'Category' },
      { id: '7ti8XuX4kcY1', alias: 'Year' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 },
        loop: {
          enable: true,
          interval: 2,
          loop: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 },
          atmo: { effect: 'breath', ease: 'linear', color: '#4A90E2' },
        },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 2.3 moveIn (loop) + atmo (ambient effect)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'columnParallel',
    dataset: DATASET,
    dimensions: [
      { id: 'HqlYadRdHJ5c', alias: 'Category' },
      { id: '7ti8XuX4kcY1', alias: 'Year' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 },
        loop: {
          enable: true,
          interval: 2,
          loop: { enable: true, effects: ['moveIn'], ease: 'linear', duration: 1 },
          atmo: { effect: 'breath', ease: 'linear', color: '#4A90E2' },
        },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

## Line / Area Animation

All examples are based on the large-screen (dark) theme and provide a dropdown to switch between different themes.
Themes are loaded from: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json`

### 1. Appear Animation

Appear animation introduces the chart when it first enters the page.

#### 1.1 load

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes, Builder } from '@visactor/vseed'

const THEME_URL = 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json'
const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

const DIMENSIONS = [
  { id: 'HqlYadRdHJ5c', alias: 'Category' },
  { id: '7ti8XuX4kcY1', alias: 'Year' },
]
const MEASURES = [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }]

const useLargeScreenThemes = () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    Builder.updateSpec('line', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    Builder.updateSpec('area', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    Builder.updateSpec('areaPercent', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    fetch(THEME_URL)
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  return { themes, themeKey, setThemeKey }
}

const ThemeSelect = ({ themes, themeKey, onChange }) => (
  <select
    value={themeKey}
    onChange={(e) => onChange(e.target.value)}
    style={{
      marginBottom: 12,
      color: '#EAF7FF',
      background: 'rgba(0, 213, 255, 0.18)',
      border: '1px solid rgba(0, 213, 255, 0.45)',
      padding: '6px 12px',
    }}
  >
    {Object.entries(themes).map(([key, value]) => (
      <option key={key} value={key} style={{ color: '#000' }}>
        {value?.name || key}
      </option>
    ))}
  </select>
)

export default () => {
  const { themes, themeKey, setThemeKey } = useLargeScreenThemes()
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'line',
    dataset: DATASET,
    dimensions: DIMENSIONS,
    measures: MEASURES,
    label: { enable: false },
    animation: {
      enable: true,
      params: { appear: { enable: true, effects: ['load'], ease: 'circInOut', duration: 1 } },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <ThemeSelect themes={themes} themeKey={themeKey} onChange={setThemeKey} />
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 1.2 growth

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes, Builder } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    Builder.updateSpec('line', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    Builder.updateSpec('area', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    Builder.updateSpec('areaPercent', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'area',
    dataset: DATASET,
    dimensions: [
      { id: 'HqlYadRdHJ5c', alias: 'Category' },
      { id: '7ti8XuX4kcY1', alias: 'Year' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: { appear: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 } },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

### 2. Loop Animation

Loop animation keeps the chart in a cyclic motion for long-running display states.

#### 2.1 load + atmo (breath)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes, Builder } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    Builder.updateSpec('line', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    Builder.updateSpec('area', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    Builder.updateSpec('areaPercent', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'line',
    dataset: DATASET,
    dimensions: [
      { id: 'HqlYadRdHJ5c', alias: 'Category' },
      { id: '7ti8XuX4kcY1', alias: 'Year' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['load'], ease: 'linear', duration: 1 },
        loop: {
          enable: true,
          interval: 2,
          loop: { enable: true, effects: ['load'], ease: 'linear', duration: 1 },
          atmo: { effect: 'breath', ease: 'linear' },
        },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 2.2 load + atmo (ripple)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes, Builder } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    Builder.updateSpec('line', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    Builder.updateSpec('area', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    Builder.updateSpec('areaPercent', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
    }))
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'areaPercent',
    dataset: DATASET,
    dimensions: [
      { id: 'HqlYadRdHJ5c', alias: 'Category' },
      { id: '7ti8XuX4kcY1', alias: 'Year' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 },
        loop: {
          enable: true,
          interval: 3,
          loop: { enable: true, effects: ['load'], ease: 'circInOut', duration: 1 },
          atmo: { effect: 'ripple', ease: 'linear' },
        },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

## Pie / Donut / Rose Animation

All examples are based on the large-screen (dark) theme and provide a dropdown to switch between different themes.
Themes are loaded from: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json`

### 1. Appear Animation

Appear animation controls how sectors first enter the view.

#### 1.1 radial

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const THEME_URL = 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json'
const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

const DIMENSIONS = [{ id: 'HqlYadRdHJ5c', alias: 'Category' }]
const MEASURES = [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }]

const useLargeScreenThemes = () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch(THEME_URL)
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  return { themes, themeKey, setThemeKey }
}

const ThemeSelect = ({ themes, themeKey, onChange }) => (
  <select
    value={themeKey}
    onChange={(e) => onChange(e.target.value)}
    style={{
      marginBottom: 12,
      color: '#EAF7FF',
      background: 'rgba(0, 213, 255, 0.18)',
      border: '1px solid rgba(0, 213, 255, 0.45)',
      padding: '6px 12px',
    }}
  >
    {Object.entries(themes).map(([key, value]) => (
      <option key={key} value={key} style={{ color: '#000' }}>
        {value?.name || key}
      </option>
    ))}
  </select>
)

export default () => {
  const { themes, themeKey, setThemeKey } = useLargeScreenThemes()
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'pie',
    dataset: DATASET,
    dimensions: DIMENSIONS,
    measures: MEASURES,
    label: { enable: false },
    animation: {
      enable: true,
      params: { appear: { enable: true, effects: ['radial'], ease: 'circInOut', duration: 1 } },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <ThemeSelect themes={themes} themeKey={themeKey} onChange={setThemeKey} />
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 1.2 scale

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'donut',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: { appear: { enable: true, effects: ['scale'], ease: 'circInOut', duration: 1 } },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

### 2. Loop Animation

Loop animation keeps emphasizing sectors in a periodic way.

#### 2.1 enlarge

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'pie',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['scale'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 2, loop: { enable: true, effects: ['enlarge'], ease: 'linear', duration: 1 } },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 2.2 relocate

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'pie',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['radial'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 2, loop: { enable: true, effects: ['relocate'], ease: 'linear', duration: 1 } },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

## Radar Animation

All examples are based on the large-screen (dark) theme and provide a dropdown to switch between different themes.
Themes are loaded from: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json`

### 1. Appear Animation

Appear animation controls the first entrance of radar polygons and points.

#### 1.1 radial

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes, Builder } from '@visactor/vseed'

const THEME_URL = 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json'
const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

const DIMENSIONS = [{ id: 'HqlYadRdHJ5c', alias: 'Category' }]
const MEASURES = [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }]

const useLargeScreenThemes = () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    Builder.updateSpec('radar', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
      axes: [
        {
          orient: 'radius',
          tick: { forceTickCount: 3 },
          grid: { smooth: false, style: { stroke: 'rgba(255,255,255,0.15)', lineWidth: 1 } },
          label: { visible: false, style: { fontFamily: 'D-DIN' } },
        },
        {
          orient: 'angle',
          sampling: false,
          tick: { visible: true, style: () => ({ visible: false }) },
          domainLine: { style: { visible: false } },
          grid: { style: () => ({ stroke: 'rgba(255,255,255,0.15)', lineDash: [2, 1], lineWidth: 1 }) },
          label: { style: { fontFamily: 'D-DIN', fill: 'rgba(255,255,255,0.65)', fontSize: 12 }, visible: true },
        },
      ],
    }))
    fetch(THEME_URL)
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  return { themes, themeKey, setThemeKey }
}

const ThemeSelect = ({ themes, themeKey, onChange }) => (
  <select
    value={themeKey}
    onChange={(e) => onChange(e.target.value)}
    style={{
      marginBottom: 12,
      color: '#EAF7FF',
      background: 'rgba(0, 213, 255, 0.18)',
      border: '1px solid rgba(0, 213, 255, 0.45)',
      padding: '6px 12px',
    }}
  >
    {Object.entries(themes).map(([key, value]) => (
      <option key={key} value={key} style={{ color: '#000' }}>
        {value?.name || key}
      </option>
    ))}
  </select>
)

export default () => {
  const { themes, themeKey, setThemeKey } = useLargeScreenThemes()
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'radar',
    dataset: DATASET,
    dimensions: DIMENSIONS,
    measures: MEASURES,
    label: { enable: false },
    animation: {
      enable: true,
      params: { appear: { enable: true, effects: ['radial'], ease: 'circInOut', duration: 1 } },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <ThemeSelect themes={themes} themeKey={themeKey} onChange={setThemeKey} />
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 1.2 scale

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes, Builder } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    Builder.updateSpec('radar', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
      axes: [
        {
          orient: 'radius',
          tick: { forceTickCount: 3 },
          grid: { smooth: false, style: { stroke: 'rgba(255,255,255,0.15)', lineWidth: 1 } },
          label: { visible: false, style: { fontFamily: 'D-DIN' } },
        },
        {
          orient: 'angle',
          sampling: false,
          tick: { visible: true, style: () => ({ visible: false }) },
          domainLine: { style: { visible: false } },
          grid: { style: () => ({ stroke: 'rgba(255,255,255,0.15)', lineDash: [2, 1], lineWidth: 1 }) },
          label: { style: { fontFamily: 'D-DIN', fill: 'rgba(255,255,255,0.65)', fontSize: 12 }, visible: true },
        },
      ],
    }))
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'radar',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: { appear: { enable: true, effects: ['scale'], ease: 'circInOut', duration: 1 } },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

### 2. Loop Animation

Radar loop animation is expressed through `atmo.effect` for continuous ambient motion.

#### 2.1 none + atmo (ripple)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes, Builder } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    Builder.updateSpec('radar', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
      axes: [
        {
          orient: 'radius',
          tick: { forceTickCount: 3 },
          grid: { smooth: false, style: { stroke: 'rgba(255,255,255,0.15)', lineWidth: 1 } },
          label: { visible: false, style: { fontFamily: 'D-DIN' } },
        },
        {
          orient: 'angle',
          sampling: false,
          tick: { visible: true, style: () => ({ visible: false }) },
          domainLine: { style: { visible: false } },
          grid: { style: () => ({ stroke: 'rgba(255,255,255,0.15)', lineDash: [2, 1], lineWidth: 1 }) },
          label: { style: { fontFamily: 'D-DIN', fill: 'rgba(255,255,255,0.65)', fontSize: 12 }, visible: true },
        },
      ],
    }))
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'radar',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['radial'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 2, atmo: { effect: 'ripple', ease: 'linear' } },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 2.2 none + atmo (reveal)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes, Builder } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    Builder.updateSpec('radar', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
      axes: [
        {
          orient: 'radius',
          tick: { forceTickCount: 3 },
          grid: { smooth: false, style: { stroke: 'rgba(255,255,255,0.15)', lineWidth: 1 } },
          label: { visible: false, style: { fontFamily: 'D-DIN' } },
        },
        {
          orient: 'angle',
          sampling: false,
          tick: { visible: true, style: () => ({ visible: false }) },
          domainLine: { style: { visible: false } },
          grid: { style: () => ({ stroke: 'rgba(255,255,255,0.15)', lineDash: [2, 1], lineWidth: 1 }) },
          label: { style: { fontFamily: 'D-DIN', fill: 'rgba(255,255,255,0.65)', fontSize: 12 }, visible: true },
        },
      ],
    }))
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'radar',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['scale'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 3, atmo: { effect: 'reveal', ease: 'linear' } },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 2.3 none + atmo (breath)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes, Builder } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    Builder.updateSpec('radar', (spec) => ({
      ...spec,
      point: { ...spec.point, style: { ...(spec.point && spec.point.style), lineWidth: 0, stroke: null } },
      axes: [
        {
          orient: 'radius',
          tick: { forceTickCount: 3 },
          grid: { smooth: false, style: { stroke: 'rgba(255,255,255,0.15)', lineWidth: 1 } },
          label: { visible: false, style: { fontFamily: 'D-DIN' } },
        },
        {
          orient: 'angle',
          sampling: false,
          tick: { visible: true, style: () => ({ visible: false }) },
          domainLine: { style: { visible: false } },
          grid: { style: () => ({ stroke: 'rgba(255,255,255,0.15)', lineDash: [2, 1], lineWidth: 1 }) },
          label: { style: { fontFamily: 'D-DIN', fill: 'rgba(255,255,255,0.65)', fontSize: 12 }, visible: true },
        },
      ],
    }))
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'radar',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['scale'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 2, atmo: { effect: 'breath', ease: 'linear' } },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

## Scatter Animation

All examples are based on the large-screen (dark) theme and provide a dropdown to switch between different themes.
Themes are loaded from: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json`

### 1. Appear Animation

Appear animation controls how scatter points first appear.

#### 1.1 scale

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const THEME_URL = 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json'
const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

const DIMENSIONS = [{ id: 'HqlYadRdHJ5c', alias: 'Category' }]
const MEASURES = [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }]

const useLargeScreenThemes = () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch(THEME_URL)
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  return { themes, themeKey, setThemeKey }
}

const ThemeSelect = ({ themes, themeKey, onChange }) => (
  <select
    value={themeKey}
    onChange={(e) => onChange(e.target.value)}
    style={{
      marginBottom: 12,
      color: '#EAF7FF',
      background: 'rgba(0, 213, 255, 0.18)',
      border: '1px solid rgba(0, 213, 255, 0.45)',
      padding: '6px 12px',
    }}
  >
    {Object.entries(themes).map(([key, value]) => (
      <option key={key} value={key} style={{ color: '#000' }}>
        {value?.name || key}
      </option>
    ))}
  </select>
)

export default () => {
  const { themes, themeKey, setThemeKey } = useLargeScreenThemes()
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'scatter',
    dataset: DATASET,
    dimensions: DIMENSIONS,
    measures: MEASURES,
    label: { enable: false },
    animation: {
      enable: true,
      params: { appear: { enable: true, effects: ['scale'], ease: 'circInOut', duration: 1 } },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <ThemeSelect themes={themes} themeKey={themeKey} onChange={setThemeKey} />
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 1.2 fadeIn

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'scatter',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: { appear: { enable: true, effects: ['fadeIn'], ease: 'circInOut', duration: 1 } },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

### 2. Loop Animation

Scatter loop animation is typically expressed with `atmo` for continuous rhythm.

#### 2.1 none + atmo (ripple)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'scatter',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['scale'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 2, atmo: { effect: 'ripple', ease: 'linear' } },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 2.2 none + atmo (breath)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'scatter',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['fadeIn'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 2, atmo: { effect: 'breath', ease: 'linear' } },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```

#### 2.3 none + atmo (reveal)

```tsx preview
import { useEffect, useState } from 'react'
import { VSeedRender } from '@components'
import { registerTokenThemes } from '@visactor/vseed'

const DATASET = [
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 24,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Labels',
    Tn97A7q0XVDq: 24,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Tables',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 40,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 40,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 20,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Storage',
    Tn97A7q0XVDq: 20,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 10,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Furn',
    Tn97A7q0XVDq: 10,
    '7ti8XuX4kcY1': '2022',
  },
  {
    10001: 'Sales',
    10002: 50,
    10003: 'Tn97A7q0XVDq',
    30001: '2023',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 50,
    '7ti8XuX4kcY1': '2023',
  },
  {
    10001: 'Sales',
    10002: 30,
    10003: 'Tn97A7q0XVDq',
    30001: '2022',
    HqlYadRdHJ5c: 'Art',
    Tn97A7q0XVDq: 30,
    '7ti8XuX4kcY1': '2022',
  },
]

export default () => {
  const [themes, setThemes] = useState({})
  const [themeKey, setThemeKey] = useState('')
  useEffect(() => {
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json')
      .then((r) => r.json())
      .then((remote) => {
        const registry = {}
        Object.entries(remote).forEach(([key, value]) => {
          const colors = value?.colors || []
          registry[key] = {
            baseTheme: 'dark',
            colorScheme: colors.length >= 2 ? colors : [colors[0] || '#00D5FF', '#227BFF'],
            linearColorScheme: [colors[0] || '#003B73', colors[1] || '#00D5FF'],
            textPrimary: '#EAF7FF',
            textSecondary: '#8FC7FF',
            borderColor: 'rgba(82, 191, 255, 0.28)',
            surfaceColor: '#071A33',
            tooltipBackgroundColor: 'rgba(5, 18, 38, 0.92)',
            axisGridColor: 'rgba(82, 191, 255, 0.18)',
            accentColor: colors[0] || '#00D5FF',
          }
        })
        registerTokenThemes(registry, { ensureRegisterAll: false })
        setThemes(remote)
        setThemeKey(Object.keys(remote)[0] || '')
      })
      .catch(() => {})
  }, [])
  if (!themeKey) return null
  const vseedConfig = {
    theme: themeKey,
    chartType: 'scatter',
    dataset: DATASET,
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: 'Category' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: 'Sales' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['scale'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 3, atmo: { effect: 'reveal', ease: 'linear' } },
      },
    },
  }
  return (
    <div style={{ padding: 16, background: '#061A33' }}>
      <select
        value={themeKey}
        onChange={(e) => setThemeKey(e.target.value)}
        style={{
          marginBottom: 12,
          color: '#EAF7FF',
          background: 'rgba(0, 213, 255, 0.18)',
          border: '1px solid rgba(0, 213, 255, 0.45)',
          padding: '6px 12px',
        }}
      >
        {Object.entries(themes).map(([key, value]) => (
          <option key={key} value={key} style={{ color: '#000' }}>
            {value?.name || key}
          </option>
        ))}
      </select>
      <VSeedRender vseed={vseedConfig} />
    </div>
  )
}
```
