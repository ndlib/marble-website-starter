import React from 'react'
import PropTypes from 'prop-types'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export const ResponsiveGridList = ({
  breakpoints,
  cols,
  rowHeight, // Number of pixels for height of a row
  cardWidth, // Number of columns for a child
  cardHeight, // Number of rows for a child
  children, // Must be an array of nodes. Individual children must be wrapped in <div key={`${index}`}>
}) => {
  const ResponsiveGridLayout = WidthProvider(Responsive)
  const layouts = makeResponsiveLayouts(children, cardWidth, cardHeight, cols)
  return (
    <ResponsiveGridLayout
      layouts={layouts}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={rowHeight}
    >
      {children}
    </ResponsiveGridLayout>
  )
}

ResponsiveGridList.propTypes = {
  breakpoints: PropTypes.object,
  cols: PropTypes.object,
  rowHeight: PropTypes.number,
  cardWidth: PropTypes.number,
  cardHeight: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

ResponsiveGridList.defaultProps = {
  breakpoints: { lg: 800, md: 600, sm: 480 },
  cols: { lg: 12, md: 8, sm: 4 },
  rowHeight: 200,
  cardWidth: 4,
  cardHeight: 1,
}

export default ResponsiveGridList

// Make multiple layouts for different breakpoints
export const makeResponsiveLayouts = (children, cardWidth, cardHeight, cols) => {
  const layouts = {}
  Object.keys(cols).forEach(key => {
    layouts[key] = makeLayout(children, cardWidth, cardHeight, cols[key])
  })
  return layouts
}

// Make a single static layout
export const makeLayout = (children, cardWidth, cardHeight, numCols) => {
  const layout = []
  children.forEach((child, index) => {
    layout.push({
      i: child.key,
      x: (index * cardWidth) % numCols,
      y: Math.floor(index / (numCols / cardWidth)),
      w: cardWidth,
      h: cardHeight,
      static: true,
    })
  })
  return layout
}
