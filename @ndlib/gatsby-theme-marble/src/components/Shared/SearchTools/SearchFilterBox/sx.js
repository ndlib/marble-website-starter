module.exports = {
  wrapper: {},
  filters: {
    display: 'inline-block',
    width: 'calc(100% - 160px)',
    '& .sk-selected-filters-option .sk-selected-filters-option__remove-action': {
      color: 'black',
      backgroundColor: 'light',
      px: '.5rem',
      borderRadius: '.6em',
      fontSize: 2,
      whiteSpace: 'nowrap',
      py: '0.2rem',
      '&:hover': {
        transform: 'scale(1.02)',
        cursor: 'pointer',
        textDecoration: 'none',
        bg: 'lightDark',
      },
    },
  },
  reset: {
    display: 'inline-block',
    textAlign: 'right',
    width: '160px',
    '& .sk-reset-filters__reset': {
      color: 'black',
      backgroundColor: 'light',
      px: '1.5rem',
      borderRadius: '.6em',
      fontSize: 2,
      whiteSpace: 'nowrap',
      py: '0.5rem',
      '&:hover': {
        transform: 'scale(1.02)',
        cursor: 'pointer',
        textDecoration: 'none',
        bg: 'lightDark',
      },
    },
  },
}
