/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import { useThemeUI, jsx } from 'theme-ui'

const HorizontalRule = ({ color, flourish }) => {
  const context = useThemeUI()
  const displayColor = color || typy(context, 'theme.colors.primary').safeString || '#000'
  const backgroundColor = typy(context, 'theme.colors.background').safeString || '#fff'

  return (
    <React.Fragment>
      <hr sx={{
        borderTop: '2px solid',
        borderColor: displayColor,
        marginBottom: ['2rem', '3rem', '3rem'],
        marginTop: ['2rem', '3rem', '3rem'],
        maxWidth: '80%',
      }}
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width='20'
        height='20'
        sx={{
          display: 'block',
          margin: ['-44px auto 24px', '-60px auto 36px', '-60px auto 36px'],
          width: '100%',
        }}
      >
        {
          flourish ? (
            <>
              <path
                d='M0,0H24V24H0Z'
                fill={backgroundColor}
              />
              <path
                d='M12,13.26l-5,5,5,5,5-5ZM.69,12l5,5,5-5-5-5ZM12,.69l-5,5,5,5,5-5ZM18.29,7l-5,5,5,5,5-5Z'
                fill={displayColor}
              />
            </>
          ) : null
        }
      </svg>
    </React.Fragment>
  )
}

HorizontalRule.propTypes = {
  color: PropTypes.string,
  flourish: PropTypes.bool,
}
HorizontalRule.defaultProps = {
  flourish: false,
}
export default HorizontalRule
