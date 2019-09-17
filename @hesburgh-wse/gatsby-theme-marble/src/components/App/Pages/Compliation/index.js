import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'

const Compilation = ({ location, compilationId }) => {
  return (
    <Layout
      location={location}
    >
      <Seo
        title={'username'}
        location={location}
        data={{}}
        noIndex
      />
      <div>User Collection</div>
      <div>{compilationId}</div>
    </Layout>
  )
}

Compilation.propTypes = {
  compilationId: PropTypes.string,
  location: PropTypes.object.isRequired,
}
export default Compilation
