/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ToggleButton from './ToggleButton'
import style from './style.module.css'
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

export const DisplayViewToggleInternal = ({ page, children, layoutClass, displayReducer, dispatch }) => {
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
      <div sx={{ margin: '0 -1rem' }}>
        {
          children ? (children.map((child, index) => {
            return (
              <div
                key={index}
                sx={displayReducer[page] === 'list' ? {
                  padding: '1rem',
                  width: '100%',
                } : {
                  display: 'inline-block',
                  padding: '1rem',
                  width: ['100%', '50%', '33.33%'],
                }}
              >{child}</div>
            )
          })
          ) : null
        }
      </div>
    </div>
  )
}

DisplayViewToggleInternal.propTypes = {
  page: PropTypes.string.isRequired,
  layoutClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  displayReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(DisplayViewToggleInternal)
