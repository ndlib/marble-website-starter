import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import { connect } from 'react-redux'
import ToggleButton from './ToggleButton'
import DisplayViewToggleGridList from './DisplayViewToggleGridList'
import style from './style.module.css'
import {
  DISPLAY_GRID,
  DISPLAY_LIST,
  setGridListView,
} from 'store/actions/displayActions'
import listIconActive from 'assets/icons/svg/baseline-view_list-24px-white.svg'
import gridIconActive from 'assets/icons/svg/baseline-view_module-24px-white.svg'
import listIconInactive from 'assets/icons/svg/baseline-view_list-24px.svg'
import gridIconInactive from 'assets/icons/svg/baseline-view_module-24px.svg'

export const DisplayViewToggleInternal = ({ page, activeSettings, children, layoutClass, displayReducer, dispatch }) => {
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

  return (
    <div className={layoutClass}>
      <div className={style.displayViewToggleGroup}>
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
      <DisplayViewToggleGridList activeSettings={activeSettings}>
        {children}
      </DisplayViewToggleGridList>
    </div>
  )
}

DisplayViewToggleInternal.propTypes = {
  page: PropTypes.string.isRequired,
  activeSettings: PropTypes.object.isRequired,
  layoutClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  displayReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(DisplayViewToggleInternal)

export const getActiveSettings = (displayReducer, reducer) => {
  const gridListSettings = {
    [DISPLAY_GRID]: {
      breakpoints: { lg: 1200, md: 800, sm: 600 },
      cols: { lg: 6, md: 4, sm: 2 },
      rowHeight: 400,
      cardWidth:  2,
    },
    [DISPLAY_LIST]: {
      breakpoints: { lg: 680, md: 480, sm: 240 },
      cols: { lg: 6, md: 6, sm: 6 },
      rowHeight: 270,
      cardWidth:  6,
    },
  }
  const view = typy(displayReducer, `[${reducer}]`).safeObject
  return typy(gridListSettings, `[${view}]`).safeObject || gridListSettings[DISPLAY_GRID]
}
