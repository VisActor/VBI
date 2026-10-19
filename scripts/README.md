# Skill 构建

`skills/visactor-dashboard/` 是唯一的技能目录，包含轻量看板、地图看板、公共能力与 API。

```sh
pnpm build:skills
```

需要根目录声明的 Node.js、pnpm 版本，以及系统 `zip` 命令。`build-skills.mjs` 每次运行
都会先从源码重新生成 `skills/visactor-dashboard/api/`，成功后再打包：

- `dist/skills/light-dashboard.zip`
- `dist/skills/map-dashboard.zip`

执行时按 `[1/11]` 至 `[11/11]` 输出当前阶段：目录检查、各包 API 生成与格式化、API 写入、两个 ZIP 打包和产物写入。提示在阶段开始前输出；全部成功后列出完成的文件及路径，失败时最后一条进度指出出错阶段。

每个 ZIP 包含同名技能根目录及其 `SKILL.md`、元数据、模板、公共查询与服务能力、API。
两个看板都包含 `metric-analysis`、`server-runtime`、`visual-query` 三份公共指南；地图场景另有自身的指标分析指南。
场景文档链接在打包时重写；缺失或未打包的本地文档依赖会使构建失败。
两个看板可以引用上述公共指南，公共指南禁止反向引用看板；两个看板禁止彼此引用。
构建时检查本地 Markdown 链接的依赖方向，违规时终止构建并保留已有 ZIP。
依赖目录、本地环境配置、日志、缓存和嵌套 ZIP 不进入产物，`.env.example` 保留。
`dist/` 已由 Git 忽略，分发产物无需人工维护。

修改场景指南、模板或元数据时，编辑 `skills/visactor-dashboard/references/<场景>/`。
公共能力在 `skills/visactor-dashboard/references/` 中维护。API 工作流说明的源文件是
`scripts/skill-api/`；声明和 JSDoc 来自对应包源码。API 生成由构建脚本内部调用，
统一使用 `pnpm build:skills`。API 生成失败时停止打包，保留已有 ZIP。

构建脚本的测试命令为：

```sh
node --test scripts/build-skill-api.test.mjs scripts/build-skills.test.mjs
```

打包测试还使用系统 `unzip` 命令检查解压后的独立技能。
