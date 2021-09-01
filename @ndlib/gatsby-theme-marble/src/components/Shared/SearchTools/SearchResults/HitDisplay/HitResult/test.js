import React from 'react'
import { shallow } from 'enzyme'
import HitResult, {
  highlightTitle,
  highlightCreator,
} from './'
import MarbleItemCard from 'components/Shared/DisplayCard/MarbleItemCard'

describe('HitResult', () => {
  describe('highlightTitle', () => {
    test('title has highlight', () => {
      const name = ['title 1', 'title 2']
      const highlight = {
        'name.folded': ['title 2'],
      }
      const actual = highlightTitle(name, highlight)
      expect(actual).toEqual('title 1,title 2')
    })
    test('title does not have highlight', () => {
      const name = ['title 1', 'title 2']
      const highlight = {}
      const actual = highlightTitle(name, highlight)
      expect(actual).toEqual(name)
    })
  })
  describe('highlightCreator', () => {
    test('creator has highlight', () => {
      const creator = ['creator 1', 'creator 2']
      const highlight = {
        'creator.folded': ['creator 2'],
      }
      const actual = highlightCreator(creator, highlight)
      expect(actual).toEqual(['creator 1', highlight['creator.folded'][0]])
    })
    test('creator does not have highlight', () => {
      const creator = ['creator 1', 'creator 2']
      const highlight = {}
      const actual = highlightTitle(creator, highlight)
      expect(actual).toEqual(creator)
    })
  })
  // test('render', () => {
  //   const hit = {
  //     _source: {
  //       name: 'name',
  //       creator: 'creator',
  //       date: 'date',
  //       url: 'url',
  //       thumbnail: 'thumbnail',
  //       type: 'type',
  //     },
  //   }
  //   const wrapper = shallow(<HitResult hit={hit} />)
  //   expect(wrapper.find(MarbleItemCard).props().label).toEqual('name')
  //   expect(wrapper.find(MarbleItemCard).props().target).toEqual('url')
  //   expect(wrapper.find(MarbleItemCard).props().image).toEqual('thumbnail')
  //   expect(wrapper.find(MarbleItemCard).props().creator).toEqual('creator')
  //   expect(wrapper.find(MarbleItemCard).props().date).toEqual('date')
  //   expect(wrapper.find(MarbleItemCard).props().type).toEqual('type')
  // })
  // test('all metadata hightlights', () => {
  //   const hit = {}
  //   const wrapper = shallow(<HitResult hit={hit} />)

  // expect(wrapper.find(HitResult).at(0).children().html()).toEqual('<div class="css-1itje8o"><em>data</em></div>')
  // expect(wrapper.find(MarbleItemCard).at(2).children().html()).toEqual('<div class="css-1itje8o"><em>line2data</em></div>')
  // })
})
