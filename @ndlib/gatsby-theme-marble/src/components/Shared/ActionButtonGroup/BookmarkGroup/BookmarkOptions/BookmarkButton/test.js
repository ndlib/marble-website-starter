import React from 'react'
import { safeId, safeImage, itemInCollection } from './'

describe('BookmarkButton functions', () => {
  describe('itemInCollection', () => {
    const c = {
      portfolioItems: {
        items: [
          { portfolioItemId: '1' },
          { portfolioItemId: '2' },
        ],
      },
    }
    test('found', () => {
      const m = { marbleId: '1' }
      const result = itemInCollection(c, m)
      expect(result).toEqual({ portfolioItemId: '1' })
    })
    test('not found', () => {
      const m = { marbleId: 'a' }
      const result = itemInCollection(c, m)
      expect(result).toBeFalsy()
    })
  })
  describe('safeId', () => {
    test('marbleId', () => {
      const m = {
        marbleId: '1',
      }
      expect(safeId(m)).toEqual('1')
    })
    test('_source.identifier[0]', () => {
      const m = {
        _source: {
          identifier: ['a'],
        },
      }
      expect(safeId(m)).toEqual('a')
    })
    test('target', () => {
      const m = {
        target: 'item/2',
      }
      expect(safeId(m)).toEqual('2')
    })
    test('not found', () => {
      const m = {}
      expect(safeId(m)).toBeFalsy()
    })
  })
  describe('safeImage', () => {
    test('childrenMarbleFile[0].iiif.thumbnail', () => {
      const m = {
        childrenMarbleFile: [
          { iiif: { thumbnail: '1' } },
        ],
      }
      expect(safeImage(m)).toEqual('1')
    })
    test('_source.thumbnail', () => {
      const m = {
        _source: {
          thumbnail: 'a',
        },
      }
      expect(safeImage(m)).toEqual('a')
    })
    test('image', () => {
      const m = {
        image: '2',
      }
      expect(safeImage(m)).toEqual('2')
    })
    test('not found', () => {
      const m = {}
      expect(safeImage(m)).toBeFalsy()
    })
  })
})
