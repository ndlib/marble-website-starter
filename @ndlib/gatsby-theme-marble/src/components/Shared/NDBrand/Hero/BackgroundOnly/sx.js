module.exports = {
  backgroundHeroBanner: {
    display: ['none', 'none', 'none', 'grid'],
    position: 'relative',
    gridColumn: 'screen',
    gridRow: 'header',
    gridTemplateRows: '[header-start] 5rem [title-start] auto [title-end lede-start] auto [lede-end] 3.5rem [header-end]',
    gridTemplateColumns: '[screen-start] 5vw [container-start title-start] 1fr [title-end image-start] 0 [image-end container-end] 5vw [screen-end]',
    marginBottom: 'calc(-1 * 3.5rem)',
    '::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex:'-1',
      backgroundImage: 'url(https://conductor.nd.edu/stylesheets/themes/ndt/v3/images/hdr-main-building-800.jpg)',
      backgroundRepeat: 'repeat',
    },
  },
}
