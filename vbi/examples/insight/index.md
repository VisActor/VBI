# insight

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## basic-content

通过 insight builder 设置文本内容

> 标签: `basic`

```tsx preview
import { VBI, VBIInsightBuilder } from '@visactor/vbi'
import { JsonRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const builder = VBI.createInsight({
        content: '',
        version: 0,
      })
      const applyBuilder = (builder: VBIInsightBuilder) => {
        builder.setContent('本周华东区域销售额持续增长，建议继续跟进重点客户。')
      }
      applyBuilder(builder)
      setResult(builder.build())
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }, [])

  if (error) return <JsonRender value={{ error }} />
  if (!result) return <div>Loading...</div>

  return <JsonRender value={result} />
}
```
