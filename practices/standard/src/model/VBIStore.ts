import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import { VBI } from '@visactor/vbi'
import { type DatasetColumn } from '@visactor/vquery'
import { Builder as VSeedBuilder, type VSeed } from '@visactor/vseed'
import { createDefaultBuilder, setLocalDataWithSchema } from '../utils/localConnector'
import { createStore, type StoreApi } from 'zustand/vanilla'

type DestroyCallback = () => void

export interface VBIStoreState {
  loading: boolean
  error: string | null
  vseed: VSeed | null
  builder: VBIChartBuilder
  initialized: boolean

  dsl: VBIChartDSL

  initialize: (builder?: VBIChartBuilder) => DestroyCallback
  bindEvent: () => DestroyCallback
  logState: () => Promise<void>

  setDsl: (dsl: VBIChartDSL) => void
  setLoading: (loading: boolean) => void
  setVSeed: (vseed: VSeed | null) => void
  switchSource: (connectorId: string, data?: any[], schema?: DatasetColumn[]) => Promise<void>
}

export type VBIStoreApi = StoreApi<VBIStoreState>

type VSeedCacheEntry = {
  dslSnapshot: string
  vseed: VSeed | null
  pending?: Promise<VSeed | null>
}

const vseedCache = new WeakMap<VBIChartBuilder, VSeedCacheEntry>()

const getInitialBuilder = (builder?: VBIChartBuilder) => {
  return builder ?? createDefaultBuilder()
}

const getDslState = (builder: VBIChartBuilder) => {
  const dsl = builder.dsl.toJSON() as VBIChartDSL
  return {
    dsl,
    snapshot: JSON.stringify(dsl),
  }
}

const loadVSeed = async (builder: VBIChartBuilder, dslSnapshot: string): Promise<VSeed | null> => {
  const cached = vseedCache.get(builder)

  if (cached?.dslSnapshot === dslSnapshot) {
    if (cached.pending) {
      return cached.pending
    }

    return cached.vseed
  }

  const pending = builder
    .buildVSeed()
    .then((vseed) => {
      vseedCache.set(builder, { dslSnapshot, vseed })
      return vseed
    })
    .catch((error) => {
      vseedCache.delete(builder)
      throw error
    })

  vseedCache.set(builder, {
    dslSnapshot,
    vseed: cached?.vseed ?? null,
    pending,
  })

  return pending
}

const buildSelectedVSeedArtifacts = (vseed: VSeed | null) => {
  if (!vseed) {
    return {
      advancedVSeed: null,
      spec: null,
    }
  }

  const builder = VSeedBuilder.from(vseed)
  const spec = builder.build()
  return {
    advancedVSeed: builder.advancedVSeed,
    spec,
  }
}

export const createVBIStore = (builder?: VBIChartBuilder): VBIStoreApi => {
  const initialBuilder = getInitialBuilder(builder)

  return createStore<VBIStoreState>((set, get) => ({
    loading: false,
    error: null,
    vseed: null,
    initialized: false,
    builder: initialBuilder,
    dsl: initialBuilder.dsl.toJSON() as VBIChartDSL,

    setLoading: (loading) => set({ loading }),
    setVSeed: (vseed) => set({ vseed }),
    setDsl: (dsl) => set({ dsl }),
    logState: async () => {
      const { builder, vseed } = get()
      const { advancedVSeed, spec } = buildSelectedVSeedArtifacts(vseed)

      console.group('selected builder')

      console.info('builder', builder)
      console.info('vbi', builder.build())
      console.info('vquery', builder.buildVQuery())
      console.info('vseed', vseed)
      console.info('advancedVSeed', advancedVSeed)
      console.info('spec', spec)

      console.groupEnd()
    },

    initialize: (nextBuilder) => {
      const builder = nextBuilder ?? get().builder
      set({
        builder,
        dsl: builder.dsl.toJSON() as VBIChartDSL,
        loading: false,
        error: null,
        vseed: null,
        initialized: true,
      })

      const dispose = get().bindEvent()

      return () => {
        dispose()
        set({ loading: false, vseed: null, initialized: false })
      }
    },

    bindEvent: () => {
      const builder = get().builder

      const updateAll = async () => {
        if (get().builder !== builder) {
          return
        }

        const { dsl, snapshot } = getDslState(builder)
        if (builder.isEmpty()) {
          vseedCache.set(builder, { dslSnapshot: snapshot, vseed: null })
          set({ dsl, loading: false, error: null, vseed: null })
          return
        }

        const cached = vseedCache.get(builder)
        if (cached?.dslSnapshot === snapshot && !cached.pending) {
          set({ dsl, loading: false, error: null, vseed: cached.vseed })
          return
        }

        set({ dsl, loading: true, error: null })

        try {
          const newVSeed = await loadVSeed(builder, snapshot)
          const currentState = getDslState(builder)

          if (get().builder !== builder || currentState.snapshot !== snapshot) {
            return
          }

          set({ dsl: currentState.dsl, vseed: newVSeed })
        } catch (error) {
          if (get().builder === builder && getDslState(builder).snapshot === snapshot) {
            set({ vseed: null, error: error instanceof Error ? error.message : String(error) })
          }
        } finally {
          if (get().builder === builder && getDslState(builder).snapshot === snapshot) {
            set({ loading: false })
          }
        }
      }

      builder.doc.on('update', updateAll)
      void updateAll()

      return () => {
        builder.doc.off('update', updateAll)
      }
    },

    switchSource: async (connectorId, data, schema) => {
      if (data && schema) {
        setLocalDataWithSchema(data, schema)
      }

      const builder = get().builder
      const theme = builder.theme.getTheme()
      const locale = builder.locale.getLocale()
      const limit = builder.limit.getLimit()

      const nextBuilder = VBI.chart.create(VBI.chart.createEmpty(connectorId))

      nextBuilder.theme.setTheme(theme)
      nextBuilder.locale.setLocale(locale)
      if (limit) {
        nextBuilder.limit.setLimit(limit)
      }

      get().initialize(nextBuilder)
    },
  }))
}
