/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import typy from 'typy'

export const ChildField = ({ field }) => {
  if (field) {
    return (
      <p
        sx={{
          '& em': {
            backgroundColor: 'highlight',
          },
          margin: '0',
          marginBottom: '.25rem',
        }}
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
