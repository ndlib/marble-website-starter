# @ndlib/gatsby-plugin-marble-elasticsearch

A Gatsby plugin to build and submit an ElasticSearch index to AWS.

How to use (in `gatsby-config.js`):

```
const elasticQuery = require('./content/elastic/query')
const elasticSettings = require('./content/elastic/settings')
const elasticMappings = require('./content/elastic/mappings')

...

module.exports = {
  plugins: [
    ...
    {
      resolve: '@ndlib/gatsby-plugin-marble-elasticsearch',
      options: {
        url: 'https://example.com/xyz',
        searchIndex: 'site-name',
        region: 'us-east-1',
        query: elasticQuery,
        selector: (data) => data.allMarbleItem.nodes.map(node => node.searchData),
        settings: settingsFile,
        mappings: mappingsFile,
      },
    },
    ...
  ]
}
```

| Parameter | Description | Required |
| ------------- |:-------------| ----- |
| url | The ElasticSearch api endpoint provided by AWS. | yes |
| searchIndex | The name of the ElasticSearch index. | yes |
| region | The AWS region. | yes |
| query | The ElasticSearch api endpoint provided by AWS. | yes |
| selector | A function to remap the query data to the top level. | yes |
| settings | A function to return custom settings for ElasticSearch. It takes an instance of an AWS ElasticSearch client as the only parameter. | yes |
| mappings | A function to create custom mappings for ElasticSearch. It takes no parameters. | yes |
