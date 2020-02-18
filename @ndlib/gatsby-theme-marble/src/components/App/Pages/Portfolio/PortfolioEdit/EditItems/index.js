import React from 'react'
import PropTypes from 'prop-types'
import SortableList from 'components/App/FormElements/SortableList'
import EditItem from './EditItem'

const EditItems = ({ portfolio, className }) => {
  const { items } = portfolio
  return (
    <div className={className}>
      {
        // TODO add "Add Item" button
      }
      <SortableList
        items={items}
        itemComponent={EditItem}
        onUpdate={(v) => {
          console.log(v)
        }}
      />
    </div>
  )
}

EditItems.propTypes = {
  portfolio: PropTypes.object.isRequired,
  className: PropTypes.string,
}
export default EditItems
