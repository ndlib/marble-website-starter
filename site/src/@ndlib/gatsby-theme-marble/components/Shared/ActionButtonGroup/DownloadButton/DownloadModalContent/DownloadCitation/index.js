/** @jsx jsx */
import PropTypes from 'prop-types'
import { Styled, jsx } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'
import typy from 'typy'
import sx from './sx'

const DownloadCitation = ({ marbleItem }) => {
  const { t } = useTranslation()
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `,
  )
  let biblio = ''
  const metadata = {}
  if (marbleItem.type === 'Collection') {
    biblio = `${typy(marbleItem, 'label.en[0]').safeString}, ${typy(marbleItem, 'slug').safeString.replace('item/', '')}. ${typy(marbleItem, 'provider[0].homepage[0].label.en[0]').safeString}, Hesburgh Libraries, University of Notre Dame, South Bend, IN. ${typy(site, 'siteMetadata.siteUrl').safeString}/${typy(marbleItem, 'slug').safeString}`
  } else if (typy(marbleItem, 'provider[0].homepage[0]label.en[0]').isString) {
    marbleItem.metadata.map((md) => {
      metadata[(md.label.en[0].trim())] = md.value.en[0]
      return metadata
    })
    if (typy(marbleItem, 'provider[0].homepage[0].label.en[0]').safeString === 'Snite Museum of Art') {
      biblio = `${typy(metadata, 'Creator').safeString}, ${typy(marbleItem, 'label.en[0]').safeString}, ${typy(metadata, 'Date').safeString}, ${typy(metadata, 'Medium').safeString}. Snite Museum of Art, University of Notre Dame. ${typy(metadata, 'Credit Line').safeString}, ${typy(metadata, 'Accession number').safeString}.`
    }
    if (typy(marbleItem, 'provider[0].homepage[0].label.en[0]').safeString === 'Rare Books and Special Collections' | 'University of Notre Dame Archives') {
      biblio = `${typy(metadata, 'Creator').safeString}. ${typy(marbleItem, 'label.en[0]').safeString}, ${typy(metadata, 'Date').safeString}. ${typy(metadata, 'Collection').safeString}. ${typy(marbleItem, 'provider[0].homepage[0].label.en[0]').safeString}, Hesburgh Libraries, University of Notre Dame, South Bend, IN. ${typy(site, 'siteMetadata.siteUrl').safeString}/${typy(marbleItem, 'slug').safeString}`
    }
  }
  if (biblio === '') {
    return null
  } else {
    return (
      <div sx={sx.metadata}>
        <Styled.h2 sx={sx.header}>{t('text:actionGroup.citationHead')}</Styled.h2>
        {t('text:actionGroup.citationBody')}
        <div className='citation' sx={sx.citation}>{biblio}</div>
      </div>
    )
  }
}

DownloadCitation.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}

export default DownloadCitation
