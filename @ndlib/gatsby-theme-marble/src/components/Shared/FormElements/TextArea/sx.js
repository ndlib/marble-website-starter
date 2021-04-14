module.exports = {
  wrapper: {
    marginBottom: '2rem',
  },
  label: {
    display: 'block',
    marginBottom: '.5rem',
  },
  textArea: {
    backgroundColor: 'background',
    border: '1px solid',
    borderColor: 'gray.1',
    fontFamily: 'body',
    fontSize: '1rem',
    height: '14rem',
    maxWidth: '100%',
    minHeight: '6rem',
    outline: 'none',
    overflow: 'auto',
    padding: '.5rem',
    resize: 'vertical',
    verticalAlign: 'top',
    width: '800px',
    '&:disabled': {
      backgroundColor: 'gray.0',
      cursor: 'not-allowed',
    },
  },
}
