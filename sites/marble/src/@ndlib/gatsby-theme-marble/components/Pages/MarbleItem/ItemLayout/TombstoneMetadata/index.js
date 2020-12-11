/** @jsx jsx */
import { jsx, BaseStyles } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import TombstoneField from './TombstoneField'
import ManifestDescription from 'components/Shared/ManifestDescription'

const TombstoneMetadata = ({ marbleItem }) => {
  const creators = marbleItem.metadata.filter(m => {
    return m.label === 'Creator'
  })
  const dates = marbleItem.metadata.filter(m => {
    return m.label === 'Date'
  })
  const campusLocations = marbleItem.metadata.filter(m => {
    return m.label === 'Campus Location'
  })
  const uriValue = marbleItem.metadata.filter(m => {
    return m.label === 'URI Value'
  })
  const sx = {
    wrapper: {
      '& > div': {
        margin: '0 0 1rem',
      },
    },
    creators: {
      fontSize: '1.5rem',
      fontStyle: 'italic',
      marginBottom: '1rem',
      '& a': {
        display: 'block',
        textDecoration: 'none',
      },
    },
    dates: {
      fontSize: '1.25rem',
      marginBottom: '1rem',
    },
    campusLocations: {
      marginBottom: '1rem',
      '& a': {
        display: 'block',
        textDecoration: 'none',
      },
    },
  }
  const hasUri = typy(uriValue, '[0].value').safeArray.length > 0
  const hasCreator = typy(creators, '[0].value').safeArray.length > 0
  return (
    <BaseStyles>
      <div sx={sx.wrapper}>
        <TombstoneField
          field={hasCreator ? creators : [{ value: ['Unknown creator'] }]}
          searchField={hasCreator ? 'creator[0]' : null}
          sxStyle={sx.creators}
        />
        <TombstoneField
          field={dates}
          sxStyle={sx.dates}
        />
        <TombstoneField
          field={campusLocations}
          searchField='campuslocation[0]'
          sxStyle={sx.campusLocations}
          uriValue={hasUri ? typy(uriValue, '[0].value').safeArray : null}
        />
        <ManifestDescription marbleItem={marbleItem} />
      </div>
    </BaseStyles>
  )
}

TombstoneMetadata.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}

export default TombstoneMetadata
