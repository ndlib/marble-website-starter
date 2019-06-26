# Content Folder

This is where the content of your marble-website-starter lives. The following files and directories are expected:

* `manifests.json` ***(required)*** - This file contains a top level IIIF manifest that details the structure of the majority of the site including all collections and items that will have their own pages.

* `menus.js` ***(required)*** - This includes all the menus that will be used in your site including the main navigation menu links, footer menu links, and submenus included on any markdown pages.


* `markdown/`  ***(required)*** - This folder contains the markdown content for static content pages on your site. No specific pages or naming contention exists, but examples include: 'About Us', 'Contact', 'FAQs', etc.

  * `markdown/[index/home/etc].md` ***(required)*** - A markdown file with `slug: index` in the frontmatter is required to generate a home page. The file may have any filename.

  * `markdown/images/`  ***(recommended)*** - Images referenced in the frontmatter will be made available on the site:

    ```
    ---
    myImage: './images/myImage.png'
    ---
    ```
    Will be available in as: `data.markdownRemark.frontmatter.myImage.publicURL`

**TODO**

The contents of this directory will be added to `.gitignore` and will need to be included during the install phase of site building.
