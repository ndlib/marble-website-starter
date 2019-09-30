import React from 'react'
import PropTypes from 'prop-types'
import RadioList from 'components/App/FormElements/RadioList'
import style from './style.module.css'
const LayoutSettings = ({ compilation }) => {
  const options = [
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
  const formattedOptions = options.map(option => {
    return {
      value: option.value,
      formattedLabel: FormattedLabel(option),
      checked: compilation.display === option.value,
    }
  })
  return (
    <RadioList
      options={formattedOptions}
      fieldName='layoutDisplay'
      onChange={(v) => {
        console.log(v)
      }}
    />
  )
}

LayoutSettings.propTypes = {
  compilation: PropTypes.object.isRequired,
}

export default LayoutSettings

export const FormattedLabel = (option) => {
  const { displayValue, description } = option
  return (
    <React.Fragment>
      <React.Fragment>
        <span className={style.value}>{displayValue}</span>
        <span className={style.description}>{description}</span>
      </React.Fragment>
    </React.Fragment>
  )
}
