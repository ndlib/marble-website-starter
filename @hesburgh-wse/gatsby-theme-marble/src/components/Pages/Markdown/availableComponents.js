import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import CardGroup from 'components/Shared/CardGroup'
import Card from 'components/Shared/Card'
import ChildManifests from 'components/Shared/ChildManifests'
import Column from 'components/Shared/Column'
import Image from 'components/Shared/Image'
import LoginArea from 'components/Shared/LoginArea'
import ManifestImage from 'components/Shared/ManifestImage'
import ManifestCard from 'components/Shared/ManifestCard'
import ManifestDescription from 'components/Shared/ManifestDescription'
import ManifestMetaData from 'components/Shared/ManifestMetaData'
import Map from 'components/Shared/Map'
import MiradorViewer from 'components/Shared/MiradorViewer'
import MultiColumn from 'components/Shared/MultiColumn'
import SearchBase from 'components/Shared/SearchBase'
import SearchBox from 'components/Shared/SearchBox'
import SearchFilterBox from 'components/Shared/SearchTools/SearchFilterBox'
import SearchResults from 'components/Shared/SearchTools/SearchResults'

import SearchDynamicRangeFilter from 'components/Shared/SearchTools/SearchDynamicRangeFilter'
import SearchMenuFilter from 'components/Shared/SearchTools/SearchMenuFilter'
import SearchRefinementListFilter from 'components/Shared/SearchTools/SearchRefinementListFilter'

export const availableComponents = {
  ActionButtons: ActionButtonGroup,
  Card: Card,
  CardGroup: CardGroup,
  ChildManifests: ChildManifests,
  Column: Column,
  Image: Image,
  LoginArea: LoginArea,
  ManifestCard: ManifestCard,
  ManifestDescription: ManifestDescription,
  ManifestImage: ManifestImage,
  ManifestMetaData: ManifestMetaData,
  Map: Map,
  MiradorViewer: MiradorViewer,
  MultiColumn: MultiColumn,
  SearchBase: SearchBase,
  SearchBox: SearchBox,
  SearchDynamicRangeFilter: SearchDynamicRangeFilter,
  SearchFilterBox: SearchFilterBox,
  SearchMenuFilter: SearchMenuFilter,
  SearchRefinementListFilter: SearchRefinementListFilter,
  SearchResults: SearchResults,
}

export default availableComponents
