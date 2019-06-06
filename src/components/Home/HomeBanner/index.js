import React from 'react'
import PropTypes from 'prop-types'
import SearchBox from 'components/Shared/SearchBox'
import style from './style.module.css'
import bannerImage from 'assets/images/banner.jpg'

const HomeBanner = ({ location }) => {
  return (
    <div className={style.banner}>
      <img
        src={bannerImage}
        className={style.bannerImage}
        alt='home page banner'
      />
      <div className={style.imageCaption}>
        <div className={style.captionFrame}>
          <h1>Explore digitized artwork, rare books, artifacts, and archival materials from the University of Notre Dame.</h1>
          <SearchBox location={location} />
        </div>
      </div>
      <div className={style.imageCitation}>
        <p className={style.citation}><sub>Photograph of St. Joseph's Novitiate exterior from across St. Joseph's Lake, 1894,<br /> Notre Dame Life Photograph Collection (GNDL) 45/0, University of Notre Dame Archives.</sub></p>
      </div>
    </div>
  )
}

HomeBanner.propTypes = {
  location: PropTypes.object.isRequired,
}
export default HomeBanner
