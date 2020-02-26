import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import NoItems from './NoItems'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import { COMPILATION_PAGE } from 'store/actions/displayActions'
const PortfolioDisplay = ({ items, layout, userId }) => {
  if (items.length === 0) {
    return (
      <NoItems />
    )
  }

  const sortedItems = items.sort((i1, i2) => {
    return i1.created - i2.created
  })
  if (layout === 'annotated') {
    return (
      <div className='grid'>
        {
          sortedItems.map(item => {
            return (
              <Item
                item={item}
                annotated
                key={item.uuid}
                userId={userId}
              />
            )
          })
        }
      </div>
    )
  }
  return (
    <DisplayViewToggle defaultDisplay={COMPILATION_PAGE}>
      {
        sortedItems.map(item => {
          return (
            <Item
              item={item}
              key={item.uuid}
              userId={userId}
            />
          )
        })
      }
    </DisplayViewToggle>
  )
}

PortfolioDisplay.propTypes = {
  items: PropTypes.array.isRequired,
  layout: PropTypes.oneOf([
    'default',
    'annotated',
  ]),
  userId: PropTypes.string.isRequired,
}
export default PortfolioDisplay
