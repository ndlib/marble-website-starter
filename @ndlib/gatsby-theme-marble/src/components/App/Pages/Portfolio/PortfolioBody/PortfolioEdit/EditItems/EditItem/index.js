import React, { useState } from 'react'
import PropTypes from 'prop-types'
import EditItemForm from './EditItemForm'
import Card from 'components/Shared/Card'

const EditItem = ({ item }) => {
  const { title, annotation, image } = item
  const [editing, toggleEdit] = useState(false)
  const [deleted, setDeleted] = useState(false)
  if (deleted) {
    return (
      <div style={{
        backgroundColor: '#dedede',
        color: 'white',
        border: '1px solid #dedede',
        height: '352px',
        lineHeight: '302px',
        margin: '0',
        maxWidth: '800px',
        overflowY: 'scroll',
        padding: '1rem',
        textAlign: 'center',
        width: '100%',
      }}>Deleted</div>
    )
  }
  return (
    <div>
      {
        editing
          ? <EditItemForm
            uuid={item.uuid}
            closeFunc={(e) => {
              e.preventDefault()
              toggleEdit(false)
            }}
            deleteFunc={() => {
              setDeleted(true)
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
    uuid: PropTypes.string,
  }),
}
export default EditItem
