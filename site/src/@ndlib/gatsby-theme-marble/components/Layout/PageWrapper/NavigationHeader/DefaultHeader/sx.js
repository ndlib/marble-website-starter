const banner = require('assets/images/banner.swirl.png')

module.exports = {
  wrapper: {
    borderTop: '5px solid #D39F10',
    position: 'relative',
    height: ['170px', '100px', '100px'],
    zIndex: '1',
  },
  backgroundWrapper: {
    position: 'absolute',
    overflow: 'hidden',
    height: ['170px', '100px', '100px'],
    width: '100vw',
  },
  topBar: {
    width: ['100vw', '600px', '600px'],
    maxWidth: '100vw',
    height: '50px',
    backgroundColor: '#0C2340dd',
    backdropFilter: 'blur(0px)',
    position: 'absolute',
    top: '0',
    right: '0',
  },
  extraTriangle: {
    width: '0',
    height: '0',
    borderTop: '50px solid #0C2340dd',
    borderLeft: '50px solid transparent',
    position: 'absolute',
    right: '600px',
    backdropFilter: 'blur(0px)',
    display: ['none', 'block', 'block'],
  },
  browseLink: {
    color: 'background',
    fontFamily: 'menu',
    fontSize: '18px',
    textDecoration: 'none',
    position: 'absolute',
    right: '410px',
    lineHeight: '50px',
    display: ['none', 'block', 'block'],
  },
  exhibitsLink: {
    color: 'background',
    fontFamily: 'menu',
    fontSize: '18px',
    textDecoration: 'none',
    position: 'absolute',
    right: '480px',
    lineHeight: '50px',
    display: ['none', 'block', 'block'],
  },
  loginWrapper: {
    position: 'absolute',
    right: ['auto', '320px', '320px'],
    left: ['0', 'auto', 'auto'],
  },
  secondRow: {
    position: 'absolute',
    top: '50px',
    width: '100%',
  },
  triangleTopright: {
    width: '0',
    height: '0',
    borderTop: '50px solid #0C2340dd',
    borderLeft: '50px solid transparent',
    position: 'absolute',
    display: ['none', 'block', 'block'],
    right: '270px',
    backdropFilter: 'blur(0px)',
  },
  rightOfTriangle: {
    width: '270px',
    height: '50px',
    backgroundColor: '#0C2340dd',
    position: 'absolute',

    display: ['none', 'block', 'block'],
    right: '0',
    backdropFilter: 'blur(0px)',
  },
  ndLogo: {
    width: '180px',
    position: 'absolute',
    right: '70px',
    top: '30px',
    display: ['none', 'block', 'block'],
  },
  ndWordmark: {
    width: '301px',
    height: '50px',
    position: 'absolute',
    right: 'calc(50vw - 150px)',
    top: '0',
    display: ['block', 'none', 'none'],
  },
  heroWrapper: {
    height: '100px',
    margin: '0 auto 0',
    padding: '1rem',
    width: '100%',
    position: 'relative',
    maxWidth: '1540px',
  },
  marbleLogo: {
    height: '60px',
    top: ['90px', '15px', '15px'],
    left: ['calc(50vw - 120px)', '0', '0'],
    position: 'absolute',
  },
}
