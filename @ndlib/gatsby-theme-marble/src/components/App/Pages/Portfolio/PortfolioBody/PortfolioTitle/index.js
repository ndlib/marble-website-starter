/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react'
import { Styled, jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from 'context/PortfolioContext'
import TitleEdit from './TitleEdit'
import EditButton from 'components/App/Pages/Portfolio/PortfolioBody/EditButton'

const PortfolioTitle = ({ isOwner }) => {
  const { portfolio } = usePortfolioContext()
  const [editing, setEditing] = useState(false)

  if (editing) {
    return <TitleEdit closeFunc={() => setEditing(false)} />
  }

  return (
    <Styled.h1>
      {portfolio.title}
      <EditButton
        isOwner={isOwner}
        setEditFunc={() => setEditing(true)}
      />
    </Styled.h1>
  )
}

PortfolioTitle.propTypes = {
  isOwner: PropTypes.bool,
}

export default PortfolioTitle
