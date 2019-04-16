import Typography from 'typography'

const fontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  'sans-serif',
]

const typography = new Typography(
  {
    baseFontSize: '16px',
    baseLineHeight: 'normal',
    headerFontFamily: fontFamily,
    bodyFontFamily: fontFamily,
  }
)

export const { scale, rhythm, options } = typography
export default typography
