module.exports = {
  wrapper: {
    '& div': {
      fontFamily: 'body',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      height: '2.5rem',
      verticalAlign: 'middle',
      textAlign: 'center',
    },
    '& .sk-toggle__item': {
      backgroundColor: 'background',
      borderColor: 'gray.4',
      color: 'gray.4',
    },
    '& .sk-toggle__item:hover': {
      backgroundColor: 'primaryWithOpacity',
      color: 'background',
    },
    '& .sk-toggle__item.is-disabled:hover': {
      backgroundColor: 'background',
      borderColor: 'gray.4',
      color: 'gray.4',
      cursor: 'default',
    },
    '& .sk-toggle-option.is-active': {
      backgroundColor: 'primary',
      color: 'background',
    },
  },
}
