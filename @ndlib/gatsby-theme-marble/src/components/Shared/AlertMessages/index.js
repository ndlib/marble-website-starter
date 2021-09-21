/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Alert } from 'theme-ui'
import { useAlertContext } from '@ndlib/gatsby-theme-marble/src/context/AlertContext'

const AlertMessages = () => {
  const { alerts } = useAlertContext()
  return (
    <div sx={{
      position: 'fixed',
      bottom: '5rem',
      left: '10rem',
      transition: 'width 2s',
    }}>
      {
        Object.entries(alerts).map(([key, value]) => {
          console.log('entry?', key, value)
          return <Alert variant={value.type} key={value.msg}>{value.msg}</Alert>
        })
      }
    </div>
  )
}

AlertMessages.propTypes = {

}

export default AlertMessages
