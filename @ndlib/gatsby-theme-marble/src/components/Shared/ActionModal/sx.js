module.exports = {
  wrapper: {
    backgroundColor: 'primary',
    display: 'block',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    zIndex: '1',
  },
  heading: {
    color: 'background',
    display: 'inline-block',
    fontFamily: 'heading',
    fontSize: '1.5rem',
    lineHeight: '1.5rem',
    margin: '0',
    maxWidth: 'calc(100% - 50px)',
    overflow: 'hidden',
    padding: '1rem',
    position: 'fixed',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  button: {
    backgroundColor: 'primary',
    color: 'background',
    cursor: 'pointer',
    float: 'right',
    border: 'none',
    borderLeft: '1px solid',
    borderColor: 'primaryText',
    lineHeight: '1.5rem',
    padding: '1rem',
  },
  svg: {
    verticalAlign: 'middle',
  },
  contentContainer: {
    height: 'calc(100vh - 80px - 3.5rem)',
  },
  flexContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    height: '100%',
    position: 'relative',
    justifyContent: 'space-between',
  },
  body: {
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'relative',
  },
  footer: {
    padding: '1rem',
  },
}
