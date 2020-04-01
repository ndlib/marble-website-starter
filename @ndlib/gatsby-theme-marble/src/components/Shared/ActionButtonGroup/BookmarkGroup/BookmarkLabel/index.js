/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import icon from 'assets/icons/svg/baseline-bookmark-24px-white.svg'
import sx from './sx'

const BookmarkLabel = () => {
  return (
    <React.Fragment>
      <img
        src={icon}
        alt=''
        sx={sx.image}
      />
      <span sx={sx.label}>Save to a portfolio</span>
    </React.Fragment>
  )
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default BookmarkLabel
