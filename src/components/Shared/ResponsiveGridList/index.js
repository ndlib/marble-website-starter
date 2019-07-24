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
  layouts, // An objects to do a custom layout
  measureBeforeMount, // Bool set to true to avoid animation
  children, // Must be an array of nodes. Individual children must be wrapped in <div key={`${index}`}>
}) => {
  const ResponsiveGridLayout = WidthProvider(Responsive)
  const currentLayout = layouts || makeResponsiveLayouts(children, cardWidth, cardHeight, cols)
  return (
    <ResponsiveGridLayout
      layouts={currentLayout}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={rowHeight}
      containerPadding={[0, 0]}
      measureBeforeMount={measureBeforeMount}
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
  layouts: PropTypes.object,
  measureBeforeMount: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
}

ResponsiveGridList.defaultProps = {
  breakpoints: { lg: 1200, md: 800, sm: 600 },
  cols: { lg: 12, md: 8, sm: 4 },
  rowHeight: 400,
  cardWidth: 4,
  cardHeight: 1,
  measureBeforeMount: false,
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
