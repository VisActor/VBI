import { useCallback } from 'react';
import {
  type VBIBuilder,
  type VBIDimension as CoreVBIDimension,
} from '@visactor/vbi';
import { useBuilderDocState } from './useBuilderDocState';

export type VBIDimension = CoreVBIDimension;

type DimensionNodeLike = {
  setAlias: (alias: string) => unknown;
  setEncoding: (encoding: NonNullable<VBIDimension['encoding']>) => unknown;
  setAggregate: (aggregate: NonNullable<VBIDimension['aggregate']>) => unknown;
  clearAggregate: () => unknown;
};

export const useVBIDimensions = (builder: VBIBuilder | undefined) => {
  const dimensions = useBuilderDocState({
    builder,
    fallback: [] as VBIDimension[],
    getSnapshot: (activeBuilder) =>
      activeBuilder.dimensions.toJSON() as VBIDimension[],
  });

  const addDimension = useCallback(
    (field: string, callback?: (node: DimensionNodeLike) => void) => {
      builder?.doc.transact(() => {
        builder.dimensions.add(field, (node) => callback?.(node));
      });
    },
    [builder],
  );
  const removeDimension = useCallback(
    (id: string) => builder?.doc.transact(() => builder.dimensions.remove(id)),
    [builder],
  );
  const updateDimension = useCallback(
    (id: string, callback: (node: DimensionNodeLike) => void) => {
      builder?.doc.transact(() => {
        builder.dimensions.update(id, callback);
      });
    },
    [builder],
  );

  return { dimensions, addDimension, removeDimension, updateDimension };
};
