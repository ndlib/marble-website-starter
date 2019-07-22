import getComponents from '../getComponents'

describe('getComponents', () => {
  test('default', () => {
    const node = {}
    const actual = getComponents(node)
    const expected = [{ component: 'MarkdownHtmlContent' }]
    expect(actual).toEqual(expected)
  })

  test('from layout', () => {
    const node = {
      frontmatter: {
        layout: 'test',
      },
    }
    const actual = getComponents(node)
    const expected = [{ component: 'TestComponent' }]
    expect(actual).toEqual(expected)
  })

  test('invalid layout', () => {
    const node = {
      frontmatter: {
        layout: 'noSuchLayout',
      },
    }
    const actual = getComponents(node)
    const expected = [{ component: 'MarkdownHtmlContent' }]
    expect(actual).toEqual(expected)
  })

  test('from components', () => {
    const node = {
      frontmatter: {
        components: [
          { component: 'TestComponent' },
          { component: 'MarkdownHtmlContent' },
        ],
      },
    }
    const actual = getComponents(node)
    const expected = node.frontmatter.components
    expect(actual).toEqual(expected)
  })
})
