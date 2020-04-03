
site="../../site"

node getManifests.js $site
node getSchema.js $site

aws s3 cp "$site/content/json/iiif/iiif.json" s3://marble-manifest-prod-manifestbucket-lpnnaj4jaxl5/000000_temp_build_documents/iiif/index.json
aws s3 cp "$site/content/items/items.json" s3://marble-manifest-prod-manifestbucket-lpnnaj4jaxl5/000000_temp_build_documents/items/index.json
