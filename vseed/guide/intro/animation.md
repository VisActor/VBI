# 动画

VSeed 动画能力支持入场、轮播、氛围、更新与离场等阶段。下面将柱图、折线/面积、饼图、雷达图和散点图的动画示例合并展示，便于对比不同图表类型的配置方式。

## 柱图/条形图动画

所有示例均基于大屏主题（暗色），并提供主题列表用于切换不同的主题。
主题列表来源：`https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json`

### 1. 入场动画

入场动画是指图表首次渲染时的动画，用于建立视觉节奏、吸引注意力。\
当前柱/条图系列的入场动画支持 `growth`。

#### 1.1 growth（生长）

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
  { id: 'HqlYadRdHJ5c', alias: '类目' },
  { id: '7ti8XuX4kcY1', alias: '年份' },
]
const MEASURES = [{ id: 'Tn97A7q0XVDq', alias: '销售额' }]

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

### 2. 轮播动画

轮播动画是指图表在完成入场后持续循环执行的动画，用于强调重点或保持动态感。

#### 2.1 highlight（分组高亮） + atmosphere（氛围效果）

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
      { id: 'HqlYadRdHJ5c', alias: '类目' },
      { id: '7ti8XuX4kcY1', alias: '年份' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 },
        loop: {
          enable: true,
          interval: 3,
          loop: { enable: true, effects: ['highLight'], ease: 'linear', duration: 1 },
          atmosphere: { effect: 'breath', ease: 'linear', color: '#4A90E2' },
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

#### 2.2 growth（生长轮播） + atmosphere（氛围效果）

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
      { id: 'HqlYadRdHJ5c', alias: '类目' },
      { id: '7ti8XuX4kcY1', alias: '年份' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 },
        loop: {
          enable: true,
          interval: 2,
          loop: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 },
          atmosphere: { effect: 'breath', ease: 'linear', color: '#F5A623' },
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

#### 2.3 moveIn（移入轮播） + atmosphere（氛围效果）

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
      { id: 'HqlYadRdHJ5c', alias: '类目' },
      { id: '7ti8XuX4kcY1', alias: '年份' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 },
        loop: {
          enable: true,
          interval: 2,
          loop: { enable: true, effects: ['moveIn'], ease: 'linear', duration: 1 },
          atmosphere: { effect: 'breath', ease: 'linear', color: '#7ED321' },
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

## 折线图/面积图动画

所有示例均基于大屏主题（暗色），并提供主题列表用于切换不同的主题。
主题列表来源：`https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json`

### 1. 入场动画

入场动画用于图表首次进入页面时的视觉引导。

#### 1.1 load（加载）

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
  { id: 'HqlYadRdHJ5c', alias: '类目' },
  { id: '7ti8XuX4kcY1', alias: '年份' },
]
const MEASURES = [{ id: 'Tn97A7q0XVDq', alias: '销售额' }]

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

#### 1.2 growth（生长）

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
      { id: 'HqlYadRdHJ5c', alias: '类目' },
      { id: '7ti8XuX4kcY1', alias: '年份' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
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

### 2. 轮播动画

轮播动画用于图表持续循环播放，增强动态表达。

#### 2.1 load（加载轮播） + atmosphere（氛围效果：breath）

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
      { id: 'HqlYadRdHJ5c', alias: '类目' },
      { id: '7ti8XuX4kcY1', alias: '年份' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['load'], ease: 'linear', duration: 1 },
        loop: {
          enable: true,
          interval: 2,
          loop: { enable: true, effects: ['load'], ease: 'linear', duration: 1 },
          atmosphere: { effect: 'breath', ease: 'linear' },
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

#### 2.2 load（加载轮播） + atmosphere（氛围效果：ripple）

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
      { id: 'HqlYadRdHJ5c', alias: '类目' },
      { id: '7ti8XuX4kcY1', alias: '年份' },
    ],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['growth'], ease: 'linear', duration: 1 },
        loop: {
          enable: true,
          interval: 3,
          loop: { enable: true, effects: ['load'], ease: 'circInOut', duration: 1 },
          atmosphere: { effect: 'ripple', ease: 'linear' },
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

## 饼图/环图/玫瑰图动画

所有示例均基于大屏主题（暗色），并提供主题列表用于切换不同的主题。
主题列表来源：`https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json`

### 1. 入场动画

入场动画用于扇区首次进入视图时的表现。

#### 1.1 radial（径向）

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

const DIMENSIONS = [{ id: 'HqlYadRdHJ5c', alias: '类目' }]
const MEASURES = [{ id: 'Tn97A7q0XVDq', alias: '销售额' }]

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

#### 1.2 scale（缩放）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
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

### 2. 轮播动画

轮播动画用于循环强调某些扇区。

#### 2.1 enlarge（改变尺寸）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
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

#### 2.2 relocate（改变中心）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
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

## 雷达图动画

所有示例均基于大屏主题（暗色），并提供主题列表用于切换不同的主题。
主题列表来源：`https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json`

### 1. 入场动画

入场动画用于雷达面与节点的首次展示。

#### 1.1 radial（径向）

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

const DIMENSIONS = [{ id: 'HqlYadRdHJ5c', alias: '类目' }]
const MEASURES = [{ id: 'Tn97A7q0XVDq', alias: '销售额' }]

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

#### 1.2 scale（缩放）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
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

### 2. 轮播动画

雷达图轮播动画通过 `atmosphere.effect` 提供持续氛围。

#### 2.1 none（轮播） + atmosphere（氛围效果：ripple）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['radial'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 2, atmosphere: { effect: 'ripple', ease: 'linear' } },
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

#### 2.2 none（轮播） + atmosphere（氛围效果：reveal）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['scale'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 3, atmosphere: { effect: 'reveal', ease: 'linear' } },
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

#### 2.3 none（轮播） + atmosphere（氛围效果：breath）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['scale'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 2, atmosphere: { effect: 'breath', ease: 'linear' } },
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

## 散点图动画

所有示例均基于大屏主题（暗色），并提供主题列表用于切换不同的主题。
主题列表来源：`https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/theme.json`

### 1. 入场动画

入场动画用于散点首次进入视图。

#### 1.1 scale（缩放）

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

const DIMENSIONS = [{ id: 'HqlYadRdHJ5c', alias: '类目' }]
const MEASURES = [{ id: 'Tn97A7q0XVDq', alias: '销售额' }]

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

#### 1.2 fadeIn（淡入）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
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

### 2. 轮播动画

散点图轮播动画可通过 atmosphere 氛围提供持续节奏。

#### 2.1 none（轮播） + atmosphere（氛围效果：ripple）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['scale'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 2, atmosphere: { effect: 'ripple', ease: 'linear' } },
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

#### 2.2 none（轮播） + atmosphere（氛围效果：breath）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['fadeIn'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 2, atmosphere: { effect: 'breath', ease: 'linear' } },
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

#### 2.3 none（轮播） + atmosphere（氛围效果：reveal）

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
    dimensions: [{ id: 'HqlYadRdHJ5c', alias: '类目' }],
    measures: [{ id: 'Tn97A7q0XVDq', alias: '销售额' }],
    label: { enable: false },
    animation: {
      enable: true,
      params: {
        appear: { enable: true, effects: ['scale'], ease: 'linear', duration: 1 },
        loop: { enable: true, interval: 3, atmosphere: { effect: 'reveal', ease: 'linear' } },
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
