import React from 'react'
import PropTypes from 'prop-types'
import RadioList from 'components/App/FormElements/RadioList'
import FormattedLabel from './FormattedLabel'
import { useTranslation } from 'react-i18next'

const VisibilitySettings = ({ portfolio, onChange }) => {
  const { t } = useTranslation()
  const options = [
    {
      value: t('text:portfolioPage.visibilityPrivate.value'),
      description: t('text:portfolioPage.visibilityPrivate.description'),
    },
    {
      value: t('text:portfolioPage.visibilityShared.value'),
      description: t('text:portfolioPage.visibilityShared.description'),
    },
    {
      value: t('text:portfolioPage.visibilityPublic.value'),
      description: t('text:portfolioPage.visibilityPublic.description'),
    },
  ]
  const formattedOptions = getFormattedOptions(options, portfolio)
  return (
    <RadioList
      options={formattedOptions}
      fieldName='visibility'
      onChange={onChange}
    />
  )
}

VisibilitySettings.propTypes = {
  portfolio: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default VisibilitySettings

export const getFormattedOptions = (options, portfolio) => {
  return options.map(option => {
    return {
      value: option.value,
      formattedLabel: FormattedLabel(option),
      checked: portfolio.privacy === option.value,
    }
  })
}
