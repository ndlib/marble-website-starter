/** @jsx jsx */
import PropTypes from 'prop-types'
import { BaseStyles, jsx } from 'theme-ui'
import typy from 'typy'
import sx from './sx'

const DownloadPdf = ({ marbleItem }) => {
  const pdfs = typy(marbleItem, 'childrenMarbleFile').safeArray.filter(f => {
    return f.fileType === 'pdf'
  })
  if (!pdfs || pdfs.length === 0) {
    return null
  }
  return (
    <BaseStyles>
      <h2>PDFs</h2>
      <div sx={sx.wrapper}>
        {
          pdfs.map(pdf => {
            return (
              <div
                key={pdf}
                sx={sx.line}
              >
                <a
                  href={pdf.file}
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={sx.link}
                >
                  <span>{pdf.name}</span>
                </a>

              </div>
            )
          })

        }
      </div>
    </BaseStyles>
  )
}

DownloadPdf.propTypes = {
  marbleItem: PropTypes.object.isRequired,
}
export default DownloadPdf
