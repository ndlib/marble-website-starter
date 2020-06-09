import i18next from 'i18next'
import config from '@ndlib/gatsby-theme-marble/src/i18n/config'
import commonTLH from 'assets/i18n/json/common.tlh.json'

i18next.init(config)
i18next.addResourceBundle('tlh', 'common', commonTLH)
i18next.languages = ['en', 'tlh']
i18next.changeLanguage('tlh')
export default i18next
