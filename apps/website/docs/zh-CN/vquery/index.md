# VQuery

VQuery 在 Node.js 和浏览器中默认使用内存查询与存储 adapter，无需 IndexedDB。每个实例独立管理自己的数据集。

```ts
import { VQuery } from '@visactor/vquery'

const vquery = new VQuery()
```

默认存储的数据只在当前实例生命周期内有效，关闭实例或刷新页面后不保留。

## 启用 IndexedDB

需要跨会话保存数据集 schema 和数据源时，显式开启 `enableIndexedDB`：

```ts
const vquery = new VQuery({ enableIndexedDB: true })
```

开启后使用 IndexedDB 存储 adapter，运行环境需要支持 IndexedDB；查询仍通过内存查询 adapter 执行。省略此选项、传入空 options 或设置为 `false` 时，均使用内存存储，无需 IndexedDB API。
