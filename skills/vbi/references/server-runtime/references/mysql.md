# MySQL 数据源

查询 DSL、SQL 编译与 schema 校验的 API 参考见 [VQuery 子技能](../../vquery/SKILL.md)；本篇维护 MySQL 连接、只读事务与数据库时钟约定；启动流程见 [server-runtime](../SKILL.md)。

`scripts/runtime` 直接提供 HTML、查询接口和 MySQL 只读执行。启动时指定 HTML，连接参数放在环境变量或 `.env` 中。

## 启动

```sh
cd skills/vbi/references/server-runtime/scripts/runtime
npm ci --ignore-scripts
# 将 .env.example 复制为 .env，填写账号、数据库和表名。
npm start -- /absolute/path/to/dashboard.html
```

必须设置 `VBI_MYSQL_USER`、`VBI_MYSQL_DATABASE` 和 `VBI_MYSQL_TABLE`。`VBI_MYSQL_HOST` 默认 `127.0.0.1`，`VBI_MYSQL_PORT` 默认 3306，密码由 `VBI_MYSQL_PASSWORD` 提供。服务只监听本机，默认端口 4317，可用 `VBI_PORT` 调整；按打印的 URL 打开页面，`Ctrl+C` 停止。

runtime 通过 `SHOW COLUMNS` 读取并缓存表结构，映射为 VBI / vquery 的 number、string、date、datetime、timestamp 类型；数据源 ID 使用表名。字段和类型随实际表结构提供，修改表结构后重启服务。

MySQL 会话偏移 `VBI_MYSQL_TIMEZONE` 默认 `+00:00`，按数据语义设置；context 的数据库时钟使用同一会话时间。刷新间隔由页面管理。凭据仅保存在进程环境或被忽略的 `.env` 中。

页面会话、JSON 资源注入与 HTTP 协议见 [页面与服务协议](protocol.md)。

## 运行超市地图看板示例

[超市示例项目](../../map-dashboard/templates/supermarket/README.md) 包含 HTML、服务入口、运行时、地图资源和依赖锁文件，可复制整个目录独立运行：

```sh
cd skills/vbi/references/map-dashboard/templates/supermarket
npm ci --ignore-scripts
cp .env.example .env
# 编辑 .env，填写可访问实际数据表的账号、密码和连接参数。
npm start
```

`local_data.supermarket` 和 `+08:00` 是该示例的数据表与会话时区，按实际数据源调整；账号遵循通用连接配置。runtime 从 MySQL 读取实际表结构，页面使用 context 返回的表名、schema 与数据库时钟。

打开 <http://127.0.0.1:4317/template-supermarket.html>，保持终端运行，`Ctrl+C` 停止；以后在项目目录执行 `npm start` 即可，端口冲突时通过 `VBI_PORT` 指定空闲端口。复制或交付项目时排除实际 `.env` 和 `node_modules/`。

模板通过 `data-src` 声明地图 JSON 资源，runtime 按 [页面与资源注入协议](protocol.md#页面与资源注入) 提供资源。地图资源归 [地图看板技能](../../map-dashboard/SKILL.md)维护，业务口径、布局和交互见 [超市经营实践](../../map-dashboard/templates/supermarket/GUIDE.md)。

## 接口与验证

- `GET /api/context`：`{sourceId, schema, now}`：实际表名、表结构与数据库会话时钟。
- `POST /api/query`：`{queries: VQueryDSL[]}` → `{results: [{dataset: [...]}]}`。DSL 与完整 schema 交给 vquery 编译，mysql2 绑定执行结果；runtime 不补充业务字段或 limit。
- 每批查询共用只读一致性事务，失败回滚并归还连接。请求体最多 64 KiB、批次 1–10 条、并发最多 3，数据库查询限制 4 秒。校验 Host、Origin 和会话令牌，不接收任意 SQL。

```sh
cd skills/vbi/references/server-runtime/scripts/runtime
npm test
npm run test:unit:coverage
npm run test:coverage
```
