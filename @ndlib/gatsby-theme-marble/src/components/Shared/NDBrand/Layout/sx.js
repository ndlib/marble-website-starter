module.exports = {
  content: {
    gridTemplateColumns: '[screen-start] 5vw [container-start sidebar-start] 22vw [sidebar-end content-start] minmax(0, 1fr) [content-end container-end] 5vw [screen-end]',
    gridTemplateRows: '[header-start] auto [header-end content-start] 1fr [content-end]',
  },
  contentSection: {
    gridColumn: 'container',
    gridRow: 'content',
    position: 'relative',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '0',
      bottom: '0',
      right: '0',
      width: '30vw',
      zIndex: '-1',
      background: '#fff',
    },
  },
  layoutContainer: ({ variant, showMenu }) => ({
    variant: variant,
    display: 'grid',
    minHeight: '100%',
    width: '100%',
    position: 'relative',
    gridTemplateRows: '[header-start] auto [header-end main-start] minmax(auto, 1fr) [main-end footer-start] auto [footer-end]',
    right: showMenu ? '14rem' : 'auto',
    boxSizing: 'border-box',
    transition: '.25s ease-in-out',
  }),
  navButton: {
    borderRadius: '0',
    borderLeftWidth: [0, 0, 0, '1px'],
    borderLeftStyle: 'solid',
    borderLeftColor: 'gray.4',
  },
}
