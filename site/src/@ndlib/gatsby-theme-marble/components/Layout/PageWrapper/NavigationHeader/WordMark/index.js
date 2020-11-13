/** @jsx jsx */
import { jsx } from 'theme-ui'
import wordMark from 'assets/images/dept-nd-white.svg'

const WordMark = () => {
  const background = {
    backgroundColor: '#0C2340',
    display: ['block', 'none', 'none'],
    height: '48px',
    textAlign: 'center',
  }
  const link = {
    backgroundImage: `url(${wordMark})`,
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'block',
    lineHeight: '48px',
    margin: '0 auto',
    textIndent: '-9999px',
    overflow: 'hidden',
    width: '301px',
  }
  return (
    <div sx={background}>
      <a
        href='https://nd.edu'
        className='mobile'
        sx={link}
      >University <i>of</i> Notre Dame
      </a>
    </div>
  )
}

export default WordMark
