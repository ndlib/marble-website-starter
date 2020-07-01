import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import MiradorViewer from 'components/Pages/MiradorViewer'

export const MiradorTemplate = ({ data, location }) => {
  return (
    <MiradorViewer data={data} location={location} />
  )
}
MiradorTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default MiradorTemplate

export const query = graphql`
  query($id: String!) {
    marbleItem( id: { eq: $id }) {
      id
    }
  }
`
/*

ndJson {
  title
  iiifUri
}
*/
