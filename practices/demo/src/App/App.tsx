import { Flex, Spin, Card } from 'antd';
import { VSeedRender } from 'src/components/Render';
import { MeasuresList } from 'src/components/Fields/MeasuresList';
import { DimensionsList } from 'src/components/Fields/DimensionsList';
import { VBIBuilder } from '@visactor/vbi';
import { ChartTypeSelector } from 'src/components/ChartType';
import {
  FilterPanel,
  type FilterItem,
} from 'src/components/Filter/FilterPanel';

import { MeasureShelf } from 'src/components/Shelfs/MeasureShelf';
import { DimensionShelf } from 'src/components/Shelfs/DimensionShelf';
import { useVBIStore } from 'src/model';
import { useEffect, useState, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

interface APPProps {
  builder?: VBIBuilder;
}

export const APP = (props: APPProps) => {
  const { initialize, initialized, builder, dsl } = useVBIStore(
    useShallow((state) => ({
      initialize: state.initialize,
      initialized: state.initialized,
      builder: state.builder,
      dsl: state.dsl,
    })),
  );

  const activeFields = useMemo(() => {
    if (!dsl) return [];
    const fields = new Set<string>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extractFields = (items: any[]) => {
      items?.forEach((item) => {
        if (item && typeof item === 'object') {
          if ('field' in item && typeof item.field === 'string') {
            fields.add(item.field);
          }
          if ('children' in item && Array.isArray(item.children)) {
            extractFields(item.children);
          }
        }
      });
    };

    extractFields(dsl.dimensions || []);
    extractFields(dsl.measures || []);
    return Array.from(fields);
  }, [dsl]);

  const [allFields, setAllFields] = useState<
    { name: string; role: 'dimension' | 'measure' }[]
  >([]);
  const [filters, setFilters] = useState<FilterItem[]>([]);

  useEffect(() => {
    const handleFilterError = () => {
      setFilters((prev) => prev.slice(0, -1));
    };
    window.addEventListener('vbi-filter-error', handleFilterError);
    return () =>
      window.removeEventListener('vbi-filter-error', handleFilterError);
  }, []);

  useEffect(() => {
    return initialize(props.builder);
  }, []);

  useEffect(() => {
    if (initialized && builder) {
      const fetchSchema = async () => {
        const schema = await builder.getSchema();
        setAllFields(
          schema.map((s: { name: string; type: string }) => ({
            name: s.name,
            role: s.type === 'number' ? 'measure' : 'dimension',
          })),
        );
      };
      fetchSchema();
    }
  }, [initialized, builder]);

  if (!initialized) {
    return <Spin tip="Initializing..." fullscreen />;
  }

  const handleFilterChange = (newFilters: FilterItem[]) => {
    setFilters(newFilters);
    builder.doc.transact(() => {
      builder.where.clear();
      newFilters.forEach((f) => {
        builder.where.add(f.field, (node) => {
          node.setOperator(f.operator);
          node.setValue(f.value);
        });
      });
    });
  };

  return (
    <Flex
      vertical={false}
      onClick={() => {
        console.group(`selected vbi`);
        console.log('state', useVBIStore.getState());
        console.groupEnd();
      }}
      style={{
        height: '100%',
        gap: '20px',
      }}
    >
      <Flex vertical={true} gap={20} style={{ flexBasis: 300 }}>
        <FilterPanel
          fields={allFields}
          activeFields={activeFields}
          filters={filters}
          onChange={handleFilterChange}
        />
        <ChartTypeSelector style={{ flexBasis: 32, minHeight: 0 }} />
        <DimensionsList style={{ flex: 1, minHeight: 0 }} />
        <MeasuresList style={{ flex: 1, minHeight: 0 }} />
      </Flex>
      <Flex vertical={true} gap={20} style={{ flexGrow: 1 }}>
        <Card
          styles={{
            body: {
              padding: '12px',
            },
          }}
        >
          <Flex vertical={true} gap={8}>
            <Flex align="center">
              <div style={{ width: 100, fontWeight: 500 }}>Dimensions</div>
              <DimensionShelf style={{ flex: 1, minHeight: 0 }} />
            </Flex>
            <Flex align="center">
              <div style={{ width: 100, fontWeight: 500 }}>Measures</div>
              <MeasureShelf style={{ flex: 1, minHeight: 0 }} />
            </Flex>
          </Flex>
        </Card>
        <ChartWrapper />
      </Flex>
    </Flex>
  );
};

const ChartWrapper = () => {
  const vseed = useVBIStore((state) => state.vseed);
  const loading = useVBIStore((state) => state.loading);
  return (
    <Card
      loading={loading}
      styles={{
        root: {
          height: '100%',
        },
        body: {
          padding: '12px',
          height: '100%',
        },
      }}
    >
      {vseed && <VSeedRender vseed={vseed} />}
    </Card>
  );
};
