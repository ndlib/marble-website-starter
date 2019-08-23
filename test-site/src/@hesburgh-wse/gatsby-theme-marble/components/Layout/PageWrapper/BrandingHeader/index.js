import React from 'react'
import style from './style.module.css'
import departmentLogo from './departmentLogo.png'
import institutionLogo from './institutionLogo.png'
export const BrandingHeader = () => {
  return (
    <header className={style.wrapper}>
      <div className={style.inner}>
        <a href='http://nd.edu'>
          <img
            src={institutionLogo}
            alt=''
            title='University of Notre Dame'
          />
        </a>
        <a href='https://provost.nd.edu/'>
          <img
            src={departmentLogo}
            alt=''
            title='Office of the Provost'
          />
        </a>
      </div>
    </header>
  )
}

export default BrandingHeader
