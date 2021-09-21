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
      onClick={() => {
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
  const image = typy(marbleItem, 'childrenMarbleFile[0].iiif.thumbnail').safeString || marbleItem['_source'].thumbnail
  const item = {
    portfolioCollectionId: collection.portfolioCollectionId,
    portfolioItemId: marbleItem.marbleId || marbleItem['_source'].identifier[0],
    imageUri: image,
    itemType: 'internal',
    sequence: typy(collection, 'portfolioItems.items').safeArray.length,
    title: marbleItem.title ? marbleItem.title.replaceAll('"', '&quot;') : marbleItem['_source'].name.replaceAll('"', '&quot;'),
  }
  savePortfolioItemQuery({ loginReducer: loginReducer, item: item })
    .then((data) => {
      addAlert((<div>{marbleItem.title} added to <Link to={`/user/${collection.portfolioUserId}`}>{collection.title}</Link></div>), 'secondary')
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
      addAlert((<div>{item.title} removed to <Link to={`/user/${collection.portfolioUserId}`}>{collection.title}</Link></div>), 'secondary')
    })
    .catch((e) => {
      console.error(e)
    })
}

const itemInCollection = (collection, marbleItem) => {
  return typy(collection, 'portfolioItems.items').safeArray.find(item => {
    return item.portfolioItemId === marbleItem.marbleId
  })
}
