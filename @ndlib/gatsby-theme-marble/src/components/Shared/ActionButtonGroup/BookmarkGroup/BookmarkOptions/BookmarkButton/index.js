/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import { jsx } from 'theme-ui'
import { getData, savePortfolioItemQuery, savePortfolioCollectionQuery, removeCollectionItem } from 'utils/api'
import sx from './sx'
import { savePortfolioItemQuery, savePortfolioCollectionQuery, removeCollectionItem } from 'utils/api'

export const BookmarkButton = ({ collection, marbleItem, loginReducer }) => {
  const [item, setItem] = useState(null)
  useEffect(() => {
    const abortController = new AbortController()
    getData({
      loginReducer: loginReducer,
      contentType: 'collection',
      id: collection.uuid,
      successFunc: (data) => {
        const i = data.items.find(item => {
          return item.manifest === marbleItem.iiifUri
        })
        setItem(i || '')
      },
      errorFunc: (e) => {
        console.error(e)
      },
    })
    return () => {
      abortController.abort()
    }
  }, [collection.uuid, marbleItem.iiifUri, loginReducer])

  return (
    <button
      onClick={() => {
        item ? deleteItem(item, setItem, loginReducer) : addItem(collection, marbleItem, setItem, loginReducer)
      }}
      sx={sx.button}
    >
      <span sx={sx.text}>
        {item ? 'remove' : 'add'}
      </span>
      {collection.title}
    </button>
  )
}

BookmarkButton.propTypes = {
  marbleItem: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(BookmarkButton)

export const addItem = (collection, marbleItem, func, loginReducer) => {
  console.log('addItem', collection, marbleItem)
  const image = typy(marbleItem, 'childrenMarbleFile[0].iiif.thumbnail').safeString || marbleItem._source.thumbnail
  const item = {
    portfolioCollectionId: collection.portfolioCollectionId,
    portfolioItemId: marbleItem.marbleId || marbleItem._source.identifier[0],
    imageUri: image,
    itemType: 'internal',
    sequence: typy(collection, 'portfolioItems.items').safeArray.length,
    title: marbleItem.title ? marbleItem.title.replaceAll('"', '&quot;') : marbleItem._source.name.replaceAll('"', '&quot;'),
  }
  savePortfolioItemQuery({ loginReducer: loginReducer, item: item })
    .then((data) => {
      console.log('xcollection', collection)
      func(data)
      // TODO if there is no collection image set it
      if (!collection.imageUri || collection.imageUri === 'null') {
        console.log('set image', image)
        collection.imageUri = image
        savePortfolioCollectionQuery({ loginReducer: loginReducer, portfolio: collection })

          .then((result) => {
            console.log('d', result)
            console.log('updated collection image')
          })
          .catch((e) => {
            console.error(e)
          })
      }
    })
    .catch((e) => {
      console.error(e)
    })
}
export const deleteItem = (item, collection, func, loginReducer) => {
  console.log('deleteItem', item, collection)
  removeCollectionItem({ loginReducer: loginReducer, item: item })
    .then(() => {
      func(null)
    })
    .catch((e) => {
      console.error(e)
    })
}
