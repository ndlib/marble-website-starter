import React from 'react'
import PropTypes from 'prop-types'
import CompilationImage from './CompilationImage'
import VisibilitySettings from './VisibilitySettings'
import LayoutSettings from './LayoutSettings'
import DangerDelete from './DangerDelete'
import TextField from 'components/App/FormElements/TextField'
import TextArea from 'components/App/FormElements/TextArea'
import style from 'components/App/FormElements/style.module.css'

const CompilationSettings = ({ compilation, className }) => {
  const { title, description } = compilation
  return (
    <div className={className}>
      <TextField
        id='compilationName'
        label='Title'
        defaultValue={title}
      />
      <TextArea
        id='description'
        label='Description'
        defaultValue={description}
      />
      <CompilationImage compilation={compilation} />
      <label
        htmlFor='layoutDisplay'
        className={style.editLabel}
      >Layout</label>
      <LayoutSettings compilation={compilation} />
      <label
        htmlFor='visibility'
        className={style.editLabel}
      >Privacy</label>
      <VisibilitySettings compilation={compilation} />
      <DangerDelete compilation={compilation} />
    </div>
  )
}

CompilationSettings.propTypes = {
  compilation: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
}

export default CompilationSettings
