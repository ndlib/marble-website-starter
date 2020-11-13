/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import DeleteItemButton from './DeleteItemButton'
import EditButton from 'components/App/Pages/Portfolio/PortfolioBody/EditButton'
import sx from './sx'

const ItemControls = ({ item, isOwner, setEditFunc }) => {
  if (isOwner) {
    return (
      <div sx={sx.wrapper}>
        <EditButton
          isOwner={isOwner}
          setEditFunc={setEditFunc}
        />
        <DeleteItemButton item={item} />
      </div>
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
