import React from 'react'
import PropTypes from 'prop-types'
import SearchBox from 'components/Shared/SearchBox'
import style from './style.module.css'

const SearchBanner = ({ callOut, caption, image, location }) => {
  return (
    <div className={style.banner}>
      <img
        src={image}
        className={style.bannerImage}
        alt=''
      />
      <div className={style.imageCaption}>
        <div className={style.captionFrame}>
          <h1 dangerouslySetInnerHTML={{ __html: callOut }} />
          <SearchBox location={location} />
        </div>
      </div>
      <div className={style.imageCitation}>
        <p className={style.citation}>
          <sub dangerouslySetInnerHTML={{ __html: caption }} />
        </p>
      </div>
    </div>
  )
}

SearchBanner.propTypes = {
  callOut: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.string,

  location: PropTypes.object.isRequired,
}
SearchBanner.defaultProps = {
  frontmatter: {
    showBanner: false,
  },
}
export default SearchBanner
