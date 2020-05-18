/** @jsx jsx */
import { useState, useContext } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { patchData } from 'utils/api'
import MaterialButton from 'components/Internal/MaterialButton'
import { PortfolioContext } from 'components/App/Pages/Portfolio/PortfolioBody'
import sx from './sx'

// eslint-disable-next-line complexity
const TitleEdit = ({ closeFunc, loginReducer }) => {
  const { portfolio, updatePortfolio } = useContext(PortfolioContext)
  const defaultTitle = portfolio.title
  const [newTitle, setNewTitle] = useState(defaultTitle)
  const [patching, setPatching] = useState(false)
  const [valid, setValid] = useState(newTitle !== '')

  return (
    <div>
      <label
        htmlFor='portfolioName'
        className='accessibilityOnly'
      >Title</label>
      <input
        type='text'
        name='portfolioName'
        defaultValue={newTitle}
        onChange={(event) => {
          setValid(event.target.value !== '')
          setNewTitle(event.target.value)
        }}
        disabled={patching}
        sx={sx.input(valid)}
      />
      <span
        sx={sx.buttonWrapper}
      >
        <MaterialButton
          onClick={() => closeFunc()}
          disabled={patching}
        >Cancel</MaterialButton>
        <MaterialButton
          onClick={() => {
            if (valid) {
              setPatching(true)
              const body = { title: newTitle }
              patchData({
                loginReducer: loginReducer,
                contentType: 'collection',
                id: portfolio.uuid,
                body: body,
                successFunc: (result) => {
                  updatePortfolio(result)
                  setPatching(false)
                  closeFunc()
                },
                errorFunc: (e) => {
                  console.error(e)
                },
              })
            }
          }}
          primary
          disabled={!valid || patching || defaultTitle === newTitle}
        >Save</MaterialButton>
      </span>
      { valid ? null : <div sx={sx.warning}><em>Title cannot be blank.</em></div> }
    </div>
  )
}

TitleEdit.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  closeFunc: PropTypes.func.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(TitleEdit)
