import React from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import DisplayViewToggle from 'components/Shared/DisplayViewToggle'
import { COMPILATION_PAGE } from 'store/actions/displayActions'

const GridListView = ({ items, userId, isOwner }) => {
  return (
    <DisplayViewToggle defaultDisplay={COMPILATION_PAGE}>
      {
        items.map(item => {
          return (
            <Item
              item={item}
              key={item.uuid}
              userId={userId}
              isOwner={isOwner}
            />
          )
        })
      }
    </DisplayViewToggle>
  )
}

GridListView.propTypes = {
  isOwner: PropTypes.bool,
  items: PropTypes.array,
  userId: PropTypes.string,
}
export default GridListView
