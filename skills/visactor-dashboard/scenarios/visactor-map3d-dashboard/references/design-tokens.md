# 统一设计 Token 与玻璃材质

[完整模板](../templates/template.html)中 `dashboard-design-tokens` 是唯一基础定义，`dashboard-material` 是唯一玻璃实现；`dashboard-layout` 只负责排版与组件结构。保持单 HTML 交付，不依赖外置 CSS。

## 三层设计系统

| 层   | 所有权                                         | 典型变量                                                                  |
| ---- | ---------------------------------------------- | ------------------------------------------------------------------------- |
| 基础 | 字体、圆角、尺寸、运动、数据语义               | `--font-ui`、`--glass-radius`、`--motion-*`、六级 AQI 色                  |
| 模式 | 透明、模糊、折光、高光、阴影、内面、浮层、遮罩 | `--glass-*`，`:root` 为深色基线，`[data-mode=light]` 统一浅色覆盖         |
| 主题 | 背景冷暖、文本、强调色、地球/图表色            | `[data-theme=dark/gold/ice/jade]`，`--bg`、`--ink`、`--accent`、`--map-*` |

业务 JSON 不维护材质或色板。Three.js、VChart、VTable 读取同一 CSS token；主题切换不改变查询、范围或相机。

## 共用材质契约

- `--glass-surface`：浅色约54%白、深色约54%墨色；与外壳透光底分开维护。
- `--glass-sheen` / `--glass-background`：单层柔和折光渐变与透明底色组合。
- `--glass-filter`：快捷控件的轻模糊；侧栏统一由 `--rail-filter` 承担18px背景模糊，内卡不重复模糊，不逐帧动画。
- `--glass-edge` / `--glass-inset` / `--glass-inset-shadow`：细透光边缘、局部柔白折光与内缘光。
- `--glass-shadow` / `--glass-hover-shadow`：柔和悬浮阴影，不用强烈发光轮廓。
- `--glass-tile` / `--glass-tile-shadow`：分析内部轻量表面，不重复背景模糊。
- `--glass-control` / `--glass-control-hover` / `--glass-divider`：按钮、筛选和分析入口共用。
- `--glass-popover` / `--glass-fallback` / `--glass-scrim`：菜单、阅读面与遮罩；分析弹窗保持接近不透明的稳定阅读面，避免主页文字透印。

`.card`、快捷胶囊、选择面板与设置共用材质选择器。液态观感来自静态折光、圆角边缘和柔和层次，不加循环扫光、假位移噪声或多层大面积模糊。不支持 backdrop-filter 或减少透明时使用 fallback；正常/悬停/聚焦/禁用均检查合成后对比度。

`--rail-width/padding/radius/background/edge/filter/shadow` 定义外容器；`--stage-pad/gap/inset` 定义全屏地图上的安全区域。外壳与内卡分别使用 rail / glass token，四主题共用同一实现。

## 运动 Token

`--motion-card-duration:2400ms`，`--motion-card-stagger:300ms`；卡片86°侧轴翻页，地球1900ms。弹窗壳450ms，内部各1500ms、起始100ms、间隔190ms。JS `motionMs` 读取这些值；业务刷新不重播入场。只动画transform/opacity，减少动态直接最终态。用户调整节奏时只修改token，不在各入口复制时长。

## 地球色彩

自然地表保留真实影像，深浅底图各预计算一次，`--map-water`定义海洋基础色。`--map-ambient/key/rim/halo/outline`定义照明和边界；`--map-cloud-opacity/grid-opacity/border-opacity`控制图层层级；`--map-night-color/strength`控制历史夜光；`--map-specular`控制海洋反射；`--map-atmosphere-strength/surface-haze`分别控制外围散射与地表边缘透光。`--map-relief-gradient/bump-scale`控制真实高程阴影和微起伏，不改变原始高度。

地图token集中在一个地球配色区，默认深色值加三个显式主题覆盖，不能同时维护互相竞争的mode/theme参数。底图预计算时明确读取dark/ice的海洋值，不受当前UI的data-mode干扰；四主题切换不重新生成或上传纹理。默认冰蓝，已保存主题优先。

浅色地球新增 `--map-lowland/sand/snow` 控制粉彩地貌色带；`--map-shadow-floor` 控制暗部下限，`--map-cloud-floor/light` 控制云层受光。冰蓝与暖玉共用同一浅色预计算底图，通过主题光色与界面强调色区分。`--map-night-strength`在浅色为0；数据层关闭夜光，自然地貌背景保留原主题夜光的16%。数据地图使用下述独立连续数值色阶；Card 的六级来源分类色保持原义。

国家轮廓单独使用 `--map-outline`、`--map-border-opacity`、`--map-border-hover-opacity`、`--map-border-selected-opacity`。浅色青灰轮廓透明度0.62，深色0.48，悬停0.84，选中0.98；选中时邻国轮廓保留默认的72%，不能让其他国家完全消失。地理分区色与AQI风险色分开，强调轮廓不改变指标口径。

## 首屏排印

基础字号集中于 `--font-page-title`（21px）、`--font-card-title`（12px）、`--font-metric`（48px）、`--font-secondary-metric`（38px）和 `--font-chart`（11px）。低于780px高的桌面只覆盖主/次指标 token 为40/34px；小字维持原有层级，不跟随大数字一起压缩。四主题共用同一套字号，图表读取同一字体 token。

## 蜂窝与晶体数据层

`--map-field-land/ocean` 定义数据层地表，`--map-hex-strength` 控制静态蜂窝边缘；国界对比度高于蜂窝，柱与交互高亮高于国界。`--map-column-low/high` 同时供柱、点、标签、选中环和连续图例使用；`--map-column-edge/cap` 只控制晶体细棱和顶面。深蓝用青蓝、黑金用香槟、冰蓝用钢蓝、暖玉用青绿。浅色以较深轮廓确保低值仍可读，不靠整顶涂白。

蜂窝底图云透明度为原主题值的18%，外晕强度为55%、地表边缘透光为75%，避免装饰压过数据。自然地貌沿用真实地表材质，云透明度为原来的70%，保留数据柱和国界联动。

## 紧凑控件

`--control-height:30px`用于桌面筛选触发器、工具与关闭按钮；`--control-compact-height:26px`用于分段和快捷按钮，含外框为34px。共用`--control-font:11px`、`--control-icon:14px`、`--control-radius:8px`、`--control-gap:6px`。通过内边距和圆角控制精致感，不缩放整个界面或降低正文/图表字号。国家筛选宽196px，设置面板310px，搜索浮层与主题选择一起收紧留白。

`pointer:coarse`覆盖主控件40px、紧凑按钮38px、图标16px；菜单项与主题项至少44px，开关扩大透明点击区域。保留焦点轮廓、键盘导航、长名称省略与完整菜单。尺寸不进入业务或地图状态。
