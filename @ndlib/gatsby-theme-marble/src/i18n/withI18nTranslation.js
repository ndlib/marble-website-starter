import React from 'react'
import i18next from './'
import { I18nextProvider, withTranslation } from 'react-i18next'

export const withI18nTranslation = (WrappedComponent) => {
  WrappedComponent = withTranslation()(WrappedComponent)

  const TranslationComponent = (props) => {
    return (
      <I18nextProvider i18n={i18next}>
        <WrappedComponent {...props} language={i18next.language} />
      </I18nextProvider>
    )
  }

  return TranslationComponent
}

export default withI18nTranslation
