import React from 'react'
import PropTypes from 'prop-types'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'

const DisplayViewToggleGridList = ({ activeSettings, children }) => {
  return (
    <ResponsiveGridList
      breakpoints={activeSettings.breakpoints}
      cols={activeSettings.cols}
      rowHeight={activeSettings.rowHeight}
      cardWidth={activeSettings.cardWidth}
      measureBeforeMount
    >{children}</ResponsiveGridList>
  )
}

DisplayViewToggleGridList.propTypes = {
  activeSettings: PropTypes.shape({
    breakpoints: PropTypes.object.isRequired,
    cols: PropTypes.object.isRequired,
    rowHeight: PropTypes.number.isRequired,
    cardWidth: PropTypes.number.isRequired,
  }),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
}

export default DisplayViewToggleGridList
