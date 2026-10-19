import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

const templates = new URL('../templates/', import.meta.url)
const html = readFileSync(new URL('template-earthquakes.html', templates), 'utf8')
const plants = readFileSync(new URL('template-power-plants.html', templates), 'utf8')
function inlineScript(document, id) {
  const blocks = [...document.matchAll(new RegExp(`<script id="${id}">([\\s\\S]*?)<\\/script>`, 'g'))]
  assert.equal(blocks.length, 1, `Expected one inline ${id} script`)
  return blocks[0][1]
}
const source = inlineScript(html, 'map-dashboard')
assert.equal(source, inlineScript(plants, 'map-dashboard'))
function setup(theme = 'dark') {
  const status = { textContent: '' }
  const timers = new Map()
  let clock = 0
  const context = {
    window: {},
    document: { documentElement: { dataset: { theme } }, querySelector: () => status },
    setTimeout(fn) {
      const id = ++clock
      timers.set(id, fn)
      return id
    },
    clearTimeout(id) {
      timers.delete(id)
    },
  }
  vm.runInNewContext(source, context)
  return { api: context.window.MapDashboard, status, timers, context }
}
function emitter() {
  const listeners = new Map()
  return {
    listeners,
    on(type, callback) {
      if (!listeners.has(type)) listeners.set(type, new Set())
      listeners.get(type).add(callback)
    },
    off(type, callback) {
      listeners.get(type)?.delete(callback)
    },
    emit(type, event = {}) {
      for (const callback of listeners.get(type) || []) callback(event)
    },
    addEventListener(type, callback) {
      this.on(type, callback)
    },
    removeEventListener(type, callback) {
      this.off(type, callback)
    },
  }
}

test('entity navigation stays on the nearest world copy across the date line', () => {
  const { api } = setup()
  assert.equal(api.wrapCoordinates([-179, 12], 179)[0], 181)
  assert.equal(api.wrapCoordinates([179, 12], -179)[0], -181)
  assert.equal(api.wrapCoordinates([540, 12], 180)[0], 180)
  assert.equal(api.wrapCoordinates([10, -20], 0)[1], -20)
})

test('basemap recovery ignores stale/business errors, exhausts candidates, and allows retry', () => {
  const { api, status, timers } = setup()
  const map = Object.assign(emitter(), { getSource: () => ({}), isSourceLoaded: () => false })
  const notices = [],
    switches = []
  let recovery
  const appearance = {
    current: 'dark',
    get style() {
      return { name: this.current }
    },
    select(id) {
      switches.push(id)
      this.current = id
      recovery.begin()
    },
  }
  recovery = api.createBasemapRecovery({
    map,
    renderer: { sources: (id) => [`tile-${id}`] },
    appearance: () => appearance,
    notify: (message) => notices.push(message),
  })
  recovery.begin()
  map.emit('error', { sourceId: 'plants' })
  map.emit('error', { sourceId: 'tile-light' })
  assert.deepEqual(switches, [])
  map.emit('error', { sourceId: 'tile-dark' })
  assert.equal(appearance.current, 'seismic')
  map.emit('error', { sourceId: 'tile-dark' })
  assert.equal(appearance.current, 'seismic')
  map.emit('error', { sourceId: 'tile-seismic' })
  map.emit('error', { sourceId: 'tile-supermarket' })
  assert.deepEqual(switches, ['seismic', 'supermarket'])
  assert.match(status.textContent, /重试/)
  assert.equal(timers.size, 0)
  recovery.begin({ userInitiated: true })
  assert.equal(notices.at(-1), '')
  assert.equal(timers.size, 1)
  map.isSourceLoaded = () => true
  map.emit('idle')
  assert.match(status.textContent, /已显示/)
  assert.equal(timers.size, 0)
  recovery.destroy()
  assert.ok([...map.listeners.values()].every((set) => set.size === 0))
})

test('basemap timeout uses only same-tone candidates and clears its deadline after success', () => {
  const { api, timers } = setup('light')
  const map = Object.assign(emitter(), { getSource: () => ({}), isSourceLoaded: () => false })
  let recovery,
    ready = 0
  const appearance = {
    current: 'positron',
    get style() {
      return { name: this.current }
    },
    select(id) {
      this.current = id
      recovery.begin()
    },
  }
  recovery = api.createBasemapRecovery({
    map,
    renderer: { sources: (id) => [id] },
    appearance: () => appearance,
    notify() {},
    onReady() {
      ready++
    },
  })
  recovery.begin()
  ;[...timers.values()][0]()
  assert.equal(appearance.current, 'light')
  map.isSourceLoaded = () => true
  map.emit('sourcedata', { sourceId: 'positron', isSourceLoaded: true })
  assert.equal(ready, 0)
  map.emit('sourcedata', { sourceId: 'light', isSourceLoaded: true })
  assert.equal(ready, 1)
  assert.equal(timers.size, 0)
  recovery.destroy()
})

test('navigation updates zoom bounds, respects reduced motion and releases listeners', () => {
  const { api } = setup()
  const plus = emitter(),
    minus = emitter(),
    home = emitter()
  let zoom = 1,
    reset = 0,
    duration
  const map = Object.assign(emitter(), {
    getZoom: () => zoom,
    getMaxZoom: () => 2,
    getMinZoom: () => 0,
    zoomIn(options) {
      duration = options.duration
      zoom++
      this.emit('zoomend')
    },
    zoomOut(options) {
      duration = options.duration
      zoom--
      this.emit('zoomend')
    },
  })
  const release = api.bindNavigation({
    map,
    zoomIn: plus,
    zoomOut: minus,
    home,
    reset() {
      reset++
    },
    reducedMotion: { matches: true },
  })
  assert.equal(plus.disabled, false)
  plus.emit('click')
  assert.equal(plus.disabled, true)
  assert.equal(duration, 0)
  minus.emit('click')
  minus.emit('click')
  assert.equal(minus.disabled, true)
  home.emit('click')
  assert.equal(reset, 1)
  release()
  assert.ok([map, plus, minus, home].every((item) => [...item.listeners.values()].every((set) => set.size === 0)))
})

test('demo sources exclude the removed region while retaining China and other countries', () => {
  const context = { window: {} }
  vm.createContext(context)
  vm.runInContext(inlineScript(html, 'basemap-assets'), context)
  context.MapBasemapAssets = context.window.MapBasemapAssets
  vm.runInContext(
    inlineScript(html, 'map-country-script').replace('MapCountryPicker.label', 'window.MapCountryPicker.label'),
    context,
  )
  context.MapCountryPicker = context.window.MapCountryPicker
  vm.runInContext(html.match(/<script id="quake-country-geography">([\s\S]*?)<\/script>/)[1], context)
  const geography = context.window.QuakeCountries
  assert.ok(!geography.features.some(({ properties }) => properties.code === 'TWN'))
  assert.equal(geography.locate(121.5654, 25.033), null)
  assert.equal(geography.locate(116.4074, 39.9042), 'CHN')
  assert.equal(geography.locate(139.6917, 35.6895), 'JPN')
  assert.equal(geography.locate(-140, 0), '')
  assert.equal(geography.name('CHN'), '中国')
  Object.assign(context, {
    QuakeCountries: geography,
    validateFeed() {},
    HOUR_MS: 3600000,
    sourceLink: (value) => value,
    magnitudeBands: ['all'],
    depthBands: ['all'],
    bandIndex: () => 0,
    magnitudeThresholds: [],
    depthThresholds: [],
  })
  vm.runInContext(
    html.slice(html.indexOf('      function normalize(feed)'), html.indexOf('      function mapPadding()')),
    context,
  )
  const event = (id, coordinates, place) => ({
    id,
    geometry: { type: 'Point', coordinates },
    properties: { type: 'earthquake', time: 1000, mag: 4, place },
  })
  const rows = context.normalize({
    metadata: { generated: 2000 },
    features: [
      event('excluded-land', [121.5654, 25.033, 10], 'unnamed'),
      event('excluded-offshore', [123, 24, 10], 'offshore Taiwan'),
      event('china', [116.4074, 39.9042, 10], 'China'),
      event('japan', [139.6917, 35.6895, 10], 'Japan'),
      event('ocean', [-140, 0, 10], 'Ocean'),
    ],
  })
  assert.equal(JSON.stringify(rows.map(({ event_id }) => event_id)), JSON.stringify(['china', 'japan', 'ocean']))
  const raw = JSON.parse(plants.match(/<script id="plant-data"[^>]*>([\s\S]*?)<\/script>/)[1])
  const country = raw.columns.indexOf('country')
  assert.ok(!raw.rows.some((row) => row[country] === 'TWN'))
  assert.ok(!('TWN' in raw.countries))
  assert.equal(raw.rows.filter((row) => row[country] === 'CHN').length, 2901)
  assert.equal(raw.rows.length, 28631)
  assert.equal(new Set(raw.rows.map((row) => row[country])).size, 163)
})
