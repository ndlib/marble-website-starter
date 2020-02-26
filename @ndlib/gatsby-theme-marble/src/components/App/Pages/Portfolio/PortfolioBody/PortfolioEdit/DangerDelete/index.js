import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Internal/MaterialButton'
import { deleteData } from 'utils/api'
import style from 'components/App/FormElements/style.module.css'

export const DangerDelete = ({ portfolio, loginReducer }) => {
  const [deleteFieldValue, updateDeleteField] = useState(null)
  const warning = `Once you delete this portfolio it can not be recovered.`
  const groupId = `danger`
  const fieldId = `delete`
  return (
    <div>
      <label
        htmlFor={groupId}
        className={style.editLabel}
      >Danger Zone</label>
      <div
        id={groupId}
        className={style.editGroup}
      >
        <label htmlFor={fieldId}>
          <p><strong>{warning}</strong></p>
          <p>Type the the portfolio name <code>{portfolio.title}</code> in the field bellow and press the button to delete.</p>
        </label>
        <input
          type='text'
          id={fieldId}
          onChange={(e) => {
            e.preventDefault()
            updateDeleteField(e.target.value)
          }}
        />
        <div className={style.buttonGroup}>
          <MaterialButton
            onClick={(e) => {
              e.preventDefault()
              if (window.confirm(warning)) {
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
              }
              console.log(`Cancel delete on ${deleteFieldValue}`)
            }}
            disabled={deleteFieldValue !== portfolio.title}
          >Delete</MaterialButton>
        </div>
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
