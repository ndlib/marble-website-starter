import React from 'react'
import PropTypes from 'prop-types'
import RadioList from 'components/App/FormElements/RadioList'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import style from './style.module.css'

const VisibilitySettings = ({ compilation }) => {
  const options = [
    {
      value: `private`,
      description: `Only you can see this compilation page. It will not appear in the list of compilations on your user page except for you. This is the default visibility of any compilation unless you change it.`,
    },
    {
      value: `shared`,
      description: `Anyone who knows the url of this compilation may view this page. This compilation will appear in the list on your user page for any logged in user. Search engines are discouraged from adding this page to their index.`,
    },
    {
      value: `public`,
      description: `Anyone may view this compilation. It will be listed on your user page. Search engines may discover this page and present it in search results.`,
    },
  ]
  const formattedOptions = options.map(option => {
    return {
      value: option.value,
      formattedLabel: FormattedLabel(option.value, option.description),
      checked: compilation.visibility === option.value,
    }
  })
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
  compilation: PropTypes.object.isRequired,
}

export default VisibilitySettings

export const FormattedLabel = (value, description) => {
  return (
    <React.Fragment>
      <span className={style.visibilityLabel}>
        <VisibilityLabel visibility={value} />
      </span>
      <span className={style.description}>
        {description}
      </span>
    </React.Fragment>
  )
}
