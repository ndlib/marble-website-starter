/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import PagerButton, { setIsActive, setIsDisabled } from '../PagerButton'

const PagerSeries = ({
  pageNumber,
  numberOfPages,
}) => {
  const location = useLocation()
  // No pager series if there is one subpage or less
  if (numberOfPages < 2 || isNaN(pageNumber)) {
    return null
  }

  const pageArray = pageRange(pageNumber - 3, pageNumber + 3, numberOfPages + 1)

  return (
    <>
      {
        pageArray.includes(2) ? null : <PagerButton isDisabled={setIsDisabled(true)} />
      }

      {
        pageArray.map((i) => {
          return (
            <PagerButton
              key={i}
              isActive={setIsActive(pageNumber === i)}
              onClick={() => navigate(`${location.pathname}?p=${i}`)}
              label={i}
            />
          )
        })
      }
      {
        pageArray.includes(numberOfPages) ? null : <PagerButton isDisabled={setIsDisabled(true)} />
      }
    </>
  )
}

const pageRange = (a, b, max) => {
  return [...Array(b - a + 1).keys()].map(x => x + a).filter(x => x > 1).filter(x => x < max)
}

PagerSeries.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
}
export default PagerSeries
