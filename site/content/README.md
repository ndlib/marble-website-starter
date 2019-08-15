# Content Folder

This is where the content of your marble-website-starter lives. The following files and directories are expected:

* `manifests.json` ***(required)*** - This file contains a top level IIIF manifest that details the structure of the majority of the site including all collections and items that will have their own pages.

* `configuration.js` ***(required)*** - This includes many parameters that are used by `gatsby-config.js` to custom your site including the site name, menu structure, api keys, branding and more.

* `images/` ***(required)*** -  The following images are expected to build the site without modification:
  * departmentLogo.png - Used on right side of branding bar
  * institutionLogo.png - Used on left side of branding bar
  * manifestLogo.png - Used in manifest.webmanifest
  * openGraphLogo.png - Used for Twitter Card and Open Graph in SEO components
  * siteLogo.png - Used as graphical site logo next to main navigation

* `markdown/`  ***(required)*** - This folder contains the markdown content for static content pages on your site. No specific pages or naming contention exists, but examples include: 'About Us', 'Contact', 'FAQs', etc.

  * `markdown/[index/home/etc].md` ***(required)*** - A markdown file with `slug: index` in the frontmatter is required to generate a home page. The file may have any filename.
  * `markdown/[404].md` ***(required)*** - A markdown file with `slug: 404.html` in the frontmatter is required to generate the custom 404 page. The file may have any filename.

  * `markdown/images/`  ***(recommended)*** - Images referenced in the frontmatter will be made available on the site:

    ```
    ---
    myImage: './images/myImage.png'
    ---
    ```
    Will be available in as: `data.markdownRemark.frontmatter.myImage.publicURL`

**TODO**

The contents of this directory will be added to `.gitignore` and will need to be included during the install phase of site building.
