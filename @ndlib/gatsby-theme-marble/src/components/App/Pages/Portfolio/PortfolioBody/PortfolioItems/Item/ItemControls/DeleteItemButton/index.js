/** @jsx jsx */
import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx } from 'theme-ui'
import { deleteData, getData } from 'utils/api'
import { usePortfolioContext } from 'context/PortfolioContext'
import deleteIcon from 'assets/icons/svg/baseline-delete_forever-24px.svg'
import sx from './sx'

const DeleteItemButton = ({ item, loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const [patching, setPatching] = useState(false)
  const callBack = () => {
    getData({
      loginReducer: loginReducer,
      contentType: 'collection',
      id: portfolio.uuid,
      successFunc: (data) => {
        updatePortfolio(data)
      },
      errorFunc: (e) => {
        console.error(e)
      },
    })
  }
  return (
    <button
      disabled={patching}
      onClick={(e) => {
        deleteItem(e, loginReducer, item.uuid, setPatching, callBack)
      }}
      sx={sx.deleteButton}
    >
      <img
        src={deleteIcon}
        alt='delete'
      />
    </button>
  )
}

export const mapStateToProps = (state) => {
  return { ...state }
}

DeleteItemButton.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
)(DeleteItemButton)

export const deleteItem = (event, loginReducer, uuid, patchingFunc, callBack) => {
  patchingFunc(true)
  if (window.confirm(`This action cannot be undone.`)) {
    deleteData({
      loginReducer: loginReducer,
      contentType: 'item',
      id: uuid,
      successFunc: callBack,
      errorFunc: (e) => {
        console.error(e)
        patchingFunc(false)
      },
    })
  } else {
    patchingFunc(false)
  }
}
