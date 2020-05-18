/** @jsx jsx */
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MaterialButton from 'components/Internal/MaterialButton'
import { patchData, getData } from 'utils/api'
import style from 'components/App/FormElements/style.module.css'
import { Styled, jsx } from 'theme-ui'
import { PortfolioContext } from 'components/App/Pages/Portfolio/PortfolioBody'
import SetPortfolioImage from './SetPortfolioImage'
import sx from './sx'

export const EditItemFormContent = ({ item, closeFunc, loginReducer }) => {
  const { portfolio, updatePortfolio } = useContext(PortfolioContext)
  const [annotation, changeAnnotation] = useState(item.annotation)
  const [patching, changePatching] = useState(false)

  const callBack = () => {
    getData({
      loginReducer: loginReducer,
      contentType: 'collection',
      id: portfolio.uuid,
      successFunc: (data) => {
        updatePortfolio(data)
        closeFunc()
      },
      errorFunc: (e) => {
        console.error(e)
      },
    })
  }
  return (
    <React.Fragment>
      <div className={style.buttonGroup}>
        <MaterialButton onClick={() => closeFunc()}>
          Cancel
        </MaterialButton>
        <MaterialButton
          primary
          onClick={
            (e) => {
              e.preventDefault()
              const body = {
                uuid: item.uuid,
                annotation: annotation || '',
              }
              updateItem(e, loginReducer, body, changePatching, callBack)
            }
          }>
          Save
        </MaterialButton>
      </div>
      <Styled.h2>{item.title}</Styled.h2>
      <label
        htmlFor='annotation'
        className='accessibilityOnly'
      >Annotation</label>
      <textarea
        id='annotation'
        defaultValue={annotation}
        onChange={(event) => {
          changeAnnotation(event.target.value)
        }}
        disabled={patching}
        sx={sx.textArea}
      />
      <SetPortfolioImage item={item} />
    </React.Fragment>
  )
}
EditItemFormContent.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    annotation: PropTypes.string,
    image: PropTypes.string,
    manifest: PropTypes.string,
    link: PropTypes.string,
    uuid: PropTypes.string,
  }),
  closeFunc: PropTypes.func.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(EditItemFormContent)

const updateItem = (event, loginReducer, body, patchingFunc, closeFunc) => {
  patchingFunc(true)
  patchData({
    loginReducer: loginReducer,
    contentType: 'item',
    id: body.uuid,
    body: body,
    successFunc: (event) => {
      closeFunc(event)
    },
    errorFunc: (e) => {
      console.error(e)
    },
  })
}
