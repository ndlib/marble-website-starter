import React from 'react'
import PropTypes from 'prop-types'
let mirador = {}
try {
  mirador = require('mirador/dist/mirador.min')
} catch (e) {
  console.warn('mirador unavailable at build time.')
}

class MiradorWrapper extends React.Component {
  componentDidMount () {
    const { config, plugins } = this.props
    mirador.viewer(config, plugins)
  }

  render () {
    const { config } = this.props
    return <div id={config.id} />
  }
}

MiradorWrapper.propTypes = {
  config: PropTypes.object.isRequired,
  plugins: PropTypes.array.isRequired,
}

export default MiradorWrapper
