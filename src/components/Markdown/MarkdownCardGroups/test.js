import React from 'react'
import { shallow } from 'enzyme'
import MarkdownCardGroups from './'
import MarkdownCardGroup from './MarkdownCardGroup'
describe('MarkdownCardGroups', () => {
  test('no cards', () => {
    const frontmatter = {}
    const wrapper = shallow(<MarkdownCardGroups frontmatter={frontmatter} />)
    expect(wrapper.find(MarkdownCardGroup).exists()).toBeFalsy()
  })
  test('cards', () => {
    const frontmatter = {
      cards: {
        groups: [
          { label: 'Group 1', items: [] },
          { label: 'Group 2', items: [] },
          { label: 'Group 3', items: ['a', 'b', 'c'] },
        ],
      },
    }

    const wrapper = shallow(<MarkdownCardGroups frontmatter={frontmatter} />)
    expect(wrapper.find(MarkdownCardGroup).length).toEqual(3)
    expect(wrapper.find(MarkdownCardGroup).at(2).props().label).toEqual('Group 3')
    expect(wrapper.find(MarkdownCardGroup).at(2).props().items).toEqual(['a', 'b', 'c'])
  })
})
