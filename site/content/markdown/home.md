---
slug: index

components:
  - component: HeroBox  
    components:
      - component: MarkdownHtmlContent
        props:
          - label: 'html'
            value: '<h1> University of Notre Dame Digital Collections </h1>
                    Explore our digitized artwork, rare books, artifacts, and archival materials.
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
            value: "https://presentation-iiif.library.nd.edu/BPP1001_EAD/manifest"
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/1999.024/manifest"
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/1992.055/manifest"
          - label: "imageRegion"
            value: "0,600,2714,2000"
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
