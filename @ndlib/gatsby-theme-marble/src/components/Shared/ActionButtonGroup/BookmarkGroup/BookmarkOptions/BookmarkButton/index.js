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
  getData,
} from 'utils/api'
import sx from './sx'

export const BookmarkButton = ({ collection, iiifManifest, loginReducer }) => {
  const [item, setItem] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    getData({
      loginReducer: loginReducer,
      contentType: 'collection',
      id: collection.uuid,
      successFunc: (data) => {
        const i = data.items.find(item => {
          return item.manifest === iiifManifest.id
        })
        setItem(i || null)
      },
      errorFunc: (e) => {
        console.error(e)
      },
    })
    return () => {
      abortController.abort()
    }
  }, [collection.uuid, iiifManifest.id, loginReducer])

  return (
    <button
      onClick={() => {
        item ? deleteItem(item, setItem, loginReducer) : addItem(collection, iiifManifest, setItem, loginReducer)
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
  iiifManifest: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(BookmarkButton)

export const addItem = (collection, manifest, func, loginReducer) => {
  createData({
    loginReducer: loginReducer,
    contentType: 'item',
    id: collection.uuid,
    body: {
      title: typy(manifest, 'label[\'en\'][0]').safeString || null,
      image: typy(manifest, 'thumbnail[0].id').safeString.replace('/250,/', /500,/) || null,
      link: manifest.slug,
      manifest: manifest.id,
      annotation: null,
    },
    successFunc: (data) => {
      func(data)
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
