/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import sx from './sx'
import dragHandle from 'assets/icons/svg/baseline-drag_handle-24px.svg'

const SortableItem = ({
  // eslint-disable-next-line no-unused-vars
  dragging,
  dragged,
  children: { title, image },
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={`list__item ${dragged ? 'is-dragging' : ''}`}
      sx={{
        ...sx.wrapper,
        cursor: dragged ? 'grabbing' : 'grab',
      }}
    >
      <img
        src={dragHandle}
        alt=''
        sx={sx.dragHandle}
      />
      <img
        src={image}
        alt={title}
        sx={sx.image}
      />
      <span sx={sx.text}>{title}</span>
    </div>
  )
}

SortableItem.propTypes = {
  dragging: PropTypes.bool,
  dragged: PropTypes.bool,
  children: PropTypes.object.isRequired,
}

export default SortableItem
