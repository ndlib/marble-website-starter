---
title: Layout Test
slug: layoutTest
components:
  - component: PageTitle
  - component: HeroImage
    props:
      - label: "image"
        fileValue: "./images/banner.jpg"
  - component: MarkdownContent

  - component: Level1
    props:
      - label: "myProp"
        value: "myPropValue"
      - label: "image"
        fileValue: "./images/04.jpg"
    components:
      - component: Level2
        props:
          - label: "myProp"
            value: "myPropValue"
          - label: "image"
            fileValue: "./images/04.jpg"
        components:
          - component: Level3
            props:
              - label: "myProp"
                value: "myPropValue"
              - label: "image"
                fileValue: "./images/04.jpg"
            components:
              - component: Level4
                props:
                  - label: "myProp"
                    value: "myPropValue"
                  - label: "image"
                    fileValue: "./images/05.jpg"
  - component: CardGroup
    props:
      - label: "label"
        value: "Featured"
    components:
      - component: Card
        props:
          - label: "image"
            fileValue: "./images/01.jpg"
          - label: "label"
            value: "In a Civilized Nation: Newspapers, Magazines and the Print Revolution in the 19th-Century Peru"
          - label: "target"
            value: "https://collections.library.nd.edu/3df879828f/in-a-civilized-nation"
      - component: Card
        props:
          - label: "image"
            fileValue: "./images/02.jpg"
          - label: "label"
            value: "Highlights"
          - label: "target"
            value: "/browse/notre-dame"
      - component: Card
        props:
          - label: "image"
            fileValue: "./images/03.jpg"
          - label: "label"
            value: "Recently Added"
          - label: "target"
            value: "/browse"
  - component: CardGroup
    props:
      - label: "label"
        value: "Also Featured"
    components:
      - component: Card
        props:
          - label: "image"
            fileValue: "./images/04.jpg"
          - label: "label"
            value: "In a Civilized Nation: Newspapers, Magazines and the Print Revolution in the 19th-Century Peru"
          - label: "target"
            value: "https://collections.library.nd.edu/3df879828f/in-a-civilized-nation"
      - component: Card
        props:
          - label: "image"
            fileValue: "./images/05.jpg"
          - label: "label"
            value: "Highlights"
          - label: "target"
            value: "/browse/notre-dame"
      - component: Card
        props:
          - label: "image"
            fileValue: "./images/06.jpg"
          - label: "label"
            value: "Recently Added"
          - label: "target"
            value: "/browse"
---
HTML content
