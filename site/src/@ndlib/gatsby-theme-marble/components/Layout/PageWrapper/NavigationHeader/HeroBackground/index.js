/** @jsx jsx */
import { jsx } from 'theme-ui'
import jpegImage from 'assets/images/banner.swirl.jpg'
import webpImage from 'assets/images/banner.swirl.webp'
import sx from './sx'

const HeroBackground = () => {
  return (
    <div sx={sx.wrapper}>
      <picture sx={sx.picture}>
        <source srcSet={webpImage} type='image/webp' />
        <img
          src={jpegImage}
          alt=''
          loading='lazy'
        />
      </picture>
    </div>
  )
}

export default HeroBackground
