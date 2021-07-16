/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import { jsx } from 'theme-ui'
import { getData } from 'utils/api'
import sx from './sx'

export const BookmarkButton = ({ collection, marbleItem, loginReducer }) => {
  const [item, setItem] = useState(itemInCollection(collection, marbleItem))
  return (
    <button
      onClick={() => {
        item ? deleteItem(item, collection, setItem, loginReducer) : addItem(collection, marbleItem, setItem, loginReducer)
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
  const image = typy(marbleItem, 'childrenMarbleFile[0].iiif.thumbnail').safeString
  getData({
    loginReducer: loginReducer,
    // contentType: 'item',
    // id: collection.uuid,
    body: `mutation {
      savePortfolioItem(
        portfolioCollectionId: "${collection.portfolioCollectionId}",
        portfolioItemId: "${marbleItem.marbleId}"
        imageUri: "${image}",
        itemType: internal,
        sequence: ${typy(collection, 'portfolioItems.items').safeArray.length},
        title: "${marbleItem.title.replaceAll('"', '&quot;')}"
      ) {
        portfolioItemId
        portfolioCollectionId
      }
    }
    `,
    successFunc: (data) => {
      console.log('x', collection)
      func(data)
      // TODO if there is no collection image set it
      if (!collection.imageUri || collection.imageUri === 'null') {
        console.log('set image', image)
        const body = `mutation {
          savePortfolioCollection(
            description: "${collection.description}",
            portfolioCollectionId: "${collection.portfolioCollectionId}",
            title: "${collection.title}",
            privacy: ${collection.privacy},
            layout: "${collection.layout}",
            description: "${collection.description}",
            imageUri: "${image}",
            featuredCollection: ${collection.featuredCollection},
            highlightedCollection: ${collection.highlightedCollection}
          ) {
            portfolioCollectionId
            imageUri
          }
        }`
        getData({
          loginReducer: loginReducer,
          body: body,
          successFunc: (result) => {
            console.log('d', result)
            console.log('updated collection image')
          },
          errorFunc: (e) => {
            console.error(e)
          },
        })
      }
    },
    errorFunc: (e) => {
      console.error(e)
    },
  })
}
export const deleteItem = (item, collection, func, loginReducer) => {
  console.log('deleteItem', item, collection)
  getData({
    loginReducer: loginReducer,
    // contentType: 'item',
    // id: item.uuid,
    body: `mutation {
      removePortfolioItem(
        portfolioCollectionId: "${collection.portfolioCollectionId}",
        portfolioItemId: "${item.portfolioItemId}") {
        recordsDeleted
      }
    }`,
    successFunc: () => {
      func(null)
    },
    errorFunc: (e) => {
      console.error(e)
    },
  })
}

const itemInCollection = (collection, marbleItem) => {
  return typy(collection, 'portfolioItems.items').safeArray.find(item => {
    return item.portfolioItemId === marbleItem.marbleId
  })
}
