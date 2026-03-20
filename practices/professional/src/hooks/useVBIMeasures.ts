import { useCallback } from 'react';
import {
  type VBIBuilder,
  type VBIMeasure as CoreVBIMeasure,
} from '@visactor/vbi';
import { useBuilderDocState } from './useBuilderDocState';

export type VBIMeasure = Omit<CoreVBIMeasure, 'encoding' | 'aggregate'> & {
  encoding?: CoreVBIMeasure['encoding'];
  aggregate?: CoreVBIMeasure['aggregate'];
};

type MeasureNodeLike = {
  setAlias: (alias: string) => unknown;
  setEncoding: (encoding: NonNullable<VBIMeasure['encoding']>) => unknown;
  setAggregate: (aggregate: NonNullable<VBIMeasure['aggregate']>) => unknown;
};

export const useVBIMeasures = (builder: VBIBuilder | undefined) => {
  const measures = useBuilderDocState({
    builder,
    fallback: [] as VBIMeasure[],
    getSnapshot: (activeBuilder) =>
      activeBuilder.measures.toJSON() as VBIMeasure[],
  });

  const addMeasure = useCallback(
    (field: string, callback?: (node: MeasureNodeLike) => void) => {
      builder?.doc.transact(() => {
        builder.measures.add(field, (node) => callback?.(node));
      });
    },
    [builder],
  );
  const removeMeasure = useCallback(
    (id: string) => builder?.doc.transact(() => builder.measures.remove(id)),
    [builder],
  );
  const updateMeasure = useCallback(
    (id: string, callback: (node: MeasureNodeLike) => void) => {
      builder?.doc.transact(() => {
        builder.measures.update(id, callback);
      });
    },
    [builder],
  );

  return { measures, addMeasure, removeMeasure, updateMeasure };
};
