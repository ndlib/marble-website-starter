/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import PropTypes from 'prop-types'
import PagerSeries from './PagerSeries'
import PagerButton, { setIsActive, setIsDisabled } from './PagerButton'
import sx from '../../SearchTools/SearchResults/Pager/sx'

const Pager = ({
  pageNumber,
  defaultLength,
  items,
}) => {
  const location = useLocation()
  const numberOfPages = Math.ceil(items.length / defaultLength)

  // No pager if there is one subpage or no subpages
  if (numberOfPages < 2 || pageNumber < 1) {
    return null
  }

  // Mimic pager from SearchTools
  //
  // Renders:  Previous | 1 | <PagerSeries> | Next
  // PagerSeries renders current page number, 3 pages before and after and ellipsis before and/or after as needed.
  // Examples:
  //
  // Previous | 1 | Next
  // Previous | 1 | 2 | 3 | 4 | ... | Next
  // Previous | 1 | ... | 10 | 11 | 12 | 13 | 14 | 15 | 16 | ... | Next
  // Previous | 1 | ... | 11 | 12 | 13 | 14 | 15 | 16 | 17 | Next
  // Previous | 1 | ... | 14 | 15 | 16 | 17 | Next
  return (
    <div sx={sx.wrapper}>
      <div className='sk-pagination-navigation is-numbered'>
        <div className='sk-toggle'>
          <PagerButton
            isDisabled={setIsDisabled(pageNumber === 1)}
            onClick={ () => {
              if (!setIsDisabled(pageNumber === 1)) {
                navigate(`${location.pathname}?p=${pageNumber - 1}`)
              }
            }}
            label='Previous'
          />
          <PagerButton
            isActive={setIsActive(pageNumber === 1)}
            onClick={() => navigate(`${location.pathname}?p=1`)}
            label='1'
          />
          <PagerSeries
            pageNumber={pageNumber}
            numberOfPages={numberOfPages}
          />
          <PagerButton
            isDisabled={setIsDisabled(pageNumber >= numberOfPages)}
            onClick={ () => {
              if (!setIsDisabled(pageNumber >= numberOfPages)) {
                navigate(`${location.pathname}?p=${pageNumber + 1}`)
              }
            }}
            label='Next'
          />
        </div>
      </div>
    </div>
  )
}

Pager.propTypes = {
  items: PropTypes.array.isRequired,
  defaultLength: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
}
export default Pager
