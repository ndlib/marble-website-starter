import React from 'react'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'
import { useTranslation } from 'react-i18next'
import HeroBox from 'components/Shared/HeroBox'
import banner from 'assets/images/banner.swirl.png'

const SearchFilterBox = () => {
  const { t } = useTranslation()
  const fieldLabel = t('common:search.prompt')
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
