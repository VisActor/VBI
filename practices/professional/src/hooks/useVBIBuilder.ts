import { useCallback } from 'react';
import type { VBIBuilder, VBIDSL } from '@visactor/vbi';
import { useBuilderDocState } from './useBuilderDocState';
import {
  PROFESSIONAL_DEFAULT_LIMIT,
  PROFESSIONAL_DEFAULT_LOCALE,
  PROFESSIONAL_DEFAULT_THEME,
  type ProfessionalLocale,
  type ProfessionalTheme,
} from 'src/constants/builder';

const normalizeLimit = (limit: number) => Math.max(1, Math.round(limit));

export const useVBIBuilder = (builder: VBIBuilder | undefined) => {
  const state = useBuilderDocState({
    builder,
    fallback: {
      locale: PROFESSIONAL_DEFAULT_LOCALE,
      theme: PROFESSIONAL_DEFAULT_THEME,
      limit: PROFESSIONAL_DEFAULT_LIMIT,
      connectorId: '',
    },
    getSnapshot: (activeBuilder) => {
      const dsl = activeBuilder.dsl.toJSON() as VBIDSL;
      return {
        locale: (dsl.locale ?? PROFESSIONAL_DEFAULT_LOCALE) as ProfessionalLocale,
        theme: (dsl.theme ?? PROFESSIONAL_DEFAULT_THEME) as ProfessionalTheme,
        limit: normalizeLimit(dsl.limit ?? PROFESSIONAL_DEFAULT_LIMIT),
        connectorId: dsl.connectorId ?? '',
      };
    },
  });

  const setLocale = useCallback(
    (locale: ProfessionalLocale) => builder?.locale.setLocale(locale),
    [builder],
  );
  const setTheme = useCallback(
    (theme: ProfessionalTheme) => builder?.theme.setTheme(theme),
    [builder],
  );
  const setLimit = useCallback(
    (limit: number) => builder?.limit.setLimit(normalizeLimit(limit)),
    [builder],
  );

  return {
    ...state,
    setLocale,
    setTheme,
    setLimit,
  };
};
