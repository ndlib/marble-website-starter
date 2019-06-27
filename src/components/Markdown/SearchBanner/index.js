import React from 'react'
import PropTypes from 'prop-types'
import SearchBox from 'components/Shared/SearchBox'
import style from './style.module.css'

const SearchBanner = ({ frontmatter, location }) => {
  const { showBanner, mainCallOut, mainCaption, mainBanner } = frontmatter
  if (!showBanner) {
    return null
  }
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

SearchBanner.propTypes = {
  frontmatter: PropTypes.shape({
    showBanner: PropTypes.bool,
    mainCallOut: PropTypes.string,
    mainCaption: PropTypes.string,
    mainBanner: PropTypes.shape({
      publicURL: PropTypes.string,
    }),
  }),
  location: PropTypes.object.isRequired,
}
SearchBanner.defaultProps = {
  frontmatter: {
    showBanner: false,
  },
}
export default SearchBanner
