import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import DisplayViewToggleShared from './DisplayViewToggleInternal'
import {
  COLLECTION_PAGE,
  DISPLAY_GRID,
} from 'store/actions/displayActions'

export const LayoutContext = React.createContext(DISPLAY_GRID)
export const DisplayView = ({ extraControls, children, defaultDisplay, displayReducer }) => {
  if (!typy(children).isArray) {
    return null
  }
  if (!defaultDisplay) {
    defaultDisplay = COLLECTION_PAGE
  }

  const layoutClass = displayReducer[defaultDisplay] || DISPLAY_GRID
  return (
    <LayoutContext.Provider value={layoutClass}>
      <DisplayViewToggleShared
        page={defaultDisplay}
        extraControls={extraControls}
      >
        {
          typy(children).safeArray.map((child, index) => {
            return (<div key={index}>{child}</div>)
          })
        }
      </DisplayViewToggleShared>
    </LayoutContext.Provider>
  )
}

DisplayView.propTypes = {
  children: PropTypes.node,
  defaultDisplay: PropTypes.string,
  displayReducer: PropTypes.object,
  extraControls: PropTypes.func,
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(DisplayView)
