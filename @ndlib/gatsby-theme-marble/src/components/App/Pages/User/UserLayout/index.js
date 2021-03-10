import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BaseStyles, Flex, Box } from 'theme-ui'
import Seo from 'components/Shared/Seo'
import Gravatar from 'components/Shared/Gravatar'
import PromptLogin from './PromptLogin'
import EditUserButton from './EditUserButton'
import { isLoggedIn, ownsPage } from 'utils/auth'
import style from './style.module.css'
export const UserLayout = ({ user, children, location, loginReducer }) => {
  const loggedIn = isLoggedIn(loginReducer)
  const isOwner = ownsPage(loginReducer, user.uuid)
  return (
    <>
      <Seo
        data={{}}
        location={location}
        title={user.userName}
        noIndex
      />
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: ['100%', '25%', '25%'] }}>
          <div className={style.identityGroup}>
            <Gravatar email={user.email} />
            <div className={style.identity}>
              <BaseStyles>
                <h1>{user.fullName}</h1>
                <h2>{user.userName}</h2>
              </BaseStyles>
            </div>
          </div>
          <div className={style.bio}>{user.bio}</div>
          <div>
            {
            /* Follow or Edit button */
              isOwner ? <EditUserButton userName={user.userName} /> : <PromptLogin showButton={!loggedIn} />
            }
          </div>

        </Box>
        <Box sx={{ width: ['100%', '75%', '75%'] }}>
          {children}
        </Box>
      </Flex>
    </>

  )
}

UserLayout.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(UserLayout)
