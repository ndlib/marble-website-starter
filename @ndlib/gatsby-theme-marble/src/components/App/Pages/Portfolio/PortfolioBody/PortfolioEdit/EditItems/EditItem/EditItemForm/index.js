import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'components/App/FormElements/TextField'
import TextArea from 'components/App/FormElements/TextArea'
import MaterialButton from 'components/Internal/MaterialButton'
import deleteIcon from 'assets/icons/svg/baseline-delete_forever-24px.svg'
import closeIcon from 'assets/icons/svg/baseline-done-24px.svg'
import style from 'components/App/FormElements/style.module.css'

const EditItemForm = ({ item, closeFunc }) => {
  const { title, annotation, image, manifest, target, uuid } = item
  return (
    <div style={{ margin: '1rem auto', maxWidth: '800px' }}>
      <div className={style.buttonGroup}>
        <MaterialButton onClick={(e) => deleteItem(e, uuid)}>
          <img src={deleteIcon} alt='Delete' />
        </MaterialButton>
        <MaterialButton onClick={(e) => closeFunc(e)}>
          <img src={closeIcon} alt='Close editing form' />
        </MaterialButton>
      </div>
      <TextField
        id='label'
        label='Title'
        defaultValue={title}
      />
      <TextArea
        id='description'
        label='Annotation'
        defaultValue={annotation}
      />
      <TextField
        id='image'
        label='Image'
        defaultValue={image}
      />
      <TextField
        id='target'
        label='Link'
        defaultValue={target}
      />
      <TextField
        id='iiifManifest'
        label='IIIF Manifest'
        defaultValue={manifest}
      />
    </div>
  )
}
EditItemForm.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    annotation: PropTypes.string,
    image: PropTypes.string,
    manifest: PropTypes.string,
    target: PropTypes.string,
    uuid: PropTypes.string,
  }),
  closeFunc: PropTypes.func.isRequired,
}
export default EditItemForm

export const deleteItem = (e, uuid) => {
  e.preventDefault()
  if (window.confirm(`This action cannot be undone.`)) {
    console.log(`delete ${uuid}`)
  }
}
