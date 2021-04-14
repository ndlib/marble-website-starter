/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { jsx } from 'theme-ui'
import SortableItem from './SortableItem'

const SortableList = ({ items, itemComponent, onUpdate }) => {
  const [orderedItems, setItemOrder] = useState([...items])
  const sx = (dragging) => {
    return {
      backgroundColor: dragging ? 'gray.1' : 'white',
      margin: `1rem 0`,
      padding: dragging ? `1rem .5rem` : `1rem 0`,
    }
  }
  return (
    <DragDropContext onDragEnd={(result) => {
      if (!result.destination) {
        return
      }
      const newItems = reorder(
        orderedItems,
        result.source.index,
        result.destination.index,
      )
      setItemOrder(newItems)
      onUpdate(newItems)
    }}>
      <Droppable droppableId='droppable'>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={sx(snapshot.isDraggingOver)}
          >
            {orderedItems.map(item => (
              <SortableItem
                key={item.index}
                provided={provided}
                snapshot={snapshot}
                item={item}
                index={item.index}
                itemComponent={itemComponent}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

SortableList.propTypes = {
  items: PropTypes.array.isRequired,
  itemComponent: PropTypes.node.isRequired,
  onUpdate: PropTypes.func,
}
export default SortableList

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  result.forEach((item, index) => {
    item.index = index
  })
  return result
}
