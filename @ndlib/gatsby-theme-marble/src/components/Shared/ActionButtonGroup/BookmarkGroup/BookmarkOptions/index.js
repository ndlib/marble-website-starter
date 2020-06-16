/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import BookmarkButton from './BookmarkButton'
import AddNewPortfolio from './AddNewPortfolio'
import sx from './sx'

const BookmarkOptions = ({ portfolios, ndJson, setFunc }) => {
  return (
    <React.Fragment>
      {
        portfolios.length > 0 ? (
          portfolios.map(
            collection => {
              return (
                <BookmarkButton
                  key={collection.uuid}
                  ndJson={ndJson}
                  collection={collection}
                />
              )
            })
        ) : (
          <div sx={sx.none}>You do not have any portfolios.</div>
        )
      }
      <AddNewPortfolio
        addFunc={setFunc}
        portfolios={portfolios}
      />
    </React.Fragment>
  )
}

BookmarkOptions.propTypes = {
  ndJson: PropTypes.object.isRequired,
  portfolios: PropTypes.array,
  setFunc: PropTypes.func.isRequired,
}

export default BookmarkOptions
