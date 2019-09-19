import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import queryString from 'query-string'
import CalloutBox from 'components/Internal/CalloutBox'
import Attribution from 'components/Internal/Attribution'
import Link from 'components/Internal/Link'
import UserCartouche from 'components/Internal/UserCartouche'
const UserAnnotation = ({ location }) => {
  const qs = queryString.parse(location.search)
  if (qs.a) {
    // fetch annotations
    const annotations = getAnnotationsFromIds(qs.a.split(','))
    return (
      <React.Fragment>
        {
          typy(annotations).safeArray.map((annotation, index) => {
            return (
              <CalloutBox key={index}>
                <Attribution>
                  <UserCartouche user={annotation.user} /> provided this annotation from <Link to={`/compilation/${annotation.compilation.id}`}>{annotation.compilation.label}</Link>.
                </Attribution>
                <p>{annotation.description}</p>
              </CalloutBox>
            )
          })
        }
      </React.Fragment>
    )
  }
  return null
}

UserAnnotation.propTypes = {
  location: PropTypes.object.isRequired,
}
export default UserAnnotation

export const getAnnotationsFromIds = (ids) => {
  const annotations = []
  ids.forEach(id => {
    annotations.push(
      {
        id: id,
        user: {
          email: 'rfox2@nd.edu',
          name: 'User Name',
          username: 'username',
        },
        compilation: {
          id: `thing-1`,
          label: 'My First Test',
        },
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      }
    )
  })
  return annotations
}
