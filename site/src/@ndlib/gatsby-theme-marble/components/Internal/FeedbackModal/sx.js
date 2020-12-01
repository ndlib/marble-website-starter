module.exports = {
  feedbackButton: {
    '@media screen and (min-width: 620px)': {
      position:'fixed',
      bottom:'30vmin',
      right:'25px',
      fontWeight:'bold',
      border:'1px solid black',
      color:'#FFFFFF',
      backgroundColor:'#002a43',
      textDecoration: 'none',
      textAlign:'center',
      width:'40px',
      height:'150px',
      paddingLeft: '8px',
      writingMode: 'vertical-lr',
      transform: 'rotateZ(180deg)',
      cursor: 'pointer',
      borderRadius: '0px 5px 5px 0px',
    },
    '@media screen and (max-width: 619px)': {
      position:'fixed',
      display:'block',
      bottom:'10px',
      right:'25px',
      fontWeight:'bold',
      border: '1px solid black',
      color: '#FFFFFF',
      backgroundColor: '#002a43',
      textDecoration: 'none',
      textAlign: 'center',
      paddingTop: '7px',
      width: '150px',
      height: '40px',
      cursor: 'pointer',
      borderRadius: '5px',
    },
  },
  'ReactModal--ReactModal__Overlay ReactModal__Overlay--after-open': {
    backgroundColor: '#000000',
  },
  modal: {
    backgroundColor: '#FFF',
    top: '3em',
    left: '3em',
    bottom: 'auto',
    height: 'auto',
    maxWidth: '500px',
    margin: '7em auto',
    transform: 'none',
    boxShadow: '0 0 8px 5px #00000055',
    fontSize: '1em',
    fontFamily: 'Arial, Helvetica, sans-serif',
    borderRadius: '15px',
    '&:focus': {
      outline: '0',
    },
  },
  headingContainer: {
    backgroundColor: '#002a43',
    width: '100%',
    float: 'left',
    marginBottom: '10px',
    paddingLeft: '30px',
    paddingTop: '10px',
    paddingBottom: '8px',
    borderRadius: '15px 15px 0px 0px',
    '& > h2': {
      fontWeight: 'bold',
      fontSize: '1.5em',
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: '#FFFFFF',
      textAlign: 'left',
      margin: '0px',
      width: '90%',
      float: 'left',
      borderRight: '1px solid white',
    },
  },
  closebutton: {
    cursor: 'pointer',
    float: 'right',
    paddingRight: '18px',
    paddingTop: '5px',
    color: '#FFFFFF',
  },
}
