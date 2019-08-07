---
title: Layout Test
slug: layoutTest
iiifJson___NODE: 'https://presentation-iiif.library.nd.edu/collection/epistemological-letters'

components:
  - component: Image
    props:
      - label: "src"
        fileValue: "./images/banner.jpg"
  - component: MiradorViewer
  - component: MarkdownHtmlContent
  - component: MarkdownHtmlContent
    props:
      - label: 'html'
        value: '<h3>MarkdownHtmlComponent, but with prop content.</h3>'
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
  - component: MultiColumn
    components:
      - component: Column
        components:
          - component: ActionButtons
          - component: ManifestImage
      - component: Column
        components:
          - component: ManifestDescription
          - component: ManifestMetaData

  - component: CardGroup
    props:
      - label: "label"
        value: "Card Group"
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
        value: "Manifest Cards"
    components:
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://manifest-pipeline-v3.libraries.nd.edu/epistemological-letters-issue-2/manifest"
      - component: ManifestCard
        props:
          - label: "iiifManifest"
            value: "https://manifest-pipeline-v3.libraries.nd.edu/epistemological-letters-issue-3/manifest"
  - component: ChildManifests

---
Markdown content provided by the markdown document. It is converted to HTML.

[Here is a link in markdown. It goes to Google.](http://google.com)

Here is another paragraph on content in markdown. And a sentence fragment. And another. And another. And another. And another. And another. And another. And another. And another.And another. And another. And another. And another. And another. And another. And another. And another. And another. And another. And another. And another.And another. And another. And another. And another. And another. Okay, that should be some wrapping text.
