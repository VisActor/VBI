import { useEffect, useRef, useState } from 'react';
import type { VBIBuilder } from '@visactor/vbi';

export const useBuilderDocState = <T>(params: {
  builder: VBIBuilder | undefined;
  fallback: T;
  getSnapshot: (builder: VBIBuilder) => T;
}) => {
  const { builder, fallback, getSnapshot } = params;
  const [state, setState] = useState<T>(fallback);
  const getSnapshotRef = useRef(getSnapshot);

  useEffect(() => {
    getSnapshotRef.current = getSnapshot;
  }, [getSnapshot]);

  useEffect(() => {
    if (!builder) {
      setState(fallback);
      return;
    }

    const sync = () => {
      setState(getSnapshotRef.current(builder));
    };

    sync();
    builder.doc.on('update', sync);

    return () => {
      builder.doc.off('update', sync);
    };
  }, [builder, fallback]);

  return state;
};
