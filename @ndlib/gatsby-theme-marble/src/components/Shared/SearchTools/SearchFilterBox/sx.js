module.exports = {
  wrapper: {},
  filters: {
    display: 'inline-block',
    width: 'calc(100% - 160px)',
  },
  reset: {
    display: 'inline-block',
    textAlign: 'right',
    width: '160px',
    '& .sk-reset-filters__reset': {
      color: 'black',
      backgroundColor: 'white',
      borderRadius: '3px',
      padding: '10px 15px',
    },
  },
}
