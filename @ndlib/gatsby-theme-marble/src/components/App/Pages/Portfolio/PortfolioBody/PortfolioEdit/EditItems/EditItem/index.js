import React, { useState } from 'react'
import PropTypes from 'prop-types'
import EditItemForm from './EditItemForm'
import Card from 'components/Shared/Card'

const EditItem = ({ item }) => {
  const { title, annotation, image } = item
  const [editing, toggleEdit] = useState(false)
  return (
    <div>
      {
        editing
          ? <EditItemForm
            item={item}
            closeFunc={(e) => {
              e.preventDefault()
              toggleEdit(false)
            }}
          />
          : <Card
            label={title}
            image={image}
            onClick={(e) => {
              e.preventDefault()
              toggleEdit(true)
            }}
          >
            {annotation}
          </Card>
      }
    </div>
  )
}
EditItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    annotation: PropTypes.string,
    image: PropTypes.string,
    manifest: PropTypes.string,
    target: PropTypes.string,
  }),
}
export default EditItem
