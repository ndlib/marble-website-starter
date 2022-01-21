/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const AdditionalDescription = ({ marbleItem }) => {
  if (marbleItem && marbleItem.additionalDescription) {
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
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {marbleItem.additionalDescription}
        </ReactMarkdown>
      </div>
    )
  }
  return null
}

AdditionalDescription.propTypes = {
  marbleItem: PropTypes.shape({
    description: PropTypes.string,
    additionalDescription: PropTypes.string,
  }),
}

export default AdditionalDescription
