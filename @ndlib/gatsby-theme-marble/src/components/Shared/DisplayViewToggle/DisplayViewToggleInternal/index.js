/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ToggleButton from './ToggleButton'
import sx from './sx.js'
import { jsx } from 'theme-ui'
import {
  DISPLAY_GRID,
  DISPLAY_LIST,
  setGridListView,
} from 'store/actions/displayActions'
import listIconActive from 'assets/icons/svg/baseline-view_list-24px-white.svg'
import gridIconActive from 'assets/icons/svg/baseline-view_module-24px-white.svg'
import listIconInactive from 'assets/icons/svg/baseline-view_list-24px.svg'
import gridIconInactive from 'assets/icons/svg/baseline-view_module-24px.svg'

export const DisplayViewToggleShared = ({ page, extraControls, children, displayReducer, dispatch }) => {
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
    <div>
      <div sx={sx.wrapper}>
        <ExtraControls />
        {
          options.map(opt => {
            const isActive = (displayReducer[page] === opt.display)
            return (
              <ToggleButton
                key={opt.display}
                option={opt}
                action={() => {
                  dispatch(setGridListView(page, opt.display))
                }}
                active={isActive}
              />
            )
          })
        }
      </div>
      <br className='clearfix' />
      <div sx={sx.group}>
        {
          children ? (children.map((child, index) => {
            return (
              <div
                key={index}
                sx={sx.item(displayReducer[page])}
              >{child}</div>
            )
          })
          ) : null
        }
      </div>
    </div>
  )
}

DisplayViewToggleShared.propTypes = {
  page: PropTypes.string.isRequired,
  extraControls: PropTypes.func,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  displayReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(DisplayViewToggleShared)
