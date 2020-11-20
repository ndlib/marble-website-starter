/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import CardGroup from 'components/Shared/CardGroup'
import Card from 'components/Shared/Card'
import Link from 'components/Internal/Link'
import typy from 'typy'
import { BaseStyles, useThemeUI, jsx } from 'theme-ui'
import image1 from 'assets/images/Home-Graphic-v2e.jpg'
import image2 from 'assets/images/BaseballCover.jpg'
import image3 from 'assets/images/BLOG-EarlyCatholicAmerica.jpg'
import image4 from 'assets/images/Vote_poster-001.jpg'
import image5 from 'assets/images/DigitalDisplayHoriz.jpg'
import image6 from 'assets/images/cc.png'
import sx from './sx'

const ExhibitsPage = () => {
  const context = useThemeUI()

  const iconColor = typy(context, 'theme.colors.primary').safeString || typy(context, 'theme.colors.primary[1]').safeString

  const exhibits = [
    {
      label: 'Men and women should stand as equals',
      image: image4,
      target: 'https://collections.library.nd.edu/a8b3a0b0ef/men-and-women-should-stand-as-equals',
    },
    {
      label: 'Paws, Hooves, Fins & Feathers',
      image: image5,
      target: 'https://collections.library.nd.edu/717b14e1a3/paws-hooves-fins--feathers',
    },
    {
      label: 'Chinese Catholic-themed Paintings from Xinxiang, Henan Province (1939-1941)',
      image: image6,
      target: 'https://collections.library.nd.edu/c9dfb1b9e1/chinese-catholic-themed-paintings-from-xinxiang-henan-province-1939-1941',
    },
    {
      label: 'In a Civilized Nation: Newspapers, Magazines and the Print Revolution in the 19th-Century Peru',
      image: image1,
      target: 'https://collections.library.nd.edu/3df879828f/in-a-civilized-nation',
    },
    {
      label: 'Words on Play: Baseball Literature before 1900 from the Joyce Sports Collection',
      image: image2,
      target: 'https://collections.library.nd.edu/2c4a5ed54c/words-on-play',
    },
    {
      label: 'After Gutenberg: Print, Books, and Knowledge in Germany through the Long Sixteenth Century',
      image: image3,
      target: 'https://collections.library.nd.edu/b2c90e6dc2/after-gutenberg',
    },
  ]
  return (
    <BaseStyles>
      <div>
        <p>Looking for other ways to explore digital collections at the University of Notre Dame? Take a deeper dive with some of the digital exhibits created by students, faculty, and staff.</p>
      </div>
      <CardGroup>
        {
          exhibits.map(exhibit => {
            return (
              <Card
                key={exhibit.label}
                label={exhibit.label}
                image={exhibit.image}
                target={exhibit.target}
              />
            )
          })
        }
      </CardGroup>
      <p sx={sx.moreLink}>
        <Link
          to='https://collections.library.nd.edu/'
          sx={sx.link}
        >
          <span sx={sx.text}>
            See more digital exhibits
          </span>
          <svg sx={sx.svg} xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' fill={iconColor} />
          </svg>
        </Link>
      </p>
    </BaseStyles>

  )
}

export default ExhibitsPage
