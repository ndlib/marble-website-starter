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
      label: '1300-1399',
      target: '/search?timeperiod[0]=1300-1399',
    },
    {
      label: '1400-1499',
      target: '/search?timeperiod[0]=1400-1499',
    },
    {
      label: '1500-1599',
      target: '/search?timeperiod[0]=1500-1599',
    },
    {
      label: '1600-1699',
      target: '/search?timeperiod[0]=1600-1699',
    },
    {
      label: '1700-1799',
      target: '/search?timeperiod[0]=1700-1799',
    },
    {
      label: '1800-1899',
      target: '/search?timeperiod[0]=1800-1899',
    },
    {
      label: '1900-1999',
      target: '/search?timeperiod[0]=1900-1999',
    },
    {
      label: '2000-present',
      target: '/search?timeperiod[0]=2000-present',
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
