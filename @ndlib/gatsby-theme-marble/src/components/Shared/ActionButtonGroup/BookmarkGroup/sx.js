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
    right: '0',
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
  tiny : {
    backgroundColor: 'white',
    color: 'primary',
    border: 'none',
    borderRadius: '.5rem',
    bottom: '3rem',
    position: 'relative',
    float: 'right',
    width: '.5rem',
    minHeight: '.5rem',
    marginRigth: '2rem',
    zIndex: '15',
  },
  tinyWrapper: {
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    userSelect: 'none',
    float: 'right',
    '& :hover': {
      color: 'white',
    },
  },
  bookmark: {
    marginLeft: '-.5rem',
  },
}
