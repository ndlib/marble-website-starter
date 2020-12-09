/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { miradorImageToolsPlugin } from 'mirador-image-tools/es/'
import PropTypes from 'prop-types'
import typy from 'typy'
import queryString from 'query-string'
import Layout from 'components/Layout'
import MiradorWrapper from './MiradorWrapper'
import Seo from 'components/Internal/Seo'
import BackToItem from 'components/Internal/BackToItem'
import sx from './sx'

// eslint-disable-next-line complexity
const MiradorViewerPage = ({ data, location }) => {
  const itemId = `${typy(data, 'marbleItem.iiifUri').safeString}/`
  const itemTitle = typy(data, 'marbleItem.title').safeString
  const qs = queryString.parse(location.search)
  const hideWindowTitle = qs.title === 'false'
  const sideBarOpenByDefault = qs.sidebar === 'true'
  const thumbnailNavigationPosition = qs.thumbnails === 'true' ? 'far-bottom' : 'off'
  const fullscreen = qs.fullscreen !== 'false'
  const canvasIndex = parseInt(qs.cv, 10) || 0
  const viewerView = qs.view || 'default'
  const context = useThemeUI()
  const themeColor = typy(context, 'theme.colors.primary').safeString || typy(context, 'theme.colors.primary[1]').safeString
  const plugins = [...miradorImageToolsPlugin]
  const config = {
    id: typy(data, 'marbleItem.id').isString ? `id-${data.marbleItem.id}` : 'default-id',
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
        manifestId: itemId,
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
  let body = null
  try {
    if (window) {
      body = (
        <MiradorWrapper
          config={config}
          plugins={plugins}
        />
      )
    }
  } catch {
    // console.warn('window does not exist in node')
  }
  return (
    <Layout data={data} location={location}>
      <Seo
        data={data}
        location={location}
        title={`${itemTitle} | Mirador Viewer`}
        description={`Mirador viewer viewing ${itemTitle}.`}
        image={typy(data, 'remarkMarblePage.frontmatter.iiifJson.thumbnail[0].id').safeString}
        noIndex
      />
      <BackToItem
        slug={typy(data, 'marbleItem.slug').safeString}
        title={typy(data,'marbleItem.title').safeString}
      />
      <div className='sizeWrapper' sx={sx.div}>
        {body}
      </div>
    </Layout>
  )
}
MiradorViewerPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default MiradorViewerPage
