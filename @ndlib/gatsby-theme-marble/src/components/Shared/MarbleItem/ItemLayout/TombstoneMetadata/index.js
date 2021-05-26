/** @jsx jsx */
import { jsx, BaseStyles } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import TombstoneField from './TombstoneField'
import ManifestDescription from '@ndlib/gatsby-theme-marble/src/components/Shared/ManifestDescription'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'

import sx from './sx'

const TombstoneMetadata = ({ marbleItem }) => {
  const creators = filterForLabledField(marbleItem, 'Creator')
  const dates = filterForLabledField(marbleItem, 'Date')
  const campusLocations = filterForLabledField(marbleItem, 'Campus Location')
  const uriValue = filterForLabledField(marbleItem, 'URI Value')

  const hasUri = typy(uriValue, '[0].value').safeArray.length > 0
  const hasCreator = typy(creators, '[0].value').safeArray.length > 0
  const isUnknown = typy(creators, '[0].value').safeArray.length > 0 && typy(creators, '[0].value').safeArray[0].toLowerCase() === 'unknown'
  return (
    <div sx={sx.wrapper}>
      {hasCreator ? (
        <TombstoneField
          field={hasCreator ? (isUnknown ? [{ value: ['Unknown creator'] }] : creators) : ''}
          searchField={hasCreator ? (isUnknown ? null : 'creator[0]') : null}
          sxStyle={sx.creators}
        />
      ) : null}
      <TombstoneField
        field={dates}
        sxStyle={sx.dates}
      />
      {marbleItem.marbleParent ? (
        <div sx={sx.campusLocations}>
          Part of: <Link to={marbleItem.marbleParent.slug}>{marbleItem.marbleParent.title}</Link>
        </div>
      ) : null }

      <TombstoneField
        field={campusLocations}
        searchField='campuslocation[0]'
        sxStyle={sx.campusLocations}
        uriValue={hasUri ? typy(uriValue, '[0].value').safeArray : null}
      />
      <ManifestDescription marbleItem={marbleItem} />
    </div>
  )
}

TombstoneMetadata.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}

const filterForLabledField = (marbleItem, label) => {
  return marbleItem.metadata.filter(m => {
    return m.label === label
  })
}

export default TombstoneMetadata
