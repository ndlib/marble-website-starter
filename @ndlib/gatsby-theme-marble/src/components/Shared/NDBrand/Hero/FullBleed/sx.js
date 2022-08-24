module.exports = {
  bannerGrid: {
    display: 'grid',
    pb: '2rem',
    gridTemplateRows: '[header-start] 5rem [title-start] auto [title-end lede-start] auto [lede-end] 3.5rem [header-end]',
    gridTemplateColumns: '[screen-start] 5vw [container-start title-start] 2fr [title-end image-start] 2fr [image-end container-end] 5vw [screen-end]',
  },
  overlay: {
    gridColumn: '1/3',
    gridRow: '3',
    bg: 'white',
    pr: '2rem',
    alignItems: 'flex-start',
    flexDirection: 'column',
    zIndex: 1,
    display: ['none', 'none', 'none', 'block'],
  },
  overlayText: {
    ml: '5vw',
    mt: '.75rem',
    alignSelf: 'flex-end',
    fontSize: 6,
  },
  overlayButton: {
    alignItems: 'end',
    justifyItems: 'end',
    width: '100%',
    flexDirection: 'row',
    pl: '5vw',
    marginBottom: '1rem',
  },
  banner: {
    gridRow: '1/-1',
    gridColumn: 'screen',
    maxHeight: '80vw',
    maxWidth: 'none',
  },
  attribution: {
    position: 'relative',
    bottom: '1.45rem',
    right: '10vw',
    float: 'right',
    marginLeft: '6rem',
    color: 'white',
    px:'1rem',
    bg: 'gray.8',
  },
}
