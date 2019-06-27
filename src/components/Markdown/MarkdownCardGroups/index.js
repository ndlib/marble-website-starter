import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import MarkdownCardGroup from './MarkdownCardGroup'

const MarkdownCardGroups = ({ frontmatter }) => {
  const groups = typy(frontmatter, 'cards.groups').safeObject
  if (!groups) {
    return null
  }
  return (
    <React.Fragment>
      {
        groups.map((group, index) => {
          return (
            <MarkdownCardGroup
              label={group.label}
              items={group.items}
              key={index}
            />
          )
        })
      }
    </React.Fragment>
  )
}

MarkdownCardGroups.propTypes = {
  frontmatter: PropTypes.object.isRequired,
}

export default MarkdownCardGroups
