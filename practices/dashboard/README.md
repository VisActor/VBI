# Dashboard practice

`DashboardRenderer` renders a `VBIDashboardBuilder` as a responsive dashboard with preview and chart editing modes. Chart widgets resolve their chart builder with `dashboardBuilder.getChartBuilder()` and pass it to `APP` from `standard` in `mode="view"`. Chart querying, loading states, and rendering use Standard's existing behavior. Insights render their text content.

```tsx
import { createVBI } from '@visactor/vbi'
import { DashboardRenderer, type DashboardRendererProps } from 'dashboard'

const vbi = createVBI()
const insight = vbi.insight.create(vbi.insight.createEmpty())
insight.setContent('Sales and profit are growing together.')
const dashboardBuilder = vbi.dashboard.create({
  ...vbi.dashboard.createEmpty(),
  meta: { title: 'Sales overview' },
})
dashboardBuilder.insight.add((widget) => {
  widget
    .setInsightId(insight)
    .setTitle('Key insight')
    .setLayouts({
      lg: { x: 0, y: 0, w: 12, h: 3 },
      md: { x: 0, y: 0, w: 6, h: 3 },
    })
})

// The host supplies the language; the dashboard owns its saved theme.
export function Dashboard({ locale }: Pick<DashboardRendererProps, 'locale'>) {
  return <DashboardRenderer builder={dashboardBuilder} mode='edit' locale={locale} />
}
```

## Props

| Prop            | Type                            | Default                           |
| --------------- | ------------------------------- | --------------------------------- |
| `builder`       | `VBIDashboardBuilder`           | Required                          |
| `locale`        | `Locale` from `@visactor/vseed` | `zh-CN`                           |
| `theme`         | `string`                        | Saved `meta.theme`, then `light`  |
| `onThemeChange` | `(name: string) => void`        | Optional controlled-theme handler |
| `mode`          | `'view' \| 'edit'`              | `view`                            |
| `toolbar`       | `ReactNode`                     | `<DashboardToolbar />`            |

Supported locales: `zh-CN`, `en-US`, `ja-JP`, `de-DE`, `id-ID`, `fr-FR`, `ko-KR`, `vi-VN`. An explicit host theme overrides the saved Dashboard theme without mutating either the dashboard or chart DSL. Without an override, rendering follows `meta.theme`, including Builder edits, undo and collaborative updates. User-authored titles and insight text are displayed as supplied.

## Toolbar composition

Pass `toolbar={null}` to hide the toolbar, or supply any React node to replace it. `DashboardToolbar` provides the themed layout; its default children are `DashboardEditToggle`, `DashboardUndoButton`, `DashboardRedoButton`, `DashboardThemePicker` and `DashboardFullscreenButton`. Supplying children lets you select, reorder or extend those controls without changing the renderer:

```tsx
import {
  DashboardRenderer,
  DashboardToolbar,
  DashboardEditToggle,
  DashboardUndoButton,
  DashboardRedoButton,
  DashboardThemePicker,
  DashboardFullscreenButton,
  useDashboard,
} from 'dashboard'

function ResetThemeButton() {
  const { editing, onThemeChange } = useDashboard()
  return (
    <button disabled={!editing || !onThemeChange} onClick={() => onThemeChange?.('light')}>
      Reset theme
    </button>
  )
}

;<DashboardRenderer
  builder={dashboardBuilder}
  mode='edit'
  toolbar={
    <DashboardToolbar>
      <DashboardEditToggle />
      <DashboardUndoButton />
      <DashboardRedoButton />
      <ResetThemeButton />
      <DashboardThemePicker />
      <DashboardFullscreenButton />
    </DashboardToolbar>
  }
/>
```

Toolbar controls and `useDashboard()` run inside `DashboardRenderer`. The hook exposes locale, resolved theme, mode, effective editing state, the Builder's `undoManager`, editing/theme callbacks and the dashboard container ref. Each dashboard has its own context. `editing` is false in view mode; `onThemeChange` is absent when a host-controlled theme is read-only. Custom controls should respect those capabilities. Document operations use the host's Builder; the context does not expose the DSL or add another state store.

Undo and redo operate on `dashboardBuilder.undoManager`, including widget, layout and saved theme changes. The buttons are hidden in view mode and disabled while editing is off or their history stack is empty. They subscribe to history events, so programmatic undo/redo and `clear()` update availability even without a document change. Subscriptions follow Builder replacement and are released when controls unmount. Labels and tooltips follow the dashboard locale.

Dashboard history records local Yjs transactions; remote updates and edits inside separately referenced chart/insight documents do not enter this history. Use the referenced resource's own history for its content edits. `dashboardBuilder.transact()` groups related dashboard changes into one undo step. A host-controlled theme override is not part of Dashboard history unless the host writes it through the Builder.

Fullscreen state, errors and browser listeners belong to `DashboardFullscreenButton`. Omitting that control avoids its listeners; removing it exits any fullscreen session it owns. The grid and chart editor work independently of which toolbar controls are present.

The default toolbar follows Standard's compact presentation: a flat themed surface, small outlined buttons with 12px icons, 6px spacing within groups and thin vertical dividers. Editing and the joined undo/redo buttons sit on the left; the theme picker and fullscreen button sit on the right. Narrow containers scroll the toolbar horizontally. Tooltips and theme menus stay inside the dashboard so they remain visible in fullscreen.

## Themes

The Builder owns theme selection and configuration. Use `dashboardBuilder.theme.setTheme('dark')` for a preset or `setTheme(name, definition)` to define and select a custom theme in one change. Names are nonempty strings and default to `light`. The selected name is saved in `meta.theme`; document definitions are saved in `meta.themes`. Both support serialization, undo, redo and Yjs synchronization, sharing the existing metadata value's collaboration granularity.

In edit mode, the toolbar places the editing switch on the left and the theme picker immediately before fullscreen on the right. The picker shows a single circle using the palette's first color. Its compact menu groups themes into Light and Dark sections, pairing the same first-color circle with a continuous chart palette. Hovering a palette or the toolbar circle shows the theme name in a tooltip. Localized names also remain available to screen readers. Choosing a theme updates the Dashboard through its Builder and supports undo, redo and collaboration. Disabling editing disables the selector; view mode stays read-only. An explicit `theme` prop is controlled by the host: provide `onThemeChange` to handle selections, otherwise the selector is disabled. Controlled selections do not change the saved DSL.

The menu includes all twelve built-in themes below and registered brand themes, grouped by their `baseTheme`. The presets use the official [VisActor palettes](https://github.com/VisActor/vchart-theme/tree/develop/packages/vchart-theme/src/v-screen), adapted to VSeed tokens and Dashboard surfaces. The pastel theme uses a warm light canvas and the cyan theme uses a green canvas; other presets use a dark navy canvas.

| Name                                | Theme ID          |
| ----------------------------------- | ----------------- |
| 默认浅色 / Light                    | `light`           |
| 默认深色 / Dark                     | `dark`            |
| 火山蓝 / Volcano blue               | `volcanoBlue`     |
| 清新蜡笔 / Fresh pastels            | `clean`           |
| 郊外 / Outskirts                    | `outskirts`       |
| 汽车蓝橙 / Automotive blue & orange | `blueOrange`      |
| 金融黄 / Finance yellow             | `financeYellow`   |
| 文旅青 / Tourism cyan               | `wenLvCyan`       |
| 电力绿 / Electric green             | `electricGreen`   |
| 电商紫 / E-commerce purple          | `eCommercePurple` |
| 红蓝 / Red & blue                   | `redBlue`         |
| 党建红 / Party red                  | `partyRed`        |

Configure a custom theme directly through the Builder, without registering it in a component. One VSeed token definition supplies chart/table colors and fonts as well as Dashboard controls, text and surfaces:

```tsx
dashboardBuilder.theme.setTheme('emerald', {
  label: 'Emerald',
  tokens: {
    baseTheme: 'dark',
    colorScheme: ['#34d399', '#38bdf8', '#fbbf24'],
    linearColorScheme: ['#123b32', '#34d399'],
    textPrimary: '#edfdf5',
    textSecondary: '#a4c7ba',
    borderColor: '#315448',
    surfaceColor: '#102b22',
    surfaceBackgroundColor: '#091a14',
    tooltipBackgroundColor: '#15382c',
  },
  dashboard: { widgetBorderRadius: 12, padding: 20, gap: 16 },
})

// Omit the theme prop to follow the saved choice.
;<DashboardRenderer builder={dashboardBuilder} mode='edit' />
```

Custom themes use the optional `label` or their registered name for tooltips and accessible labels. `dashboard` optionally overrides `backgroundColor`, `widgetBackgroundColor`, `widgetBorderColor`, `widgetBorderRadius`, `toolbarBackground`, `padding` and `gap`. Layout coordinates, breakpoints, columns and row height remain layout concerns. Explicit chart styles retain VSeed's precedence over theme defaults.

Use `dashboardBuilder.theme.registerTheme(name, definition)` to add or update an available theme without selecting it. `getThemeConfig(name?)` returns a copy of the definition, checking the document before built-in presets and defaulting to the selected name; `getThemeDefinitions()` returns copies of all document definitions. Configurations remain available after switching to another theme. `getTheme()` and `toJSON()` return the selected name; `dashboardBuilder.build()` exports the complete document.

Subscribe through the Builder to keep consumers independent of React:

```ts
const unsubscribe = dashboardBuilder.theme.observe(() => {
  const name = dashboardBuilder.theme.getTheme()
  const definition = dashboardBuilder.theme.getThemeConfig()
  // Refresh the consuming view with name and definition.
})

// Release the subscription when the consumer is disposed.
unsubscribe()
```

`observe` notifies subscribers when the selected name or any document theme definition changes, including undo, redo and remote updates. Identical writes and unrelated metadata edits do not notify theme subscribers. `useDashboardTheme` connects this API to React with `useSyncExternalStore` and releases its subscription on unmount or Builder replacement.

Document definitions take precedence over built-in presets and remain isolated across dashboards, even when names match. The Builder assigns cached VSeed runtime names by token content, so a local update cannot overwrite another dashboard's chart theme. Unknown names fall back to `light` for both the page and its charts without changing the saved name. Two dashboards may share the same chart builder and display different themes.

All registration goes through `dashboardBuilder.theme.registerTheme(name, definition)` or `setTheme(name, definition)`. To reuse a definition, pass the same definition to each Builder. There is no Dashboard component registry or registration export.

`dashboardBuilder.theme.resolveTheme(name?)` resolves the selected or requested theme and ensures its VSeed runtime theme is registered. It returns `{ name, chartTheme, baseTheme, definition }` without changing the saved selection. This works without React or a Dashboard component. Use `getThemeOptions()` for the complete list of built-in and document themes, labels, modes and palettes. The Dashboard subscribes through `observe()` and only adapts the returned tokens to Ant Design styles.

Create the dashboard and its resources with the same `createVBI()` instance. Register a chart connector before rendering chart widgets. Missing resources are shown within the affected card. Changes through Builder APIs or Yjs updates are reflected automatically. Dashboard does not add query retry or cancellation behavior to Standard.

Internally, a chart widget renders Standard through its public API:

```tsx
import { APP as Standard } from 'standard'

const chartBuilder = builder.getChartBuilder(chartId)
return chartBuilder ? (
  <Standard
    builder={chartBuilder}
    mode='view'
    border={false}
    locale={locale}
    theme={resolvedTheme.baseTheme}
    chartTheme={resolvedTheme.chartTheme}
    themeToken={resolvedTheme.config.token}
  />
) : null
```

## Editing and fullscreen

Every dashboard has a compact toolbar with a fullscreen toggle. Fullscreen measures the expanded container and reflows the existing responsive layout. Escape exits browser fullscreen; failed fullscreen requests display a localized, retryable message.

`mode="view"` is read-only. `mode="edit"` adds an **Enable editing** switch, initially on, and an edit button in each resolved chart card. Clicking that button opens a viewport-sized editor using Standard's public `mode="edit"` interface and the same chart builder. Changes apply immediately; closing the editor returns to the updated dashboard. The editor closes when its widget is removed, its resource or dashboard builder is replaced, or editing is disabled. This is chart editing, not dashboard layout editing.

Preview and editor receive the same locale and resolved theme. Standard's locale and theme selectors are hidden in the editor so the dashboard controls presentation. Changing host props or the saved theme keeps the current editor open and does not rebuild resources or requery chart data.

The editor keeps Standard's workbench at least 720px wide. On narrow screens, the editor body scrolls horizontally while the close control remains visible; dashboard preview cards continue to fit their container.

## Internationalization

UI messages live in `src/i18n/locales/<locale>.json`, following Standard's locale structure. `zh-CN.json` defines the translation keys; the typed locale map and tests ensure all eight dictionaries have matching keys and `{{parameter}}` placeholders. `useTranslation(locale)` creates a translator per component, keeping multiple dashboards isolated. Ant Design controls receive the corresponding Ant Design locale through ConfigProvider.

Website examples use Rspress `useLang()` for their locale and follow each dashboard's saved theme, so toolbar selections work independently of the website appearance. Authored chart titles, field aliases and insight content remain resource content and are not automatically translated.

## Layout

Breakpoints measure the grid container, not the browser window. Columns are `xxl/xl/lg: 12`, `md: 6`, `sm: 4`, `xs: 2`, with 56px rows and 16px gaps. Coordinates are zero-based. A missing breakpoint uses the closest smaller defined layout, including that layout's column count; without one, widgets stack in one column. Widgets missing from a partial layout are appended below it. Fallback charts occupy five rows and insights three rows. Explicit overlapping positions are preserved.

Dashboard disables Standard's chart frame with `border={false}`. Charts fill the space remaining below the card heading and resize with the card, without a fixed minimum height. Long insight text can scroll within its card.

To put multiple cards in the same row, give them the same `y` and non-overlapping `x`/`w` ranges. For example, a 12-column layout can place four cards at `x: 0, 3, 6, 9`, each with `w: 3`. Define smaller layouts as well: documentation content can be much narrower than the browser window.

The [retail operations example](../../packages/vbi/tests/examples/dashboard/retail-operations-dashboard.json) combines ten cards, including query-derived summaries, donut charts, a dual-axis trend, rankings, a table, and action notes. It uses four cards across on a wide dashboard, paired summaries in a narrow document, and a single column on mobile. The shared dashboard toolbar includes a fullscreen toggle to inspect the large-screen layout. All resources and widget placements are constructed through Builder APIs.

There are no drag or resize editing controls. Configure layouts through the Builder. Dashboard cleans up its dashboard and insight subscriptions and its container observer; Standard manages chart subscriptions and rendering instances. Callers retain ownership of Builder documents and connectors.

## Development

The Builder owns theme management; the Dashboard practice owns presentation:

| Owner                                                                | Responsibility                                                               |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `packages/vbi/src/dashboard-builder/features/theme/theme-builder.ts` | Configuration, presets, options, fallback, observation and resolution.       |
| `packages/vbi/src/dashboard-builder/features/theme/presets.ts`       | Complete built-in palette definitions.                                       |
| `packages/vbi/src/dashboard-builder/features/theme/vseed-theme.ts`   | VSeed registration, runtime identity and caching.                            |
| `src/useDashboardTheme.ts`, `src/theme.ts`                           | Subscribe to Builder output and adapt it to Ant Design and Dashboard styles. |
| `src/i18n/theme.ts`                                                  | Localized theme names and custom labels.                                     |
| `src/toolbar/ThemePicker.tsx`                                        | Theme groups, palette previews and tooltips.                                 |

`useDashboardTheme` subscribes only to Builder theme state and resolves presentation and picker options. `DashboardRenderer` supplies the document snapshot and presentation context, and owns controlled versus Builder-backed theme selection. `DashboardGrid` owns responsive layout and resource rendering; it receives an optional edit callback and does not depend on the toolbar. `useChartEditor` owns selection validity and cleanup when resources, permissions or the dashboard change. `toolbar/` owns control composition and individual features; adding a control does not require changing the grid or renderer.

The Builder's `theme/presets.ts` is a strategy map: each theme key owns its complete token configuration, with no shared preset defaults, conditional overrides or configuration merging. Add new themes there, with their display-name keys in `i18n/theme.ts` and locale files. Adding a theme does not require editing the toolbar or selector rendering.

```sh
pnpm --filter dashboard test
pnpm --filter dashboard typecheck
pnpm --filter dashboard lint
pnpm --filter dashboard build
```

Dashboard examples are sourced from `packages/vbi/tests/examples`. Each example's `code` creates its resources and `dashboardBuilder` directly; the generator supplies `LocalVBI`, then uses `dashboardBuilder` for the preview and DSL snapshot. The same construction code is used in documentation and tests. Custom themes are configured by that same Builder code and included in the DSL snapshot; previews require no separate registration. Regenerate with:

```sh
pnpm --filter @visactor/vbi build:examples --builder=dashboard
pnpm --filter @visactor/vbi build:test --builder=dashboard
```
