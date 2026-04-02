# Plan: vbi-react Starter Demo 视觉与体验改造（2026-04-02, Rev.1）

- Based on: `./adr.md`
- 目标：在保持组件验证价值不变的前提下，把 starter demo 升级为可对外展示的高质量示例。

## 问题分析（现状）

当前 `practices/vbi-react-starter/src/App.tsx` 同时承载状态管理、布局结构、视觉样式与状态反馈，导致以下问题：

1. 大量 inline 样式重复，修改成本高且易出现风格漂移。
2. 页面视觉主次不清，信息噪音偏高（尤其是 DSL 区与状态区并列抢占注意力）。
3. loading/empty/error 状态表达弱，首屏引导不够明确。
4. 缺少窄屏布局策略，移动或小窗口演示体验不稳定。

## 开工前冻结（Start Gate）

1. 改造目标路径冻结：
   - `practices/vbi-react-starter/src/**`
   - `practices/vbi-react-starter/tests/**`（按需）
2. 行为边界冻结：
   - 不变更 connector 协议与核心数据流（load demo / upload CSV / build chart）。
   - 不修改 `@visactor/vbi-react/components` 对外 API。
3. 验证口径冻结：
   - 先保证现有功能可用，再追求视觉与交互优化。

## 方案设计

### 样式与主题

1. 新增统一 token（颜色、间距、圆角、阴影、字体、层级）。
2. 主题先统一为单一基线（默认浅色或深色其一），避免混搭。
3. 从 inline 样式迁移到结构化样式文件（CSS Modules 或等价方案）。

### 结构拆分

1. `App` 保留流程编排，拆出展示组件：
   - `TopBar`
   - `MainCanvas`
   - `StatusPanel`
   - `DslInspector`
2. 公共样式与状态文案集中，减少重复定义。

### 体验增强

1. 增加 skeleton/loading 态，替代纯文本等待。
2. 优化 empty/error 卡片，提供下一步动作提示。
3. DSL 区默认收敛（折叠或次级区域），降低主流程干扰。

## 分阶段执行与可执行验收

以下每个阶段都要求“实现 + 验收命令 + 通过标准”三件套齐全，避免主观判断。

## Phase 1：视觉系统收敛（优先）

实现项：

1. 新增 token/theme 文件并接入页面（建议路径：`src/styles/tokens.css`）。
2. 替换 `App.tsx` 中主要 inline styles。
3. 统一按钮、卡片、状态提示三类核心样式。

验收命令：

```bash
pnpm --filter=vbi-react-starter run build
test -f practices/vbi-react-starter/src/styles/tokens.css
rg -n "style=\\{\\{" practices/vbi-react-starter/src
```

通过标准：

1. `build` 成功退出（exit code = 0）。
2. token 文件存在并被页面样式引用（代码 review 可见 import/use）。
3. `style={{` 用量显著下降：`App.tsx` 中不再出现大块样式常量定义。

## Phase 2：结构拆分与主流程清晰化

实现项：

1. 拆分 `App.tsx` 为职责组件，`App` 仅保留流程编排与状态管理。
2. 主操作区与图表预览前置，DSL 区降权展示。
3. 保持“加载数据 -> 选字段 -> 出图”路径流畅。

验收命令：

```bash
pnpm --filter=vbi-react-starter run test
pnpm --filter=vbi-react-starter run build
wc -l practices/vbi-react-starter/src/App.tsx
find practices/vbi-react-starter/src -maxdepth 2 -type f | rg -n "TopBar|MainCanvas|StatusPanel|DslInspector"
```

通过标准：

1. `test` 与 `build` 全通过。
2. `App.tsx` 行数下降到可维护区间（目标：<= 260 行）。
3. 至少新增 3 个职责化 UI 组件文件，且由 `App` 统一编排调用。

## Phase 3：体验细节与响应式补齐

实现项：

1. 增加 loading/empty/error 的视觉反馈组件。
2. 完成窄屏自适应（面板折叠、按钮换行、内容滚动策略）。
3. 视收益引入轻量增强（图标、必要过渡动画、可视化选择器）。

验收步骤（手动冒烟，需记录结果）：

1. 桌面视口（1440x900）：
   - 可完成 `Load demo data -> 添加字段 -> 切换图表`。
2. 窄屏视口（390x844）：
   - 页面无致命遮挡，关键按钮可点击，主区域无不可恢复卡死。
3. 异常路径：
   - 上传非法 CSV 时出现错误态提示且可继续操作。

通过标准：

1. 四种状态具备明确 UI：`loading / empty / error / success`。
2. 桌面与窄屏的关键路径均可走通且无阻断。

## Phase 4：全量门禁与提交前签收

验收命令：

```bash
pnpm --filter=vbi-react-starter run lint
pnpm --filter=vbi-react-starter run test
pnpm --filter=vbi-react-starter run build
pnpm --filter=website run build
pnpm run lint
```

可选增强：

```bash
pnpm --filter=vbi-react-starter run typecheck
pnpm run typecheck
```

通过标准：

1. 所有默认门禁命令通过。
2. website 中 practice 页面可正常渲染，无构建时导入错误。
3. 冒烟检查记录完整（包含桌面、窄屏、异常路径）。

## 验收标准（DoD）

1. 样式系统具备 token/theme 单一入口，且不再依赖大段 inline style。
2. `App` 从“大而全”拆为职责组件，结构与命名可读。
3. `loading/empty/error/success` 四态均可复现且有明确信息反馈。
4. 响应式覆盖桌面与窄屏，关键流程可用性通过手动冒烟。
5. 默认门禁命令全部通过，可独立发起并评审 PR。

## 风险与缓解

1. 风险：拆分过程引入行为差异。
   - 缓解：先保持逻辑不动，仅做搬移；再逐项替换 UI。
2. 风险：样式改造与在途文档 PR 冲突。
   - 缓解：本次变更限定在 starter demo 与对应实践页。
3. 风险：新增依赖收益不足。
   - 缓解：依赖按阶段引入，先实现“无依赖或轻依赖”版本并评估收益。

## 回滚策略

1. 若拆分后出现回归：保留 token/theme 与样式产物，回退组件拆分提交。
2. 若体验增强依赖不稳定：回退该依赖相关提交，保留已完成的结构化改造。
