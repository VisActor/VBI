# OpenStreetMap 地图接入

参考[超市经营](../templates/supermarket/template-supermarket.html)的立体点标与飞线、[地震观测](../templates/template-earthquakes.html)的事件涟漪、[电厂分布](../templates/template-power-plants.html)的底图选型与高程阴影；以下局部 HTML 片段按序共享 `map`，数据与筛选由宿主提供。

## 位置数据

- 先确定地图上的点代表地域汇总、事件还是实体。实体和事件使用稳定 ID；地域键带父级，避免同名城市混在一起。
- 再核对坐标来源、坐标系和精度；行政代表点不能当作门店或事件的真实位置。转换规则随来源确定，不照搬超市的中国地名索引。
- 区分无效记录与有效但未定位的记录。后者保留在业务统计和明细中，说明未定位数量，不借用省会或其他位置补点；核对总体与地图覆盖范围。
- 实时事件按 ID、发生时间和修订时间识别新增或更新，同一事件刷新不重播；静态快照不生成实时事件。近期动效缺少位置时跳过，不拿旧事件补位。

## 接入与底图

1. 引入同版本 MapLibre JS / CSS，设置地图容器；坐标统一为 WGS84 `[经度, 纬度]`，检查空值与范围，城市代表点注明精度。
2. 按场景选择底图；矢量接 style URL，栅格配置 `tiles`、`tileSize`、`maxzoom` 和署名。底图与高程源分别配置。

| 底图                                    | 选择依据与接法                                                                                                       |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| OpenFreeMap Positron / Bright / Liberty | OSM 矢量；灰白适合指标阅读，明彩适合地域区分，街道适合门店下钻；[style 接入](https://openfreemap.org/quick_start/)。 |
| OpenFreeMap Dark / Fiord                | 深灰或蓝灰矢量；适合经营大屏、亮色点标与飞线，接法同上。                                                             |
| NASA Blue Marble + OSM 标注             | 经营、地震示例同款；地貌栅格去饱和、压暗，叠加 OpenFreeMap 边界与地名；适合全国、全球概览，原始瓦片最高 8 级。       |
| EOX terrain / terrain-light             | 自然或浅色地形，适合电厂、资源分布；接 [WMTS](https://maps.eox.at/)，注意 `{z}/{y}/{x}` 顺序及来源署名。             |

3. 地貌影像、hillshade 阴影和真实三维地形分开选择；前两者不代表真实高程起伏。需要三维地形时接入 `raster-dem`、调用 `setTerrain` 并设置倾斜视角；使用 `setStyle` 切换后在 `style.load` 恢复。参见 [3D 地形](https://maplibre.org/maplibre-gl-js/docs/examples/3d-terrain/)。
4. 切换底图保留相机、筛选和业务图层，同步叠色、署名和加载状态。仅切背景层时保留业务层；使用 `setStyle` 时重新挂载业务层并恢复顺序。失败或回退要明示，未加载的地形不能标记就绪；容器变化调用 `resize()`。

以下片段演示需要真实三维地形的接法。

```html
<!-- 接入片段：替换为宿主地图容器；style 可选矢量 URL 或下方栅格配置。 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.2/dist/maplibre-gl.css" />
<div id="map" style="position:relative;height:100%;min-height:420px"></div>
<output id="terrain-status" role="status">正在加载高程地形…</output>
<button id="retry-map" hidden>重试地图</button>
<script src="https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.2/dist/maplibre-gl.js"></script>
<script>
  const rasterBase = (tiles, maxzoom, attribution, dark = false) => ({
    version: 8,
    sources: { base: { type: 'raster', tiles: [tiles], tileSize: 256, maxzoom, attribution } },
    layers: [
      {
        id: 'base',
        type: 'raster',
        source: 'base',
        paint: dark
          ? {
              'raster-saturation': -1,
              'raster-brightness-max': 0.65,
            }
          : {},
      },
    ],
  })
  const basemaps = {
    positron: 'https://tiles.openfreemap.org/styles/positron',
    dark: 'https://tiles.openfreemap.org/styles/dark',
    relief: rasterBase(
      'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg',
      8,
      '<a href="https://www.earthdata.nasa.gov/">NASA Blue Marble / GIBS</a>',
      true,
    ),
    eox: rasterBase(
      'https://tiles.maps.eox.at/wmts/1.0.0/terrain-light_3857/default/g/{z}/{y}/{x}.jpg',
      13,
      'Rendering © <a href="https://maps.eox.at/">EOX</a> · Data © <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors & <a href="https://maps.eox.at/#data">others</a>',
    ),
  }
  // NASA 的 OSM 边界与地名层复用经营模板 geography / boundaries / city-labels 配置。
  let currentBase = 'dark',
    elevationFailed = false
  const terrainStatus = document.getElementById('terrain-status')
  const retryMap = document.getElementById('retry-map')
  const map = new maplibregl.Map({
    container: 'map',
    style: basemaps[currentBase],
    center: [110, 32],
    zoom: 4,
    pitch: 45,
    maxPitch: 65,
  })
  map.on('style.load', () => {
    elevationFailed = false
    terrainStatus.textContent = '正在加载高程地形…'
    if (!map.getSource('elevation'))
      map.addSource('elevation', {
        type: 'raster-dem',
        tileSize: 256,
        encoding: 'terrarium',
        maxzoom: 12,
        tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
        attribution:
          '<a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md">高程 © Mapzen / Tilezen 数据提供方</a>',
      })
    const labels = map.getStyle().layers.find((layer) => layer.type === 'symbol')?.id
    if (!map.getLayer('elevation-shade'))
      map.addLayer(
        { id: 'elevation-shade', type: 'hillshade', source: 'elevation', paint: { 'hillshade-exaggeration': 0.45 } },
        labels,
      )
    map.setTerrain({ source: 'elevation', exaggeration: 1.2 })
    // 宿主在此恢复自定义业务 source / layer；DOM Marker 与筛选状态继续保留。
  })
  map.on('idle', () => {
    if (!elevationFailed && map.getTerrain() && map.isSourceLoaded('elevation')) {
      terrainStatus.textContent = '高程地形已就绪'
      retryMap.hidden = true
    }
  })
  map.on('error', (event) => {
    elevationFailed = true
    terrainStatus.textContent = event.sourceId === 'elevation' ? '高程加载失败，请重试' : '地图资源加载失败，请重试'
    retryMap.hidden = false
  })
  function changeBasemap(id) {
    if (!Object.hasOwn(basemaps, id)) return
    currentBase = id
    terrainStatus.textContent = '正在加载高程地形…'
    retryMap.hidden = true
    map.setStyle(basemaps[id], { diff: false }) // style.load 必定重新接入高程。
  }
  retryMap.onclick = () => changeBasemap(currentBase)
</script>
```

## 叠色与视觉还原

- 复用底图时一起核对瓦片、背景色、栅格饱和度／对比度／亮度／透明度、边界地名、网格及 CSS 叠色与暗角；只复制瓦片 URL 或给图片加灰度滤镜，不能还原示例观感。
- 按“地貌明暗 → 半透明色罩 → 渐变与暗角”分层调色：先保留山脊、海陆的明暗层次，再统一色调，最后压暗边缘；叠色只调整视觉，不能替代地形数据。
- [地震示例](../templates/template-earthquakes.html)的 `.terrain-shade` 用 `#0a315333` 蓝色罩、局部蓝光与深蓝渐变形成午夜蓝；[超市示例](../templates/supermarket/template-supermarket.html)的画布 `::after` 用 `#22262c0a` 灰色罩与中性暗角形成炭灰。复用时连同渐变、阴影及地图 paint 参数迁移，颜色值仅作示例。
- 叠色限定在地图区域，装饰层设 `pointer-events: none`，明确其与点标、文字、卡片的层级，避免整页滤镜影响内容；按底图 ID 切换整套样式并清除旧叠色，防止重复压暗或深浅色切换后残留色罩。
- 区域选中填充也会改变底图颜色；优先描边或低透明填充，深色地貌可从 `0.05–0.10` 试调，同时检查选中辨识度与地形细节，避免大面积实色遮住山脉。
- 缩略图从同一地图样式与叠色的实际渲染生成，待资源加载完成后截图缩小；不要用单张瓦片加滤镜代替。暗角应随画幅缩放，不能把大屏的 `160px` 内阴影直接套到小卡片；底图样式变化后同步更新预览。
- 对照还原度时统一中心、缩放、倾斜角和视口，检查默认、区域选中及深浅色往返切换；点标、涟漪、飞线属于业务表现，按当前真实数据保留，不能算作底图本身的效果。

## 标记点与飞线

- 点标采用球面高光、暗面、投影与光晕，叠加光柱和双环涟漪；尺寸映射指标，颜色映射状态，仅近期事件或选中项播放动效；定位留给 Marker，动画作用于内层。

```html
<!-- 点标片段：由宿主查询结果调用 upsertPoint(row, maxValue)。 -->
<template id="map-point-template">
  <button class="map-point">
    <span class="beam" aria-hidden="true"></span><span class="rings" aria-hidden="true"></span
    ><span class="orb" aria-hidden="true"></span>
  </button>
</template>
<style>
  .map-point {
    --tone: #e2c27c;
    width: 44px;
    height: 44px;
    border: 0;
    padding: 0;
    background: none;
    cursor: pointer;
    color: var(--tone);
  }
  .map-point .orb {
    position: absolute;
    width: var(--size);
    height: var(--size);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #fff3d6;
    border-radius: 50%;
    background: radial-gradient(circle at 28% 22%, #fffbe5, var(--tone) 28%, #57432b 80%);
    box-shadow:
      inset 0 -3px 4px #291b1788,
      0 5px 6px #0007,
      0 0 16px var(--tone);
  }
  .map-point[aria-pressed='true'] .orb,
  .map-point:focus-visible .orb {
    outline: 2px solid currentColor;
    outline-offset: 4px;
  }
  .beam {
    position: absolute;
    left: calc(50% - 9px);
    bottom: 50%;
    width: 18px;
    height: 64px;
    background: linear-gradient(0deg, var(--tone), transparent);
    opacity: 0.5;
    clip-path: polygon(35% 0, 65% 0, 100% 100%, 0 100%);
    animation: map-glow 2.8s ease-in-out infinite;
  }
  .rings::before,
  .rings::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 28px;
    height: 28px;
    border: 1px solid currentColor;
    border-radius: 50%;
    box-shadow: 0 0 8px currentColor;
    animation: map-ripple 3.2s linear infinite;
    animation-delay: var(--delay);
  }
  .rings::after {
    animation-delay: calc(var(--delay) - 1.6s);
  }
  .map-point:not(.active) .beam,
  .map-point:not(.active) .rings {
    display: none;
  }
  @keyframes map-ripple {
    from {
      transform: translate(-50%, -50%) scale(0.45);
      opacity: 0.85;
    }
    to {
      transform: translate(-50%, -50%) scale(2.8);
      opacity: 0;
    }
  }
  @keyframes map-glow {
    50% {
      opacity: 0.2;
    }
  }
</style>
<script>
  const pointMarkers = new Map()
  const pointPopup = new maplibregl.Popup({ closeButton: false, offset: 20, focusAfterOpen: false })
  function upsertPoint(row, maxValue) {
    // row: { id, label, coordinates, value, recent, selected, color? }；坐标已在宿主校验。
    let item = pointMarkers.get(row.id)
    if (!item) {
      const el = document.getElementById('map-point-template').content.firstElementChild.cloneNode(true)
      item = {
        el,
        marker: new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(row.coordinates).addTo(map),
      }
      el.style.setProperty('--delay', `${-(pointMarkers.size % 8) * 0.41}s`)
      const preview = () =>
        pointPopup.setLngLat(item.row.coordinates).setText(`${item.row.label} · ${item.row.value}`).addTo(map)
      el.onmouseenter = el.onfocus = preview
      el.onmouseleave = el.onblur = () => pointPopup.remove()
      el.onclick = (event) => {
        event.stopPropagation()
        pointPopup.remove()
        map.getContainer().dispatchEvent(new CustomEvent('map-select', { detail: { id: row.id } }))
      }
      pointMarkers.set(row.id, item)
    }
    item.row = row
    item.marker.setLngLat(row.coordinates)
    item.el.setAttribute('aria-label', `${row.label}，${row.value}，点击筛选`)
    item.el.setAttribute('aria-pressed', String(Boolean(row.selected)))
    item.el.classList.toggle('active', Boolean(row.recent || row.selected))
    item.el.style.setProperty(
      '--size',
      `${8 + Math.sqrt(Math.min(1, Math.abs(row.value) / Math.max(1, maxValue))) * 18}px`,
    )
    item.el.style.setProperty('--tone', row.color || '#e2c27c')
  }
</script>
```

- 飞线统一为 SVG 贝塞尔曲线的细轨、模糊光尾与亮芯，`pathLength=100`、周期 2.8s；端点由 `map.project()` 投影并随相机更新，跨日期线先展开经度；连线须有业务来源。

```html
<!-- 飞线片段：传入 { id, from:[lng,lat], to:[lng,lat] }；装饰层不拦截地图交互。 -->
<svg id="map-flights" aria-hidden="true"></svg>
<style>
  #map-flights {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  #map .maplibregl-marker {
    z-index: 2;
  }
  #map-flights path {
    fill: none;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }
  .flight-track {
    stroke: #e2c27c66;
    stroke-width: 1;
  }
  .flight-tail,
  .flight-core {
    stroke-dasharray: 12 100;
    animation: map-flight 2.8s linear infinite;
    animation-delay: var(--delay);
  }
  .flight-tail {
    stroke: #e2c27c;
    stroke-width: 5;
    filter: blur(3px);
  }
  .flight-core {
    stroke: #fff1c9;
    stroke-width: 1.8;
  }
  @keyframes map-flight {
    from {
      stroke-dashoffset: 12;
    }
    to {
      stroke-dashoffset: -100;
    }
  }
</style>
<script>
  const flightSvg = document.getElementById('map-flights'),
    flightNodes = new Map()
  map.getContainer().append(flightSvg)
  function upsertFlight(link) {
    let item = flightNodes.get(link.id)
    if (!item) {
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      group.style.setProperty('--delay', `${-(flightNodes.size % 8) * 0.65}s`)
      for (const name of ['flight-track', 'flight-tail', 'flight-core']) {
        const path = document.createElementNS(group.namespaceURI, 'path')
        path.setAttribute('class', name)
        path.setAttribute('pathLength', '100')
        group.append(path)
      }
      item = { group }
      flightNodes.set(link.id, item)
      flightSvg.append(group)
    }
    Object.assign(item, link)
    scheduleFlights()
  }
  let flightFrame = 0
  function projectFlights() {
    flightFrame = 0
    flightSvg.setAttribute('viewBox', `0 0 ${map.getContainer().clientWidth} ${map.getContainer().clientHeight}`)
    for (const { group, from, to } of flightNodes.values()) {
      const lng = from[0] + 360 * Math.round((map.getCenter().lng - from[0]) / 360)
      const a = map.project([lng, from[1]]),
        b = map.project([to[0] + 360 * Math.round((lng - to[0]) / 360), to[1]])
      const dx = b.x - a.x,
        dy = b.y - a.y,
        length = Math.hypot(dx, dy) || 1,
        bend = Math.min(130, length * 0.24)
      const d = `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2 + (dy / length) * bend} ${(a.y + b.y) / 2 - (Math.abs(dx) / length) * bend} ${b.x} ${b.y}`
      for (const path of group.children) path.setAttribute('d', d)
    }
  }
  function scheduleFlights() {
    if (!document.hidden && !flightFrame) flightFrame = requestAnimationFrame(projectFlights)
  }
  map.on('render', scheduleFlights) // 覆盖平移、缩放、旋转、倾斜、高程与尺寸变化。
  function syncMapData(rows, links) {
    pointPopup.remove()
    const ids = new Set(rows.map((row) => row.id)),
      max = Math.max(1, ...rows.map((row) => Math.abs(row.value)))
    for (const [id, item] of pointMarkers)
      if (!ids.has(id)) {
        item.marker.remove()
        pointMarkers.delete(id)
      }
    rows.forEach((row) => upsertPoint(row, max))
    // links 已由宿主过滤为两端均在当前范围内的关系。
    const linkIds = new Set(links.map((link) => link.id))
    for (const [id, item] of flightNodes)
      if (!linkIds.has(id)) {
        item.group.remove()
        flightNodes.delete(id)
      }
    links.forEach(upsertFlight)
    scheduleFlights()
  }
</script>
```

## 控件与联动

- 保留动态比例尺、缩放、指北、全屏、复位、底图切换和动画暂停；控件与署名避让卡片。暂停、页面隐藏、减少动态效果统一控制动效，地图仍可交互，不改变已选地形配置。

```html
<!-- 控件片段：容器跟随宿主布局；全屏宿主可替换为实际 dashboard 根元素。 -->
<div id="map-controls">
  <select id="map-basemap" aria-label="底图">
    <option value="dark">深色矢量</option>
    <option value="positron">灰白矢量</option>
    <option value="relief">NASA 地貌</option>
    <option value="eox">EOX 地形</option>
  </select>
  <button id="map-home">复位视图</button><button id="map-motion" aria-pressed="true">暂停动画</button>
</div>
<style>
  #map .maplibregl-ctrl-bottom-right {
    max-width: calc(100% - 132px);
  }
  .map-paused .beam,
  .map-paused .rings::before,
  .map-paused .rings::after,
  .map-paused .flight-tail,
  .map-paused .flight-core {
    animation-play-state: paused;
  }
  @media (prefers-reduced-motion: reduce) {
    .beam,
    .rings::before,
    .rings::after,
    .flight-tail,
    .flight-core {
      animation: none;
    }
  }
</style>
<script>
  map.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: 'metric' }), 'bottom-left')
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right')
  map.addControl(new maplibregl.FullscreenControl({ container: map.getContainer().parentElement }), 'top-right')
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)'),
    motionButton = document.getElementById('map-motion')
  let playing = true
  function motionAllowed() {
    return playing && !document.hidden && !reducedMotion.matches
  }
  function syncMotion() {
    map.getContainer().classList.toggle('map-paused', !motionAllowed())
    motionButton.setAttribute('aria-pressed', String(motionAllowed()))
    motionButton.disabled = reducedMotion.matches
    motionButton.textContent = reducedMotion.matches ? '已减少动态效果' : playing ? '暂停动画' : '播放动画'
    if (!motionAllowed()) map.stop()
    if (document.hidden) {
      cancelAnimationFrame(flightFrame)
      flightFrame = 0
    } else scheduleFlights()
    // 若宿主另有 RAF / WAAPI 动效，在这里按同一状态暂停、恢复。
  }
  motionButton.onclick = () => {
    playing = !playing
    syncMotion()
  }
  document.addEventListener('visibilitychange', syncMotion)
  reducedMotion.addEventListener('change', syncMotion)
  document.getElementById('map-basemap').onchange = (event) => changeBasemap(event.target.value)
  document.getElementById('map-home').onclick = () => {
    if (!pointMarkers.size) return
    const bounds = new maplibregl.LngLatBounds()
    pointMarkers.forEach(({ row }) => bounds.extend(row.coordinates))
    map.fitBounds(bounds, { padding: 72, maxZoom: 8, pitch: 45, bearing: 0, duration: motionAllowed() ? 500 : 0 })
  }
  const mapResize = new ResizeObserver(() => map.resize())
  mapResize.observe(map.getContainer())
  syncMotion()
  function disposeMap() {
    document.removeEventListener('visibilitychange', syncMotion)
    reducedMotion.removeEventListener('change', syncMotion)
    mapResize.disconnect()
    map.off('render', scheduleFlights)
    cancelAnimationFrame(flightFrame)
    pointPopup.remove()
    pointMarkers.forEach(({ marker }) => marker.remove())
    pointMarkers.clear()
    flightNodes.clear()
    flightSvg.remove()
    map.remove()
  }
  // 宿主卸载时先解绑业务联动，再调用 disposeMap()。
</script>
```

- 先明确各入口是定位、筛选还是详情：地域点击可联动全局，事件／实体点击通常定位并打开详情；悬停只预览，拖动只导航。列表与地图共用选择入口，清除和返回各自恢复对应范围。
- 确需筛选时，按 [visual-query](../../visual-query/SKILL.md) 更新 Builder 和关联视图，防止旧请求覆盖新结果。选中对象离开结果集时清除高亮与详情；详情内局部选择不默认改主页。
- 查询返回后调用 `syncMapData(rows, links)` 并回填选中态；空结果移除失效点线、保留相机和空态提示。大量点位使用 GeoJSON 图层，DOM / SVG 只突出重点项；空间聚类不代替行政层级汇总。
- 数据或展示层级变化时更新点集，选择变化只更新高亮，相机移动只更新投影；不要在拖动时重复查询或重传全量数据。卸载时清理请求、事件和动画，通用生命周期复用 visual-query。

```html
<!-- 联动片段：选项、排行行和 pointsById 均由宿主查询结果提供。 -->
<select id="map-region" aria-label="地域筛选">
  <option value="">全部地域</option>
</select>
<div id="map-ranking"><!-- 排行按钮使用 data-region-id="地域ID" --></div>
<script>
  function bindRegionFilters({ pointsById, selectRegion }) {
    // selectRegion(id) 是宿主的统一入口：写入 Builder 并刷新关联视图；空字符串表示清空。
    const events = new AbortController(),
      options = { signal: events.signal }
    const select = document.getElementById('map-region')
    function apply(id, locate = false) {
      select.value = id
      selectRegion(id)
      const row = pointsById.get(id)
      if (locate && row) map.easeTo({ center: row.coordinates, duration: motionAllowed() ? 450 : 0 })
    }
    map.getContainer().addEventListener('map-select', (event) => apply(event.detail.id), options)
    select.addEventListener('change', () => apply(select.value, true), options)
    document.getElementById('map-ranking').addEventListener(
      'click',
      (event) => {
        const row = event.target.closest('[data-region-id]')
        if (row) apply(row.dataset.regionId, true)
      },
      options,
    )
    return () => events.abort()
  }
</script>
```
