import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import typy from 'typy'
import MaterialButton from 'components/Internal/MaterialButton'
import Gravatar from 'components/Internal/Gravatar'
import { ownsPage } from 'utils/auth'
import TextField from 'components/App/FormElements/TextField'
import TextArea from 'components/App/FormElements/TextArea'
import Unauthorized from './Unauthorized'
import { patchData } from 'utils/api'
import style from 'components/App/FormElements/style.module.css'

export const UserEdit = ({ user, loginReducer }) => {
  const claims = typy(loginReducer, 'token.claims').safeObject
  const [fullName, changeName] = useState(user.fullName)
  const [email, changeEmail] = useState(user.email)
  const [bio, changeBio] = useState(user.bio)
  const [patching, setPatching] = useState(false)
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g

  if (!ownsPage(loginReducer, user.uuid)) {
    return (<Unauthorized />)
  }

  return (
    <form className={style.edit}>
      <div className={style.buttonGroup}>
        <MaterialButton
          onClick={(e) => {
            e.preventDefault()
            if (window.confirm(
              `Any unsaved changes you have made will be lost.`,
            )) {
              navigate(`/user/${user.userName}`)
            }
          }}
          disabled={patching}
        >Cancel</MaterialButton>
        <MaterialButton
          onClick={(e) => {
            e.preventDefault()
            setPatching(true)
            const body = {
              fullName: fullName,
              email: email,
              bio: bio,
              uuid: `${claims.sub}.${btoa(claims.iss)}`,
              userName: claims.netid,
            }
            patchData({
              loginReducer: loginReducer,
              contentType: 'user',
              id: body.uuid,
              body: body,
              successFunc: () => {
                navigate(`/user/${body.userName}`)
              },
              errorFunc: (e) => {
                console.error(e)
              },
            })
          }}
          disabled={patching || !emailRegex.test(email) || fullName === ''}
          primary
        >Save</MaterialButton>
      </div>
      <TextField
        id='profileName'
        label='Name'
        defaultValue={user.fullName}
        onChange={(event) => {
          changeName(event.target.value)
        }}
        disabled={patching}
        valid={fullName !== ''}
        warning='Name cannot be blank.'
      />
      <TextField
        id='profileUserName'
        label='Username'
        defaultValue={user.userName}
        disabled
      />
      <TextField
        id='profileEmail'
        label='Email Address'
        defaultValue={user.email}
        onChange={(event) => {
          changeEmail(event.target.value)
        }}
        disabled={patching}
        valid={email.match(emailRegex)}
        warning='Email must be a valid address.'
      />
      <TextArea
        id='profileBio'
        label='Bio'
        defaultValue={user.bio}
        onChange={(event) => {
          changeBio(event.target.value)
        }}
        disabled={patching}
      />
      <div>
        <label
          htmlFor='profileGravatar'
          className={style.editLabel}
        >Avatar</label>
        <div
          id='profileGravatar'
          className={style.gravatarEdit}
        >
          <Gravatar email={user.email} size={100} />
          <span>User icons are provided by <a href='https://en.gravatar.com'>Gravatar</a>, the globally recognized avatar service.</span>
        </div>
      </div>
    </form>
  )
}

UserEdit.propTypes = {
  user: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserEdit)
