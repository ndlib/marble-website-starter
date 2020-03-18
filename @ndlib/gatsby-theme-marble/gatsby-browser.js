import 'searchkit/release/theme.css'
import './src/assets/css/global.css'
import './src/assets/css/fonts.css'
export { default as wrapRootElement } from './src/store/ReduxWrapper'

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`,
  )
  if (answer === true) {
    window.location.reload()
  }
}
