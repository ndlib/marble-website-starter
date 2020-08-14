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
  wrapper: (wide) => {
    return wide ? {
      '& em': {
        backgroundColor: 'highlight',
      },
      height: '250px',
      position: 'relative',
    } : {
      '& em': {
        backgroundColor: 'highlight',
      },
      height: '435px',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    }
  },
  imageBoarder: {
    border: '1px solid',
    borderColor: 'gray.1',
    display: 'inline-block',
    margin: '0 auto',
    padding: '4px',
    paddingBottom: '0',
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
  imageWrapper: (wide) => {
    return wide ? {
      display: 'inline-block',
      verticalAlign: 'top',
      width: '350px',
    } : {}
  },
  imageWrapperInner: {
    boxSizing: 'border-box',
    display: 'flex',
    height: '250px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  figcaption: (wide) => {
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
