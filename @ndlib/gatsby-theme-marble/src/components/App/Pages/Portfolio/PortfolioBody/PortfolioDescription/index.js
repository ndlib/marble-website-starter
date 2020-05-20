/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import MaterialButton from 'components/Internal/MaterialButton'
import { usePortfolioContext } from 'context/PortfolioContext'
import EditButton from 'components/App/Pages/Portfolio/PortfolioBody/EditButton'
import EditDescription from './EditDescription'
import sx from './sx'

const PortfolioDescription = ({ isOwner }) => {
  const { portfolio } = usePortfolioContext()
  const [editing, setEditing] = useState(false)
  const { description } = portfolio

  if (editing) {
    return (<EditDescription closeFunc={() => setEditing(false)} />)
  }
  if (description === '' || description === null) {
    if (isOwner) {
      return (
        <MaterialButton
          wide
          onClick={() => {
            setEditing(true)
          }}
        >Add a description</MaterialButton>
      )
    }
    return null
  }
  return (
    <div sx={sx.wrapper}>
      <div sx={sx.innerWrapper(isOwner)}>
        {description}
      </div>
      <div sx={sx.buttonWrapper(isOwner)}>
        <EditButton
          isOwner={isOwner}
          setEditFunc={() => setEditing(true)}
        />
      </div>
    </div>
  )
}

PortfolioDescription.propTypes = {
  isOwner: PropTypes.bool,
}

export default PortfolioDescription
