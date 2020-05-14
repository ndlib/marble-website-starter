import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextArea from 'components/App/FormElements/TextArea'
import MaterialButton from 'components/Internal/MaterialButton'
// import deleteIcon from 'assets/icons/svg/baseline-delete_forever-24px.svg'
import closeIcon from 'assets/icons/svg/baseline-done-24px.svg'
import { patchData, deleteData } from 'utils/api'
import style from 'components/App/FormElements/style.module.css'

export const EditItemFormContent = ({ item, closeFunc, loginReducer }) => {
  const [annotation, changeAnnotation] = useState(item.annotation)
  const [patching, changePatching] = useState(false)
  return (
    <React.Fragment>
      <div className={style.buttonGroup}>
        <MaterialButton onClick={() => closeFunc()}>
          Cancel
        </MaterialButton>
        <MaterialButton
          primary
          onClick={
            (e) => {
              e.preventDefault()
              const body = {
                uuid: item.uuid,
                annotation: annotation || '',
              }
              updateItem(e, loginReducer, body, changePatching, closeFunc)
            }
          }>
          Save
        </MaterialButton>
      </div>
      <TextArea
        id='annotation'
        label='Annotation'
        defaultValue={annotation}
        onChange={(event) => {
          changeAnnotation(event.target.value)
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

const updateItem = (event, loginReducer, body, patchingFunc, closeFunc) => {
  patchingFunc(true)
  patchData({
    loginReducer: loginReducer,
    contentType: 'item',
    id: body.uuid,
    body: body,
    successFunc: (event) => {
      closeFunc(event)
    },
    errorFunc: (e) => {
      console.error(e)
    },
  })
}
