/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

const ManifestDescription = ({ marbleItem }) => {
  if (marbleItem && marbleItem.description) {
    marbleItem.description = marbleItem.description.replace(/\[/g, '&#91;').replace(/\]/g, '&#93;')
    return (
      <div
        className='descriptionBlock'
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 'fit-content',
          maxWidth: '45em',
        }}
        >
        <ReactMarkdown
          source={marbleItem.description}
          escapeHtml={false}
        />
      </div>
    )
  }
  return null
}

ManifestDescription.propTypes = {
  marbleItem: PropTypes.shape({
    description: PropTypes.string,
  }),
}

export default ManifestDescription
