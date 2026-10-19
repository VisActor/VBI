# 超市经营地图看板

此目录包含页面、完整本地服务和地图坐标资源，可以整体复制到其他位置运行。需要 Node.js >=24.12.0、npm，以及可访问的 MySQL 超市明细表。

在本目录执行：

```sh
npm ci --ignore-scripts
cp .env.example .env
# 编辑 .env，填写数据库账号、密码、数据库和表名。
npm start
```

打开终端打印的地址，默认是 <http://127.0.0.1:4317/template-supermarket.html>。终端保持运行，`Ctrl+C` 停止；端口冲突时修改 `.env` 中的 `VBI_PORT`。

页面使用超市订单、商品、客户、金额及地域字段；替换业务表时需同步调整页面的字段映射和指标口径。连接配置不会创建数据库或示例订单。前端图表模块、地图底图和字体需要联网，业务数据通过本地服务读取。

- `template-supermarket.html`：页面与业务分析。
- `server.mjs`：启动入口，自动定位本目录的 HTML。
- `server/`：完整查询服务，支持 MySQL、文件、HTTP 和自定义适配器。
- `data/`：地图坐标与来源许可证。
- `.env.example`：连接配置示例；实际 `.env` 和 `node_modules/` 不随交付复制。

- `./GUIDE.md` 当前示例的实现指南
