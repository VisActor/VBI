import { VBI, VBIDSL } from '@visactor/vbi';
import { VSeed } from '@visactor/vseed';
import { registerDemoConnector } from 'src/utils/demoConnector';
import { create } from 'zustand';

type DestroyCallback = () => void;

const CONNECTOR_ID = registerDemoConnector();

interface BearState {
  loading: boolean;
  vseed: VSeed | null;
  builder: ReturnType<typeof VBI.from>;
  initialized: boolean;

  dsl: VBIDSL;

  initialize: (builder?: ReturnType<typeof VBI.from>) => DestroyCallback;
  bindEvent: () => DestroyCallback;

  setDsl: (dsl: VBIDSL) => void;
  setLoading: (loading: boolean) => void;
  setVSeed: (vseed: VSeed | null) => void;
}

const defaultBuilder = VBI.from(VBI.generateEmptyDSL(CONNECTOR_ID));

export const useVBIStore = create<BearState>((set, get) => ({
  loading: false,
  vseed: null,
  initialized: false,
  builder: defaultBuilder,
  dsl: defaultBuilder.dsl.toJSON() as VBIDSL,

  setLoading: (loading: boolean) => set({ loading }),
  setVSeed: (vseed: VSeed | null) => set({ vseed }),
  setDsl: (dsl: VBIDSL) => set({ dsl }),

  // 初始化
  initialize: (builder?: ReturnType<typeof VBI.from>) => {
    if (builder) {
      set({ builder });
    }
    set({ initialized: true });

    const callback = get().bindEvent();

    return () => {
      callback();
      set({ loading: false, vseed: null, initialized: false });
    };
  },

  bindEvent: () => {
    const { builder, setLoading, setVSeed, setDsl } = get();
    const updateAll = async () => {
      setLoading(true);
      try {
        const vbiDSL = builder.build();
        console.log('[VBIStore] VBI DSL:', JSON.stringify(vbiDSL, null, 2));
        
        const newVSeed = await builder.buildVSeed();
        // BigInt replacer for JSON.stringify
        const bigIntReplacer = (_key: string, value: unknown) => {
          if (typeof value === 'bigint') {
            return value.toString();
          }
          return value;
        };
        console.log('[VBIStore] VSeed DSL:', JSON.stringify(newVSeed, bigIntReplacer, 2));
        
        setVSeed(newVSeed);
        setDsl(vbiDSL);
      } catch (error) {
        console.error('[VBIStore] Error building VSeed:', error);
      } finally {
        setLoading(false);
      }
    };

    builder.doc.on('update', updateAll);
    return () => {
      builder.doc.off('update', updateAll);
    };
  },
}));
