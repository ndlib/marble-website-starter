import React from 'react'
import CardGroup from 'components/Shared/CardGroup'
import Card from 'components/Shared/Card'
import image1 from 'assets/images/Home-Graphic-v2e.jpg'
import image2 from 'assets/images/baseball.jpg'
import image3 from 'assets/images/BLOG-EarlyCatholicAmerica.jpg'
import image4 from 'assets/images/Vote_poster-001.jpg'
import image5 from 'assets/images/DigitalDisplayHoriz.jpg'
import image6 from 'assets/images/cc.png'

const ExhibitsPage = () => {
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
      target: 'https://collections.library.nd.edu/04f477d5b4/preserving-the-steadfastness-of-your-faith',
    },
    {
      label: 'After Gutenberg: Print, Books, and Knowledge in Germany through the Long Sixteenth Century',
      image: image3,
      target: 'https://collections.library.nd.edu/b2c90e6dc2/after-gutenberg',
    },
  ]
  return (
    <>
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
    </>
  )
}

export default ExhibitsPage
