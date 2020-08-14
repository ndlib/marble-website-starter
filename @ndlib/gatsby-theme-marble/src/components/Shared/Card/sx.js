module.exports = {
  clickableWrapper: {
    color: 'gray.4',
    cursor: 'pointer',
    backgroundColor: 'background',
    border: 'none',
    display: 'block',
    outline: 'none',
    textAlign: 'left',
    textDecoration: 'none',
    width: '100%',
  },
  wrapper: (wide, thumb) => {
    return wide ? {
      '& em': {
        backgroundColor: 'highlight',
      },
      height: '250px',
      position: 'relative',
    } : thumb ? {
      height: '75px',
      position: 'relative',
    } : {
      '& em': {
        backgroundColor: 'highlight',
      },
      height: '400px',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    }
  },
  figure: {
    margin: '0',
  },
  fadeOut: {
    height: '20px',
    backgroundImage: 'linear-gradient(#ffffff00, #ffffff66, white, white)',
    position: 'absolute',
    bottom: '0',
    width: '100%',
  },
  imageWrapper: (wide, thumb) => {
    return wide ? {
      display: 'inline-block',
      verticalAlign: 'top',
      width: '350px',
    } : thumb ? {
      width: '3.5em',
      display: 'inline-block',
      float: 'left',
      textAlign: 'right',
    } : {}
  },
  figcaption: (wide, thumb) => {
    return wide ? {
      borderBottom: '6px solid',
      borderColor: 'primary',
      display: 'inline-block',
      height: '250px',
      marginLeft: '1.5rem',
      overflow: 'hidden',
      padding: '.5rem',
      position: 'relative',
      width: 'calc(100% - 350px - 1.5rem)',
    } : thumb ? {
      position: 'relative',
      display: 'inline-block',
      padding: '.5rem',
      overflow: 'hidden',
    } : {
      borderBottom: '6px solid',
      borderColor: 'primary',
      height: '150px',
      overflow: 'hidden',
      padding: '.5rem',
      position: 'relative',
    }
  },
}
