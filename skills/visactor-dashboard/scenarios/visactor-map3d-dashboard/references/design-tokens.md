# 统一设计 Token 与玻璃材质

[完整模板](../templates/template.html)直接维护内联 CSS 和页面交互，保持单 HTML，不依赖外置材质文件、通用运行时或同步脚本。`dashboard-material` 负责本页的材质与控件样式，`dashboard-layout` 负责排版与组件结构。

## 三层设计系统

| 层   | 所有权                                          | 典型变量                                                                                 |
| ---- | ----------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 基础 | 字体、尺寸、运动、数据语义                      | `--font-ui`、`--motion-*`、六级 AQI 色                                                   |
| 模式 | 分别实现深/浅透明度、模糊、高光、阴影与表面层级 | `[data-mode=dark/light]`、`--material-*`、`--glass-*`                                    |
| 主题 | 表面底色、文本、强调色、地球/图表色             | `[data-theme=dark/graphite/ice/silver]`、`--glass-solid`、`--ink`、`--accent`、`--map-*` |

业务 JSON 不维护材质或色板。Three.js、VChart、VTable 读取 CSS token；主题切换不改变查询、范围或相机。

## 共用材质契约

外侧 `material-shell` 承担一次背景散射、局部轮廓光和软阴影，内部 `material-card` 使用独立的透光填充、局部反光与短距离接触阴影，在深浅主题下明确区分内外两层；容器和 Card 不画整圈边框，内部控件不重复模糊。容器圆角28px，内部圆角由容器圆角和实际内边距推导。设置、菜单与详情使用 `material-popover`；分析使用 `material-reading` 稳定阅读面。组件选择器和控件状态在本页 CSS 中维护，滑块偏好由本页设置逻辑保存。

深浅模式分别维护透色、散射、顶部反光与底部暗部 token。内卡通过 `--material-card-fill/light/shadow` 控制更明亮的表面与接触阴影，`--material-soft-fill` 留给设置选项和辅助叠层，避免加强内卡时连带改变控件底色。浮动控件使用较薄散射，按压短暂提亮，静止时保持安静；本页 CSS 渐变、阴影与状态过渡提供光感。

设置提供一个“玻璃强度”滑块（0通透–100凝实，默认60），协调表面覆盖、散射与轮廓光，避免仅增加遮罩。实时拖动合并到一帧，提交保存；主题切换保留强度，恢复默认将其重置。修改强度不查询数据或重建图表/地球。减少透明度和高对比覆盖滑块效果；不支持背景模糊时使用实色兜底。

`--rail-width/padding` 与 `--stage-pad/gap/inset` 只定义全屏地图上的尺寸和安全区域；外壳光学参数由 `dashboard-material` 统一维护。

## 运动 Token

首屏入场在地图就绪后共5850ms，依次完成地球放大、柱子生长、左容器、右容器、标题与控件。所有时长在本模板 token 中维护，`entrance` 按前序阶段的结束时间累加延迟，不再单独维护卡片起点。

| 阶段 | 时间范围 | Token |
| --- | --- | --- |
| 地球从20%放大至正常大小 | 0–2000ms | `--motion-globe-duration:2000ms`、`--motion-globe-start-scale:0.2` |
| 柱子从零长到指标高度 | 2000–3400ms | `--motion-column-duration:1400ms` |
| 左侧容器整体翻入 | 3500–4350ms | `--motion-card-duration:850ms` |
| 右侧容器整体翻入 | 4450–5300ms | `--motion-card-duration:850ms` |
| 标题、地图控件与说明淡入 | 5400–5850ms | `--motion-controls-duration:450ms` |

三个界面区域进场前各留 `--motion-stage-gap:100ms`；内部 Card 跟随容器，不单独翻转。地图的 `--motion-map-duration:600ms` 渐显与放大同时开始。地球只缩放画布，不改变相机、几何或布局尺寸；放大期间柱高保持零，生长复用单RAF与暂停时钟，指标切换仍沿用850ms原位更新。

分析弹窗壳450ms，内部各1500ms、起始100ms、间隔190ms；设置与菜单复用220ms整体展开。JS `motionMs` 读取毫秒值，业务刷新不重播入场；只动画transform/opacity，减少动态直接最终态。

## 地球色彩

自然地表保留真实影像，深浅底图各预计算一次，`--map-water`定义海洋基础色。`--map-ambient/key/rim/halo/outline`定义照明和边界；`--map-cloud-opacity/grid-opacity/border-opacity`控制图层层级；`--map-night-color/strength`控制历史夜光；`--map-specular`控制海洋反射；`--map-atmosphere-strength/surface-haze`分别控制外围散射与地表边缘透光。`--map-relief-gradient/bump-scale`控制真实高程阴影和微起伏，不改变原始高度。

地图token集中在一个地球配色区，默认深色值加三个显式主题覆盖，不能同时维护互相竞争的mode/theme参数。底图预计算时明确读取dark/ice的海洋值，不受当前UI的data-mode干扰；四主题切换不重新生成或上传纹理。默认冰蓝，已保存主题优先。

四主题的自然地貌与蜂窝地表均保留同一层全球30°经纬网，与2D使用相同经纬间隔；`--map-grid` / `--map-grid-opacity` 控制颜色与对比度，深色透明度0.18、浅色0.2。网格复用静态几何和单次绘制，切换主题只更新材质，层级低于国界与数据柱；蜂窝仍只是装饰纹理。

浅色地球新增 `--map-lowland/sand/snow` 控制粉彩地貌色带；`--map-shadow-floor` 控制暗部下限，`--map-cloud-floor/light` 控制云层受光。冰蓝与银雾共用同一浅色预计算底图，通过主题光色与界面强调色区分。`--map-night-strength`在浅色为0；数据层关闭夜光，自然地貌背景保留原主题夜光的16%。数据地图使用下述独立连续数值色阶；Card 的六级来源分类色保持原义。

国家轮廓单独使用 `--map-outline`、`--map-border-opacity`、`--map-border-hover-opacity`、`--map-border-selected-opacity`。浅色青灰轮廓透明度0.62，深色0.48，悬停0.84，选中0.98；选中时邻国轮廓保留默认的72%，不能让其他国家完全消失。地理分区色与AQI风险色分开，强调轮廓不改变指标口径。

## 首屏排印

基础字号集中于 `--font-page-title`（21px）、`--font-card-title`（12px）、`--font-metric`（48px）、`--font-secondary-metric`（38px）和 `--font-chart`（11px）。低于780px高的桌面只覆盖主/次指标 token 为40/34px；小字维持原有层级，不跟随大数字一起压缩。四主题共用同一套字号，图表读取同一字体 token。

## 蜂窝与晶体数据层

`--map-field-land/ocean` 定义数据层地表，`--map-hex-strength` 控制静态蜂窝边缘；国界对比度高于蜂窝，柱与交互高亮高于国界。`--map-column-low/high` 同时供柱、点、标签、选中环和连续图例使用；`--map-column-edge/cap` 只控制晶体细棱和顶面。深蓝用青蓝、石墨用灰绿、冰蓝用钢蓝、银雾用灰蓝。浅色以较深轮廓确保低值仍可读，不靠整顶涂白。

蜂窝底图云透明度为原主题值的18%，外晕强度为55%、地表边缘透光为75%，避免装饰压过数据。自然地貌沿用真实地表材质，云透明度为原来的70%，保留数据柱和国界联动。

## 紧凑控件

`--control-height:32px`用于桌面筛选触发器、工具与关闭按钮；`--control-compact-height:26px`用于分段和快捷按钮，含外框为34px。共用`--control-font:11px`、`--control-icon:15px`、`--control-radius:8px`、`--control-gap:6px`。通过内边距和圆角控制精致感，不缩放整个界面或降低正文/图表字号。国家筛选宽196px，设置面板310px，搜索浮层与主题选择一起收紧留白。

`pointer:coarse`覆盖主控件40px、紧凑按钮38px、图标16px；菜单项与主题项至少44px，开关扩大透明点击区域。保留焦点轮廓、键盘导航、长名称省略与完整菜单。尺寸不进入业务或地图状态。
