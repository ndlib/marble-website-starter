module.exports = {
  flexWrapper: {
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    margin: '0 auto',
    maxWidth: '1540px',
    position: 'relative',
    width: 'calc(100vw - 60px)',
  },
  content: {
    display: 'inline-flex',
    flexGrow: '2',
    justifyContent: 'flex-end',
  },
  hamburgerButton: {
    display: ['inline-flex', 'none', 'none'],
    backgroundColor: 'primary',
    border: 'none',
    outline: 'none !important',
    textDecoration: 'none',
  },
  menu: (isOpen) => {
    return {
      backgroundColor: 'primary',
      flexGrow: [null, '2', '2'],
      display: [isOpen ? 'block' : 'none', 'inline-flex', 'inline-flex'],
      position: ['absolute', 'relative', 'relative'],
      justifyContent: 'flex-end',
      top: ['70px', '0', '0'],
      left: ['-30px', '0', '0'],
      width: ['100vw', 'auto', 'auto'],
      zIndex: '1',
    }
  },

}
