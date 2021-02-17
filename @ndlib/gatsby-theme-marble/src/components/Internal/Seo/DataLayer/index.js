import React from 'react'
import PropTypes from 'prop-types'

export default class DataLayer extends React.Component {
  render () {
    return <></>
  }
  componentDidMount () {
    const { title, author, description, pathname, data } = this.props
    {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        title: title,
        author: author,
        description: description,
        pathname: pathname,
        data: data,
      })
    }
  }
}

DataLayer.propTypes = {
  data: PropTypes.object.isRequired,
  pathname: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
}
