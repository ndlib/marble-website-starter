/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import MarbleItemCard from 'components/Shared/DisplayCard/MarbleItemCard'
import typy from 'typy'
import { connect } from 'react-redux'
import BookmarkGroup from 'components/Shared/ActionButtonGroup/BookmarkGroup'
import { isLoggedIn } from 'utils/auth'

// eslint-disable-next-line complexity
const HitResult = ({ hit, referal, loginReducer }) => {
  const {
    name,
    creator,
    date,
    collection,
    url,
    thumbnail,
    type,
  } = typy(hit, '["_source"]').safeObject
  let bookmark
  if (loginReducer) {
    bookmark = isLoggedIn(loginReducer)
      ? (
        <BookmarkGroup marbleItem={hit} size='tiny' />
      )
      : null
  } else {
    bookmark = null
  }

  return (
    <div sx={{ '& em': { backgroundColor: 'highlight' } }}>
      <MarbleItemCard
        key={hit}
        title={highlightTitle(name, hit.highlight)}
        target={url}
        image={thumbnail}
        referal={referal}
        creator={highlightCreator(creator, hit.highlight)}
        collectionName={highlightCollection(collection, hit.highlight)}
        date={date}
        type={type}
        referalState={{
          referal: referal,
        }}
      >
        {
          hit.highlight && hit.highlight['identifier.idMatch']
            ? Object.values(hit.highlight['identifier.idMatch'])
              .map(
                (idMatch) => {
                  return higlightDisplay(idMatch)
                })
            : null
        }
        {
          hit.highlight && hit.highlight['uniqueIdentifier.idMatch']
            ? Object.values(hit.highlight['uniqueIdentifier.idMatch'])
              .map(
                (idMatch) => {
                  return higlightDisplay(idMatch)
                })
            : null
        }
        {
          hit.highlight && hit.highlight['uniqueIdentifier.folded']
            ? Object.values(hit.highlight['uniqueIdentifier.folded'])
              .map(
                (folded) => {
                  return higlightDisplay(folded)
                })
            : null
        }
        <div className='metaResults'>
          {
            hit.highlight && hit.highlight['allMetadata.folded']
              ? Object.values(hit.highlight['allMetadata.folded'])
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
                    return row !== ''
                      ? (
                        higlightDisplay(row)
                      )
                      : null
                  },
                )
              : null
          }
        </div>
      </MarbleItemCard>
    </div>
  )
}

export const highlightTitle = (name, highlight) => {
  if (highlight && highlight['name.folded']) {
    const nameHighlight = highlight['name.folded'].toString()
    const nameVanilla = nameHighlight.replace(/(<([^>]+)>)/ig, '')
    name = name.includes(nameVanilla) ? name.toString().replace(nameVanilla, nameHighlight) : name
  }
  return name
}

export const highlightCreator = (creator, highlight) => {
  if (highlight && highlight['creator.folded']) {
    highlight['creator.folded'].forEach((creatorHighlight) => {
      const creatorVanilla = creatorHighlight.replace(/(<([^>]+)>)/ig, '')
      creator.forEach((sub, index) => {
        creator[index] = sub.includes(creatorVanilla) ? creator[index].toString().replace(creatorVanilla, creatorHighlight) : creator[index]
        return creator[index]
      })
      return creator
    })
  }
  return creator
}

export const highlightCollection = (collection, highlight) => {
  if (highlight && highlight['collection.folded']) {
    const collectionHighlight = highlight['collection.folded'].toString()
    const collectionVanilla = collectionHighlight.replace(/(<([^>]+)>)/ig, '')
    collection = collection.toString().replace(collectionVanilla, highlight['collection.folded'])
    return highlight['collection.folded']
  }
  return collection
}

export const higlightDisplay = (row) => {
  return (
    <div
      key={row}
      dangerouslySetInnerHTML={{ __html: row }}
    />
  )
}

HitResult.propTypes = {
  hit: PropTypes.object,
  referal: PropTypes.object,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(HitResult)
