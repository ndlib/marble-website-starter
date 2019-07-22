import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import CardGroup from 'components/Shared/CardGroup'
import Card from 'components/Shared/Card'
import ChildManifests from 'components/Shared/ChildManifests'
import Column from 'components/Shared/Column'
import Image from 'components/Shared/Image'
import ImageSection from 'components/ManifestViews/Item/ItemAside/ImageSection'
import ManifestCard from 'components/Shared/ManifestCard'
import ManifestDescription from 'components/Shared/ManifestDescription'
import ManifestMetaData from 'components/Shared/ManifestMetaData'

import MultiColumn from 'components/Shared/MultiColumn'
import SearchBanner from 'components/Shared/SearchBanner'

export const availableComponents = {
  ActionButtons: ActionButtonGroup,
  Card: Card,
  CardGroup: CardGroup,
  ChildManifests: ChildManifests,
  Column: Column,
  Image: Image,
  ManifestCard: ManifestCard,
  ManifestDescription: ManifestDescription,
  ManifestImage: ImageSection,
  ManifestMetaData: ManifestMetaData,
  MultiColumn: MultiColumn,
  SearchBanner: SearchBanner,
}

export default availableComponents
