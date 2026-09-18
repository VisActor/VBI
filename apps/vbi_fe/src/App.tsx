import { useMemo } from 'react'
import { VbiAppProviders } from './app/providers'
import { matchApplicationRoute, useApplicationPathname } from './application'
import { lazyComponent } from './components/LazyComponent'
import { ManageLayoutPage } from './views/workspace/ManageLayoutPage'
import { isAppLocale, resolveLocaleFromAcceptLanguage, type AppLocale } from './i18n/utils'
import {
  defaultAppPreferences,
  resolvePersistedLocalePreference,
  resolvePersistedThemePreference,
} from './application/preferences/storage'
import type { AppThemeMode } from './application/preferences/contract'

const ChartEditorPage = lazyComponent<{ id: string }>(() =>
  import('./views/resources/chart/ChartEditorPage').then((module) => ({ default: module.ChartEditorPage })),
)
const InsightEditorPage = lazyComponent<{ id: string }>(() =>
  import('./views/resources/insight/InsightEditorPage').then((module) => ({ default: module.InsightEditorPage })),
)
const ManageChartsPage = lazyComponent<object>(() =>
  import('./views/resources/chart/ManageChartsPage').then((module) => ({ default: module.ManageChartsPage })),
)
const ManageInsightsPage = lazyComponent<object>(() =>
  import('./views/resources/insight/ManageInsightsPage').then((module) => ({ default: module.ManageInsightsPage })),
)
const resolveInitialLocale = (): AppLocale => {
  const storedLocale = resolvePersistedLocalePreference()
  if (isAppLocale(storedLocale)) return storedLocale

  const languages = typeof navigator === 'undefined' ? [] : navigator.languages
  return resolveLocaleFromAcceptLanguage(languages?.join(',') ?? '')
}

const resolveInitialThemeMode = (): AppThemeMode => resolvePersistedThemePreference() ?? defaultAppPreferences.themeMode

const RoutedWorkspace = () => {
  const pathname = useApplicationPathname()
  const route = useMemo(() => matchApplicationRoute(pathname), [pathname])

  const page = (() => {
    switch (route.name) {
      case 'agent':
        return null
      case 'chartDetail':
        return <ChartEditorPage id={route.id} />
      case 'chart':
        return <ManageChartsPage />
      case 'insightDetail':
        return <InsightEditorPage id={route.id} />
      case 'insight':
        return <ManageInsightsPage />
    }
  })()

  return <ManageLayoutPage>{page}</ManageLayoutPage>
}

const AppShell = () => {
  const { locale, themeMode } = useMemo(
    () => ({
      locale: resolveInitialLocale(),
      themeMode: resolveInitialThemeMode(),
    }),
    [],
  )

  return (
    <VbiAppProviders initialLocale={locale} initialThemeMode={themeMode}>
      <RoutedWorkspace />
    </VbiAppProviders>
  )
}

export const App = AppShell
