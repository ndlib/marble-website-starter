/** @jsx jsx */
import React from 'react'
import { jsx, Styled } from 'theme-ui'
import CardGroup from 'components/Shared/CardGroup'
import Column from 'components/Shared/Column'
import HeroBox from 'components/Shared/HeroBox'
import MiniCard from 'components/Shared/MiniCard'
import MultiColumn from 'components/Shared/MultiColumn'
import SearchBox from 'components/Shared/SearchBox'

import heroImage from 'assets/images/banner.swirl.png'
const Browse = ({ location }) => {
  const dates = [
    {
      label: '14th Century',
      target: '/search?timeperiod[0]=14th%20Century',
    },
    {
      label: '15th Century',
      target: '/search?timeperiod[0]=15th%20Century',
    },
    {
      label: '16th Century',
      target: '/search?timeperiod[0]=16th%20Century',
    },
    {
      label: '17th Century',
      target: '/search?timeperiod[0]=17th%20Century',
    },
    {
      label: '18th Century',
      target: '/search?timeperiod[0]=18th%20Century',
    },
    {
      label: '19th Century',
      target: '/search?timeperiod[0]=19th%20Century',
    },
    {
      label: '20th Century',
      target: '/search?timeperiod[0]=20th%20Century',
    },
    {
      label: '21st Century',
      target: '/search?timeperiod[0]=21st%20Century',
    },
    {
      label: 'undated',
      target: '/search?timeperiod[0]=undated',
    },
  ]
  const formats = [
    {
      label: 'Paintings',
      target: '/search?format[0]=Paintings',
    },
    {
      label: 'Photographs',
      target: '/search?format[0]=Photographs',
    },
    {
      label: 'Prints',
      target: '/search?format[0]=Prints',
    },
    {
      label: 'Sculpture',
      target: '/search?place[0]=Sculpture',
    },
  ]
  const locations = [
    {
      label: 'Rare Books and Special Collections',
      target: '/search?campuslocation[0]=Rare%20Books%20and%20Special%20Collections',
    },
    {
      label: 'Snite Museum of Art',
      target: '/search?campuslocation[0]=Snite%20Museum%20of%20Art',
    },
  ]
  return (
    <>
      <HeroBox backgroundImage={heroImage}>
        <SearchBox location={location} />
      </HeroBox>
      <MultiColumn columns='5'>
        <Column>
          <div id='date'>
            <Styled.h2>Browse By Date</Styled.h2>
          </div>
        </Column>
        <Column colSpan='4'>
          <CardGroup>
            {
              dates.map(date => {
                return (
                  <MiniCard
                    key={date.label}
                    label={date.label}
                    target={date.target}
                  />
                )
              })
            }
          </CardGroup>
        </Column>
      </MultiColumn>
      <MultiColumn columns='5'>
        <Column>
          <div id='format'>
            <Styled.h2>Browse By Format</Styled.h2>
          </div>
        </Column>
        <Column colSpan='4'>
          <CardGroup>
            {
              formats.map(format => {
                return (
                  <MiniCard
                    key={format.label}
                    label={format.label}
                    target={format.target}
                  />
                )
              })
            }
          </CardGroup>
        </Column>
      </MultiColumn>
      <MultiColumn columns='5'>
        <Column>
          <div id='location'>
            <Styled.h2>Browse By Location</Styled.h2>
          </div>
        </Column>
        <Column colSpan='4'>
          <CardGroup>
            {
              locations.map(location => {
                return (
                  <MiniCard
                    key={location.label}
                    label={location.label}
                    target={location.target}
                  />
                )
              })
            }
          </CardGroup>
        </Column>
      </MultiColumn>
    </>
  )
}

export default Browse
