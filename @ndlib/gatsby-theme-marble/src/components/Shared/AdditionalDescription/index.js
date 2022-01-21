/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const AdditionalDescription = ({ marbleItem, alignLeft = false }) => {
  const themeUi = useThemeUI()

  if (marbleItem && marbleItem.additionalDescription) {
    return (
      <div
        className='descriptionBlock'
        sx={{
          marginLeft: alignLeft ? '0' : 'auto',
          marginRight: 'auto',
          width: 'fit-content',
          maxWidth: '45em',
          '& a': themeUi.theme.links ? themeUi.theme.links.default : {},
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
  alignLeft: PropTypes.bool,
}

export default AdditionalDescription
