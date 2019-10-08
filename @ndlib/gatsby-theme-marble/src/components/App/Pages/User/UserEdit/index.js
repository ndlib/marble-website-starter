import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import UserLayout from '../UserLayout'
import MaterialButton from 'components/Internal/MaterialButton'
import Gravatar from 'components/Internal/Gravatar'
import { ownsPage } from 'utils/auth'
import { getUser } from 'utils/appUtils'
import NoUser from '../NoUser'
import TextField from 'components/App/FormElements/TextField'
import TextArea from 'components/App/FormElements/TextArea'
import style from 'components/App/FormElements/style.module.css'

const UserEdit = (props) => {
  const { username, loginReducer } = props
  const user = getUser(username)
  if (!user) {
    return (<NoUser {...props} />)
  } else if (!ownsPage(loginReducer, username)) {
    navigate(`/user/${username}`)
    return null
  }
  return (
    <UserLayout user={user} {...props}>
      <form className={style.edit}>
        <div className={style.buttonGroup}>
          <MaterialButton
            onClick={(e) => {
              e.preventDefault()
              if (window.confirm(
                `Any unsaved changes you have made will be lost.`
              )) {
                navigate(`/user/${username}`)
              }
            }}
          >Cancel</MaterialButton>
          <MaterialButton
            onClick={(e) => {
              e.preventDefault()
              console.log('save profile')
              navigate(`/user/${username}`)
            }}
            primary
          >Save</MaterialButton>
        </div>
        <TextField
          id='profileName'
          label='Name'
          defaultValue={user.name}
        />
        <TextField
          id='profileUsername'
          label='Username'
          defaultValue={user.username}
          disabled
        />
        <TextField
          id='profileEmail'
          label='Email Address'
          defaultValue={user.email}
          disabled
        />
        <TextArea
          id='profileBio'
          label='Bio'
          defaultValue={user.bio}
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
    </UserLayout>
  )
}
UserEdit.propTypes = {
  username: PropTypes.string,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default UserEdit
