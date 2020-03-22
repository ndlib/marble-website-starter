# Marble's Gatsby Website
<!-- Badges -->
<a href="https://codeclimate.com/github/ndlib/marble-website-starter/maintainability"><img src="https://api.codeclimate.com/v1/badges/a22d19847d3109fcb568/maintainability" /></a>
<a href="https://codeclimate.com/github/ndlib/marble-website-starter/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a22d19847d3109fcb568/test_coverage" /></a>
[![Build Status](https://travis-ci.org/ndlib/marble-website-starter.svg?branch=master)](https://travis-ci.org/ndlib/marble-website-starter)
<!-- Badges end -->
__This repository is currently under active development and is not ready for production.__

## About the Project

The [Hesburgh Libraries](https://library.nd.edu) and [Snite Museum](https://sniteartmuseum.nd.edu/) of Art at the University of Notre Dame received a grant from The Andrew W. Mellon Foundation in December 2017 to develop a unified online collections platform to encourage comparative research, innovative joint exhibitions, and deeper integration of artwork, rare books, archival resources, and cultural artifacts into University teaching.


For more information about Marble visit https://innovation.library.nd.edu/marble.

## Development

### Prerequisites:

To build and test locally, you will need the following development tools installed:
* [Node ≥10.16](https://github.com/nvm-sh/nvm#readme) - Installing via `nvm` is recommended for development.
  ```
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  nvm install 10
  nvm alias default 10
  ```
* yarn
  ```
  npm install -g yarn
  ```
* gatsby-cli
  ```
  yarn global add gatsby-cli
  ```

### Installing:
```
yarn install
```

### Run unit tests:
```
yarn workspace @ndlib/gatsby-theme-marble watch
```

### Running locally for development:
#### Main Marble Website:
The marble site uses elasticsearch for searching. You'll need to have an elasticsearch instance up and running; instructions can be found [here](https://github.com/ndlib/marble-elasticsearch/blob/master/README.md#deployment). Once you have an instance running we'll need to create parameter store key/value pairs the website install process references.
| Parameter Store Key  | Parameter Store Value |
| ------------- | ------------- |
| /all/static-host/&lt;stackname&gt;/search_url  | https://someelasticsearch-url.us-east-1.es.amazonaws.com/  |
| /all/static-host/&lt;stackname&gt;/search_index  | &lt;stackname&gt;-index  |

Note that multiple indices can utilize the same elasticsearch instance. Each stack would reference their own index under the same elasticsearch instance.

Now we're ready to download the iiif manifests and create pages for them:
```
./scripts/local.sh /all/static-host/<stackname>/
```

Start the development server:
```
yarn workspace site develop
```
Your site is now running at `http://localhost:8000`.

_Note: You'll also see a second link:_ `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

#### Marble Starter:
```
yarn workspace @ndlib/gatsby-starter-marble develop
```

Alternatively, if you would like to run `site` and `gatsby-starter-marble` at the same time, you may open a second terminal window and specify a port after the development command:
```
yarn workspace @ndlib/gatsby-starter-marble develop -p 8001
```
The starter will then be available at `http://localhost:8000` and it's graphql tool at `http://localhost:8000/___graphql`.

### Project Structure:

```
marble-website-starter
↳ @ndlib           // Directory scope for publishing to npm
  ↳ gatsby-theme-marble   // The npm module for the Gatsby Theme for a Marble website
  ↳ gatsby-starter-marble // A stand alone Gatsby Starter that consumes `gatsby-theme-marble`
↳ site                    // The Gatsby site for Marble that consumes `gatsby-theme-marble`
  ↳ content               // This is where the site content for the Marble site lives
  ↳ gatsby-config.js      // This file is required by Gatsby to configure the site and use the theme
↳ scripts
  ↳ codebuild             // AWS Codebuild orchestration scripts
  ↳ gatsby-source-iiif    // Get IIIF manifest files and generate .md and .json files for `site`

```

### Notes on development:
Occasionally, the `.cache` files my get confused if you are making large or frequent changes. To clean it up, stop the development task and run:

```
yarn workspace site clean
```

### Local build:
To build a local production version of the site run:
```
yarn workspace site build
```
### Creating a new site:
#### Add it to the yarn workspace
Edit the root `package.json` and add the name [NEW_SITE_NAME] to the list of workspaces.

#### Use the Starter:
From within the project root run:
```
gatsby new [NEW_SITE_NAME] @ndlib/gatsby-starter-marble
```
_Note: Gatsby Starters need to live in their own repository, so the code will eventually be split out to make the starter more accessible._

## Deployment

This project is deployed to AWS using a [Code Pipeline](https://aws.amazon.com/codepipeline/). The build scripts are located in `./scripts/codebuild`. The blueprints for deployment are available on Github at [Marble Blueprints](https://github.com/ndlib/marble-blueprints).

## Publishing the node modules
### Increment Version
Be sure to increment the package to the appropriate version using one of the following:

```
yarn workspace @ndlib/gatsby-theme-marble version --patch
```

```
yarn workspace @ndlib/gatsby-theme-marble version --minor
```

```
yarn workspace @ndlib/gatsby-theme-marble version --major
```

### Publish to NPM
```
cd @ndlib/gatsby-theme-marble
npm publish --access public
```
