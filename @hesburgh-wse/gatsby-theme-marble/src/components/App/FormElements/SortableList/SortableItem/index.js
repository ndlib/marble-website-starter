import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import style from './style.module.css'
import dragHandle from 'assets/icons/svg/baseline-drag_handle-24px.svg'

const SortableItem = ({ item, index, itemComponent }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={style.container}
          style={provided.draggableProps.style}
        >
          <div
            {...provided.dragHandleProps}
            className={style.handle}
          >
            <img src={dragHandle} alt='' />
          </div>
          {React.createElement(itemComponent, { ...item }, null)}
        </div>
      )}
    </Draggable>
  )
}
SortableItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  itemComponent: PropTypes.func.isRequired,
}

export default SortableItem
