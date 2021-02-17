import React from 'react'
import PropTypes from 'prop-types'

export default class DataLayer extends React.Component {
  render () {
    return
  }
  componentDidMount () {
    const { title, author, description, location, data } = this.props
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'pageView',
        category: 'Page View',
        action: 'Page Refresh',
        label: 'PageView',
        title: title,
        author: author,
        description: description,
        pathname: location.pathname,
        data: data,
    })
  }
}

DataLayer.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
}
