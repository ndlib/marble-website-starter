import { useStaticQuery } from 'gatsby'
import getLanguage from '../getLanguage'

describe('getLanguage', () => {
  console.error = jest.fn()
  test('return default', () => {
    const actual = getLanguage()
    expect(actual).toEqual('none')
  })

  test('mocked useStaticQuery', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return {
        site: {
          siteMetadata: {
            languages: {
              default: 'tlh',
            },
          },
        },
      }
    })

    const actual = getLanguage()
    expect(actual).toEqual('tlh')
  })
})
