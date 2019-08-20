---
slug: index

components:
  - component: MarkdownHtmlContent
  - component: SearchBox
  - component: CardGroup
    props:
      - label: "label"
        value: "Featured Collections"
    components:
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/collection/le-rossignol"
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/collection/theophilus"
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/collection/dante"
  - component: CardGroup
    props:
      - label: "label"
        value: "Featured Items"
    components:
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/1976.057/manifest"
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/1983.053.002/manifest"
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://presentation-iiif.library.nd.edu/1999.024/manifest"
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
            value: "/browse/timeperiods"
      - component: Card
        props:
          - label: "label"
            value: "Place"
          - label: "image"
            fileValue: "./images/05.jpg"
          - label: "target"
            value: "/browse/places"
      - component: Card
        props:
          - label: "label"
            value: "Theme"
          - label: "image"
            fileValue: "./images/04.jpg"
          - label: "target"
            value: "/browse/themes"
---

Explore digitized artwork, rare books, artifacts, and archival materials from the University of Notre Dame.
