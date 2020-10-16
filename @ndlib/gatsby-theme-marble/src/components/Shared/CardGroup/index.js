/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { BaseStyles, jsx } from 'theme-ui'
import sx from './sx'
const CardGroup = ({ label, children }) => {
  if (!children) {
    return null
  }
  return (
    <React.Fragment>
      <BaseStyles>
        <h2>{label}</h2>
      </BaseStyles>
      <div
        className='cardGroup'
        sx={sx.wrapper}
      >
        {
          children.map((card, index) => {
            return (
              <div
                key={index}
                sx={sx.card}
              >
                {card}
              </div>
            )
          })
        }
      </div>
    </React.Fragment>
  )
}

CardGroup.propTypes = {
  label: PropTypes.string,
  children: PropTypes.array,
}

export default CardGroup
