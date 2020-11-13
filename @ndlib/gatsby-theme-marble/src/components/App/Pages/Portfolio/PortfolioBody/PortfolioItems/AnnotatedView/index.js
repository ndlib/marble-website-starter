import React from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'

const AnnotatedView = ({ items, userId, isOwner }) => {
  return (
    <div className='grid'>
      {
        items.map(item => {
          return (
            <Item
              item={item}
              annotated
              key={item.uuid}
              userId={userId}
              isOwner={isOwner}
            />
          )
        })
      }
    </div>
  )
}

AnnotatedView.propTypes = {
  isOwner: PropTypes.bool,
  items: PropTypes.array,
  userId: PropTypes.string,
}
export default AnnotatedView
