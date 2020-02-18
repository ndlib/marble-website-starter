import React, { useState } from 'react'
import PropTypes from 'prop-types'
import EditItemForm from './EditItemForm'
import Card from 'components/Shared/Card'

const EditItem = (props) => {
  const { label, description, image } = props
  const [editing, toggleEdit] = useState(false)
  return (
    <div className='list'>
      {
        editing
          ? <EditItemForm
            {...props}
            closeFunc={(e) => {
              e.preventDefault()
              toggleEdit(false)
            }}
          />
          : <div
            onClick={(e) => {
              e.preventDefault()
              toggleEdit(true)
            }}
            style={{ cursor: 'pointer' }}
            role='button'
          >
            <Card
              label={label}
              image={image}
            >
              {description}
            </Card>
          </div>
      }
    </div>
  )
}
EditItem.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  iiifManifest: PropTypes.string,
  target: PropTypes.string,
}
export default EditItem
