# VSeed 视觉回归

在仓库根目录使用 Node24.12.0、pnpm10.26.1，先 `pnpm install --frozen-lockfile`，再 `pnpm --filter @visactor/vseed exec playwright install chromium`。

```sh
pnpm --filter @visactor/vseed test:visual --self-compare
node packages/vseed/scripts/visual-test.mjs --baseline <完整40位SHA>
node packages/vseed/scripts/visual-test.mjs --list
node --test packages/vseed/scripts/visual-test.test.mjs
```

首批四例：柱图生成和实际数据、表格字段/数值映射、真实鼠标点击表格单元、重新生成配置后更新图表。它们验证 VSeed Builder 与当前锁文件中的 VChart/VTable 集成，不代表全产品视觉覆盖。用例清单在 cases/index.mjs；可执行模块输出 createSpec、verify 和可选 exercise。业务断言显式使用 VisualAssertionError，页面加载、浏览器和超时错误不包装成业务差异。

默认基线为官方 VisActor/VBI main；两侧独立构建 VSeed，并使用各侧锁定的 VChart/VTable UMD。Playwright 固定1.63.0、单worker、800×600、DPR1，截图需连续两次完全稳定，原生比较 threshold=0.1/maxDiffPixels=0；不访问CDN。报告保留两侧提交、源码摘要、SDK摘要、冻结套件、PNG和差异图，写入 .vseed-visual/runs。退出0表示所选范围通过，1表示差异，2表示执行错误；子集或自比较不等于全量双侧验收。

Bot只在无网络隔离中使用 --offline 和逐侧准备的依赖。根pnpm-lock.yaml、workspace、包清单和配置均与冻结提交比较；缺失依赖不临时联网。宿主为Node22，独立产品CI为Node24，两套工具链证据分别记录。

真实负对照消费已经通过的本地报告：设置 VSEED_VISUAL_FIXTURE 为报告绝对目录，再运行 node --test packages/vseed/scripts/visual-negative.test.mjs。只在临时副本加入可见标记和业务断言失败；验证差异三图与错误分类，不写基准。

旧 Bug Server CI 继续处理main push及未交接的PR。VISACTOR_WORKFLOW_INTERNAL_SINCE未设置时行为保持；正式交接只针对该起点后、内部main且涉及packages/vseed/\*\*的新PR，Draft等待ready。Bot完整分页核验改名/删除和head/base，服务端独立复核。合入此入口不代表正式准入启用；切流需协调CI、Bot和服务身份共同起点及存量快照。
