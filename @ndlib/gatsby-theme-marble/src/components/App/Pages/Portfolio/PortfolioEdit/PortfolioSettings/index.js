import React from 'react'
import PropTypes from 'prop-types'
import PortfolioImage from './PortfolioImage'
import VisibilitySettings from './VisibilitySettings'
import LayoutSettings from './LayoutSettings'
import DangerDelete from './DangerDelete'
import TextField from 'components/App/FormElements/TextField'
import TextArea from 'components/App/FormElements/TextArea'
import style from 'components/App/FormElements/style.module.css'

const PortfolioSettings = ({ portfolio, className }) => {
  const { title, description } = portfolio
  return (
    <div className={className}>
      <TextField
        id='portfolioName'
        label='Title'
        defaultValue={title}
      />
      <TextArea
        id='description'
        label='Description'
        defaultValue={description}
      />
      <PortfolioImage portfolio={portfolio} />
      <label
        htmlFor='layoutDisplay'
        className={style.editLabel}
      >Layout</label>
      <LayoutSettings portfolio={portfolio} />
      <label
        htmlFor='visibility'
        className={style.editLabel}
      >Privacy</label>
      <VisibilitySettings portfolio={portfolio} />
      <DangerDelete portfolio={portfolio} />
    </div>
  )
}

PortfolioSettings.propTypes = {
  portfolio: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
}

export default PortfolioSettings
