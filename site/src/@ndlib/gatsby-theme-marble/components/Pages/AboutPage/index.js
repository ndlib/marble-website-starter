/** @jsx jsx */
import { BaseStyles, Styled, jsx } from 'theme-ui'
import { useTranslation } from 'react-i18next'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import Image from 'components/Shared/Image'
import sniteImage from 'assets/images/02.jpg'
import rbImage from 'assets/images/03.jpg'
import archivesImage from 'assets/images/06.jpg'

const AboutPage = () => {
  const { t } = useTranslation()
  return (
    <BaseStyles>
      <div dangerouslySetInnerHTML={{ __html: t('text:aboutPage.text') }} />
      <MultiColumn>
        <Column>
          <Styled.h2>{t('text:aboutPage.snite.title')}</Styled.h2>
          <Image src={sniteImage} alt='' />
          <div dangerouslySetInnerHTML={{ __html: t('text:aboutPage.snite.text') }} />
        </Column>
        <Column>
          <Styled.h2>{t('text:aboutPage.rb.title')}</Styled.h2>
          <Image src={rbImage} alt='' />
          <div dangerouslySetInnerHTML={{ __html: t('text:aboutPage.rb.text') }} />
        </Column>
        <Column>
          <Styled.h2>{t('text:aboutPage.archives.title')}</Styled.h2>
          <Image src={archivesImage} alt='' />
          <div dangerouslySetInnerHTML={{ __html: t('text:aboutPage.archives.text') }} />
        </Column>
      </MultiColumn>
    </BaseStyles>
  )
}

export default AboutPage
