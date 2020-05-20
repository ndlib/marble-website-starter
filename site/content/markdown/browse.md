---
slug: browse
components:
- component: HeroBox
  props:
    - label: "backgroundImage"
      fileValue: "./images/banner.swirl.png"
  components:
  - component: SearchBox
- component: MultiColumn
  props:
    - label: 'columns'
      value: 5
  components:
    - component: Column
      components:
        - component: MarkdownHtmlContent
          props:
            - label: "html"
              value: "<div id='date'><h2>Browse By Date</h2></div>"
    - component: Column
      props:
        - label: 'colSpan'
          value: '4'
      components:   
        - component: CardGroup
          components:
            - component: MiniCard
              props:
              - label: "label"
                value: "14th Century"
              - label: "target"
                value: "/search?timeperiod[0]=14th%20Century"
            - component: MiniCard
              props:
                - label: "label"
                  value: "15th Century"
                - label: "target"
                  value: "/search?timeperiod[0]=15th%20Century"
            - component: MiniCard
              props:
                - label: "label"
                  value: "16th Century"
                - label: "target"
                  value: "/search?timeperiod[0]=16th%20Century"
            - component: MiniCard
              props:
                - label: "label"
                  value: "17th Century"
                - label: "target"
                  value: "/search?timeperiod[0]=17th%20Century"
            - component: MiniCard
              props:
                - label: "label"
                  value: "18th Century"
                - label: "target"
                  value: "/search?timeperiod[0]=18th%20Century"
            - component: MiniCard
              props:
                - label: "label"
                  value: "19th Century"
                - label: "target"
                  value: "/search?timeperiod[0]=19th%20Century"
            - component: MiniCard
              props:
                - label: "label"
                  value: "20th Century"
                - label: "target"
                  value: "/search?timeperiod[0]=20th%20Century"
            - component: MiniCard
              props:
                - label: "label"
                  value: "21st Century"
                - label: "target"
                  value: "/search?timeperiod[0]=21st%20Century"
            - component: MiniCard
              props:
                - label: "label"
                  value: "undated"
                - label: "target"
                  value: "/search?timeperiod[0]=undated"
- component: MultiColumn
  props:
    - label: 'columns'
      value: 5
  components:
    - component: Column
      components:
        - component: MarkdownHtmlContent
          props:
            - label: "html"
              value: "<div id='format'><h2>Browse By Format</h2></div>"
    - component: Column
      props:
        - label: 'colSpan'
          value: '4'
      components:   
        - component: CardGroup
          components:
            - component: MiniCard
              props:
                - label: "label"
                  value: "Paintings"
                - label: "target"
                  value: "/search?format[0]=Paintings"
            - component: MiniCard
              props:
                - label: "label"
                  value: "Photographs"
                - label: "target"
                  value: "/search?format[0]=Photographs"
            - component: MiniCard
              props:
                - label: "label"
                  value: "Prints"
                - label: "target"
                  value: "/search?format[0]=Prints"
            - component: MiniCard
              props:
                - label: "label"
                  value: "Sculpture"
                - label: "target"
                  value: "/search?place[0]=Sculpture"
- component: MultiColumn
  props:
    - label: 'columns'
      value: 5
  components:
    - component: Column
      components:
        - component: MarkdownHtmlContent
          props:
            - label: "html"
              value: "<div id='location'><h2>Browse By Location</h2></div>"
    - component: Column
      props:
        - label: 'colSpan'
          value: '4'
      components:   
        - component: CardGroup
          components:
            - component: MiniCard
              props:
                - label: "label"
                  value: "Rare Books and Special Collections"
                - label: "target"
                  value: "/search?campuslocation[0]=Rare%20Books%20and%20Special%20Collections"
            - component: MiniCard
              props:
                - label: "label"
                  value: "Snite Museum of Art"
                - label: "target"
                  value: "/search?campuslocation[0]=Snite%20Museum%20of%20Art"
---

Browse all the amazing content.
