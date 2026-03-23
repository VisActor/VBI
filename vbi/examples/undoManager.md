# undoManager

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## undo-redo

撤销重做功能测试

```tsx preview
import { VBI } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [vseed, setVSeed] = useState(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.createChart({
        connectorId: DEMO_CONNECTOR_ID,
        chartType: 'bar',
        dimensions: [],
        measures: [{ field: 'sales', alias: '销售额', encoding: 'yAxis', aggregate: { func: 'sum' } }],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
        limit: 10,
      })

      const applyBuilder = (builder: VBIChartBuilder) => {
        builder.measures.add('profit', (node) => {
          node.setAlias('利润').setEncoding('yAxis').setAggregate({ func: 'sum' })
        })

        if (builder.undoManager.canUndo()) {
          builder.undoManager.undo()
        }

        if (builder.undoManager.canRedo()) {
          builder.undoManager.redo()
        }
      }
      applyBuilder(builder)

      const result = await builder.buildVSeed()
      setVSeed(result)
    }
    run()
  }, [])

  if (!vseed) return <div>Loading...</div>

  return <VSeedRender vseed={vseed} />
}
```
