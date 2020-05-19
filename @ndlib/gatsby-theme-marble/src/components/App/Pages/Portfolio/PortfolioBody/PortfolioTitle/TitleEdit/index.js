/** @jsx jsx */
import { useState, useContext } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from 'context/PortfolioContext'
import SaveOrCancelButtons from 'components/App/Pages/Portfolio/PortfolioBody/SaveOrCancelButtons'
import sx from './sx'

// eslint-disable-next-line complexity
const TitleEdit = ({ closeFunc }) => {
  const { portfolio } = usePortfolioContext()
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
      <span sx={sx.buttonWrapper}>
        <SaveOrCancelButtons
          closeFunc={closeFunc}
          patching={patching}
          setPatching={setPatching}
          body={{ title: newTitle }}
          valid={valid}
          changed={defaultTitle !== newTitle}
        />
      </span>
      { valid ? null : <div sx={sx.warning}><em>Title cannot be blank.</em></div> }
    </div>
  )
}

TitleEdit.propTypes = {
  closeFunc: PropTypes.func.isRequired,
}

export default TitleEdit
