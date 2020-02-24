import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Internal/MaterialButton'
import NoAccess from './NoAccess'
import EditItems from './EditItems'
// import EditControls from './EditControls'
import PortfolioImage from './PortfolioImage'
import VisibilitySettings from './VisibilitySettings'
import LayoutSettings from './LayoutSettings'
import DangerDelete from './DangerDelete'
import TextField from 'components/App/FormElements/TextField'
import TextArea from 'components/App/FormElements/TextArea'
import { ownsPage } from 'utils/auth'
import style from 'components/App/FormElements/style.module.css'
import localStyle from './style.module.css'

export const PortfolioEdit = ({ portfolio, loginReducer }) => {
  const [title, changeTitle] = useState(portfolio.title)
  const [description, changeDescription] = useState(portfolio.description)
  const [image, changeImage] = useState(portfolio.image)
  const [layout, changeLayout] = useState(portfolio.layout)
  const [privacy, changePrivacy] = useState(portfolio.privacy)
  const [patching, setPatching] = useState(false)

  const isOwner = ownsPage(loginReducer, portfolio.userId)
  if (!isOwner) {
    return <NoAccess />
  }

  return (
    <div className={localStyle.wrapper}>
      <div className={style.buttonGroup}>
        <MaterialButton
          onClick={(e) => {
            e.preventDefault()
            if (window.confirm(
              `Any unsaved changes you have made will be lost.`,
            )) {
              navigate(`/myportfolio/${portfolio.uuid}`)
            }
          }}
          disabled={patching}
        >Cancel</MaterialButton>
        <MaterialButton
          onClick={(e) => {
            e.preventDefault()
            setPatching(true)
            const body = {
              uuid: portfolio.uuid,
              title: title,
              description: description || null,
              image: image || null,
              privacy: privacy || 'private',
              layout: layout || 'default',
            }
            patchData(loginReducer, body)
          }}
          disabled={patching}
          primary
        >Save</MaterialButton>
      </div>
      <form>
        <div className={style.edit}>
          <TextField
            id='portfolioName'
            label='Title'
            defaultValue={title}
            onChange={(event) => {
              changeTitle(event.target.value)
            }}
            disabled={patching}
          />
          <TextArea
            id='description'
            label='Description'
            defaultValue={description}
            onChange={(event) => {
              changeDescription(event.target.value)
            }}
            disabled={patching}
          />
        </div>
        <EditItems
          portfolio={portfolio}
          className={localStyle.items}
          loginReducer={loginReducer}
        />
        <div className={style.edit}>
          <PortfolioImage
            portfolio={portfolio}
            onChange={changeImage}
          />
          <label
            htmlFor='layoutDisplay'
            className={style.editLabel}
          >Layout</label>
          <LayoutSettings
            portfolio={portfolio}
            onChange={changeLayout}
          />
          <label
            htmlFor='visibility'
            className={style.editLabel}
          >Privacy</label>
          <VisibilitySettings
            portfolio={portfolio}
            onChange={changePrivacy}
          />
          <DangerDelete portfolio={portfolio} />
        </div>
      </form>
    </div>
  )
}

PortfolioEdit.propTypes = {
  portfolio: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(PortfolioEdit)

const patchData = (loginReducer, body) => {
  fetch(
    `${loginReducer.userContentPath}collection/${body.uuid}`,
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
      navigate(`/myportfolio/${body.uuid}`)
    })
    .catch((error) => {
      console.error(error)
    })
}
