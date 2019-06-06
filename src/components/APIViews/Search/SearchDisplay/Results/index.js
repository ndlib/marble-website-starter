import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import { getActiveSettings } from 'components/Shared/DisplayViewToggle'
import Result from './Result'
import {
  SEARCH_PAGE,
  DISPLAY_LIST,
} from 'store/actions/displayActions'

export const Results = ({ searchReducer, location, displayReducer }) => {
  const activeSettings = getActiveSettings(displayReducer, SEARCH_PAGE)
  const cardClass = displayReducer[SEARCH_PAGE] || DISPLAY_LIST

  if (typy(searchReducer, 'results.docs').safeObject) {
    return (
      <ResponsiveGridList
        breakpoints={activeSettings.breakpoints}
        cols={activeSettings.cols}
        rowHeight={activeSettings.rowHeight}
        cardWidth={activeSettings.cardWidth}
        measureBeforeMount
      >
        {
          searchReducer.results.docs.map(doc => {
            return (
              <div key={doc['@id']}>
                <Result
                  doc={doc}
                  location={location}
                  cardClass={cardClass}
                />
              </div>
            )
          })
        }
      </ResponsiveGridList>
    )
  }

  return <div>Not Found</div>
}

export const mapStateToProps = (state) => {
  return { ...state }
}

Results.propTypes = {
  searchReducer: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  displayReducer: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Results)
