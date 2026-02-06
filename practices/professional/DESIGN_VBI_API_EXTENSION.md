# VBI DSL 扩展设计：指标和编码管理 API

## 1. VBI DSL 结构定义

### 1.1 VBIMeasure 数据结构

```typescript
interface VBIMeasure {
  field: string; // 数据字段名（不可修改）
  alias: string; // 用户定义的别名（可修改）
  encoding?: 'xAxis' | 'yAxis' | 'angle' | 'radius' | 'size' | 'color' | 'label' | 'tooltip';
  aggregate: {
    func: 'sum' | 'count' | 'avg' | 'min' | 'max' | 'quantile';
    quantile?: number; // 仅当 func === 'quantile' 时必需
  };
}
```

**说明**：`encoding` 是可选的。当未指定时，VSeed 会根据图表类型自动为指标分配默认编码（例如柱状图默认映射到 yAxis）。

### 1.2 Zod Schema 定义

```typescript
// packages/vbi/src/types/dsl/measures/aggregate.ts
export const zAggregate = z.discriminatedUnion('func', [
  z.object({ func: z.literal(['sum', 'count', 'avg', 'min', 'max']) }),
  z.object({
    func: z.literal(['quantile']),
    quantile: z.number().min(0).max(1),
  }),
]);

// packages/vbi/src/types/dsl/measures/measures.ts
export const zVBIMeasure = z.object({
  field: z.string(),
  alias: z.string(),
  encoding: z.enum(['xAxis', 'yAxis', 'angle', 'radius', 'size', 'color', 'label', 'tooltip']).optional(),
  aggregate: zAggregate,
});

export type VBIMeasure = z.infer<typeof zVBIMeasure>;
```

---

## 2. MeasuresBuilder 扩展 API

### 2.1 新增方法：按字段名获取指标节点

```typescript
/**
 * 根据字段名获取指标节点构建器，用于修改该指标的属性
 * @param field 字段名（唯一标识符）
 * @returns MeasureNodeBuilder 实例，如果字段不存在则返回 undefined
 */
getMeasureNodeByField(field: string): MeasureNodeBuilder | undefined {
  const measures = this.dsl.get('measures') as Y.Array<Y.Map<any>>;
  for (const yMap of measures) {
    if (yMap.get('field') === field) {
      return new MeasureNodeBuilder(yMap);
    }
  }
  return undefined;
}
```

**使用场景**：

- 前端修改指定指标的别名
- 前端修改指定指标的聚合方式
- 前端修改指定指标的编码通道

**设计说明**：

- 使用 `field` 作为稳定的唯一标识符（不随删除操作变化）
- 前端已有完整的 `measure` 对象，包含 `field` 属性
- 与现有 `removeMeasure(field)` 方法保持一致的 API 风格

---

### 2.2 已有方法（保持不变）

```typescript
// 添加指标（使用回调链式调用）
addMeasure(fieldOrMeasure: string | VBIMeasure): MeasureNodeBuilder;
addMeasure(
  fieldOrMeasure: string | VBIMeasure,
  callback: (node: MeasureNodeBuilder) => void
): MeasuresBuilder;

// 获取所有指标（用于前端初始化和监听更新）
getMeasures(): VBIMeasure[] {
  return this.dsl.get('measures').toJSON();
}

// 观察指标列表变化
observe(callback: ObserveCallback): void;
unobserve(callback: ObserveCallback): void;

// 按字段名删除指标
removeMeasure(field: string): void;
```

---

### 2.3 新增方法：添加指标（支持自定义聚合方式，用于任务1）

```typescript
/**
 * 便捷方法：直接指定初始聚合方式添加指标
 * @param field 字段名
 * @param aggregate 初始聚合方式
 * @returns MeasureNodeBuilder 实例
 */
addMeasureWithAggregate(
  field: string,
  aggregate: VBIMeasure['aggregate']
): MeasureNodeBuilder {
  return this.addMeasure(field, (node) => {
    node.setAggregate(aggregate);
  });
}
```

**设计说明**：

- 对离散字段（文本/日期）添加时，传 `{ func: 'count' }`
- 对数值字段添加时，传 `{ func: 'sum' }` 或其他聚合方式
- 本质是 `addMeasure()` 的便捷包装，保持向后兼容

---

## 3. MeasureNodeBuilder 既有 API（无需修改）

```typescript
export class MeasureNodeBuilder {
  /**
   * 修改指标别名
   */
  setAlias(alias: string): this;

  /**
   * 修改指标编码通道
   */
  setEncoding(encoding: VBIMeasure['encoding']): this;

  /**
   * 修改指标聚合方式
   */
  setAggregate(aggregate: VBIMeasure['aggregate']): this;

  /**
   * 获取最终的 VBIMeasure 对象
   */
  build(): VBIMeasure;
}
```

---

## 4. ChartTypeBuilder 扩展 API

### 4.1 新增方法：获取图表类型支持的编码

```typescript
// packages/vbi/src/config/chartEncodingConfig.ts
/**
 * 图表类型支持的编码通道配置
 * @note VSeed 未提供标准 API 查询，暂时维护此配置。
 *       当 VSeed 提供官方 getChartEncodingConfig() API 时，应改为动态查询。
 */
// packages/vbi/src/config/chartEncodingConfig.ts
/**
 * 图表类型支持的指标编码通道配置
 * @note VSeed 已在各图表的类型定义和 encoding pipeline 中定义了支持的 measure encoding
 *       但未提供统一的、可动态查询的 API（如 getChartMeasureEncodings(chartType)）
 *       因此 VBI 需要维护此配置表，从 VSeed 的 encoding pipelines 中人工提取
 *       参考路径：packages/vseed/src/pipeline/advanced/chart/pipes/encoding/{chart}.ts
 */
export const CHART_ENCODING_CONFIG: Record<string, string[]> = {
  // 表格类（暂不支持通过 measure encoding 配置）
  table: [],
  pivotTable: [],

  // 笛卡尔坐标系 - Y 轴为主
  column: ['yAxis', 'color', 'label', 'tooltip'],
  columnParallel: ['yAxis', 'color', 'label', 'tooltip'],
  columnPercent: ['yAxis', 'color', 'label', 'tooltip'],
  line: ['yAxis', 'color', 'label', 'tooltip'],
  area: ['yAxis', 'color', 'label', 'tooltip'],
  areaPercent: ['yAxis', 'color', 'label', 'tooltip'],

  // 笛卡尔坐标系 - X 轴为主
  bar: ['xAxis', 'color', 'label', 'tooltip'],
  barParallel: ['xAxis', 'color', 'label', 'tooltip'],
  barPercent: ['xAxis', 'color', 'label', 'tooltip'],

  // 散点图（支持 X, Y 轴）
  scatter: ['xAxis', 'yAxis', 'size', 'color', 'label', 'tooltip'],

  // 极坐标系 - 角度为主
  pie: ['angle', 'color', 'label', 'tooltip'],
  donut: ['angle', 'color', 'label', 'tooltip'],
  rose: ['angle', 'radius', 'color', 'label', 'tooltip'],
  roseParallel: ['angle', 'radius', 'color', 'label', 'tooltip'],
  radar: ['radius', 'color', 'label', 'tooltip'],

  // 其他
  funnel: ['size', 'color', 'label', 'tooltip'],
  heatmap: ['color', 'label', 'tooltip'],
  boxplot: ['color', 'label', 'tooltip'],
  histogram: ['yAxis', 'color', 'label', 'tooltip'],
};

// packages/vbi/src/builder/sub-builders/chart-type/chart-type-builder.ts
import { CHART_ENCODING_CONFIG } from '../../config/chartEncodingConfig';

export class ChartTypeBuilder {
  /**
   * 获取指定图表类型支持的编码通道列表
   * @param chartType 图表类型字符串
   * @returns 支持的编码通道数组，未知类型返回 ['yAxis'] 作为默认值
   */
  getSupportedEncodings(chartType: string): string[] {
    return CHART_ENCODING_CONFIG[chartType] || ['yAxis'];
  }
}
```

**设计原则**：

- ✅ **基于 VSeed 定义**：配置表来自 VSeed encoding pipelines 的实现，确保 VBI 与 VSeed 完全同步
- ✅ **配置独立**：将编码映射表提取为独立配置文件，便于维护和扩展
- ⚠️ **注意**：VSeed 未提供标准 API 查询 encoding 列表，只在类型定义中定义了各图表支持的 encoding。VBI 需要维护此配置，当 VSeed 增加新图表或修改 encoding 支持时需要同步更新
- ✅ **向前兼容**：如果 VSeed 未来实装官方 API 如 `getChartMeasureEncodings(chartType)`，只需修改此处实现
- ✅ **安全降级**：未知图表类型返回默认值 `['yAxis']`，保证前端总有可选项
- 📌 **迁移路径**：当 VSeed 实装标准 API 时应改为：
  ```typescript
  getSupportedEncodings(chartType: string): string[] {
    // 改为从 VSeed 动态查询
    return vseed.config.getChartMeasureEncodings(chartType) || ['yAxis'];
  }
  ```

---

### 4.2 已有方法（保持不变）

```typescript
getChartType(): string;
changeChartType(chartType: string): void;
getAvailableChartTypes(): string[];
observe(callback: ObserveCallback): void;
unobserve(callback: ObserveCallback): void;
```

---

### 4.3 新增方法：切换图表类型并自动修复不兼容编码

```typescript
/**
 * 切换图表类型并自动修复不兼容的指标编码（用于任务7）
 * @param chartType 新图表类型
 * @param autoFix 是否自动修复。true 则改为支持的第一个编码；false 仅返回冲突列表
 * @returns 返回编码冲突的指标列表
 */
changeChartTypeWithAutoFix(
  chartType: string,
  autoFix: boolean = true
): { conflicts: Array<{ field: string; oldEncoding: string | undefined }> } {
  const supportedEncodings = this.getSupportedEncodings(chartType);
  const conflicts: Array<{ field: string; oldEncoding: string | undefined }> = [];

  // 遍历所有指标，检查编码兼容性
  const measures = this.dsl.get('measures') as Y.Array<Y.Map<any>>;
  for (const yMap of measures) {
    const field = yMap.get('field');
    const encoding = yMap.get('encoding');

    // 若当前编码已设置且不在新图表支持列表中，则为冲突
    // 注意：encoding 为 undefined 时不是冲突，VSeed 会自动分配默认编码
    if (encoding !== undefined && !supportedEncodings.includes(encoding)) {
      conflicts.push({ field, oldEncoding: encoding });

      // 自动修复：改为支持的第一个编码
      if (autoFix) {
        yMap.set('encoding', supportedEncodings[0]);
      }
    }
  }

  // 切换图表类型
  this.dsl.set('chartType', chartType);

  return { conflicts };
}
```

**设计说明**：

- 检查所有指标的编码兼容性（仅检查已显式设置的 encoding，undefined 由 VSeed 自动处理）
- `autoFix=true`：将不兼容的编码改为新图表支持的第一个编码
- `autoFix=false`：仅返回冲突列表，不修改数据（前端决定如何处理）
- 返回的冲突列表可用于显示修改提示或撤销操作

---

## 5. 数据流示例

### 前端修改指标别名的完整流程

```typescript
// 1. 前端获取指标
const measures = builder.measures.getMeasures();
const measure = measures[0]; // { field: 'sales', alias: '...', ... }

// 2. 用户编辑并确认
const newAlias = '销售总和';

// 3. 调用 VBI API（使用稳定的 field 标识符）
builder.measures.getMeasureNodeByField(measure.field)?.setAlias(newAlias);

// 4. Yjs DSL 自动更新（通过 Y.Map.set()）

// 5. 前端监听更新
builder.measures.observe(() => {
  setMeasures(builder.measures.getMeasures());
});

// 6. UI 重新渲染
```

### 前端删除指标的流程

```typescript
// 1. 用户点击删除
const measure = measures[0];

// 2. 调用 VBI API（使用既有的 removeMeasure 方法）
builder.measures.removeMeasure(measure.field);

// 3. observe 回调触发，前端自动更新列表
```

### 前端切换图表类型的流程（含编码修复）

```typescript
// 1. 用户选择新图表类型（如从 column 切换到 pie）
const newChartType = 'pie';

// 2. 调用 VBI API，检查编码兼容性并自动修复
const result = builder.chartType.changeChartTypeWithAutoFix(newChartType, autoFix = true);

// 3. 检查是否有冲突编码被修复
if (result.conflicts.length > 0) {
  // 显示提示：这些指标的编码已自动调整
  result.conflicts.forEach(({ field, oldEncoding }) => {
    console.log(`指标 ${field} 的编码从 ${oldEncoding} 改为 angle`);
  });
}

// 4. Yjs DSL 自动更新（chartType 和冲突指标的 encoding）

// 5. 前端监听更新
builder.measures.observe(() => {
  setMeasures(builder.measures.getMeasures());
});
builder.chartType.observe(() => {
  setChartType(builder.chartType.getChartType());
});

// 6. UI 重新渲染（新的图表类型 + 调整后的指标编码）
```

---

## 6. 类型安全保证

| 操作                          | 类型校验                                    | 异常处理           |
| ----------------------------- | ------------------------------------------- | ------------------ |
| `getMeasureNodeByField(field)`| 返回 `\| undefined`，前端使用 `?.` 链式调用 | 字段不存在返回 undefined |
| `removeMeasure(field)`        | 字段存在性检查                              | 字段不存在时不操作 |
| `setAlias(alias)`             | Zod string 校验                             | Zod 校验失败时抛出 |
| `setAggregate(agg)`           | Zod discriminatedUnion 校验                 | Zod 校验失败时抛出 |
| `getSupportedEncodings(type)` | 返回值总是数组                              | 未知类型返回默认值 |
| `changeChartTypeWithAutoFix()` | 返回冲突列表，field 为稳定标识符            | 冲突指标使用 field 查询修改 |

---

## 7. 实现清单

| 方法                           | 所在类             | 状态     | 优先级  |
| ------------------------------ | ------------------ | -------- | ------- |
| `addMeasure()`                 | MeasuresBuilder    | 既有     | ✅      |
| `addMeasureWithAggregate()`    | MeasuresBuilder    | **新增** | 🔴 必须 |
| `getMeasureNodeByField()`      | MeasuresBuilder    | **新增** | 🔴 必须 |
| `removeMeasure()`              | MeasuresBuilder    | 既有     | ✅      |
| `getSupportedEncodings()`      | ChartTypeBuilder   | **新增** | 🔴 必须 |
| `changeChartTypeWithAutoFix()` | ChartTypeBuilder   | **新增** | 🔴 必须 |
| `setAlias()`                   | MeasureNodeBuilder | 既有     | ✅      |
| `setEncoding()`                | MeasureNodeBuilder | 既有     | ✅      |
| `setAggregate()`               | MeasureNodeBuilder | 既有     | ✅      |

---

## 9. Measure Encoding 详解

### 为什么需要 Measure Encoding？

VBI DSL 中的 `VBIMeasure.encoding` 不同于维度（Dimension）的编码。它的作用是：

**指定指标数据如何映射到图表的可视化通道**：
- 对于柱状图：yAxis → VSeed `encoding.y`
- 对于饼图：angle → VSeed `encoding.angle`
- 对于散点图：可同时指定 xAxis、yAxis、size 等

### Measure Encoding vs Dimension Encoding

```
维度 (Dimension) Encoding：定义维度在坐标系中的位置
  - xAxis：映射到 X 轴（分类轴）
  - yAxis：映射到 Y 轴（对于条形图）
  - angle：映射到角度（对于极坐标）

指标 (Measure) Encoding：定义指标的可视化通道
  - yAxis：指标值映射到 Y 轴（对于柱状图）
  - xAxis：指标值映射到 X 轴（对于条形图）
  - angle：指标值映射到角度（对于饼图）
  - radius：指标值映射到半径（对于玫瑰图）
  - size：指标值映射到气泡大小（对于散点图）
  - color：指标值用于颜色映射
  - label/tooltip：指标值用于标签和提示显示
```

### VSeed 的自动处理

当 VBI 的 `VBIMeasure.encoding` 为 `undefined` 时：

```typescript
// VBI DSL 中未指定编码
{ field: 'sales', aggregate: { func: 'sum' } }

// VSeed 根据图表类型自动分配（以下是示例）
| Chart Type | Default Encoding |
|------------|------------------|
| column     | yAxis            |
| bar        | xAxis            |
| pie        | angle            |
| scatter    | yAxis            |
```

### 何时手动设置 Encoding？

当你希望：
1. **多指标不同编码**：同时用两个指标，一个映射到 yAxis，另一个映射到 color
2. **非主通道编码**：在散点图中同时指定 xAxis 和 size
3. **覆盖默认行为**：显式改变自动分配的编码

---

## 10. Encoding 架构说明

### 完整的映射链路

VBI DSL 中的 `encoding` 并非 VChart 的直接参数，而是逻辑层描述。实际映射过程：

```
前端 UI 层:
  用户选择 encoding: 'yAxis'
  ↓
VBI DSL 层:
  { field: 'sales', encoding: 'yAxis', ... }
  ↓
VSeed 数据重塑层 (reshaping pipe):
  根据 encoding 值分类字段
  encoding.y = ['sales']  // 把所有 encoding='yAxis' 的字段 ID 放入 y 数组
  ↓
VSeed VChart pipe (initColumn, initBar 等):
  result.yField = unfoldInfo.encodingY  // 最终映射到 VChart 参数
  ↓
VChart 绘图:
  根据 yField 渲染 Y 轴数据
```

### getSupportedEncodings() 的作用

```typescript
// 前端 UI 约束
const supportedEncodings = builder.chartType.getSupportedEncodings('column');
// 返回: ['yAxis', 'xAxis', 'color']
// ↓
// 前端在 UI 上只显示这 3 个通道选项供用户选择
```

**关键点**：
- `getSupportedEncodings()` 返回的是 **前端 UI 的约束列表**，不是 VChart 参数
- 实际的 `encoding → VChart 字段名` 的转换发生在 VSeed 的数据重塑层
- VBI 只需要负责：验证 encoding 合法 + 限制 UI 可选项

---

## 11. 前端集成简述

前端通过以上 API 实现：

### 任务映射

- **任务1**：新增指标（使用新增的 `addMeasureWithAggregate(field, aggregate)`，前端指定初始聚合方式）
- **任务2**：展示指标卡片（使用 `getMeasures()`）
- **任务4**：删除指标（使用既有的 `removeMeasure(field)`）
- **任务6**：修改别名（使用 `getMeasureNodeByField(field).setAlias()`）
- **任务5**：修改聚合（使用 `getMeasureNodeByField(field).setAggregate()`）
- **任务3**：修改编码（使用 `getMeasureNodeByField(field).setEncoding()` + `getSupportedEncodings()`）
- **任务7**：图表类型带编码切换（使用 `changeChartTypeWithAutoFix(chartType, autoFix)`，自动修复或提示不兼容编码）
 