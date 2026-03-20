import { useCallback } from 'react';
import type {
  VBIBuilder,
  VBIHavingAggregate,
  VBIHavingClause,
} from '@visactor/vbi';
import { useBuilderDocState } from './useBuilderDocState';

export const useVBIHavingFilter = (builder: VBIBuilder | undefined) => {
  const filters = useBuilderDocState({
    builder,
    fallback: [] as VBIHavingClause[],
    getSnapshot: (activeBuilder) =>
      activeBuilder.havingFilter.toJSON().conditions as VBIHavingClause[],
  });
  const rootOperator = useBuilderDocState({
    builder,
    fallback: 'and' as 'and' | 'or',
    getSnapshot: (activeBuilder) => {
      const havingRoot = activeBuilder.dsl.get('havingFilter') as
        | { get: (key: string) => unknown }
        | undefined;
      const operator = havingRoot?.get('op');
      return operator === 'or' ? 'or' : 'and';
    },
  });

  const replaceFilters = useCallback(
    (
      nextFilters: Array<{
        field: string;
        aggregate: VBIHavingAggregate;
        operator: string;
        value: unknown;
      }>,
    ) => {
      if (!builder) {
        return;
      }

      builder.doc.transact(() => {
        builder.havingFilter.clear();
        nextFilters.forEach((filter) => {
          builder.havingFilter.add(filter.field, (node) => {
            node.setAggregate(filter.aggregate);
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

      const havingRoot = builder.dsl.get('havingFilter') as
        | { set: (key: string, value: unknown) => void }
        | undefined;
      if (!havingRoot) {
        return;
      }

      builder.doc.transact(() => {
        havingRoot.set('op', operator);
      });
    },
    [builder],
  );

  return {
    filters,
    rootOperator,
    setRootOperator,
    replaceFilters,
  };
};
