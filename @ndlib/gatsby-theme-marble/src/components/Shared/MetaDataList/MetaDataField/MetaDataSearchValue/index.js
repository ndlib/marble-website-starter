/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

import Link from 'components/Shared/Link'

const MetaDataSearchValue = ({ values, urlField, styles }) => {
  if (!values) {
    return null
  }
  return (
    <>
      {
        values.filter(v => v !== null).map(val => {
          let links = splitTermsForSearch(val)
          links = links.map((t, index) => {
            const search = '/search?' + urlField + '[0]=' + t
            return <span key={index}><Link to={search}>{t}</Link>{index + 1 !== links.length ? ' -- ' : ''}</span>
          })

          return (
            <dd sx={styles} key={val}>
              {links}
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
