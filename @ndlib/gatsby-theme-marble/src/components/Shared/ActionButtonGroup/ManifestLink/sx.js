module.exports = {
  wrapper: {
    display: 'inline-block',
    marginLeft: 'auto',
    maxHeight: '60px',
    overflow: 'hidden',
    verticalAlign: 'top',
  },
  manifestLink: {
    border: '1px solid #00000000',
    cursor: 'pointer',
    display: 'inline-block',
    margin: '5px 5px 15px 0px',
    padding: '10px',
    borderRadius: '30px',
    textDecoration: 'none',
    verticalAlign: 'top',
    userSelect: 'none',
    float: 'right',
    '&:hover': {
      border: '1px solid #efefef',
      margin: '3px 5px 17px 0px',
      padding: '10px 10px 4px',
      boxShadow: '1px 2px 6px 2px rgba(153, 153, 153, 0.14)',
    },
  },
  image: {
    height: '24px',
    width: '24px',
  },
}
