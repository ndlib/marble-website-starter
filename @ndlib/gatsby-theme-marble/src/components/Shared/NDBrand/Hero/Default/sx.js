import backgroundImage from 'assets/images/hdr-main-building-800.jpg'
const sx = {
  defaultHeroBanner: {
    position: 'relative',
    display: 'grid',
    gridTemplateRows: [
      '[header-start] 180px [title-start] auto [title-end lede-start] auto [lede-end] 1rem [header-end]',
      '[header-start] 280px [title-start] auto [title-end lede-start] auto [lede-end] 1rem [header-end]',
      '[header-start] 360px [title-start] auto [title-end lede-start] auto [lede-end] 1rem [header-end]',
      '[header-start] 5rem [title-start] auto [title-end lede-start] auto [lede-end] 3.5rem [header-end]',
    ],
    gridTemplateColumns: '[screen-start] 5vw [container-start title-start] 1fr [title-end image-start] 2fr [image-end container-end] 5vw [screen-end]',
    '::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex:'-1',
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'repeat',
      gridRow: 'header-start/title-end',
    },
  },
  bannerHeading: {
    ml: '0',
    pr: '2rem',
    marginTop: '4rem',
    gridColumn: ['title-start/lede-end', 'title-start/lede-end', 'title-start/lede-end', 'title'],
    gridRow: ['title'],
    alignSelf: 'flex-end',
  },
  descriptionSection: {
    gridColumn: ['screen-start/lede-end', 'screen-start/lede-end', 'screen-start/lede-end', 'title'],
    gridRow: 'lede',
    bg: ['light', 'light', 'light', 'white'],
    pr: '2rem',
    pl: ['5vw', '5vw', '5vw', '0'],
    height: ['160px', '160px', '200px', '200px'],
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  descriptionText: {
    display: 'block',
  },
  descriptionButton: {
    alignItems: 'end',
    justifyItems: 'end',
    width: '100%',
    flexDirection: 'row',
  },
  bannerImageContainer: {
    gridRow: ['header-start/title-end', 'header-start/title-end', 'header-start/title-end', 'title-start/header-end'],
    gridColumn: ['screen-start/screen-end', 'screen-start/screen-end', 'screen-start/screen-end', 'image-start/screen-end'],
  },
}
export default sx
