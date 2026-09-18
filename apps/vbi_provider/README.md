# @visactor/headless-bi-provider

`@visactor/headless-bi-provider` 是 VBI 平台级应用 SDK。

它只暴露两种一等 Provider：

- `ChartProvider`
- `InsightProvider`

统一入口是 `createVBIProviderClient`，固定关系是：

`client -> provider -> builder`

```ts
const client = createVBIProviderClient({
  baseUrl: 'http://localhost:3030/api/v1',
})

const chartProvider = client.chart('chart-1')
const createOnlyProvider = client.chart()
```

## Provider Surface

共享资源语义：

- `create / remove / rename`
- `open / close / getBuilder`
- `getSummary / getDetail / snapshot`

列表入口：

- `client.listCharts()`
- `client.listInsights()`

## Browser Example

```ts
import { createVBIProviderClient } from '@visactor/headless-bi-provider'

const client = createVBIProviderClient({
  baseUrl: '/api/v1',
})

const provider = client.chart('chart-1')
const builder = await provider.open()

builder.setName('Revenue')
console.log(await provider.getDetail())
```

## Node.js Example

```ts
import { WebSocket } from 'ws'
import { createVBIProviderClient } from '@visactor/headless-bi-provider'

const client = createVBIProviderClient({
  baseUrl: 'http://localhost:3030/api/v1',
  webSocketPolyfill: WebSocket,
})

const insight = client.insight('insight-1')
const builder = await insight.open()

console.log(builder.build())
console.log(await insight.snapshot())

await insight.close()
```

## Design Constraints

- Provider 是资源运行时入口，不绑定 React 或 DOM
- `client.chart()` 允许无 id，用于 create-first 流程
- `client.chart('chart-1')` 允许绑定现有资源
- Builder 获取权属于 Provider，而不是页面或 CLI 自行创建
- 资源生命周期和查询走 REST，资源内容修改走 Provider 打开的 Builder/Yjs 协同流
- SDK 只保留远程平台客户端这一种用法，配置入口保持单一
