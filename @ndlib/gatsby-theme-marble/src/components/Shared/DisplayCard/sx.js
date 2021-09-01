module.exports = {
  cardShell: {
    themeCard: {
      minHeight: '350px',
      '& button': {
        margin: '0.25rem',
        marginTop: '0.5rem',
      },
      '& button:first-of-type': {
        marginLeft: '0',
      },
    },
    leftBadge: {
      position: 'absolute',
      top: '20px',
      height: '36px',
      width: '36px',
      left: '-0.5rem',
    },
    rightBadge: {
      position: 'absolute',
      top: '20px',
      height: '36px',
      width: '36px',
      right: '-0.5rem',
    },
  },
  linkOrWrapper: {
    link: {
      display: 'block',
      position: 'relative',
      color: 'unset',
      textDecoration: 'none',
      paddingBottom: '1.5rem',
      transitionDuration: '.3s',
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: 'light',
        transform: 'scale(1.025)',
        paddingBottom: '1.25rem',
        borderBottom: '0.25rem solid',
        borderColor: 'lightDark',
      },
    },
    wrapper: {
      display: 'block',
      position: 'relative',
    },
  },
  displayCard: {
    figure: {
      margin: '0 auto',
      border: '1px solid',
      borderColor: 'gray.2',
    },
    image: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray.1',
      maxWidth: '100%',
      height: '300px',
      width: '100%',
      margin: '0 auto',
      '& img': {
        display: 'block',
        objectFit: 'contain',
        width: '100%',
        height: '300px',
      },
    },
    figcaption: {
      padding: '0 0.5rem',
    },
    heading: {
      marginTop: '0.5rem',
      maxHeight: 'calc(1.25rem * 1.2 * 3)', // fontSize * lineHeight * numOfLines
      overflowY: 'hidden',
    },
    additionalText: {
      // keep for easier override
    },
  },
  cardBadge: {
    icon: {
      height: '18px',
      width: '18px',
      marginTop: '9px',
    },
    container: {
      backgroundColor: 'primary',
      borderRadius: '20px',
      height: '36px',
      lineHeight: '36px',
      margin: '0',
      position: 'absolute',
      right: '0',
      textAlign: 'center',
      top: '0',
      verticalAlign: 'middle',
      width: '36px',
    },
  },
  cardGroup: {
    list: {
      padding: '1rem',
      width: ['100%'],
      figure: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '300px',
      },
      figcaption: {
        display: 'inline-block',
        padding: '0 1rem !important',
        verticalAlign: 'top',
        width: 'calc( 100% - 300px)',
      },
      '.card a': {
        paddingBottom: '0',
        '&:hover': { paddingBottom: '0' },
      },
    },
    grid: {
      padding: '1rem',
      // width: // included in file to allow override of gridWidthRule
    },
    toggle: {
      justifyContent: 'space-between',
      '& input': {
        borderRadius: '.25rem',
        margin: '2px',
        padding: '2px',
        width : '30px',
      },
    },
    toggleButton: {
      active: {
        backgroundColor: 'primary',
        cursor: 'default',
      },
      inactive: {
        backgroundColor:'#dedede',
        opacity: '.3',
      },
    },
  },
}
