module.exports = {
  wrapper: {
    cursor: 'pointer',
    display: 'inline-block',
    margin: '.5rem',
    marginLeft: '0',
    outline: 'none',
    position: 'relative',
    textAlign: 'center',
    userSelect: 'none',
    width: '200px',
  },
  optionsOpen: {
    border: '1px solid',
    borderColor: 'gray.1',
    outline: 'none',
    position: 'absolute',
    display: 'block',
    zIndex: '1',
  },
  optionsClosed: {
    display: 'none',
  },
  toggle: {
    backgroundColor: 'primary',
    color: 'primaryText.0',
    fontSize: '1rem',
    outline: 'none',
    padding: '.5rem',
    width: '200px',
  },
  label: {
    paddingLeft: '.5rem',
  },
  image: {
    height: '20px',
    verticalAlign: 'text-bottom',
  },
  noPortfolios: {
    backgroundColor: 'white',
    borderBottom: '1px solid',
    fontSize: '.85rem',
    fontStyle: 'italic',
    height: '50px',
    lineHeight: '50px',
    verticalAlign: 'middle',
  },
}
