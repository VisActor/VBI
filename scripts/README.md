# Skill 构建

`skills/visactor-dashboard/` 是统一入口。四个独立场景技能位于 `scenarios/`；共用指南和 API 文档位于 `references/`，其中只有场景目录保留 `SKILL.md`。

```sh
pnpm build:skills

# 对照当前源码检查 ZIP 是否过期或缺失
pnpm build:skills --check
```

需要根目录声明的 Node.js、pnpm 版本，以及系统 `zip` 命令。`build-skills.mjs` 每次运行
都会先从源码重新生成 `skills/visactor-dashboard/references/api/`，成功后再打包：

- `dist/skills/visactor-light-dashboard.zip`
- `dist/skills/light-dashboard.zip`
- `dist/skills/visactor-map2d-dashboard.zip`
- `dist/skills/map2d-dashboard.zip`
- `dist/skills/visactor-chart-editor.zip`
- `dist/skills/chart-editor.zip`
- `dist/skills/visactor-map3d-dashboard.zip`
- `dist/skills/map3d-dashboard.zip`

执行时按 `[1/17]` 至 `[17/17]` 输出当前阶段：目录检查、各包 API 生成与格式化、API 写入、八个 ZIP 打包和产物写入。提示在阶段开始前输出；全部成功后列出完成的文件及路径，失败时最后一条进度指出出错阶段。

每个 ZIP 包含同名技能根目录及其 `SKILL.md`、元数据、模板、公共查询与服务能力、API。
根目录 `SKILL.md` 的 `name` 与 ZIP 文件名一致；每个不带前缀的 ZIP 与对应的 `visactor-` ZIP 复用同一场景资源。
四个场景都包含 `metric-analysis`、`server-runtime`、`visual-query` 三份公共指南及 `references/api/`；二维地图场景另有自身的指标分析指南。共用指南和 API 入口均为 `guide.md`，不会被识别为独立技能。
场景文档链接在打包时重写；缺失或未打包的本地文档依赖会使构建失败。
四个场景可以引用上述公共指南，公共指南禁止反向引用场景；四个场景禁止彼此引用。
构建时检查本地 Markdown 链接的依赖方向，违规时终止构建并保留已有 ZIP。
模板 HTML 直接读取当前工作区文件，未提交的修改同样进入 ZIP，不使用之前的 ZIP 或预览服务缓存。
全部包生成成功后覆盖当前八个 ZIP，并清理 `dist/skills/` 中不再分发的旧 ZIP；其他文件和目录保留。
`--check` 同样先重新生成 API，并在临时目录完整打包，再逐字节比较重新生成的 ZIP；过期、缺失或存在旧 ZIP 时返回失败，不改写分发目录。打包时统一文件时间戳，新旧判断不依赖源文件修改时间。
依赖目录、本地环境配置、日志、缓存和嵌套 ZIP 不进入产物，`.env.example` 保留。
`dist/` 已由 Git 忽略，分发产物无需人工维护。

修改场景指南、模板或元数据时，编辑 `skills/visactor-dashboard/scenarios/<场景>/`。
公共能力在 `skills/visactor-dashboard/references/` 中维护。API 工作流说明的源文件是
`scripts/skill-api/`；声明和 JSDoc 来自对应包源码。API 生成由构建脚本内部调用，
统一使用 `pnpm build:skills`。API 生成失败时停止打包，保留已有 ZIP。
修改模板后重新构建分发包；本机已安装的技能通过重新导入新 ZIP 更新。模板预览 PNG 按源文件打包，不在构建阶段重新截图。
VSeed 仅收录使用所需的 DSL、Builder 与类型等 API，跳过体积庞大的运行时 schema 声明（`z*`）及 `schemas.md`，重建时清除旧文件和索引引用。

构建脚本的测试命令为：

```sh
node --test scripts/build-skill-api.test.mjs scripts/build-skills.test.mjs
```

打包测试还使用系统 `unzip` 命令检查解压后的独立技能。
