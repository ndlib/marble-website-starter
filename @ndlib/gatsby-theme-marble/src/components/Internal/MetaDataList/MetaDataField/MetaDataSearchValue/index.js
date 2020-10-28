import React from 'react'
import PropTypes from 'prop-types'
import { BaseStyles } from 'theme-ui'
import Link from 'components/Internal/Link'

const MetaDataSearchValue = ({ values, urlField }) => {
  return (
    <>
      {
        values.map(val => {
          let links = splitTermsForSearch(val)
          links = links.map((t, index) => {
            const search = '/search?' + urlField + '[0]=' + t
            return <span key={index}><Link to={search}>{t}</Link>{ index + 1 !== links.length ? ' -- ' : '' }</span>
          })

          return (
            <dd key={val}>
              <BaseStyles>
                {links}
              </BaseStyles>
            </dd>
          )
        })
      }
    </>
  )
}

const splitTermsForSearch = (term) => {
  return term.split('--').map(t => t.trim())
}

MetaDataSearchValue.propTypes = {
  values: PropTypes.array,
  urlField: PropTypes.string,
}

MetaDataSearchValue.defaultProps = {
  skipHtml: false,
}
export default MetaDataSearchValue
