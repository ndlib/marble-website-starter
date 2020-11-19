/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { BaseStyles, jsx } from 'theme-ui'
import typy from 'typy'
import CardGroup from 'components/Shared/CardGroup'
import BrowseBar from 'components/Shared/BrowseBar'
import ManifestCard from 'components/Shared/ManifestCard'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import { useTranslation } from 'react-i18next'
import findMetadata from 'utils/findMetadata'
import dateImage from 'assets/images/date.jpg'
import formatImage from 'assets/images/format.jpg'
import campuslocationImage from 'assets/images/campus_location.jpg'
import allImage from 'assets/images/all_items.jpg'

const IndexPage = ({ location }) => {
  const { t } = useTranslation()
  const { allMarbleItem } = useStaticQuery(
    graphql`
      query {
        allMarbleItem(filter: {marbleId: {in: [
        "005096943",
        "1951.004.015",
        "002097132",
        "2008.039.002",
        "MSNEa8006_EAD",
        "002203292",
        "2014.047.003",
        "MSNCW5066_EAD",
        "1999.031.002"
      ]}}) {
          nodes {
            title
            marbleId
            slug
            display
            childrenMarbleFile {
              iiif {
                thumbnail
              }
              fileType
            }
            metadata {
              label
              type
              value
            }
          }
        }
      }
    `,
  )
  const { nodes } = allMarbleItem

  return (
    <React.Fragment>
      <BaseStyles>
        <h2>{t('common:search.browseBy')}</h2>
      </BaseStyles>
      <MultiColumn columns='4'>
        <Column>
          <BrowseBar
            label='Date'
            target='/browse?scrollto=date'
            image={dateImage}
          />
        </Column>
        <Column>
          <BrowseBar
            label='Format'
            target='/browse?scrollto=format'
            image={formatImage}
          />
        </Column>
        <Column>
          <BrowseBar
            label='Campus Location'
            target='/browse?scrollto=location'
            image={campuslocationImage}
          />
        </Column>
        <Column>
          <BrowseBar
            label='All Items'
            target='/search?q='
            image={allImage}
          />
        </Column>
      </MultiColumn>
      <CardGroup
        label={t('common:search.recentAdditions')}
      >
        {
          nodes.map(item => {
            return (
              <ManifestCard
                key={item}
                label={item.title}
                target={item.slug}
                image={typy(item, 'childrenMarbleFile[0].iiif.thumbnail').safeString}
                type={item.display}
                creator={findMetadata(item, ['creator'])}
                date={findMetadata(item, ['date', 'dates'])}
              />
            )
          })

        }
      </CardGroup>
    </React.Fragment>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default IndexPage
