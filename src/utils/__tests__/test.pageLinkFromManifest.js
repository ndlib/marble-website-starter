import React from 'react'
import md5 from 'md5'
import pageLinkFromManifest from '../pageLinkFromManifest'

describe('pageLinkFromManifest', () => {
  const md5Id = md5('fakeID')
  test('collection link', () => {
    const iiifManifest = {
      _id: 'fakeID',
      _type: 'sc:Collection',
    }
    const expected = `/collection/${md5Id}`
    const actual = pageLinkFromManifest(iiifManifest)
    expect(actual).toEqual(expected)
  })
  test('item link', () => {
    const iiifManifest = {
      _id: 'fakeID',
      _type: 'sc:Manifest',
    }
    const expected = `/item/${md5Id}`
    const actual = pageLinkFromManifest(iiifManifest)
    expect(actual).toEqual(expected)
  })
  test('bad link', () => {
    const iiifManifest = {
      _id: 'fakeID',
    }
    const expected = `/`
    const actual = pageLinkFromManifest(iiifManifest)
    expect(actual).toEqual(expected)
  })
})
