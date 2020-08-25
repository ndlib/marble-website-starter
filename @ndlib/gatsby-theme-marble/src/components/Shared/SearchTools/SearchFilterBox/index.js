import React from 'react'
import {
  SearchBox,
  SelectedFilters,
  ResetFilters,
} from 'searchkit'
import { useTranslation } from 'react-i18next'
import HeroBox from 'components/Shared/HeroBox'

const SearchFilterBox = () => {
  const { t } = useTranslation()
  const fieldLabel = t('common:search.prompt')
  const fields = ['name', 'creator', 'allMetadata']

  return (
    <HeroBox>
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
