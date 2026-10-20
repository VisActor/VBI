---
name: visactor-map2d-dashboard
description: 创建富有空间感的交互式地图 Dashboard，联动地域、指标与明细。适用于地域经营、事件追踪和地理分布分析。Powered by VisActor。
---

# 地图 Dashboard

用地图、悬浮指标和流畅动效呈现地域关系与业务发现。

新建默认复制完整模板，先运行，再做最小业务适配。继承适用的材质、布局、地图动效、导航、联动和生命周期。用户指定风格或宿主约束优先；移除或重写能力时，记录原因及替代行为，并验证其余体验没有退化。

修改已有页面时沿用宿主，只读取和验收受影响的部分。

## 标准模板

新建地图 Dashboard 统一从 [template.html](templates/template.html) 起步。模板以地震观测为示例，内嵌所需模块；时间筛选、事件定位、近期动效与原始记录按实际业务适配，刷新不等于新增事件。通用复用边界与修改入口见[适配指南](references/template-adaptation.md)。

### 主题预览

| 主题 | 桌面                                   | 移动端                                     |
| ---- | -------------------------------------- | ------------------------------------------ |
| 冰蓝 | [预览](templates/template-ice-pc.png)  | [预览](templates/template-ice-mobile.png)  |
| 暖玉 | [预览](templates/template-jade-pc.png) | [预览](templates/template-jade-mobile.png) |
| 深蓝 | [预览](templates/template-dark-pc.png) | [预览](templates/template-dark-mobile.png) |
| 黑金 | [预览](templates/template-gold-pc.png) | [预览](templates/template-gold-mobile.png) |

## Step1：确定指标、范围与模板

1. 明确页面要回答的问题、展示终端和地域范围。选出核心指标，确认单位、公式、事实粒度、报告时区与比较基准。
2. 运行所选模板，查看默认态、图内直接联动与分析返回，作为适配后的对照基线。
3. 按[地图接入](references/open-street-map.md)核对地域身份、层级与坐标。发现敏感数据或地域口径问题时，按[数据源与地域口径确认](references/data-scope.md)处理。
4. 根据真实数据选择趋势、排行、构成与明细；没有历史不生成增长，没有父子关系不伪造下钻，没有依据不补造目标或事件。
5. 为有进一步分析价值的指标规划入口，按[通用指标分析](../metric-analysis/SKILL.md)确定默认问题与探索动线，按[地图分析补充](references/metric-analysis.md)处理地域范围与定位行为。

## Step2：接入数据与联动

1. 优先复用已有数据接入，其余按[数据接入判断](../server-runtime/SKILL.md#数据接入判断)选择。按[字段与完整记录](references/template-adaptation.md#字段与完整记录)统一接入、查询和实体展示的字段契约。先验证页面加载与最小查询，再核对整体、一个地域及可用的时间范围。
2. 按 [visual-query](../visual-query/SKILL.md)完成 VBI Builder 查询 → VSeed 配置 → VChart / VTable 渲染；HTML 指标消费同一查询结果，地理底图交给地图引擎。
3. 按[控件与联动](references/open-street-map.md#控件与联动)接通范围筛选、地图、指标和明细；保留适用的图元、图例和排行直接操作，标题进入分析不替代这些入口。
4. 分析继承已确认范围，关闭后保留主页筛选与视野；原位更新、状态恢复、请求取消与清理按[组合指南](../visual-query/references/composition.md)处理。

## Step3：组织布局与视觉

1. 按[布局](references/layout.md)分配地图与卡片空间，按 [L-Card](references/L-card.md)继承材质、控件和入场编排。底图细节、叠色、表面透明度与排印一起核对；有 blur 或 L 形轮廓不等于还原了体验。
2. 首屏突出核心指标和简短发现；详细口径按需展开，保留影响解读的时间、范围、样本量等信息。业务图表与点标可替换，不为保留模板效果补造趋势、事件或连线。
3. 改变底图或风格后，检查整页深浅主题、可读性与空间层次；不强制使用地貌或聚类。响应式与减少动态效果沿用宿主机制。

## Step4：验收与交付

按[验收标准](references/acceptance.md)对照实际页面与模板，验证首次体验和具体操作结果；交付时简述主动改变的能力、验证证据及未验证项。
