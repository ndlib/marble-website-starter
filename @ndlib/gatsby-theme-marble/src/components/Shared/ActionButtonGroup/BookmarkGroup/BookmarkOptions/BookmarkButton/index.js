/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { jsx } from 'theme-ui'
import sx from './sx'
import { savePortfolioItemQuery, savePortfolioCollectionQuery, removeCollectionItem } from 'utils/api'
import { useAlertContext } from '@ndlib/gatsby-theme-marble/src/context/AlertContext'

export const BookmarkButton = ({ collection, marbleItem, loginReducer }) => {
  const [item, setItem] = useState(itemInCollection(collection, marbleItem))
  const { addAlert } = useAlertContext()
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        item ? deleteItem(item, collection, setItem, loginReducer, addAlert) : addItem(collection, marbleItem, setItem, loginReducer, addAlert)
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

export const addItem = (collection, marbleItem, func, loginReducer, addAlert) => {
  const image = safeImage(marbleItem)
  const item = {
    portfolioCollectionId: collection.portfolioCollectionId,
    portfolioItemId: safeId(marbleItem),
    imageUri: image,
    itemType: 'internal',
    sequence: typy(collection, 'portfolioItems.items').safeArray.length,
    title: marbleItem.title ? marbleItem.title.replaceAll('"', '&quot;') : marbleItem._source.name.replaceAll('"', '&quot;'),
  }
  savePortfolioItemQuery({ loginReducer: loginReducer, item: item })
    .then((data) => {
      addAlert((<div>{marbleItem.title} has been added to <Link to={`/user/${collection.portfolioUserId}`}>{collection.title}</Link></div>), 'secondary')
      func(data)
      if (!collection.imageUri || collection.imageUri === 'null') {
        collection.imageUri = image
        savePortfolioCollectionQuery({ loginReducer: loginReducer, portfolio: collection })
          .catch((e) => {
            console.error(e)
          })
      }
    })
    .catch((e) => {
      console.error(e)
    })
}
export const deleteItem = (item, collection, func, loginReducer, addAlert) => {
  removeCollectionItem({ loginReducer: loginReducer, item: item })
    .then(() => {
      func(null)
      addAlert((<div>{item.title} has been removed from <Link to={`/user/${collection.portfolioUserId}`}>{collection.title}</Link></div>), 'secondary')
    })
    .catch((e) => {
      console.error(e)
    })
}

export const itemInCollection = (collection, marbleItem) => {
  return typy(collection, 'portfolioItems.items').safeArray.find(item => {
    return item.portfolioItemId === safeId(marbleItem)
  })
}

export const safeId = (marbleItem) => {
  return typy(marbleItem, 'marbleId').safeString || typy(marbleItem, '_source.identifier[0]').safeString || typy(marbleItem, 'target').safeString.replace('item/', '')
}

export const safeImage = (marbleItem) => {
  return typy(marbleItem, 'childrenMarbleFile[0].iiif.thumbnail').safeString || typy(marbleItem, 'image').safeString || typy(marbleItem, '_source.thumbnail').safeString || null
}
