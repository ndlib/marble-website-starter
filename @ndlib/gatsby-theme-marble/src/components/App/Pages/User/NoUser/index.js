import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'

export const defaultTitle = `User Not Found`
const NoUser = ({ username, location }) => {
  return (
    <Layout
      location={location}
      title={defaultTitle}
    >
      <Seo
        data={{}}
        location={location}
        title={defaultTitle}
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
