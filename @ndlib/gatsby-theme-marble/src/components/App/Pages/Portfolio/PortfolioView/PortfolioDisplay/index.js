import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import { COMPILATION_PAGE } from 'store/actions/displayActions'
const PortfolioDisplay = ({ items, user, display }) => {
  const sortedItems = items.sort((i1, i2) => {
    return i1.index - i2.index
  })
  if (display === 'annotated') {
    return (
      <div className='grid'>
        {
          sortedItems.map(item => {
            return (
              <Item
                item={item}
                annotated
                key={item.id}
                user={user}
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
              user={user}
              key={item.id}
            />
          )
        })
      }
    </DisplayViewToggle>
  )
}

PortfolioDisplay.propTypes = {
  items: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  display: PropTypes.oneOf([
    'default',
    'annotated',
  ]),
}
export default PortfolioDisplay
