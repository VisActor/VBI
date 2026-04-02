# Smoke Checklist: vbi-react Starter Demo

更新日期：2026-04-02  
范围：`practices/vbi-react-starter/src/**`

## 环境准备

```bash
pnpm --filter=vbi-react-starter run test
pnpm --filter=vbi-react-starter run lint
pnpm --filter=website run build
```

通过标准：

- 命令全部 exit code = 0。
- website 构建产物包含 starter practice 页面。

## 手动冒烟项

### 1. 桌面视口（1440x900）

- [ ] 打开 starter demo 页面。
- [ ] 点击 `Load demo data` 后，状态区显示加载成功与行数。
- [ ] 在字段面板添加维度和指标后，主区成功渲染图表。
- [ ] 切换 `ChartTypeSelector` 不报错，图表正常更新。

### 2. 窄屏视口（390x844）

- [ ] 顶栏按钮不重叠，关键操作可点击。
- [ ] `Show fields` / `Hide fields` 可切换左侧字段面板显隐。
- [ ] 字段面板收起后，主图区域可正常查看和交互。

### 3. 异常路径

- [ ] 上传非法 CSV，出现错误态提示。
- [ ] 错误后仍可点击 `Load demo data` 恢复可用状态。
- [ ] DSL 折叠面板可展开查看当前快照。

## 记录模板

执行人：`<name>`  
执行时间：`<YYYY-MM-DD HH:mm>`  
结论：`<PASS / FAIL>`  
备注：`<问题描述与复现步骤>`
