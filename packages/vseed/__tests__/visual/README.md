# VSeed 视觉回归

在仓库根目录使用 Node24.12.0、pnpm10.26.1，先 `pnpm install --frozen-lockfile`，再 `pnpm --filter @visactor/vseed exec playwright install chromium`。

```sh
pnpm --filter @visactor/vseed test:visual --self-compare
node packages/vseed/scripts/visual-test.mjs --baseline <完整40位SHA>
node packages/vseed/scripts/visual-test.mjs --list
node packages/vseed/scripts/visual-test.mjs --check
# 默认全量比较当前工作区与官方 main
node packages/vseed/scripts/visual-test.mjs
node --test packages/vseed/scripts/visual-test.test.mjs
```

首批四例：柱图生成和实际数据、表格字段/数值映射、真实鼠标点击表格单元、重新生成配置后更新图表。它们验证 VSeed Builder 与当前锁文件中的 VChart/VTable 集成，不代表全产品视觉覆盖。用例清单在 cases/index.mjs；可执行模块输出 createSpec、verify 和可选 exercise。业务断言显式使用 VisualAssertionError，页面加载、浏览器和超时错误不包装成业务差异。

默认基线为官方 VisActor/VBI main；两侧独立构建 VSeed，并使用各侧锁定的 VChart/VTable UMD。Playwright 固定1.63.0、单worker、800×600、DPR1，截图需连续两次完全稳定，原生比较 threshold=0.1/maxDiffPixels=0；不访问CDN。报告保留两侧提交、源码摘要、SDK摘要、冻结套件、PNG和差异图，写入 .vseed-visual/runs。退出0表示所选范围通过，1表示差异，2表示执行错误；子集或自比较不等于全量双侧验收。

Bot只在无网络隔离中使用 --offline 和逐侧准备的依赖。根pnpm-lock.yaml、workspace、包清单和配置均与冻结提交比较；缺失依赖不临时联网。Bot控制器使用Node22；VSeed隔离执行使用独立Node24.12.0运行包，产品CI使用Node24，两类执行证据分别记录。

真实负对照消费已经通过的本地报告：设置 VSEED_VISUAL_FIXTURE 为报告绝对目录，再运行 node --test packages/vseed/scripts/visual-negative.test.mjs。只在临时副本加入可见标记和业务断言失败；验证差异三图与错误分类，不写基准。

## 正式 PR 工作流

本仓已于 **2026-11-06 22:05（北京时间，UTC+8）** 正式启用。准入、提交前检查、状态处理、Photo人工核查和批准/合入统一见[贡献指南](../../../../CONTRIBUTING.zh-CN.md#pr-检查与合入流程)。稳定CR范围与独立工作流不同；本页不作为服务配置入口。

新增或修改用例见[用例编写指南](./cases/README.md)，平台用例见[BugServer管理员协作](./BUGSERVER_CASE_WORKFLOW.md)。产品/依赖/用例变更提交前运行默认全量比较；纯文档检查链接和说明即可，并如实声明未运行项。

## 报告与回收

`.vseed-visual/runs/<run-id>/index.html` 展示三图，`agent-summary.md` 和 `summary.json` 保存问题、两侧SHA及范围；构建日志、两侧Playwright报告和失败trace用于定位。整体复制报告目录以保留相对链接，不提交运行产物。

正常、异常和Ctrl+C后检查本轮浏览器、HTTP服务、子进程和基线worktree已退出。SIGKILL/断电后先核对 `git worktree list` 和 `.vseed-visual/running.lock/owner.json` 的归属及进程状态，再由维护者处理本轮残留，不能盲删锁或他人资源。
