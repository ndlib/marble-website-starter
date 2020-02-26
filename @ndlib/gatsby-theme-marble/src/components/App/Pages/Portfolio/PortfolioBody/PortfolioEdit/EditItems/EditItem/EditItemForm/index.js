import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EditItemFormContent from './EditItemFormContent'
import Loading from 'components/Internal/Loading'
import { getData } from 'utils/api'

export const EditItemForm = ({ uuid, closeFunc, deleteFunc, loginReducer }) => {
  const [content, setContent] = useState(<Loading />)

  useEffect(() => {
    const abortController = new AbortController()
    getData({
      loginReducer: loginReducer,
      contentType: 'item',
      id: uuid,
      successFunc: (data) => {
        setContent(<EditItemFormContent
          item={data}
          closeFunc={closeFunc}
          deleteFunc={deleteFunc}
        />)
      },
      errofFunc: () => {
        setContent(<div>Error</div>)
      },
    })
    return () => {
      abortController.abort()
    }
  }, [closeFunc, deleteFunc, loginReducer, uuid])

  return (
    <div style={{
      border: '1px solid #dedede',
      height: '352px',
      margin: '0',
      maxWidth: '800px',
      overflowY: 'scroll',
      padding: '1rem',
    }}>
      {content}
    </div>
  )
}
EditItemForm.propTypes = {
  uuid: PropTypes.string.isRequired,
  deleteFunc: PropTypes.func.isRequired,
  closeFunc: PropTypes.func.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(EditItemForm)
