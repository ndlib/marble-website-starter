import React from 'react'
import PropTypes from 'prop-types'
import { Styled } from 'theme-ui'
import { useTranslation } from 'react-i18next'
import sx from './sx'
const DownloadCitation = ({ marbleItem }) => {
  const { t } = useTranslation()
  return marbleItem.citation ? (
    <div sx={sx.metadata}>
      <Styled.h2 sx={sx.header}>{t('text:actionGroup.citationHead')}</Styled.h2>
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
