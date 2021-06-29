module.exports = {
  wrapper: {
    cursor: 'pointer',
    display: 'inline-block',
    margin: '.5rem',
    marginLeft: '0',
    maxWidth: '85vw',
    position: 'relative',
    textAlign: 'center',
    userSelect: 'none',
    width: '200px',
  },
  optionsOpen: {
    border: '1px solid',
    borderColor: 'gray.4',
    borderRadius: '.5rem',
    display: 'block',
    maxWidth: ['90vw', '600px', '600px'],

    overflow: 'hidden',
    position: 'absolute',
    zIndex: '1',
  },
  optionsClosed: {
    display: 'none',
  },
  toggle: {
    backgroundColor: 'primary',
    border: 'none',
    borderRadius: '.5rem',
    color: 'white',
    fontSize: '1rem',

    padding: '.5rem',
    width: '200px',
  },
}
