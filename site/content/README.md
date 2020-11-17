# Content Folder

This is where the content of your marble-website-starter lives. The following files and directories are expected:

* `manifests.json` ***(required)*** - This file contains a top level standard JSON files that details the content and structure of the majority of the site including all collections and items that will have their own pages.

* `configuration.js` ***(required)*** - This includes many parameters that are used by `gatsby-config.js` to custom your site including the site name, menu structure, api keys, branding and more.

* `images/` ***(required)*** -  The following images are expected to build the site without modification:
  * manifestLogo.png - Used in manifest.webmanifest
  * openGraphLogo.png - Used for Twitter Card and Open Graph in SEO components
  * siteLogo.png - Used as graphical site logo next to main navigation

**TODO**

The contents of this directory will be added to `.gitignore` and will need to be included during the install phase of site building.
