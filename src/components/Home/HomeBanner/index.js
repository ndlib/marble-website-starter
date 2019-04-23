import React from 'react'
import bannerImage from 'assets/images/banner.jpg'

const HomeBanner = () => {
  return (
    <div className='banner'>
      <img
        src={bannerImage}
        className='bannerImage'
        alt='home page banner'
      />
      <div className='imageCaption'>
        <div className='captionFrame'>
          <h1>Explore digitized artwork, rare books, artifacts, and archival materials from the University of Notre Dame.</h1>
        </div>
      </div>
      <div className='imageCitation'>
        <p className='citation'><sub>Photograph of St. Joseph's Novitiate exterior from across St. Joseph's Lake, 1894,<br /> Notre Dame Life Photograph Collection (GNDL) 45/0, University of Notre Dame Archives.</sub></p>
      </div>
    </div>
  )
}

export default HomeBanner
