import { useState, useEffect } from 'react';
import { VBIBuilder } from '@visactor/vbi';
import { VSeed } from '@visactor/vseed';

export const useVBI = (builder: VBIBuilder) => {
  const [vseed, setVSeed] = useState<VSeed>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!builder) {
      return;
    }
    const updateHandler = async () => {
      setLoading(true);
      try {
        const newVSeed = await builder.buildVSeed();
        setVSeed(() => newVSeed);
      } finally {
        setLoading(false);
      }
    };
    builder.doc.on('update', updateHandler);

    return () => {
      builder.doc.off('update', updateHandler);
    };
  }, [builder]);

  useEffect(() => {
    const initialize = async () => {
      if (!builder) {
        return;
      }
      setLoading(true);
      try {
        const newVSeed = await builder.buildVSeed();
        setVSeed(() => newVSeed);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, [builder]);

  return { vseed, builder, loading };
};
