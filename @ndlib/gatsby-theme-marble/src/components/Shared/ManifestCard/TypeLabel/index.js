/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import typy from 'typy'
import PropTypes from 'prop-types'
import icon from 'assets/icons/svg/baseline-collections-modified-24px.svg'
import { jsx } from 'theme-ui'
import sx from './sx'

const TypeLabel = ({ iiifManifest }) => {
  const type = typy(iiifManifest, 'type').safeString.toLowerCase()
  if (type === 'collection') {
    return (
      <div sx={sx.wrapper}>
        <img
          src={icon}
          alt=''
          sx={sx.image}
        />
      </div>
    )
  }
  return null
}

TypeLabel.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}

export default TypeLabel
