import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import rw from './rw';
import fr from './fr';

i18n.use(initReactI18next).init({
  resources: {
    en,
    rw,
    fr,
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

// i18n.changeLanguage('rw'); Translation call
export default i18n;
