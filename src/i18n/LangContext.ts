import { createContext, useContext } from 'react';
import { translations, Lang, TranslationKey } from './translations';

interface LangContextValue {
  lang: Lang;
  t: (key: TranslationKey) => string;
}

export const LangContext = createContext<LangContextValue>({
  lang: 'EN',
  t: (key) => translations.EN[key],
});

export function useLang() {
  return useContext(LangContext);
}
