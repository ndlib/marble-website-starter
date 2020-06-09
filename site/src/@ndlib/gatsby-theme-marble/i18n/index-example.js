import i18next from 'i18next'
import config from '@ndlib/gatsby-theme-marble/src/i18n/config'
import commonES from 'assets/i18n/json/common.es.json'

i18next.init(config)
i18next.addResourceBundle('es', 'common', commonES)
i18next.languages = ['en', 'es']
i18next.changeLanguage('es')
export default i18next
