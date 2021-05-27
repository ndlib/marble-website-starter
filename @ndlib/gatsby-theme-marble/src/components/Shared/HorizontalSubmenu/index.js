import React from 'react'
import PropTypes from 'prop-types'
import * as style from './style.module.css'

const HorizontalSubmenu = ({ options }) => {
  if (!options) {
    return null
  }
  return (
    <div className={style.buttonGroup}>
      {
        options.map(option => {
          return (
            <button
              key={option.label}
              onClick={(e) => {
                e.preventDefault()
                option.func()
              }}
              className={option.isActive ? style.active : style.inactive}
              style={{
                width: `${Math.floor((100 / options.length) * 100) / 100}%`,
              }}

            >{option.label}</button>
          )
        })
      }
    </div>
  )
}

HorizontalSubmenu.propTypes = {
  options: PropTypes.array,
}

export default HorizontalSubmenu
