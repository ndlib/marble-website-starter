/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import ToggleButton from './ToggleButton'
import sx from './sx.js'
import { useDispatch } from 'react-redux'
import { jsx, Grid, Box } from 'theme-ui'
import {
  DISPLAY_GRID,
  DISPLAY_LIST,
  setGridListView,
} from 'store/actions/displayActions'
import listIconActive from 'assets/icons/svg/baseline-view_list-24px-white.svg'
import gridIconActive from 'assets/icons/svg/baseline-view_module-24px-white.svg'
import listIconInactive from 'assets/icons/svg/baseline-view_list-24px.svg'
import gridIconInactive from 'assets/icons/svg/baseline-view_module-24px.svg'

export const CardGroupShared = ({ toggleGroup, layout, extraControls }) => {
  const dispatch = useDispatch()

  const options = [
    {
      display: DISPLAY_LIST,
      inactiveIcon: listIconInactive,
      activeIcon: listIconActive,
    },
    {
      display: DISPLAY_GRID,
      inactiveIcon: gridIconInactive,
      activeIcon: gridIconActive,
    },
  ]
  const ExtraControls = extraControls || (() => {
    return null
  })
  return (
    <Grid columns={[2, 'auto 100px']} sx={sx.wrapper} >
      <Box>
        <ExtraControls />
      </Box>
      <Box>
        {
          options.map(opt => {
            const isActive = (layout === opt.display)
            return (
              <ToggleButton
                key={opt.display}
                option={opt}
                action={() => {
                  dispatch(setGridListView(toggleGroup, opt.display))
                }}
                active={isActive}
              />
            )
          })
        }
      </Box>
    </Grid>
  )
}

CardGroupShared.propTypes = {
  extraControls: PropTypes.func,
  toggleGroup: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
}

export default CardGroupShared
