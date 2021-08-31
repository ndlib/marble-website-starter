/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import icon from 'assets/icons/svg/baseline-bookmark-24px-white.svg'
import sx from './sx'

const BookmarkLabel = ({ text }) => {
  return (
    <React.Fragment>
      <img
        src={icon}
        alt=''
        sx={sx.image}
      />
      <span sx={sx.label}>{text}</span>
    </React.Fragment>
  )
}

BookmarkLabel.propTypes = {
  text: PropTypes.string.isRequired,
}
export default BookmarkLabel
