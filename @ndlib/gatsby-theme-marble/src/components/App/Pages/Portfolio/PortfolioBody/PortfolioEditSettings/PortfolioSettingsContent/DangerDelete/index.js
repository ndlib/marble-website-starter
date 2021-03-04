import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Shared/MaterialButton'
import { deleteData } from 'utils/api'
import style from 'components/App/FormElements/style.module.css'

export const DangerDelete = ({ portfolio, loginReducer }) => {
  const warning = `Once you delete this portfolio it can not be recovered.`
  const groupId = `danger`
  const fieldId = `delete`
  return (
    <div
      id={groupId}
      className={style.editGroup}
    >
      <label htmlFor={fieldId}>
        <p><strong>{warning}</strong></p>
        <p>Are you sure you want to delete <code>{portfolio.title}</code>?</p>
      </label>
      <div className={style.buttonGroup}>
        <MaterialButton
          onClick={(e) => {
            e.preventDefault()
            deleteData({
              loginReducer: loginReducer,
              contentType: 'collection',
              id: portfolio.uuid,
              successFunc: () => {
                navigate(`/user/${loginReducer.user.userName}`)
              },
              errorFunc: (e) => {
                console.error(e)
              },
            })
          }}
        >Delete</MaterialButton>
      </div>
    </div>
  )
}

DangerDelete.propTypes = {
  portfolio: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(DangerDelete)
