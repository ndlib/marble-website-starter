/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { miradorImageToolsPlugin } from 'mirador-image-tools/es/'
import PropTypes from 'prop-types'
import typy from 'typy'
import queryString from 'query-string'
import Layout from 'components/Layout'
import MiradorWrapper from './MiradorWrapper'
import Seo from 'components/Internal/Seo'
import sx from './sx'

const MiradorViewerPage = ({ data, location }) => {
  const manifestId = `${typy(data, 'marbleItem.iiifUri').safeString}/`
  console.log(data)
  const manifestTitle = typy(data, 'marbleItem.title').safeString
  const qs = queryString.parse(location.search)
  const hideWindowTitle = qs.title === 'false'
  const sideBarOpenByDefault = qs.sidebar === 'true'
  const thumbnailNavigationPosition = qs.thumbnails === 'true' ? 'far-bottom' : 'off'
  const fullscreen = qs.fullscreen !== 'false'
  const canvasIndex = parseInt(qs.cv, 10) || 0
  const viewerView = qs.view || 'default'
  const context = useThemeUI()
  const themeColor = typy(context, 'theme.colors.primary').safeStringv || '#437D8A'
  const plugins = [...miradorImageToolsPlugin]
  const config = {
    id: 'test',
    themes: {
      light: {
        palette: {
          type: 'light',
          primary: {
            main: themeColor,
          },
        },
      },
    },
    companionWindows:
      {
        position: 'right',
      },
    window: {
      allowClose: false,
      allowFullscreen: fullscreen,
      allowMaximize: false,
      hideWindowTitle: hideWindowTitle,
      sideBarOpenByDefault: sideBarOpenByDefault,
      defaultSideBarPanel: 'canvas',
    },
    responseHeaders: {
      'Content-Type': 'text/json',
    },
    windows: [
      {
        manifestId: manifestId,
        canvasIndex: canvasIndex,
        maximized: false,
        thumbnailNavigationPosition: thumbnailNavigationPosition,
        view: viewerView,
        imageToolsEnabled: true,
        imageToolsOpen: true,
      },

    ],
    workspace: {
      showZoomControls: true,
      type: 'single',
    },
    workspaceControlPanel: {
      enabled: false,
    },

  }
  return (
    <Layout data={data} location={location}>
      <Seo
        data={data}
        location={location}
        title={`Mirador Viewer | ${manifestTitle}`}
        description={`Mirador viewer viewing ${manifestTitle}.`}
        image={typy(data, 'remarkMarblePage.frontmatter.iiifJson.thumbnail[0].id').safeString}
        noIndex
      />
      <div className='sizeWrapper' sx={sx.div}>
        <MiradorWrapper
          config={config}
          plugins={plugins}
        />
      </div>
    </Layout>
  )
}

MiradorViewerPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default MiradorViewerPage
