module.exports = {
  createButton: {
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontStyle: 'oblique',
    height: '36px',
    width: '100%',
    '&:hover': {
      backgroundColor: 'primary',
      color: 'primaryText.0',
    },
  },
  errorButton: {
    border: 'none',
    backgroundColor: 'attention',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    fontStyle: 'oblique',
    height: '36px',
    width: '100%',
  },
  wrapper: {
    backgroundColor: 'background',
    overflow: 'hidden',
  },
  input: {
    border: 'none',
    display: 'inline-block',
    fontFamily: 'body',
    fontSize: '16px',
    height: '36px',
    outline: 'none',
    padding: '0 1rem',
    verticalAlign: 'top',
    width: 'calc(100% - 80px)',
  },
  submitButton: {
    backgroundColor: 'primary',
    border: 'none',
    color: 'primaryText.0',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '.8rem',
    fontVariant: 'small-caps',
    height: '36px',
    width: '80px',
    outline: 'none',
    verticalAlign: 'top',
  },
}
