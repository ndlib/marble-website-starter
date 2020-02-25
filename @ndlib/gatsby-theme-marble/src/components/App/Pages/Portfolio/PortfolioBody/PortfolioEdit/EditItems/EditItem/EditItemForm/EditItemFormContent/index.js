import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'components/App/FormElements/TextField'
import TextArea from 'components/App/FormElements/TextArea'
import MaterialButton from 'components/Internal/MaterialButton'
import deleteIcon from 'assets/icons/svg/baseline-delete_forever-24px.svg'
import closeIcon from 'assets/icons/svg/baseline-done-24px.svg'
import style from 'components/App/FormElements/style.module.css'

export const EditItemFormContent = ({ item, closeFunc, deleteFunc, loginReducer }) => {
  const [title, changeTitle] = useState(item.title)
  const [annotation, changeAnnotation] = useState(item.annotation)
  const [image, changeImage] = useState(item.image)
  const [manifest, changeManifest] = useState(item.manifest)
  const [link, changeLink] = useState(item.link)
  const [patching, changePatching] = useState(false)
  return (
    <React.Fragment>
      <div className={style.buttonGroup}>
        <MaterialButton onClick={
          (e) => {
            e.preventDefault()
            deleteItem(e, loginReducer, item.uuid, changePatching, deleteFunc, closeFunc)
          }
        }>
          <img src={deleteIcon} alt='Delete' />
        </MaterialButton>
        <MaterialButton onClick={
          (e) => {
            e.preventDefault()
            const body = {
              uuid: item.uuid,
              title: title || null,
              annotation: annotation || null,
              image: image || null,
              manifest: manifest || null,
              link: link || null,
            }
            patchData(e, loginReducer, body, changePatching, closeFunc)
          }
        }>
          <img src={closeIcon} alt='Close editing form' />
        </MaterialButton>
      </div>
      <TextField
        id='label'
        label='Title'
        defaultValue={title}
        onChange={(event) => {
          changeTitle(event.target.value)
        }}
        disabled={patching}
      />
      <TextArea
        id='annotation'
        label='Annotation'
        defaultValue={annotation}
        onChange={(event) => {
          changeAnnotation(event.target.value)
        }}
        disabled={patching}
      />
      <TextField
        id='image'
        label='Image'
        defaultValue={image}
        onChange={(event) => {
          changeImage(event.target.value)
        }}
        disabled={patching}
      />
      <TextField
        id='link'
        label='Link'
        defaultValue={link}
        onChange={(event) => {
          changeLink(event.target.value)
        }}
        disabled={patching}
      />
      <TextField
        id='manifest'
        label='IIIF Manifest'
        defaultValue={manifest}
        onChange={(event) => {
          changeManifest(event.target.value)
        }}
        disabled={patching}
      />
    </React.Fragment>
  )
}
EditItemFormContent.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    annotation: PropTypes.string,
    image: PropTypes.string,
    manifest: PropTypes.string,
    link: PropTypes.string,
    uuid: PropTypes.string,
  }),
  deleteFunc: PropTypes.func.isRequired,
  closeFunc: PropTypes.func.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(EditItemFormContent)

export const deleteItem = (event, loginReducer, uuid, patchingFunc, deleteFunc, closeFunc) => {
  patchingFunc(true)
  if (window.confirm(`This action cannot be undone.`)) {
    fetch(
      `${loginReducer.userContentPath}item/${uuid}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: loginReducer.token.idToken,
          'Access-Control-Request-Method': 'DELETE',
          'Access-Control-Request-Headers': 'Authorization',
        },
        mode: 'cors',
      },
    )
      .then(async (result) => {
        if (result.status === 204) {
          deleteFunc()
        } else {
          closeFunc(event)
          console.error('Item may not have deleted')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  patchingFunc(false)
  closeFunc(event)
}

const patchData = (event, loginReducer, body, patchingFunc, closeFunc) => {
  patchingFunc(true)
  fetch(
    `${loginReducer.userContentPath}item/${body.uuid}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: loginReducer.token.idToken,
        'Access-Control-Request-Method': 'PATCH',
        'Access-Control-Request-Headers': 'Authorization',
      },
      mode: 'cors',
      body: JSON.stringify(body),
    },
  )
    .then(result => {
      return result.json()
    })
    .then(() => {
      closeFunc(event)
    })
    .catch((error) => {
      console.error(error)
    })
}
