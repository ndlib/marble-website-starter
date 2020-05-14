/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextArea from 'components/App/FormElements/TextArea'
import MaterialButton from 'components/Internal/MaterialButton'
import { patchData } from 'utils/api'
import style from 'components/App/FormElements/style.module.css'
import { Styled, jsx } from 'theme-ui'

export const EditItemFormContent = ({ item, closeFunc, loginReducer }) => {
  const [annotation, changeAnnotation] = useState(item.annotation)
  const [patching, changePatching] = useState(false)
  return (
    <React.Fragment>
      <Styled.h2>{item.title}</Styled.h2>
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
