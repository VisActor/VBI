# insight

import { registerDemoConnector } from '@components'

{registerDemoConnector()}

## basic-content

Set text content with the insight builder.

> Label: `basic`

```tsx preview
import { VBI, VBIInsightBuilder } from '@visactor/vbi'
import { JsonRender } from '@components'
import { useEffect, useState } from 'react'

export default () => {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const builder = VBI.insight.create({
        content: '',
        version: 0,
      })
      const applyBuilder = (builder: VBIInsightBuilder) => {
        builder.setContent('Sales in East China continued to grow this week. Keep following up with key customers.')
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
