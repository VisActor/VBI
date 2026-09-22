import type { VBIChartBuilder } from '@visactor/vbi'
import { createContext, useContext, useRef, type PropsWithChildren } from 'react'
import type { DemoLocale, DemoTheme } from '../constants/builder'
import { useStore } from 'zustand'
import { createVBIStore, type VBIStoreApi, type VBIStoreState } from './VBIStore'

export type VBIStoreConfig = {
  hideLocale: boolean
  hideTheme: boolean
  locale?: DemoLocale
  theme?: DemoTheme
  chartTheme?: string
}

type VBIStoreContextValue = {
  config: VBIStoreConfig
  store: VBIStoreApi
}

const VBIStoreContext = createContext<VBIStoreContextValue | null>(null)

type VBIStoreProviderProps = PropsWithChildren<{
  builder?: VBIChartBuilder
  hideLocale?: boolean
  hideTheme?: boolean
  locale?: DemoLocale
  theme?: DemoTheme
  chartTheme?: string
}>

export const VBIStoreProvider = ({
  builder,
  children,
  hideLocale = false,
  hideTheme = false,
  locale,
  theme,
  chartTheme,
}: VBIStoreProviderProps) => {
  const storeRef = useRef<VBIStoreApi | null>(null)

  if (!storeRef.current) {
    storeRef.current = createVBIStore(builder)
  }

  return (
    <VBIStoreContext.Provider
      value={{
        config: { hideLocale, hideTheme, locale, theme, chartTheme },
        store: storeRef.current,
      }}
    >
      {children}
    </VBIStoreContext.Provider>
  )
}

export const useVBIStore = <T,>(selector: (state: VBIStoreState) => T) => {
  const store = useContext(VBIStoreContext)

  if (!store) {
    throw new Error('useVBIStore must be used within VBIStoreProvider')
  }

  return useStore(store.store, selector)
}

export const useVBIStoreConfig = () => {
  const store = useContext(VBIStoreContext)

  if (!store) {
    throw new Error('useVBIStoreConfig must be used within VBIStoreProvider')
  }

  return store.config
}
