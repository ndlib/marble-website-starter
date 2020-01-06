/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import { jsx } from 'theme-ui'

const HeroBox = ({ children }) => {
  return (
    <div
      className={style.wrapper}
      sx={{
        borderBottom: '1px solid',
        backgroundColor: '#d3d3d3',
        padding: '1rem',
        paddingLeft: '1000rem',
        paddingRight: '1000rem',
        marginTop: '-1rem',
        marginLeft: '-1000rem',
        marginRight: '-1000rem',
      }}>
      {children}
    </div>
  )
}

HeroBox.propTypes = {
  children: PropTypes.node,
}

export default HeroBox
