/** @jsx jsx */
import { jsx, BaseStyles } from 'theme-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import sx from './sx'
const DownloadCitation = ({ marbleItem }) => {
  const { t } = useTranslation()
  return marbleItem.citation ? (
    <div sx={sx.metadata}>
      <BaseStyles>
        <h2 sx={sx.header}>{t('text:actionGroup.citationHead')}</h2>
      </BaseStyles>
      {t('text:actionGroup.citationBody')}
      <div className='citation' sx={sx.citation}>{marbleItem.citation}</div>
    </div>
  ) : null
}
export default DownloadCitation

DownloadCitation.propTypes = {
  marbleItem: {
    citation: PropTypes.string,
  },
}
