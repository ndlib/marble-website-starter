/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import { jsx } from 'theme-ui'
import Card from 'components/Shared/Card'
import TypeLabel from './TypeLabel'
// import { getImageServiceFromThumbnail } from 'utils/getImageService'
// import getLanguage from 'utils/getLanguage'
import sx from './sx'

export const ManifestCard = (props) => {
  console.log(props.iiifManifest)
  const { allMarbleItem } = useStaticQuery(
    graphql`
    query {
      allMarbleItem {
        nodes {
          id
          marbleId
          slug
          title
          iiifUri
          display
          image {
            thumbnail
          }
        }
      }
    }
  `,
  )
  const item = findItem(props.iiifManifest, allMarbleItem)
  if (!item) {
    console.warn('Could not find manifest: ', props.iiifManifest)
    return null
  }
  // const children = figureOutChildren(props, iiifManifest, lang)

  // TODO Fix image path for collections
  return (
    <div sx={sx.wrapper}>
      <Card
        label={item.title}
        target={`/${item.slug}`}
        imageService={typy(item, 'image.thumbnail').safeString}
        imageRegion='full'
        {...props}
      >
        {
          // TODO deal with children and show creator(s)/date(s) by default
          // children
        }
      </Card>
      <TypeLabel type={item.display} />
    </div>
  )
}

// const findCreator = (manifest, lang) => {
//   const options = ['creator']
//   if (!manifest.metadata) {
//     return []
//   }
//
//   return manifest.metadata.reduce((creator, row) => {
//     const label = row.label[lang].join('').toLowerCase()
//
//     if (options.includes(label)) {
//       return creator.concat(row.value[lang].join('<br/>'))
//     }
//
//     return creator
//   }, [])
// }

// const findDates = (manifest, lang) => {
//   const options = ['date', 'dates']
//   if (!manifest.metadata) {
//     return []
//   }
//
//   return manifest.metadata.reduce((dates, row) => {
//     const label = row.label[lang].join('').toLowerCase().trim()
//     if (options.includes(label)) {
//       return dates.concat(row.value[lang].join('<br/>'))
//     }
//
//     return dates
//   }, [])
// }

// export const figureOutChildren = (parentProps, iiifManifest, lang) => {
//   const creator = findCreator(iiifManifest, lang)
//   const dates = findDates(iiifManifest, lang)
//   return (
//     <React.Fragment>
//       {
//         parentProps.showCreator ? (
//           <p
//             sx={sx.lineStyle}
//             dangerouslySetInnerHTML={{ __html: creator }}
//           />
//         ) : null
//       }
//       {
//         parentProps.showDate ? (
//           <p
//             sx={sx.lineStyle}
//             dangerouslySetInnerHTML={{ __html: dates }}
//           />
//         ) : null
//       }
//       {parentProps.showSummary ? <div>{typy(iiifManifest, `summary[${lang}][0]`).safeString}</div> : null}
//       {parentProps.children ? parentProps.children : null}
//     </React.Fragment>
//   )
// }

const findItem = (manifestId, allMarbleItem) => {
  return allMarbleItem.nodes.find(item => {
    return item.iiifUri === manifestId
  })
}

ManifestCard.propTypes = {
  iiifManifest: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  imageRegion: PropTypes.string,
  showCreator: PropTypes.bool,
  showDate: PropTypes.bool,
  showSummary: PropTypes.bool,
  children: PropTypes.node,
}
ManifestCard.defaultProps = {
  showCreator: true,
  showDate: true,
  showSummary: false,
}
export default ManifestCard
