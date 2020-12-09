import replace from 'replace-in-file'

const replaceOptions = {
  files: ['../site/public/**/*.*'],
  from: / data-react-helmet="true"/g,
  to: '',
}

async function replaceHelmetAttrs () {
  const results = await replace(replaceOptions)
  const count = results.reduce((cnt, res) => cnt + (res.hasChanged ? 1 : 0), 0)
  console.log(`replaceHelmetAttrs: ${count} files changed`)
}

const start = Date.now()
replaceHelmetAttrs()
  .then(() => console.log(`postbuild done in ${Date.now() - start}ms`))
  .catch((err) => console.error(err))
