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

export const BookmarkButton = ({ collection, ndJson, loginReducer }) => {
  const [item, setItem] = useState(null)
  useEffect(() => {
    const abortController = new AbortController()
    getData({
      loginReducer: loginReducer,
      contentType: 'collection',
      id: collection.uuid,
      successFunc: (data) => {
        const i = data.items.find(item => {
          return item.manifest === ndJson.iiifUri
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
  }, [collection.uuid, ndJson.iiifUri, loginReducer])

  return (
    <button
      onClick={() => {
        item ? deleteItem(item, setItem, loginReducer) : addItem(collection, ndJson, setItem, loginReducer)
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
  ndJson: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(BookmarkButton)

export const addItem = (collection, ndJson, func, loginReducer) => {
  const image = typy(ndJson, 'items[0].iiifImageUri').isString ? `${ndJson.items[0].iiifImageUri}/full/500,/0/default.jpg` : ''
  createData({
    loginReducer: loginReducer,
    contentType: 'item',
    id: collection.uuid,
    body: {
      title: typy(ndJson, 'title').safeString || '',
      image: image,
      link: `item/${ndJson.id}`,
      manifest: ndJson.iiifUri,
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
