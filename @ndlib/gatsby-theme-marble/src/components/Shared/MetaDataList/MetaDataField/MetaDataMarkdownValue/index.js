/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { jsx, useThemeUI } from 'theme-ui'

const MetaDataMarkdownValue = ({ values, skipHtml, styles }) => {
  const themeUi = useThemeUI()
  const htmlSx = {
    '& a': themeUi.theme.links.default,
    '& h2': themeUi.theme.text.heading,
    '& h3': themeUi.theme.text.heading,
    '& > dl > div': {
      p: 0,
    },
  }
  return (
    <>
      {
        values.map(val => {
          return (
            <dd sx={styles} key={val}>
              <ReactMarkdown
                sx={htmlSx}
                rehypePlugins={[rehypeRaw]}
                skipHtml={skipHtml}
              >{val}</ReactMarkdown>
            </dd>
          )
        })
      }
    </>
  )
}

MetaDataMarkdownValue.propTypes = {
  values: PropTypes.array,
  skipHtml: PropTypes.bool,
}

MetaDataMarkdownValue.defaultProps = {
  skipHtml: false,
}
export default MetaDataMarkdownValue
