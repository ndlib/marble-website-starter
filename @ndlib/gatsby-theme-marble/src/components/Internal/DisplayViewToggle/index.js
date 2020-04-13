import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import DisplayViewToggleInternal from './DisplayViewToggleInternal'
import {
  COLLECTION_PAGE,
  // SEARCH_PAGE,
  DISPLAY_GRID,
  // DISPLAY_LIST,
} from 'store/actions/displayActions'

export const LayoutContext = React.createContext(DISPLAY_GRID)
export const DisplayView = ({ children, defaultDisplay, displayReducer }) => {
  if (!typy(children).isArray) {
    return null
  }
  if (!defaultDisplay) {
    defaultDisplay = COLLECTION_PAGE
  }

  const layoutClass = displayReducer[defaultDisplay] || DISPLAY_GRID
  return (
    <LayoutContext.Provider value={layoutClass}>
      <DisplayViewToggleInternal
        page={defaultDisplay}
        layoutClass={layoutClass}
      >
        {
          typy(children).safeArray.map((child, index) => {
            return (<div key={index}>{child}</div>)
          })
        }
      </DisplayViewToggleInternal>
    </LayoutContext.Provider>
  )
}

DisplayView.propTypes = {
  children: PropTypes.node,
  defaultDisplay: PropTypes.string,
  displayReducer: PropTypes.object,
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(mapStateToProps)(DisplayView)
