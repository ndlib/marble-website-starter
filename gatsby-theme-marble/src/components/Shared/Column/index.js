import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
const Column = ({ children }) => {
  return (
    <div className={style.columnWrapper}>
      {children}
    </div>
  )
}
Column.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
}

export default Column
