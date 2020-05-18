/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react'
import { Styled, jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { PortfolioContext } from 'components/App/Pages/Portfolio/PortfolioBody'
import editIcon from 'assets/icons/svg/baseline-edit-24px.svg'
import sx from './sx'
import TitleEdit from './TitleEdit'

const PortfolioTitle = ({ isOwner }) => {
  const { portfolio } = useContext(PortfolioContext)
  const [editing, setEditing] = useState(false)

  if (editing) {
    return <TitleEdit closeFunc={() => setEditing(false)} />
  }

  let editButton = null
  if (isOwner) {
    editButton = (
      <button
        onClick={() => setEditing(true)}
        sx={sx.editButton}
      >
        <img
          src={editIcon}
          alt='edit'
        />
      </button>
    )
  }

  return (
    <Styled.h1>{portfolio.title}{editButton}</Styled.h1>
  )
}

PortfolioTitle.propTypes = {
  isOwner: PropTypes.bool,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default PortfolioTitle
