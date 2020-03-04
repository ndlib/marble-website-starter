import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import BookmarkButton from './BookmarkButton'
import NewPortfolioButton from 'components/App/Pages/User/UserBody/PortfolioList/NewPortfolioButton'
import { getData } from 'utils/api'
import { isLoggedIn } from 'utils/auth'
import icon from 'assets/icons/svg/baseline-bookmark-24px-white.svg'
import style from './style.module.css'

const BookmarkGroup = ({ iiifManifest, loginReducer }) => {
  const [open, setOpen] = useState(false)
  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    getData({
      loginReducer: loginReducer,
      contentType: 'user',
      id: typy(loginReducer, 'user.userName').safeString,
      successFunc: (data) => {
        const ps = typy(data, 'collections').safeArray.sort((a, b) => {
          return b.updated - a.updated
        })
        setPortfolios(ps)
      },
      errorFunc: (e) => {
        console.error(e)
      },
    })
    return () => {
      abortController.abort()
    }
  }, [loginReducer])

  if (!isLoggedIn(loginReducer)) {
    return null
  }

  return (
    <div
      className={open ? style.open : style.closed}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false)
        }
      }}
      tabIndex={0}
      role='listbox'
    >
      <div
        className={style.toggle}
        role='button'
        onClick={() => setOpen(!open)}
      >
        <img src={icon} alt='' />
        <span className={style.mainLabel}>Save to a portfolio</span>
      </div>
      <div className={style.options}>
        {
          portfolios.length > 0 ? (
            portfolios.map(
              collection => {
                return (
                  <BookmarkButton
                    key={collection.uuid}
                    iiifManifest={iiifManifest}
                    collection={collection}
                  />
                )
              })
          ) : (
            <div className={style.noPortfolios}>You do not have any portfolios.</div>
          )
        }
        <NewPortfolioButton
          addFunc={setPortfolios}
          portfolios={portfolios}
        />
      </div>
    </div>

  )
}

BookmarkGroup.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(BookmarkGroup)
