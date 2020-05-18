/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import DeleteItemButton from './DeleteItemButton'
import EditButton from 'components/App/Pages/Portfolio/PortfolioBody/EditButton'
import sx from './sx'

const ItemControls = ({ item, isOwner, setEditFunc }) => {
  if (isOwner) {
    return (
      <span sx={sx.wrapper}>
        <DeleteItemButton item={item} />
        <EditButton
          isOwner={isOwner}
          setEditFunc={setEditFunc}
        />
      </span>
    )
  }
  return null
}

ItemControls.propTypes = {
  item: PropTypes.object.isRequired,
  isOwner: PropTypes.bool,
  setEditFunc: PropTypes.func.isRequired,
}
export default ItemControls
