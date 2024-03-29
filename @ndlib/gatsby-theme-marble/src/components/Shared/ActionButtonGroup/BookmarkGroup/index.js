/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx } from 'theme-ui'
import DropDown from 'components/Shared/DropDown'
import BookmarkLabel from './BookmarkLabel'
import BookmarkOptions from './BookmarkOptions'
import { getPortfolioUser } from 'utils/api'
import { isLoggedIn } from 'utils/auth'
import { FaBookmark } from 'react-icons/fa'
import sx from './sx'

export const BookmarkGroup = ({ marbleItem, loginReducer, size }) => {
  const [portfolios, setPortfolios] = useState([])
  useEffect(() => {
    const abortController = new AbortController()
    if (loginReducer.user.netid) {
      getPortfolioUser({ userName: loginReducer.user.netid, loginReducer: loginReducer })
        .then((result) => {
          setPortfolios(result.portfolioCollections.items)
        })
        .catch((e) => {
          console.error(e)
        })
    }
    return () => {
      abortController.abort()
    }
  }, [loginReducer])

  if (!isLoggedIn(loginReducer)) {
    return null
  }
  if (!size) {
    size = ''
  }
  const style = (size === 'tiny')
  const buttonLabel = size === 'tiny'
    ? (
      <FaBookmark sx={sx.bookmark} />
    )
    : (
      <BookmarkLabel
        sxStyle={sx}
        text='Save to a portfolio'
        aria-label='Save to a portfolio'
      />
    )
  return (
    <DropDown
      sxStyle={sx}
      sxTiny={style}
      buttonLabel={buttonLabel}
      buttonText='Save to a Portfolio'
      tabIndex={0}
      options={(
        <BookmarkOptions
          portfolios={portfolios}
          marbleItem={marbleItem}
          setFunc={setPortfolios}
        />
      )}
    />
  )
}

BookmarkGroup.propTypes = {
  marbleItem: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
  size: PropTypes.string,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(BookmarkGroup)

// sort by timestamp most recent first
export const sortCollections = (data) => {
  return typy(data, 'collections').safeArray.sort((a, b) => {
    return b.updated - a.updated
  })
}
