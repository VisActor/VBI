import { useCallback } from 'react';
import type { VBIBuilder, VBIWhereClause } from '@visactor/vbi';
import { isVBIFilter } from '@visactor/vbi';
import { useBuilderDocState } from './useBuilderDocState';

export const useVBIWhereFilter = (builder: VBIBuilder | undefined) => {
  const filters = useBuilderDocState({
    builder,
    fallback: [] as VBIWhereClause[],
    getSnapshot: (activeBuilder) =>
      activeBuilder.whereFilter.toJSON().conditions as VBIWhereClause[],
  });
  const rootOperator = useBuilderDocState({
    builder,
    fallback: 'and' as 'and' | 'or',
    getSnapshot: (activeBuilder) => {
      const whereRoot = activeBuilder.dsl.get('whereFilter') as
        | { get: (key: string) => unknown }
        | undefined;
      const operator = whereRoot?.get('op');
      return operator === 'or' ? 'or' : 'and';
    },
  });

  const replaceFilters = useCallback(
    (nextFilters: { field: string; operator: string; value: unknown }[]) => {
      if (!builder) {
        return;
      }

      builder.doc.transact(() => {
        builder.whereFilter.clear();
        nextFilters.forEach((filter) => {
          builder.whereFilter.add(filter.field, (node) => {
            node.setOperator(filter.operator);
            node.setValue(filter.value);
          });
        });
      });
    },
    [builder],
  );

  const setRootOperator = useCallback(
    (operator: 'and' | 'or') => {
      if (!builder) {
        return;
      }

      const whereRoot = builder.dsl.get('whereFilter') as
        | { set: (key: string, value: unknown) => void }
        | undefined;
      if (!whereRoot) {
        return;
      }

      builder.doc.transact(() => {
        whereRoot.set('op', operator);
      });
    },
    [builder],
  );

  return {
    filters,
    flatFilters: filters.filter(isVBIFilter),
    rootOperator,
    setRootOperator,
    replaceFilters,
  };
};
