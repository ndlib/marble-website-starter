/** @jsx jsx */
import PropTypes from 'prop-types'
import MetaDataLabel from './MetaDataLabel'
import MetaDataValue from './MetaDataValue'
import MetaDataSearchValue from './MetaDataSearchValue'
import MetaDataMarkdownValue from './MetaDataMarkdownValue'
import { useTranslation } from 'react-i18next'
import { jsx } from 'theme-ui'
import sx from './sx'

// eslint-disable-next-line complexity
const MetaDataField = ({ metadata, skipHtml }) => {
  const { label, urlField, type } = metadata
  const { t } = useTranslation()
  let { value } = metadata
  if (!Array.isArray(value) && value) {
    value = [value]
  }

  const MetadataValueComponent = getComponent(type)

  if (value && value.length !== 0) {
    return (
      <div>
        <MetaDataLabel
          labels={[label]}
        />
        <MetadataValueComponent
          values={value}
          urlField={urlField}
          skipHtml={skipHtml}
        />
        {
          label === 'Link to Finding Aid' ? (
            <div className='aidContext' sx={sx.aidContext}>
              {t('text:aidContext')}
            </div>
          ) : null
        }
      </div>
    )
  }
  return null
}

const getComponent = (type) => {
  if (type === 'searchList') {
    return MetaDataSearchValue
  } else if (type === 'markdown') {
    return MetaDataMarkdownValue
  }

  return MetaDataValue
}

MetaDataField.propTypes = {
  metadata: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
    type:  PropTypes.string.isRequired,
    urlField: PropTypes.string,
  }).isRequired,
  skipHtml: PropTypes.bool,
}

MetaDataField.defaultProps = {
  skipHtml: false,
}

export default MetaDataField
