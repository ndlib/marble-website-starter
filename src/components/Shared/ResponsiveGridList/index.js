import React from 'react'
import PropTypes from 'prop-types'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export const ResponsiveGridList = ({
  breakpoints,
  cols,
  rowHeight,
  cardWidth,
  children, // Individual children must be wrapped in <div key={`${index}`}>
}) => {
  const ResponsiveGridLayout = WidthProvider(Responsive)
  const layouts = makeResponsiveLayouts(children.length, cardWidth, cols)
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
  children: PropTypes.node.isRequired,
}

ResponsiveGridList.defaultProps = {
  breakpoints: { lg: 800, md: 600, sm: 480 },
  cols: { lg: 12, md: 8, sm: 4 },
  rowHeight: 200,
  cardWidth: 4,
}

export default ResponsiveGridList

// Make multiple layouts for different breakpoints
export const makeResponsiveLayouts = (count, cardWidth, cols) => {
  const layouts = {}
  Object.keys(cols).forEach(key => {
    layouts[key] = makeLayout(count, cardWidth, cols[key])
  })
  return layouts
}

// Make a single static layout
export const makeLayout = (count, cardWidth, numCols) => {
  const layout = []
  for (let i = 0; i < count; i++) {
    layout.push({
      i: `${i}`,
      x: (i * cardWidth) % numCols,
      y: Math.floor(i / (numCols / cardWidth)),
      w: cardWidth,
      h: 1,
      static: true,
    })
  }
  return layout
}
