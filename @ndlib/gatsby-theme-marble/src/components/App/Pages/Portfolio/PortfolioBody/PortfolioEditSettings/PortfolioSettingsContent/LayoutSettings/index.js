import React from 'react'
import PropTypes from 'prop-types'
import RadioList from 'components/App/FormElements/RadioList'
import FormattedLabel from './FormattedLabel'
import { useTranslation } from 'react-i18next'

const LayoutSettings = ({ portfolio, onChange }) => {
  const { t } = useTranslation()
  const options = [
    {
      value: `default`,
      displayValue: t('text:portfolioPage.defaultLayout.value'),
      description: t('text:portfolioPage.defaultLayout.description'),
    },
    {
      value: `annotated`,
      displayValue: t('text:portfolioPage.annotatedLayout.value'),
      description: t('text:portfolioPage.annotatedLayout.description'),
    },
  ]
  const formattedOptions = getFormattedOptions(options, portfolio)
  return (
    <RadioList
      options={formattedOptions}
      fieldName='layoutDisplay'
      onChange={onChange}
    />
  )
}

LayoutSettings.propTypes = {
  portfolio: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default LayoutSettings

export const getFormattedOptions = (options, portfolio) => {
  return options.map(option => {
    return {
      value: option.value,
      formattedLabel: FormattedLabel(option),
      checked: portfolio.layout === option.value,
    }
  })
}
