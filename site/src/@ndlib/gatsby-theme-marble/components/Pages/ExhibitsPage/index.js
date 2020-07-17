import React from 'react'
import CardGroup from 'components/Shared/CardGroup'
import Card from 'components/Shared/Card'
import image1 from 'assets/images/Home-Graphic-v2e.jpg'
import image2 from 'assets/images/cover-1.jpg'
import image3 from 'assets/images/BLOG-EarlyCatholicAmerica.jpg'

const ExhibitsPage = () => {
  const exhibits = [
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
                onClick={()=> window.open(exhibit.target, "_blank")}
              />
            )
          })
        }
      </CardGroup>
    </>
  )
}

export default ExhibitsPage
