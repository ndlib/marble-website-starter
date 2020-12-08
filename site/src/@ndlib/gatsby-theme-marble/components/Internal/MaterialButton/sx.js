module.exports = {
  content: {
    maxHeight: 'calc(100vh - 80px - 3rem)',
    marginTop: '3rem',
    padding: '1rem',
    overflowX: 'hidden',
    overflowY: 'hiddenl',
  },
  materialButton: {
    backgroundColor: 'white',
    borderRadius: '.5rem',
    fontSize: '1rem',
    maxWidth: '100%',
    padding: '.5rem',
    userSelect: 'none',
    cursor: 'pointer',
  },
  'materialButton:focus': {
    outline: 'none',
  },
  'materialButton:hover': {
    boxShadow: '0px 2px 3px 0px rgba(153, 153, 153, 0.4)',
    opacity: '0.95',
  },
  'materialButton:disabled': {
    boxShadow: 'none !important',
    cursor: 'default',
    opacity: '0.4',
  },
}
