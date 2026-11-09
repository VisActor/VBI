# Skill 构建

`skills/visactor-dashboard/SKILL.md` 维护场景选择和公共模块索引。四个场景的专属说明位于 `scenarios/<场景>/SKILL.md`；共用分析指南位于 `references/`，API 文档位于同级的 `api/`，本地服务与数据接入资料位于 `server-runtime/`。

```sh
pnpm build:skills

# 对照当前源码检查 ZIP 是否过期或缺失
pnpm build:skills --check
```

需要根目录声明的 Node.js、pnpm 版本，以及系统 `zip` 命令。`build-skills.mjs` 每次运行
都会先从源码重新生成 `skills/visactor-dashboard/api/`，成功后再打包：

- `dist/skills/light-dashboard.zip`
- `dist/skills/map2d-dashboard.zip`
- `dist/skills/chart-editor.zip`
- `dist/skills/map3d-dashboard.zip`

执行时按 `[1/13]` 至 `[13/13]` 输出当前阶段：目录检查、各包 API 生成与格式化、API 写入、四个 ZIP 打包和产物写入。提示在阶段开始前输出；全部成功后列出完成的文件及路径，失败时最后一条进度指出出错阶段。

每个 ZIP 包含同名技能根目录及其 `SKILL.md`、元数据、模板、公共查询与服务能力、API。
场景目录名、根目录 `SKILL.md` 的 `name` 与 ZIP 文件名一致。
四个场景都包含 `references/` 下以 `data-analysis-`、`deep-analysis-`、`visual-query-` 为前缀的三类公共资料，以及同级的 `server-runtime/` 和 `api/`。公共文档直接放在 `references/` 下，不包含子目录，例如 `data-analysis-guide.md`、`deep-analysis-interaction.md` 和 `visual-query-guide.md`。公共 JS/CSS 资源在 `skills/visactor-dashboard/assets/` 中维护，打包到每个独立技能的 `assets/`，例如 `assets/visual-query-dashboard-data.js`；引用它们的 Markdown 链接同步改写。模块的触发条件和文档关系直接维护在统一入口。

本地服务的文档、运行脚本、测试、依赖清单和锁文件全部直接放在 `server-runtime/` 下，不包含子目录。环境配置示例见 `server-runtime/doc-guide.md`。运行文档统一使用 `doc-` 前缀，例如 `server-runtime/doc-guide.md` 和 `server-runtime/doc-protocol.md`。API 文件直接放在 `api/` 下，以 `vbi-`、`vseed-`、`vquery-` 为前缀，例如 `api/vquery-guide.md` 和 `api/vbi-chart-builder.md`。`data-analysis-guide.md` 维护分析契约、比较口径与证据验收；`deep-analysis-interaction.md` 负责分析入口、局部探索和返回。公共资料不含 `SKILL.md`，不会被识别为独立技能。
每个独立技能的 `SKILL.md` 由场景专属说明与统一入口中 `## 通用模块` 至文件末尾的内容组成。公共模块只在统一入口维护，场景源码通过链接访问它；构建时插入公共模块并按两份来源各自的路径改写链接，不带入统一入口的四场景路由。

分发包只允许根文件和一级资源目录中的文件，例如 `SKILL.md`、`references/data-analysis-guide.md`、`assets/analysis.js`；不包含 `scenarios/`、嵌套资源目录或额外 `SKILL.md`。场景的 frontmatter `name` 必须与目录及 ZIP 名相同，并提供非空 `description`。重复目标路径、过深目录和错误入口会使构建失败，不会覆盖已有 ZIP。

构建时改写本地 Markdown 链接并验证目标文件和标题锚点（含重复标题编号与 URL 编码的锚点），代码围栏里的示例保持原样。缺失、未打包或锚点失效的依赖都会使构建失败。
四个场景可以引用上述公共指南与资源，公共指南与资源禁止反向引用场景；四个场景禁止彼此引用。
构建时检查本地 Markdown 链接的依赖方向，违规时终止构建并保留已有 ZIP。
模板 HTML 直接读取当前工作区文件，未提交的修改同样进入 ZIP，不使用之前的 ZIP 或预览服务缓存。
全部包生成成功后覆盖当前四个 ZIP，并清理 `dist/skills/` 中不再分发的旧 ZIP；其他文件和目录保留。
`--check` 同样先重新生成 API，并在临时目录完整打包，再逐字节比较重新生成的 ZIP；过期、缺失或存在旧 ZIP 时返回失败，不改写分发目录。打包时统一文件时间戳，新旧判断不依赖源文件修改时间。
依赖目录、本地环境配置、日志、缓存和嵌套 ZIP 不进入产物，`.env.example` 保留。
`dist/` 已由 Git 忽略，分发产物无需人工维护。

修改场景指南、模板或元数据时，编辑 `skills/visactor-dashboard/scenarios/<场景>/`。
公共分析能力在 `skills/visactor-dashboard/references/` 中维护，本地服务在 `skills/visactor-dashboard/server-runtime/` 中维护。API 工作流说明的源文件是
`scripts/skill-api/`；声明和 JSDoc 来自对应包源码。API 生成由构建脚本内部调用，
统一使用 `pnpm build:skills`。API 生成失败时停止打包，保留已有 ZIP。
修改模板后重新构建分发包；本机已安装的技能通过重新导入新 ZIP 更新。模板预览 PNG 按源文件打包，不在构建阶段重新截图。
VSeed 仅收录使用所需的 DSL、Builder 与类型等 API，跳过体积庞大的运行时 schema 声明（`z*`）及 `schemas.md`，重建时清除旧文件和索引引用。

构建脚本的测试命令为：

```sh
node --test scripts/build-skill-api.test.mjs scripts/build-skills.test.mjs
```

打包测试还使用系统 `unzip` 命令检查解压后的独立技能。
