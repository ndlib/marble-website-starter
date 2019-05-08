import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import ResponsiveGridList from 'components/Shared/ResponsiveGridList'
import Result from './Result'

export const Results = ({ searchReducer, location }) => {
  if (typy(searchReducer, 'results.docs').safeObject) {
    return (
      <ResponsiveGridList>
        {
          searchReducer.results.docs.map(doc => {
            return (
              <div key={doc['@id']}>
                <Result
                  doc={doc}
                  location={location}
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
}

export default connect(mapStateToProps)(Results)
