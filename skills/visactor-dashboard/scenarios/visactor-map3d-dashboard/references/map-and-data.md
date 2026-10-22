# 空气质量样本与空间语义

## 来源与事实粒度

[完整模板](../templates/template.html)内嵌用户提供的 `template-air-pollution.csv` 全部 23,463 行、原始 12 列。每行是一条来源城市样本；没有采样日期、时区、人口或城市经纬度，不宣称实时、时间趋势、官方国家 AQI 或人口暴露。

CSV 原列：Country、City、AQI Value / Category，以及 CO、Ozone、NO2、PM2.5 的 AQI Value / Category。空国家 427 行、空城市 1 行，原始数值列无缺失，整行没有重复。接入生成稳定行 ID，映射为 `country/city/aqi/category/co/coCategory/ozone/ozoneCategory/no2/no2Category/pm25/pm25Category`；原始空值保留 `null`，展示兜底不能覆盖源字段。

`countryKey`、`cityKey` 是独立筛选身份键，允许选择未标注记录；`high`、`veryHigh`、`missingCountry` 等是接入层逐行派生字段，在 schema 声明后交给查询聚合。国家均值按城市样本行等权，不能平均国家均值冒充全样本均值；样本量与国家比较同时展示。

## AQI 与等级的真实差异

- AQI>100 共 4,244 行，>150 共 2,610 行。它们由数值阈值定义，与来源分类分开计算。
- 来源六等级为 Good 9,936、Moderate 9,231、Unhealthy for Sensitive Groups 1,591、Unhealthy 2,227、Very Unhealthy 287、Hazardous 191。
- 来源等级与常见数值分箱不一致 148 行；总 AQI 不等于四项子指数最大值 141 行。保留并提供明细核对，不自动修正。
- CO / O₃ / NO₂ / PM2.5 都是 AQI 子指数，不是浓度。不能求和解释“污染贡献”。PM2.5 达到最高子指数的 18,523 行包含并列；不能称为唯一主导。
- 中位数按完整原始查询结果计算，偶数样本取中间两值均值；P90 使用 nearest-rank（排序后第 ceil(n×0.9) 项）。不能用 Top N 或可见表格行估算。

## 地理资料与映射

底图使用 [Natural Earth v5.1.2 的 1:110m 国家几何](https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_110m_admin_0_countries.geojson)，国家代表位置 / 标签来自[同版 1:10m 元数据](https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_10m_admin_0_countries.geojson)的 LABEL_X / LABEL_Y。数据属[公共领域](https://www.naturalearthdata.com/about/terms-of-use/)。模板内嵌轻量几何和必要标签元数据，不运行时抓取地理文件。

源国家名到地图 ADMIN 的显式别名覆盖全部 175 个非空国家，不改写 Country 原值。427 行空国家仍在总体、分析与完整明细中，不绘制伪位置；微型国家可有真实国家代表点，即使 110m 几何没有单独轮廓。地图表达来源国家归属，不凭城市名称纠正归属或推断城市坐标。

球面换算为 `x=r*cos(lat)*cos(lon)`、`y=r*sin(lat)`、`z=-r*cos(lat)*sin(lon)`，角度先转弧度，与纹理映射一致。四主题的自然地表与海洋着色表达地理材质；风险层国家六边形柱高与颜色按当前指标映射，不能把地形颜色当 AQI 热力。样本量在国家摘要与分析中呈现，选中环加强国家定位。经纬网是空间参考，不是城市密度或监测事件。

射线拾取同时测试地球遮挡体与国家点，防止背面穿透。hover 只预览，不改范围；点击代表点或国家控件才确认范围。选中后保留全球比较背景并明确当前高亮；筛选不伪装成行政下钻。

更换数据或地图时明确来源、边界尺度、坐标系与身份映射。局部区域应使用适当投影与真实 Polygon / MultiPolygon / 洞，不能放大球面截图冒充精确城市地图。

## 地表影像与真实高程

- 地表：[NASA Earth Observatory / Blue Marble 2004 年 8 月](https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-topography/)，5400×2700 自然色影像。按主题保留自然颜色并调整海洋与明暗，不更改地理位置；图像亮度不作为高程。
- 高程：[NASA 发布的 GEBCO 地形栅格](https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/topography-bathymetry-maps/)，`gebco_08_rev_elev_5400x2700.jpg`，原图约 8km/像素，0–6400 米编码。灰度双线性采样驱动自适应球面网格，重算顶点法线，4096×2048 bumpMap 保留细节。同一真实高程的梯度生成静态西北向地形阴影，使小山脊在低面数网格上仍可辨；阴影仅是视觉表达，不改变原始海拔。陆地高程视觉夸张 35 倍；栅格上限、网格采样与 JPEG 量化意味着不能测量珠峰等精确峰值。
- 云层：[NASA 2002 Blue Marble 历史合成影像](https://science.nasa.gov/earth/earth-observatory/the-blue-marble-true-color-global-imagery-at-1km-resolution/)，透明独立受光壳层，仅为背景，不是当前天气，不与 AQI 建立未经数据支持的关系。

- 夜光：[NASA Black Marble 2016](https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps/)，灰度全球图`BlackMarble_2016_01deg_gray.jpg`，3600×1800、约357KiB、0.1°像元。WGS84，图像左上为(-180°,90°)，向右为东、向下为南；它是历史合成背景，不表示AQI、业务点密度或实时灯光。暖色自发光与轻量预烘焙柔化是艺术化表达，日侧也保留少量城市光。

以上影像从 NASA 的公开 CloudFront 资源端点加载，设置 anonymous CORS，画布可安全采样；无需把数 MB 的 base64 写入 HTML。地表/高程/云层失败时显示明确三维降级状态，指标查询仍可用；可选夜光6秒内不可用时只关闭夜光，完整地球和分析仍可用。署名 NASA Earth Observatory，地形图同时归属 NASA / GEBCO。几何、边界、点位使用同一经纬度与高程采样；代表点必须在地表之外，射线遮挡使用变形后的实际网格。主题读取 CSS token，复用预计算底图，避免重复重建纹理素材。夜光强度编码在两张地表缓存纹理的 alpha 通道（128–255），地表材质保持不透明；云影预计算进地表 RGB，海洋反射从地表颜色轻量判别，不增加逐片元纹理采样。销毁释放两张地表缓存、高程与云层共4张GPU纹理及所有网格；初始化每次让步检查页面状态，异常及中途退出也通过统一释放路径清理。

## 国家柱图与底图口径

国家 Builder 在原有 `mean = avg(aqi)`、`n = sum(rowCount)`、`high = sum(high)` 之外增加 `highRate = avg(high)`；逐行high是AQI>100的0/1指示值。Three.js只读取这份全量聚合结果，不遍历源记录重新分组或求比例。175个已定位国家显示为国家代表位置上的六边形汇总柱，绝非H3网格或城市蜂窝；未标注国家427条仍在总体与分析中。

- AQI均值：柱高固定0–500，颜色沿当前主题低/高端色连续映射0–500，与柱高同尺度；不是六级健康分类色。
- 超阈值占比：固定0–100%，颜色沿同一主题低/高端色连续变化；分母是该国家全部来源样本，不是人口或仅超阈值样本。India为1765/2488（70.94%）、China为521/795（65.53%）。
- 底图：设置中开关蜂窝/自然地貌，默认蜂窝；两者均显示同一数据柱/点/图例，历史云影与夜光仍只是背景。

两种底图消费同一缓存，切底图、指标、主题均不新增数据查询。选中国家保留全球比较背景；摘要始终并列AQI、n与占比，分析入口使用该国家全部记录，不误套AQI>100固有风险过滤。地图缺少时间字段，柱体生长、慢转与6秒循环光带不是时间播放。光效循环不改变柱高或任何统计值。
