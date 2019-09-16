import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import Card from 'components/Shared/Card'
import NewCompilationButton from './NewCompilationButton'
import NoCompilations from './NoCompilations'
import { COMPILATION_PAGE } from 'store/actions/displayActions'
const CompilationList = ({
  compilations,
  isOwner = false,
}) => {
  if (compilations.length > 0) {
    return (
      <React.Fragment>
        {
          isOwner ? <p><NewCompilationButton /></p> : null
        }
        <DisplayViewToggle defaultDisplay={COMPILATION_PAGE}>
          {
            typy(compilations).safeArray.map((compilation, index) => {
              return (
                <Card
                  key={index}
                  label={compilation.label}
                  target={compilation.target}
                />
              )
            })
          }
        </DisplayViewToggle>
      </React.Fragment>
    )
  }
  return <NoCompilations isOwner={isOwner} />
}

CompilationList.propTypes = {
  compilations: PropTypes.array.isRequired,
  isOwner: PropTypes.bool,
}

export default CompilationList
