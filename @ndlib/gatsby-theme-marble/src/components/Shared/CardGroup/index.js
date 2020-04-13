/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { Styled, jsx } from 'theme-ui'
import sx from './sx'
const CardGroup = ({ label, children }) => {
  return (
    <React.Fragment>
      <Styled.h2>{label}</Styled.h2>
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
  children: PropTypes.array.isRequired,
}

export default CardGroup
