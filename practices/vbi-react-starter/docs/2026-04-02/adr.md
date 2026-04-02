# ADR: vbi-react Starter Demo 改造方案（2026-04-02）

- Status: Accepted
- Decision Date: 2026-04-02
- Decision Owner: VBI React 协作开发
- Related: `./goal.md`

## 背景

当前 `vbi-react-starter` 已能覆盖基础能力验证，但页面视觉与结构仍偏“内部调试态”：样式分散、层级不清、响应式缺位、状态反馈弱。该页面已在 website 中暴露为 practice 示例，继续沿用现状会影响 `@visactor/vbi-react/components` 的外部观感和学习效率。

## 决策

### 决策 1：采用“两阶段改造”，先稳态收敛再体验增强

- 阶段一聚焦：主题统一、样式系统化、组件拆分、关键状态可读性。
- 阶段二聚焦：动画、可视化选择器、交互细节增强。
- 目的：控制一次性改动面，降低回归风险，保证每阶段可独立提交与验收。

### 决策 2：第一阶段使用 `CSS Variables + 结构化样式文件`，不强依赖 Tailwind

- 先建立轻量 token/theme 体系，快速替代 inline styles。
- 保持对 monorepo 现有构建链影响最小，避免在首阶段引入额外样式工具耦合。
- 需要时可在后续演进中评估 Tailwind 接入。

### 决策 3：依赖引入采用“必要最小集”

- 图标层：引入 `lucide-react`。
- 交互原子组件：如需替换原生控件，优先小范围引入 `Radix`（例如 Select/Tooltip）。
- 动画库（如 `framer-motion`）只进入第二阶段，且仅用于关键反馈。

### 决策 4：保持 Starter 的“组件验证目标”不变

- `FieldPanel`、`ChartTypeSelector`、`ChartRenderer`、`BuilderLayout` 继续作为核心体验骨架。
- UI 改造不能把核心价值从“验证组件层可用性”转向“重业务逻辑”。

## 备选方案与取舍

### 方案 A：一次性重构 + 全量组件库迁移

- 优点：短期视觉跃迁明显。
- 缺点：改动面过大，冲突与回归风险高，review 成本高。
- 结论：不采用。

### 方案 B：仅做样式微调，不改结构

- 优点：实施快。
- 缺点：无法解决 App 过大与信息层级问题，长期维护成本不降。
- 结论：不采用。

### 方案 C：两阶段增量改造（本方案）

- 优点：风险可控、节奏清晰、每阶段均可落地验收。
- 代价：需要分批交付，短期内存在过渡态。
- 结论：采用。

## 影响范围

- 直接影响：
  - `practices/vbi-react-starter/src/**`
  - `practices/vbi-react-starter/tests/**`（按需补充）
  - `apps/website/docs/zh-CN/vbi/practices/vbi-react-starter.mdx`（按需调整容器展示）
- 间接影响：
  - `@visactor/vbi-react/components` 在 website 的示例观感与可学习性。

## 风险与缓解

1. 风险：样式重构导致组件行为回归。
   - 缓解：行为逻辑不改动，先迁移样式再做交互增强；每阶段跑已有测试并加关键路径冒烟验证。
2. 风险：引入新依赖增加 bundle 与维护负担。
   - 缓解：第一阶段仅引必要依赖；依赖引入需说明收益与替代成本。
3. 风险：与在途 PR 的文档/示例改动产生冲突。
   - 缓解：在独立 worktree + 新分支推进，仅聚焦 starter 路径，减少文件交叉。

## 落地约束

1. 目录约束：遵循 `packages/vbi-react/docs/README.md` 的 `YYYY-MM-DD-topic/` 结构。
2. 工程约束：优先小文件与职责拆分，避免单文件持续膨胀。
3. 交互约束：关键路径不增加操作复杂度，不牺牲“低门槛上手”目标。
