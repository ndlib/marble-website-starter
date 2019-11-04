---
title: "Epistemological Letters Issue 4"
slug: "item/epistemological-letters-issue-4"
iiifJson___NODE: 'https://presentation-iiif.library.nd.edu/epistemological-letters-issue-4/manifest'
layout: "item"
components:
  - component: MultiColumn
    props:
      - label: 'columns'
        value: '3'
    components:
      - component: Column
        props:
          - label: "colSpan"
            value: "2"
        components:
          - component: ActionButtons
          - component: ManifestMetaData
      - component: Column
        components:
          - component: MarkdownHtmlContent
          - component: Image
            props:
            - label: "src"
              value: "https://image-iiif.library.nd.edu/iiif/2/epistemological-letters-issue-4%2FDec19744thIssue_Page_03/full/1000,/0/default.jpg"

---
Also, just a note, the custom text from the Markdown file doesn't have to appear above the main content, it can be mixed in anywhere in the layout. This text is part of a multi-column layout with three columns and a 2-1 split.

Below this text is an image of page 3 of this letter.

Also, did you know each IIIF Manifest gets it's own page created in a Mirador Viewer, even if we don't include a viewer on the page? It's true! You can [see an example here](/item/epistemological-letters-issue-1/mirador).
