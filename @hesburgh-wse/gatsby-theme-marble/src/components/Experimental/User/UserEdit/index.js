import React from 'react'
import PropTypes from 'prop-types'
import UserLayout from '../UserLayout'
import MaterialButton from 'components/Internal/MaterialButton'
import Gravatar from '../UserLayout/Gravatar'
import style from './style.module.css'

const UserEdit = (props) => {
  return (
    <UserLayout {...props}>
      <form className={style.profileEdit}>
        <div className={style.buttonGroup}>
          <MaterialButton
            label='Cancel'
            onClick={() => console.log('cancel changes')}
          />
          <MaterialButton
            label='Save'
            onClick={() => console.log('save profile')}
            primary
          />
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
            <span>User icons are provided by the <a href='https://en.gravatar.com'>Gravatar</a> globally recognized avatar image service.</span>
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
