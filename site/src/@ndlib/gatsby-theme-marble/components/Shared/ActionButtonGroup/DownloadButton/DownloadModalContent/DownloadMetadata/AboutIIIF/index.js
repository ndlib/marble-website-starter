import React from 'react'
import { Trans } from 'react-i18next'

const AboutIIIF = () => {
  return (
    <div>
      <p>
        <Trans i18nKey='text:actionGroup.aboutIIIF'>
          <a
            href='https://iiif.io/community/faq/'
            target='_blank'
            rel='noopener noreferrer'
          >IIIF
          </a> is an international image sharing framework. The IIIF manifest URL allows you to compare images across collections or institutions. Learn more about
          <a
            href='https://iiif.io/explainers/using_iiif_resources/#mirador'
            target='_blank'
            rel='noopener noreferrer'
          > using IIIF for comparative research
          </a> or
          <a
            href='https://sites.nd.edu/marble/iiif-at-notre-dame-or-the-heart-of-marble/'
            target='_blank'
            rel='noopener noreferrer'
          > how ND is using the technology
          </a>.
        </Trans>
      </p>
    </div>
  )
}

export default AboutIIIF
