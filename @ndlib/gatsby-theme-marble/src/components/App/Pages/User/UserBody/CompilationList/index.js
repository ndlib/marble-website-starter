import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import Card from 'components/Shared/Card'
// import NewCompilationButton from './NewCompilationButton'
import NoCompilations from './NoCompilations'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import { COMPILATIONS_LISTING_PAGE } from 'store/actions/displayActions'
import { isLoggedIn, ownsPage } from 'utils/auth'
import style from './style.module.css'

const CompilationList = ({
  user,
  loginReducer,
}) => {
  const compilations = user.collections || []
  const loggedIn = isLoggedIn(loginReducer)
  const isOwner = ownsPage(loginReducer, user.userName)
  if (compilations.length > 0) {
    return (
      <React.Fragment>
        {
          // TODO add 'New Compilation button'
          // isOwner ? <p><NewCompilationButton /></p> : null
        }
        <DisplayViewToggle defaultDisplay={COMPILATIONS_LISTING_PAGE}>
          {
            typy(compilations).safeArray
              .filter(c => {
                return viewable(c, loggedIn, isOwner)
              })
              .map((c, index) => {
                return (
                  <div key={index} className={style.cardWrapper}>
                    <Card
                      label={c.title}
                      target={`/compilation/${c.uuid}`}
                      image={c.image || ''}
                    >{c.description}</Card>
                    {
                      isOwner
                        ? <VisibilityLabel visibility={c.privacy} />
                        : null
                    }
                  </div>
                )
              })
          }
        </DisplayViewToggle>
      </React.Fragment>
    )
  }
  return <NoCompilations isOwner={isOwner} />
}

CompilationList.propTypes = {
  user: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(
  mapStateToProps,
)(CompilationList)

export const viewable = (compilation, loggedIn, isOwner) => {
  if (isOwner) {
    return true
  } else if (loggedIn && compilation.privacy !== 'private') {
    return true
  } else if (compilation.privacy === 'public') {
    return true
  }
  return false
}
