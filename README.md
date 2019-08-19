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
  yarn install -g gatsby-cli
  ```

### Installing:
```
yarn install
```

### Run unit tests:
```
yarn workspace gatsby-theme-marble watch
```

### Running locally for development:
#### Main Marble Website:
```
yarn workspace site develop
```
Your site is now running at `http://localhost:8000`.

_Note: You'll also see a second link:_ `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

#### Marble Starter:
```
yarn workspace gatsby-starter-marble develop
```

Alternatively, if you would like to run `site` and `gatsby-starter-marble` at the same time, you may open a second terminal window and specify a port after the development command:
```
yarn workspace gatsby-starter-marble develop -p 8001
```
The starter will then be available at `http://localhost:8000` and it's graphql tool at `http://localhost:8000/___graphql`.
### Project Structure:

```
marble-website-starter
↳ gatsby-theme-marble     // The npm module for the Gatsby Theme for a Marble website
↳ gatsby-starter-marble   // The npm module for the Gatsby Starter for a Marble website
↳ site                    // The Gatsby site for Marble that consumes `gatsby-theme-marble`
  ↳ content               // This is where the site content for the Marble site lives
  ↳ gatsby-config.js      // This file is required by Gatsby to configure the site and use the theme
↳ scripts
  ↳ codebuild             // AWS Codebuild orchestration scripts
  ↳ gatsby-source-iiif    // Get IIIF manifest files and generate .md and .json files for `site`

```

## Deployment

This project is deployed to AWS using a [Code Pipeline](https://aws.amazon.com/codepipeline/). The build scripts are located in `./scripts/codebuild`. The blueprints for deployment are available on Github at [Marble Blueprints](https://github.com/ndlib/marble-blueprints).
