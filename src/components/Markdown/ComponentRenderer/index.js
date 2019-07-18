import React from 'react'
import PropTypes from 'prop-types'

import TestComponent from './TestComponent'
import CardGroup from './CardGroup'
import Card from 'components/Shared/Card'
import Column from './Column'
import Image from 'components/Shared/Image'
import ManifestCard from './ManifestCard'
import ManifestDescription from './ManifestDescription'
import MarkdownHtmlContent from './MarkdownHtmlContent'
import MultiColumn from './MultiColumn'

import ActionButtonGroup from 'components/Shared/ActionButtonGroup'
import ChildManifests from './ChildManifests'
import ImageSection from 'components/ManifestViews/Item/ItemAside/ImageSection'
import ManifestMetaData from './ManifestMetaData'
import SearchBanner from './SearchBanner'

const ComponentRenderer = (props) => {
  const validComponents = {
    ActionButtons: ActionButtonGroup,
    Card: Card,
    CardGroup: CardGroup,
    ChildManifests: ChildManifests,
    Column: Column,
    Image: Image,
    ManifestCard: ManifestCard,
    ManifestDescription: ManifestDescription,
    ManifestImage: ImageSection,
    MarkdownHtmlContent: MarkdownHtmlContent,
    ManifestMetaData: ManifestMetaData,
    MultiColumn: MultiColumn,
    SearchBanner: SearchBanner,
  }
  // console.log(props)
  const renderComponent = validComponents[props.component] || TestComponent
  return React.createElement(renderComponent, props, props.children)
}

ComponentRenderer.propTypes = {
  component: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default ComponentRenderer
