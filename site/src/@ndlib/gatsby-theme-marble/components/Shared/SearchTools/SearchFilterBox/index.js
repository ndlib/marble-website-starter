import React from 'react'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'
import { useStaticQuery, graphql } from 'gatsby'
import HeroBox from '@ndlib/gatsby-theme-marble/src/components/Shared/HeroBox'
import banner from 'assets/images/banner.swirl.png'

const SearchFilterBox = () => {
  const { site } = useStaticQuery(
    graphql`
    query {
      site {
        siteMetadata {
          searchBoxDefaultText
        }
      }
    }
  `,
  )
  const fieldLabel = (site.siteMetadata.searchBoxDefaultText !== null) ? site.siteMetadata.searchBoxDefaultText : 'Search the Collections'
  const fields = ['name', 'creator', 'allMetadata']

  return (
    <HeroBox backgroundImage={banner}>
      <SearchBox
        queryFields={fields}
        placeholder={fieldLabel}
      />
      <SelectedFilters />
      <ResetFilters />
    </HeroBox>
  )
}

export default SearchFilterBox
