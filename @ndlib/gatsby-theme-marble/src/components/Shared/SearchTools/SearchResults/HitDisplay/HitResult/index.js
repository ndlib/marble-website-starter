/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import ManifestCard from 'components/Shared/ManifestCard'
import typy from 'typy'

const HitResult = ({ hit, referal }) => {
  const {
    name,
    creator,
    date,
    url,
    thumbnail,
    type,
  } = typy(hit, '["_source"]').safeObject
  return (
    <ManifestCard
      key={hit}
      label={highlightTitle(name, hit.highlight)}
      target={url}
      image={thumbnail}
      referal={referal}
      creator={highlightCreator(creator, hit.highlight)}
      date={date}
      type={type}
    >
      {
        hit.highlight && hit.highlight['identifier.idMatch'] ? Object.values(hit.highlight['identifier.idMatch'])
          .map(
            (idMatch) => {
              return higlightDisplay(idMatch)
            }) : null
      }
      {
        hit.highlight && hit.highlight['allMetadata.folded'] ? Object.values(hit.highlight['allMetadata.folded'])
          .map(
            (blob) => {
              let row = ''
              const stringSplit = '::'
              blob.split(stringSplit).map(
                (meta) => {
                  row += meta.includes('<em>') ? meta : ''
                  return row
                },
              )
              return row !== '' ? (
                higlightDisplay(row)
              ) : null
            },
          ) : null
      }
    </ManifestCard>
  )
}

export const highlightTitle = (name, highlight) => {
  if (highlight && highlight['name.folded']) {
    return highlight['name.folded']
  }
  return name
}

export const highlightCreator = (creator, highlight) => {
  if (highlight && highlight['creator.folded']) {
    return highlight['creator.folded']
  }
  return creator
}

export const higlightDisplay = (row) => {
  return (
    <div
      key={row}
      dangerouslySetInnerHTML={{ __html: row }}
      sx={{
        '& > em': {
          backgroundColor: 'highlight',
        },
      }}
    />
  )
}

HitResult.propTypes = {
  hit: PropTypes.object,
  referal: PropTypes.object,
}
export default HitResult
