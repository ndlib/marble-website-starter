import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import MaterialButton from 'components/Internal/MaterialButton'
import TextField from 'components/App/FormElements/TextField'
import TextArea from 'components/App/FormElements/TextArea'
import { createNewUser } from 'store/actions/loginActions'
import style from 'components/App/FormElements/style.module.css'

const CreateAccount = ({ loginReducer, dispatch }) => {
  const claims = typy(loginReducer, 'token.claims').safeObject
  const [fullName, changeName] = useState(claims.fullName)
  const [email, changeEmail] = useState(claims.email)
  const [bio, changeBio] = useState('')

  return (
    <form className={style.loginArea}>
      <p>Welcome new user.</p>
      <TextField
        id='profileName'
        label='Name'
        defaultValue={fullName}
        onChange={(event) => {
          changeName(event.target.value)
        }}
      />
      <TextField
        id='profileUserName'
        label='Username'
        defaultValue={claims.netid}
        disabled
      />
      <TextField
        id='profileEmail'
        label='Email Address'
        defaultValue={claims.email}
        onChange={(event) => {
          changeEmail(event.target.value)
        }}
      />
      <TextArea
        id='profileBio'
        label='Bio'
        defaultValue={''}
        onChange={(event) => {
          changeBio(event.target.value)
        }}
      />
      <p>
        <MaterialButton
          id='createAccount'
          onClick={(event) => {
            event.preventDefault()
            const body = {
              fullName: fullName,
              email: email,
              bio: bio || '',
              uuid: `${claims.sub}.${btoa(claims.iss)}`,
              userName: claims.netid,
            }
            dispatch(createNewUser(`${claims.sub}.${btoa(claims.iss)}`, body, loginReducer))
          }}
          primary
          wide
        >Create Account</MaterialButton>
      </p>
    </form>
  )
}
const mapStateToProps = (state) => {
  return { ...state }
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}
CreateAccount.propTypes = {
  loginReducer: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccount)
