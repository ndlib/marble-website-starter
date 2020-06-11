import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import MaterialButton from 'components/Internal/MaterialButton'
import { createData } from 'utils/api'

export const NewPortfolioButton = ({ portfolios, addFunc, loginReducer }) => {
  const { t } = useTranslation()
  const [creating, setCreating] = useState(false)
  return (
    <MaterialButton
      onClick={() => {
        setCreating(true)
        createData({
          loginReducer: loginReducer,
          contentType: 'collection',
          id: loginReducer.user.uuid,
          body: {
            title: 'My Portfolio',
            description: null,
            image: null,
            layout: 'default',
            privacy: 'private',
          },
          successFunc: (data) => successFunc({
            data: data,
            portfolios: portfolios,
            addFunc: addFunc,
            setCreating: setCreating,
          }),
          errorFunc: (e) => {
            console.error(e)
          },
        })
      }}
      wide
      primary
      disabled={creating}
    >{t('common:button.createPortfolio')}
    </MaterialButton>
  )
}

NewPortfolioButton.propTypes = {
  addFunc: PropTypes.func.isRequired,
  portfolios: PropTypes.array.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(
  mapStateToProps,
)(NewPortfolioButton)

export const successFunc = ({ data, portfolios, addFunc, setCreating }) => {
  const ps = [...portfolios]
  ps.unshift(data)
  addFunc(ps)
  setCreating(false)
  navigate(`/myportfolio/${data.uuid}/edit`)
}
