import React from 'react'
import PropTypes from 'prop-types'
import RadioList from 'components/App/FormElements/RadioList'
import FormattedLabel from './FormattedLabel'

export const options = [
  {
    value: `default`,
    displayValue: `Default`,
    description: `Shows only the items themselves.`,
  },
  {
    value: `annotated`,
    displayValue: `Annotated`,
    description: `Shows a list with a larger area for your annotations and direct links to iiif viewers if applicable.`,
  },
]
const LayoutSettings = ({ portfolio, onChange }) => {
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
