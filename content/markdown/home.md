---
slug: index

components:
  - component: SearchBox
  - component: MarkdownHtmlContent
  - component: CardGroup
    props:
      - label: "label"
        value: "Featured"
    components:
      - component: Card
        props:
        - label: "label"
          value: "In a Civilized Nation: Newspapers, Magazines and the Print Revolution in the 19th-Century Peru"
        - label: "image"
          fileValue: "./images/01.jpg"
        - label: "target"
          value: "https://collections.library.nd.edu/3df879828f/in-a-civilized-nation"
      - component: Card
        props:
        - label: "label"
          value: "Highlights"
        - label: "image"
          fileValue: "./images/02.jpg"
        - label: "target"
          value: "/browse/notre-dame"
      - component: Card
        props:
        - label: "label"
          value: "Recently Added"
        - label: "image"
          fileValue: "./images/03.jpg"
        - label: "target"
          value: "/browse"
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
