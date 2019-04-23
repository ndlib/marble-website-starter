import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import Result from './Result'

export const Results = ({ searchReducer }) => {
  if (typy(searchReducer, 'results.docs').safeObject) {
    return (
      <React.Fragment>
        {
          searchReducer.results.docs.map((doc, index) => {
            return (
              <Result
                key={index}
                doc={doc}
              />
            )
          })
        }
      </React.Fragment>
    )
  }

  return <div>Not Found</div>
}

export const mapStateToProps = (state) => {
  return { ...state }
}

Results.propTypes = {
  searchReducer: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Results)
