import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ToggleButton from './ToggleButton'
import style from './style.module.css'
import {
  DISPLAY_GRID,
  DISPLAY_LIST,
  setGridListView,
} from 'store/actions/displayActions'

import listIcon from 'assets/icons/svg/baseline-view_list-24px.svg'
import gridIcon from 'assets/icons/svg/baseline-view_module-24px.svg'

export const DisplayViewToggle = ({ page, children, displayReducer, dispatch }) => {
  const activeStyle = displayReducer[page]
  const options = [DISPLAY_LIST, DISPLAY_GRID]

  return (
    <div classame={activeStyle}>
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
      {children}
    </div>
  )
}

DisplayViewToggle.propTypes = {
  page: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  displayReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(DisplayViewToggle)
