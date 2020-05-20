/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import editIcon from 'assets/icons/svg/baseline-edit-24px.svg'
import sx from './sx'

const EditButton = ({ isOwner, setEditFunc }) => {
  if (isOwner) {
    return (
      <button
        onClick={() => setEditFunc()}
        sx={sx.editButton}
      >
        <img
          src={editIcon}
          alt='edit'
        />
      </button>
    )
  }
  return null
}

EditButton.propTypes = {
  isOwner: PropTypes.bool,
  setEditFunc: PropTypes.func.isRequired,
}

export default EditButton
