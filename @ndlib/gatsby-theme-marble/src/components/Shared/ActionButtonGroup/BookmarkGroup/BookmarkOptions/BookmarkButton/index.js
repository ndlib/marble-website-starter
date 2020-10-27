/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import { jsx } from 'theme-ui'
import {
  createData,
  deleteData,
  patchData,
  getData,
} from 'utils/api'
import sx from './sx'

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
  const image = typy(marbleItem, 'childrenMarbleFile[0].iiif.thumbnail').safeString
  createData({
    loginReducer: loginReducer,
    contentType: 'item',
    id: collection.uuid,
    body: {
      title: typy(marbleItem, 'title').safeString || '',
      image: image,
      link: marbleItem.slug,
      manifest: marbleItem.iiifUri,
      annotation: null,
    },
    successFunc: (data) => {
      func(data)
      if (!collection.image) {
        const body = { image: image }
        patchData({
          loginReducer: loginReducer,
          contentType: 'collection',
          id: collection.uuid,
          body: body,
          successFunc: () => {
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
export const deleteItem = (item, func, loginReducer) => {
  deleteData({
    loginReducer: loginReducer,
    contentType: 'item',
    id: item.uuid,
    successFunc: () => {
      func(null)
    },
    errorFunc: (e) => {
      console.error(e)
    },
  })
}
