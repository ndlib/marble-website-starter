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

import listIcon from 'assets/icons/svg/baseline-view_list-24px.svg'
import gridIcon from 'assets/icons/svg/baseline-view_module-24px.svg'

export const DisplayViewToggle = ({ page, activeSettings, children, displayReducer, dispatch }) => {
  const activeStyle = displayReducer[page]
  const options = [DISPLAY_LIST, DISPLAY_GRID]

  return (
    <div>
      <div className={style.displayViewToggleGroup}>
        {
          options.map(opt => {
            return (
              <ToggleButton
                key={opt}
                icon={opt === DISPLAY_LIST ? listIcon : gridIcon}
                option={opt}
                action={() => {
                  dispatch(setGridListView(page, opt))
                }}
                active={activeStyle === opt}
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

DisplayViewToggle.propTypes = {
  page: PropTypes.string.isRequired,
  activeSettings: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  displayReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(DisplayViewToggle)

export const getActiveSettings = (displayReducer, reducer) => {
  const gridListSettings = {
    [DISPLAY_GRID]: {
      breakpoints: { lg: 680, md: 480, sm: 240 },
      cols: { lg: 6, md: 4, sm: 2 },
      rowHeight: 200,
      cardWidth:  2,
    },
    [DISPLAY_LIST]: {
      breakpoints: { lg: 680, md: 480, sm: 240 },
      cols: { lg: 6, md: 6, sm: 6 },
      rowHeight: 250,
      cardWidth:  6,
    },
  }
  const view = typy(displayReducer, `[${reducer}]`).safeObject
  return typy(gridListSettings, `[${view}]`).safeObject || gridListSettings[DISPLAY_GRID]
}
