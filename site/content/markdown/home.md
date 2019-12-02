---
slug: index

components:
  - component: HeroBox  
    components:
      - component: MarkdownHtmlContent
        props:
          - label: 'html'
            value: '<h1> University Of Notre Dame Digital Collections </h1>
                    Explore digitized artwork, rare books, artifacts, and archival materials from the University of Notre Dame.
                    '
      - component: SearchBox
  - component: MarkdownHtmlContent      
  - component: CardGroup
    props:
      - label: "label"
        value: "Recent Additions"
    components:
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/collection/le-rossignol"
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/1999.024/manifest"
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/1992.055/manifest"
  - component: CardGroup
    props:
      - label: "label"
        value: "Browse By"
    components:
      - component: Card
        props:
          - label: "label"
            value: "Time"
          - label: "image"
            fileValue: "./images/06.jpg"
          - label: "target"
            value: "/search?timeperiod[0]=0-5th%20Century"
      - component: Card
        props:
          - label: "label"
            value: "Place"
          - label: "image"
            fileValue: "./images/05.jpg"
          - label: "target"
            value: "/search?place[0]=North%20America"
      - component: Card
        props:
          - label: "label"
            value: "Theme"
          - label: "image"
            fileValue: "./images/04.jpg"
          - label: "target"
            value: "/search?theme[0]=Historical%20Artifacts"
---
