/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import PagerSeries from './PagerSeries'
import PagerButton, { isActive, isDisabled } from './PagerButton'
import sx from '../../SearchTools/SearchResults/Pager/sx'

const Pager = ({
  updateItems,
  startIndex,
  endIndex,
  defaultLength = 30,
  items = [],
}) => {
  const numberOfPages = Math.ceil(items.length / defaultLength)

  // No pager if there is one subpage or no subpages
  if (!numberOfPages || numberOfPages === 1 || (
    startIndex === 0 && endIndex === items.length
  )) {
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
            isDisabled={isDisabled(startIndex === 0)}
            onClick={ () => {
              if (!isDisabled(startIndex === 0)) {
                const newStart = Math.max(startIndex - defaultLength, 0)
                const newEnd = newStart > 0 ? startIndex : defaultLength
                updateItems(newStart, newEnd)
              }
            }}
            label='Previous'
          />
          <PagerButton
            isActive={isActive(1, defaultLength, startIndex)}
            onClick={() => updateItems(0, defaultLength)}
            label='1'
          />
          <PagerSeries
            updateItems={updateItems}
            startIndex={startIndex}
            endIndex={endIndex}
            defaultLength={defaultLength}
            items={items}
          />
          <PagerButton
            isDisabled={isDisabled(endIndex >= items.length)}
            onClick={ () => {
              if (!isDisabled(endIndex >= items.length)) {
                const newStart = Math.min(endIndex, items.length)
                const newEnd = Math.min(endIndex + defaultLength, items.length)
                updateItems(newStart, newEnd)
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
  items: PropTypes.array,
  updateItems: PropTypes.func.isRequired,
  startIndex: PropTypes.number,
  endIndex: PropTypes.number,
  defaultLength: PropTypes.number,
}
export default Pager
