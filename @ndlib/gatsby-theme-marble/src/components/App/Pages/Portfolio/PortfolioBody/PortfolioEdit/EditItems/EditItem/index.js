/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import EditItemForm from './EditItemForm'
import Card from 'components/Shared/Card'
import editIcon from 'assets/icons/svg/baseline-edit-24px.svg'
import sx from './sx'

const EditItem = ({ item }) => {
  const { title, annotation, image } = item
  const [editing, toggleEdit] = useState(false)
  const [deleted, setDeleted] = useState(false)
  if (deleted) {
    return (
      <div sx={sx.deleted}>Deleted</div>
    )
  }
  return (
    <div>
      {
        editing ? (
          <EditItemForm
            uuid={item.uuid}
            closeFunc={() => {
              toggleEdit(false)
            }}
            deleteFunc={() => {
              setDeleted(true)
            }}
          />
        ) : (
          <div
            sx={sx.wrapper}
          >
            <Card
              label={title}
              image={image}
              onClick={() => {
                toggleEdit(true)
              }}
            >
              {annotation}
            </Card>
            <img
              src={editIcon}
              title=''
              alt=''
              sx={sx.image}
            />
          </div>
        )
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
