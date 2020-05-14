import React, { useState } from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import Card from 'components/Shared/Card'
import style from './style.module.css'
import EditItemForm from './EditItemForm'
import { patchData, deleteData } from 'utils/api'

const Item = ({ item, userId, isOwner, annotated = false }) => {
  const [editing, setEditing] = useState(false)
  const finalTarget = targetWithAnnotation(item, userId)

  let buttons = null

  if (isOwner) {
    buttons = (
      <span>
        <button
          onClick={() => setEditing(true)}
        >Edit</button>
        <button
          onClick={
            () => {
              if (window.confirm(`This action cannot be undone`)) {
                // deleteItem(e, loginReducer, item.uuid, changePatching, deleteFunc, closeFunc)
                console.log('delete')
              }
            }
          }
        >Delete</button>
      </span>
    )
  }
  let card = (
    <div>
      <Card
        label={item.title}
        target={finalTarget}
        image={item.image}
      >
        {
          item.annotation
            ? <React.Fragment>
              <p>{item.annotation}</p>
            </React.Fragment> : null
        }
      </Card>
      {buttons}
    </div>
  )

  if (editing) {
    card = (
      <EditItemForm
        uuid={item.uuid}
        closeFunc={() => setEditing(false)}
      />
    )
  }
  if (annotated) {
    return (
      <div className={style.item}>
        <MultiColumn columns='5'>
          <Column colSpan='3'>{item.annotation}</Column>
          <Column colSpan='2'>
            {card}
          </Column>
        </MultiColumn>
      </div>
    )
  }
  return card
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  isOwner: PropTypes.bool,
  annotated: PropTypes.bool,
}
export default Item

export const targetWithAnnotation = (item, userId) => {
  if (item && item.annotation && !typy(item, 'link').safeString.startsWith('http')) {
    return `${item.link}?${userId}${item.uuid}`
  }
  return item.link
}

export const deleteItem = (event, loginReducer, uuid, patchingFunc, deleteFunc, closeFunc) => {
  patchingFunc(true)
  if (window.confirm(`This action cannot be undone.`)) {
    deleteData({
      loginReducer: loginReducer,
      contentType: 'item',
      id: uuid,
      successFunc: deleteFunc,
      errorFunc: (e) => {
        console.error(e)
      },
    })
  }
  patchingFunc(false)
  closeFunc(event)
}
