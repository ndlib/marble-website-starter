/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useSelector } from 'react-redux'
import { jsx, Box, Flex } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import CardGroupShared from './CardGroupInternal'
import {
  DISPLAY_GRID,
} from 'store/actions/displayActions'
export const LayoutContext = React.createContext(DISPLAY_GRID)

export const DisplayView = ({ toggleGroup, extraControls, children, allowToggle, defaultDisplay }) => {
  const layout = useSelector(state => state.displayReducer[toggleGroup])

  if (!typy(children).isArray) {
    return null
  }
  const sx = {
    list: {
      padding: '1rem',
      width: ['100%'],
    },
    grid: {
      width: ['100%', '50%', '33.33%'],
      padding: '1rem',
    },
  }
  const displayLayout = layout || defaultDisplay

  return (
    <LayoutContext.Provider value={displayLayout}>
      {
        allowToggle ? (<CardGroupShared
          toggleGroup={toggleGroup}
          layout={displayLayout}
          extraControls={extraControls}
        />) : null
      }
      <Flex sx={{ flexWrap: 'wrap' }}>
        {
          typy(children).safeArray.map((child, index) => {
            return (<Box key={index} sx={sx[displayLayout]}>{child}</Box>)
          })
        }
      </Flex>
    </LayoutContext.Provider>
  )
}

DisplayView.propTypes = {
  children: PropTypes.node,
  defaultDisplay: PropTypes.string,
  toggleGroup: PropTypes.string,
  extraControls: PropTypes.func,
  allowToggle: PropTypes.bool,
}

DisplayView.defaultProps = {
  toggleGroup: 'default',
  defaultDisplay: DISPLAY_GRID,
  allowToggle: true,
}

export default DisplayView
