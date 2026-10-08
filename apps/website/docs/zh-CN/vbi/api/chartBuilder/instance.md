# ChartInstanceBuilder

管理图表的本地渲染实例及原生事件代理，不参与 DSL、协同同步或撤销历史。

## 属性

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| **on** | `VBIChartInstanceOn` | 代理当前实例的原生 on，保留参数、返回值和 this；VTable 返回监听器 ID。必须先 bind，重新绑定后需重新注册监听器。 |
| **off** | `VBIChartInstanceOff` | 代理当前实例的原生 off；VChart 接收事件名及回调，VTable 接收监听器 ID。未绑定时抛出错误。 |


## 方法

### constructor

**定义**:

```typescript
constructor(doc: Y.Doc, chartType: ChartTypeBuilder)
```

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `doc` | Y.Doc | - |
| `chartType` | ChartTypeBuilder | - |

### bind

绑定运行时实例并返回当前实例构建器。table / pivotTable 使用 VTable，其余类型使用 VChart。重复绑定替换引用，undefined 解绑；同一实例不能绑定到两个构建器。切换图表类型或销毁文档时自动解绑，事件清理和 release 由调用方负责。

**定义**:

```typescript
bind(instance: VBIChartInstance | undefined): this
```

**返回**: `this`

**参数**:

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `instance` | VBIChartInstance \| undefined | - 已创建的 VChart / VTable 实例，或 undefined |

### get

获取绑定实例，未绑定时返回 undefined。类型参数可指定调用方已知的 IVChart 或 BaseTableAPI 等原生类型。

**定义**:

```typescript
get<T extends VBIChartInstance = VBIChartInstance>(): T | undefined
```

**返回**: `T \| undefined`