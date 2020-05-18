import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { patchData } from 'utils/api'
import { PortfolioContext } from 'components/App/Pages/Portfolio/PortfolioBody'

const SetPortfolioImage = ({ item, loginReducer }) => {
  const { portfolio, updatePortfolio } = useContext(PortfolioContext)
  const [patching, setPatching] = useState(false)
  if (portfolio.image === item.image) {
    return (
      <div>This item is the Cover Image for this portfolio.</div>
    )
  }
  return (
    <button
      onClick={() => {
        setPatching(true)
        const body = { image: item.image }
        patchData({
          loginReducer: loginReducer,
          contentType: 'collection',
          id: portfolio.uuid,
          body: body,
          successFunc: (result) => {
            updatePortfolio(result)
            setPatching(false)
          },
          errorFunc: (e) => {
            console.error(e)
          },
        })
      }}
      disabled={patching}
    >Set as Portfolio Cover Image</button>
  )
}

SetPortfolioImage.propTypes = {
  item: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(SetPortfolioImage)
