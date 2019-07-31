import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import './style.css'

const MultiColumn = ({ columns, children }) => {
  const numberOfColumns = parseInt(columns, 10) || children.length
  return (
    <div className={`multiColumn-${numberOfColumns}`}>
      {
        children.map((comp, index) => {
          const colSpan = typy(comp, 'props.colSpan').safeString ? ` col-span-${comp.props.colSpan}` : ''
          return (
            <div
              className={`col ${colSpan}`}
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
  columns: PropTypes.string,
  children: PropTypes.array,
}

export default MultiColumn
