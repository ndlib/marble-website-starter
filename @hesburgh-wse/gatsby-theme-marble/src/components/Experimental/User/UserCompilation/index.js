import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'

const UserCompilation = ({ location, compilationId }) => {
  return (
    <Layout
      location={location}
    >
      <Seo
        title={'username'}
        location={location}
        noIndex
      />
      <div>User Collection</div>
      <div>{compilationId}</div>
    </Layout>
  )
}

UserCompilation.propTypes = {
  compilationId: PropTypes.string,
  location: PropTypes.object.isRequired,
}
export default UserCompilation
