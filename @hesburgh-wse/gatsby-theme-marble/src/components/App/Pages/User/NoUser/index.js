import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'

const NoUser = (props) => {
  const { username, location } = props
  const title = `User Not Found`
  return (
    <Layout
      location={location}
      title={title}
    >
      <Seo
        data={{}}
        location={location}
        title={title}
        noIndex
      />
      <div>
        <p>This user <code>{username}</code> does not exist or you are not authorized to see this page.</p>
      </div>
    </Layout>
  )
}
NoUser.propTypes = {
  location: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
}
export default NoUser
