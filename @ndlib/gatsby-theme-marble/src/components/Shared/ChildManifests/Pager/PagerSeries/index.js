/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import PagerButton, { isActive, isDisabled } from '../PagerButton'

const PagerSeries = ({
  updateItems,
  startIndex,
  endIndex,
  defaultLength,
  items = [],
}) => {
  const numberOfPages = Math.ceil(items.length / defaultLength)
  const currentPage = Math.floor(startIndex / defaultLength) + 1
  const pageArray = pageRange(currentPage - 3, currentPage + 3, numberOfPages + 1)

  // No pager series if there is one subpage or less
  if (!numberOfPages || numberOfPages === 1 || (
    startIndex === 0 && endIndex === items.length
  )) {
    return null
  }
  return (
    <>
      {
        pageArray.includes(2) ? null : <PagerButton isDisabled='is-disabled' />
      }

      {
        pageArray.map((i) => {
          return (
            <PagerButton
              key={i}
              isActive={isActive(i, defaultLength, startIndex)}
              onClick={() => updateItems((i - 1) * defaultLength, i * defaultLength)}
              label={i}
            />
          )
        })
      }
      {
        pageArray.includes(numberOfPages) ? null : <PagerButton isDisabled='is-disabled' />
      }
    </>
  )
}

const pageRange = (a, b, max) => {
  return [...Array(b - a + 1).keys()].map(x => x + a).filter(x => x > 1).filter(x => x < max)
}

PagerSeries.propTypes = {
  items: PropTypes.array,
  updateItems: PropTypes.func.isRequired,
  startIndex: PropTypes.number,
  endIndex: PropTypes.number,
  defaultLength: PropTypes.number,
}
export default PagerSeries
