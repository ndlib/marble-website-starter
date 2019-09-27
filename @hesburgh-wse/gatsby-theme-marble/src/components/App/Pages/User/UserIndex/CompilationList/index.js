import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import Card from 'components/Shared/Card'
// import NewCompilationButton from './NewCompilationButton'
import NoCompilations from './NoCompilations'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import { COMPILATIONS_LISTING_PAGE } from 'store/actions/displayActions'
import style from './style.module.css'

const CompilationList = ({
  compilations,
  isOwner = false,
  loggedIn = false,
}) => {
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
                      target={`/compilation/${c.id}`}
                      image={c.image || c.items[0].image}
                    >{c.description}</Card>
                    {
                      isOwner
                        ? <VisibilityLabel visibility={c.visibility} />
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
  compilations: PropTypes.array.isRequired,
  isOwner: PropTypes.bool,
  loggedIn: PropTypes.bool,
}

export default CompilationList

export const viewable = (compilation, loggedIn, isOwner) => {
  if (isOwner) {
    return true
  } else if (loggedIn && compilation.visibility !== 'private') {
    return true
  } else if (compilation.visibility === 'public') {
    return true
  }
  return false
}
