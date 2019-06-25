import React from 'react'
import PropTypes from 'prop-types'
import SearchBox from 'components/Shared/SearchBox'
import style from './style.module.css'

const HomeBanner = ({ frontmatter, location }) => {
  const { mainCallOut, mainCaption, mainBanner } = frontmatter
  return (
    <div className={style.banner}>
      <img
        src={mainBanner.publicURL}
        className={style.bannerImage}
        alt=''
      />
      <div className={style.imageCaption}>
        <div className={style.captionFrame}>
          <h1 dangerouslySetInnerHTML={{ __html: mainCallOut }} />
          <SearchBox location={location} />
        </div>
      </div>
      <div className={style.imageCitation}>
        <p className={style.citation}>
          <sub dangerouslySetInnerHTML={{ __html: mainCaption }} />
        </p>
      </div>
    </div>
  )
}

HomeBanner.propTypes = {
  frontmatter: PropTypes.shape({
    mainCallOut: PropTypes.string.isRequired,
    mainCaption: PropTypes.string,
  }).isRequired,
  location: PropTypes.object.isRequired,
}
export default HomeBanner
