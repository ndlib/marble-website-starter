module.exports = {
  wrapper: {
    marginLeft: 'auto',
    margin: '10px',
    display: 'block',
    textAlign: 'right',
    width: '100%',
    '& > input': {
      borderRadius: '.25rem',
      margin: '2px',
      padding: '2px',
      width : '30px',
    },
    '& > div': {
      margin: '2px 1rem',
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
