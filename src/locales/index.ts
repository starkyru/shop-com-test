import localeUS from './en-US.json';

import { enUS } from 'date-fns/locale';

export type LocaleName = 'en-US';

export interface LocaleData {
  value: LocaleName;
  name: string;
  dateLocale: Locale;
}

// locale data
const locales: LocaleData[] = [
  {
    name: 'English',
    value: 'en-US',
    dateLocale: enUS,
  },
];

const LOCALES_DATA = {
  'en-US': localeUS,
};

export { locales, LOCALES_DATA };
