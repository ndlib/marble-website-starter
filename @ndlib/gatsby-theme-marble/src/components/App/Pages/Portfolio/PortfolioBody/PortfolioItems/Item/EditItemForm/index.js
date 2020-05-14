/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx } from 'theme-ui'
import EditItemFormContent from './EditItemFormContent'
import Loading from 'components/Internal/Loading'
import { getData } from 'utils/api'

export const EditItemForm = ({ uuid, closeFunc, loginReducer }) => {
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
        />)
      },
      errorFunc: () => {
        setContent(<div>Error</div>)
      },
    })
    return () => {
      abortController.abort()
    }
  }, [closeFunc, loginReducer, uuid])

  return (
    <div sx={{
      border: '1px solid',
      borderColor: 'gray.1',
      height: '400px',
      margin: '0',
      overflowY: 'scroll',
      padding: '1rem',
      width: '100%',
    }}>
      {content}
    </div>
  )
}
EditItemForm.propTypes = {
  uuid: PropTypes.string.isRequired,
  closeFunc: PropTypes.func.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(EditItemForm)
