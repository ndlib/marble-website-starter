import React from 'react'
import PropTypes from 'prop-types'
import RadioList from 'components/App/FormElements/RadioList'
import FormattedLabel from './FormattedLabel'

export const options = [
  {
    value: `private`,
    description: `Only you can see this portfolio page. It will not appear in the list of portfolios on your user page except for you. This is the default visibility of any portfolio unless you change it.`,
  },
  {
    value: `shared`,
    description: `Anyone who knows the url of this portfolio may view this page. This portfolio will appear in the list on your user page for any logged in user. Search engines are discouraged from adding this page to their index.`,
  },
  {
    value: `public`,
    description: `Anyone may view this portfolio. It will be listed on your user page. Search engines may discover this page and present it in search results.`,
  },
]
const VisibilitySettings = ({ portfolio }) => {
  const formattedOptions = getFormattedOptions(options, portfolio)
  return (
    <RadioList
      options={formattedOptions}
      fieldName='visibility'
      onChange={(v) => {
        console.log(v)
      }}
    />
  )
}

VisibilitySettings.propTypes = {
  portfolio: PropTypes.object.isRequired,
}

export default VisibilitySettings

export const getFormattedOptions = (options, portfolio) => {
  return options.map(option => {
    return {
      value: option.value,
      formattedLabel: FormattedLabel(option),
      checked: portfolio.visibility === option.value,
    }
  })
}
