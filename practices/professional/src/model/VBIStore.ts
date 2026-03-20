import { VBI, type VBIBuilder, VBIDSL, isVBIFilter } from '@visactor/vbi';
import { VSeed } from '@visactor/vseed';
import { createLocalConnector } from 'src/utils/localConnector';
import { create } from 'zustand';

type DestroyCallback = () => void;

const CONNECTOR_ID = 'localDataConnector';

// 初始化本地连接器
createLocalConnector(CONNECTOR_ID);

interface BearState {
  loading: boolean;
  vseed: VSeed | null;
  builder: VBIBuilder;
  initialized: boolean;

  dsl: VBIDSL;

  initialize: (builder?: VBIBuilder) => DestroyCallback;
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
      if (builder.isEmpty()) {
        setLoading(false);
        setVSeed(null);
        setDsl(builder.dsl.toJSON() as VBIDSL);
        return;
      }

      setLoading(true);
      try {
        const newVSeed = await builder.buildVSeed();
        setVSeed(newVSeed);
        setDsl(builder.dsl.toJSON() as VBIDSL);
      } catch (e: any) {
        console.error('VSeed Build Error:', e);
        import('antd').then(({ message }) => {
          message.error(
            '筛选器配置有误导致数据构建失败，已为您自动移除无效筛选器，请重新配置。',
          );
        });

        const filters = builder.whereFilter.toJSON().conditions;
        if (filters && filters.length > 0) {
          const lastFilter = filters[filters.length - 1];
          if (isVBIFilter(lastFilter)) {
            builder.doc.transact(() => {
              builder.whereFilter.remove(lastFilter.id);
            });
            // Avoid triggering immediately if possible, or let it trigger again and succeed
            window.dispatchEvent(
              new CustomEvent('vbi-filter-error', { detail: lastFilter }),
            );
          }
        }
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
