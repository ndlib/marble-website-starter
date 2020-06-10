import merge from 'lodash.merge'
import defaultCommonJSON from 'assets/i18n/json/common.default.en'
import commonJSON from 'assets/i18n/json/common.en'
import defaultTextJSON from 'assets/i18n/json/text.default.en'
import textJSON from 'assets/i18n/json/text.en'
export default {
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      common: merge({}, defaultCommonJSON, commonJSON),
      text: merge({}, defaultTextJSON, textJSON),
    },
  },
  ns: ['common', 'text'],
  defaultNS: 'common',
  returnObjects: true,
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  react: {
    wait: true,
  },
}
