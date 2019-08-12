import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import DisplayViewToggleInternal, { getActiveSettings } from './DisplayViewToggleInternal'
import {
  COLLECTION_PAGE,
  SEARCH_PAGE,
  DISPLAY_GRID,
  DISPLAY_LIST,
} from 'store/actions/displayActions'

export const DisplayView = ({ children, defaultDisplay, displayReducer }) => {
  if (!typy(children).isArray) {
    return null
  }
  if (!defaultDisplay) {
    defaultDisplay = COLLECTION_PAGE
  }
  const activeSettings = getActiveSettings(displayReducer, defaultDisplay)
  const layoutClass = displayReducer[defaultDisplay] || DISPLAY_GRID
  return (
    <DisplayViewToggleInternal
      page={defaultDisplay}
      activeSettings={activeSettings}
      layoutClass={layoutClass}
    >
      {
        typy(children).safeArray.map((child, index) => {
          return (<div key={index}>{child}</div>)
        })
      }
    </DisplayViewToggleInternal>

  )
}

DisplayView.propTypes = {
  children: PropTypes.node,
  displayReducer: PropTypes.object,
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(DisplayView)
