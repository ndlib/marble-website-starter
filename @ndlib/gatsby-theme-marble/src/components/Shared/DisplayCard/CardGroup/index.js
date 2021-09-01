/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useSelector } from 'react-redux'
import { jsx, Box, Flex } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import CardGroupToggle from './CardGroupToggle'
import {
  DISPLAY_GRID,
} from 'store/actions/displayActions'
import sx from '../sx.js'
export const LayoutContext = React.createContext(DISPLAY_GRID)

/*
Class to help manage using cards in either wide or narrow mode.
By default it will add UI to create a toggle selector between the two modes.
You can also set a group of card lists to be toggled together by using the same toggleGroup parameter.
This allows you to set one mode and have other lists save and reuse that mode.

Params
toggleGroup  -  a parameter that joins groups of lists to the same toggled setting. ie. search
extraControls - React compontents you want to display along side of the toggle.
allowToggle - true to see the toggle false to not display
defaultDisplay - the default state the toggle should be in "grid" or "list" (or you can use DISPLAY_GRID or DISPLAY_LIST from store/actions/displayActions)
gridWidthRule - accepts a string or an array of strings as the width rule for cards displayed in grid view. Defaults to ['100%', '100%', '50%', '50%', '33.33%']
*/
export const CardGroup = ({ toggleGroup, extraControls, children, allowToggle, defaultDisplay, gridWidthRule }) => {
  const layout = useSelector(state => state.displayReducer[toggleGroup])

  if (!typy(children).isArray) {
    return null
  }

  // do a little sx override here to allow custom setting of the gridWidthRule
  const localSx = {
    list: sx.cardGroup.list,
    grid: {
      ...sx.cardGroup.grid,
      width: gridWidthRule,
    },
  }
  const displayLayout = layout || defaultDisplay

  return (
    <LayoutContext.Provider value={displayLayout}>
      {
        allowToggle
          ? (<CardGroupToggle
            toggleGroup={toggleGroup}
            layout={displayLayout}
            extraControls={extraControls}
          />)
          : null
      }
      <Flex sx={{ flexWrap: 'wrap' }}>
        {
          typy(children).safeArray.map((child, index) => {
            return (<Box key={index} sx={localSx.[displayLayout]}>{child}</Box>)
          })
        }
      </Flex>
    </LayoutContext.Provider>
  )
}

CardGroup.propTypes = {
  children: PropTypes.node,
  defaultDisplay: PropTypes.string,
  toggleGroup: PropTypes.string,
  extraControls: PropTypes.node,
  allowToggle: PropTypes.bool,
  gridWidthRule: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
}

CardGroup.defaultProps = {
  toggleGroup: 'default',
  defaultDisplay: DISPLAY_GRID,
  allowToggle: true,
  gridWidthRule: ['100%', '100%', '50%', '50%', '33.33%'],
}

export default CardGroup
