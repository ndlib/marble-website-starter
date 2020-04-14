module.exports = {
  wrapper: {
    float: 'right',
    marginLeft: 'auto',
    margin: '10px',
    display: 'block',
    '& > input': {
      margin: '2px',
      padding: '2px',
      width : '30px',
    },
  },
  group: {
    margin: '0 -1rem',
  },
  item: (display) => {
    return display === 'list' ? {
      padding: '1rem',
      width: '100%',
    } : {
      display: 'inline-block',
      padding: '1rem',
      width: ['100%', '50%', '33.33%'],
    }
  },
}
