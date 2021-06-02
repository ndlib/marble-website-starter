module.exports = {
  wrapper: {
    marginBottom: '2rem',
  },
  label: {
    display: 'block',
    marginBottom: '.5rem',
  },
  textarea: {
    backgroundColor: 'background',
    border: '1px solid',
    borderColor: 'gray.4',
    fontFamily: 'body',
    height: '100px',
    maxWidth: '100%',
    outline: 'none',
    padding: '10px 10px',
    verticalAlign: 'top',
    width: '800px',
    '&:disabled': {
      backgroundColor: 'gray.0',
      cursor: 'not-allowed',
    },
  },
  textInvalid: {
    backgroundColor: 'background',
    border: '2px solid',
    borderColor: 'attention',
    fontFamily: 'body',
    height: '100px',
    maxWidth: '100%',
    outline: 'none',
    padding: '10px 10px',
    verticalAlign: 'top',
    width: '800px',
  },
  warning: {
    fontSize: '.7rem',
  },
}
