# TypeScript 7 与 Rs 工具链升级

## 版本与范围

2026-09-22 按 npm `latest` 确认并固定稳定版本，未采用 nightly / RC：

| 依赖                                 | 升级前        | 升级后 |
| ------------------------------------ | ------------- | ------ |
| TypeScript                           | 6.0.2         | 7.0.2  |
| `@rslib/core`                        | 0.20.3        | 1.0.1  |
| `@rstest/core`                       | 0.8.3         | 0.12.0 |
| `@rstest/coverage-istanbul`          | 0.1.0 / 0.2.1 | 0.12.0 |
| `@rstest/adapter-rslib`              | 0.2.2         | 0.12.0 |
| `@rspress/core`、preview、playground | 2.0.11        | 2.0.22 |

15 个工作区的 TypeScript 直接依赖及实际 `tsc --version` 均为 7.0.2；锁文件中也只保留 TypeScript 7.0.2。
根工作区不直接依赖 TypeScript。同步升级 `@rsbuild/plugin-react` 至 2.1.0、`happy-dom` 至 20.14.5、
`@swc/helpers` 至 0.5.23，满足新版工具链的 peer 依赖。

[TypeScript 7 发布说明](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
说明旧编译器 API 已移除；[Rslib 声明文件说明](https://rslib.rs/guide/advanced/dts)
说明检测到 TypeScript 7 后自动使用原生编译器。实际构建日志确认声明文件由 tsgo 生成。
两个工具工作区改用 `tsx` 4.23.15 执行脚本，并增加独立 TypeScript 7 类型检查。
`ts-morph`、Stencil 等第三方工具自身的编译器实现由其维护，不用 overrides 强行替换。

## 兼容性修复

- 为示例、组件和网站的异步连接器工厂补充 `Promise<VBIConnector>` 返回类型，修复 TypeScript 7 下的参数推断错误。
- 文档站 demo connector 在不同工厂调用间共享延迟创建的 VQuery 和数据集初始化任务，避免同页多个预览并发创建同名数据集。
  测试覆盖并发访问、已有数据集复用、初始化失败后重试。
- 8 个语言的 VBI / VQuery Playground 使用静态导入，让浏览器编译器预先解析 VQuery 依赖。
  [Playground 官方说明](https://www.rspress.rs/plugin/official-plugins/playground)说明其依赖扫描与浏览器编译限制。
  VBI Playground 同时修正遗留的 `dimensions.addDimension` 调用，使用当前的 `dimensions.add` API。
- 补全 Rspress 新增的代码换行、最后更新者文案。
- LLM 文档生成器同时接受 JSDoc 正文和 `@description`，使已有桑基图说明可正确生成。
- VBI 示例生成器统一文件末尾换行；刷新文档和全部 8 个语言的 Storybook。
  Storybook bundle 差异包含依赖解析后的 React 更新及模块路径变化。

## 覆盖率约束

development skill 约定 VBI / VQuery 的语句、分支、函数、行覆盖率均为 100%；
VSeed 单测四项指标不得低于修改前的新鲜基线，全量覆盖率也不得退步。
禁止缩小覆盖范围、忽略分支或降低门槛来通过验证。

VBI / VQuery 使用 Istanbul，VSeed 保持原有 Vitest V8 provider 和源码统计范围。
本次补充资源生命周期、schema 校验、主题默认值、标注点默认样式与堆叠坐标测试。
V8 分支计数在不同运行间略有变化，因此配置中的分支门槛使用高于升级前基线的已验证下界。

| 范围                   | 语句   | 分支   | 函数   | 行     |
| ---------------------- | ------ | ------ | ------ | ------ |
| VBI 升级前全量         | 99.49% | 98.81% | 98.88% | 99.51% |
| VBI 升级后全量         | 100%   | 100%   | 100%   | 100%   |
| VQuery 升级前 / 后全量 | 100%   | 100%   | 100%   | 100%   |
| VSeed 升级前单测       | 72.96% | 70.02% | 72.08% | 72.96% |
| VSeed 升级后单测       | 73.01% | 70.60% | 72.08% | 73.01% |
| VSeed 升级前全量       | 89.09% | 78.45% | 80.67% | 89.09% |
| VSeed 升级后全量       | 89.13% | 78.78% | 80.67% | 89.13% |

覆盖率命令不再更新快照或打开浏览器。根 `pnpm run test:coverage` 顺序执行全部工作区的完整覆盖率套件，
最后单独运行 VSeed 单测覆盖率；最多同时运行两个工作区。CI 调用同一入口。
单测、集成测试、全量报告分别存放，避免局部运行覆盖全量结果。

## 验证结果

- `pnpm install --frozen-lockfile`：通过。
- `pnpm run build`：13 个包、示例和工具构建成功。
- `pnpm run build:website`：Rspress 全部语言的客户端、服务端构建与静态渲染成功。
- `pnpm run typecheck`：25 个任务成功，无缓存命中；覆盖全部 15 个工作区。
- `pnpm run g`：VSeed、VQuery、VBI、VBI React 生成成功；VBI Component 生成 8 个语言的 Storybook 成功。
  后续测试及生成器修改也重新运行了对应包的生成与验证。
- `pnpm run test:coverage`：13 个工作区、1,721 个测试全部通过；随后单独执行的 VSeed 339 个单测通过。
- `pnpm --filter @visactor/vseed run test:integration:coverage`：27 个文件、797 个测试通过。
- `pnpm run lint:check`、`pnpm run format:check`、`git diff --check`：通过。
- LLM 工具 `generate`、两个工具工作区的 TypeScript 7 类型检查通过。
- bugserver 脚本通过 `tsx` 执行五步模拟响应的完整流程；未连接或触发真实远端截图服务。
- VBI、VQuery、VSeed 构建后的 CommonJS 入口均通过真实 API 冒烟检查。
- Rspress 开发服务器启动成功；浏览器中修改 VBI Playground 的指标别名后，编辑器重新编译，
  Builder 状态与图表更新成功，没有未捕获的页面错误。
- 使用本地生产构建资源完成 7 个页面的浏览器回归：中英文首页、VSeed 快速开始、VBI 图表示例、
  VQuery / VBI Playground、Storybook 按钮。全部页面返回 200，图表和组件成功渲染，
  代码换行按钮交互通过，没有未捕获的页面错误。

其他工作区的完整测试与覆盖率：

| 工作区                | 测试数 | 语句   | 分支   | 函数   | 行     |
| --------------------- | ------ | ------ | ------ | ------ | ------ |
| vbi-agent             | 9      | 76.99% | 58.06% | 82.45% | 78.07% |
| vbi-react             | 17     | 95.30% | 90.42% | 93.54% | 95.30% |
| vbi-component         | 114    | 32.28% | 22.27% | 30.69% | 33.96% |
| standard              | 65     | 48.15% | 30.22% | 42.97% | 46.23% |
| minimalist            | 5      | 13.61% | 12.91% | 7.63%  | 13.44% |
| streamlined           | 9      | 18.14% | 12.69% | 13.95% | 17.98% |
| professional          | 34     | 59.32% | 37.82% | 47.38% | 59.31% |
| dashboard             | 22     | 97.74% | 85.18% | 97.01% | 99.35% |
| vbi-react-starter     | 1      | 0%     | 0%     | 0%     | 0%     |
| website demoConnector | 3      | 96%    | 75%    | 85.71% | 95.65% |

报告位于各工作区 `coverage/index.html`，JSON 摘要位于 `coverage/coverage-summary.json`。
VBI Component 提供 `coverage/coverage-final.json` 和终端摘要；VSeed 局部报告位于
`packages/vseed/coverage/unit/` 与 `packages/vseed/coverage/integration/`。
网站覆盖率仅统计新增回归测试对应的 `components/demoConnector`，不代表整站覆盖率。

## 验证边界

vbi-agent、所有 practices、website、两个 tools 没有 `g` 脚本；相应构建、测试或工具 `generate` 已执行。
两个 tools 没有单测 / 覆盖率套件，分别用生成流程和模拟 CI 流程验证。
vbi-react-starter 原有测试只验证常量，源码覆盖率为 0%；本次未将它描述为完整交互验证。
LLM 生成器仍会提示部分旧动画 / totals 说明缺失；安装时原有 OpenAI 5 / Zod 4 peer 提示未在本次升级范围内修改。
远端发布、CI 实际运行、外部截图服务不属于本次本地回归结果。
