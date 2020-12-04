import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import Card from 'components/Shared/Card'
import NewPortfolioButton from './NewPortfolioButton'
import NoPortfolios from './NoPortfolios'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import { COMPILATIONS_LISTING_PAGE } from 'store/actions/displayActions'
import { isLoggedIn, ownsPage } from 'utils/auth'
import style from './style.module.css'
import MaterialButton from 'components/Internal/MaterialButton'
import { deleteData } from 'utils/api'

const PortfolioList = ({
  user,
  loginReducer,
}) => {
  const [portfolios, setPortfolios] = useState(user.collections || [])
  const beGone = (portfolio) => {
    const areYouSure = window.confirm('Are you sure you want to delete this protfolio?') ? (
      deleteData({
        loginReducer: loginReducer,
        contentType: 'collection',
        id: portfolio.uuid,
        successFunc: () => {
          setPortfolios(portfolios.filter(p => {
            return p.uuid !== portfolio.uuid
          }))
        },
        errorFunc: (e) => {
          console.error(e)
        },
      })
    ) : null
    return areYouSure
  }
  const loggedIn = isLoggedIn(loginReducer)
  const isOwner = ownsPage(loginReducer, user.uuid)
  if (portfolios.length > 0) {
    return (
      <>
        <DisplayViewToggle
          defaultDisplay={COMPILATIONS_LISTING_PAGE}
          extraControls={isOwner ? () => {
            return (
              <span style={{
                float: 'left',
                verticalAlign: 'top',
              }}
              >
                <NewPortfolioButton
                  addFunc={setPortfolios}
                  portfolios={portfolios}
                />
              </span>
            )
          } : () => {
            return null
          }}
        >
          {
            typy(portfolios).safeArray
              .filter(c => {
                return viewable(c, loggedIn, isOwner)
              })
              .sort((a, b) => {
                return b.updated - a.updated
              })
              .map((c, index) => {
                return (
                  <div key={index} className={style.cardWrapper}>
                    {
                      isOwner
                        ? (
                          <div className={style.deleteButton}>
                            <MaterialButton
                              primary
                              wide
                              onClick={() => beGone(c)}
                            >Delete
                            </MaterialButton>
                          </div>
                        ) : null
                    }
                    <Card
                      label={c.title}
                      target={`/myportfolio/${c.uuid}`}
                      image={c.image || ''}
                    >{c.description}
                    </Card>
                    {
                      isOwner ? (
                        <div>
                          <VisibilityLabel visibility={c.privacy} />
                        </div>
                      ) : null
                    }
                  </div>
                )
              })
          }
        </DisplayViewToggle>
      </>
    )
  }
  return <NoPortfolios isOwner={isOwner} />
}

PortfolioList.propTypes = {
  user: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(
  mapStateToProps,
)(PortfolioList)

export const viewable = (portfolio, loggedIn, isOwner) => {
  if (isOwner) {
    return true
  } else if (loggedIn && portfolio.privacy !== 'private') {
    return true
  } else if (portfolio.privacy === 'public') {
    return true
  }
  return false
}
