/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import typy from 'typy'
import sx from '../../sx'

export const ChildField = ({ field }) => {
  if (field) {
    return (
      <p
        sx={sx.lineStyle}
        dangerouslySetInnerHTML={{ __html: typy(field).isArray ? field.join('<br/>') : field }}
      />
    )
  }
  return null
}

ChildField.propTypes = {
  field: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
}

export default ChildField
