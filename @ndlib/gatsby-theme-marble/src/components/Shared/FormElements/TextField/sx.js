module.exports = {
  wrapper: {
    marginBottom: '2rem',
  },
  label: {
    display: 'block',
    marginBottom: '.5rem',
  },
  input: {
    backgroundColor: 'background',
    border: '1px solid',
    borderColor: 'gray.4',
    fontFamily: 'body',
    height: '40px',
    maxWidth: '100%',
    padding: '0 .5rem',
    verticalAlign: 'top',
    width: '800px',
    '&:disabled': {
      backgroundColor: 'gray.0',
      cursor: 'not-allowed',
    },
  },
  inputInvalid: {
    backgroundColor: 'background',
    border: '2px solid',
    borderColor: 'attention',
    fontFamily: 'body',
    height: '40px',
    maxWidth: '100%',
    padding: '0 10px',
    verticalAlign: 'top',
    width: '800px',
  },
  warning: {
    fontSize: '.7rem',
  },
}
