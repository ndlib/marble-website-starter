import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import UserLayout from '../UserLayout'
import MaterialButton from 'components/Internal/MaterialButton'
import Gravatar from 'components/Internal/Gravatar'
import { ownsPage } from 'utils/auth'
import { getUser } from 'utils/appUtils'
import NoUser from '../NoUser'
import style from './style.module.css'

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
      <form className={style.profileEdit}>
        <div className={style.buttonGroup}>
          <MaterialButton
            onClick={(e) => {
              e.preventDefault()
              navigate(`/user/${username}`)
            }}
          >Cancel</MaterialButton>
          <MaterialButton
            onClick={(e) => {
              e.preventDefault()
              window.confirm(
                `If there was a functional API behind this page, we'd tell you it has been saved or if something went wrong.`
              )
              console.log('save profile')
              navigate(`/user/${username}`)
            }}
            primary
          >Save</MaterialButton>
        </div>
        <div>
          <label
            htmlFor='profileName'
            className={style.profileLabel}
          >Name</label>
          <input
            id='profileName'
            type='text'
            className={style.profileEditText}
          />
        </div>
        <div>
          <label
            htmlFor='profileUsername'
            className={style.profileLabel}
          >Username</label>
          <input
            id='profileUsername'
            type='text'
            className={style.profileEditText}
            disabled
          />
        </div>
        <div>
          <label
            htmlFor='profileEmail'
            className={style.profileLabel}
          >Email Address</label>
          <input
            id='profileEmail'
            type='text'
            className={style.profileEditText}
            disabled
          />
        </div>
        <div>
          <label
            htmlFor='profileBio'
            className={style.profileLabel}
          >Bio</label>
          <textarea
            id='profileBio'
            className={style.profileTextArea}
          />
        </div>
        <div>
          <label
            htmlFor='profileGravatar'
            className={style.profileLabel}
          >Avatar</label>
          <div
            id='profileGravatar'
            className={style.gravatarEdit}
          >
            <Gravatar email='rfox2@nd.edu' size={100} />
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
