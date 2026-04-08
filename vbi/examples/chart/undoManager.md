# undoManager

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## undo-redo

撤销重做功能测试

```tsx preview
import { VBI, VBIChartBuilder } from '@visactor/vbi'
import { DEMO_CONNECTOR_ID, VSeedRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const run = async () => {
      const builder = VBI.createChart({
        ...{
          connectorId: 'demoSupermarket',
          chartType: 'bar',
          dimensions: [],
          measures: [
            {
              field: 'sales',
              alias: '销售额',
              encoding: 'yAxis',
              aggregate: {
                func: 'sum',
              },
            },
          ],
          whereFilter: {
            id: 'root',
            op: 'and',
            conditions: [],
          },
          havingFilter: {
            id: 'root',
            op: 'and',
            conditions: [],
          },
          theme: 'light',
          locale: 'zh-CN',
          version: 1,
          limit: 10,
        },
        connectorId: DEMO_CONNECTOR_ID,
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
      setResult(await builder.buildVSeed())
    }
    run()
  }, [])

  if (!result) return <div>Loading...</div>

  return <VSeedRender vseed={result} />
}
```
