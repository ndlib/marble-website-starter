/** @jsx jsx */
import { jsx } from 'theme-ui'
import wordMark from 'assets/logos/dept-nd-white.svg'
import sx from './sx'

const WordMark = () => {
  sx.link.backgroundImage = `url(${wordMark})`

  return (
    <div sx={sx.background}>
      <a
        href='https://nd.edu'
        className='mobile'
        sx={sx.link}
      >University <i>of</i> Notre Dame
      </a>
    </div>
  )
}

export default WordMark
