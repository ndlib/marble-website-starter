import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Styled } from 'theme-ui'
import Seo from 'components/Internal/Seo'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import Gravatar from 'components/Internal/Gravatar'
import PromptLogin from './PromptLogin'
import EditUserButton from './EditUserButton'
import LogOut from 'components/Shared/LoginArea/LogOut'
import { isLoggedIn, ownsPage } from 'utils/auth'
import style from './style.module.css'
export const UserLayout = ({ user, children, location, loginReducer }) => {
  const loggedIn = isLoggedIn(loginReducer)
  const isOwner = ownsPage(loginReducer, user.uuid)
  return (
    <React.Fragment>
      <Seo
        data={{}}
        location={location}
        title={user.userName}
        noIndex
      />
      <MultiColumn columns='5'>
        <Column>
          <div className={style.identityGroup}>
            <Gravatar email={user.email} />
            <div className={style.identity}>
              <Styled.h1>{user.fullName}</Styled.h1>
              <Styled.h2>{user.userName}</Styled.h2>
            </div>
          </div>
          <div>
            {
            /* Follow or Edit button */
              isOwner ? <EditUserButton userName={user.userName} /> : <PromptLogin showButton={!loggedIn} />
            }
          </div>
          <div>
            {
              isOwner ? <LogOut /> : null
            }
          </div>
          <div className={style.bio}>{user.bio}</div>
        </Column>
        <Column colSpan='4'>
          {children}
        </Column>
      </MultiColumn>
    </React.Fragment>

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
