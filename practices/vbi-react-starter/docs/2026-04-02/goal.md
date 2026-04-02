# Goal: vbi-react Starter Demo 改造设计（2026-04-02）

## 目标陈述

在不改变 `@visactor/vbi-react` 核心运行时行为的前提下，升级 `practices/vbi-react-starter` 的视觉一致性、信息层级与交互体验，使其成为可以对外展示的“组件能力样板”而非“内部验证页”。

## 交付范围

1. 建立 demo 视觉与布局设计系统（token、主题、组件样式约束）。
2. 将当前大体量 `App.tsx` 拆分为可维护的小组件。
3. 升级关键体验路径（数据加载、空状态、错误态、DSL 查看）。
4. 增加响应式布局策略（桌面/窄屏可用）。
5. 输出可执行的分阶段改造计划与验证门禁。

## 开工前输入（SSOT）

1. 现状实现以 `practices/vbi-react-starter/src/App.tsx` 为准。
2. 组件能力边界以 `@visactor/vbi-react/components` 当前导出为准：
   - `BuilderLayout`
   - `ChartRenderer`
   - `ChartTypeSelector`
   - `FieldPanel`
3. 现有文档落点以 `apps/website/docs/zh-CN/vbi/practices/vbi-react-starter.mdx` 为准。

## 关键问题清单（本次必须覆盖）

1. 样式分散在 inline `CSSProperties`，无统一 token 和主题层。
2. 页面主题不统一（容器深色，部分组件视觉偏浅色）。
3. 交互反馈弱（loading/empty/error 表达简陋，DSL dump 可读性差）。
4. 缺少响应式策略，窄屏下操作与阅读体验下降。
5. 文件过大、重复样式多，维护成本高。

## 不在本次范围

- 不修改 `@visactor/vbi-react` hooks/components 的对外 API。
- 不重写 `VBIChartBuilder`、connector、CSV parser 的业务逻辑。
- 不引入与 demo 目标无关的重型依赖或复杂基础设施改造。

## 验收标准（DoD）

1. `practices/vbi-react-starter/src/App.tsx` 不再承载全部 UI 细节，主流程拆分为多个职责组件。
2. 样式从 inline 主体迁移到统一 token/theme 体系，风格一致。
3. 首屏路径“加载数据 -> 选字段 -> 选图表 -> 预览结果”可在 3 步内完成。
4. loading/empty/error 状态均有明确视觉反馈，且文案一致。
5. 桌面与窄屏下均可完成关键流程（字段选择、图表切换、数据加载）。
6. 设计文档可直接指导实现与 code review，不依赖口头补充。
