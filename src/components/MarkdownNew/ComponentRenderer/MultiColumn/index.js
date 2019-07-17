import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const MultiColumn = ({ columns, children }) => {
  const numberOfColumns = columns || children.length
  return (
    <div className={`multiColumn-${numberOfColumns}`}>
      {
        children.map((comp, index) => {
          return (
            <div
              className={`col-${index + 1}`}
              key={index}
            >
              {comp}
            </div>
          )
        })
      }
    </div>
  )
}

MultiColumn.propTypes = {
  columns: PropTypes.number,
  children: PropTypes.array,
}

export default MultiColumn
