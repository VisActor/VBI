# 贡献指南

[English](./CONTRIBUTING.md)

规范仓库为 [VisActor/VBI](https://github.com/VisActor/VBI)，VSeed 是其中 `packages/vseed` 包；旧 VisActor/VSeed 地址不作为第二个工作流入口。从 `main` 创建分支，PR 目标为 `main`。问题与功能讨论使用 [Issues](https://github.com/VisActor/VBI/issues)，PR 遵循中英文模板，使用 Conventional Commits。

## 本地开发与验证

使用根 package.json 指定的 Node.js >=24.12.0 和 pnpm10.26.1。代码、测试、构建及依赖变更遵循[开发规范](.agents/skills/development/SKILL.md)，本指南不降低既有覆盖率、生成和网站验收要求。

```sh
pnpm install --frozen-lockfile
# 修改前记录受影响包的单测覆盖率；以下为 VSeed 示例
pnpm --filter @visactor/vseed run test:unit:coverage
# 修改后执行生成、完整测试、覆盖率和代码检查
pnpm --filter @visactor/vseed run g
pnpm --filter @visactor/vseed run test:coverage
pnpm --filter @visactor/vseed run test:unit:coverage
pnpm run format:check
pnpm run lint:check
pnpm run typecheck
```

按改动选择所有受影响包及消费者，仓库范围生成使用 `pnpm run g`。逐包比较同一源码范围的 statements/branches/functions/lines，不能降低覆盖率；完整测试不能替代单测基线比较。VBI/VQuery保留四项100%要求。检查生成和快照diff，不用自动更新快照掩盖行为变化。产品CI使用 `pnpm run build` 和 `pnpm run test:coverage`；现有Lint、Typecheck和changeset检查也须满足。

代码变更还需按开发规范检查网站首页及相关示例，执行真实交互并核对控制台和请求；启动的 `pnpm dev` 服务在完成后停止。网站验收不替代下面的VSeed冻结双侧视觉比较。纯Markdown/Agent说明变更检查文档本身及链接，无需重跑产品构建、覆盖率或启动网站；若同时修改生成器、示例或网站行为，按开发规范执行对应验收。

## PR 检查与合入流程

**正式启用快照（2026-11-06）**：本仓独立 PR 工作流已于北京时间 **2026-11-06 22:05** 启用。接入代码见 [#595](https://github.com/VisActor/VBI/pull/595)。启用和指定 PR 验证不等于长期稳定性验收，首条自然 PR 及至少24小时/3次执行观察仍待完成。

### 适用范围

仅接管完成初始化后、创建时间严格晚于起点、源分支和目标分支均属于 `VisActor/VBI`、目标为 `main`且完整差异涉及 `packages/vseed/`（包括改名或删除）的非 Draft PR。“内部”指同仓分支，不以作者是否为员工判断。符合条件的新 Draft 转为 Ready for review 后进入流程；初始化前的存量 PR、fork 和范围外 PR 不因更新、重开或转 Ready 而自动补跑。不要重新创建相同 PR 来绕过存量边界。

稳定 CR 与 GitHub Actions 有独立范围：稳定 CR 已启用全仓非 Draft PR 的新建及后续版本自动审查，首次建立存量基线；它不受独立工作流的目标分支和路径范围限制。没有工作流摘要不代表不需要测试或人工评审。旧 Photo CI 仅按自己的触发条件处理未交接 PR 和 push；同一版本的截图所有权由维护者协调，不手动重复派发。

### 提交前检查

- 完成改动相关的单测、构建/类型及代码风格检查。新增功能、修复缺陷或发现覆盖空缺时，补充确定性回归用例或加强已有用例；交互必须验证真实动作和目标状态。
- 涉及产品代码、渲染、交互、依赖或视觉用例时，提交 PR 前运行[视觉指南](packages/vseed/__tests__/visual/README.md)中的默认全量双侧比较。开发过程中可运行单例/相关目录；`--self-compare` 只检查稳定性，不能替代官方基线比较。全量仅指当前用例清单，不代表全产品覆盖。
- 纯文档改动核对链接、命令、版本和实际行为即可；在 PR 中说明未运行产品测试及原因，无需手动启动模型或派发 Photo；提交后仍按仓库既有 CI 和自动工作流执行。
- 写清实际命令、结果、报告范围、head/base（如已生成报告）、预期视觉变化、未运行项及阻断。执行错误不能算通过，不跳过断言、放宽阈值或替换基准来消除失败。
- 新增本地用例见[用例指南](packages/vseed/__tests__/visual/cases/README.md)。新增平台 Photo 用例仅限对应项目管理员；无权限者提供复现材料，不能编造 ID，流程见[BugServer 用例协作](packages/vseed/__tests__/visual/BUGSERVER_CASE_WORKFLOW.md)。

### 提交后检查结果

先核对当前 head、比较基线和报告版本，再检查 Bot Review、GitHub Actions 和 PR 工作流摘要。三项自动建议分别为 CR、单测和 Playwright；CI 仍可能有其他必须满足的仓库检查。

| 检查项          | 开发者和维护者的动作                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| CR Review       | 阅读对应源码位置，修复或补充证据；关闭讨论不等于已验证修复                                                                                       |
| 单测            | 核对 `test.yml` 的 `Tests` job 和 `Run tests and enforce coverage thresholds` 步骤；同时检查 Lint、Typecheck；缺失、跳过、运行中或失败不能算通过 |
| Playwright      | 查看全量比较及图像、业务断言和差异调查；执行错误不能归为可接受视觉变化                                                                           |
| BugServer Photo | 自动执行、人工核查，保留差异、缺基准、错误和未完成状态；当前 report-only，不阻断三项自动建议                                                     |

三项检查通过或流程 completed 都不表示 Photo 全部通过。无平台权限的贡献者由维护者协助核查，不公开内部报告、业务数据、日志或凭据。

### PR 状态与下一步

| 摘要状态                 | 应采取的行动                                                          |
| ------------------------ | --------------------------------------------------------------------- |
| 等待执行／执行中         | 等待当前阶段，不把暂无结果当通过                                      |
| 存在待修复或待调查项     | 阅读问题，修复代码、补用例或提供可验证证据                            |
| 流程受阻                 | 查看具体待办；权限、服务或任务恢复问题交由维护者处理                  |
| 等待人工批准             | 维护者核对当前版本的三项结果，并人工核查 Photo                        |
| 等待人工合入             | 三项建议已完成，维护者核查 Photo 与可用保存修订后按仓库规则手动 Merge |
| 已合入／核对基准阶段     | 已启用图文选择时核对所选基准处理结果；未启用时仍跳过自动更新          |
| 流程已完成               | 表示流程收尾，不改写原 Photo 差异或错误                               |
| 被新版本替代／未合入关闭 | 前者查看新版本结果，后者不表示已合入或基准已更新                      |

推送新提交或 base 变化后重新核对版本并执行必要检查；旧结果不能证明新版本通过，新提交须重新核对结果及可用的 Photo 保存修订。缺少摘要时先检查同仓、目标、创建时间、Draft和路径范围，再联系维护者。

### 批准、合入和异常恢复

工作流中的 GitHub Approve 仅作审计；维护者核对当前提交的 CR、单测、Playwright 和 Photo 后，可以直接手动 Merge。GitHub 分支保护或仓库评审要求仍然适用，Bot 不会修改这些规则，也不会代为 Approve 或 Merge。

对已明确启用图文选择的 PR，BugServer 展示当前版本的图片和短说明，新候选默认全选。维护者应逐项核查；需要保留旧基准的项目取消选择，并在合入前保存成功。以服务端显示的保存修订为准，未保存草稿不生效；已保存的人工选择不会被默认全选覆盖。

合入后只更新该修订已选的基准，未选项不变。写入前仍核对冻结提交、三项检查、实际合入内容、保存时间及原基准；旧版本、合入后补选或冲突不能自动补认。请求超时或部分成功时联系维护者按原任务恢复，不重新派发或更换请求 ID。

Photo 始终 report-only。没有可用选择清单（例如差异超过20项、解释未完成或执行错误）不新增合入门禁，也不自动更新基准。未启用图文选择的 PR 保持原模式。基准更新不会改写原 Photo 报告，流程 completed 不等于 Photo 全部通过。

请求帮助时提供 PR、当前 SHA、Review/CI 链接和可公开的错误说明。不要编辑 Bot 受管摘要或隐藏标记，不通过反复开关 PR、删除状态、换请求 ID 或另派批次绕过去重；由维护者回读和恢复原任务。结束时停止本次启动的测试服务、浏览器和子进程。
