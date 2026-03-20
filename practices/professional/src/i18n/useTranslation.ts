import { useMemo } from 'react';
import { useVBIBuilder } from 'src/hooks';
import { useVBIStore } from 'src/model';
import { createTranslator } from './utils';

export const useTranslation = () => {
  const builder = useVBIStore((state) => state.builder);
  const { locale, setLocale } = useVBIBuilder(builder);
  const t = useMemo(() => createTranslator(locale), [locale]);

  return {
    locale,
    setLocale,
    t,
  };
};
